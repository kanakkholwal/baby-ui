"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { useCanvasEngine } from "../lib/use-canvas-engine";
import { mountSilkAurora, type SilkAuroraOptions } from "./silk";
import {
	SILK_AURORA_COLORS,
	SILK_AURORA_SPEED,
	type SilkAuroraPosition,
	type SilkAuroraSpeed,
	type SilkAuroraTone,
	silkAurora,
} from "./variants";

export type { SilkAuroraPosition, SilkAuroraSpeed, SilkAuroraTone };

export interface SilkAuroraProps {
	tone?: SilkAuroraTone;
	speed?: SilkAuroraSpeed;
	position?: SilkAuroraPosition;
	/** Ribbon and sheen strength, 0 to 2. */
	intensity?: number;
	/** Film grain, 0 to 1. */
	grain?: number;
	/** Ribbons lean toward the pointer, which lifts a soft sheen. */
	interactive?: boolean;
	className?: string;
	children?: ReactNode;
}

/** Three soft silk ribbons with a pearlescent sheen, drawn in WebGL from theme tokens. */
export function SilkAurora({
	tone = "pearl",
	speed = "normal",
	position = "absolute",
	intensity = 1,
	grain = 0.85,
	interactive = true,
	className,
	children,
}: SilkAuroraProps) {
	const options: SilkAuroraOptions = {
		colors: SILK_AURORA_COLORS[tone],
		speed: SILK_AURORA_SPEED[speed],
		intensity,
		grain,
		interactive,
	};
	const { root, canvas, webgl } = useCanvasEngine(mountSilkAurora, options, [
		tone,
		speed,
		intensity,
		grain,
		interactive,
	]);
	const s = silkAurora({ tone, speed, position, webgl });

	return (
		<div ref={root} data-slot="silk-aurora" className={cn(s.root(), className)}>
			<div aria-hidden className={s.fallback()} />
			<canvas ref={canvas} aria-hidden className={s.canvas()} />
			{children ? <div className={s.content()}>{children}</div> : null}
		</div>
	);
}
