import { json, requireAccess } from "../../_lib/db.js";

export async function onRequestDelete({ request, env, params }) {
  const denied = requireAccess(request, env);
  if (denied) return denied;

  const id = Number(params.id);
  if (!Number.isInteger(id)) return json({ error: "Recipe not found" }, 404);

  const row = await env.DB.prepare("DELETE FROM recipes WHERE id = ? RETURNING id").bind(id).first();
  if (!row) return json({ error: "Recipe not found" }, 404);
  return json({ id: row.id });
}
