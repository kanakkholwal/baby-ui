<script lang="ts">
import { cn } from "../lib/cn.js";

type Props = {
	name: string;
	src?: string;
	class?: string;
	size?: "xs" | "sm" | "md" | "lg";
	shape?: "circle" | "square";
};

let { name, src, class: classProp, size = "md", shape = "circle" }: Props = $props();

const SIZE = {
	xs: "size-6 text-[10px]",
	sm: "size-8 text-xs",
	md: "size-10 text-sm",
	lg: "size-14 text-base",
};

let failed = $state(false);
let loaded = $state(false);

$effect(() => {
	void src;
	failed = false;
	loaded = false;
});

const initials = $derived.by(() => {
	const words = name.trim().split(/\s+/);
	const first = words[0]?.[0] ?? "";
	const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? "") : "";
	return (first + last).toUpperCase();
});
</script>

<span
	class={cn(
		"relative inline-grid shrink-0 place-items-center overflow-hidden bg-card font-medium text-muted-foreground select-none",
		shape === "circle" ? "rounded-full" : "rounded-lg",
		SIZE[size],
		classProp,
	)}
>
	<span aria-hidden="true">{initials}</span>
	{#if src && !failed}
		<img
			{src}
			alt={name}
			onload={() => (loaded = true)}
			onerror={() => (failed = true)}
			style:opacity={loaded ? 1 : 0}
			class="absolute inset-0 size-full object-cover transition-opacity duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
		/>
	{/if}
</span>
