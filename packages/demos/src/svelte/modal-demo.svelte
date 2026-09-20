<script lang="ts">
import { Button, Modal } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let open = $state(false);
</script>

<button type="button" class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm" onclick={() => (open = true)}>Open modal</button>

<Modal
	bind:open
	title={(props.title as string) || "Deploy to production"}
	description={(props.description as string) || "This will replace the current build."}
	size={(props.size as "sm" | "md" | "lg") ?? "md"}
	dismissOnBackdrop={props.dismissOnBackdrop !== false}
>
	Traffic shifts as soon as the build is healthy. The previous deployment stays
	available for instant rollback.
	{#snippet footer()}
		<Button variant="ghost" size="sm" onclick={() => (open = false)}>Cancel</Button>
		<Button size="sm" onclick={() => (open = false)}>Deploy</Button>
	{/snippet}
</Modal>
