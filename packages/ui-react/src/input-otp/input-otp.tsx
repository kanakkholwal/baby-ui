"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { type ComponentProps, createContext, useContext } from "react";
import { cn } from "../lib/cn";
import { type InputOtpSize, inputOtp } from "./variants";

const SizeCtx = createContext<InputOtpSize>("md");

// Distributes over OTPInput's children/render union; the input's numeric `size` gives way to ours.
type OTPProps =
	ComponentProps<typeof OTPInput> extends infer P
		? P extends unknown
			? Omit<P, "size">
			: never
		: never;

/** One-time-code field on `input-otp`: a single real input, so paste and autofill just work. */
export function InputOTP({
	className,
	containerClassName,
	size = "md",
	...props
}: OTPProps & {
	containerClassName?: string;
	size?: InputOtpSize;
}) {
	const s = inputOtp({ size });
	return (
		<SizeCtx.Provider value={size}>
			<OTPInput
				data-slot="input-otp"
				containerClassName={cn(s.root(), containerClassName)}
				spellCheck={false}
				autoComplete="one-time-code"
				className={cn(s.input(), className)}
				{...props}
			/>
		</SizeCtx.Provider>
	);
}

export function InputOTPGroup({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="input-otp-group"
			className={cn(inputOtp().group(), className)}
			{...props}
		/>
	);
}

export function InputOTPSlot({
	index,
	className,
	...props
}: ComponentProps<"div"> & { index: number }) {
	const s = inputOtp({ size: useContext(SizeCtx) });
	const { char, hasFakeCaret, isActive } =
		useContext(OTPInputContext)?.slots[index] ?? {};
	return (
		<div
			data-slot="input-otp-slot"
			data-active={isActive}
			className={cn(s.slot(), className)}
			{...props}
		>
			{char}
			{hasFakeCaret ? (
				<div className={s.caret()}>
					<div className={s.caretLine()} />
				</div>
			) : null}
		</div>
	);
}

export function InputOTPSeparator({ className, ...props }: ComponentProps<"div">) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: an <hr> cannot hold the dash icon; matches shadcn
		<div
			data-slot="input-otp-separator"
			role="separator"
			className={cn(inputOtp().separator(), className)}
			{...props}
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				strokeLinecap="round"
				aria-hidden="true"
			>
				<path d="M5 12h14" />
			</svg>
		</div>
	);
}
