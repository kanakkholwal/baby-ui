<script lang="ts">
import { Label, Select, Sheet } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let open = $state(false);
let region = $state("fra");
</script>

<button type="button" class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm" onclick={() => (open = true)}>Open sheet</button>

<Sheet
	bind:open
	side={(props.side as "left" | "right" | "top" | "bottom") ?? "right"}
	title={(props.title as string) || "Filters"}
>
	<div class="flex flex-col gap-1.5">
		<Label for="sheet-region">Region</Label>
		<Select
			bind:value={region}
			label="Region"
			options={[
				{ value: "fra", label: "Frankfurt" },
				{ value: "iad", label: "Washington DC" },
				{ value: "syd", label: "Sydney" },
			]}
		/>
	</div>
	<p class="text-muted-foreground text-sm">Escape closes the sheet and restores focus.</p>
</Sheet>
