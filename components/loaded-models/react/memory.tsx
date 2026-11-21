"use client";

import { cn } from "../../lib/cn";
import { formatMemory, memorySegments } from "../model";
import { loadedModels } from "../variants";
import { useLoadedModels } from "./loaded-models";

/** A stacked bar of what each loaded model holds against `total` bytes; models need a `size`. */
export function LoadedModelsMemory({
	total,
	className,
}: {
	total: number;
	className?: string;
}) {
	const { models } = useLoadedModels();
	const styles = loadedModels();
	const segments = memorySegments(models, total);
	const used = segments.reduce((sum, s) => sum + s.size, 0);
	return (
		<div data-slot="loaded-models-memory" className={cn(styles.memory(), className)}>
			<div
				role="img"
				aria-label={`${formatMemory(used)} of ${formatMemory(total)} in use`}
				className={styles.memoryBar()}
			>
				{segments.map((segment, i) => (
					<span
						key={segment.id}
						title={segment.name}
						className={styles.memorySegment()}
						style={{
							width: `${segment.percent}%`,
							background: `var(--chart-${(i % 5) + 1})`,
						}}
					/>
				))}
			</div>
			<p className={styles.memoryText()}>
				<span>{formatMemory(used)} in use</span>
				<span>{formatMemory(Math.max(0, total - used))} free</span>
			</p>
		</div>
	);
}
