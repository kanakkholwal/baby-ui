"use client";

import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { isOverflowing, isPinned } from "../pin";
import {
	type LiveTranscriptTone,
	type LiveTranscriptVariant,
	liveTranscript,
} from "../variants";

export type { LiveTranscriptTone, LiveTranscriptVariant };

type Ctx = {
	committed: string;
	tentative: string;
	session: string | number | undefined;
	variant: LiveTranscriptVariant;
};

const LiveTranscriptCtx = createContext<Ctx | null>(null);

function useLiveTranscript() {
	const ctx = useContext(LiveTranscriptCtx);
	if (!ctx) throw new Error("LiveTranscript parts must be used inside <LiveTranscript>");
	return ctx;
}

/** Text that is still arriving: settled words in `committed`, the engine's guess in `tentative`. */
export function LiveTranscript({
	committed,
	tentative = "",
	session,
	variant = "card",
	className,
	...props
}: ComponentProps<"div"> & {
	committed: string;
	tentative?: string;
	/** A new value starts a fresh transcript pinned to the newest line. */
	session?: string | number;
	variant?: LiveTranscriptVariant;
}) {
	return (
		<LiveTranscriptCtx.Provider value={{ committed, tentative, session, variant }}>
			<div
				data-slot="live-transcript"
				className={cn(liveTranscript({ variant }).root(), className)}
				{...props}
			/>
		</LiveTranscriptCtx.Provider>
	);
}

/** The text. It follows the newest line until the reader scrolls up. */
export function LiveTranscriptBody({
	className,
	children,
	...props
}: Omit<ComponentProps<"div">, "children"> & {
	/** Shown while there is no text yet. */
	children?: ReactNode;
}) {
	const { committed, tentative, session, variant } = useLiveTranscript();
	const styles = liveTranscript({ variant });
	const ref = useRef<HTMLDivElement>(null);
	const pinned = useRef(true);
	const [overflowing, setOverflowing] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: a new session starts pinned.
	useEffect(() => {
		pinned.current = true;
	}, [session]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: runs when the text grows.
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		setOverflowing(isOverflowing(el));
		if (pinned.current) el.scrollTop = el.scrollHeight;
	}, [committed, tentative]);

	const empty = committed === "" && tentative === "";
	return (
		<div
			ref={ref}
			data-slot="live-transcript-body"
			data-overflowing={overflowing ? "" : undefined}
			aria-live="polite"
			onScroll={(event) => {
				pinned.current = isPinned(event.currentTarget);
			}}
			className={cn(styles.body(), className)}
			{...props}
		>
			{empty ? (
				<p className={styles.placeholder()}>{children}</p>
			) : (
				<p>
					<span className={styles.committed()}>{committed ? `${committed} ` : ""}</span>
					<span className={styles.tentative()}>{tentative}</span>
				</p>
			)}
		</div>
	);
}

/** A working state under the text: transcribing, polishing. */
export function LiveTranscriptStatus({
	className,
	children,
	...props
}: ComponentProps<"p">) {
	const { variant } = useLiveTranscript();
	const styles = liveTranscript({ variant });
	return (
		<p
			data-slot="live-transcript-status"
			role="status"
			className={cn(styles.status(), className)}
			{...props}
		>
			<span aria-hidden className={styles.dot()} />
			{children}
		</p>
	);
}

/** Why something went wrong, in place; the transcript stays. */
export function LiveTranscriptNotice({
	tone = "info",
	className,
	...props
}: ComponentProps<"div"> & { tone?: LiveTranscriptTone }) {
	return (
		<div
			data-slot="live-transcript-notice"
			data-tone={tone}
			role={tone === "destructive" ? "alert" : "status"}
			className={cn(liveTranscript({ tone }).notice(), className)}
			{...props}
		/>
	);
}
