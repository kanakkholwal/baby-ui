"use client";

import {
	Children,
	type ComponentProps,
	type CSSProperties,
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
	useSyncExternalStore,
} from "react";
import { Button } from "../../button/react/button";
import { cn } from "../../lib/cn";
import { createCarouselTrack } from "../track";
import {
	CAROUSEL_LABELS,
	type CarouselLabels,
	type CarouselProjection,
	type CarouselSize,
	type CarouselVariant,
	carousel,
} from "../variants";

export type { CarouselLabels, CarouselProjection, CarouselSize, CarouselVariant };

export interface CarouselProps {
	/** Names the carousel for assistive technology, e.g. "From the Harbour suites". */
	label: string;
	/** `CarouselContent` with its slides, plus any controls. */
	children: ReactNode;
	/** Controlled active slide; pair with `onIndexChange`. */
	index?: number;
	defaultIndex?: number;
	onIndexChange?: (index: number) => void;
	/** Projects slides as a linear row or onto the inside/outside of a cylinder. */
	projection?: CarouselProjection;
	/** Approximate number of slides visible across a cylindrical projection. */
	visibleItems?: number;
	/** Scale at the cylinder's farthest point. */
	minScale?: number;
	/** Vertical curve depth in pixels; responsive when omitted. */
	arc?: number;
	/** Plain full-width slide, scaled neighbours (`peek`), a flat row, controls over the slide, or large media. */
	variant?: CarouselVariant;
	/** Scales controls and thumbnails; sets slide width for the peeking variants. */
	size?: CarouselSize;
	/** Arrows and keys wrap from the last slide to the first. */
	loop?: boolean;
	/** Width of one slide as a CSS length; `cqw` is a share of the carousel width. */
	slideSize?: string;
	/** Names each slide and its indicator. Defaults to "2 of 5". */
	slideLabel?: (index: number, count: number) => string;
	/** Overrides for the built-in control labels. */
	labels?: Partial<CarouselLabels>;
	/** Milliseconds per slide while `autoplay` is on; rotation pauses on hover, focus and drag, and never runs under reduced motion. */
	interval?: number;
	/** Rotates every `interval` ms while true. Off by default, so motion begins with the viewer; toggle it from your own state. */
	autoplay?: boolean;
	className?: string;
}

type CarouselState = {
	s: ReturnType<typeof carousel>;
	id: string;
	index: number;
	startIndex: number;
	count: number;
	setCount: (count: number) => void;
	loop: boolean;
	go: (index: number) => void;
	step: (delta: number) => void;
	labels: CarouselLabels;
	slideLabel: (index: number, count: number) => string;
	setHovered: (hovered: boolean) => void;
	dragging: boolean;
	rootRef: React.RefObject<HTMLElement | null>;
	engine: React.RefObject<ReturnType<typeof createCarouselTrack> | null>;
	optionsRef: React.RefObject<Parameters<typeof createCarouselTrack>[4] | null>;
};
const CarouselCtx = createContext<CarouselState | null>(null);

function useCarousel() {
	const ctx = useContext(CarouselCtx);
	if (!ctx) throw new Error("Carousel parts must be inside <Carousel>");
	return ctx;
}

type SlideContext = { index: number; active: boolean; label: string; id: string };
const SlideCtx = createContext<SlideContext | null>(null);
const ThumbCtx = createContext<number | null>(null);

const defaultSlideLabel = (index: number, count: number) => `${index + 1} of ${count}`;
const subscribeNothing = () => () => {};
const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
	const query = matchMedia(reducedQuery);
	query.addEventListener("change", onChange);
	return () => query.removeEventListener("change", onChange);
};

/**
 * Slides browsed by drag, flick, trackpad swipe, arrow keys or the controls. Compose
 * `CarouselContent`, `CarouselItem` and any of `CarouselPrevious`, `CarouselNext`,
 * `CarouselDots` and `CarouselThumbs`.
 */
