<script lang="ts">
import { ResponseStream } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const text = $derived(
	(props.text as string) ||
		"Streaming reveals text at a steady rate so the reader is never chasing it.",
);
</script>

<div class="w-96 rounded-xl border border-border bg-card p-4">
	{#key [text, props.speed]}
		<ResponseStream
			{text}
			speed={Number(props.speed ?? 60)}
			streaming={props.streaming !== false}
		/>
	{/key}
</div>
