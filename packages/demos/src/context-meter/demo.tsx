"use client";

import {
	ContextMeter,
	ContextMeterBar,
	ContextMeterBody,
	ContextMeterCompact,
	ContextMeterFooter,
	ContextMeterHeader,
	ContextMeterIcon,
	ContextMeterList,
	ContextMeterPercent,
	ContextMeterSubtitle,
	ContextMeterSummary,
	ContextMeterTitle,
	type ContextSegment,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const LIMIT = 200_000;
const COMPACT_AT = 0.85;
const START = {
	conversation: 63_000,
	results: 30_000,
	files: 31_400,
	messages: 38,
	calls: 21,
};

// The demo plays a session: each turn adds messages and tool results until it compacts.
export function ContextMeterDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ContextMeter>>(props);
	const [state, setState] = useState(START);
	const [compacting, setCompacting] = useState(false);
	const timer = useRef(0);

	const compact = () => {
		setCompacting(true);
		window.clearTimeout(timer.current);
		timer.current = window.setTimeout(() => {
			setState((s) => ({ ...s, conversation: 9_000, messages: 1 }));
			setCompacting(false);
		}, 900);
	};

	useEffect(() => {
		const id = setInterval(() => {
			setState((s) => ({
				...s,
				conversation: s.conversation + 4_200,
				results: s.results + 2_600,
				messages: s.messages + 2,
				calls: s.calls + 1,
			}));
		}, 1600);
		return () => {
			clearInterval(id);
			window.clearTimeout(timer.current);
		};
	}, []);

	const segments: ContextSegment[] = [
		{
			id: "system",
			label: "System prompt",
			detail: "Instructions",
			value: 3_200,
			pinned: true,
			color: "var(--muted-foreground)",
		},
		{
			id: "tools",
			label: "Tool definitions",
			detail: "14 tools",
			value: 11_800,
			pinned: true,
			color: 4,
		},
		{
			id: "files",
			label: "Pinned files",
			detail: "6 files",
			value: state.files,
			action: state.files ? "Unpin" : undefined,
			color: 2,
		},
		{
			id: "conversation",
			label: "Conversation",
			detail: `${state.messages} messages`,
			value: state.conversation,
			color: 1,
		},
		{
			id: "results",
			label: "Tool results",
			detail: `${state.calls} calls`,
			value: state.results,
			action: state.results ? "Clear" : undefined,
			color: 3,
		},
	];
	const used = segments.reduce((sum, s) => sum + s.value, 0);
	// Crossing the line compacts on its own, once.
	useEffect(() => {
		if (used >= LIMIT * COMPACT_AT && !compacting) compact();
	});

	return (
		<div className="w-full max-w-md">
			<ContextMeter
				segments={segments}
				limit={LIMIT}
				compactAt={COMPACT_AT}
				variant={p.variant}
				onAction={(id) =>
					setState((s) =>
						id === "results"
							? { ...s, results: 0, calls: 0 }
							: id === "files"
								? { ...s, files: 0 }
								: s,
					)
				}
			>
				<ContextMeterHeader>
					<ContextMeterIcon />
					<ContextMeterTitle>Context window</ContextMeterTitle>
					<ContextMeterSubtitle>Sonnet 5.5</ContextMeterSubtitle>
					<ContextMeterPercent />
				</ContextMeterHeader>
				<ContextMeterBody>
					<ContextMeterSummary />
					<ContextMeterBar />
					<ContextMeterList />
					<ContextMeterFooter note={`Auto-compacts at ${COMPACT_AT * 100}%`}>
						<ContextMeterCompact onClick={compact} loading={compacting} />
					</ContextMeterFooter>
				</ContextMeterBody>
			</ContextMeter>
		</div>
	);
}
