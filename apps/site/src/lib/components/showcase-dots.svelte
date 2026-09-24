<script lang="ts">
let {
	weights,
	rows = 1,
	class: classProp = "",
}: { weights: number[]; rows?: number; class?: string } = $props();

const DOT = 10;

function edges(parts: number[]) {
	const total = parts.reduce((sum, w) => sum + w, 0);
	return [
		0,
		...parts.map((_, i) => parts.slice(0, i + 1).reduce((s, w) => s + w, 0) / total),
	];
}

const cols = $derived(edges(weights));
const rowEdges = $derived(edges(Array.from({ length: rows }, () => 1)));
const pos = (f: number) => `calc(${DOT / 2}px + ${f} * (100% - ${DOT}px))`;
</script>

<div
	aria-hidden="true"
	class="pointer-events-none absolute z-3 {classProp}"
	style:inset="-{DOT / 2}px"
>
	{#each rowEdges as y, r (r)}
		{#each cols as x, c (c)}
			<span
				class="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background md:size-2.5"
				style:left={pos(x)}
				style:top={pos(y)}
			></span>
		{/each}
	{/each}
</div>
