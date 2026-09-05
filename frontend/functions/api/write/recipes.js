import { rowToRecipe, json, requireAccess } from "../../_lib/db.js";

export async function onRequestPost({ request, env }) {
  const denied = requireAccess(request, env);
  if (denied) return denied;

  const { url, name, recipeIngredient, recipeInstructions } = await request.json();

  const emptyFields = [];
  if (!name) emptyFields.push("name");
  if (!recipeIngredient || recipeIngredient.length === 0) emptyFields.push("recipeIngredient");
  if (!recipeInstructions || recipeInstructions.length === 0) emptyFields.push("recipeInstructions");
  if (emptyFields.length > 0) {
    return json({ error: "Please fill in required fields", emptyFields }, 400);
  }

  const row = await env.DB
    .prepare("INSERT INTO recipes (name, url, recipeIngredient, recipeInstructions) VALUES (?, ?, ?, ?) RETURNING *")
    .bind(name, url || null, JSON.stringify(recipeIngredient), JSON.stringify(recipeInstructions))
    .first();
  return json({ recipe: rowToRecipe(row), msg: "Success! Recipe added!" });
}
