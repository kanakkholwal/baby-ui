<script lang="ts">
import { Button, Shortcut } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let last = $state("");
const size = $derived((props.size as "sm" | "md" | "lg" | "xl") ?? "md");
</script>

<div class="flex flex-col items-center gap-3">
	<div class="flex flex-wrap items-center gap-2">
		<Button variant="outline" size="sm" onclick={() => (last = "New file")}>
			New file
			<Shortcut shortcut={(props.shortcut as string) || "cmd+n"} {size} />
		</Button>
		<Button variant="outline" size="sm" onclick={() => (last = "Saved")}>
			Save
			<Shortcut shortcut="cmd+s" />
		</Button>
		<Button size="sm" onclick={() => (last = "Sent")}>
			Send
			<Shortcut shortcut="cmd+enter" />
		</Button>
	</div>
	<p class="text-muted-foreground text-xs">{last ? `${last} via keyboard or click` : "Press a shortcut"}</p>
</div>
