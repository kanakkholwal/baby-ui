"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import {
	type ComponentProps,
	type CSSProperties,
	createContext,
	type ReactNode,
	useContext,
	useLayoutEffect,
	useRef,
} from "react";
import { cn } from "../../lib/cn";
import {
	formatCountdown,
	INPUT_OTP_ICONS,
	type InputOtpInvalidMotion,
	type InputOtpSize,
	type InputOtpStatus,
	type InputOtpVariant,
	inputOtp,
	inputOtpMeta,
} from "../variants";

export type { InputOtpStatus, InputOtpVariant };

type StyleProps = {
	variant: InputOtpVariant;
	size: InputOtpSize;
	invalid: boolean;
	invalidMotion: InputOtpInvalidMotion;
	status: InputOtpStatus;
};

const StyleCtx = createContext<StyleProps>({
	variant: "default",
	size: "default",
	invalid: false,
	invalidMotion: "shake",
	status: "idle",
});
// The slots the last change filled, so a pasted code lands one slot after another.
const ChangeCtx = createContext<{ from: number; count: number }>({ from: 0, count: 0 });

// The children form of OTPInput's props: the field adds its ring next to the slots you pass.
type OTPProps = Omit<
	Extract<ComponentProps<typeof OTPInput>, { render?: undefined }>,
	"size"
>;

/** One-time-code field on `input-otp`: a single real input, so paste and autofill just work. */
export function InputOTP({
	className,
	containerClassName,
	variant = "default",
	size = "default",
	invalid = false,
	invalidMotion = "shake",
	status = "idle",
	children,
	...props
}: OTPProps & {
	containerClassName?: string;
	variant?: InputOtpVariant;
	size?: InputOtpSize;
	/** Reds every slot; `invalidMotion` plays each time this turns on. */
	invalid?: boolean;
	invalidMotion?: InputOtpInvalidMotion;
	/** Controlled: "verifying" shimmers the slots, "success" folds them into InputOTPVerified. */
	status?: InputOtpStatus;
}) {
	const s = inputOtp({ variant, size, invalid, invalidMotion, status });
	const busy = status !== "idle";
	return (
		<StyleCtx.Provider value={{ variant, size, invalid, invalidMotion, status }}>
			<OTPInput
				data-slot="input-otp"
				aria-invalid={invalid || undefined}
				aria-busy={status === "verifying" || undefined}
				containerClassName={cn(s.root(), containerClassName)}
				spellCheck={false}
				autoComplete="one-time-code"
				readOnly={busy || undefined}
				className={cn(s.input(), className)}
				{...props}
			>
				<Field>{children}</Field>
			</OTPInput>
		</StyleCtx.Provider>
	);
}

function Field({ children }: { children?: ReactNode }) {
	const slots = useContext(OTPInputContext)?.slots ?? [];
	const chars = slots.map((slot) => slot.char ?? "");
	const previous = useRef(chars);
	const change = useRef({ from: 0, count: 0 });
	// Compared during render so the new characters mount with their delay already set.
	if (chars.join("\u0000") !== previous.current.join("\u0000")) {
		const filled = chars
			.map((c, i) => (c && c !== previous.current[i] ? i : -1))
			.filter((i) => i >= 0);
		change.current = { from: filled[0] ?? 0, count: filled.length };
		previous.current = chars;
	}
	return (
		<ChangeCtx.Provider value={change.current}>
			{children}
			<Ring />
		</ChangeCtx.Provider>
	);
}

function Ring() {
	const style = useContext(StyleCtx);
	const slots = useContext(OTPInputContext)?.slots ?? [];
	const active = slots.findIndex((slot) => slot.isActive);
	const ref = useRef<HTMLSpanElement>(null);
	const placed = useRef(false);

	useLayoutEffect(() => {
		const ring = ref.current;
		const field = ring?.parentElement;
		if (!ring || !field) return;
		const place = () => {
			const slot = field.querySelectorAll<HTMLElement>("[data-slot=input-otp-slot]")[
				active
			];
			if (!slot) return;
			const box = field.getBoundingClientRect();
			const at = slot.getBoundingClientRect();
			// The first placement jumps; every later one glides.
			if (!placed.current) ring.style.transition = "none";
			ring.style.width = `${at.width}px`;
			ring.style.height = `${at.height}px`;
			ring.style.translate = `${at.left - box.left}px ${at.top - box.top}px`;
			ring.style.borderRadius = getComputedStyle(slot).borderRadius;
			if (!placed.current) {
				void ring.offsetWidth;
				ring.style.transition = "";
				placed.current = true;
			}
		};
		place();
		const watch = new ResizeObserver(place);
		watch.observe(field);
		return () => watch.disconnect();
	}, [active]);

	return (
		<span
			ref={ref}
			aria-hidden
			data-show={active >= 0 || undefined}
			className={inputOtp(style).ring()}
		/>
	);
}

