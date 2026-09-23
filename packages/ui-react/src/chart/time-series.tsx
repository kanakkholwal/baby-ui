"use client";

import { extent } from "d3-array";
import { type ScaleLinear, type ScaleTime, scaleLinear, scaleTime } from "d3-scale";
import {
	createContext,
	type KeyboardEvent,
	type PointerEvent,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { cn } from "../lib/cn";
import { useChart } from "./chart";
import {
	type ActivePoint,
	type ChartPhase,
	type ChartStatus,
	type Datum,
	DEFAULT_MARGIN,
	type Domain,
	LOADING_DOMAIN,
	lerpDomain,
	type Margin,
	nearestIndex,
	nextPhase,
	resolveDomain,
	type SeriesConfig,
	shouldTweenDomain,
	summarize,
	toDate,
} from "./core";
import { CHART_DURATION, type Playback, tween } from "./motion";
import { chart } from "./variants";

/** Room around the reveal clip so round caps and dots at the plot edge are not cut. */
const CLIP_PAD = 8;

export interface PlotContextValue {
	data: Datum[];
	xKey: string;
	width: number;
	height: number;
	innerWidth: number;
	innerHeight: number;
	margin: Margin;
	xScale: ScaleTime<number, number>;
	yScale: ScaleLinear<number, number>;
	x: (datum: Datum) => number;
	labels: string[];
	series: SeriesConfig[];
	register: (series: SeriesConfig) => () => void;
	phase: ChartPhase;
	animate: boolean;
	clipId: string;
	plotEl: HTMLDivElement | null;
}

export interface ActiveContextValue {
	active: ActivePoint | null;
	/** True when the last move came from the keyboard, so followers jump instead of springing. */
	instant: boolean;
}

const PlotContext = createContext<PlotContextValue | null>(null);
const ActiveContext = createContext<ActiveContextValue>({ active: null, instant: false });

export function usePlot(): PlotContextValue {
	const context = useContext(PlotContext);
	if (!context)
		throw new Error("Chart parts must be rendered inside a chart such as <LineChart />");
	return context;
}

export const useActivePoint = () => useContext(ActiveContext);
export const ActivePointProvider = ActiveContext.Provider;

export interface TimeSeriesChartProps {
	data: Datum[];
	/** Key holding each row's date. */
	xKey?: string;
	/** Header of the date column in the screen-reader table. */
	xLabel?: string;
	margin?: Partial<Margin>;
	status?: ChartStatus;
	animate?: boolean;
	activeIndex?: number | null;
	defaultActiveIndex?: number | null;
	onActiveIndexChange?: (index: number | null) => void;
	className?: string;
	children?: ReactNode;
}

export function TimeSeriesChart({
	data,
	xKey = "date",
	xLabel = "Date",
	margin: marginProp,
	status = "ready",
	animate = true,
	activeIndex: activeIndexProp,
	defaultActiveIndex = null,
	onActiveIndexChange,
	roleDescription,
	className,
	children,
}: TimeSeriesChartProps & { roleDescription: string }) {
	const chartContext = useChart();
	const { format, hidden, config } = chartContext;
	const plotRef = useRef<HTMLDivElement>(null);
	const [plotEl, setPlotEl] = useState<HTMLDivElement | null>(null);
	const [size, setSize] = useState({ width: 0, height: 0 });
	const uid = useId().replace(/:/g, "");
	const clipId = `${uid}-reveal`;

	useLayoutEffect(() => {
		const el = plotRef.current;
		if (!el) return;
		setPlotEl(el);
		const measure = () =>
			setSize({ width: Math.floor(el.clientWidth), height: Math.floor(el.clientHeight) });
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const { top = DEFAULT_MARGIN.top, right = DEFAULT_MARGIN.right } = marginProp ?? {};
	const { bottom = DEFAULT_MARGIN.bottom, left = DEFAULT_MARGIN.left } = marginProp ?? {};
	const margin = useMemo(
		() => ({ top, right, bottom, left }),
		[top, right, bottom, left],
	);
	const innerWidth = Math.max(0, size.width - margin.left - margin.right);
	const innerHeight = Math.max(0, size.height - margin.top - margin.bottom);

	const [registered, setRegistered] = useState<SeriesConfig[]>([]);
	const register = useCallback((next: SeriesConfig) => {
		setRegistered((prev) => {
			const index = prev.findIndex((s) => s.key === next.key);
			if (index === -1) return [...prev, next];
			if (prev[index]?.color === next.color) return prev;
			return prev.map((s, i) => (i === index ? next : s));
		});
		return () => setRegistered((prev) => prev.filter((s) => s.key !== next.key));
	}, []);
	const series = useMemo(
		() => registered.filter((s) => !hidden.has(s.key)),
		[registered, hidden],
	);
	const seriesKeys = series.map((s) => s.key).join("|");

	const target = useMemo(
		() =>
			resolveDomain(
				data,
				series.map((s) => s.key),
			),
		[data, seriesKeys],
	);

	const [phase, setPhase] = useState<ChartPhase>(() =>
		status === "loading" ? "loading" : animate ? "revealing" : "ready",
	);
	const advance = useCallback(
		(event: "status-ready" | "status-loading" | "done") =>
			setPhase((current) => nextPhase(current, event) ?? current),
		[],
	);
	const prevStatus = useRef(status);
	useEffect(() => {
		if (prevStatus.current === status) return;
		prevStatus.current = status;
		advance(status === "ready" ? "status-ready" : "status-loading");
	}, [status, advance]);

	const [domain, setDomain] = useState<Domain>(() =>
		status === "loading" ? LOADING_DOMAIN : target,
	);
	const domainRef = useRef(domain);
	const domainTween = useRef<Playback | null>(null);
	const moveDomain = useCallback(
		(to: Domain, onDone?: () => void) => {
			domainTween.current?.stop();
			const from = domainRef.current;
			const apply = (next: Domain) => {
				domainRef.current = next;
				setDomain(next);
			};
			if (!animate || !shouldTweenDomain(from, to)) {
				apply(to);
				onDone?.();
				return;
			}
			domainTween.current = tween({
				duration: CHART_DURATION.update,
				onUpdate: (p) => apply(lerpDomain(from, to, p)),
				onComplete: onDone,
			});
		},
		[animate],
	);
	useEffect(() => () => domainTween.current?.stop(), []);

	useEffect(() => {
		if (phase === "gridTweenReady") moveDomain(target, () => advance("done"));
		else if (phase === "gridTweenLoading")
			moveDomain(LOADING_DOMAIN, () => advance("done"));
		// Only the phase change starts a lifecycle tween; target changes are handled below.
	}, [phase]);

	useEffect(() => {
		if (phase === "ready") moveDomain(target);
		else if (phase === "revealing") {
			domainTween.current?.stop();
			domainRef.current = target;
			setDomain(target);
		}
	}, [target]);

	const clipRef = useRef<SVGRectElement>(null);
	const hasSize = innerWidth > 0;
	const widthRef = useRef(innerWidth);
	widthRef.current = innerWidth;
	useLayoutEffect(() => {
		if ((phase !== "revealing" && phase !== "concealing") || !hasSize) return;
		const rect = clipRef.current;
		if (!rect) return;
		const full = widthRef.current + CLIP_PAD * 2;
		const reveal = phase === "revealing";
		const draw = (p: number) => {
			const width = reveal ? full * p : full * (1 - p);
			rect.setAttribute("width", String(width));
			rect.setAttribute("x", String(reveal ? -CLIP_PAD : -CLIP_PAD + full - width));
		};
		draw(0);
		const playback = tween({
			duration: animate ? CHART_DURATION.enter : 0,
			onUpdate: draw,
			onComplete: () => advance("done"),
		});
		return () => playback.stop();
	}, [phase, hasSize, animate, advance]);

	const xScale = useMemo(() => {
		const [min = 0, max = min] = extent(data, (d) => toDate(d[xKey]).getTime());
		return scaleTime().domain([min, max]).range([0, innerWidth]);
	}, [data, xKey, innerWidth]);
	const yScale = useMemo(
		() => scaleLinear().domain(domain).range([innerHeight, 0]),
		[domain, innerHeight],
	);
	const x = useCallback((d: Datum) => xScale(toDate(d[xKey])), [xScale, xKey]);
	const labels = useMemo(
		() => data.map((d) => format.tick(toDate(d[xKey]))),
		[data, xKey, format],
	);

	const [internalActive, setInternalActive] = useState<number | null>(defaultActiveIndex);
	const activeIndex = activeIndexProp !== undefined ? activeIndexProp : internalActive;
	const [instant, setInstant] = useState(false);
	const setActive = useCallback(
		(index: number | null, fromKeyboard: boolean) => {
			setInstant(fromKeyboard);
			if (activeIndexProp === undefined) setInternalActive(index);
			onActiveIndexChange?.(index);
		},
		[activeIndexProp, onActiveIndexChange],
	);
	const interactive = phase === "ready" && data.length > 0;

	const pending = useRef<{ index: number; frame: number } | null>(null);
	const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
		if (!interactive) return;
		const bounds = event.currentTarget.getBoundingClientRect();
		const time = xScale.invert(event.clientX - bounds.left - margin.left).getTime();
		const index = nearestIndex(data, xKey, time);
		if (pending.current) {
			pending.current.index = index;
			return;
		}
		const frame = requestAnimationFrame(() => {
			const next = pending.current?.index ?? index;
			pending.current = null;
			if (next !== activeIndex) setActive(next, false);
		});
		pending.current = { index, frame };
	};
	const onPointerLeave = () => {
		if (pending.current) cancelAnimationFrame(pending.current.frame);
		pending.current = null;
		if (activeIndex !== null) setActive(null, false);
	};

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (!interactive) return;
		const last = data.length - 1;
		const step = Math.max(1, Math.ceil(data.length / 10));
		const current = activeIndex;
		let next: number | null;
		switch (event.key) {
			case "ArrowRight":
				next = current === null ? 0 : Math.min(last, current + 1);
				break;
			case "ArrowLeft":
				next = current === null ? last : Math.max(0, current - 1);
				break;
			case "PageDown":
				next = Math.min(last, (current ?? -1) + step);
				break;
			case "PageUp":
				next = Math.max(0, (current ?? last + 1) - step);
				break;
			case "Home":
				next = 0;
				break;
			case "End":
				next = last;
				break;
			case "Escape":
				if (current === null) return;
				next = null;
				break;
			default:
				return;
		}
		event.preventDefault();
		setActive(next, true);
	};

	const active = useMemo<ActivePoint | null>(() => {
		if (activeIndex === null || !interactive) return null;
		const datum = data[activeIndex];
		if (!datum) return null;
		const y: Record<string, number> = {};
		for (const s of series) {
			const value = datum[s.key];
			if (typeof value === "number") y[s.key] = yScale(value);
		}
		return { index: activeIndex, datum, x: x(datum), y };
	}, [activeIndex, interactive, data, series, yScale, x]);

	const seriesLabel = (key: string) => {
		const label = config[key]?.label;
		return typeof label === "string" ? label : key;
	};
	const announcement =
		active && instant
			? `${format.title(toDate(active.datum[xKey]))}: ${series
					.map((s) => {
						const value = active.datum[s.key];
						return `${seriesLabel(s.key)} ${typeof value === "number" ? format.number(value) : ""}`;
					})
					.join(", ")}`
			: "";
	const summary =
		chartContext.description ??
		summarize({
			data,
			xKey,
			series: series.map((s) => ({ key: s.key, label: seriesLabel(s.key) })),
			format,
		});

	const plot = useMemo<PlotContextValue>(
		() => ({
			data,
			xKey,
			width: size.width,
			height: size.height,
			innerWidth,
			innerHeight,
			margin,
			xScale,
			yScale,
			x,
			labels,
			series,
			register,
			phase,
			animate,
			clipId,
			plotEl,
		}),
		[
			data,
			xKey,
			size,
			innerWidth,
			innerHeight,
			margin,
			xScale,
			yScale,
			x,
			labels,
			series,
			register,
			phase,
			animate,
			clipId,
			plotEl,
		],
	);
	const activeValue = useMemo(() => ({ active, instant }), [active, instant]);
	const clipFull = innerWidth + CLIP_PAD * 2;
	const clipWidth =
		phase === "ready"
			? clipFull
			: phase === "revealing" || phase === "concealing"
				? undefined
				: 0;
	const styles = chart();

	return (
		<PlotContext.Provider value={plot}>
			<ActiveContext.Provider value={activeValue}>
				{/* biome-ignore lint/a11y/useSemanticElements: a fieldset is for form controls; this is a chart widget */}
				<div
					ref={plotRef}
					data-slot="chart-plot"
					data-phase={phase}
					role="group"
					aria-roledescription={roleDescription}
					aria-labelledby={`${uid}-title`}
					aria-describedby={`${uid}-summary`}
					// biome-ignore lint/a11y/noNoninteractiveTabindex: the plot is a keyboard-navigable widget
					tabIndex={0}
					onKeyDown={onKeyDown}
					onBlur={() => activeIndex !== null && instant && setActive(null, true)}
					className={cn(styles.plot(), className)}
				>
					<span id={`${uid}-title`} className={styles.srOnly()}>
						{chartContext.title}
					</span>
					{size.width > 0 && size.height > 0 ? (
						<svg
							aria-hidden="true"
							width={size.width}
							height={size.height}
							className="absolute inset-0 block overflow-visible"
							style={{ cursor: interactive ? "crosshair" : undefined }}
							onPointerMove={onPointerMove}
							onPointerLeave={onPointerLeave}
						>
							<defs>
								<clipPath id={clipId}>
									<rect
										ref={clipRef}
										x={-CLIP_PAD}
										y={-CLIP_PAD}
										width={clipWidth}
										height={innerHeight + CLIP_PAD * 2}
									/>
								</clipPath>
							</defs>
							<g transform={`translate(${margin.left},${margin.top})`}>
								<rect width={innerWidth} height={innerHeight} fill="transparent" />
								{children}
							</g>
						</svg>
					) : null}
					<p id={`${uid}-summary`} className={styles.srOnly()}>
						{summary}
					</p>
					<table className={styles.srOnly()}>
						<caption>{chartContext.title}</caption>
						<thead>
							<tr>
								<th scope="col">{xLabel}</th>
								{series.map((s) => (
									<th key={s.key} scope="col">
										{seriesLabel(s.key)}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.map((datum, index) => (
								<tr key={index}>
									<th scope="row">{format.title(toDate(datum[xKey]))}</th>
									{series.map((s) => {
										const value = datum[s.key];
										return (
											<td key={s.key}>
												{typeof value === "number" ? format.number(value) : ""}
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
					<div aria-live="polite" className={styles.srOnly()}>
						{announcement}
					</div>
				</div>
			</ActiveContext.Provider>
		</PlotContext.Provider>
	);
}
