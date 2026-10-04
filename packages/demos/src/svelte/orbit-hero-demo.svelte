<script lang="ts">
import { OrbitHero } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { ORBIT_GLYPHS, ORBIT_GROUPS, ORBIT_HERO } from "../data/orbit-hero";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof OrbitHero>>(props));
</script>

<OrbitHero
	headline={p.headline ?? ORBIT_HERO.headline}
	subheading={p.subheading ?? ORBIT_HERO.subheading}
	description={p.description ?? ORBIT_HERO.description}
	badge={p.badge}
	interval={p.interval}
	variant={p.variant}
	size={p.size ?? "section"}
	groups={ORBIT_GROUPS}
	actions={ORBIT_HERO.actions}
>
	{#snippet item(name)}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
			{#each ORBIT_GLYPHS[name] ?? [] as [d, faded], i (i)}
				<path {d} opacity={faded ? 0.5 : undefined} />
			{/each}
		</svg>
	{/snippet}
</OrbitHero>
