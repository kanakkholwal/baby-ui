<script lang="ts">
import type { ButtonSize, ButtonVariant } from "@baby-ui/svelte";
import { Button } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const variant = $derived((props.variant as ButtonVariant) ?? "default");
const size = $derived((props.size as ButtonSize) ?? "md");
const href = $derived((props.href as string) || undefined);
const loading = $derived(Boolean(props.loading));
const loadingLabel = $derived((props.loadingLabel as string) || "Loading…");
const disabled = $derived(Boolean(props.disabled));
</script>

<Button {variant} {size} {href} {loading} {loadingLabel} {disabled}>
	{size === "icon" ? "" : "Deploy project"}
	{#if size === "icon"}
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path
				d="M8 3.5v9M3.5 8h9"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linecap="round"
			/>
		</svg>
	{/if}
</Button>
