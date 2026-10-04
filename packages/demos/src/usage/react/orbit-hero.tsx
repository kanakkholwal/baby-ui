import { OrbitHero } from "@baby-ui/react";

const groups = [
	{
		label: "Frameworks",
		outer: ["React", "Svelte", "Vue", "Solid", "Angular", "Astro", "Qwik", "Lit"],
		inner: ["Next", "Kit", "Nuxt", "Remix"],
	},
	{
		label: "Runtimes",
		outer: ["Node", "Bun", "Deno", "Workers", "Lambda", "Edge", "WASM", "Docker"],
		inner: ["V8", "JSC", "QJS", "SM"],
	},
];

export function Example() {
	return (
		<OrbitHero
			headline="Icons for"
			subheading="Modern Frameworks"
			description="One icon set, packaged for every stack you ship."
			actions={[
				{ label: "Explore", href: "/icons" },
				{ label: "Get started", href: "/docs" },
			]}
			groups={groups}
			renderItem={(name) => (
				<span className="text-xs font-medium">{name.slice(0, 2)}</span>
			)}
		/>
	);
}
