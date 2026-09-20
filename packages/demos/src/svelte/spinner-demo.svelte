<script lang="ts">
import { Button, Spinner } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const size = $derived((props.size as "sm" | "md" | "lg" | "xl") ?? "md");
const label = $derived((props.label as string) || "Checking availability");
</script>

<div class="flex w-64 flex-col items-center gap-4">
	<div class="flex items-center gap-2.5 text-muted-foreground">
		<Spinner {size} {label} />
		<span class="text-sm">{label}</span>
	</div>
	<Button loading loadingLabel="Reserving…" class="w-full">Reserve name</Button>
</div>
