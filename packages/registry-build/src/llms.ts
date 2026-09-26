import { type ComponentSpec, docsPath } from "@baby-ui/registry-schema";
import { REGISTRY_URL, SITE_URL } from "./config";

const CATEGORY_TITLE: Record<string, string> = {
	advanced: "Advanced components",
	agents: "Agent UI components",
	animated: "Animated components",
	backgrounds: "Backgrounds",
	base: "Base components",
	blocks: "Blocks",
	charts: "Charts",
	text: "Text effects",
};

/** A link-list entry in llmstxt.org form: `- [Title](url): notes`. */
const entry = (title: string, url: string, notes: string) =>
	`- [${title}](${url}): ${notes}`;

/** llmstxt.org layout: H1, summary blockquote, prose, then H2 sections of markdown links. */
export function buildLlmsTxt(specs: ComponentSpec[]): string {
	const lines = [
		"# Baby UI",
		"",
		"> Animated, accessible UI components for React and Svelte. Every component has one",
		"> ComponentSpec and up to two implementations that share a token layer, so both renders",
		"> match. Components install as source through the shadcn and shadcn-svelte CLIs.",
		"",
		"Every link below points at the page's markdown version. Install any component with:",
		"",
		"```bash",
		`npx shadcn@latest add ${REGISTRY_URL}/r/{slug}.json`,
		`npx shadcn-svelte@latest add ${REGISTRY_URL}/svelte/r/{slug}.json`,
		"```",
		"",
		"Insert `/js` before the slug for JavaScript instead of TypeScript. A spec's",
		"`motion.behaviour` lists what the component must observably do; it is the contract both",
		"implementations satisfy. `props[].control` gives the range of values worth trying, and",
		"`a11y.keyboard` is asserted, not aspirational.",
		"",
		"## Docs",
		"",
		entry(
			"Introduction",
			`${SITE_URL}/docs/index.md`,
			"what Baby UI is and how it installs",
		),
		entry(
			"Installation",
			`${SITE_URL}/docs/installation.md`,
			"project setup and adding components with the shadcn CLI",
		),
		entry(
			"Theming",
			`${SITE_URL}/docs/theming.md`,
			"colour, dark mode and motion variables",
		),
		"",
		"## Registry",
		"",
		entry(
			"Specs",
			`${REGISTRY_URL}/r/specs.json`,
			"every ComponentSpec, the full source of truth",
		),
		entry(
			"shadcn registry",
			`${REGISTRY_URL}/r/registry.json`,
			"React items, one per component",
		),
		entry(
			"shadcn-svelte registry",
			`${REGISTRY_URL}/svelte/r/registry.json`,
			"Svelte items, one per component",
		),
		"",
	];

	const categories = [...new Set(specs.map((s) => s.category))].sort();
	for (const category of categories) {
		lines.push(`## ${CATEGORY_TITLE[category] ?? category}`, "");
		for (const spec of specs.filter((s) => s.category === category)) {
			const frameworks = Object.keys(spec.impl).sort().join(" and ");
			lines.push(
				entry(
					spec.name,
					`${SITE_URL}${docsPath(spec)}.md`,
					`${spec.description} (${frameworks})`,
				),
			);
		}
		lines.push("");
	}

	return lines.join("\n");
}
