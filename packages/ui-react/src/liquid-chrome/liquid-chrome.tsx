"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { type LiquidChromeOptions, mountLiquidChrome } from "./chrome";
import {
	LIQUID_CHROME_COLORS,
	LIQUID_CHROME_SPEED,
	type LiquidChromePosition,
	type LiquidChromeSpeed,
	type LiquidChromeTone,
	liquidChrome,
} from "./variants";

export type { LiquidChromePosition, LiquidChromeSpeed, LiquidChromeTone };

export interface LiquidChromeProps {
	tone?: LiquidChromeTone;
	speed?: LiquidChromeSpeed;
	position?: LiquidChromePosition;
	/** Domain-warp depth of the metal, 0 to 1.5. */
	amplitude?: number;
	/** The surface bulges away from the pointer instead of the centre. */
	interactive?: boolean;
	className?: string;
	children?: ReactNode;
}

/** Domain-warped liquid metal with silver and specular bands, drawn in WebGL from theme tokens. */
export function LiquidChrome({
	tone = "chrome",
	speed = "normal",
	position = "absolute",
	amplitude = 0.6,
	interactive = true,
	className,
	children,
}: LiquidChromeProps) {
	const root = useRef<HTMLDivElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const engine = useRef<ReturnType<typeof mountLiquidChrome>>(null);
	const [webgl, setWebgl] = useState(false);
	const s = liquidChrome({ tone, speed, position, webgl });
	const options: LiquidChromeOptions = {
		colors: LIQUID_CHROME_COLORS[tone],
		speed: LIQUID_CHROME_SPEED[speed],
		amplitude,
		interactive,
	};
	const latest = useRef(options);
	latest.current = options;

	useEffect(() => {
		if (!root.current || !canvas.current) return;
		const mounted = mountLiquidChrome(
			root.current,
			canvas.current,
			latest.current,
			setWebgl,
		);
		engine.current = mounted;
		return () => {
			mounted.destroy();
			engine.current = null;
		};
	}, []);

	useEffect(() => {
		engine.current?.update(latest.current);
	}, [tone, speed, amplitude, interactive]);

	return (
		<div ref={root} data-slot="liquid-chrome" className={cn(s.root(), className)}>
			<div aria-hidden className={s.fallback()} />
			<canvas ref={canvas} aria-hidden className={s.canvas()} />
			{children ? <div className={s.content()}>{children}</div> : null}
		</div>
	);
}
