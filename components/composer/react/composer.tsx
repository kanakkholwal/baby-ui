"use client";

import {
	type ComponentProps,
	createContext,
	type KeyboardEvent,
	type ReactNode,
	type RefObject,
	useContext,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { Button } from "../../button/react/button";
import { button } from "../../button/variants";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../dropdown-menu/react/dropdown-menu";
import { cn } from "../../lib/cn";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "../../select/react/select";
import {
	COMPOSER_LINE_HEIGHT,
	type ComposerSize,
	type ComposerVariant,
	composer,
} from "../variants";

export type { ComposerSize, ComposerVariant };

export type ComposerModel = {
	value: string;
	label: ReactNode;
	icon?: ReactNode;
	disabled?: boolean;
};

export type ComposerAction = {
	value: string;
	label: ReactNode;
	description?: ReactNode;
	icon?: ReactNode;
	disabled?: boolean;
};

type Ctx = {
	value: string;
	setValue: (next: string) => void;
	submit: () => void;
	canSubmit: boolean;
	disabled: boolean;
	loading: boolean;
	onStop?: () => void;
	size: ComposerSize;
	inputRef: RefObject<HTMLTextAreaElement | null>;
	styles: ReturnType<typeof composer>;
};
const ComposerContext = createContext<Ctx | null>(null);

function useComposer(part: string): Ctx {
	const ctx = useContext(ComposerContext);
	if (!ctx) throw new Error(`${part} must be used inside <Composer>`);
	return ctx;
}

export interface ComposerProps
	extends Omit<ComponentProps<"form">, "onSubmit" | "defaultValue"> {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	/** Called with the trimmed text on Enter or the send button; the draft then clears through onValueChange. */
	onSubmit?: (value: string) => void;
	disabled?: boolean;
	/** A reply is being written: send becomes stop. */
	loading?: boolean;
	onStop?: () => void;
	variant?: ComposerVariant;
	size?: ComposerSize;
}

/** The root: a chat input that grows with its text, with a toolbar of parts below it. */
export function Composer({
	value,
	defaultValue = "",
	onValueChange,
	onSubmit,
	disabled = false,
	loading = false,
	onStop,
	variant = "outline",
	size = "default",
	className,
	children,
	...props
}: ComposerProps) {
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const [own, setOwn] = useState(defaultValue);
	const current = value ?? own;
	const canSubmit = current.trim() !== "" && !disabled && !loading;
	const setValue = (next: string) => {
		if (value === undefined) setOwn(next);
		onValueChange?.(next);
	};
	const submit = () => {
		const text = current.trim();
		if (!text || disabled || loading) return;
		onSubmit?.(text);
		setValue("");
		inputRef.current?.focus();
	};
	const styles = composer({ variant, size });
	return (
		<ComposerContext.Provider
			value={{
				value: current,
				setValue,
				submit,
				canSubmit,
				disabled,
				loading,
				onStop,
				size,
				inputRef,
				styles,
			}}
		>
			<form
				data-slot="composer"
				data-variant={variant}
				data-disabled={disabled || undefined}
				aria-busy={loading}
				className={cn(styles.root(), className)}
				{...props}
				onSubmit={(event) => {
					event.preventDefault();
					submit();
				}}
			>
				{children}
			</form>
		</ComposerContext.Provider>
	);
}

export interface ComposerInputProps {
	placeholder?: string;
	minRows?: number;
	/** Past this many lines the text scrolls. */
	maxRows?: number;
	/** Names the field for assistive tech. */
	label?: string;
	className?: string;
}

/** The text field. Enter sends, Shift+Enter breaks the line, an IME's Enter commits its text. */
export function ComposerInput({
	placeholder = "Ask the agent to do something…",
	minRows = 2,
	maxRows = 8,
	label = "Prompt",
	className,
}: ComposerInputProps) {
	const { value, setValue, submit, disabled, size, inputRef, styles } =
		useComposer("ComposerInput");
	const mirrorRef = useRef<HTMLDivElement>(null);
	const lineHeight = COMPOSER_LINE_HEIGHT[size];

	const resize = () => {
		const el = inputRef.current;
		const mirror = mirrorRef.current;
		if (!el || !mirror) return;
		el.style.height = `${Math.min(Math.max(mirror.scrollHeight, minRows * lineHeight), maxRows * lineHeight)}px`;
	};
	const resizeRef = useRef(resize);
	resizeRef.current = resize;
	// biome-ignore lint/correctness/useExhaustiveDependencies: re-measure when the text changes.
	useLayoutEffect(resize, [value, minRows, maxRows, lineHeight]);
	// A narrower field wraps more lines, so the height follows the width too.
	useLayoutEffect(() => {
		const el = inputRef.current;
		if (!el) return;
		const observer = new ResizeObserver(() => resizeRef.current());
		observer.observe(el);
		return () => observer.disconnect();
	}, [inputRef]);

	const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
		event.preventDefault();
		submit();
	};

	return (
		<div data-slot="composer-input" className={cn(styles.input(), className)}>
			<div ref={mirrorRef} aria-hidden className={styles.mirror()}>
				{`${value}​`}
			</div>
			<textarea
				ref={inputRef}
				rows={minRows}
				value={value}
				placeholder={placeholder}
				aria-label={label}
				disabled={disabled}
				onChange={(event) => setValue(event.currentTarget.value)}
				onKeyDown={onKeyDown}
				className={styles.textarea()}
			/>
		</div>
	);
}

