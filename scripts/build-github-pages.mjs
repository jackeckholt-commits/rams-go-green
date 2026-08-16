import { access, cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "github-pages");
const githubBasePath = "/rams-go-green";

async function copyDirectoryContents(source, destination) {
  await mkdir(destination, { recursive: true });
  const entries = await readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    await cp(
      path.join(source, entry.name),
      path.join(destination, entry.name),
      { recursive: true },
    );
  }
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await copyDirectoryContents(path.join(projectRoot, "dist", "client"), outputDirectory);

// GitHub Pages already serves this artifact below /rams-go-green. Vinext puts
// base-path assets in a matching subfolder, so move those files to the artifact
// root to avoid serving them from /rams-go-green/rams-go-green.
const nestedBasePath = path.join(outputDirectory, githubBasePath.slice(1));
await copyDirectoryContents(nestedBasePath, outputDirectory);
await rm(nestedBasePath, { recursive: true, force: true });
await copyDirectoryContents(path.join(projectRoot, "public"), outputDirectory);

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

for (const route of routes) {
  const html = await readFile(path.join(outputDirectory, route.output), "utf8");
  const assetPattern = /(?:href|src)="\/rams-go-green\/([^"?#]+)"/g;

  for (const match of html.matchAll(assetPattern)) {
    await access(path.join(outputDirectory, match[1]));
  }
}
