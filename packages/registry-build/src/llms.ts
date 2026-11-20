import { CATEGORY, type ComponentSpec, docsPath } from "@baby-ui/registry-schema";
import { REGISTRY_URL, SITE_URL } from "./config";

/** A link-list entry in llmstxt.org form: `- [Title](url): notes`. */
const entry = (title: string, url: string, notes: string) =>
	`- [${title}](${url}): ${notes}`;

/** llmstxt.org layout: H1, summary blockquote, prose, then H2 sections of markdown links. */
export function buildLlmsTxt(all: ComponentSpec[]): string {
	// Retired items still install, but nothing should point a reader at them.
	const specs = all.filter((s) => !s.retired);
	const lines = [
		"# Baby UI",
		"",
		"> Animated, accessible UI components for React and Svelte. Every component has one",
		"> ComponentSpec and up to two implementations that share a token layer, so both renders",
		"> match. Components install as source through @baby-ui/cli, which reads the same",
		"> components.json as shadcn and shadcn-svelte.",
		"",
		"Every link below points at the page's markdown version. Install any component with:",
		"",
		"```bash",
		"npx @baby-ui/cli add {slug}",
		"```",
		"",
		"The CLI picks React or Svelte and TypeScript or JavaScript from components.json. The stock",
		`CLIs take the item URL instead: \`${REGISTRY_URL}/r/{slug}.json\` (React) or`,
		`\`${REGISTRY_URL}/svelte/r/{slug}.json\` (Svelte); insert \`/js\` before the slug for JavaScript. A spec's`,
		"`motion.behaviour` lists what the component must observably do; it is the contract both",
		"implementations satisfy. `props[].control` gives the range of values worth trying,",
		"`a11y.keyboard` lists `{ keys, action }` rows, and `guidance` holds when to use it, when",
		"not to (with the component to use instead), responsive, performance and notes for AI.",
		"",
		"## Rules for agents",
		"",
		"- Install through the CLI or registry URLs above; never paste a component's source by hand. Each item brings `tokens` (additive variables only) and any opt-in token layer it reads.",
		"- Read a page's When not to use and Notes for AI before choosing a component.",
		"- Style through `variant` and `size` (shadcn's names) and `class`/`className`; do not fork a component for a one-off look.",
		"- Status, progress, streaming and open state are props the caller controls; components never simulate them.",
		"- React and Svelte share prop names, except `className` (React) and `class` (Svelte).",
		"- Leave the app's theme alone: `tokens` never redefines shadcn's variables; `theme` is the opt-in that does.",
		"- The look is soft by design, so do not add borders or rings for depth. Surfaces separate by a colour step and spacing; floating panels (popover, menu, tooltip, dialog) use `bg-popover` with `shadow-(--overlay-shadow)` and no border. Fields and outline variants keep one soft hairline.",
		"- Cards and tables are borderless by default; pass `bordered` for an edge. Tooltips follow the mode and never invert.",
		"- Controls of one `size` share one height (xs 24, sm 32, default 36, lg 40, xl 48 px), so inputs, buttons and selects line up in a row. Size is `default`, never `md`.",
		"- Emails take their colour, corners and density from `createEmailTheme({ primary, radius, density })`, never raw hex or pixel classes.",
		"- A project's existing shadcn variables (`--border`, `--input`, `--popover`) keep their values. Install `theme` to get Baby UI's soft edges; without it, edges follow the project's own tokens.",
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
			"project setup and adding components",
		),
		entry(
			"CLI",
			`${SITE_URL}/docs/cli.md`,
			"every @baby-ui/cli command: add, diff, update, repair, undo",
		),
		entry(
			"Theming",
			`${SITE_URL}/docs/theming.md`,
			"colour, dark mode and motion variables",
		),
		entry(
			"MCP",
			`${SITE_URL}/docs/mcp.md`,
			"the remote MCP server at /api/mcp and the WebMCP tools on every page",
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
		lines.push(`## ${CATEGORY[category].title}`, "");
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
