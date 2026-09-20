<script lang="ts">
import { Switch } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let checked = $state(false);
let digest = $state(true);

$effect(() => {
	checked = Boolean(props.checked);
});

const size = $derived((props.size as "sm" | "md" | "lg" | "xl") ?? "md");

// Switch renders its own label; reversing the row puts the text first without a second one.
const ROW = "flex w-full flex-row-reverse items-center justify-between gap-6";
</script>

<div class="flex w-72 flex-col divide-y divide-border rounded-xl border border-border">
	<div class="px-4 py-3">
		<Switch
			bind:checked
			{size}
			disabled={Boolean(props.disabled)}
			label={(props.label as string) || "Push notifications"}
			class={ROW}
		/>
	</div>
	<div class="px-4 py-3">
		<Switch bind:checked={digest} {size} label="Weekly digest" class={ROW} />
	</div>
	<div class="px-4 py-3">
		<Switch checked={false} {size} disabled label="SMS alerts" class={ROW} />
	</div>
</div>