export function InputOTPGroup({ className, ...props }: ComponentProps<"div">) {
	const { size } = useContext(StyleCtx);
	return (
		<div
			data-slot="input-otp-group"
			className={cn(inputOtp({ size }).group(), className)}
			{...props}
		/>
	);
}

export function InputOTPSlot({
	index,
	className,
	style,
	...props
}: ComponentProps<"div"> & { index: number }) {
	const s = inputOtp(useContext(StyleCtx));
	const change = useContext(ChangeCtx);
	const { char, hasFakeCaret, isActive } =
		useContext(OTPInputContext)?.slots[index] ?? {};
	const burst = change.count > 1 && index >= change.from;
	return (
		<div
			data-slot="input-otp-slot"
			data-active={isActive}
			data-filled={char ? "" : undefined}
			className={cn(s.slot(), className)}
			style={{ "--otp-delay-shimmer": `${index * 70}ms`, ...style } as CSSProperties}
			{...props}
		>
			{char ? (
				<span
					key={char}
					className={s.value()}
					style={
						{
							"--otp-delay": burst ? `${(index - change.from) * 45}ms` : "0ms",
						} as CSSProperties
					}
				>
					{char}
				</span>
			) : null}
			{hasFakeCaret ? (
				<div className={s.caret()}>
					<div className={s.caretLine()} />
				</div>
			) : null}
		</div>
	);
}

export function InputOTPSeparator({ className, ...props }: ComponentProps<"div">) {
	const s = inputOtp(useContext(StyleCtx));
	return (
		// biome-ignore lint/a11y/useSemanticElements: an <hr> cannot hold the dash icon; matches shadcn
		<div
			data-slot="input-otp-separator"
			role="separator"
			className={cn(s.separator(), className)}
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

/** The pill the slots fold into once `status` is "success"; place it inside InputOTP. */
export function InputOTPVerified({
	className,
	children = "Verified",
}: {
	className?: string;
	children?: ReactNode;
}) {
	const style = useContext(StyleCtx);
	const s = inputOtp(style);
	return (
		<span
			data-slot="input-otp-verified"
			aria-hidden={style.status !== "success"}
			className={cn(s.verified(), className)}
		>
			<svg viewBox="0 0 24 24" aria-hidden className={s.check()}>
				<path d={INPUT_OTP_ICONS.check} pathLength={1} />
			</svg>
			{children}
		</span>
	);
}

/** A line under the field, e.g. why the code failed; folds away when `open` is false. */
export function InputOTPMessage({
	open,
	id,
	className,
	children,
}: {
	open: boolean;
	/** Point the input's `aria-describedby` here. */
	id?: string;
	className?: string;
	children?: ReactNode;
}) {
	const s = inputOtpMeta();
	return (
		<div data-slot="input-otp-message" data-open={open || undefined} className={s.fold()}>
			<div className={s.clip()}>
				<p
					id={id}
					role={open ? "alert" : undefined}
					className={cn(s.message(), className)}
				>
					<svg viewBox="0 0 24 24" aria-hidden>
						<path d={INPUT_OTP_ICONS.alert} />
					</svg>
					{children}
				</p>
			</div>
		</div>
	);
}

/** "Didn't get a code? Resend in 0:25", then a Resend button; `seconds` comes from your clock. */
export function InputOTPResend({
	seconds,
	onResend,
	hidden = false,
	disabled = false,
	prompt = "Didn't get a code?",
	className,
}: {
	seconds: number;
	onResend: () => void;
	/** Fades the line out, e.g. once the code is verified. */
	hidden?: boolean;
	disabled?: boolean;
	prompt?: ReactNode;
	className?: string;
}) {
	const s = inputOtpMeta();
	const waiting = seconds > 0;
	return (
		<p
			data-slot="input-otp-resend"
			data-hidden={hidden || undefined}
			className={cn(s.resend(), className)}
		>
			{prompt}{" "}
			{waiting ? (
				<span key="wait" className={cn(s.swap(), s.wait())}>
					Resend in{" "}
					{formatCountdown(seconds)}
				</span>
			) : (
				<button
					key="go"
					type="button"
					disabled={disabled || hidden}
					onClick={onResend}
					className={cn(s.swap(), s.action())}
				>
					Resend code
				</button>
			)}
		</p>
	);
}
