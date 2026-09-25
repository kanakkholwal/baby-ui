<script lang="ts">
import { Attachment } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="flex w-full max-w-80 flex-col gap-2">
	<Attachment
		name={(props.name as string) || "spec-draft.md"}
		size={(props.size as string) || "18 KB"}
		status={(props.status as "uploading" | "ready" | "error") ?? "ready"}
		progress={Number(props.progress ?? 40)}
		onremove={() => {}}
	/>
	<Attachment name="screenshot.png" status="uploading" progress={62} />
	<Attachment name="huge-video.mov" status="error" />
</div>
