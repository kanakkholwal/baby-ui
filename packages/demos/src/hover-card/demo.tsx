"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function HoverCardDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof HoverCard>>(props);
	const pContent = controlProps<ComponentProps<typeof HoverCardContent>>(props);
	return (
		<HoverCard
			openDelay={Number(p.openDelay ?? 300)}
			closeDelay={Number(p.closeDelay ?? 150)}
		>
			<HoverCardTrigger>
				<button
					type="button"
					className="font-medium text-foreground text-sm underline underline-offset-4"
				>
					@kanakkholwal
				</button>
			</HoverCardTrigger>
			<HoverCardContent side={pContent.side ?? "bottom"}>
				<div className="flex items-start gap-3">
					<Avatar size="sm">
						<AvatarFallback>KK</AvatarFallback>
						<AvatarImage src="https://github.com/kanakkholwal.png" alt="Kanak Kholwal" />
					</Avatar>
					<div>
						<p className="font-medium text-foreground">Kanak Kholwal</p>
						<p className="mt-1 text-muted-foreground text-xs">
							Building docvia and this registry. Move the pointer onto this card: it stays
							open.
						</p>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
