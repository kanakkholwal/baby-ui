<script lang="ts">
import type { Snippet } from "svelte";

type Size = "sm" | "md" | "lg" | "xl" | "full";

let { size = "full", children }: { size?: Size; children: Snippet } = $props();

// Literal classes so Tailwind sees them; auto demos are gitignored and never scanned.
const WIDTH: Record<Size, string> = {
	sm: "w-full max-w-sm",
	md: "w-full max-w-md",
	lg: "w-full max-w-2xl",
	xl: "w-full max-w-4xl",
	full: "w-full",
};
</script>

<div class={WIDTH[size]}>{@render children()}</div>
