import { rowToRecipe, json, requireAccess } from "../../_lib/db.js";
import { parseRecipe } from "../../_lib/parse-recipe.js";

export async function onRequestPost({ request, env }) {
  const denied = await requireAccess(request, env);
  if (denied) return denied;

  const { url } = await request.json();
  if (!url) return json({ error: "Please provide a URL." }, 400);

  let html;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 RecipeKeeper" } });
    html = await res.text();
  } catch {
    return json({ error: "Could not fetch that page. Please input recipe details manually." }, 400);
  }

  const recipe = parseRecipe(html, url);
  if (!recipe) {
    return json({ error: "Cannot read recipe. Please input recipe details manually." }, 400);
  }

  const row = await env.DB
    .prepare("INSERT INTO recipes (name, url, recipeIngredient, recipeInstructions) VALUES (?, ?, ?, ?) RETURNING *")
    .bind(recipe.name, recipe.url, JSON.stringify(recipe.recipeIngredient), JSON.stringify(recipe.recipeInstructions))
    .first();
  return json({ recipe: rowToRecipe(row), msg: "Success! Recipe added!" });
}
