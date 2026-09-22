<script lang="ts">
import {
	Message,
	type MessageLayout,
	type MessageMotion,
	type MessageTone,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="flex w-96 flex-col gap-4">
	<Message align="end" name="Kanak Kholwal" tone="solid" showActions={false}>
		Why is the dock magnifying from the wrong centre?
	</Message>
	{#key props.motion}
		<Message
			align={(props.align as "start" | "end") ?? "start"}
			name={(props.name as string) || "Assistant"}
			tone={(props.tone as MessageTone) ?? "surface"}
			layout={(props.layout as MessageLayout) ?? "default"}
			motion={(props.motion as MessageMotion) ?? "none"}
			pending={Boolean(props.pending)}
			showActions={props.showActions !== false}
		>
			Because the item's own width grows as it magnifies, so its measured centre moves
			with it. Measure from the resting rect instead.
		</Message>
	{/key}
</div>
