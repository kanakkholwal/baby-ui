"use client";

import { Toggle } from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";
import { TOGGLE_BOOKMARK } from "../data/toggle";

type Props = Record<string, unknown>;

export function ToggleDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Toggle>>(props);
	const [pressed, setPressed] = useState(false);
	useEffect(() => setPressed(Boolean(props.pressed)), [props.pressed]);

	return (
		<Toggle
			pressed={pressed}
			onPressedChange={setPressed}
			variant={p.variant ?? "default"}
			size={p.size ?? "default"}
			disabled={p.disabled ?? false}
		>
			{/* The outline fills once pressed, so the state reads from the glyph as well as the fill. */}
			<svg
				viewBox="0 0 16 16"
				fill="none"
				aria-hidden
				className="size-4 fill-transparent transition-[fill] duration-(--duration-fast) in-aria-pressed:fill-current"
			>
				<path
					d={TOGGLE_BOOKMARK.path}
					stroke="currentColor"
					strokeWidth="1.4"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			{TOGGLE_BOOKMARK.label}
		</Toggle>
	);
}
