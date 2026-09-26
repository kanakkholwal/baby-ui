<script lang="ts">
import {
	CircuitBoard,
	type CircuitBoardSpeed,
	type CircuitBoardTone,
} from "@baby-ui/svelte";
import { CIRCUIT_CONNECTIONS, CIRCUIT_NODES } from "../data/circuit";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-full max-w-2xl">
	<CircuitBoard
		nodes={CIRCUIT_NODES}
		connections={CIRCUIT_CONNECTIONS}
		nodeSize={Number(props.nodeSize ?? 32)}
		gridSize={Number(props.gridSize ?? 20)}
		showGrid={(props.showGrid as boolean) ?? true}
		tone={(props.tone as CircuitBoardTone) ?? "primary"}
		speed={(props.speed as CircuitBoardSpeed) ?? "normal"}
		label="Data pipeline: input feeds parse and validate, which merge into output; the cache has an error."
	/>
</div>
