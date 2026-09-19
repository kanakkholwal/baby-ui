<script lang="ts">
import { BentoCell, BentoGrid } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const cells = [
	{
		span: "2x1" as const,
		title: "Registry",
		body: "shadcn and shadcn-svelte, one spec.",
	},
	{ span: "1x1" as const, title: "Tokens", body: "Shared colour and motion." },
	{ span: "1x1" as const, title: "Agents", body: "llms.txt and specs.json." },
	{ span: "1x1" as const, title: "Playground", body: "Both renders, side by side." },
];
</script>

<BentoGrid
	columns={Number(props.columns ?? 3)}
	gap={Number(props.gap ?? 16)}
	rowHeight={Number(props.rowHeight ?? 160)}
	class="w-full max-w-2xl"
>
	{#each cells as cell (cell.title)}
		<BentoCell span={cell.span} title={cell.title} description={cell.body} />
	{/each}
</BentoGrid>
