"use client";

import {
	type ComponentProps,
	createContext,
	type KeyboardEvent,
	type ReactNode,
	type RefObject,
	useContext,
	useEffect,
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
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "../../dropdown-menu/react/dropdown-menu";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/react/use-controllable";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover/react/popover";
import { RadioGroup, RadioGroupItem } from "../../radio-group/react/radio-group";
import { Slider } from "../../slider/react/slider";
import {
	type ComposerSnapshot,
	playComposer,
	settleComposer,
	snapshotComposer,
} from "../flip";
import {
	COMPOSER_LINE_HEIGHT,
	CONTEXT_RING_LENGTH,
	type ComposerSize,
	type ComposerVariant,
	composer,
	contextOffset,
} from "../variants";

export type { ComposerSize, ComposerVariant };

type Ctx = {
	value: string;
	setValue: (next: string) => void;
	submit: () => void;
	canSubmit: boolean;
	disabled: boolean;
	loading: boolean;
	onStop?: () => void;
	size: ComposerSize;
	variant: ComposerVariant;
	expanded: boolean;
	registerAttachment: () => () => void;
	inputRef: RefObject<HTMLTextAreaElement | null>;
	styles: ReturnType<typeof composer>;
};
const ComposerCtx = createContext<Ctx | null>(null);

function useComposer(part: string): Ctx {
	const ctx = useContext(ComposerCtx);
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
	/** Default design only: force the card (true) or the single row (false). By default it opens for attachments or text. */
	expanded?: boolean;
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
	variant = "default",
	size = "default",
	expanded: expandedProp,
	className,
	children,
	...props
}: ComposerProps) {
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const [current, setValue] = useControllable(value, defaultValue, onValueChange);
	const formRef = useRef<HTMLFormElement>(null);
	const last = useRef<ComposerSnapshot | null>(null);
	const [attachments, setAttachments] = useState(0);
	const [focused, setFocused] = useState(false);
	const expanded =
		variant === "default" &&
		(expandedProp ?? (focused || attachments > 0 || current.trim() !== ""));
	const registerAttachment = () => {
		setAttachments((n) => n + 1);
		return () => setAttachments((n) => n - 1);
	};
	// After each change of state, glide the parts from their last positions to the new ones.
	// biome-ignore lint/correctness/useExhaustiveDependencies: runs when the card opens or closes.
	useLayoutEffect(() => {
		const form = formRef.current;
		if (!form || variant !== "default") return;
		settleComposer(form);
		const next = snapshotComposer(form);
		if (last.current) playComposer(form, last.current, next);
		last.current = next;
	}, [expanded]);
	const canSubmit = current.trim() !== "" && !disabled && !loading;
	const submit = () => {
		const text = current.trim();
		if (!text || disabled || loading) return;
		onSubmit?.(text);
		setValue("");
		inputRef.current?.focus();
	};
	const isInput = (target: EventTarget) => target === inputRef.current;
	const styles = composer({ variant, size });
	return (
		<ComposerCtx.Provider
			value={{
				value: current,
				setValue,
				submit,
				canSubmit,
				disabled,
				loading,
				onStop,
				size,
				variant,
				expanded,
				registerAttachment,
				inputRef,
				styles,
			}}
		>
			<form
				ref={formRef}
				data-slot="composer"
				data-variant={variant}
				data-expanded={variant === "default" ? expanded : undefined}
				data-disabled={disabled || undefined}
				aria-busy={loading}
				className={cn(styles.root(), className)}
				{...props}
				// Only the text field opens the card; focusing a button or a chip does not.
				onFocus={(event) => {
					if (isInput(event.target)) setFocused(true);
					props.onFocus?.(event);
				}}
				// A menu opens in a portal, so focus moving into one keeps the card open.
				onBlur={(event) => {
					const next = event.relatedTarget;
					const inMenu =
						next instanceof Element &&
						next.closest("[role=menu],[role=listbox],[role=dialog]");
					if (!inMenu && !(next instanceof Node && event.currentTarget.contains(next)))
						setFocused(false);
					props.onBlur?.(event);
				}}
				onSubmit={(event) => {
					event.preventDefault();
					submit();
				}}
			>
				{children}
			</form>
		</ComposerCtx.Provider>
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

export interface ComposerActionsProps
	extends Omit<ComponentProps<typeof DropdownMenu>, "children"> {
	/** Names the plus button. */
	label?: string;
	className?: string;
	children?: ReactNode;
}

/** The plus button and the menu behind it. Fill it with ComposerMenuLabel and ComposerMenuItem rows. */
export function ComposerActions({
	label = "Add to prompt",
	className,
	children,
	...props
}: ComposerActionsProps) {
	const { disabled, loading, styles } = useComposer("ComposerActions");
	return (
		<DropdownMenu {...props}>
			<DropdownMenuTrigger
				data-composer="actions"
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
			<DropdownMenuContent side="top" align="start" size="sm" className={styles.menu()}>
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** A heading above a run of rows. */
export function ComposerMenuLabel({
	className,
	...props
}: ComponentProps<typeof DropdownMenuLabel>) {
	const { styles } = useComposer("ComposerMenuLabel");
	return <DropdownMenuLabel className={cn(styles.menuLabel(), className)} {...props} />;
}

/** One row: put a ComposerMenuIcon, a ComposerMenuTitle and optionally a ComposerMenuHint inside. */
export function ComposerMenuItem({
	className,
	...props
}: ComponentProps<typeof DropdownMenuItem>) {
	const { styles } = useComposer("ComposerMenuItem");
	return <DropdownMenuItem className={cn(styles.menuRow(), className)} {...props} />;
}

export function ComposerMenuIcon({ className, ...props }: ComponentProps<"span">) {
	const { styles } = useComposer("ComposerMenuIcon");
	return <span aria-hidden className={cn(styles.menuIcon(), className)} {...props} />;
}

export function ComposerMenuTitle({ className, ...props }: ComponentProps<"span">) {
	const { styles } = useComposer("ComposerMenuTitle");
	return <span className={cn(styles.menuTitle(), className)} {...props} />;
}

export function ComposerMenuHint({ className, ...props }: ComponentProps<"span">) {
	const { styles } = useComposer("ComposerMenuHint");
	return <span className={cn(styles.menuHint(), className)} {...props} />;
}

/** The model picker: a popover with a trigger, a list of models and an effort slider. */
export function ComposerModelPicker(props: ComponentProps<typeof Popover>) {
	return <Popover {...props} />;
}

/** The chip that opens the picker; it locks while a reply is being written. */
export function ComposerModelTrigger({
	className,
	children,
	...props
}: ComponentProps<typeof PopoverTrigger>) {
	const { disabled, loading, styles } = useComposer("ComposerModelTrigger");
	return (
		<PopoverTrigger
			disabled={disabled || loading}
			className={cn(styles.modelTrigger(), className)}
			{...props}
		>
			{children}
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
				className="size-4 shrink-0"
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		</PopoverTrigger>
	);
}

export function ComposerModelContent({
	className,
	...props
}: ComponentProps<typeof PopoverContent>) {
	const { styles } = useComposer("ComposerModelContent");
	return (
		<PopoverContent
			side="top"
			align="end"
			className={cn(styles.modelContent(), className)}
			{...props}
		/>
	);
}

export function ComposerModelLabel({ className, ...props }: ComponentProps<"div">) {
	const { styles } = useComposer("ComposerModelLabel");
	return <div className={cn(styles.menuLabel(), className)} {...props} />;
}

/** The radio list of models; its value is the chosen model. */
export function ComposerModelGroup({
	className,
	...props
}: ComponentProps<typeof RadioGroup>) {
	return <RadioGroup size="sm" className={cn("gap-0.5", className)} {...props} />;
}

export function ComposerModelItem({
	className,
	...props
}: ComponentProps<typeof RadioGroupItem>) {
	const { styles } = useComposer("ComposerModelItem");
	return <RadioGroupItem className={cn(styles.modelItem(), className)} {...props} />;
}

export interface ComposerEffortProps {
	value?: number;
	defaultValue?: number;
	onValueChange?: (value: number) => void;
	/** How many notches the track has. */
	levels?: number;
	label?: string;
	/** Names the chosen notch; defaults to its number. */
	format?: (value: number) => string;
	lowLabel?: string;
	highLabel?: string;
	className?: string;
}

/** A notched slider for how hard the model thinks. */
export function ComposerEffort({
	value,
	defaultValue = 0,
	onValueChange,
	levels = 6,
	label = "Effort",
	format = (n) => String(n + 1),
	lowLabel = "Faster",
	highLabel = "Smarter",
	className,
}: ComposerEffortProps) {
	const { styles } = useComposer("ComposerEffort");
	const [current, setCurrent] = useControllable(value, defaultValue, onValueChange);
	const notches = Array.from({ length: levels }, (_, n) => n);
	return (
		<div className={cn(styles.effort(), className)}>
			<div className={styles.effortHeader()}>
				<span>{label}</span>
				<span className={styles.effortValue()}>{format(current)}</span>
			</div>
			<div className={styles.effortEnds()}>
				<span>{lowLabel}</span>
				<span>{highLabel}</span>
			</div>
			<div className="relative">
				<Slider
					variant="track"
					size="sm"
					orientation="horizontal"
					label={label}
					min={0}
					max={levels - 1}
					step={1}
					value={current}
					onValueChange={(next) =>
						setCurrent(Array.isArray(next) ? (next[0] ?? 0) : next)
					}
					className={styles.effortTrack()}
				/>
				<span aria-hidden className={styles.effortNotches()}>
					{notches.map((n) => (
						<span key={n} className={styles.effortNotch()} />
					))}
				</span>
			</div>
		</div>
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

function Glyph({ d }: { d: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<path d={d} />
		</svg>
	);
}

const MIC =
	"M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5 11a7 7 0 0 0 14 0M12 18v3";
const CLOSE = "M6 6l12 12M18 6 6 18";
const CHEVRON = "m6 9 6 6 6-6";

/** The group on the right of the toolbar: the model, voice and send. */
export function ComposerTools({ className, ...props }: ComponentProps<"div">) {
	const { styles } = useComposer("ComposerTools");
	return (
		<div
			data-slot="composer-tools"
			className={cn(styles.tools(), className)}
			{...props}
		/>
	);
}

/** A round outline button for voice input. It renders only where you place it. */
export function ComposerVoice({
	label = "Start voice input",
	className,
	children,
	...props
}: Omit<ComponentProps<"button">, "color"> & { label?: string }) {
	const { disabled, loading, styles } = useComposer("ComposerVoice");
	return (
		<Button
			type="button"
			variant="outline"
			size="icon"
			disabled={disabled || loading}
			aria-label={label}
			data-slot="composer-voice"
			className={cn(styles.voice(), className)}
			{...props}
		>
			{children ?? <Glyph d={MIC} />}
		</Button>
	);
}

/** The row of attachments above the text. It opens while it holds any `ComposerAttachment`. */
export function ComposerFiles({ className, children, ...props }: ComponentProps<"div">) {
	const { styles } = useComposer("ComposerFiles");
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	// Watches the tiles, so the row can fold shut once the last one is removed.
	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		const update = () => setOpen(el.childElementCount > 0);
		update();
		const observer = new MutationObserver(update);
		observer.observe(el, { childList: true });
		return () => observer.disconnect();
	}, []);
	return (
		<div
			data-slot="composer-files"
			data-open={open}
			inert={!open}
			className={cn(styles.files(), className)}
			{...props}
		>
			<div ref={ref} className={styles.filesInner()}>
				{children}
			</div>
		</div>
	);
}

/** One attachment tile: `src` for an image, or `icon` and `name` for a file. `progress` shows an upload. */
export function ComposerAttachment({
	name,
	src,
	icon,
	progress,
	error,
	onRemove,
	removeLabel = "Remove attachment",
	className,
	...props
}: Omit<ComponentProps<"div">, "children"> & {
	name?: string;
	src?: string;
	icon?: ReactNode;
	/** 0 to 100 while uploading; leave it out once the file is ready. */
	progress?: number;
	/** The upload failed: the tile turns destructive and shows this text, or "Failed". */
	error?: boolean | string;
	onRemove?: () => void;
	removeLabel?: string;
}) {
	const { styles, registerAttachment } = useComposer("ComposerAttachment");
	// biome-ignore lint/correctness/useExhaustiveDependencies: register once per tile.
	useEffect(registerAttachment, []);
	return (
		<div
			data-slot="composer-attachment"
			data-error={error ? true : undefined}
			className={cn(styles.attachment(), className)}
			{...props}
		>
			{src ? (
				<img src={src} alt={name ?? ""} className={styles.attachmentImage()} />
			) : (
				<span aria-hidden className={styles.attachmentIcon()}>
					{icon}
				</span>
			)}
			{!src && name ? <span className={styles.attachmentName()}>{name}</span> : null}
			{error ? (
				<span className="absolute top-1.5 right-2 font-medium text-xs">
					{typeof error === "string" ? error : "Failed"}
				</span>
			) : progress !== undefined ? (
				<>
					<span className="absolute top-1.5 right-2 font-medium text-primary text-xs tabular-nums">
						{Math.round(progress)}%
					</span>
					<span
						role="progressbar"
						aria-valuemin={0}
						aria-valuemax={100}
						aria-valuenow={Math.round(progress)}
						aria-label={name}
						className={styles.attachmentProgress()}
						style={{ scale: `${Math.min(100, Math.max(0, progress)) / 100} 1` }}
					/>
				</>
			) : null}
			{onRemove ? (
				<button
					type="button"
					aria-label={removeLabel}
					onClick={onRemove}
					className={styles.attachmentRemove()}
				>
					<Glyph d={CLOSE} />
				</button>
			) : null}
		</div>
	);
}

/** The row around the card: chips on the left, the context ring on the right. */
export function ComposerFooter({ className, ...props }: ComponentProps<"div">) {
	const { styles } = useComposer("ComposerFooter");
	return (
		<div
			data-slot="composer-footer"
			className={cn(styles.footer(), className)}
			{...props}
		/>
	);
}

/** A small control in the footer or toolbar. `menu` adds a chevron for a dropdown trigger. */
export function ComposerChip({
	icon,
	menu = false,
	className,
	children,
	...props
}: ComponentProps<"button"> & { icon?: ReactNode; menu?: boolean }) {
	const { styles } = useComposer("ComposerChip");
	return (
		<button
			type="button"
			data-slot="composer-chip"
			className={cn(styles.chip(), className)}
			{...props}
		>
			{icon}
			{children}
			{menu ? <Glyph d={CHEVRON} /> : null}
		</button>
	);
}

/** The mode chip in the toolbar, such as permissions. It shows only while the card is expanded. */
export function ComposerMode(props: ComponentProps<typeof ComposerChip>) {
	return <ComposerChip data-composer="mode" {...props} />;
}

/** How full the context window is, 0 to 100, as a ring and a percentage. */
export function ComposerContext({
	percent,
	label = "Context used",
	className,
}: {
	percent: number;
	label?: string;
	className?: string;
}) {
	const { styles } = useComposer("ComposerContext");
	const value = Math.round(Math.min(100, Math.max(0, percent)));
	return (
		<span
			data-slot="composer-context"
			role="img"
			aria-label={`${label}: ${value}%`}
			className={cn(styles.usage(), className)}
		>
			<svg viewBox="0 0 20 20" aria-hidden className="-rotate-90">
				<circle
					cx="10"
					cy="10"
					r="7"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					className="opacity-25"
				/>
				<circle
					cx="10"
					cy="10"
					r="7"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeDasharray={CONTEXT_RING_LENGTH}
					strokeDashoffset={contextOffset(percent)}
					className="transition-[stroke-dashoffset] duration-(--duration-slow) ease-(--ease-ui-out) motion-reduce:transition-none"
				/>
			</svg>
			<span aria-hidden>{value}%</span>
		</span>
	);
}
