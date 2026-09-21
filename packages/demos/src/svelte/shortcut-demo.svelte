<script lang="ts">
import { Shortcut } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="flex flex-col gap-2 text-sm">
	<div class="flex items-center justify-between gap-6">
		<span class="text-muted-foreground">Command palette</span>
		<Shortcut keys={["⌘", "K"]} size={(props.size as "sm" | "md") ?? "md"} />
	</div>
	<div class="flex items-center justify-between gap-6">
		<span class="text-muted-foreground">Save</span>
		<Shortcut keys={["⌘", "S"]} />
	</div>
</div>
