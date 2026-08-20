import { rowToRecipe, json } from "../../_lib/db.js";

export async function onRequestPost({ request, env }) {
  const { ingredient } = await request.json();
  if (!ingredient) return json({ error: "Please provide an ingredient." }, 400);
  const like = `%${ingredient}%`;
  const { results } = await env.DB
    .prepare(
      "SELECT id, name, url, recipeIngredient, recipeInstructions, created_at FROM recipes " +
      "WHERE name LIKE ?1 OR recipeIngredient LIKE ?1 ORDER BY created_at DESC"
    )
    .bind(like)
    .all();
  if (results.length === 0) {
    return json({ error: "No recipes found. Please search another ingredient or add more recipes." }, 404);
  }
  return json(results.map(rowToRecipe));
}
