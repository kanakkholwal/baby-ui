"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

/** OG cards are a fixed 1200x630 canvas; the frame scales that canvas to whatever width it gets. */
export function OgFrame({ children }: { children: ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(1200);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new ResizeObserver(([entry]) => {
			if (entry) setWidth(entry.contentRect.width);
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className="relative aspect-[1200/630] w-full max-w-3xl overflow-hidden rounded-xl border border-border shadow-sm"
		>
			<div
				className="absolute top-0 left-0 origin-top-left"
				style={{ transform: `scale(${width / 1200})` }}
			>
				{children}
			</div>
		</div>
	);
}
