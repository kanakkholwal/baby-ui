"use client";

import { type ComponentProps, createContext, type ReactNode, useContext } from "react";
import { Badge } from "../../badge/react/badge";
import { Composer } from "../../composer/react/composer";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/react/use-controllable";
import { ToggleGroup, ToggleGroupItem } from "../../toggle-group/react/toggle-group";
import { IMAGE_SHAPES, type ImageShape } from "../shapes";
import { type ImageComposerVariant, imageComposer } from "../variants";

export type { ImageComposerVariant, ImageShape };

type Ctx = {
	shape: string;
	setShape: (shape: string) => void;
	shapes: ImageShape[];
	loading: boolean;
};

const ImageComposerCtx = createContext<Ctx | null>(null);

/** The chosen shape and its ratio, for apps that size the result themselves. */
export function useImageComposer() {
	const ctx = useContext(ImageComposerCtx);
	if (!ctx) throw new Error("ImageComposer parts must be used inside <ImageComposer>");
	return { ...ctx, ratio: ctx.shapes.find((s) => s.value === ctx.shape)?.ratio ?? 1 };
}

/** A prompt box with a shape choice. Put `ComposerInput`, `ComposerToolbar` and `ComposerSubmit` inside it. */
export function ImageComposer({
	shape: shapeProp,
	defaultShape,
	onShapeChange,
	shapes = IMAGE_SHAPES,
	variant = "docked",
	onSubmit,
	loading = false,
	className,
	children,
	...props
}: Omit<ComponentProps<typeof Composer>, "onSubmit" | "variant"> & {
	shape?: string;
	defaultShape?: string;
	onShapeChange?: (shape: string) => void;
	shapes?: ImageShape[];
	variant?: ImageComposerVariant;
	/** Called with the trimmed prompt and the chosen shape. */
	onSubmit?: (prompt: string, shape: string) => void;
	children?: ReactNode;
}) {
	const [shape, setShape] = useControllable(
		shapeProp,
		defaultShape ?? shapes[0]?.value ?? "",
		onShapeChange,
	);
	return (
		<ImageComposerCtx.Provider value={{ shape, setShape, shapes, loading }}>
			<section
				data-slot="image-composer"
				className={cn(imageComposer({ variant }).root(), className)}
			>
				<Composer
					variant="filled"
					loading={loading}
					onSubmit={(prompt) => onSubmit?.(prompt, shape)}
					{...props}
				>
					{children}
				</Composer>
			</section>
		</ImageComposerCtx.Provider>
	);
}

export function ImageComposerShapes({ className }: { className?: string }) {
	const { shape, setShape, shapes, loading } = useImageComposer();
	const styles = imageComposer();
	return (
		<ToggleGroup
			data-slot="image-composer-shapes"
			type="single"
			variant="default"
			size="sm"
			label="Shape"
			disabled={loading}
			value={shape}
			className={className}
			onValueChange={(next) => {
				// A single group lets the pressed item be cleared; a shape is always chosen.
				if (typeof next === "string" && next) setShape(next);
			}}
		>
			{shapes.map((item) => (
				<ToggleGroupItem key={item.value} value={item.value} className="gap-1.5">
					<span
						aria-hidden
						className={styles.outline()}
						style={{ aspectRatio: item.ratio }}
					/>
					<span className={styles.label()}>{item.label}</span>
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}

/** The group on the right of the toolbar: a model badge, then the submit button. */
export function ImageComposerTools({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="image-composer-tools"
			className={cn(imageComposer().tools(), className)}
			{...props}
		/>
	);
}

export function ImageComposerModel({
	children,
	...props
}: Omit<ComponentProps<typeof Badge>, "variant" | "size">) {
	return (
		<Badge data-slot="image-composer-model" size="sm" variant="secondary" {...props}>
			{children}
		</Badge>
	);
}
