<script lang="ts">
import {
	Badge,
	Button,
	type ShowcaseFrame,
	ShowcaseGrid,
	ShowcasePanel,
	type ShowcaseSpan,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const panels: { title: string; tag: string; span: ShowcaseSpan }[] = [
	{ title: "Charts", tag: "d3 + SVG", span: 7 },
	{ title: "Agents", tag: "streaming", span: 5 },
	{ title: "Text", tag: "motion", span: 5 },
	{ title: "Blocks", tag: "layouts", span: 7 },
];
</script>

<div class="w-full max-w-3xl p-2 md:p-10">
	<ShowcaseGrid frame={(props.frame as ShowcaseFrame) ?? "rulers"}>
		{#each panels as panel (panel.title)}
			<ShowcasePanel span={panel.span} class="min-h-36 md:min-h-44">
				{#snippet actions()}
					<Button size="sm" variant="outline">Open</Button>
				{/snippet}
				<div class="flex flex-col items-center gap-2">
					<span class="font-medium text-foreground text-lg">{panel.title}</span>
					<Badge variant="outline">{panel.tag}</Badge>
				</div>
			</ShowcasePanel>
		{/each}
	</ShowcaseGrid>
</div>
