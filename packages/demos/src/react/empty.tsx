"use client";

import {
	Button,
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { EMPTY_SCENES, isEmptyScene } from "../data/empty";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function EmptyDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Empty>>(props);
	const media = controlProps<ComponentProps<typeof EmptyMedia>>(props);
	const scene = EMPTY_SCENES[isEmptyScene(props.scene) ? props.scene : "search"];
	return (
		<Empty
			variant={p.variant ?? "outline"}
			layout={p.layout ?? "vertical"}
			size={p.size ?? "md"}
			className="max-w-xl"
		>
			<EmptyHeader>
				<EmptyMedia variant="icon" tone={media.tone ?? scene.tone}>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden
					>
						<path d={scene.icon} />
					</svg>
				</EmptyMedia>
				<EmptyTitle>{scene.title}</EmptyTitle>
				<EmptyDescription>{scene.description}</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button size="sm" variant={scene.tone === "primary" ? "default" : "outline"}>
					{scene.action}
				</Button>
			</EmptyContent>
		</Empty>
	);
}
