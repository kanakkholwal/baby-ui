"use client";

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
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { type DemoPlanState, freshPlan, tickPlan } from "../data/plan-runner";
import { controlProps } from "../data/preview-props";

export function PlanRunnerDemo({ props }: { props: Record<string, unknown> }) {
	const p = controlProps<ComponentProps<typeof PlanRunner>>(props);
	const [plan, setPlan] = useState<DemoPlanState[]>(freshPlan);
	const [state, setState] = useState<"running" | "stopping" | "stopped">("running");
	const [draft, setDraft] = useState("");

	// The demo owns the clock; the runner only shows what it is given.
	useEffect(() => {
		if (state !== "running") return;
		const timer = window.setInterval(() => setPlan(tickPlan), 1000);
		return () => clearInterval(timer);
	}, [state]);

	const stop = () => {
		setState("stopping");
		window.setTimeout(() => {
			setPlan((list) =>
				list.map((s) => (s.status === "running" ? { ...s, status: "failed" } : s)),
			);
			setState("stopped");
		}, 700);
	};
	const restart = () => {
		setPlan(freshPlan());
		setState("running");
	};
	// A steer becomes the next step, right after the one running now.
	const steer = (text: string) =>
		setPlan((list) => {
			const at = list.findIndex((s) => s.status === "running");
			const step: DemoPlanState = {
				id: `steer-${Date.now()}`,
				tool: "edit",
				label: text,
				log: ["Applying your note", "Done"],
				status: "pending",
				seconds: 0,
				shown: 0,
			};
			return at < 0 ? list : [...list.slice(0, at + 1), step, ...list.slice(at + 1)];
		});

	const done = plan.filter((s) => s.status === "done").length;
	const calls = plan.reduce((sum, s) => sum + s.shown, 0);
	const elapsed = plan.reduce((sum, s) => sum + s.seconds, 0);
	const finished = done === plan.length;
	const current = Math.min(done + 1, plan.length);

	return (
		<PlanRunner variant={p.variant} className="max-w-xl">
			<PlanRunnerHeader>
				<PlanRunnerTitle>Fix tax rounding at checkout</PlanRunnerTitle>
				<PlanRunnerMeta>
					{finished ? "Done" : `Step ${current} of ${plan.length}`} ·{" "}
					{formatStepTime(elapsed)}
				</PlanRunnerMeta>
			</PlanRunnerHeader>
			<PlanRunnerBody>
				<PlanRunnerProgress
					segments={plan.map((s) => ({ id: s.id, label: s.label, status: s.status }))}
				/>
				<PlanRunnerSteps>
					{plan.map((s) => (
						<PlanRunnerStep key={s.id} status={s.status}>
							<PlanRunnerStepHead>
								<PlanRunnerTool kind={s.tool} />
								<PlanRunnerStepTitle>{s.label}</PlanRunnerStepTitle>
								{s.seconds > 0 ? <PlanRunnerTimer seconds={s.seconds} /> : null}
							</PlanRunnerStepHead>
							<PlanRunnerOutput open={s.status === "running" || s.status === "failed"}>
								{s.log.slice(0, s.shown).join("\n") || "…"}
							</PlanRunnerOutput>
						</PlanRunnerStep>
					))}
				</PlanRunnerSteps>
				<PlanRunnerSteer>
					<Composer
						value={draft}
						onValueChange={setDraft}
						onSubmit={steer}
						disabled={state !== "running" || finished}
					>
						<ComposerInput placeholder="Steer the next step…" />
						<ComposerToolbar>
							<ComposerSubmit />
						</ComposerToolbar>
					</Composer>
				</PlanRunnerSteer>
			</PlanRunnerBody>
			<PlanRunnerFooter>
				<PlanRunnerSummary>
					{state === "stopped"
						? `Stopped at step ${current}`
						: `${done} of ${plan.length} steps · ${calls} tool calls`}
				</PlanRunnerSummary>
				{state === "stopped" || finished ? (
					<Button variant="outline" size="sm" className="rounded-full" onClick={restart}>
						Run again
					</Button>
				) : (
					<PlanRunnerStop onClick={stop} loading={state === "stopping"} />
				)}
			</PlanRunnerFooter>
		</PlanRunner>
	);
}
