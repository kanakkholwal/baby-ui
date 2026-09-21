"use client";

import type { ComponentProps, KeyboardEvent } from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { cn } from "../lib/cn";

export type TabsVariant =
	| "pill"
	| "underline"
	| "segment"
	| "soft"
	| "outline"
	| "enclosed";
export type TabsSize = "sm" | "md" | "lg" | "xl";

const LIST: Record<TabsVariant, string> = {
	pill: "gap-1 rounded-full bg-card p-1",
	segment: "gap-0.5 rounded-lg bg-card p-0.5",
	underline: "gap-1 border-border border-b",
	soft: "gap-1",
	outline: "gap-1",
	enclosed: "gap-1 border-border border-b",
};

const TRIGGER: Record<TabsSize, string> = {
	sm: "h-7 px-2.5 text-xs",
	md: "h-8 px-3.5 text-sm",
	lg: "h-10 px-4 text-sm",
	xl: "h-12 px-5 text-base",
};

const RADIUS: Record<TabsVariant, string> = {
	pill: "rounded-full",
	segment: "rounded-md",
	underline: "rounded-md",
	soft: "rounded-lg",
	outline: "rounded-lg",
	enclosed: "rounded-t-lg",
};

// The sliding marker, measured from the active trigger.
const INDICATOR: Record<TabsVariant, string> = {
	pill: "top-1 bottom-1 rounded-full bg-primary",
	segment: "top-0.5 bottom-0.5 rounded-md border border-border bg-background shadow-sm",
	underline: "-bottom-px h-0.5 rounded-full bg-primary",
	soft: "inset-y-0 rounded-lg bg-foreground/[0.06]",
	outline: "inset-y-0 rounded-lg border border-border",
	enclosed:
		"-bottom-px top-0 rounded-t-lg border border-border border-b-background bg-background",
};

// Active label colour per variant; pill sits on the primary fill, the rest on a surface.
const ACTIVE: Record<TabsVariant, string> = {
	pill: "aria-selected:text-primary-foreground",
	segment: "aria-selected:text-foreground",
	underline: "aria-selected:text-foreground",
	soft: "aria-selected:text-foreground",
	outline: "aria-selected:text-foreground",
	enclosed: "aria-selected:text-foreground",
};

const ARROW =
	"absolute inset-y-0 z-20 inline-flex w-9 items-center justify-center text-foreground transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-0";

type Ctx = {
	value: string;
	variant: TabsVariant;
	size: TabsSize;
	setValue: (value: string) => void;
};

const TabsCtx = createContext<Ctx | null>(null);

function useTabs() {
	const ctx = useContext(TabsCtx);
	if (!ctx) throw new Error("Tabs parts must be used inside <Tabs>");
	return ctx;
}

export function Tabs({
	className,
	value: valueProp,
	defaultValue = "",
	variant = "pill",
	size = "md",
	onValueChange,
	children,
	...props
}: Omit<ComponentProps<"div">, "onChange"> & {
	value?: string;
	defaultValue?: string;
	variant?: TabsVariant;
	size?: TabsSize;
	onValueChange?: (value: string) => void;
}) {
	const [internal, setInternal] = useState(defaultValue);
	const value = valueProp ?? internal;

	const setValue = useCallback(
		(next: string) => {
			if (valueProp === undefined) setInternal(next);
			onValueChange?.(next);
		},
		[valueProp, onValueChange],
	);

	const ctx = useMemo(
		() => ({ value, variant, size, setValue }),
		[value, variant, size, setValue],
	);

	return (
		<TabsCtx.Provider value={ctx}>
			<div data-slot="tabs" className={cn("flex flex-col", className)} {...props}>
				{children}
			</div>
		</TabsCtx.Provider>
	);
}

