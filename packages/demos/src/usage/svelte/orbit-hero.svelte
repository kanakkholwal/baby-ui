<script lang="ts">
import { OrbitHero } from "@baby-ui/svelte";

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
</script>

<OrbitHero
	headline="Icons for"
	subheading="Modern Frameworks"
	description="One icon set, packaged for every stack you ship."
	actions={[{ label: "Explore", href: "/icons" }, { label: "Get started", href: "/docs" }]}
	{groups}
>
	{#snippet item(name)}
		<span class="text-xs font-medium">{name.slice(0, 2)}</span>
	{/snippet}
</OrbitHero>
