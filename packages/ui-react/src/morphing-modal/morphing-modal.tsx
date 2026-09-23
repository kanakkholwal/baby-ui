"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { invert, MORPH_EASE, MORPH_MS, type MorphSpring } from "./use-morph";

export interface MorphingModalProps {
	trigger: ReactNode;
	children: ReactNode;
	title: string;
	className?: string;
	spring?: MorphSpring;
	dismissOnBackdrop?: boolean;
	backdropBlur?: number;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

const reduced = () =>
	typeof matchMedia === "function" &&
	matchMedia("(prefers-reduced-motion: reduce)").matches;

export function MorphingModal({
	trigger,
	children,
	title,
	className,
	spring = "gentle",
	dismissOnBackdrop = true,
	backdropBlur = 8,
	open: openProp,
	defaultOpen = false,
	onOpenChange,
}: MorphingModalProps) {
	const triggerRef = useRef<HTMLButtonElement>(null);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const [hidden, setHidden] = useState(false);
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const isOpen = openProp ?? internalOpen;
	const wasOpen = useRef(false);
	const titleId = useId();

	async function animateMorph(reverse: boolean) {
		const from = triggerRef.current?.getBoundingClientRect();
		const to = panelRef.current?.getBoundingClientRect();
		if (!from || !to || !panelRef.current || reduced()) return;

		const collapsed = invert(from, to);
		const frames = reverse
			? [
					{ transform: "none", opacity: 1 },
					{ transform: collapsed, opacity: 0 },
				]
			: [
					{ transform: collapsed, opacity: 0 },
					{ transform: "none", opacity: 1 },
				];

		// Closing is faster: the user has already decided.
		await panelRef.current.animate(frames, {
			duration: MORPH_MS[spring] * (reverse ? 0.7 : 1),
			easing: MORPH_EASE[spring],
			fill: "both",
		}).finished;
	}

	async function runOpen() {
		dialogRef.current?.showModal();
		setHidden(true);
		await animateMorph(false);
	}

	async function runClose() {
		await animateMorph(true);
		setHidden(false);
		dialogRef.current?.close();
		triggerRef.current?.focus();
	}

	// Drives the native dialog + FLIP animation from resolved open state, so a
	// controlled `open` prop and the internal trigger/close click both funnel here.
	useEffect(() => {
		if (isOpen === wasOpen.current) return;
		wasOpen.current = isOpen;
		if (isOpen) void runOpen();
		else void runClose();
	}, [isOpen]);

	function setOpen(next: boolean) {
		if (openProp === undefined) setInternalOpen(next);
		onOpenChange?.(next);
	}

	return (
		<>
			<button
				ref={triggerRef}
				type="button"
				onClick={() => setOpen(true)}
				style={{ opacity: hidden ? 0 : 1 }}
				className="cursor-pointer rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				{trigger}
			</button>

			{/* biome-ignore lint/a11y/useKeyWithClickEvents: Escape closes the dialog natively */}
			<dialog
				ref={dialogRef}
				aria-labelledby={titleId}
				onCancel={(e) => {
					e.preventDefault();
					setOpen(false);
				}}
				onClick={(e) => {
					if (dismissOnBackdrop && e.target === dialogRef.current) setOpen(false);
				}}
				style={{ ["--morph-blur" as string]: `${backdropBlur}px` }}
				className="morph-dialog m-auto bg-transparent p-0 text-foreground backdrop:bg-black/40"
			>
				<div
					ref={panelRef}
					className={cn(
						"w-[min(32rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-2xl",
						className,
					)}
				>
					<div className="flex items-start justify-between gap-4">
						<h2 id={titleId} className="font-medium text-foreground text-lg">
							{title}
						</h2>
						<button
							type="button"
							onClick={() => setOpen(false)}
							aria-label="Close"
							className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
						>
							<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
								<path
									d="m4 4 8 8M12 4l-8 8"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
						</button>
					</div>
					<div className="mt-3 text-muted-foreground text-sm">{children}</div>
				</div>
			</dialog>
		</>
	);
}
