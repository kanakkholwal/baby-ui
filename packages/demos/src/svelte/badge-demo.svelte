<script lang="ts">
import type { BadgeSize, BadgeVariant } from "@baby-ui/svelte";
import { Badge } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<Badge
	variant={(props.variant as BadgeVariant) ?? "secondary"}
	size={(props.size as BadgeSize) ?? "md"}
	dot={Boolean(props.dot)}
>
	Production
</Badge>
