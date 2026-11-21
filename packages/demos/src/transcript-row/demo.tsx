"use client";

import {
	TranscriptRow,
	TranscriptRowActions,
	TranscriptRowCancel,
	TranscriptRowCopy,
	TranscriptRowError,
	TranscriptRowHeader,
	TranscriptRowProgress,
	TranscriptRowRetry,
	TranscriptRowStatusBadge,
	TranscriptRowText,
	TranscriptRowTitle,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const NOTE =
	"Let's move the review to Thursday afternoon, and I'll send the revised draft to the whole design team before lunch so everyone has time to read it properly.";

export function TranscriptRowDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof TranscriptRow>>(props);
	const [percent, setPercent] = useState(42);

	// The demo plays the job; the rows only render the progress they are given.
	useEffect(() => {
		const id = setInterval(() => setPercent((n) => (n >= 100 ? 0 : n + 6)), 600);
		return () => clearInterval(id);
	}, []);

	return (
		<ul className="grid w-full max-w-md gap-3">
			<TranscriptRow variant={p.variant} clamp={p.clamp}>
				<TranscriptRowHeader>
					<TranscriptRowTitle>Today, 10:42</TranscriptRowTitle>
					<TranscriptRowActions>
						<TranscriptRowCopy text={NOTE} />
					</TranscriptRowActions>
				</TranscriptRowHeader>
				<TranscriptRowText>{NOTE}</TranscriptRowText>
			</TranscriptRow>
			<TranscriptRow status="running" variant={p.variant} clamp={p.clamp}>
				<TranscriptRowHeader>
					<TranscriptRowTitle>weekly-sync.m4a</TranscriptRowTitle>
					<TranscriptRowActions>
						<TranscriptRowStatusBadge />
						<TranscriptRowCancel onClick={() => setPercent(0)} />
					</TranscriptRowActions>
				</TranscriptRowHeader>
				<TranscriptRowProgress value={percent} label="weekly-sync.m4a" />
			</TranscriptRow>
			<TranscriptRow status="failed" variant={p.variant} clamp={p.clamp}>
				<TranscriptRowHeader>
					<TranscriptRowTitle>voice-memo.wav</TranscriptRowTitle>
					<TranscriptRowActions>
						<TranscriptRowStatusBadge />
						<TranscriptRowRetry onClick={() => setPercent(0)} />
					</TranscriptRowActions>
				</TranscriptRowHeader>
				<TranscriptRowError>The file could not be read.</TranscriptRowError>
			</TranscriptRow>
		</ul>
	);
}
