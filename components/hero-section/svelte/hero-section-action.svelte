<script lang="ts">
import type { Snippet } from "svelte";
import Button from "../../button/svelte/button.svelte";
import type { ButtonVariant } from "../../button/variants";
import { cn } from "../../lib/cn";
import { heroSectionState } from "./context";

let {
	href,
	onclick,
	variant = "default",
	class: classProp,
	children,
}: {
	/** Renders a link; otherwise a button calling `onclick`. */
	href?: string;
	onclick?: () => void;
	/** `default` for the primary action, `outline` or `ghost` for the rest. */
	variant?: ButtonVariant;
	class?: string;
	children?: Snippet;
} = $props();
const hero = heroSectionState();
</script>

<Button
	data-slot="hero-section-action"
	{href}
	{onclick}
	{variant}
	size="lg"
	class={cn(hero.styles.action(), classProp)}
>
	{@render children?.()}
</Button>
