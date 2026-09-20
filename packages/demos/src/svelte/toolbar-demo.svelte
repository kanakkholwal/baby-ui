<script lang="ts">
import { Toolbar } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const tools = [
	{
		id: "bold",
		label: "Bold",
		path: "M5 3h4.5a2.5 2.5 0 0 1 0 5H5zm0 5h5a2.5 2.5 0 0 1 0 5H5z",
	},
	{ id: "italic", label: "Italic", path: "M10 3H6.5M9.5 13H6M9 3 7 13" },
	{
		id: "link",
		label: "Link",
		path: "M6.5 9.5 9.5 6.5M7 4.5 8.5 3a2.8 2.8 0 0 1 4 4l-1.5 1.5M9 11.5 7.5 13a2.8 2.8 0 0 1-4-4L5 7.5",
	},
];
</script>

<Toolbar
	orientation={(props.orientation as "horizontal" | "vertical") ?? "horizontal"}
	label={(props.label as string) || "Formatting"}
>
	{#each tools as tool (tool.id)}
		<button
			type="button"
			data-toolbar-item
			aria-label={tool.label}
			class="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
		>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
				<path d={tool.path} stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	{/each}
</Toolbar>
