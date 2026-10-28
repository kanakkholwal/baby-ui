"use client";

import { Badge } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const SERVICES = [
	{ name: "image-resizer", tone: "warning", state: "Degraded" },
	{ name: "legacy-billing", tone: "destructive", state: "Down" },
] as const;

export function BadgeDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Badge>>(props);
	const size = p.size ?? "default";
	return (
		<div className="flex w-full max-w-72 flex-col gap-3 text-sm">
			<div className="flex items-center justify-between gap-4">
				<span className="text-muted-foreground">api-gateway</span>
				<Badge variant={p.variant ?? "success"} size={size} dot={p.dot !== false}>
					Healthy
				</Badge>
			</div>
			{SERVICES.map((service) => (
				<div key={service.name} className="flex items-center justify-between gap-4">
					<span className="text-muted-foreground">{service.name}</span>
					<Badge variant={service.tone} dot>
						{service.state}
					</Badge>
				</div>
			))}
		</div>
	);
}
