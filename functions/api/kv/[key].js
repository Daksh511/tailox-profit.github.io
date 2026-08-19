// GET /api/kv/:key      -> returns the raw stored value (404 if missing)
// PUT /api/kv/:key      -> body = raw value to store
// DELETE /api/kv/:key   -> removes the key

export async function onRequestGet({ params, env }) {
  const key = decodeURIComponent(params.key);
  const value = await env.PRODUCTS_KV.get(key);
  if (value === null) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(value, { headers: { "Content-Type": "text/plain" } });
}

export async function onRequestPut({ params, env, request }) {
  const key = decodeURIComponent(params.key);
  const value = await request.text();
  await env.PRODUCTS_KV.put(key, value);
  return new Response("ok");
}

export async function onRequestDelete({ params, env }) {
  const key = decodeURIComponent(params.key);
  await env.PRODUCTS_KV.delete(key);
  return new Response("ok");
}
