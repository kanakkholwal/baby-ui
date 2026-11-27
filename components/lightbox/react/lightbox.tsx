"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import {
	type ComponentProps,
	createContext,
	type KeyboardEvent,
	type MouseEvent as ReactMouseEvent,
	type ReactNode,
	type PointerEvent as ReactPointerEvent,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { Button } from "../../button/react/button";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/react/use-controllable";
import { LIGHTBOX_ICONS, type LightboxIcon } from "../icons";
import { type Origin, playMorph, playSlide, readOrigin } from "../morph";
import { type LightboxVariant, lightbox } from "../variants";
import {
	actualPixelsScale,
	clampView,
	containSize,
	FIT,
	MAX_SCALE,
	type Size,
	type View,
	viewForCentre,
	viewportRect,
	wheelFactor,
	ZOOM_STEP,
	zoomAt,
} from "../zoom";

export type { LightboxVariant };

export type LightboxImage = {
	src: string;
	alt: string;
	/** Smaller file for the filmstrip; falls back to `src`. */
	thumbnail?: string;
	/** Known size, so the picture lays out before it has loaded. */
	width?: number;
	height?: number;
};

type Ctx = {
	images: LightboxImage[];
	image: LightboxImage | undefined;
	index: number;
	count: number;
	loop: boolean;
	variant: LightboxVariant;
	setIndex: (index: number) => void;
	step: (delta: number) => void;
	detailsOpen: boolean;
	setDetailsOpen: (open: boolean) => void;
	view: View;
	setView: (view: View) => void;
	stage: Size;
	setStage: (size: Size) => void;
	base: Size;
	percent: number;
	actual: number | null;
	setNatural: (size: Size) => void;
	zoomBy: (factor: number, point?: { x: number; y: number }) => void;
	fit: () => void;
	showActual: () => void;
	open: boolean;
	registerThumb: (index: number, el: HTMLElement | null) => void;
	/** The thumbnail for a picture, measured now, or null when it is not on screen. */
	thumbOrigin: (index: number) => Origin | null;
};

const LightboxCtx = createContext<Ctx | null>(null);

/** The live viewer state, for details panels and actions that need the current picture. */
export function useLightbox() {
	const ctx = useContext(LightboxCtx);
	if (!ctx) throw new Error("Lightbox parts must be used inside <Lightbox>");
	return ctx;
}

const PADDING = 24;

