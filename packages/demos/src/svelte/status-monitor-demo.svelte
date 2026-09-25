<script lang="ts">
import {
	StatusMonitor,
	type StatusMonitorSize,
	type StatusMonitorUnit,
} from "@baby-ui/svelte";
import { STATUSES } from "../data/status";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<StatusMonitor
	statuses={STATUSES}
	title="API"
	locale="en-US"
	size={(props.size as StatusMonitorSize) ?? "md"}
	unit={(props.unit as StatusMonitorUnit) ?? "days"}
	showUptime={(props.showUptime as boolean) ?? true}
/>
