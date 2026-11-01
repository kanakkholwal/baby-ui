"use client";

import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useRef,
} from "react";
import { Button } from "../../button/react/button";
import { cn } from "../../lib/cn";
import { createDitherField } from "../dither";
import {
	IMAGE_GENERATION_ICONS,
	IMAGE_GENERATION_STATUS_TEXT,
	type ImageGenerationPhase,
	type ImageGenerationVariant,
	imageGeneration,
	isGenerating,
} from "../variants";

export type { ImageGenerationPhase, ImageGenerationVariant };

type Ctx = { status: ImageGenerationPhase; styles: ReturnType<typeof imageGeneration> };
const ImageGenerationContext = createContext<Ctx | null>(null);

function useImageGeneration(part: string): Ctx {
	const ctx = useContext(ImageGenerationContext);
	if (!ctx) throw new Error(`${part} must be used inside <ImageGeneration>`);
	return ctx;
}

export interface ImageGenerationProps extends ComponentProps<"div"> {
	/** Where the image is. Drive it from your generation request. */
	status?: ImageGenerationPhase;
	variant?: ImageGenerationVariant;
}

/** The root: an image being made, from a dot field through a blur to the finished picture. */
export function ImageGeneration({
	status = "generating",
	variant = "compact",
	className,
	...props
}: ImageGenerationProps) {
	const styles = imageGeneration({ variant });
	return (
		<ImageGenerationContext.Provider value={{ status, styles }}>
			<div
				data-slot="image-generation"
				data-status={status}
				data-variant={variant}
				aria-busy={isGenerating(status)}
				className={cn(styles.root(), className)}
				{...props}
			/>
		</ImageGenerationContext.Provider>
	);
}

export interface ImageGenerationFrameProps extends ComponentProps<"div"> {
	/** What the image is, read in place of it: the prompt, or a description once it is ready. */
	label: string;
	/** Reserved before the image exists, so nothing jumps when it lands. */
	aspectRatio?: string;
}

export function ImageGenerationFrame({
	label,
	aspectRatio = "1 / 1",
	className,
	style,
	...props
}: ImageGenerationFrameProps) {
	const { status, styles } = useImageGeneration("ImageGenerationFrame");
	return (
		<div
			data-slot="image-generation-frame"
			data-status={status}
			role="img"
			aria-label={label}
			style={{ aspectRatio, ...style }}
			className={cn(styles.frame(), className)}
			{...props}
		/>
	);
}

/** The image itself (img, video or canvas); it sharpens from a blur as the status advances. */
export function ImageGenerationMedia({ className, ...props }: ComponentProps<"div">) {
	const { status, styles } = useImageGeneration("ImageGenerationMedia");
	return (
		<div
			data-slot="image-generation-media"
			data-status={status}
			aria-hidden
			className={cn(styles.media(), className)}
			{...props}
		/>
	);
}

/** The dot field that stands in for the image while it is made, fading as it sharpens. */
export function ImageGenerationField({ className }: { className?: string }) {
	const { status, styles } = useImageGeneration("ImageGenerationField");
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const fieldRef = useRef<ReturnType<typeof createDitherField>>(null);
	const running = isGenerating(status);
	const runningRef = useRef(running);
	runningRef.current = running;

	// One field per mount; the status only starts and stops its drift.
	useEffect(() => {
		if (!canvasRef.current) return;
		const field = createDitherField(canvasRef.current);
		field.setRunning(runningRef.current);
		fieldRef.current = field;
		return () => field.destroy();
	}, []);
	useEffect(() => {
		fieldRef.current?.setRunning(running);
	}, [running]);

	return (
		<canvas
			ref={canvasRef}
			data-slot="image-generation-field"
			data-status={status}
			aria-hidden
			className={cn(styles.field(), className)}
		/>
	);
}

/** A corner label on the frame, such as the resolution or the model. */
export function ImageGenerationBadge({ className, ...props }: ComponentProps<"span">) {
	const { styles } = useImageGeneration("ImageGenerationBadge");
	return (
		<span
			data-slot="image-generation-badge"
			className={cn(styles.badge(), className)}
			{...props}
		/>
	);
}

/** Below the frame: the status line, then the prompt. */
export function ImageGenerationCaption({ className, ...props }: ComponentProps<"div">) {
	const { styles } = useImageGeneration("ImageGenerationCaption");
	return (
		<div
			data-slot="image-generation-caption"
			className={cn(styles.caption(), className)}
			{...props}
		/>
	);
}

export interface ImageGenerationStatusProps {
	/** Replaces the line shown for any status, e.g. `{ generating: "Painting" }`. */
	labels?: Partial<Record<ImageGenerationPhase, string>>;
	className?: string;
}

export function ImageGenerationStatus({ labels, className }: ImageGenerationStatusProps) {
	const { status, styles } = useImageGeneration("ImageGenerationStatus");
	const text = labels?.[status] ?? IMAGE_GENERATION_STATUS_TEXT[status];
	return (
		<div
			data-slot="image-generation-status"
			data-status={status}
			aria-live="polite"
			className={cn(styles.status(), className)}
		>
			<span aria-hidden className={styles.mark()}>
				{status === "complete" || status === "error" ? (
					<svg viewBox="0 0 24 24" aria-hidden className={styles.icon()}>
						<path
							d={
								status === "complete"
									? IMAGE_GENERATION_ICONS.check
									: IMAGE_GENERATION_ICONS.alert
							}
						/>
					</svg>
				) : (
					<span className={styles.spinner()}>
						<span />
						<span className="opacity-55" />
						<span className="opacity-55" />
						<span />
					</span>
				)}
			</span>
			<span key={text} className={styles.statusText()}>
				{text}
			</span>
		</div>
	);
}

export function ImageGenerationPrompt({
	className,
	children,
	...props
}: ComponentProps<"p">) {
	const { styles } = useImageGeneration("ImageGenerationPrompt");
	return (
		<p
			data-slot="image-generation-prompt"
			className={cn(styles.prompt(), className)}
			{...props}
		>
			“{children}”
		</p>
	);
}

export interface ImageGenerationRetryProps {
	/** Starts the generation again; the button only shows once it has failed. */
	onClick: () => void;
	className?: string;
	children?: ReactNode;
}

export function ImageGenerationRetry({
	onClick,
	className,
	children = "Try again",
}: ImageGenerationRetryProps) {
	const { status, styles } = useImageGeneration("ImageGenerationRetry");
	if (status !== "error") return null;
	return (
		<Button
			data-slot="image-generation-retry"
			variant="ghost"
			size="sm"
			className={cn(styles.retry(), "rounded-full", className)}
			onClick={onClick}
		>
			<svg viewBox="0 0 24 24" aria-hidden className={styles.icon()}>
				<path d={IMAGE_GENERATION_ICONS.retry} />
			</svg>
			{children}
		</Button>
	);
}
