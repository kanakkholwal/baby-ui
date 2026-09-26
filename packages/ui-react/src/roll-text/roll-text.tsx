"use client";

import {
	Fragment,
	memo,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { cn } from "../lib/cn";
import {
	ROLL_DONE,
	type RollStagger,
	type RollTextMotion,
	type RollTextSize,
	rollText,
} from "./variants";

export type { RollStagger, RollTextMotion, RollTextSize };

export interface RollTextProps {
	/** Label duplicated across the two stacked roll layers. */
	text: string;
	/** Plays on the nearest `[data-roll-group]`/`.group\/roll` ancestor's hover/focus
	 * instead of this element's own; not tabbable then, put the action on that ancestor. */
	groupHover?: boolean;
	/** Hover and focus do not trigger the roll; use for active nav items. */
	disabled?: boolean;
	/** Stagger the roll across words or characters. `none` animates the whole label at once. */
	stagger?: RollStagger;
	staggerMs?: number;
	durationMs?: number;
	size?: RollTextSize;
	motion?: RollTextMotion;
	className?: string;
}

type RollPhase = "closed" | "animating" | "open";
type RollSegment = { key: string; value: string; delay: number };

function splitSegments(
	text: string,
	stagger: RollStagger,
	staggerMs: number,
): RollSegment[] {
	if (stagger === "none") return [{ key: "whole", value: text, delay: 0 }];
	if (stagger === "word") {
		const words = text.trim().split(/\s+/);
		return words.map((word, i) => ({
			key: `${i}-${word}`,
			value: word,
			delay: i * staggerMs,
		}));
	}
	return [...text].map((char, i) => ({
		key: `${i}-${char}`,
		value: char,
		delay: i * staggerMs,
	}));
}

const ROLL_GROUP_SELECTOR = "[data-roll-group], .group\\/roll";

const RollUnit = memo(function RollUnit({
	segment,
	durationMs,
	onStackAnimationEnd,
}: {
	segment: RollSegment;
	durationMs: number;
	onStackAnimationEnd?: (event: React.AnimationEvent<HTMLSpanElement>) => void;
}) {
	return (
		<span
			className="roll-unit"
			style={
				{
					"--roll-delay": `${segment.delay}ms`,
					"--roll-unit-duration": `${durationMs}ms`,
				} as React.CSSProperties
			}
		>
			<span className="roll-unit__sizer" aria-hidden>
				{segment.value}
			</span>
			<span className="roll-unit__stack" aria-hidden onAnimationEnd={onStackAnimationEnd}>
				<span className="roll-unit__line">{segment.value}</span>
				<span className="roll-unit__line">{segment.value}</span>
			</span>
		</span>
	);
});

export function RollText({
	text,
	groupHover = false,
	disabled = false,
	stagger = "none",
	staggerMs = 32,
	durationMs = 450,
	size = "md",
	motion = "slide",
	className,
}: RollTextProps) {
	const segments = useMemo(
		() => splitSegments(text, stagger, staggerMs),
		[text, stagger, staggerMs],
	);
	const rootRef = useRef<HTMLSpanElement>(null);
	const phaseRef = useRef<RollPhase>("closed");
	const disabledRef = useRef(disabled);
	const segmentCountRef = useRef(segments.length);
	const remainingRef = useRef(0);
	const reducedMotionRef = useRef(false);
	const [phase, setPhase] = useState<RollPhase>("closed");

	segmentCountRef.current = segments.length;
	disabledRef.current = disabled;

	if (disabled && phase !== "closed") setPhase("closed");

	useEffect(() => {
		phaseRef.current = phase;
	}, [phase]);

	useEffect(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		reducedMotionRef.current = media.matches;
		const onChange = (event: MediaQueryListEvent) => {
			reducedMotionRef.current = event.matches;
		};
		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, []);

	const playOpen = useCallback(() => {
		if (disabledRef.current || phaseRef.current === "animating") return;
		if (reducedMotionRef.current) {
			setPhase("open");
			return;
		}
		remainingRef.current = segmentCountRef.current;
		if (phaseRef.current === "open") {
			setPhase("closed");
			requestAnimationFrame(() => requestAnimationFrame(() => setPhase("animating")));
			return;
		}
		setPhase("animating");
	}, []);

	useLayoutEffect(() => {
		if (!groupHover || disabled) return;
		const node = rootRef.current;
		const group = node?.closest(ROLL_GROUP_SELECTOR) ?? null;
		if (!group) return;
		group.addEventListener("mouseenter", playOpen);
		group.addEventListener("focusin", playOpen);
		return () => {
			group.removeEventListener("mouseenter", playOpen);
			group.removeEventListener("focusin", playOpen);
		};
	}, [groupHover, disabled, playOpen]);

	const handleStackAnimationEnd = useCallback(
		(event: React.AnimationEvent<HTMLSpanElement>) => {
			if (phaseRef.current !== "animating" || !ROLL_DONE.has(event.animationName)) return;
			remainingRef.current -= 1;
			if (remainingRef.current <= 0) setPhase("open");
		},
		[],
	);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: decorative roll, focusable for parity, no action to give it a role for
		<span
			ref={rootRef}
			tabIndex={groupHover ? undefined : 0}
			className={cn(
				rollText({ size, motion }),
				phase === "animating" && "roll-text--animating",
				phase === "open" && "roll-text--open",
				className,
			)}
			onMouseEnter={() => !groupHover && !disabled && playOpen()}
			onFocus={() => !groupHover && !disabled && playOpen()}
		>
			<span className="sr-only">{text}</span>
			<span className="roll-text__track select-none" aria-hidden>
				{segments.map((segment, index) => (
					<Fragment key={segment.key}>
						{stagger === "word" && index > 0 ? " " : null}
						<RollUnit
							segment={segment}
							durationMs={durationMs}
							onStackAnimationEnd={handleStackAnimationEnd}
						/>
					</Fragment>
				))}
			</span>
		</span>
	);
}
