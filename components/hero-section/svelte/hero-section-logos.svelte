<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { heroSectionState } from "./context";

let {
	label,
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & {
	/** A line above the logos, e.g. "Trusted by teams at". */
	label?: string;
	children?: Snippet;
} = $props();
const hero = heroSectionState();
</script>

<!-- A row of customer logos; hovering one dims the rest. -->
<div data-slot="hero-section-logos" {...rest} class={cn(hero.styles.logos(), classProp)}>
	{#if label}<p class={hero.styles.logosLabel()}>{label}</p>{/if}
	<div class={hero.styles.logosList()}>{@render children?.()}</div>
</div>
