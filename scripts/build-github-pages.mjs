import { access, cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "github-pages");

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
await copyDirectoryContents(path.join(projectRoot, "public"), outputDirectory);

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("github-pages", Date.now().toString());
const { default: worker } = await import(workerUrl.href);
const routes = [
  { pathname: "/", output: "index.html" },
  { pathname: "/admin", output: "admin/index.html" },
  { pathname: "/leadership", output: "leadership/index.html" },
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
  const assetPattern = /(?:href|src)="\/([^"?#]+)"/g;

  for (const match of html.matchAll(assetPattern)) {
    if (match[1].startsWith("/")) continue;
    await access(path.join(outputDirectory, match[1]));
  }
}
