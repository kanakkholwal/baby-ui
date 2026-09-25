<script lang="ts">
import { ResponseStream } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";

type ResponseStreamSize = NonNullable<ComponentProps<typeof ResponseStream>["size"]>;

let { props = {} }: { props?: Record<string, unknown> } = $props();

const text = $derived(
	(props.text as string) ||
		"Streaming reveals text at a steady rate so the reader is never chasing it.",
);
</script>

<div class="w-full max-w-96 rounded-xl border border-border bg-card p-4">
	{#key [text, props.speed]}
		<ResponseStream
			{text}
			speed={Number(props.speed ?? 60)}
			streaming={props.streaming !== false}
			size={(props.size as ResponseStreamSize) ?? "md"}
		/>
	{/key}
</div>
