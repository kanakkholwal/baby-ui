<script lang="ts">
import { Badge, Button, ButtonGroup, ButtonGroupSeparator } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ButtonGroup>>(props));
const seam = $derived(p.orientation === "vertical" ? "horizontal" : "vertical");

const PATHS = {
	fork: "M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 9a9 9 0 0 1-9 9",
	down: "m6 9 6 6 6-6",
	left: "m15 18-6-6 6-6",
	right: "m9 18 6-6-6-6",
	alignLeft: "M21 6H3M15 12H3M17 18H3",
	alignCenter: "M21 6H3M17 12H7M19 18H5",
	alignRight: "M21 6H3M21 12H9M21 18H7",
	justify: "M3 6h18M3 12h18M3 18h18",
} as const;
</script>

{#snippet icon(name: keyof typeof PATHS)}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<path d={PATHS[name]} />
	</svg>
{/snippet}

<div class="flex flex-col items-start gap-5">
	<ButtonGroup aria-label="Merge">
		<Button roundness="full">Merge pull request</Button>
		<ButtonGroupSeparator />
		<Button roundness="full" size="icon" aria-label="More merge options">{@render icon("down")}</Button>
	</ButtonGroup>

	<ButtonGroup aria-label="Fork">
		<Button variant="secondary" roundness="full">
			{@render icon("fork")}
			Fork
			<Badge size="sm">24</Badge>
		</Button>
		<ButtonGroupSeparator />
		<Button variant="secondary" roundness="full" size="icon" aria-label="More fork options">{@render icon("down")}</Button>
	</ButtonGroup>

	<ButtonGroup aria-label="Pagination">
		<Button variant="secondary" roundness="full">
			{@render icon("left")}
			Previous
		</Button>
		<ButtonGroupSeparator />
		<Button variant="secondary" roundness="full">
			Next
			{@render icon("right")}
		</Button>
	</ButtonGroup>

	<ButtonGroup aria-label="Text alignment" orientation={p.orientation}>
		<Button variant="secondary" roundness="full" size="icon" aria-label="Align left">{@render icon("alignLeft")}</Button>
		<ButtonGroupSeparator orientation={seam} />
		<Button variant="secondary" roundness="full" size="icon" aria-label="Align center">{@render icon("alignCenter")}</Button>
		<ButtonGroupSeparator orientation={seam} />
		<Button variant="secondary" roundness="full" size="icon" aria-label="Align right">{@render icon("alignRight")}</Button>
		<ButtonGroupSeparator orientation={seam} />
		<Button variant="secondary" roundness="full" size="icon" aria-label="Justify">{@render icon("justify")}</Button>
	</ButtonGroup>
</div>
