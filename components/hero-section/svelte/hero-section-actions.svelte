<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { heroSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
const hero = heroSectionState();
</script>

<div data-slot="hero-section-actions" {...rest} class={cn(hero.styles.actions(), classProp)}>
	{@render children?.()}
</div>
