<script lang="ts">
import { Composer } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state("");
let sent = $state("");
</script>

<div class="flex w-96 flex-col gap-2">
	<Composer
		bind:value
		placeholder={(props.placeholder as string) || "Send a message…"}
		busy={Boolean(props.busy)}
		disabled={Boolean(props.disabled)}
		maxRows={Number(props.maxRows ?? 8)}
		onsubmit={(text) => (sent = text)}
	/>
	{#if sent}<p class="text-muted-foreground text-xs">Sent: {sent}</p>{/if}
</div>
