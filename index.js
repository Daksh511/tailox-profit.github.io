// GET /api/kv?prefix=product:
// Lists all KV keys under a given prefix. Used by the app to enumerate saved products.
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const prefix = url.searchParams.get("prefix") || "";
  const list = await env.PRODUCTS_KV.list({ prefix });
  return Response.json({ keys: list.keys.map((k) => k.name) });
}
