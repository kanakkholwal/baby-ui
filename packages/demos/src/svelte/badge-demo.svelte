<script lang="ts">
import type { BadgeSize, BadgeVariant } from "@baby-ui/svelte";
import { Badge } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const size = $derived((props.size as BadgeSize) ?? "md");
</script>

<div class="flex w-72 flex-col gap-3 text-sm">
	<div class="flex items-center justify-between gap-4">
		<span class="text-muted-foreground">api-gateway</span>
		<Badge
			variant={(props.variant as BadgeVariant) ?? "success"}
			{size}
			dot={props.dot !== false}
		>
			Healthy
		</Badge>
	</div>
	<div class="flex items-center justify-between gap-4">
		<span class="text-muted-foreground">image-resizer</span>
		<Badge variant="warning" dot>Degraded</Badge>
	</div>
	<div class="flex items-center justify-between gap-4">
		<span class="text-muted-foreground">legacy-billing</span>
		<Badge variant="destructive" dot>Down</Badge>
	</div>
</div>
