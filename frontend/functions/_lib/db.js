export function rowToRecipe(row) {
  return {
    id: row.id,
    name: row.name,
    url: row.url,
    recipeIngredient: JSON.parse(row.recipeIngredient),
    recipeInstructions: JSON.parse(row.recipeInstructions),
    created_at: row.created_at,
  };
}

export function json(data, status = 200) {
  return Response.json(data, { status });
}

// Fail closed in production: enforce Access unless explicitly in local development.
export function requireAccess(request, env) {
  if (env.ENVIRONMENT === "development") return null;
  if (!request.headers.get("Cf-Access-Authenticated-User-Email")) {
    return json({ error: "Not authorized" }, 401);
  }
  return null;
}
