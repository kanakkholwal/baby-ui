"use client";

import { SidebarNav, type SidebarNavItem, type SidebarRecent } from "@baby-ui/react";

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
		<svg
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.3"
			strokeLinejoin="round"
			aria-hidden
			className="size-4.5"
		>
			<path d="M8 1l1.6 4.8L14.4 7.4l-4.8 1.6L8 13.8l-1.6-4.8L1.6 7.4l4.8-1.6z" />
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
	return (
		<SidebarNav
			workspace={{ name: "Acme Studio", monogram: "A" }}
			logo={<LogoIcon />}
			navItems={NAV_ITEMS}
			recents={RECENTS}
			newChatIcon={<EditIcon />}
			workspaceActions={[
				{ label: "Workspace settings" },
				{ label: "Invite team members" },
			]}
			onSignOut={() => {}}
			defaultCollapsed={Boolean(props.defaultCollapsed)}
			fill
			className="max-h-[420px]"
		/>
	);
}
