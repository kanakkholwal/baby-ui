<script lang="ts">
import { GaugeChart } from "@baby-ui/svelte";
</script>

<div class="w-full max-w-sm">
	<GaugeChart value={64} label="Uptime" tone="scale" format={(v) => `${Math.round(v)}%`} />
</div>
