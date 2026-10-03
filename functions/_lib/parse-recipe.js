// Extract every JSON-LD object from <script type="application/ld+json"> blocks.
export function extractJsonLd(html) {
  const blocks = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(m[1].trim()));
    } catch {
      // skip blocks that are not valid JSON
    }
  }
  return blocks;
}

const isRecipe = (node) => {
  const t = node && node["@type"];
  return t === "Recipe" || (Array.isArray(t) && t.includes("Recipe"));
};

// Find the Recipe node across parsed blocks, handling the @graph wrapper.
export function findRecipeNode(blocks) {
  for (const block of blocks) {
    if (isRecipe(block)) return block;
    if (Array.isArray(block?.["@graph"])) {
      const found = block["@graph"].find(isRecipe);
      if (found) return found;
    }
  }
  return null;
}

function flattenInstructions(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const step of raw) {
    if (typeof step === "string") {
      out.push(step);
    } else if (step && step["@type"] === "HowToSection" && Array.isArray(step.itemListElement)) {
      for (const s of step.itemListElement) {
        if (typeof s === "string") out.push(s);
        else if (s?.text) out.push(s.text);
      }
    } else if (step?.text) {
      out.push(step.text);
    }
  }
  return out;
}

// Normalize a Recipe node to our stored shape, or null if unusable.
export function normalizeRecipe(node, sourceUrl) {
  if (!node) return null;
  const recipeIngredient = Array.isArray(node.recipeIngredient)
    ? node.recipeIngredient.map(String)
    : [];
  const recipeInstructions = flattenInstructions(node.recipeInstructions);
  if (!node.name || recipeIngredient.length === 0 || recipeInstructions.length === 0) {
    return null;
  }
  return { name: String(node.name), url: sourceUrl, recipeIngredient, recipeInstructions };
}

export function parseRecipe(html, sourceUrl) {
  return normalizeRecipe(findRecipeNode(extractJsonLd(html)), sourceUrl);
}