export function Lightbox({
	children,
	images,
	open,
	defaultOpen = false,
	onOpenChange,
	index: indexProp,
	defaultIndex = 0,
	onIndexChange,
	detailsOpen: detailsProp,
	defaultDetailsOpen = true,
	onDetailsOpenChange,
	loop = false,
	variant = "immersive",
	origin,
}: {
	children?: ReactNode;
	images: LightboxImage[];
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	index?: number;
	defaultIndex?: number;
	onIndexChange?: (index: number) => void;
	detailsOpen?: boolean;
	defaultDetailsOpen?: boolean;
	onDetailsOpenChange?: (open: boolean) => void;
	loop?: boolean;
	variant?: LightboxVariant;
	/** The thumbnail element for a picture, so it flies out of and back into it. Triggers with an `index` register themselves. */
	origin?: (index: number) => HTMLElement | null | undefined;
}) {
	const [isOpen, setOpen] = useControllable(open, defaultOpen, onOpenChange);
	const [rawIndex, setRawIndex] = useControllable(indexProp, defaultIndex, onIndexChange);
	const [detailsOpen, setDetailsOpen] = useControllable(
		detailsProp,
		defaultDetailsOpen,
		onDetailsOpenChange,
	);
	const [view, setViewState] = useState<View>(FIT);
	const [stage, setStage] = useState<Size>({ w: 0, h: 0 });
	const [loaded, setLoaded] = useState<Size | null>(null);
	const thumbs = useRef(new Map<number, HTMLElement>());

	const count = images.length;
	const index = Math.min(Math.max(rawIndex, 0), Math.max(count - 1, 0));
	const image = images[index];
	const natural: Size = loaded ?? { w: image?.width ?? 0, h: image?.height ?? 0 };
	const base = containSize(natural, stage, PADDING);
	const percent =
		base.w > 0 && natural.w > 0
			? Math.round(((base.w * view.scale) / natural.w) * 100)
			: 100;
	const actual = actualPixelsScale(natural, base);

	// A new picture, or reopening, starts fitted and is measured again once it loads.
	// biome-ignore lint/correctness/useExhaustiveDependencies: index and isOpen are the triggers.
	useEffect(() => {
		setViewState(FIT);
		setLoaded(null);
	}, [index, isOpen]);

	const setIndex = useCallback(
		(next: number) => {
			if (count > 0) setRawIndex(Math.min(Math.max(next, 0), count - 1));
		},
		[count, setRawIndex],
	);
	const step = (delta: number) => {
		if (count === 0) return;
		const next = index + delta;
		if (next >= 0 && next < count) setRawIndex(next);
		else if (loop) setRawIndex((next + count) % count);
	};
	const setView = (next: View) => setViewState(clampView(next, base, stage));

	const ctx: Ctx = {
		images,
		image,
		index,
		count,
		loop,
		variant,
		setIndex,
		step,
		detailsOpen,
		setDetailsOpen,
		view,
		setView,
		stage,
		setStage,
		base,
		percent,
		actual,
		setNatural: setLoaded,
		zoomBy: (factor, point = { x: 0, y: 0 }) =>
			setView(zoomAt(view, factor, point, base, stage)),
		fit: () => setViewState(FIT),
		showActual: () => {
			if (actual) setView({ scale: actual, x: 0, y: 0 });
		},
		open: isOpen,
		registerThumb: (at, el) => {
			if (el) thumbs.current.set(at, el);
			else thumbs.current.delete(at);
		},
		thumbOrigin: (at) => readOrigin(origin?.(at) ?? thumbs.current.get(at)),
	};

	return (
		<LightboxCtx.Provider value={ctx}>
			<DialogPrimitive.Root open={isOpen} onOpenChange={(next) => setOpen(next)}>
				{children}
			</DialogPrimitive.Root>
		</LightboxCtx.Provider>
	);
}

/** Opens the viewer. With `index` it opens that picture and becomes the thumbnail it flies out of. */
export function LightboxTrigger({
	className,
	index,
	onClick,
	...props
}: ComponentProps<typeof DialogPrimitive.Trigger> & { index?: number }) {
	const viewer = useLightbox();
	return (
		<DialogPrimitive.Trigger
			data-slot="lightbox-trigger"
			data-current={viewer.open && index === viewer.index ? "" : undefined}
			ref={(el: HTMLElement | null) => {
				if (index === undefined) return;
				viewer.registerThumb(index, el);
				return () => viewer.registerThumb(index, null);
			}}
			onClick={(event) => {
				if (index !== undefined) viewer.setIndex(index);
				onClick?.(event);
			}}
			className={cn("inline-flex", "data-[current]:[&_img]:opacity-0", className)}
			{...props}
		/>
	);
}

export function LightboxContent({
	className,
	children,
	label = "Image viewer",
	...props
}: Omit<ComponentProps<typeof DialogPrimitive.Popup>, "onKeyDown"> & { label?: string }) {
	const viewer = useLightbox();
	const styles = lightbox({ variant: viewer.variant });

	function onKeyDown(event: KeyboardEvent) {
		if (event.target instanceof HTMLElement && event.target.closest("input, textarea"))
			return;
		const zoomed = viewer.view.scale > 1;
		if (event.key === "+" || event.key === "=") viewer.zoomBy(ZOOM_STEP);
		else if (event.key === "-") viewer.zoomBy(1 / ZOOM_STEP);
		else if (event.key === "0") viewer.fit();
		else if (event.key === "ArrowLeft" && !zoomed) viewer.step(-1);
		else if (event.key === "ArrowRight" && !zoomed) viewer.step(1);
		else return;
		event.preventDefault();
	}

	return (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Popup
				data-slot="lightbox-content"
				data-variant={viewer.variant}
				// Base UI marks the page inert but omits aria-modal, which screen readers expect.
				aria-modal="true"
				aria-label={label}
				onKeyDown={onKeyDown}
				className={cn(styles.popup(), className)}
				{...props}
			>
				{children}
			</DialogPrimitive.Popup>
		</DialogPrimitive.Portal>
	);
}

