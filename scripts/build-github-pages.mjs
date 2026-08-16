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
const routes = [
  { pathname: "/rams-go-green/", output: "index.html" },
  { pathname: "/rams-go-green/admin", output: "admin/index.html" },
];

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`https://example.com${route.pathname}`, {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (!response.ok) {
    throw new Error(`Could not render ${route.pathname} (${response.status}).`);
  }

  const outputPath = path.join(outputDirectory, route.output);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, await response.text());
}

await writeFile(path.join(outputDirectory, ".nojekyll"), "");
