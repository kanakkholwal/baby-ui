"use client";

import {
	Tool,
	ToolActions,
	ToolContent,
	ToolCopy,
	ToolInput,
	ToolOutput,
	ToolRetry,
	type ToolState,
	ToolTrigger,
} from "@baby-ui/react";
import { type ComponentProps, useCallback, useEffect, useRef, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const RESULT = `[
  { "title": "Dock magnification", "path": "/components/dock" },
  { "title": "Motion tokens", "path": "/docs/theming#motion" },
  { "title": "Reduced motion", "path": "/docs/accessibility" }
]`;
const LOG = [
	"> vitest run checkout",
	" ✓ confirm.test.ts > settles a 3DS payment (412ms)",
	" ✓ confirm.test.ts > retries a declined card (88ms)",
	" ✓ confirm.test.ts > keeps the cart on failure (61ms)",
	" ✓ totals.test.ts > rounds tax per line (12ms)",
	"",
	" Test Files  2 passed (2)",
	"      Tests  4 passed (4)",
];

// The terminal call streams one line at a time, so following the end can be seen.
function useRun() {
	const [lines, setLines] = useState(0);
	const timer = useRef(0);
	const run = useCallback(() => {
		clearInterval(timer.current);
		setLines(0);
		let count = 0;
		timer.current = window.setInterval(() => {
			setLines(++count);
			if (count >= LOG.length) clearInterval(timer.current);
		}, 450);
	}, []);
	useEffect(() => {
		run();
		return () => clearInterval(timer.current);
	}, [run]);
	return { lines, run };
}

export function ToolDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Tool>>(props);
	const status: ToolState = p.status ?? "done";
	const { lines, run } = useRun();
	const testStatus: ToolState = lines >= LOG.length ? "done" : "running";

	return (
		<div className="flex w-full max-w-md flex-col gap-3">
			<Tool status={status} variant={p.variant} defaultOpen>
				<ToolTrigger name="search_docs" title="Searching the docs" kind="search" />
				<ToolContent>
					<ToolInput>{'{ "query": "dock magnification", "limit": 3 }'}</ToolInput>
					{status === "pending" ? null : (
						<ToolOutput>
							{status === "error" ? "Error: the docs index timed out after 10s" : RESULT}
						</ToolOutput>
					)}
					<ToolActions>
						<ToolCopy text={RESULT} />
						<ToolRetry onClick={() => undefined} />
					</ToolActions>
				</ToolContent>
			</Tool>
			<Tool status={testStatus} variant={p.variant} collapseOnComplete={false}>
				<ToolTrigger
					name="pnpm test checkout"
					title="Running the tests"
					kind="terminal"
				/>
				<ToolContent>
					<ToolOutput maxHeight={140}>{LOG.slice(0, lines).join("\n")}</ToolOutput>
					<ToolActions>
						<ToolCopy text={LOG.join("\n")} />
						<ToolRetry onClick={run} />
					</ToolActions>
				</ToolContent>
			</Tool>
		</div>
	);
}
