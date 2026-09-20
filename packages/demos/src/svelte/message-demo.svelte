<script lang="ts">
import { Message } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="flex w-96 flex-col gap-4">
	<Message role="user" name="Kanak Kholwal" showActions={false}>
		Why is the dock magnifying from the wrong centre?
	</Message>
	<Message
		role={(props.role as "user" | "assistant") ?? "assistant"}
		name={(props.name as string) || "Assistant"}
		pending={Boolean(props.pending)}
		showActions={props.showActions !== false}
	>
		Because the item's own width grows as it magnifies, so its measured centre moves
		with it. Measure from the resting rect instead.
	</Message>
</div>
