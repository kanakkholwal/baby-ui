"use client";

import {
	Button,
	InputOTP,
	InputOTPGroup,
	InputOTPMessage,
	InputOTPResend,
	InputOTPSeparator,
	InputOTPSlot,
	InputOTPVerified,
	type InputOtpStatus,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useId, useRef, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

// The code a real backend would have emailed; demo only.
const SAMPLE_CODE = "482913";
const RESEND_AFTER = 30;

export function InputOTPDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof InputOTP>>(props);
	const [value, setValue] = useState("");
	const [phase, setPhase] = useState<InputOtpStatus>("idle");
	const [wrong, setWrong] = useState(false);
	const [seconds, setSeconds] = useState(RESEND_AFTER);
	const timers = useRef<number[]>([]);
	const messageId = useId();
	// The status control previews a state directly; otherwise the demo's own flow drives it.
	const status = p.status && p.status !== "idle" ? p.status : phase;

	useEffect(() => {
		const all = timers.current;
		const tick = window.setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
		return () => {
			clearInterval(tick);
			all.forEach(clearTimeout);
		};
	}, []);

	const later = (fn: () => void, ms: number) => {
		timers.current.push(window.setTimeout(fn, ms));
	};
	function verify(code: string) {
		setPhase("verifying");
		later(() => {
			if (code === SAMPLE_CODE) return setPhase("success");
			setPhase("idle");
			setWrong(true);
			// The wrong code clears, so the next try starts fresh.
			later(() => setValue(""), 900);
		}, 1100);
	}
	function change(next: string) {
		setValue(next);
		if (next) setWrong(false);
	}
	function reset() {
		setValue("");
		setPhase("idle");
		setWrong(false);
		setSeconds(RESEND_AFTER);
	}

	return (
		<div className="w-full max-w-sm rounded-2xl border border-border bg-muted/60 p-1">
			<div className="flex flex-col items-center rounded-[11px] border border-border bg-card px-6 py-8 text-center">
				<span className="grid size-11 place-items-center rounded-xl border border-border bg-muted text-muted-foreground">
					<svg
						viewBox="0 0 24 24"
						aria-hidden
						className="size-5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.6]"
					>
						<path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11ZM4.5 6.5l7.5 6 7.5-6" />
					</svg>
				</span>
				<h2 className="mt-4 font-semibold text-base text-foreground">Check your email</h2>
				<p className="mt-1 text-muted-foreground text-sm">
					We sent a code to <span className="text-foreground">maya@acme.com</span>
				</p>
				<div className="mt-6">
					<InputOTP
						maxLength={6}
						value={value}
						onChange={change}
						onComplete={verify}
						variant={p.variant}
						size={p.size ?? "xl"}
						status={status}
						invalid={wrong}
						invalidMotion={p.invalidMotion ?? "shake"}
						aria-label="Verification code"
						aria-describedby={wrong ? messageId : undefined}
					>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
						</InputOTPGroup>
						<InputOTPSeparator />
						<InputOTPGroup>
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
						<InputOTPVerified />
					</InputOTP>
				</div>
				<InputOTPMessage open={wrong} id={messageId}>
					That code didn't work. Try again.
				</InputOTPMessage>
				<InputOTPResend
					seconds={seconds}
					onResend={() => setSeconds(RESEND_AFTER)}
					hidden={status === "success"}
					className="mt-4"
				/>
			</div>
			<div className="flex min-h-10 items-center justify-center gap-2 px-3 text-muted-foreground text-sm">
				{status === "success" ? (
					<Button size="sm" variant="ghost" onClick={reset}>
						Try it again
					</Button>
				) : (
					<span>
						Demo code: <span className="text-foreground tabular-nums">482 913</span>
					</span>
				)}
			</div>
		</div>
	);
}