/** The row under the field: actions, the model and the send button. */
export function ComposerToolbar({ className, ...props }: ComponentProps<"div">) {
	const { styles } = useComposer("ComposerToolbar");
	return (
		<div
			data-slot="composer-toolbar"
			className={cn(styles.toolbar(), className)}
			{...props}
		/>
	);
}

export interface ComposerActionsProps {
	actions: ComposerAction[];
	onAction: (value: string) => void;
	/** Names the plus button. */
	label?: string;
	className?: string;
}

/** A plus button that opens a menu of things to add, such as a file or an image. */
export function ComposerActions({
	actions,
	onAction,
	label = "Add to prompt",
	className,
}: ComposerActionsProps) {
	const { disabled, loading, styles } = useComposer("ComposerActions");
	const [open, setOpen] = useState(false);
	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger
				aria-label={label}
				disabled={disabled || loading}
				className={cn(
					button({ variant: "ghost", size: "icon-sm" }),
					styles.actionsTrigger(),
					className,
				)}
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
					<path
						d="M8 3.5v9M3.5 8h9"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
				</svg>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="top" align="start" className="w-56">
				{actions.map((action) => (
					<DropdownMenuItem
						key={action.value}
						disabled={action.disabled}
						onClick={() => {
							onAction(action.value);
							setOpen(false);
						}}
						className="items-start gap-2.5 py-2"
					>
						{action.icon && <span className={styles.actionIcon()}>{action.icon}</span>}
						<span className="min-w-0">
							<span className="block text-foreground text-sm">{action.label}</span>
							{action.description && (
								<span className="mt-0.5 block text-muted-foreground text-xs leading-4">
									{action.description}
								</span>
							)}
						</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export interface ComposerModelSelectProps {
	models: ComposerModel[];
	model?: string;
	defaultModel?: string;
	onModelChange?: (model: string) => void;
	className?: string;
}

/** The model picker; it locks while a reply is being written. */
export function ComposerModelSelect({
	models,
	model,
	defaultModel,
	onModelChange,
	className,
}: ComposerModelSelectProps) {
	const { disabled, loading, styles } = useComposer("ComposerModelSelect");
	const [own, setOwn] = useState(defaultModel ?? models[0]?.value);
	const current = model ?? own;
	const option = models.find((m) => m.value === current);
	return (
		<Select
			value={current}
			onValueChange={(next) => {
				if (typeof next !== "string") return;
				if (model === undefined) setOwn(next);
				onModelChange?.(next);
			}}
			items={models}
			disabled={disabled || loading}
		>
			<SelectTrigger className={cn(styles.modelTrigger(), className)}>
				<span className="flex min-w-0 items-center gap-1.5">
					{option?.icon && <span className={styles.modelIcon()}>{option.icon}</span>}
					<span className="truncate text-muted-foreground">
						{option?.label ?? "Choose model"}
					</span>
				</span>
			</SelectTrigger>
			<SelectContent align="start" className="w-52">
				{models.map((m) => (
					<SelectItem
						key={m.value}
						value={m.value}
						disabled={m.disabled}
						className="py-2"
					>
						<span className="flex min-w-0 items-center gap-2">
							{m.icon && <span className={styles.actionIcon()}>{m.icon}</span>}
							<span className="min-w-0 truncate text-foreground text-sm">{m.label}</span>
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export interface ComposerSubmitProps {
	sendLabel?: string;
	stopLabel?: string;
	className?: string;
}

/** Sends the text, or stops the reply while `loading`. */
export function ComposerSubmit({
	sendLabel = "Send prompt",
	stopLabel = "Stop generating",
	className,
}: ComposerSubmitProps) {
	const { loading, onStop, canSubmit, styles } = useComposer("ComposerSubmit");
	return (
		<Button
			type={loading ? "button" : "submit"}
			size="icon-sm"
			data-slot="composer-submit"
			data-state={loading ? "stop" : "send"}
			onClick={loading ? onStop : undefined}
			disabled={loading ? !onStop : !canSubmit}
			aria-label={loading ? stopLabel : sendLabel}
			className={cn(styles.submit(), className)}
		>
			{/* Keyed, so the icons swap with a rise instead of cutting. */}
			<span key={loading ? "stop" : "send"} className={styles.submitIcon()}>
				{loading ? (
					<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className="size-3">
						<rect x="2" y="2" width="12" height="12" rx="2.5" />
					</svg>
				) : (
					<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
						<path
							d="M8 13V3.5M4 7l4-4 4 4"
							stroke="currentColor"
							strokeWidth="1.6"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
			</span>
		</Button>
	);
}
