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
			action: { label: "View deployment", onclick: () => console.log("open") },
		},
	];
}
</script>

<Button onclick={notify}>Notify</Button>

<Toast bind:toasts position="bottom-right" variant="soft" max={4} />
