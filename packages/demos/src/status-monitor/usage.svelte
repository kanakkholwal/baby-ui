<script lang="ts">
import { StatusMonitor, type StatusMonitorItem } from "@baby-ui/svelte";

let { statuses }: { statuses: StatusMonitorItem[] } = $props();
</script>

<StatusMonitor {statuses} title="API" />
