<script lang="ts">
import {
	NotchedShelf,
	type NotchedShelfAlign,
	type NotchedShelfLayout,
	type NotchedShelfShape,
	type NotchedShelfSize,
	type NotchedShelfVariant,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const variant = $derived((props.variant as NotchedShelfVariant) ?? "solid");
const layout = $derived((props.layout as NotchedShelfLayout) ?? "hanging");
const size = $derived((props.size as NotchedShelfSize) ?? "md");
</script>

<!-- Muted matches the card, so it bridges into a page-coloured surface instead. -->
<div
	class={[
		"flex h-64 w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border",
		variant === "muted" ? "bg-background" : "bg-card",
		layout === "rising" ? "justify-end" : "justify-start",
	]}
>
	<NotchedShelf
		{variant}
		{layout}
		{size}
		shape={(props.shape as NotchedShelfShape) ?? "smooth"}
		align={(props.align as NotchedShelfAlign) ?? "center"}
		edge={props.edge === true}
	>
		<a
			href="#top"
			class={[
				"inline-flex items-center gap-2 rounded-full font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring",
				size === "sm" ? "px-3 text-xs" : size === "lg" ? "px-6 text-sm" : "px-5 text-sm",
			]}
		>
			<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-4">
				<path d="M8 13.5V3M3.5 7.5 8 3l4.5 4.5" />
			</svg>
			Back to top
		</a>
	</NotchedShelf>
</div>
