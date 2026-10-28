"use client";

import {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarImage,
	Button,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function AvatarDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Avatar>>(props);
	const pImage = controlProps<ComponentProps<typeof AvatarImage>>(props);
	const name = typeof props.name === "string" ? props.name : "Kanak Kholwal";
	const initials = name
		.trim()
		.split(/\s+/)
		.map((word) => word[0] ?? "")
		.slice(0, 2)
		.join("")
		.toUpperCase();
	const [team, setTeam] = useState(3);
	return (
		<div className="grid justify-items-start gap-5">
			<div className="flex items-center gap-3">
				<Avatar size={p.size ?? "default"} shape={p.shape ?? "circle"}>
					<AvatarFallback>{initials}</AvatarFallback>
					<AvatarImage
						src={pImage.src || "https://github.com/kanakkholwal.png"}
						alt={name}
					/>
					<AvatarBadge className="bg-success" aria-label="Online" />
				</Avatar>
				<div className="text-sm">
					<p className="font-medium text-foreground">{name}</p>
					<p className="text-muted-foreground text-xs">
						Fallback shows until an image loads
					</p>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<AvatarGroup aria-label="Team">
					{TEAM.slice(0, team).map((member) => (
						<Avatar key={member} size={p.size ?? "default"} shape={p.shape ?? "circle"}>
							<AvatarFallback>{member}</AvatarFallback>
						</Avatar>
					))}
					<AvatarGroupCount size={p.size ?? "default"} shape={p.shape ?? "circle"}>
						+{12 - team}
					</AvatarGroupCount>
				</AvatarGroup>
				<Button
					variant="outline"
					size="sm"
					onClick={() => setTeam(team === TEAM.length ? 2 : team + 1)}
				>
					{team === TEAM.length ? "Reset" : "Add member"}
				</Button>
			</div>
		</div>
	);
}

const TEAM = ["AP", "MW", "PN", "JB", "LO"];
