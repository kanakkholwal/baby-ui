<script lang="ts">
import { Toast, type ToastItem, type ToastTone } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let toasts = $state<ToastItem[]>([
	{
		id: "1",
		title: "Deploy finished",
		description: "Live in 4 regions.",
		tone: "success",
	},
]);
let n = $state(1);

function push(tone: ToastTone) {
	n += 1;
	toasts = [
		...toasts,
		{ id: String(n), title: `Notification ${n}`, description: "Dismiss me.", tone },
	];
}
</script>

<div class="flex flex-wrap gap-2">
	<button type="button" class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm" onclick={() => push("info")}>Add toast</button>
	<button type="button" class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm" onclick={() => push("error")}>Add error</button>
</div>

<Toast
	bind:toasts
	position={(props.position as "bottom-right" | "bottom-center" | "top-right") ?? "bottom-right"}
/>
