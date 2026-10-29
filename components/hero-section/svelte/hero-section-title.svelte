<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { heroSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLHeadingElement> & { children?: Snippet } = $props();
const hero = heroSectionState();
</script>

<h1
	data-slot="hero-section-title"
	id={hero.titleId}
	{...rest}
	class={cn(hero.styles.title(), classProp)}
>
	{@render children?.()}
</h1>
