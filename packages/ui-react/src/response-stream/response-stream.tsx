"use client";

import { useEffect, useState } from "react";
import { cn } from "../lib/cn";

export interface ResponseStreamProps {
	text: string;
	speed?: number;
	streaming?: boolean;
	className?: string;
}

const reduced = () =>
	typeof matchMedia === "function" &&
	matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ResponseStream({
	text,
	speed = 60,
	streaming = true,
	className,
}: ResponseStreamProps) {
	const [shown, setShown] = useState(0);

	useEffect(() => {
		if (reduced()) {
			setShown(text.length);
			return;
		}
		setShown(0);
		const perTick = Math.max(1, Math.round(speed / 30));
		const id = setInterval(() => {
			setShown((prev) => {
				const next = Math.min(text.length, prev + perTick);
				if (next >= text.length) clearInterval(id);
				return next;
			});
		}, 1000 / 30);
		return () => clearInterval(id);
	}, [text, speed]);

	const done = shown >= text.length;

	return (
		<p
			aria-live="polite"
			aria-busy={!done || undefined}
			className={cn("text-foreground text-sm leading-relaxed", className)}
		>
			{text.slice(0, shown)}
			{streaming && !done ? (
				<span
					aria-hidden
					className="stream-caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-current"
				/>
			) : null}
		</p>
	);
}