export function Carousel({
	label,
	children,
	index: controlledIndex,
	defaultIndex = 0,
	onIndexChange,
	projection = "linear",
	visibleItems = 5,
	minScale = 0.58,
	arc,
	variant = "default",
	size = "default",
	loop = false,
	slideSize,
	slideLabel = defaultSlideLabel,
	labels: labelsProp,
	interval,
	autoplay = false,
	className,
}: CarouselProps) {
	const id = useId();
	const [count, setCount] = useState(0);
	const last = Math.max(0, count - 1);
	const hydrated = useSyncExternalStore(
		subscribeNothing,
		() => true,
		() => false,
	);
	const reduced = useSyncExternalStore(
		subscribeReduced,
		() => matchMedia(reducedQuery).matches,
		() => false,
	);
	// Until the slides report in, the start index is kept as given.
	const clampIndex = (i: number) => Math.max(0, count ? Math.min(last, i) : i);
	const [ownIndex, setOwnIndex] = useState(defaultIndex);
	const index = clampIndex(controlledIndex ?? ownIndex);
	const [startIndex] = useState(controlledIndex ?? defaultIndex);
	const [hovered, setHovered] = useState(false);
	const [focusPaused, setFocusPaused] = useState(false);
	const [dragging, setDragging] = useState(false);
	const [inView, setInView] = useState(true);
	const [pageVisible, setPageVisible] = useState(true);
	const [announcement, setAnnouncement] = useState("");
	const rootRef = useRef<HTMLElement>(null);
	const engine = useRef<ReturnType<typeof createCarouselTrack> | null>(null);
	const latest = useRef({ controlledIndex, onIndexChange, slideLabel, count });
	latest.current = { controlledIndex, onIndexChange, slideLabel, count };

	const canRotate = Boolean(interval) && count > 1 && !(hydrated && reduced);
	const wraps = loop || projection !== "linear";
	const running =
		canRotate &&
		autoplay &&
		!hovered &&
		!focusPaused &&
		!dragging &&
		inView &&
		pageVisible;
	const options = {
		running,
		interval: interval ?? 0,
		onSelect: (next: number, announce: boolean) => {
			const { controlledIndex, onIndexChange, slideLabel, count } = latest.current;
			if (controlledIndex === undefined) setOwnIndex(next);
			onIndexChange?.(next);
			if (announce) setAnnouncement(slideLabel(next, count));
		},
		onDragChange: setDragging,
		flat: variant !== "peek",
		loop: wraps,
		projection,
		visibleItems,
		minScale,
		arc,
	};
	const optionsRef = useRef<typeof options>(options);
	optionsRef.current = options;

	useEffect(() => {
		engine.current?.update(options);
	});

	useEffect(() => {
		engine.current?.go(index);
	}, [index]);

	// Turning rotation off refills the active dot: the slide stays until the viewer moves on.
	useEffect(() => {
		if (!autoplay) engine.current?.resetDrain();
	}, [autoplay]);

	useEffect(() => {
		const root = rootRef.current;
		if (!interval || !root) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry) setInView(entry.isIntersecting);
		});
		observer.observe(root);
		const onVisibility = () => setPageVisible(document.visibilityState !== "hidden");
		document.addEventListener("visibilitychange", onVisibility);
		return () => {
			observer.disconnect();
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, [interval]);

	const go = (to: number) => engine.current?.go(to);
	// Arrows wrap with `loop`; otherwise they stop at either end.
	const step = (delta: number) => {
		const next = index + delta;
		if (wraps) go((next + count) % count);
		else if (next >= 0 && next <= last) go(next);
	};

	const s = carousel({ projection, variant, size });
	const labels = useMemo(() => ({ ...CAROUSEL_LABELS, ...labelsProp }), [labelsProp]);
	const rootStyle = {
		"--carousel-start": startIndex,
		...(slideSize ? { "--carousel-slide": slideSize } : {}),
	} as CSSProperties;
	const state: CarouselState = {
		s,
		id,
		index,
		startIndex,
		count,
		setCount: useCallback((next: number) => setCount(next), []),
		loop: wraps,
		go,
		step,
		labels,
		slideLabel,
		setHovered,
		dragging,
		rootRef,
		engine,
		optionsRef,
	};

	return (
		<CarouselCtx.Provider value={state}>
			<section
				ref={rootRef}
				data-slot="carousel"
				data-projection={projection}
				aria-roledescription="carousel"
				aria-label={label}
				className={cn(s.root(), className)}
				style={rootStyle}
				onFocus={(event) => setFocusPaused(event.target.matches(":focus-visible"))}
				onBlur={(event) => {
					if (!event.currentTarget.contains(event.relatedTarget as Node | null))
						setFocusPaused(false);
				}}
			>
				{children}
				<span className="sr-only" aria-live="polite" aria-atomic="true">
					{announcement}
				</span>
			</section>
		</CarouselCtx.Provider>
	);
}

