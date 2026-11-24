<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import {
	type BadgeFill,
	type BadgePlacement,
	type BadgeSize,
	type BadgeVariant,
	badge,
} from "../variants";

type Props = Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> & {
	children?: Snippet;
	class?: string;
	variant?: BadgeVariant;
	size?: BadgeSize;
	fill?: BadgeFill;
	/** Pins the badge to a corner of a `BadgeAnchor`. An empty badge is a dot. */
	placement?: BadgePlacement;
	dot?: boolean;
};

let {
	children,
	class: classProp,
	variant = "default",
	size = "default",
	fill = "soft",
	placement = "none",
	dot = false,
	...rest
}: Props = $props();
</script>

<span
	data-slot="badge"
	data-variant={variant}
	class={cn(badge({ variant, size, fill, placement }), classProp)}
	{...rest}
>
	{#if dot}<span data-slot="badge-dot" class="shrink-0 rounded-full bg-current"></span>{/if}
	{@render children?.()}
</span>
