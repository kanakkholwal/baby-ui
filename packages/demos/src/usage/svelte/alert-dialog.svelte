<script lang="ts">
import { AlertDialog, Button } from "@baby-ui/svelte";

let open = $state(false);
</script>

<Button variant="destructive" onclick={() => (open = true)}>Delete project</Button>

<AlertDialog
	bind:open
	title="Delete this project?"
	description="Every deployment and build log goes with it. This cannot be undone."
	confirmLabel="Delete"
	destructive
	onconfirm={() => console.log("deleted")}
/>
