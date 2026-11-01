"use client";

import { type ComponentProps, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { createOrbRenderer, type OrbColors, type OrbRenderer } from "../renderer";
import {
	VOICE_ORB_PALETTES,
	type VoiceOrbSize,
	type VoiceOrbVariant,
	voiceOrb,
} from "../variants";

export type { OrbColors, VoiceOrbSize, VoiceOrbVariant };

export interface VoiceOrbProps
	extends Omit<ComponentProps<"div">, "children" | "onError"> {
	/** Voice level from 0 to 1, e.g. from your speech engine; ignored while `analyser` is set. */
	activity?: number;
	/** Your audio analyser; the orb reads it each frame and never opens a microphone. */
	analyser?: AnalyserNode | null;
	variant?: VoiceOrbVariant;
	size?: VoiceOrbSize;
	/** Base, highlight and shadow as hex, in place of the variant's palette. */
	colors?: OrbColors;
	/** False holds the surface still, e.g. while muted. */
	active?: boolean;
	/** How fast the liquid drifts; 0 stops it between words. */
	speed?: number;
	/** Names the orb, e.g. "Assistant is speaking"; without it the orb is decorative. */
	label?: string;
	onError?: (error: Error) => void;
}

/** A grainy liquid sphere whose surface and outline swell with a voice. */
export function VoiceOrb({
	activity = 0,
	analyser = null,
	variant = "ember",
	size = "default",
	colors,
	active = true,
	speed = 1,
	label,
	onError,
	className,
	...props
}: VoiceOrbProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const renderer = useRef<OrbRenderer | null>(null);
	const [failed, setFailed] = useState(false);
	const input = {
		activity,
		analyser,
		colors: colors ?? VOICE_ORB_PALETTES[variant],
		active,
		speed,
	};
	const latest = useRef(input);
	latest.current = input;
	const errorRef = useRef(onError);
	errorRef.current = onError;

	useEffect(() => {
		if (!canvasRef.current) return;
		const fail = (error: Error) => {
			setFailed(true);
			errorRef.current?.(error);
		};
		try {
			renderer.current = createOrbRenderer(canvasRef.current, latest.current, fail);
		} catch (error) {
			fail(error instanceof Error ? error : new Error(String(error)));
		}
		return () => {
			renderer.current?.dispose();
			renderer.current = null;
		};
	}, []);
	useEffect(() => {
		renderer.current?.update(latest.current);
	});

	const styles = voiceOrb({ variant, size });
	return (
		<div
			data-slot="voice-orb"
			data-variant={variant}
			data-render={failed ? "error" : "ready"}
			{...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
			className={cn(styles.root(), className)}
			{...props}
		>
			{failed ? (
				<div className={styles.fallback()}>Orb unavailable</div>
			) : (
				<canvas ref={canvasRef} className={styles.canvas()} />
			)}
		</div>
	);
}
