"use client";

import {
	SidebarNav,
	type SidebarNavItem,
	type SidebarNavSize,
	type SidebarRecent,
} from "@baby-ui/react";
import { useEffect, useState } from "react";

type Props = Record<string, unknown>;

function HomeIcon() {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4.5">
			<path
				d="M2.5 7.5 8 3l5.5 4.5V13a1 1 0 0 1-1 1h-3v-4H6.5v4h-3a1 1 0 0 1-1-1z"
				stroke="currentColor"
				strokeWidth="1.4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function UserAddIcon() {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4.5">
			<circle cx="6.5" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
			<path
				d="M1.5 14v-.5a5 5 0 0 1 5-5h0M12 5v4M10 7h4"
				stroke="currentColor"
				strokeWidth="1.4"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function EditIcon() {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4.5">
			<path
				d="M11 2 14 5 6 13H3v-3z"
				stroke="currentColor"
				strokeWidth="1.4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function LogoIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
			<path d="M12 22a10 10 0 0 1 10-10A10 10 0 0 1 12 2 10 10 0 0 1 2 12a10 10 0 0 1 10 10z" />
		</svg>
	);
}

const NAV_ITEMS: SidebarNavItem[] = [
	{ key: "home", label: "Home", icon: <HomeIcon /> },
	{ key: "invite", label: "Invite users", icon: <UserAddIcon />, count: "3/10" },
];

const RECENTS: SidebarRecent[] = [
	{ id: "onboarding", label: "Onboarding checklist" },
	{ id: "roadmap", label: "Q3 roadmap review" },
	{ id: "bug", label: "Fix the export bug" },
	{ id: "standup", label: "Standup notes" },
];

export function SidebarNavDemo({ props }: { props: Props }) {
	const [collapsed, setCollapsed] = useState(props.collapsed === true);

	useEffect(() => setCollapsed(props.collapsed === true), [props.collapsed]);

	return (
		<SidebarNav
			workspace={{
				name: "Acme Studio",
				monogram: "A",
				image: "https://avatar.vercel.sh/acme-studio?size=48",
			}}
			logo={<LogoIcon />}
			navItems={NAV_ITEMS}
			recents={RECENTS}
			newChatIcon={<EditIcon />}
			workspaceActions={[
				{ label: "Workspace settings" },
				{ label: "Invite team members" },
			]}
			onSignOut={() => {}}
			size={(props.size as SidebarNavSize) ?? "md"}
			collapsed={collapsed}
			onCollapsedChange={setCollapsed}
			fill
			className="max-h-[420px]"
		/>
	);
}
