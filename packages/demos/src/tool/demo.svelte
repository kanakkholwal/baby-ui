<script lang="ts">
import {
	ApprovalGate,
	ApprovalGateActions,
	ApprovalGateArgs,
	ApprovalGateBody,
	ApprovalGateReceipt,
	ApprovalGateSummary,
	type ApprovalRequest,
	type ApprovalStatus,
	Tool,
	ToolActions,
	ToolContent,
	ToolCopy,
	ToolInput,
	ToolOutput,
	ToolRetry,
	type ToolState,
	ToolTrigger,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Tool>>(props));
const status = $derived<ToolState>(p.status ?? "done");

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

const DEPLOY: ApprovalRequest = {
	tool: "shell.run",
	title: "Deploy checkout to production",
	summary:
		"Ships the 4 passing checkout changes. Rolls out to 10% of traffic, then everyone.",
	risk: "medium",
	args: { command: "pnpm deploy checkout --env production --canary 10" },
};

// The terminal call streams one line at a time, so following the end can be seen.
let lines = $state(0);
let timer = 0;
function run() {
	clearInterval(timer);
	lines = 0;
	timer = window.setInterval(() => {
		lines += 1;
		if (lines >= LOG.length) clearInterval(timer);
	}, 450);
}
$effect(() => {
	run();
	return () => clearInterval(timer);
});
const testStatus = $derived<ToolState>(lines >= LOG.length ? "done" : "running");

// A deploy waits on a person: approving runs it, denying fails the call.
let decision = $state<ApprovalStatus>("pending");
let deploy = $state<ToolState>("approval");
function decide(next: ApprovalStatus) {
	decision = next;
	deploy = next === "approved" ? "running" : "error";
	if (next === "approved") window.setTimeout(() => (deploy = "done"), 1800);
}
</script>

<div class="flex w-full max-w-md flex-col gap-3">
	<Tool {status} variant={p.variant} open>
		<ToolTrigger name="search_docs" title="Searching the docs" kind="search" />
		<ToolContent>
			<ToolInput>{'{ "query": "dock magnification", "limit": 3 }'}</ToolInput>
			{#if status !== "pending"}
				<ToolOutput>{status === "error" ? "Error: the docs index timed out after 10s" : RESULT}</ToolOutput>
			{/if}
			<ToolActions>
				<ToolCopy text={RESULT} />
				<ToolRetry onclick={() => undefined} />
			</ToolActions>
		</ToolContent>
	</Tool>
	<Tool status={testStatus} variant={p.variant}>
		<ToolTrigger name="pnpm test checkout" title="Running the tests" kind="terminal" />
		<ToolContent>
			<ToolOutput maxHeight={140}>{LOG.slice(0, lines).join("\n")}</ToolOutput>
			<ToolActions>
				<ToolCopy text={LOG.join("\n")} />
				<ToolRetry onclick={run} />
			</ToolActions>
		</ToolContent>
	</Tool>
	<Tool status={deploy} variant={p.variant} open collapseOnComplete={false}>
		<ToolTrigger name="pnpm deploy checkout" title="Deploying to production" kind="terminal" />
		<ToolContent>
			<ApprovalGate request={DEPLOY} status={decision} now={0} variant="plain">
				<ApprovalGateReceipt />
				<ApprovalGateBody>
					<ApprovalGateSummary />
					<ApprovalGateArgs />
					<ApprovalGateActions onApprove={() => decide("approved")} onDeny={() => decide("denied")} />
				</ApprovalGateBody>
			</ApprovalGate>
		</ToolContent>
	</Tool>
</div>