export function LightboxToolbar({ className, ...props }: ComponentProps<"div">) {
	const viewer = useLightbox();
	return (
		<div
			data-slot="lightbox-toolbar"
			className={cn(lightbox({ variant: viewer.variant }).toolbar(), className)}
			{...props}
		/>
	);
}

function Icon({ name }: { name: LightboxIcon }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<path d={LIGHTBOX_ICONS[name]} />
		</svg>
	);
}

type ControlProps = {
	icon: LightboxIcon;
	label: string;
	className?: string;
	disabled?: boolean;
	pressed?: boolean;
	onClick?: () => void;
	slot?: string;
};

function Control({ icon, label, className, pressed, slot, ...props }: ControlProps) {
	const viewer = useLightbox();
	return (
		<Button
			variant="ghost"
			size="icon"
			data-slot={slot}
			aria-label={label}
			aria-pressed={pressed}
			title={label}
			className={cn(lightbox({ variant: viewer.variant }).control(), className)}
			{...props}
		>
			<Icon name={icon} />
		</Button>
	);
}

export function LightboxCounter({ className, ...props }: ComponentProps<"span">) {
	const viewer = useLightbox();
	return (
		<span
			data-slot="lightbox-counter"
			aria-live="polite"
			className={cn(lightbox({ variant: viewer.variant }).counter(), className)}
			{...props}
		>
			{viewer.count === 0 ? 0 : viewer.index + 1} of {viewer.count}
		</span>
	);
}

export function LightboxPrevious({ className }: { className?: string }) {
	const viewer = useLightbox();
	return (
		<Control
			slot="lightbox-previous"
			icon="previous"
			label="Previous picture"
			className={className}
			disabled={!viewer.loop && viewer.index <= 0}
			onClick={() => viewer.step(-1)}
		/>
	);
}

export function LightboxNext({ className }: { className?: string }) {
	const viewer = useLightbox();
	return (
		<Control
			slot="lightbox-next"
			icon="next"
			label="Next picture"
			className={className}
			disabled={!viewer.loop && viewer.index >= viewer.count - 1}
			onClick={() => viewer.step(1)}
		/>
	);
}

export function LightboxZoom({ className, ...props }: ComponentProps<"div">) {
	const viewer = useLightbox();
	const styles = lightbox({ variant: viewer.variant });
	return (
		// biome-ignore lint/a11y/useSemanticElements: a fieldset brings default borders and layout into the toolbar.
		<div
			data-slot="lightbox-zoom"
			role="group"
			aria-label="Zoom"
			className={cn("flex items-center gap-1", className)}
			{...props}
		>
			<Control
				icon="zoomOut"
				label="Zoom out"
				disabled={viewer.view.scale <= 1}
				onClick={() => viewer.zoomBy(1 / ZOOM_STEP)}
			/>
			<button
				type="button"
				aria-label="Fit to window"
				title="Fit to window"
				className={styles.zoomValue()}
				onClick={viewer.fit}
			>
				{viewer.percent}%
			</button>
			<Control
				icon="zoomIn"
				label="Zoom in"
				disabled={viewer.view.scale >= MAX_SCALE}
				onClick={() => viewer.zoomBy(ZOOM_STEP)}
			/>
			<Control
				icon="fit"
				label="Fit to window"
				disabled={viewer.view.scale === 1}
				onClick={viewer.fit}
			/>
			{viewer.actual ? (
				<Button
					variant="ghost"
					size="sm"
					className={styles.control()}
					onClick={viewer.showActual}
				>
					100%
				</Button>
			) : null}
		</div>
	);
}

export function LightboxDetailsToggle({ className }: { className?: string }) {
	const viewer = useLightbox();
	return (
		<Control
			slot="lightbox-details-toggle"
			icon="details"
			label={viewer.detailsOpen ? "Hide details" : "Show details"}
			pressed={viewer.detailsOpen}
			className={className}
			onClick={() => viewer.setDetailsOpen(!viewer.detailsOpen)}
		/>
	);
}

