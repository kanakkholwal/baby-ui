<script lang="ts">
import { Label, Textarea } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state("Type a few lines and watch the field grow with the content.");
</script>

<div class="flex w-80 flex-col gap-1.5">
	<Label for="demo-textarea">Release notes</Label>
	<Textarea
		id="demo-textarea"
		bind:value
		rows={Number(props.rows ?? 3)}
		autoGrow={props.autoGrow !== false}
		maxRows={Number(props.maxRows ?? 10)}
		invalid={Boolean(props.invalid)}
		disabled={Boolean(props.disabled)}
	/>
</div>
