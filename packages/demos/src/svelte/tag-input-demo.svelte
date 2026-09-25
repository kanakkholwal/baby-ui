<script lang="ts">
import { TagInput } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let tags = $state(["svelte", "react"]);
</script>

<div class="w-full max-w-80">
	<TagInput
		bind:tags
		placeholder={(props.placeholder as string) || "Add a tag…"}
		max={Number(props.max ?? 6)}
		disabled={Boolean(props.disabled)}
		label="Tags"
	/>
</div>
