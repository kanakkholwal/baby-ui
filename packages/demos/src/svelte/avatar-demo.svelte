<script lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const name = $derived((props.name as string) || "Kanak Kholwal");
const initials = $derived(
	name
		.trim()
		.split(/\s+/)
		.map((word) => word[0] ?? "")
		.slice(0, 2)
		.join("")
		.toUpperCase(),
);
</script>

<div class="flex items-center gap-3">
	<Avatar
		size={(props.size as "sm" | "md" | "lg" | "xl") ?? "md"}
		shape={(props.shape as "circle" | "square") ?? "circle"}
	>
		<AvatarFallback>{initials}</AvatarFallback>
		<AvatarImage src={(props.src as string) || undefined} alt={name} />
	</Avatar>
	<div class="text-sm">
		<p class="font-medium text-foreground">{name}</p>
		<p class="text-muted-foreground text-xs">Fallback shows until an image loads</p>
	</div>
</div>
