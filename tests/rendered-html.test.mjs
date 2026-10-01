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
  assert.match(html, /Sustainability/);
  assert.doesNotMatch(html, /There[^<]*s a seat for you|href="#meetings"|id="meetings"/);
  assert.doesNotMatch(html, /September 1, 2026|September 5, 2026|>TBD</);
  assert.match(html, /href="\/leadership\/"/);
  assert.match(html, /Join GroupMe/);
  assert.match(html, /web\.groupme\.com\/join_group\/117465326\/HB5wFPDV/);
  assert.match(html, /src="\/rams-go-green-logo-plant\.png"/);
  assert.doesNotMatch(html, /href="\/signup\/"|Sign up for an activity|docs\.google\.com\/forms/);
  assert.doesNotMatch(html, /Our leadership|Rams with some plans|>Jack<|>Sadie</);
  assert.doesNotMatch(html, /Grow here|Give back/);
  assert.match(html, /From the feed/);
  assert.match(html, /src="https:\/\/www\.instagram\.com\/p\/Dd7Yj-JTFfb\/embed\/"/);
  assert.match(html, /Rams Go Green latest Instagram post/);
  assert.doesNotMatch(html, /Our Instagram is live\. Photos are coming soon\./);
  assert.doesNotMatch(html, /Ready when you are|Make your time at CSU count|See upcoming events/);
  assert.equal((html.match(/class="brand-logo"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /Share the change|Meet your people|Grow something good/);
  assert.doesNotMatch(html, /Rams Go Green home|class="brand" href="#top"/);
  assert.doesNotMatch(
    html,
    /codex-preview|Building your site|react-loading-skeleton|og\.png|↗|⬆|➡/,
  );
});

test("server-renders the leadership page", async () => {
  const response = await render("/leadership");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Leadership \| Rams Go Green<\/title>/i);
  assert.match(html, /Our leadership/);
  assert.match(html, /Rams with some plans\./);
  assert.match(html, />Jack Eckholt<|>Sadie Cordova<|>Vice President &amp; Treasurer</);
  assert.match(html, />Eli Roust<|>Public Relations</);
  assert.match(html, />Spencer Wilson<|>Outreach</);
  assert.match(html, /src="\/officers\/jack-eckholt\.jpg"/);
  assert.match(html, /src="\/officers\/sadie-cordova\.jpg"/);
  assert.match(html, /src="\/officers\/eli-roust\.jpg"/);
  assert.match(html, /src="\/officers\/spencer-wilson\.jpg"/);
  assert.doesNotMatch(html, /<p class="officer-role">Treasurer<\/p>/);
  assert.match(html, /Back to main site/);
  assert.match(html, /property="og:title" content="Leadership \| Rams Go Green"/);
  assert.match(html, /name="twitter:title" content="Leadership \| Rams Go Green"/);
  assert.doesNotMatch(html, /og\.png/);
});

test("server-renders the admin page", async () => {
  const response = await render("/admin");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Site Admin \| Rams Go Green<\/title>/i);
  assert.match(html, /Keep the site current/);
  assert.match(html, /Page wording and links/);
  assert.match(html, />Meetings</);
  assert.match(html, /Leadership profiles/);
  assert.match(html, /Club gallery/);
  assert.match(html, /Instagram feed/);
  assert.match(html, /github\.com\/jackeckholt-commits\/rams-go-green\/edit\/main\/content\/site\.json/);
  assert.match(html, /only people with access/i);
  assert.match(html, /GroupMe link/);
  assert.match(html, /GroupMe link connected/);
  assert.doesNotMatch(html, /Activity signups|Signup form connected|Google Forms/);
});

test("the retired signup page is not available", async () => {
  const response = await render("/signup");
  assert.equal(response.status, 404);
});
