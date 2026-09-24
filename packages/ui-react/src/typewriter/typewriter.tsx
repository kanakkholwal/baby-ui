"use client";

import {
	createElement,
	type ElementType,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { cn } from "../lib/cn";
import { type TypewriterCursor, typewriter, typewriterSteps } from "./variants";

export type { TypewriterCursor };

export interface TypewriterProps {
	text: string;
	/** Scales every keystroke; 3000 is the reference pace. */
	durationMs?: number;
	/** Hold the finished line for a second, then type it again. */
	loop?: boolean;
	cursor?: TypewriterCursor;
	/** Fired each time the line finishes typing. */
	onComplete?: () => void;
	as?: ElementType;
	className?: string;
}

const HOLD_MS = 1000;

export function Typewriter({
	text,
	durationMs = 3000,
	loop = true,
	cursor = "bar",
	onComplete,
	as = "div",
	className,
}: TypewriterProps) {
	const [pass, setPass] = useState(0);
	const [step, setStep] = useState(0);
	const [reduced, setReduced] = useState(false);
	const steps = useMemo(() => typewriterSteps(text, pass), [text, pass]);
	const onDone = useRef(onComplete);
	onDone.current = onComplete;
	const done = step >= steps.length;
	const styles = typewriter({ cursor });

	useEffect(() => {
		const query = matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(query.matches);
		const update = () => setReduced(query.matches);
		query.addEventListener("change", update);
		return () => query.removeEventListener("change", update);
	}, []);

	useEffect(() => {
		setPass(0);
		setStep(0);
	}, [text]);

	useEffect(() => {
		if (reduced) return;
		const scale = durationMs / 3000;
		if (done) {
			onDone.current?.();
			if (!loop) return;
			const id = setTimeout(() => {
				setPass((p) => p + 1);
				setStep(0);
			}, HOLD_MS * scale);
			return () => clearTimeout(id);
		}
		const id = setTimeout(() => setStep((s) => s + 1), (steps[step]?.wait ?? 0) * scale);
		return () => clearTimeout(id);
	}, [reduced, done, step, steps, loop, durationMs]);

	const shown = reduced || done ? text : (steps[step]?.text ?? "");

	return createElement(
		as,
		{ "data-slot": "typewriter", className: cn(styles.root(), className) },
		<span className={styles.srOnly()}>{text}</span>,
		<span aria-hidden="true" className={styles.text()}>
			{shown}
			{!(reduced || done) ? <span className={styles.caret()} /> : null}
		</span>,
	);
}
