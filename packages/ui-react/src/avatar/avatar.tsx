"use client";

import { useEffect, useState } from "react";
import { cn } from "../lib/cn";

export interface AvatarProps {
	name: string;
	src?: string;
	className?: string;
	size?: "sm" | "md" | "lg" | "xl";
	shape?: "circle" | "square";
}

const SIZE = {
	sm: "size-8 text-xs",
	md: "size-10 text-sm",
	lg: "size-14 text-base",
	xl: "size-20 text-xl",
};

function initialsOf(name: string) {
	const words = name.trim().split(/\s+/);
	const first = words[0]?.[0] ?? "";
	const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? "") : "";
	return (first + last).toUpperCase();
}

export function Avatar({
	name,
	src,
	className,
	size = "md",
	shape = "circle",
}: AvatarProps) {
	const [failed, setFailed] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setFailed(false);
		setLoaded(false);
	}, []);

	return (
		<span
			className={cn(
				"relative inline-grid shrink-0 select-none place-items-center overflow-hidden bg-card font-medium text-muted-foreground",
				shape === "circle" ? "rounded-full" : "rounded-lg",
				SIZE[size],
				className,
			)}
		>
			<span aria-hidden>{initialsOf(name)}</span>
			{src && !failed ? (
				<img
					src={src}
					alt={name}
					onLoad={() => setLoaded(true)}
					onError={() => setFailed(true)}
					style={{ opacity: loaded ? 1 : 0 }}
					className="absolute inset-0 size-full object-cover transition-opacity duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
				/>
			) : null}
		</span>
	);
}
