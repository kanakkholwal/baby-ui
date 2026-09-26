<script lang="ts">
import {
	CaseStudyFlipStack,
	type CaseStudyFlipStackSize,
	type CaseStudyFlipStackTone,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const ITEMS = [
	{
		eyebrow: "Fintech",
		title: "Boosted conversion by 42% with a product-led redesign",
		description:
			"We restructured onboarding and clarified the value proposition, turning more visitors into active users.",
		image: "https://picsum.photos/id/1011/900/700",
		imageAlt: "Person paddling a canoe on a lake",
	},
	{
		eyebrow: "Hospitality",
		title: "A slower digital experience for a faster-growing retreat",
		description:
			"A cinematic booking journey brings the landscape forward and simplifies room selection.",
		image: "https://picsum.photos/id/1018/900/700",
		imageAlt: "Mountain valley under a clear sky",
	},
	{
		eyebrow: "Culture",
		title: "Turning a living archive into something you can wander",
		description:
			"Bold editorial type and an intuitive collection system make decades of work feel immediate.",
		image: "https://picsum.photos/id/1040/900/700",
		imageAlt: "Castle on a hill above a town",
	},
	{
		eyebrow: "Climate",
		title: "Making complex energy data clear enough to act on",
		description:
			"An approachable visual system turns live infrastructure data into useful decisions.",
		image: "https://picsum.photos/id/1044/900/700",
		imageAlt: "Rocky coastline at sunset",
	},
];
</script>

<CaseStudyFlipStack
	items={ITEMS}
	tone={(props.tone as CaseStudyFlipStackTone) ?? "card"}
	size={(props.size as CaseStudyFlipStackSize) ?? "md"}
	hint={(props.hint as string) ?? "Scroll down"}
	heading={(props.heading as string) ?? "Design that delivers."}
	endLabel={(props.endLabel as string) ?? "The end"}
/>
