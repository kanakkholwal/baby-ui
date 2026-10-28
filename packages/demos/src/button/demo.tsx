"use client";

import { Button } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function ButtonDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Button>>(props);
	const size = p.size ?? "default";
	return (
		<Button
			variant={p.variant ?? "default"}
			size={size}
			href={p.href || undefined}
			loading={p.loading ?? false}
			loadingLabel={p.loadingLabel || "Loading…"}
		>
			{size === "icon" ? (
				<svg viewBox="0 0 16 16" fill="none" aria-hidden>
					<path
						d="M8 3.5v9M3.5 8h9"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
				</svg>
			) : (
				"Deploy project"
			)}
		</Button>
	);
}
