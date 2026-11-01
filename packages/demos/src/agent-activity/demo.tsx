"use client";

import {
	AgentActivity,
	AgentActivityContent,
	AgentActivityResult,
	AgentActivitySearch,
	AgentActivityStep,
	AgentActivityText,
	AgentActivityTool,
	AgentActivityTrigger,
	Button,
	formatDuration,
} from "@baby-ui/react";
import { type ComponentProps, useCallback, useEffect, useRef, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

// The demo streams one run: each tick reveals one more event, then the run completes.
const EVENTS = 9;

export function AgentActivityDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof AgentActivity>>(props);
	const [shown, setShown] = useState(0);
	const [done, setDone] = useState(false);
	const timer = useRef(0);
	const play = useCallback(() => {
		clearInterval(timer.current);
		setShown(0);
		setDone(false);
		let count = 0;
		timer.current = window.setInterval(() => {
			if (count < EVENTS) setShown(++count);
			else {
				setDone(true);
				clearInterval(timer.current);
			}
		}, 750);
	}, []);
	useEffect(() => {
		play();
		return () => clearInterval(timer.current);
	}, [play]);
	// The default status plays the run; picking complete finishes it, working replays it.
	const picked = useRef<string | undefined>("working");
	useEffect(() => {
		if (p.status === picked.current) return;
		picked.current = p.status;
		if (p.status === "working") play();
		else if (p.status === "complete") {
			clearInterval(timer.current);
			setShown(EVENTS);
			setDone(true);
		}
	}, [p.status, play]);

	return (
		<div className="flex w-full max-w-md flex-col gap-4">
			<AgentActivity status={done ? "complete" : "working"} variant={p.variant}>
				<AgentActivityTrigger
					label="Looking into the checkout bug…"
					summary={`Worked for ${formatDuration(shown * 0.75 + 1)}, searched 3 sites, edited 2 files`}
				/>
				<AgentActivityContent>
					{shown > 0 && (
						<AgentActivityStep status={shown > 1 ? "done" : "active"}>
							Read the failing test
						</AgentActivityStep>
					)}
					{shown > 1 && (
						<AgentActivitySearch
							query="stripe payment intent requires_action 3ds"
							more={shown > 4 ? 6 : 0}
						>
							{shown > 2 && (
								<AgentActivityResult
									href="https://docs.stripe.com/payments/3d-secure"
									domain="docs.stripe.com"
								>
									3D Secure authentication
								</AgentActivityResult>
							)}
							{shown > 3 && (
								<AgentActivityResult
									href="https://docs.stripe.com/payments/paymentintents/lifecycle"
									domain="docs.stripe.com"
								>
									How PaymentIntents work
								</AgentActivityResult>
							)}
						</AgentActivitySearch>
					)}
					{shown > 4 && (
						<AgentActivityText>
							The handler treats requires_action as a failure, so 3DS cards never finish.
						</AgentActivityText>
					)}
					{shown > 5 && (
						<AgentActivityTool action="read" target="src/checkout/confirm.ts" />
					)}
					{shown > 6 && (
						<AgentActivityTool
							action="edit"
							target="src/checkout/confirm.ts"
							additions={14}
							deletions={3}
						/>
					)}
					{shown > 7 && (
						<AgentActivityTool
							action="edit"
							target="src/checkout/confirm.test.ts"
							additions={22}
						/>
					)}
					{shown > 8 && <AgentActivityTool action="run" target="pnpm test checkout" />}
				</AgentActivityContent>
			</AgentActivity>
			<Button
				size="sm"
				variant="secondary"
				className="self-start rounded-full"
				onClick={play}
			>
				Run again
			</Button>
		</div>
	);
}
