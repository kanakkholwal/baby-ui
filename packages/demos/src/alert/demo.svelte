<script lang="ts">
import type { AlertVariant } from "@baby-ui/svelte";
import { Alert, AlertDescription, AlertTitle } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Alert>>(props));

const ICON: Record<AlertVariant, string> = {
	info: "M8 7.2v4M8 5.1h.01",
	success: "M4.8 8.3 7 10.5l4.2-4.6",
	warning: "M8 5.6v3.2M8 11.1h.01",
	destructive: "M5.6 5.6l4.8 4.8M10.4 5.6l-4.8 4.8",
};

const variant = $derived(p.variant ?? "info");
</script>

<div class="w-full max-w-md">
	{#key [variant, p.dismissible]}
		<Alert {variant} dismissible={p.dismissible ?? false}>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
				<circle cx="8" cy="8" r="6.4" stroke="currentColor" stroke-width="1.3" />
				<path d={ICON[variant]} stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
			<AlertTitle>Deployment finished</AlertTitle>
			<AlertDescription>
				Your last deploy finished 4 minutes ago and is serving traffic.
			</AlertDescription>
		</Alert>
	{/key}
</div>