/** The draggable viewport and track. Put one `CarouselItem` per slide inside. */
export function CarouselContent({
	className,
	children,
	...props
}: ComponentProps<"div">) {
	const ctx = useCarousel();
	const slides = Children.toArray(children);
	const viewportRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const { setCount, engine, optionsRef, rootRef } = ctx;
	const index = useRef(ctx.index);
	index.current = ctx.index;

	useEffect(() => {
		setCount(slides.length);
	}, [slides.length, setCount]);

	useEffect(() => {
		const root = rootRef.current;
		const viewport = viewportRef.current;
		const track = trackRef.current;
		const options = optionsRef.current;
		if (!root || !viewport || !track || !options) return;
		engine.current = createCarouselTrack(root, viewport, track, index.current, options);
		return () => {
			engine.current?.destroy();
			engine.current = null;
		};
	}, [engine, optionsRef, rootRef]);

	return (
		// biome-ignore lint/a11y/useSemanticElements: a fieldset would imply form controls; this groups slides.
		<div
			{...props}
			ref={viewportRef}
			data-slot="carousel-content"
			role="group"
			aria-label={ctx.labels.slides}
			// biome-ignore lint/a11y/noNoninteractiveTabindex: the slide group takes focus so arrow keys move the track.
			tabIndex={0}
			data-dragging={ctx.dragging || undefined}
			className={cn(ctx.s.content(), className)}
			onPointerEnter={(event) => {
				if (event.pointerType === "mouse") ctx.setHovered(true);
			}}
			onPointerLeave={() => ctx.setHovered(false)}
		>
			<div ref={trackRef} className={ctx.s.track()}>
				{slides.map((slide, i) => (
					<SlideCtx.Provider
						// biome-ignore lint/suspicious/noArrayIndexKey: slides are positional; their order is the identity.
						key={i}
						value={{
							index: i,
							active: i === ctx.index,
							label: ctx.slideLabel(i, ctx.count || slides.length),
							id: `${ctx.id}-slide-${i}`,
						}}
					>
						{slide}
					</SlideCtx.Provider>
				))}
			</div>
		</div>
	);
}

/** A slide; inert unless it is the active one, so focus never lands off-screen. */
export function CarouselItem({ className, children, ...props }: ComponentProps<"div">) {
	const slide = useContext(SlideCtx);
	const ctx = useCarousel();
	if (!slide) throw new Error("CarouselItem must be a child of CarouselContent");
	return (
		<div
			{...props}
			id={slide.id}
			data-slot="carousel-item"
			data-carousel-slide=""
			role="tabpanel"
			aria-roledescription="slide"
			aria-label={slide.label}
			inert={!slide.active}
			className={cn(ctx.s.slide(), className)}
		>
			{children}
		</div>
	);
}

