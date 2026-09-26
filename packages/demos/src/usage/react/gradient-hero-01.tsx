import { GradientHero01 } from "@baby-ui/react";

export function Example() {
	return (
		<GradientHero01
			badge="New in 2.0"
			headline="Ship the page, not the scaffolding"
			description="Sections that look finished on the first pass."
			actions={[
				{ label: "Get started", href: "/docs" },
				{ label: "Pricing", href: "/pricing" },
			]}
		/>
	);
}
