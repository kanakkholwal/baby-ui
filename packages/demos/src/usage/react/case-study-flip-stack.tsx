"use client";

import { CaseStudyFlipStack } from "@baby-ui/react";

const items = [
	{
		eyebrow: "Fintech",
		title: "Conversion up 42%",
		description: "A product-led onboarding redesign.",
		image: "https://picsum.photos/id/1011/900/700",
		imageAlt: "Canoe on a lake",
	},
	{
		eyebrow: "Hospitality",
		title: "A slower booking journey",
		description: "The landscape comes first.",
		image: "https://picsum.photos/id/1018/900/700",
		imageAlt: "Mountain valley",
	},
];

export function Example() {
	return <CaseStudyFlipStack items={items} heading="Selected work" />;
}
