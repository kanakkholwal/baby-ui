"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import { type EyeTrackingOptions, mountEyeTracking } from "./eyes";
import { type EyeTrackingSize, type EyeTrackingVariant, eyeTracking } from "./variants";

export type { EyeTrackingSize, EyeTrackingVariant };

export interface EyeTrackingProps {
	variant?: EyeTrackingVariant;
	size?: EyeTrackingSize;
	eyeCount?: number;
	/** How far the iris may travel toward the rim, 0 to 1. */
	pupilRange?: number;
	blink?: boolean;
	/** Time between blinks in ms. */
	blinkInterval?: number;
	/** Pupils widen as the pointer nears. */
	reactivePupil?: boolean;
	/** Light glints on the iris. */
	reflection?: boolean;
	className?: string;
}

/** A row of eyes whose irises follow the pointer and blink now and then. */
export function EyeTracking({
	variant = "realistic",
	size = "md",
	eyeCount = 2,
	pupilRange = 0.7,
	blink = true,
	blinkInterval = 4000,
	reactivePupil = true,
	reflection = true,
	className,
}: EyeTrackingProps) {
	const root = useRef<HTMLDivElement>(null);
	const engine = useRef<ReturnType<typeof mountEyeTracking>>(null);
	const s = eyeTracking({ variant, size, blink, reflection });
	const count = Math.max(1, Math.floor(eyeCount));
	const options: EyeTrackingOptions = { pupilRange, reactivePupil };
	const latest = useRef(options);
	latest.current = options;

	useEffect(() => {
		if (!root.current) return;
		const mounted = mountEyeTracking(root.current, latest.current);
		engine.current = mounted;
		return () => {
			mounted.destroy();
			engine.current = null;
		};
	}, []);

	useEffect(() => {
		engine.current?.update(latest.current);
	}, [pupilRange, reactivePupil, count, variant, size]);

	return (
		<div
			ref={root}
			aria-hidden
			data-slot="eye-tracking"
			className={cn(s.root(), className)}
			style={{ "--et-blink": `${blinkInterval}ms` } as CSSProperties}
		>
			{Array.from({ length: count }, (_, i) => (
				<div
					key={i}
					data-slot="eye-tracking-eye"
					className={s.eye()}
					style={{ animationDelay: `${i * 60}ms` }}
				>
					<div className={s.iris()}>
						<div className={s.detail()} />
						<div className={s.pupil()} />
						<div className={s.glint()} />
						<div className={s.glintSmall()} />
					</div>
					<div className={s.lid()} />
					<div className={s.scan()} />
				</div>
			))}
		</div>
	);
}
