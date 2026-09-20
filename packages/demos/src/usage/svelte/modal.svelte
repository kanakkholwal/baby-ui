<script lang="ts">
import { Button, Modal } from "@baby-ui/svelte";

let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open</Button>

<Modal bind:open title="Invite a teammate" description="They get read access by default.">
	<p class="text-muted-foreground text-sm">Send an invite link to their work email.</p>
	{#snippet footer()}
		<Button size="sm" onclick={() => (open = false)}>Send invite</Button>
	{/snippet}
</Modal>
