<script lang="ts">
import { OgStatsMetrics } from "@baby-ui/svelte";
</script>

<OgStatsMetrics
	headline="Q3 was our strongest quarter yet"
	period="Q3 2026"
	sparkline={[12, 15, 14, 19, 22, 26, 30, 35, 44]}
	stats={[
		{ label: "Quarterly revenue", value: "$1.2M", delta: "+18%", trend: "up" },
		{ label: "active users", value: "48.3k" },
		{ label: "NPS", value: "64" },
	]}
/>
