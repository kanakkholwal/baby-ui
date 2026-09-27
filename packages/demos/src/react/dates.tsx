"use client";

import {
	Button,
	Calendar,
	type CalendarSize,
	type DateRange,
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
	type InputOtpSize,
	RangeCalendar,
} from "@baby-ui/react";
import { useEffect, useState } from "react";

type Props = Record<string, unknown>;

// The code a real backend would have emailed; demo only.
const SAMPLE_CODE = "418206";

export function InputOTPDemo({ props }: { props: Props }) {
	const [value, setValue] = useState("");
	const [status, setStatus] = useState<"idle" | "verified" | "wrong">("idle");
	const size = (props.size as InputOtpSize) ?? "md";

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
				aria-invalid={status === "wrong" || undefined}
			>
				<InputOTPGroup>
					<InputOTPSlot index={0} aria-invalid={status === "wrong" || undefined} />
					<InputOTPSlot index={1} aria-invalid={status === "wrong" || undefined} />
					<InputOTPSlot index={2} aria-invalid={status === "wrong" || undefined} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={3} aria-invalid={status === "wrong" || undefined} />
					<InputOTPSlot index={4} aria-invalid={status === "wrong" || undefined} />
					<InputOTPSlot index={5} aria-invalid={status === "wrong" || undefined} />
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

export function CalendarDemo({ props }: { props: Props }) {
	const [date, setDate] = useState<Date | undefined>(() => new Date());
	const layout = (props.captionLayout as "label" | "dropdown") ?? "dropdown";

	return (
		<Calendar
			mode="single"
			selected={date}
			onSelect={setDate}
			captionLayout={layout}
			size={(props.size as CalendarSize) ?? "md"}
			className="rounded-lg border border-border"
		/>
	);
}

export function RangeCalendarDemo({ props }: { props: Props }) {
	const [range, setRange] = useState<DateRange | undefined>(() => {
		const from = new Date();
		return { from, to: new Date(from.getTime() + 5 * 86_400_000) };
	});

	// Two months side by side on wide screens, one on a phone.
	const [months, setMonths] = useState(2);
	useEffect(() => {
		const query = matchMedia("(min-width: 768px)");
		const sync = () => setMonths(query.matches ? 2 : 1);
		sync();
		query.addEventListener("change", sync);
		return () => query.removeEventListener("change", sync);
	}, []);

	return (
		<RangeCalendar
			selected={range}
			onSelect={setRange}
			numberOfMonths={months}
			size={(props.size as CalendarSize) ?? "md"}
			className="rounded-lg border border-border"
		/>
	);
}
