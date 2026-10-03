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

const b64url = (s) =>
  Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));
const decodeJson = (s) => JSON.parse(new TextDecoder().decode(b64url(s)));

// Verify an Access JWT's RS256 signature, audience, issuer, and expiry against the team's keys.
// `team` is the Access team URL (https://<team>.cloudflareaccess.com); `aud` is the application's audience tag.
export async function verifyAccessJwt(token, keys, { team, aud }, now = Date.now() / 1000) {
  try {
    const [h, p, s] = token.split(".");
    const jwk = keys.find((k) => k.kid === decodeJson(h).kid);
    if (!jwk) return false;
    const alg = { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" };
    const key = await crypto.subtle.importKey("jwk", jwk, alg, false, ["verify"]);
    const data = new TextEncoder().encode(`${h}.${p}`);
    if (!(await crypto.subtle.verify(alg, key, b64url(s), data))) return false;
    const claims = decodeJson(p);
    return [].concat(claims.aud).includes(aud) && claims.iss === team && claims.exp > now;
  } catch {
    return false;
  }
}

// Fail closed in production: enforce Access unless explicitly in local development.
// The signed JWT is the proof: the *.pages.dev hostname is not behind Access, so a bare
// header check there would let anyone write.
// Missing ACCESS_TEAM / ACCESS_AUD env vars also fail closed.
// ponytail: fetches the team's keys on every write; cache them if write volume grows.
export async function requireAccess(request, env) {
  if (env.ENVIRONMENT === "development") return null;
  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  const team = env.ACCESS_TEAM;
  const aud = env.ACCESS_AUD;
  if (token && team && aud) {
    const { keys } = await (await fetch(`${team}/cdn-cgi/access/certs`)).json();
    if (await verifyAccessJwt(token, keys, { team, aud })) return null;
  }
  return json({ error: "Not authorized" }, 401);
}
