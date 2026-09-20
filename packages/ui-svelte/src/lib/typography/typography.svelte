<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

export type TypographyVariant =
	| "h1"
	| "h2"
	| "h3"
	| "body"
	| "lead"
	| "small"
	| "muted"
	| "code";

let {
	children,
	variant = "body",
	as,
	class: classProp,
}: {
	children: Snippet;
	variant?: TypographyVariant;
	as?: string;
	class?: string;
} = $props();

const STYLE: Record<TypographyVariant, string> = {
	h1: "font-heading text-4xl font-semibold tracking-tight",
	h2: "font-heading text-2xl font-semibold tracking-tight",
	h3: "font-heading text-lg font-semibold tracking-tight",
	body: "text-base leading-relaxed",
	lead: "text-lg text-muted-foreground leading-relaxed",
	small: "text-sm",
	muted: "text-sm text-muted-foreground",
	code: "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em]",
};

const TAG: Record<TypographyVariant, string> = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	body: "p",
	lead: "p",
	small: "p",
	muted: "p",
	code: "code",
};

const tag = $derived(as ?? TAG[variant]);
</script>

<svelte:element this={tag} class={cn(STYLE[variant], classProp)}>
	{@render children()}
</svelte:element>
