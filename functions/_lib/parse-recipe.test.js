import { test } from "node:test";
import assert from "node:assert/strict";
import { parseRecipe } from "./parse-recipe.js";

const graphHtml = `<html><head>
<script type="application/ld+json">
{"@context":"https://schema.org","@graph":[
  {"@type":"WebPage","name":"ignore me"},
  {"@type":"Recipe","name":"Tofu Scramble",
   "recipeIngredient":["2 tbsp nutritional yeast","1 tsp cumin"],
   "recipeInstructions":[
     {"@type":"HowToStep","text":"Crumble the tofu."},
     {"@type":"HowToStep","text":"Cook 10 minutes."}]}
]}
</script></head><body></body></html>`;

test("parses a Recipe from an @graph block with HowToStep instructions", () => {
  const r = parseRecipe(graphHtml, "https://example.com/tofu");
  assert.equal(r.name, "Tofu Scramble");
  assert.equal(r.url, "https://example.com/tofu");
  assert.deepEqual(r.recipeIngredient, ["2 tbsp nutritional yeast", "1 tsp cumin"]);
  assert.deepEqual(r.recipeInstructions, ["Crumble the tofu.", "Cook 10 minutes."]);
});

test("parses a top-level Recipe with a @type array and string instructions", () => {
  const html = `<script type="application/ld+json">
    {"@type":["Recipe","NewsArticle"],"name":"Toast",
     "recipeIngredient":["1 slice bread"],
     "recipeInstructions":["Toast the bread."]}</script>`;
  const r = parseRecipe(html, "https://example.com/toast");
  assert.equal(r.name, "Toast");
  assert.deepEqual(r.recipeInstructions, ["Toast the bread."]);
});

test("flattens HowToSection instructions", () => {
  const html = `<script type="application/ld+json">
    {"@type":"Recipe","name":"Sectioned","recipeIngredient":["x"],
     "recipeInstructions":[{"@type":"HowToSection","itemListElement":[
       {"@type":"HowToStep","text":"Step A"},{"@type":"HowToStep","text":"Step B"}]}]}
    </script>`;
  const r = parseRecipe(html, "https://example.com/s");
  assert.deepEqual(r.recipeInstructions, ["Step A", "Step B"]);
});

test("returns null when there is no Recipe node", () => {
  const html = `<script type="application/ld+json">{"@type":"WebPage","name":"nope"}</script>`;
  assert.equal(parseRecipe(html, "https://example.com/x"), null);
});

test("returns null when ingredients or instructions are empty", () => {
  const html = `<script type="application/ld+json">
    {"@type":"Recipe","name":"Empty","recipeIngredient":[],"recipeInstructions":[]}</script>`;
  assert.equal(parseRecipe(html, "https://example.com/e"), null);
});

test("ignores unparseable JSON-LD blocks without throwing", () => {
  const html = `<script type="application/ld+json">{ not json </script>
    <script type="application/ld+json">
    {"@type":"Recipe","name":"OK","recipeIngredient":["a"],"recipeInstructions":["b"]}</script>`;
  const r = parseRecipe(html, "https://example.com/ok");
  assert.equal(r.name, "OK");
});
