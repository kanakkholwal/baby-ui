<script lang="ts">
import { Toggle } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const MARKS = [
	{
		id: "bold",
		label: "Bold",
		path: "M5 3h4.5a2.5 2.5 0 0 1 0 5H5zm0 5h5a2.5 2.5 0 0 1 0 5H5z",
	},
	{ id: "italic", label: "Italic", path: "M10 3H6.5m3 10H6m4-10L8 13" },
	{
		id: "underline",
		label: "Underline",
		path: "M4.5 2.5v5a3.5 3.5 0 0 0 7 0v-5M4 13.5h8",
	},
];

let pressed = $state(false);
let on = $state<Record<string, boolean>>({ italic: false, underline: false });

$effect(() => {
	pressed = Boolean(props.pressed);
});

const size = $derived((props.size as "sm" | "md" | "lg" | "xl") ?? "md");
</script>

<div class="inline-flex items-center gap-1 rounded-xl border border-border p-1">
	{#each MARKS as mark (mark.id)}
		<Toggle
			{size}
			label={mark.label}
			disabled={mark.id === "bold" && Boolean(props.disabled)}
			bind:pressed={
				() => (mark.id === "bold" ? pressed : Boolean(on[mark.id])),
				(next) => (mark.id === "bold" ? (pressed = next) : (on[mark.id] = next))
			}
		>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
				<path
					d={mark.path}
					stroke="currentColor"
					stroke-width="1.4"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</Toggle>
	{/each}
</div>
