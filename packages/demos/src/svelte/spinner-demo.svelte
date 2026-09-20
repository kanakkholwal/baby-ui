<script lang="ts">
import { Spinner } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="flex items-center gap-3 text-muted-foreground">
	<Spinner
		size={(props.size as "sm" | "md" | "lg") ?? "md"}
		label={(props.label as string) || "Loading results"}
	/>
	<span class="text-sm">{(props.label as string) || "Loading results"}</span>
</div>
