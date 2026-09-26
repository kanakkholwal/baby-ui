<script lang="ts">
import { CircuitBoard } from "@baby-ui/svelte";

const nodes = [
	{ id: "in", x: 80, y: 200, label: "In", status: "active" as const },
	{ id: "cpu", x: 300, y: 200, label: "CPU", status: "busy" as const },
	{ id: "out", x: 520, y: 200, label: "Out" },
];
</script>

<CircuitBoard
	{nodes}
	connections={[
		{ from: "in", to: "cpu" },
		{ from: "cpu", to: "out", bidirectional: true },
	]}
/>