export function TabsList({ className, children, ...props }: ComponentProps<"div">) {
	const tabs = useTabs();
	const root = useRef<HTMLDivElement>(null);
	const viewport = useRef<HTMLDivElement>(null);
	const list = useRef<HTMLDivElement>(null);
	const [rects, setRects] = useState<Record<string, { left: number; width: number }>>({});
	const [edges, setEdges] = useState({ overflow: false, left: false, right: false });

	const measure = useCallback(() => {
		if (!list.current || !viewport.current || !root.current) return;
		const next: Record<string, { left: number; width: number }> = {};
		for (const el of list.current.querySelectorAll<HTMLElement>("[data-tab]")) {
			const id = el.dataset.tab;
			if (id) next[id] = { left: el.offsetLeft, width: el.offsetWidth };
		}
		setRects(next);

		// Overlay arrows sit above the viewport, so they never shrink its scroll range.
		const port = viewport.current;
		const max = Math.max(0, port.scrollWidth - port.clientWidth);
		const from = Math.max(0, Math.min(max, Math.abs(port.scrollLeft)));
		setEdges({
			overflow: port.scrollWidth > root.current.clientWidth + 1,
			left: from > 1,
			right: from < max - 1,
		});
	}, []);

	useLayoutEffect(() => {
		measure();
	}, [measure]);

	useEffect(() => {
		const port = viewport.current;
		if (!root.current || !port || !list.current) return;
		const observer = new ResizeObserver(measure);
		observer.observe(root.current);
		observer.observe(list.current);
		port.addEventListener("scroll", measure, { passive: true });
		return () => {
			observer.disconnect();
			port.removeEventListener("scroll", measure);
		};
	}, [measure]);

	const indicator = rects[tabs.value] ?? { left: 0, width: 0 };

	/** Keep the selected tab clear of the arrows that overlay the faded edges. */
	useEffect(() => {
		const el = list.current?.querySelector<HTMLElement>(
			`[data-tab="${CSS.escape(tabs.value)}"]`,
		);
		const port = viewport.current;
		if (!el || !port || !edges.overflow) return;
		const frame = port.getBoundingClientRect();
		const item = el.getBoundingClientRect();
		const left = frame.left + (edges.left ? 36 : 0);
		const right = frame.right - (edges.right ? 36 : 0);
		const delta =
			item.left < left ? item.left - left : item.right > right ? item.right - right : 0;
		if (delta) port.scrollBy({ left: delta, behavior: "smooth" });
	}, [tabs.value, edges]);

	const mask = edges.overflow
		? `linear-gradient(to right, ${edges.left ? "transparent, black 40px" : "black, black 0"}, ${
				edges.right ? "black calc(100% - 40px), transparent" : "black 100%"
			})`
		: undefined;

	function ids() {
		return [...(list.current?.querySelectorAll<HTMLElement>("[data-tab]") ?? [])].map(
			(el) => el.dataset.tab ?? "",
		);
	}

	function move(delta: number) {
		const all = ids();
		const i = all.indexOf(tabs.value);
		const next = all[(i + delta + all.length) % all.length];
		if (next) tabs.setValue(next);
	}

	function onKeyDown(event: KeyboardEvent) {
		const all = ids();
		if (event.key === "ArrowRight") {
			event.preventDefault();
			move(1);
		} else if (event.key === "ArrowLeft") {
			event.preventDefault();
			move(-1);
		} else if (event.key === "Home") {
			event.preventDefault();
			if (all[0]) tabs.setValue(all[0]);
		} else if (event.key === "End") {
			event.preventDefault();
			const last = all[all.length - 1];
			if (last) tabs.setValue(last);
		}
	}

	function scroll(direction: number) {
		const port = viewport.current;
		if (port)
			port.scrollBy({ left: direction * port.clientWidth * 0.8, behavior: "smooth" });
	}

	return (
		<div
			ref={root}
			className={cn(
				"relative isolate flex w-full min-w-0 max-w-full items-center",
				edges.overflow && tabs.variant === "pill" && "rounded-full bg-card",
				edges.overflow && tabs.variant === "segment" && "rounded-lg bg-card",
			)}
		>
			{edges.overflow ? (
				<button
					type="button"
					aria-label="Scroll tabs left"
					disabled={!edges.left}
					onClick={() => scroll(-1)}
					className={cn(ARROW, "left-0 rounded-l-full")}
				>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
						<path
							d="M10 3.5 5.5 8l4.5 4.5"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			) : null}

			<div
				ref={viewport}
				style={{ maskImage: mask, WebkitMaskImage: mask }}
				className={cn(
					"scrollbar-none w-full min-w-0 overflow-x-auto",
					edges.overflow && "[border-radius:inherit]",
				)}
			>
				<div
					ref={list}
					role="tablist"
					data-slot="tabs-list"
					onKeyDown={onKeyDown}
					className={cn(
						"relative inline-flex w-max items-center",
						LIST[tabs.variant],
						className,
					)}
					{...props}
				>
					<span
						aria-hidden
						style={{
							transform: `translateX(${indicator.left}px)`,
							width: indicator.width,
						}}
						className={cn(
							"pointer-events-none absolute left-0 transition-[transform,scale,translate,width] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
							INDICATOR[tabs.variant],
						)}
					/>
					{children}
				</div>
			</div>

			{edges.overflow ? (
				<button
					type="button"
					aria-label="Scroll tabs right"
					disabled={!edges.right}
					onClick={() => scroll(1)}
					className={cn(ARROW, "right-0 rounded-r-full")}
				>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
						<path
							d="M6 3.5 10.5 8 6 12.5"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			) : null}
		</div>
	);
}

export function TabsTrigger({
	className,
	value,
	children,
	...props
}: ComponentProps<"button"> & { value: string }) {
	const tabs = useTabs();
	const active = tabs.value === value;

	return (
		<button
			type="button"
			role="tab"
			data-slot="tabs-trigger"
			data-tab={value}
			data-state={active ? "active" : "inactive"}
			id={`tab-${value}`}
			aria-selected={active}
			aria-controls={`panel-${value}`}
			tabIndex={active ? 0 : -1}
			onClick={() => tabs.setValue(value)}
			className={cn(
				"relative z-10 inline-flex shrink-0 items-center justify-center whitespace-nowrap font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
				ACTIVE[tabs.variant],
				RADIUS[tabs.variant],
				TRIGGER[tabs.size],
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}

export function TabsContent({
	className,
	value,
	...props
}: ComponentProps<"div"> & { value: string }) {
	const tabs = useTabs();
	const active = tabs.value === value;

	// Inactive panels stay in the DOM so their content is still findable and crawlable.
	return (
		<div
			id={`panel-${value}`}
			role="tabpanel"
			data-slot="tabs-content"
			data-state={active ? "active" : "inactive"}
			aria-labelledby={`tab-${value}`}
			hidden={!active}
			className={cn("mt-4", className)}
			{...props}
		/>
	);
}
