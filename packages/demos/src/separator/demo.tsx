"use client";

import { Separator } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function SeparatorDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Separator>>(props);
	const variant = p.variant ?? "solid";
	return (
		<div className="w-full max-w-sm">
			<div className="flex flex-col gap-1">
				<p className="font-medium text-sm">Baby UI</p>
				<p className="text-muted-foreground text-sm">Components for React and Svelte.</p>
			</div>
			<Separator variant={variant} className="my-4" />
			<div className="flex h-5 items-center gap-4 text-sm">
				<span>Docs</span>
				<Separator variant={variant} orientation="vertical" />
				<span>Components</span>
				<Separator variant={variant} orientation="vertical" />
				<span>Changelog</span>
			</div>
		</div>
	);
}
