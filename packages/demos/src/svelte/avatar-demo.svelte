<script lang="ts">
import { Avatar } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="flex items-center gap-3">
	<Avatar
		name={(props.name as string) || "Kanak Kholwal"}
		src={(props.src as string) || undefined}
		size={(props.size as "xs" | "sm" | "md" | "lg") ?? "md"}
		shape={(props.shape as "circle" | "square") ?? "circle"}
	/>
	<div class="text-sm">
		<p class="font-medium text-foreground">{(props.name as string) || "Kanak Kholwal"}</p>
		<p class="text-muted-foreground text-xs">Fallback shows until an image loads</p>
	</div>
</div>
