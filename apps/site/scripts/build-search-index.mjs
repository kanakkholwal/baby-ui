// Full-text index of the docs for the command palette: guides and component pages, by section.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createSearchIndexer } from "@docvia/search";
import { loadIRDocuments } from "@docvia/search/node";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "static/search-index.json");

const docs = (
	await loadIRDocuments({ configPath: resolve(root, "docvia.config.ts") })
).filter((doc) => doc.frontmatter.draft !== true);

const indexer = await createSearchIndexer();
await indexer.buildIndex(docs);

// Hits carry only a slug; map each to its page. Mirrors docsPath() from registry-schema,
// which plain Node cannot import (its exports point at TypeScript source).
const hrefFor = (doc) => {
	const { component, category } = doc.frontmatter;
	if (component)
		return category === "charts"
			? `/charts/${component}`
			: `/components/${category}/${component}`;
	return doc.slug === "index" ? "/docs" : `/docs/${doc.slug}`;
};
const pages = Object.fromEntries(docs.map((doc) => [doc.slug, hrefFor(doc)]));

await mkdir(dirname(out), { recursive: true });
await writeFile(out, JSON.stringify({ index: await indexer.exportIndex(), pages }));
console.log(`search index: ${docs.length} pages -> ${out}`);
