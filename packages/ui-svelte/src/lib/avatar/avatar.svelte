<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { setAvatar } from "./context";

type Size = "sm" | "md" | "lg" | "xl";

let {
	children,
	size = "md",
	shape = "circle",
	class: classProp,
	...rest
}: {
	children?: Snippet;
	size?: Size;
	shape?: "circle" | "square";
	class?: string;
} & HTMLAttributes<HTMLSpanElement> = $props();

const SIZE: Record<Size, string> = {
	sm: "size-8 text-xs",
	md: "size-10 text-sm",
	lg: "size-14 text-base",
	xl: "size-20 text-xl",
};

let loaded = $state(false);

setAvatar({
	get loaded() {
		return loaded;
	},
	setLoaded: (next) => (loaded = next),
});
</script>

<span
	{...rest}
	data-slot="avatar"
	class={cn(
		"relative inline-grid shrink-0 place-items-center overflow-hidden bg-card",
		shape === "circle" ? "rounded-full" : "rounded-lg",
		SIZE[size],
		classProp,
	)}
>
	{@render children?.()}
</span>