export function LightboxClose({ className }: { className?: string }) {
	const viewer = useLightbox();
	return (
		<DialogPrimitive.Close
			data-slot="lightbox-close"
			aria-label="Close"
			title="Close"
			className={cn(
				"grid size-9 place-items-center rounded-lg outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4",
				lightbox({ variant: viewer.variant }).control(),
				className,
			)}
		>
			<Icon name="close" />
		</DialogPrimitive.Close>
	);
}

export function LightboxBody({ className, ...props }: ComponentProps<"div">) {
	const viewer = useLightbox();
	return (
		<div
			data-slot="lightbox-body"
			className={cn(lightbox({ variant: viewer.variant }).body(), className)}
			{...props}
		/>
	);
}

export function LightboxStage({ className, ...props }: ComponentProps<"div">) {
	const viewer = useLightbox();
	const styles = lightbox({ variant: viewer.variant });
	const ref = useRef<HTMLDivElement>(null);
	const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);
	const [dragging, setDragging] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);
	const arrived = useRef(false);
	const lastIndex = useRef(viewer.index);
	const { image, index, images, view, setView, setStage } = viewer;
	const latest = useRef(viewer);
	latest.current = viewer;

	// The first picture flies out of its thumbnail; later ones slide in from the side they came from.
	useLayoutEffect(() => {
		const img = imgRef.current;
		if (!loaded || !img) return;
		if (!arrived.current) {
			arrived.current = true;
			const from = latest.current.thumbOrigin(latest.current.index);
			if (from) playMorph(img, from, "in");
		} else playSlide(img, latest.current.index >= lastIndex.current ? 1 : -1);
		lastIndex.current = latest.current.index;
	}, [loaded]);

	// Closing sends the fitted picture back into its thumbnail while the viewer fades.
	useLayoutEffect(() => {
		const img = imgRef.current;
		if (viewer.open || !img || !arrived.current || latest.current.view.scale > 1) return;
		const to = latest.current.thumbOrigin(latest.current.index);
		if (to) playMorph(img, to, "out");
	}, [viewer.open]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: a new src is the trigger.
	useEffect(() => setLoaded(false), [image?.src]);

	// Wheel needs preventDefault, which React's passive root listener cannot give.
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const measure = () => setStage({ w: el.clientWidth, h: el.clientHeight });
		const observer = new ResizeObserver(measure);
		observer.observe(el);
		measure();
		const onWheel = (event: WheelEvent) => {
			event.preventDefault();
			const r = el.getBoundingClientRect();
			latest.current.zoomBy(wheelFactor(event.deltaY), {
				x: event.clientX - r.left - r.width / 2,
				y: event.clientY - r.top - r.height / 2,
			});
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => {
			observer.disconnect();
			el.removeEventListener("wheel", onWheel);
		};
	}, [setStage]);

	// Warm the neighbours so stepping never shows an empty frame.
	useEffect(() => {
		for (const delta of [-1, 1]) {
			const next = images[index + delta];
			if (next) new Image().src = next.src;
		}
	}, [images, index]);

	function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
		if (view.scale <= 1) return;
		event.currentTarget.setPointerCapture(event.pointerId);
		drag.current = { x: event.clientX, y: event.clientY, vx: view.x, vy: view.y };
		setDragging(true);
	}
	function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
		const start = drag.current;
		if (!start) return;
		setView({
			scale: view.scale,
			x: start.vx + event.clientX - start.x,
			y: start.vy + event.clientY - start.y,
		});
	}
	function endDrag() {
		drag.current = null;
		setDragging(false);
	}
	function onDoubleClick(event: ReactMouseEvent<HTMLDivElement>) {
		if (view.scale > 1) return viewer.fit();
		const r = event.currentTarget.getBoundingClientRect();
		viewer.zoomBy(2.5, {
			x: event.clientX - r.left - r.width / 2,
			y: event.clientY - r.top - r.height / 2,
		});
	}

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: pointer zoom and pan; the toolbar and keys do the same.
		<div
			ref={ref}
			data-slot="lightbox-stage"
			data-zoomed={view.scale > 1 ? "" : undefined}
			className={cn(
				styles.stage(),
				view.scale > 1 && (dragging ? "cursor-grabbing" : "cursor-grab"),
				className,
			)}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={endDrag}
			onPointerCancel={endDrag}
			onDoubleClick={onDoubleClick}
			{...props}
		>
			{image ? (
				<img
					ref={imgRef}
					key={image.src}
					src={image.src}
					alt={image.alt}
					draggable={false}
					data-loaded={loaded ? "" : undefined}
					data-dragging={dragging ? "" : undefined}
					onLoad={(event) => {
						const el = event.currentTarget;
						viewer.setNatural({ w: el.naturalWidth, h: el.naturalHeight });
						setLoaded(true);
					}}
					style={{
						width: viewer.base.w || undefined,
						height: viewer.base.h || undefined,
						transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
					}}
					className={styles.image()}
				/>
			) : null}
		</div>
	);
}

