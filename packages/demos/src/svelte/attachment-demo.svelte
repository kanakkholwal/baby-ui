<script lang="ts">
import { Attachment } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Attachment>>(props));
</script>

<div class="flex w-full max-w-80 flex-col gap-2">
	<Attachment
		name={p.name || "spec-draft.md"}
		size={p.size || "18 KB"}
		status={p.status ?? "ready"}
		progress={Number(props.progress ?? 40)}
		onremove={() => {}}
	/>
	<Attachment
		name="screenshot.png"
		status="uploading"
		progress={62}
		preview="https://picsum.photos/id/1025/96/96"
		onremove={() => {}}
	/>
	<Attachment name="huge-video.mov" status="error" onretry={() => {}} onremove={() => {}} />
</div>
