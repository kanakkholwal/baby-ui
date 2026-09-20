import type { ComponentSpec } from "@baby-ui/registry-schema";
import { REGISTRY_NAME, SITE_URL } from "./config";

export function buildLlmsTxt(specs: ComponentSpec[]): string {
	const lines = [
		`# ${REGISTRY_NAME}`,
		"",
		"> Multi-framework UI registry. Every component has one ComponentSpec and up to two",
		"> implementations (React, Svelte) that share a token layer, so both renders match.",
		"",
		"## Endpoints",
		"",
		`- Specs, the full source of truth (JSON): ${SITE_URL}/r/specs.json`,
		`- shadcn registry index (JSON): ${SITE_URL}/r/registry.json`,
		`- shadcn component item (JSON): ${SITE_URL}/r/{slug}.json`,
		`- shadcn-svelte registry index (JSON): ${SITE_URL}/svelte/r/registry.json`,
		`- shadcn-svelte component item (JSON): ${SITE_URL}/svelte/r/{slug}.json`,
		"",
		"## Install",
		"",
		"```bash",
		`npx shadcn@latest add ${SITE_URL}/r/{slug}.json`,
		`npx shadcn-svelte@latest add ${SITE_URL}/svelte/r/{slug}.json`,
		"```",
		"",
		"## Components",
		"",
	];

	for (const category of [...new Set(specs.map((s) => s.category))].sort()) {
		lines.push(`### ${category}`, "");
		for (const spec of specs.filter((s) => s.category === category)) {
			const frameworks = Object.keys(spec.impl).sort().join(", ");
			lines.push(
				`- **${spec.slug}** (${frameworks}) — ${spec.description} [${SITE_URL}/components/${spec.category}/${spec.slug}]`,
			);
		}
		lines.push("");
	}

	lines.push(
		"## Reading a spec",
		"",
		"A spec's `motion.behaviour` lists what the component must observably do; it is the",
		"contract both implementations satisfy, not a description of either one's code.",
		"`props[].control` describes how each prop is exercised in the live demo, so it doubles",
		"as the range of values worth trying. `a11y.keyboard` is asserted, not aspirational.",
		"",
	);

	return lines.join("\n");
}
