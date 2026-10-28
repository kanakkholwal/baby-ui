<script lang="ts">
import { Button, Toaster, toast } from "@baby-ui/svelte";
</script>

<Button onclick={() => toast.success("Deployment ready", { description: "acme-web is live." })}>
	Notify
</Button>

<Toaster />
