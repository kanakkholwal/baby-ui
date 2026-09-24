"use client";

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../lib/cn";
import {
	formatRollingDigits,
	type RollingDigitCell,
	type RollingDigitsLocale,
	rollingDigitCells,
	rollsUp,
} from "./format";
import {
	type RollingDigitsDirection,
	type RollingDigitsSize,
	rollingDigits,
} from "./variants";

export type { RollingDigitsDirection, RollingDigitsLocale, RollingDigitsSize };

export interface RollingDigitsProps {
	/** Rounded to an integer before formatting. */
	value: number;
	/** Minimum digit count, zero-padded. */
	pad?: number;
	locale?: RollingDigitsLocale;
	/** Custom formatter; wins over `locale`. */
	format?: (value: number) => string;
	/** Show 0 until scrolled into view once, then roll up to `value`. */
	startOnView?: boolean;
	/** Gap between queued steps when `value` changes faster than a roll. */
	stepMs?: number;
	/** Jump straight to the latest value instead of stepping through each update. */
	coalesce?: boolean;
	direction?: RollingDigitsDirection;
	/** Travel of a rolling digit, in px. */
	offset?: number;
	/** Fired when the display catches up with `value`. */
	onAnimationComplete?: () => void;
	size?: RollingDigitsSize;
	className?: string;
	digitClassName?: string;
}

type Exit = { id: number; char: string; to: number };
type Shown = RollingDigitCell & { leaving?: boolean; entering?: boolean };

function Digit({
	char,
	direction,
	offset,
	className,
	glyphClass,
}: {
	char: string;
	direction: RollingDigitsDirection;
	offset: number;
	className: string;
	glyphClass: string;
}) {
	const [shown, setShown] = useState({ char, id: 0, from: 0 });
	const [exits, setExits] = useState<Exit[]>([]);
	if (shown.char !== char) {
		const up = rollsUp(shown.char, char, direction);
		setExits((current) => [
			...current,
			{ id: shown.id, char: shown.char, to: up ? -offset : offset },
		]);
		setShown({ char, id: shown.id + 1, from: up ? offset : -offset });
	}
	return (
		<span className={className}>
			{exits.map((exit) => (
				<span
					key={exit.id}
					aria-hidden="true"
					className={cn(glyphClass, "rolling-digits-out")}
					style={{ "--rd-to": `${exit.to}px` } as CSSProperties}
					onAnimationEnd={() =>
						setExits((current) => current.filter((e) => e.id !== exit.id))
					}
				>
					{exit.char}
				</span>
			))}
			<span
				key={shown.id}
				className={cn(glyphClass, shown.id > 0 && "rolling-digits-in")}
				style={{ "--rd-from": `${shown.from}px` } as CSSProperties}
			>
				{shown.char}
			</span>
		</span>
	);
}

export function RollingDigits({
	value,
	pad,
	locale,
	format,
	startOnView = true,
	stepMs = 80,
	coalesce = false,
	direction = "dynamic",
	offset = 32,
	onAnimationComplete,
	size = "inherit",
	className,
	digitClassName,
}: RollingDigitsProps) {
	const rootRef = useRef<HTMLSpanElement>(null);
	const [armed, setArmed] = useState(!startOnView);
	const target = formatRollingDigits(armed ? value : 0, { pad, locale, format });
	const [shown, setShown] = useState(target);
	const displayed = useRef(target);
	const queue = useRef<string[]>([]);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const latest = useRef({ target, stepMs, onAnimationComplete });
	latest.current = { target, stepMs, onAnimationComplete };
	const styles = rollingDigits({ direction, size });

	useEffect(() => {
		if (!startOnView) return setArmed(true);
		const node = rootRef.current;
		if (!node) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return;
				setArmed(true);
				observer.disconnect();
			},
			{ threshold: 0.6 },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, [startOnView]);

	useEffect(() => {
		const pump = () => {
			const next = queue.current.shift();
			if (next === undefined) {
				timer.current = null;
				latest.current.onAnimationComplete?.();
				return;
			}
			displayed.current = next;
			setShown(next);
			timer.current = setTimeout(pump, latest.current.stepMs);
		};
		if (!timer.current && target === displayed.current) return;
		if (coalesce) queue.current = [target];
		else queue.current.push(target);
		if (coalesce && timer.current) clearTimeout(timer.current);
		if (coalesce || !timer.current) pump();
	}, [target, coalesce]);

	useEffect(
		() => () => {
			if (timer.current) clearTimeout(timer.current);
		},
		[],
	);

	const cells = useMemo(() => rollingDigitCells(shown), [shown]);
	const [rendered, setRendered] = useState<Shown[]>(cells);
	const [cellsFor, setCellsFor] = useState(cells);
	if (cellsFor !== cells) {
		const keys = new Set(cells.map((c) => c.key));
		const before = new Set(rendered.filter((c) => !c.leaving).map((c) => c.key));
		const gone = rendered
			.filter((c) => !keys.has(c.key))
			.map((c) => ({ ...c, leaving: true }));
		setCellsFor(cells);
		setRendered([...gone, ...cells.map((c) => ({ ...c, entering: !before.has(c.key) }))]);
	}

	return (
		<span
			ref={rootRef}
			data-slot="rolling-digits"
			className={cn(styles.root(), className)}
		>
			<span aria-live="polite" className={styles.srOnly()}>
				{target}
			</span>
			<span aria-hidden="true" className={styles.cells()}>
				{rendered.map((cell) => {
					return (
						<span
							key={cell.key}
							className={cn(
								styles.cell(),
								cell.leaving
									? "rolling-digits-cell-out"
									: cell.entering && "rolling-digits-cell-in",
							)}
							onAnimationEnd={(event) => {
								if (!cell.leaving || event.target !== event.currentTarget) return;
								setRendered((current) => current.filter((c) => c !== cell));
							}}
						>
							<span className={styles.clip()}>
								{cell.isDigit ? (
									<Digit
										char={cell.char}
										direction={direction}
										offset={offset}
										className={cn(styles.digit(), digitClassName)}
										glyphClass={styles.glyph()}
									/>
								) : (
									<span className={digitClassName}>{cell.char}</span>
								)}
							</span>
						</span>
					);
				})}
			</span>
		</span>
	);
}
