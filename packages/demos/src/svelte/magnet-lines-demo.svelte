<script lang="ts">
import { MagnetLines, type MagnetLinesSize, type MagnetLinesTone } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<MagnetLines
	rows={Number(props.rows ?? 9)}
	columns={Number(props.columns ?? 9)}
	size={(props.size as MagnetLinesSize) ?? "md"}
	tone={(props.tone as MagnetLinesTone) ?? "muted"}
	baseAngle={Number(props.baseAngle ?? 0)}
/>
