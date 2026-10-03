import { test } from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { verifyAccessJwt } from "./db.js";

const cfg = { team: "https://team.cloudflareaccess.com", aud: "app-aud" };

const alg = { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" };
const { privateKey, publicKey } = await crypto.subtle.generateKey(
  { ...alg, modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]) },
  true,
  ["sign", "verify"],
);
const keys = [{ ...(await crypto.subtle.exportKey("jwk", publicKey)), kid: "k1" }];

const enc = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64url");
async function sign(claims, kid = "k1") {
  const body = `${enc({ alg: "RS256", kid })}.${enc(claims)}`;
  const sig = await crypto.subtle.sign(alg, privateKey, new TextEncoder().encode(body));
  return `${body}.${Buffer.from(sig).toString("base64url")}`;
}

const now = 1_000_000;
const good = { aud: [cfg.aud], iss: cfg.team, exp: now + 60 };

test("accepts a valid Access JWT", async () => {
  assert.equal(await verifyAccessJwt(await sign(good), keys, cfg, now), true);
});

test("rejects wrong audience, issuer, or expired token", async () => {
  assert.equal(await verifyAccessJwt(await sign({ ...good, aud: ["other"] }), keys, cfg, now), false);
  assert.equal(await verifyAccessJwt(await sign({ ...good, iss: "https://evil.example" }), keys, cfg, now), false);
  assert.equal(await verifyAccessJwt(await sign({ ...good, exp: now - 1 }), keys, cfg, now), false);
});

test("rejects tampered payload, unknown key, and garbage", async () => {
  const [h, , s] = (await sign(good)).split(".");
  const forged = `${h}.${enc({ ...good, aud: [cfg.aud, "x"] })}.${s}`;
  assert.equal(await verifyAccessJwt(forged, keys, cfg, now), false);
  assert.equal(await verifyAccessJwt(await sign(good, "nope"), keys, cfg, now), false);
  assert.equal(await verifyAccessJwt("x", keys, cfg, now), false);
});
