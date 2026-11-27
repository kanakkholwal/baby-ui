"use client";

import {
	type ComponentProps,
	type CSSProperties,
	createContext,
	type ReactNode,
	useContext,
} from "react";
import { Empty } from "../../empty/react/empty";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/react/use-controllable";
import { type ImageGalleryVariant, imageGallery } from "../variants";

export type { ImageGalleryVariant };

export type ImageGalleryImage = {
	src: string;
	alt: string;
	/** Known size, so a masonry column reserves the right height before the picture loads. */
	width?: number;
	height?: number;
	/** A line under the alt text in the hover info. */
	caption?: string;
};

type Ctx = {
	images: ImageGalleryImage[];
	variant: ImageGalleryVariant;
	selectable: boolean;
	selected: number[];
	toggle: (index: number) => void;
	open: (index: number) => void;
};

const ImageGalleryCtx = createContext<Ctx | null>(null);
const ItemCtx = createContext<number>(-1);

export function useImageGallery() {
	const ctx = useContext(ImageGalleryCtx);
	if (!ctx) throw new Error("ImageGallery parts must be used inside <ImageGallery>");
	return ctx;
}

export function ImageGallery({
	images,
	variant = "masonry",
	selectable = false,
	selected: selectedProp,
	defaultSelected = [],
	onSelectedChange,
	onOpen,
	columnWidth,
	className,
	style,
	children,
	...props
}: Omit<ComponentProps<"div">, "onSelect"> & {
	images: ImageGalleryImage[];
	variant?: ImageGalleryVariant;
	/** Selection mode: a click toggles the picture instead of opening it. */
	selectable?: boolean;
	selected?: number[];
	defaultSelected?: number[];
	onSelectedChange?: (selected: number[]) => void;
	/** Called with the picture's index when it is clicked outside selection mode. */
	onOpen?: (index: number) => void;
	/** Preferred column width in rem; the column count follows the available width. */
	columnWidth?: number;
	children?: ReactNode;
}) {
	const [selected, setSelected] = useControllable(
		selectedProp,
		defaultSelected,
		onSelectedChange,
	);
	const ctx: Ctx = {
		images,
		variant,
		selectable,
		selected,
		toggle: (index) =>
			setSelected(
				selected.includes(index)
					? selected.filter((i) => i !== index)
					: [...selected, index],
			),
		open: (index) => onOpen?.(index),
	};
	return (
		<ImageGalleryCtx.Provider value={ctx}>
			<div
				data-slot="image-gallery"
				data-variant={variant}
				className={cn(imageGallery({ variant }).root(), className)}
				style={
					{
						...style,
						...(columnWidth ? { "--gallery-column-width": `${columnWidth}rem` } : null),
					} as CSSProperties
				}
				{...props}
			>
				{children}
			</div>
		</ImageGalleryCtx.Provider>
	);
}

export function ImageGalleryGrid({
	className,
	children,
	...props
}: Omit<ComponentProps<"div">, "children"> & {
	/** Render one picture; defaults to an `ImageGalleryItem` with its info overlay. */
	children?: (image: ImageGalleryImage, index: number) => ReactNode;
}) {
	const gallery = useImageGallery();
	if (gallery.images.length === 0) return null;
	return (
		<div
			data-slot="image-gallery-grid"
			className={cn(imageGallery({ variant: gallery.variant }).grid(), className)}
			{...props}
		>
			{gallery.images.map((image, index) =>
				children ? (
					children(image, index)
				) : (
					<ImageGalleryItem key={image.src} index={index} />
				),
			)}
		</div>
	);
}

export function ImageGalleryItem({
	index,
	className,
	children,
	...props
}: Omit<ComponentProps<"button">, "onClick"> & { index: number }) {
	const gallery = useImageGallery();
	const image = gallery.images[index];
	if (!image) return null;
	const selected = gallery.selected.includes(index);
	const styles = imageGallery({ variant: gallery.variant, selected });
	return (
		<button
			type="button"
			data-slot="image-gallery-item"
			data-index={index}
			data-selected={selected ? "" : undefined}
			data-feature={gallery.variant === "bento" && index % 5 === 0 ? "" : undefined}
			aria-pressed={gallery.selectable ? selected : undefined}
			aria-label={gallery.selectable ? undefined : `Open ${image.alt}`}
			className={cn(styles.item(), className)}
			style={
				gallery.variant === "masonry" && image.width && image.height
					? { aspectRatio: image.width / image.height }
					: undefined
			}
			onClick={() => (gallery.selectable ? gallery.toggle(index) : gallery.open(index))}
			{...props}
		>
			<img
				src={image.src}
				alt={image.alt}
				loading="lazy"
				draggable={false}
				className={styles.image()}
			/>
			{gallery.selectable ? (
				<span aria-hidden className={styles.check()}>
					<svg
						aria-hidden
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="m5 12.5 4.5 4.5L19 7.5" />
					</svg>
				</span>
			) : null}
			<ItemCtx.Provider value={index}>
				{children ?? <ImageGalleryInfo />}
			</ItemCtx.Provider>
		</button>
	);
}

/** The hover and focus caption; with no children it shows the picture's alt text and caption. */
export function ImageGalleryInfo({
	className,
	children,
	...props
}: ComponentProps<"span">) {
	const gallery = useImageGallery();
	const image = gallery.images[useContext(ItemCtx)];
	return (
		<span
			data-slot="image-gallery-info"
			className={cn(imageGallery({ variant: gallery.variant }).info(), className)}
			{...props}
		>
			{children ?? (
				<>
					<span className="font-medium">{image?.alt}</span>
					{image?.caption ? <span className="opacity-75">{image.caption}</span> : null}
				</>
			)}
		</span>
	);
}

/** Shown only while the gallery has no pictures; compose `EmptyHeader` and a call to action inside. */
export function ImageGalleryEmpty({ children, ...props }: ComponentProps<typeof Empty>) {
	const gallery = useImageGallery();
	if (gallery.images.length > 0) return null;
	return (
		<Empty data-slot="image-gallery-empty" variant="outline" {...props}>
			{children}
		</Empty>
	);
}
