"use client";

import { type CSSProperties, type RefObject, useMemo, useRef, useState } from "react";
import { cn } from "../lib/cn";
import {
	type InertiaKick,
	inertiaKick,
	type TextInertiaSize,
	textInertia,
} from "./variants";

export type { TextInertiaSize };

export interface TextInertiaProps {
	text: string;
	/** Scales how far words fly from the pointer's speed. */
	intensity?: number;
	size?: TextInertiaSize;
	className?: string;
	wordClassName?: string;
}

type Velocity = { x: number; y: number };

function InertiaWord({
	word,
	index,
	intensity,
	velocity,
	className,
}: {
	word: string;
	index: number;
	intensity: number;
	velocity: RefObject<Velocity>;
	className: string;
}) {
	const [kick, setKick] = useState<(InertiaKick & { n: number }) | null>(null);
	return (
		<span
			aria-hidden="true"
			className={cn(
				className,
				kick && (kick.n % 2 ? "text-inertia-kick-a" : "text-inertia-kick-b"),
			)}
			style={
				kick
					? ({
							"--ti-x": `${kick.x}px`,
							"--ti-y": `${kick.y}px`,
							"--ti-r": `${kick.r}deg`,
						} as CSSProperties)
					: undefined
			}
			onPointerEnter={() =>
				setKick((prev) => ({
					...inertiaKick(velocity.current, index, intensity),
					n: (prev?.n ?? 0) + 1,
				}))
			}
			onAnimationEnd={() => setKick(null)}
		>
			{word}
		</span>
	);
}

export function TextInertia({
	text,
	intensity = 1,
	size = "inherit",
	className,
	wordClassName,
}: TextInertiaProps) {
	const velocity = useRef<Velocity>({ x: 0, y: 0 });
	const last = useRef<Velocity | null>(null);
	const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean), [text]);
	const styles = textInertia({ size });

	return (
		<div
			data-slot="text-inertia"
			className={cn(styles.root(), className)}
			onPointerMove={(event) => {
				if (last.current) {
					velocity.current = {
						x: event.clientX - last.current.x,
						y: event.clientY - last.current.y,
					};
				}
				last.current = { x: event.clientX, y: event.clientY };
			}}
			onPointerLeave={() => {
				last.current = null;
				velocity.current = { x: 0, y: 0 };
			}}
		>
			<span className={styles.srOnly()}>{text}</span>
			{words.map((word, index) => (
				<InertiaWord
					key={`${word}-${index}`}
					word={word}
					index={index}
					intensity={intensity}
					velocity={velocity}
					className={cn(styles.word(), wordClassName)}
				/>
			))}
		</div>
	);
}
