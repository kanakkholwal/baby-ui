"use client";

import {
	type MotionValue,
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
	useTransform,
} from "motion/react";
import type { ReactNode } from "react";
import { createContext, useContext, useRef } from "react";
import { cn } from "../lib/cn.js";

export type DockSpring = "snappy" | "gentle" | "bouncy";

const SPRING: Record<DockSpring, { duration: number; bounce: number }> = {
	snappy: { duration: 0.3, bounce: 0 },
	gentle: { duration: 0.5, bounce: 0.1 },
	bouncy: { duration: 0.6, bounce: 0.3 },
};

const PILL =
	"pointer-events-none absolute inset-[3px] -z-10 rounded-[inherit] bg-primary/10 transition-[opacity,filter] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none data-[on=false]:opacity-0 data-[on=false]:blur-[3px]";

type Ctx = {
	mouseX: MotionValue<number>;
	size: number;
	magnification: number;
	distance: number;
	spring: DockSpring;
};

const DockContext = createContext<Ctx | null>(null);

export interface DockProps {
	children: ReactNode;
	className?: string;
	size?: number;
	magnification?: number;
	distance?: number;
	spring?: DockSpring;
	"aria-label"?: string;
}

export function Dock({
	children,
	className,
	size = 44,
	magnification = 72,
	distance = 140,
	spring = "gentle",
	"aria-label": ariaLabel = "Dock",
}: DockProps) {
	const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

	return (
		<DockContext.Provider value={{ mouseX, size, magnification, distance, spring }}>
			{/* biome-ignore lint/a11y/useSemanticElements: <fieldset> is for form controls, not a dock */}
			<div
				role="group"
				aria-label={ariaLabel}
				onPointerMove={(e) => e.pointerType === "mouse" && mouseX.set(e.clientX)}
				onPointerLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
				style={{ height: magnification + 16 }}
				className={cn(
					"mx-auto flex w-max items-end gap-2 rounded-2xl border border-border bg-card/80 px-3 pb-2 shadow-2xl backdrop-blur-xl",
					className,
				)}
			>
				{children}
			</div>
		</DockContext.Provider>
	);
}

export interface DockItemProps {
	children: ReactNode;
	className?: string;
	active?: boolean;
	onClick?: () => void;
	"aria-label"?: string;
}

export function DockItem({
	children,
	className,
	active = false,
	onClick,
	...rest
}: DockItemProps) {
	const ctx = useContext(DockContext);
	if (!ctx) throw new Error("<DockItem> must be rendered inside a <Dock>");

	const reduce = useReducedMotion();
	const ref = useRef<HTMLDivElement>(null);

	const offset = useTransform(ctx.mouseX, (x) => {
		const rect = ref.current?.getBoundingClientRect();
		if (!rect) return Number.POSITIVE_INFINITY;
		return x - rect.x - rect.width / 2;
	});
	const target = useTransform(
		offset,
		[-ctx.distance, 0, ctx.distance],
		[ctx.size, ctx.magnification, ctx.size],
		{ clamp: true },
	);
	const width = useSpring(target, SPRING[ctx.spring]);

	const body = (
		<>
			<span className={PILL} data-on={active} />
			{children}
		</>
	);
	const shared = cn(
		"relative flex aspect-square shrink-0 items-center justify-center rounded-xl text-foreground",
		className,
	);

	return (
		<motion.div
			ref={ref}
			style={reduce ? { width: ctx.size, height: ctx.size } : { width, height: width }}
			className={onClick ? undefined : shared}
		>
			{onClick ? (
				<button
					type="button"
					onClick={onClick}
					aria-label={rest["aria-label"]}
					aria-pressed={active}
					className={cn(
						shared,
						"size-full cursor-pointer border-0 bg-transparent p-0",
						"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
					)}
				>
					{body}
				</button>
			) : (
				body
			)}
		</motion.div>
	);
}

export function DockSeparator({ className }: { className?: string }) {
	return (
		<span aria-hidden className={cn("mx-1 h-8 w-px self-center bg-border", className)} />
	);
}
