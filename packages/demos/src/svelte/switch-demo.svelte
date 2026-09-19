<script lang="ts">
import { Switch } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let checked = $state(false);

$effect(() => {
	checked = Boolean(props.checked);
});
</script>

<div class="flex items-center gap-3">
	<Switch
		bind:checked
		disabled={Boolean(props.disabled)}
		size={(props.size as "sm" | "md") ?? "md"}
		label={(props.label as string) || "Notifications"}
	/>
	<span class="text-muted-foreground text-sm">{(props.label as string) || "Notifications"}</span>
</div>
