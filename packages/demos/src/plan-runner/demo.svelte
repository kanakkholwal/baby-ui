<script lang="ts">
import {
	Button,
	Composer,
	ComposerInput,
	ComposerSubmit,
	ComposerToolbar,
	formatStepTime,
	PlanRunner,
	PlanRunnerBody,
	PlanRunnerFooter,
	PlanRunnerHeader,
	PlanRunnerMeta,
	PlanRunnerOutput,
	PlanRunnerProgress,
	PlanRunnerSteer,
	PlanRunnerStep,
	PlanRunnerStepHead,
	PlanRunnerSteps,
	PlanRunnerStepTitle,
	PlanRunnerStop,
	PlanRunnerSummary,
	PlanRunnerTimer,
	PlanRunnerTitle,
	PlanRunnerTool,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { type DemoPlanState, freshPlan, tickPlan } from "../data/plan-runner";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof PlanRunner>>(props));

let plan = $state<DemoPlanState[]>(freshPlan());
let runState = $state<"running" | "stopping" | "stopped">("running");
let draft = $state("");

// The demo owns the clock; the runner only shows what it is given.
$effect(() => {
	if (runState !== "running") return;
	const timer = setInterval(() => (plan = tickPlan(plan)), 1000);
	return () => clearInterval(timer);
});

function stop() {
	runState = "stopping";
	setTimeout(() => {
		plan = plan.map((s) => (s.status === "running" ? { ...s, status: "failed" } : s));
		runState = "stopped";
	}, 700);
}
function restart() {
	plan = freshPlan();
	runState = "running";
}
// A steer becomes the next step, right after the one running now.
function steer(text: string) {
	const at = plan.findIndex((s) => s.status === "running");
	if (at < 0) return;
	const step: DemoPlanState = {
		id: `steer-${Date.now()}`,
		tool: "edit",
		label: text,
		log: ["Applying your note", "Done"],
		status: "pending",
		seconds: 0,
		shown: 0,
	};
	plan = [...plan.slice(0, at + 1), step, ...plan.slice(at + 1)];
}

const done = $derived(plan.filter((s) => s.status === "done").length);
const calls = $derived(plan.reduce((sum, s) => sum + s.shown, 0));
const elapsed = $derived(plan.reduce((sum, s) => sum + s.seconds, 0));
const finished = $derived(done === plan.length);
const current = $derived(Math.min(done + 1, plan.length));
</script>

<PlanRunner variant={p.variant} class="max-w-xl">
	<PlanRunnerHeader>
		<PlanRunnerTitle>Fix tax rounding at checkout</PlanRunnerTitle>
		<PlanRunnerMeta>{finished ? "Done" : `Step ${current} of ${plan.length}`} · {formatStepTime(elapsed)}</PlanRunnerMeta>
	</PlanRunnerHeader>
	<PlanRunnerBody>
		<PlanRunnerProgress segments={plan.map((s) => ({ id: s.id, label: s.label, status: s.status }))} />
		<PlanRunnerSteps>
			{#each plan as s (s.id)}
				<PlanRunnerStep status={s.status}>
					<PlanRunnerStepHead>
						<PlanRunnerTool kind={s.tool} />
						<PlanRunnerStepTitle>{s.label}</PlanRunnerStepTitle>
						{#if s.seconds > 0}<PlanRunnerTimer seconds={s.seconds} />{/if}
					</PlanRunnerStepHead>
					<PlanRunnerOutput open={s.status === "running" || s.status === "failed"}>{s.log.slice(0, s.shown).join("\n") || "…"}</PlanRunnerOutput>
				</PlanRunnerStep>
			{/each}
		</PlanRunnerSteps>
		<PlanRunnerSteer>
			<Composer bind:value={draft} onSubmit={steer} disabled={runState !== "running" || finished}>
				<ComposerInput placeholder="Steer the next step…" />
				<ComposerToolbar>
					<ComposerSubmit />
				</ComposerToolbar>
			</Composer>
		</PlanRunnerSteer>
	</PlanRunnerBody>
	<PlanRunnerFooter>
		<PlanRunnerSummary>{runState === "stopped" ? `Stopped at step ${current}` : `${done} of ${plan.length} steps · ${calls} tool calls`}</PlanRunnerSummary>
		{#if runState === "stopped" || finished}
			<Button variant="outline" size="sm" class="rounded-full" onclick={restart}>Run again</Button>
		{:else}
			<PlanRunnerStop onclick={stop} loading={runState === "stopping"} />
		{/if}
	</PlanRunnerFooter>
</PlanRunner>
