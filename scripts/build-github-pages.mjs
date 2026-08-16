import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "github-pages");

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(path.join(projectRoot, "dist", "client"), outputDirectory, {
  recursive: true,
});
await cp(
  path.join(projectRoot, "public"),
  path.join(outputDirectory, "rams-go-green"),
  { recursive: true },
);

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("github-pages", Date.now().toString());
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://example.com/rams-go-green/", {
    headers: { accept: "text/html" },
  }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Could not render the home page (${response.status}).`);
}

await writeFile(path.join(outputDirectory, "index.html"), await response.text());
await writeFile(path.join(outputDirectory, ".nojekyll"), "");
