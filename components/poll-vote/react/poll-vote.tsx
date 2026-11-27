"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/react/use-controllable";
import { countDuration, tweenCount } from "../count";
import {
	fillLabel,
	POLL_VOTE_LABELS,
	type PollOption,
	type PollVoteLabels,
	type PollVoteSize,
	pollShare,
	pollVote,
} from "../variants";

export type { PollOption, PollVoteLabels, PollVoteSize };

// After a first vote your bar fills first and the rest follow a beat apart.
const STAGGER_MS = 60;

/** A whole number that counts up (or down) to its value after `delay`. */
function Count({
	value,
	delay,
	format,
}: {
	value: number;
	delay: number;
	format: (value: number) => string;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const [shown, setShown] = useState(value);
	const current = useRef(value);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		return tweenCount(current.current, value, {
			delay,
			duration: countDuration(el),
			onUpdate: (next) => {
				current.current = next;
				setShown(next);
			},
		});
	}, [value, delay]);
	return (
		<span ref={ref} className="tabular-nums">
			{format(shown)}
		</span>
	);
}

export interface PollVoteProps {
	/** The choices, each with an id, label and vote count before the viewer's vote. */
	options: readonly PollOption[];
	/** The viewer's choice, or null before they vote. Controlled, or `defaultValue` to let it drive itself. */
	value?: string | null;
	defaultValue?: string | null;
	/** Called with the option id when the viewer votes or changes their vote. */
	onValueChange?: (value: string | null) => void;
	size?: PollVoteSize;
	/** Override any built-in string, for example to translate it. */
	labels?: Partial<PollVoteLabels>;
	className?: string;
}

/**
 * A poll you answer with one tap. Your ring fills and draws a check, your bar fills first and the
 * rest follow in a wave, each share counts up and the total ticks over. Picking another option
 * moves every bar at once.
 */
export function PollVote({
	options,
	value: valueProp,
	defaultValue = null,
	onValueChange,
	size = "default",
	labels,
	className,
}: PollVoteProps) {
	const text = { ...POLL_VOTE_LABELS, ...labels };
	const [value, setValue] = useControllable<string | null>(
		valueProp,
		defaultValue,
		onValueChange,
	);
	const voted = value !== null;
	// A first vote fills in a wave; moving a vote shifts every bar together.
	const [last, setLast] = useState(value);
	const [from, setFrom] = useState(value);
	if (last !== value) {
		setFrom(last);
		setLast(value);
	}
	const moved = from !== null && voted;
	const base = options.reduce((sum, option) => sum + option.votes, 0);
	const total = base + (voted ? 1 : 0);
	const chosen = options.find((option) => option.id === value);
	const chosenIndex = options.findIndex((option) => option.id === value);

	return (
		<div
			role="radiogroup"
			aria-label={text.poll}
			data-slot="poll-vote"
			className={cn(pollVote().root(), className)}
		>
			{options.map((option, index) => {
				const mine = option.id === value;
				const percent = voted ? pollShare(options, value, option.id) : 0;
				const styles = pollVote({ size, voted, mine });
				// Your row leads; the others follow in order.
				const order = mine ? 0 : index < chosenIndex ? index + 1 : index;
				const delay = moved || !voted ? 0 : order * STAGGER_MS;
				return (
					// biome-ignore lint/a11y/useSemanticElements: each row is a bar, ring and share in one control; a native radio cannot hold that layout.
					<button
						key={option.id}
						type="button"
						role="radio"
						aria-checked={mine}
						aria-label={
							voted
								? fillLabel(text.percent, {
										label: option.label,
										percent: Math.round(percent),
									})
								: option.label
						}
						className={styles.row()}
						onClick={() => {
							if (!mine) setValue(option.id);
						}}
					>
						<span
							aria-hidden
							className={styles.bar()}
							style={{
								transform: `scaleX(${percent / 100})`,
								transitionDelay: `${delay}ms`,
							}}
						/>
						<span className={styles.label()}>
							<span aria-hidden className={styles.mark()}>
								<span className={styles.markFill()} />
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="3.5"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden
									className={styles.check()}
								>
									<path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
								</svg>
							</span>
							<span className={styles.text()}>{option.label}</span>
						</span>
						<span
							aria-hidden
							className={styles.percent()}
							style={{ transitionDelay: `${delay}ms` }}
						>
							<Count value={Math.round(percent)} delay={delay} format={(n) => `${n}%`} />
						</span>
					</button>
				);
			})}
			<span className={pollVote().total()}>
				<Count
					value={total}
					delay={0}
					format={(count) => fillLabel(text.votes, { count })}
				/>
			</span>
			<span aria-live="polite" className="sr-only">
				{chosen ? fillLabel(text.voted, { label: chosen.label }) : ""}
			</span>
		</div>
	);
}
