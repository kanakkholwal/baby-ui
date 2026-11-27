"use client";

import { type ComponentProps, useState } from "react";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/react/use-controllable";
import { RollingDigits } from "../../rolling-digits/react/rolling-digits";
import { type UpvoteOrientation, type UpvoteVariant, upvoteButton } from "../variants";

export type { UpvoteOrientation, UpvoteVariant };

const OUTLINE = "M9 18v-6H5l7-7 7 7h-4v6H9z";

export interface UpvoteButtonProps
	extends Omit<ComponentProps<"button">, "children" | "onChange"> {
	/** Whether the viewer has voted. Controlled, or `defaultVoted` to let it drive itself. */
	voted?: boolean;
	defaultVoted?: boolean;
	/** Called with the next state when the viewer votes or takes the vote back. */
	onVotedChange?: (voted: boolean) => void;
	/** Votes from everyone else. The viewer's own vote is added on top. */
	count: number;
	/** `vertical` stacks the arrow over the count; `horizontal` places them side by side. */
	orientation?: UpvoteOrientation;
	/** The fill colour. For any other, set `--upvote-color` and `--upvote-on` on `className`, which goes on the wrapper. */
	variant?: UpvoteVariant;
	/** Names the button for assistive tech. */
	label?: string;
}

/**
 * A vote that rises through the button: the fill climbs from the bottom, the arrow shoots out the
 * top as a filled one rises in, a +1 floats away and the count rolls. Taking it back drains it.
 */
export function UpvoteButton({
	voted: votedProp,
	defaultVoted = false,
	onVotedChange,
	count,
	orientation = "vertical",
	variant = "default",
	label = "Upvote",
	className,
	onClick,
	...props
}: UpvoteButtonProps) {
	const [voted, setVoted] = useControllable(votedProp, defaultVoted, onVotedChange);
	// Each vote remounts the +1 so it floats again; taking a vote back removes it.
	const [votes, setVotes] = useState(0);
	const styles = upvoteButton({ orientation, variant, voted });
	return (
		<span data-slot="upvote-button" className={cn(styles.root(), className)}>
			{voted && votes > 0 ? (
				<span
					key={votes}
					aria-hidden
					className={styles.float()}
					style={{ translate: "-50% 0" }}
				>
					+1
				</span>
			) : null}
			<button
				type="button"
				aria-pressed={voted}
				aria-label={label}
				className={styles.button()}
				onClick={(event) => {
					onClick?.(event);
					if (event.defaultPrevented) return;
					if (!voted) setVotes((n) => n + 1);
					setVoted(!voted);
				}}
				{...props}
			>
				<span aria-hidden className={styles.fill()} />
				<span aria-hidden className={styles.arrows()}>
					<span
						className={cn(
							styles.arrow(),
							voted ? "-translate-y-[110%]" : "translate-y-0",
						)}
					>
						<svg
							aria-hidden
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinejoin="round"
						>
							<path d={OUTLINE} />
						</svg>
					</span>
					<span
						className={cn(styles.arrow(), voted ? "translate-y-0" : "translate-y-[110%]")}
					>
						<svg
							aria-hidden
							viewBox="0 0 24 24"
							fill="currentColor"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinejoin="round"
						>
							<path d={OUTLINE} />
						</svg>
					</span>
				</span>
				<RollingDigits value={count + (voted ? 1 : 0)} startOnView={false} />
			</button>
		</span>
	);
}
