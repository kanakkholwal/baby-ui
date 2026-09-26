import {
	GradientHero01,
	type GradientHero01Size,
	type GradientHero01Tone,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function GradientHero01Demo({ props }: { props: Props }) {
	return (
		<GradientHero01
			badge="Previewing baby ui blocks"
			headline="Launch pages that feel finished from the first pass"
			description="Simple sections with considered spacing, quiet motion, and production ready code you can paste into real product work."
			actions={[
				{ label: "Explore blocks", href: "/components/blocks" },
				{ label: "View source", href: "https://github.com/kanakkholwal/baby-ui" },
			]}
			tone={(props.tone as GradientHero01Tone) ?? "chart"}
			size={(props.size as GradientHero01Size) ?? "screen"}
		/>
	);
}
