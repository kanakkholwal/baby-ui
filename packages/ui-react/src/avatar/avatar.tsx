"use client";

import type { ComponentProps } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { cn } from "../lib/cn";
import { type AvatarShape, type AvatarSize, avatar } from "./variants";

export type { AvatarShape, AvatarSize };

type Ctx = { loaded: boolean; setLoaded: (loaded: boolean) => void };

const AvatarCtx = createContext<Ctx | null>(null);

function useAvatar() {
	const ctx = useContext(AvatarCtx);
	if (!ctx) throw new Error("Avatar parts must be used inside <Avatar>");
	return ctx;
}

export function Avatar({
	className,
	size = "md",
	shape = "circle",
	children,
	...props
}: ComponentProps<"span"> & { size?: AvatarSize; shape?: AvatarShape }) {
	const [loaded, setLoaded] = useState(false);

	return (
		<AvatarCtx.Provider value={{ loaded, setLoaded }}>
			<span
				data-slot="avatar"
				className={cn(avatar({ size, shape }), className)}
				{...props}
			>
				{children}
			</span>
		</AvatarCtx.Provider>
	);
}

export function AvatarImage({
	className,
	src,
	alt = "",
	...props
}: ComponentProps<"img">) {
	const { loaded, setLoaded } = useAvatar();
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		setFailed(false);
		setLoaded(false);
	}, [setLoaded]);

	if (!src || failed) return null;

	return (
		<img
			data-slot="avatar-image"
			src={src}
			alt={alt}
			onLoad={() => setLoaded(true)}
			onError={() => setFailed(true)}
			style={{ opacity: loaded ? 1 : 0 }}
			className={cn(
				"absolute inset-0 size-full object-cover transition-opacity duration-200 ease-[var(--ease-out)] motion-reduce:transition-none",
				className,
			)}
			{...props}
		/>
	);
}

export function AvatarFallback({ className, ...props }: ComponentProps<"span">) {
	const { loaded } = useAvatar();

	return (
		<span
			aria-hidden={loaded || undefined}
			data-slot="avatar-fallback"
			className={cn("font-medium text-muted-foreground select-none", className)}
			{...props}
		/>
	);
}
