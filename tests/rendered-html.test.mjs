import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Rams Go Green site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Rams Go Green \| Colorado State University<\/title>/i);
  assert.match(html, /Rams go/);
  assert.match(html, /There[^<]*s a seat for you/);
  assert.match(html, /Meet the team/);
  assert.match(html, />Jack</);
  assert.match(html, />Sadie</);
  assert.match(html, />Vice President</);
  assert.doesNotMatch(html, />Treasurer</);
  assert.match(html, /September 1, 2026/);
  assert.match(html, /September 5, 2026/);
  assert.match(html, /Fresh from the feed/);
  assert.doesNotMatch(
    html,
    /codex-preview|Building your site|react-loading-skeleton|og\.png|↗|⬆|➡/,
  );
});