function Chevron({ d }: { d: string }) {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden>
			<path
				d={d}
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

/** Steps back one slide; floats over the slide's start edge. */
export function CarouselPrevious({ className, ...props }: ComponentProps<"button">) {
	const ctx = useCarousel();
	if (ctx.count < 2) return null;
	return (
		<Button
			variant="ghost"
			size="icon-sm"
			data-slot="carousel-previous"
			aria-label={ctx.labels.previous}
			aria-disabled={!ctx.loop && ctx.index === 0}
			className={cn(ctx.s.control(), ctx.s.previous(), className)}
			onClick={() => ctx.step(-1)}
			{...props}
		>
			<Chevron d="M10 3.5 5.5 8l4.5 4.5" />
		</Button>
	);
}

/** Steps forward one slide; floats over the slide's end edge. */
export function CarouselNext({ className, ...props }: ComponentProps<"button">) {
	const ctx = useCarousel();
	if (ctx.count < 2) return null;
	return (
		<Button
			variant="ghost"
			size="icon-sm"
			data-slot="carousel-next"
			aria-label={ctx.labels.next}
			aria-disabled={!ctx.loop && ctx.index === ctx.count - 1}
			className={cn(ctx.s.control(), ctx.s.next(), className)}
			onClick={() => ctx.step(1)}
			{...props}
		>
			<Chevron d="m6 3.5 4.5 4.5L6 12.5" />
		</Button>
	);
}

/** One dot per slide; the active one stretches into a pill that travels with the track. */
export function CarouselDots({ className, ...props }: ComponentProps<"div">) {
	const ctx = useCarousel();
	const { s } = ctx;
	return (
		<div
			{...props}
			data-slot="carousel-dots"
			className={cn(s.tabs(), className)}
			role="tablist"
			aria-label={ctx.labels.chooseSlide}
		>
			{ctx.count > 1
				? Array.from({ length: ctx.count }, (_, i) => (
						<Button
							// biome-ignore lint/suspicious/noArrayIndexKey: one indicator per slide position.
							key={i}
							variant="ghost"
							size="icon-sm"
							role="tab"
							data-carousel-dot=""
							aria-selected={i === ctx.index}
							aria-controls={`${ctx.id}-slide-${i}`}
							aria-label={ctx.slideLabel(i, ctx.count)}
							tabIndex={i === ctx.index ? 0 : -1}
							className={s.tab()}
							style={{ "--emphasis": i === ctx.startIndex ? 1 : 0 } as CSSProperties}
							onClick={() => ctx.go(i)}
						>
							<span className={s.dot()} aria-hidden>
								<span className={s.dotFill()} />
								<span className={s.dotDrain()} />
							</span>
						</Button>
					))
				: null}
		</div>
	);
}

/** A row that groups controls under the slides, e.g. previous, dots, next. */
export function CarouselControls({ className, ...props }: ComponentProps<"div">) {
	const ctx = useCarousel();
	return (
		<div
			{...props}
			data-slot="carousel-controls"
			className={cn(ctx.s.controls(), className)}
		/>
	);
}

/** A strip of `CarouselThumb` buttons, one per slide; the active one scrolls into view. */
export function CarouselThumbs({ className, children, ...props }: ComponentProps<"div">) {
	const ctx = useCarousel();
	const ref = useRef<HTMLDivElement>(null);
	const reduced = useSyncExternalStore(
		subscribeReduced,
		() => matchMedia(reducedQuery).matches,
		() => false,
	);
	// Scrolls the strip itself, never the page, so mounting cannot move the viewport.
	// biome-ignore lint/correctness/useExhaustiveDependencies: runs when the active slide changes.
	useEffect(() => {
		const strip = ref.current;
		const active = strip?.querySelector<HTMLElement>("[aria-current=true]");
		if (!strip || !active) return;
		strip.scrollTo({
			left: active.offsetLeft - (strip.clientWidth - active.clientWidth) / 2,
			behavior: reduced ? "auto" : "smooth",
		});
	}, [ctx.index, reduced]);
	return (
		// biome-ignore lint/a11y/useSemanticElements: a fieldset would imply form controls; this groups thumbnail buttons.
		<div
			{...props}
			ref={ref}
			data-slot="carousel-thumbs"
			role="group"
			aria-label={ctx.labels.thumbnails}
			className={cn(ctx.s.thumbs(), className)}
		>
			{Children.toArray(children).map((thumb, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: thumbnails are positional, like the slides.
				<ThumbCtx.Provider key={i} value={i}>
					{thumb}
				</ThumbCtx.Provider>
			))}
		</div>
	);
}

/** A thumbnail button for one slide; put an image inside. */
export function CarouselThumb({
	className,
	children,
	...props
}: ComponentProps<"button">) {
	const ctx = useCarousel();
	const i = useContext(ThumbCtx);
	if (i === null) throw new Error("CarouselThumb must be a child of CarouselThumbs");
	return (
		<button
			type="button"
			{...props}
			data-slot="carousel-thumb"
			aria-current={i === ctx.index}
			aria-controls={`${ctx.id}-slide-${i}`}
			aria-label={ctx.slideLabel(i, ctx.count)}
			className={cn(ctx.s.thumb(), className)}
			onClick={() => ctx.go(i)}
		>
			{children}
		</button>
	);
}
