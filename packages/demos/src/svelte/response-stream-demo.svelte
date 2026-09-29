<script lang="ts">
import { ResponseStream } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ResponseStream>>(props));

const text = $derived(
	p.text || "Streaming reveals text at a steady rate so the reader is never chasing it.",
);
</script>

<div class="w-full max-w-96 rounded-xl border border-border bg-card p-4">
	{#key [text, props.speed]}
		<ResponseStream
			{text}
			speed={Number(props.speed ?? 60)}
			streaming={props.streaming !== false}
			size={p.size ?? "md"}
		/>
	{/key}
</div>
