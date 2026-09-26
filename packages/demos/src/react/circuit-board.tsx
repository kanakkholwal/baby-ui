import {
	CircuitBoard,
	type CircuitBoardSpeed,
	type CircuitBoardTone,
} from "@baby-ui/react";
import { CIRCUIT_CONNECTIONS, CIRCUIT_NODES } from "../data/circuit";

type Props = Record<string, unknown>;

export function CircuitBoardDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-2xl">
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
	);
}
