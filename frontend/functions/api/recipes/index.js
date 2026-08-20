import { rowToRecipe, json } from "../../_lib/db.js";

export async function onRequestGet({ env }) {
  const { results } = await env.DB
    .prepare("SELECT id, name, url, recipeIngredient, recipeInstructions, created_at FROM recipes ORDER BY created_at DESC")
    .all();
  return json(results.map(rowToRecipe));
}
