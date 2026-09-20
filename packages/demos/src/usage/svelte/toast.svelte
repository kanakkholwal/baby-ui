<script lang="ts">
import { Button, Toast, type ToastItem } from "@baby-ui/svelte";

let toasts = $state<ToastItem[]>([]);

function notify() {
	toasts = [
		...toasts,
		{
			id: crypto.randomUUID(),
			title: "Deployment ready",
			description: "acme-web is live.",
			tone: "success",
		},
	];
}
</script>

<Button onclick={notify}>Notify</Button>

<Toast bind:toasts position="bottom-right" />
