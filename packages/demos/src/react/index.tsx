import type { ButtonSize, ButtonVariant, DockSpring } from "@baby-ui/react";
import { Button, Dock, DockItem, DockSeparator } from "@baby-ui/react";
import { useState } from "react";

type Props = Record<string, unknown>;

const ICONS = [
	{
		id: "home",
		label: "Home",
		d: "M3 9.5 10 4l7 5.5V16a1 1 0 0 1-1 1h-3v-4H7v4H4a1 1 0 0 1-1-1z",
	},
	{
		id: "search",
		label: "Search",
		d: "M9 15A6 6 0 1 0 9 3a6 6 0 0 0 0 12zm4.5-1.5L17 17",
	},
	{
		id: "files",
		label: "Files",
		d: "M3 6a1 1 0 0 1 1-1h3.6l1.4 2H16a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z",
	},
	{
		id: "settings",
		label: "Settings",
		d: "M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM10 2v2M10 16v2M2 10h2M16 10h2",
	},
];

function ButtonDemo({ props }: { props: Props }) {
	const size = (props.size as ButtonSize) ?? "md";
	return (
		<Button
			variant={(props.variant as ButtonVariant) ?? "default"}
			size={size}
			href={(props.href as string) || undefined}
			loading={Boolean(props.loading)}
			loadingLabel={(props.loadingLabel as string) || "Loading…"}
			disabled={Boolean(props.disabled)}
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

function DockDemo({ props }: { props: Props }) {
	const [active, setActive] = useState("home");
	return (
		<Dock
			size={Number(props.size ?? 44)}
			magnification={Number(props.magnification ?? 72)}
			distance={Number(props.distance ?? 140)}
			spring={(props.spring as DockSpring) ?? "gentle"}
		>
			{ICONS.map((icon) => (
				<DockItem
					key={icon.id}
					active={active === icon.id}
					onClick={() => setActive(icon.id)}
					aria-label={icon.label}
					className="hover:bg-accent/60"
				>
					<svg
						viewBox="0 0 20 20"
						fill="none"
						aria-hidden
						className="size-[45%] text-foreground/80"
					>
						<path
							d={icon.d}
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</DockItem>
			))}
			<DockSeparator />
			<DockItem aria-label="Profile" className="hover:bg-accent/60">
				<span className="grid size-[55%] place-items-center rounded-full bg-primary/15 text-[0.7em] font-medium">
					KK
				</span>
			</DockItem>
		</Dock>
	);
}

export const demos: Record<string, (p: { props: Props }) => React.ReactElement> = {
	button: ButtonDemo,
	dock: DockDemo,
};
