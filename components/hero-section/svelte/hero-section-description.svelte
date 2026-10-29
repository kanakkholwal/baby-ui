<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { heroSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLParagraphElement> & { children?: Snippet } = $props();
const hero = heroSectionState();
</script>

<p
	data-slot="hero-section-description"
	{...rest}
	class={cn(hero.styles.description(), classProp)}
>
	{@render children?.()}
</p>