export function LightboxDetails({
	className,
	children,
	...props
}: ComponentProps<"aside">) {
	const viewer = useLightbox();
	const styles = lightbox({
		variant: viewer.variant,
		panel: viewer.detailsOpen ? "open" : "closed",
	});
	return (
		<div className={styles.detailsWrap()} inert={!viewer.detailsOpen}>
			<aside
				data-slot="lightbox-details"
				className={cn(styles.details(), className)}
				{...props}
			>
				{children}
			</aside>
		</div>
	);
}

export function LightboxFilmstrip({ className, ...props }: ComponentProps<"div">) {
	const viewer = useLightbox();
	const styles = lightbox({ variant: viewer.variant });
	const active = useRef<HTMLButtonElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: scrolls when the picture changes.
	useEffect(() => {
		const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
		active.current?.scrollIntoView({
			inline: "center",
			block: "nearest",
			behavior: reduced ? "auto" : "smooth",
		});
	}, [viewer.index]);

	return (
		<div
			data-slot="lightbox-filmstrip"
			role="tablist"
			aria-label="Pictures"
			className={cn(styles.filmstrip(), className)}
			{...props}
		>
			{viewer.images.map((item, i) => (
				<button
					key={item.src}
					ref={i === viewer.index ? active : undefined}
					type="button"
					role="tab"
					aria-selected={i === viewer.index}
					aria-label={`Picture ${i + 1}: ${item.alt}`}
					className={lightbox({
						variant: viewer.variant,
						active: i === viewer.index,
					}).thumb()}
					style={{
						aspectRatio: item.width && item.height ? item.width / item.height : 4 / 3,
					}}
					onClick={() => viewer.setIndex(i)}
				>
					<img
						src={item.thumbnail ?? item.src}
						alt=""
						draggable={false}
						className="size-full object-cover"
					/>
				</button>
			))}
		</div>
	);
}

export const LightboxTitle = DialogPrimitive.Title;

/** A thumbnail map shown while zoomed in: the lit rectangle is the visible part, and it can be dragged. */
export function LightboxMinimap({ className }: { className?: string }) {
	const viewer = useLightbox();
	const styles = lightbox({ variant: viewer.variant });
	const { image, view, base, stage, setView } = viewer;
	const ref = useRef<HTMLDivElement>(null);
	const zoomed = view.scale > 1 && !!image;
	const rect = viewportRect(view, base, stage);
	const ratio = base.w > 0 && base.h > 0 ? base.w / base.h : 1;

	function pan(event: ReactPointerEvent<HTMLDivElement>) {
		const box = ref.current?.getBoundingClientRect();
		if (!box || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
		const fx = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
		const fy = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height));
		setView(viewForCentre(view, base, fx, fy));
	}

	return (
		<div
			ref={ref}
			data-slot="lightbox-minimap"
			data-hidden={zoomed ? undefined : ""}
			aria-hidden
			className={cn(styles.minimap(), className)}
			style={{ aspectRatio: ratio, height: "5rem" }}
			onPointerDown={(event) => {
				event.currentTarget.setPointerCapture(event.pointerId);
				pan(event);
			}}
			onPointerMove={pan}
		>
			{image ? (
				<img
					src={image.thumbnail ?? image.src}
					alt=""
					draggable={false}
					className="size-full object-cover"
				/>
			) : null}
			<span
				className={styles.minimapRect()}
				style={{
					left: `${rect.left * 100}%`,
					top: `${rect.top * 100}%`,
					width: `${rect.width * 100}%`,
					height: `${rect.height * 100}%`,
				}}
			/>
		</div>
	);
}
