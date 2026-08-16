import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
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
  assert.doesNotMatch(html, /There[^<]*s a seat for you|href="#meetings"|id="meetings"/);
  assert.doesNotMatch(html, /September 1, 2026|September 5, 2026|>TBD</);
  assert.match(html, /Our leadership/);
  assert.match(html, /Rams with some plans\./);
  assert.match(html, />Jack<|>Sadie<|>Vice President</);
  assert.match(html, /href="#officers"/);
  assert.doesNotMatch(html, />Treasurer</);
  assert.match(html, /From the feed/);
  assert.match(html, /No posts at this time\./);
  assert.doesNotMatch(html, /Ready when you are|Make your time at CSU count|See upcoming events/);
  assert.equal((html.match(/class="brand-mark"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /Share the change|Meet your people|Grow something good/);
  assert.doesNotMatch(html, /Rams Go Green home|class="brand" href="#top"/);
  assert.doesNotMatch(
    html,
    /codex-preview|Building your site|react-loading-skeleton|og\.png|↗|⬆|➡/,
  );
});

test("server-renders the admin page", async () => {
  const response = await render("/admin");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Site Admin \| Rams Go Green<\/title>/i);
  assert.match(html, /Keep the site current/);
  assert.match(html, /Meetings and site text/);
  assert.match(html, /Officer photos/);
  assert.match(html, /Club gallery/);
  assert.match(html, /Instagram feed/);
  assert.match(html, /github\.com\/jackeckholt-commits\/rams-go-green\/edit\/main\/content\/site\.json/);
  assert.match(html, /only people with access/i);
});
