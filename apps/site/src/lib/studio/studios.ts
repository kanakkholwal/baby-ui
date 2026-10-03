import type { Icon } from "@baby-ui/icons";
import { IconBackground, IconChartBar } from "@baby-ui/icons";

/** A studio listed on /studio; more join this list as they ship. */
export type Studio = {
	slug: string;
	name: string;
	description: string;
	href: string;
	icon: Icon;
	/** What the /studio card shows live: a component filling it, or a framed demo. */
	preview: { kind: "component" | "demo"; slug: string };
};

export const STUDIOS: Studio[] = [
	{
		slug: "background",
		name: "Background studio",
		description:
			"Tune any animated background, see it behind real content at hero, card and phone sizes, then copy the code.",
		href: "/studio/background",
		icon: IconBackground,
		preview: { kind: "component", slug: "aurora-flow" },
	},
	{
		slug: "chart",
		name: "Chart studio",
		description:
			"Every chart in the kit: edit or paste data for eight of them, tune every option on all, and copy the code.",
		href: "/studio/chart",
		icon: IconChartBar,
		preview: { kind: "demo", slug: "area-chart" },
	},
];
