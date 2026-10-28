"use client";

import {
	Button,
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

// The code a real backend would have emailed; demo only.
const SAMPLE_CODE = "418206";

export function InputOTPDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof InputOTP>>(props);
	const [value, setValue] = useState("");
	const [status, setStatus] = useState<"idle" | "verified" | "wrong">("idle");
	const size = p.size ?? "default";

	useEffect(() => {
		if (value.length < 6) return setStatus("idle");
		setStatus(value === SAMPLE_CODE ? "verified" : "wrong");
	}, [value]);

	return (
		<div className="flex flex-col items-center gap-3">
			<p className="text-muted-foreground text-sm">
				Enter the code we emailed you. Try{" "}
				<span className="font-mono">{SAMPLE_CODE}</span>.
			</p>
			<InputOTP
				maxLength={6}
				value={value}
				onChange={setValue}
				size={size}
				aria-label="Verification code"
				invalid={status === "wrong"}
				invalidMotion={p.invalidMotion ?? "shake"}
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
			</InputOTP>
			<p className="h-5 text-sm" aria-live="polite">
				{status === "verified"
					? "Verified. Signing you in."
					: status === "wrong"
						? "That code doesn't match. Check the email and try again."
						: ""}
			</p>
			<Button size="sm" variant="ghost" onClick={() => setValue("")}>
				Clear
			</Button>
		</div>
	);
}
