<script lang="ts">
import {
	FeatureSection,
	FeatureSectionDescription,
	FeatureSectionEyebrow,
	FeatureSectionHeader,
	FeatureSectionIcon,
	FeatureSectionItem,
	FeatureSectionItemDescription,
	FeatureSectionItemTitle,
	FeatureSectionList,
	FeatureSectionMedia,
	FeatureSectionTitle,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { FEATURE_SECTION as copy } from "../data/feature-section";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const variant = $derived(
	controlProps<ComponentProps<typeof FeatureSection>>(props).variant ?? "cards",
);
const split = $derived(variant === "split");
const features = $derived(split ? copy.features.slice(0, 4) : copy.features);
</script>

<FeatureSection {variant}>
	<FeatureSectionHeader>
		<FeatureSectionEyebrow>{copy.eyebrow}</FeatureSectionEyebrow>
		<FeatureSectionTitle>{copy.title}</FeatureSectionTitle>
		<FeatureSectionDescription>{copy.description}</FeatureSectionDescription>
	</FeatureSectionHeader>
	<FeatureSectionList>
		{#each features as feature (feature.title)}
			<FeatureSectionItem>
				<FeatureSectionIcon>
					<svg
						aria-hidden="true"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d={feature.icon} />
					</svg>
				</FeatureSectionIcon>
				<FeatureSectionItemTitle>{feature.title}</FeatureSectionItemTitle>
				<FeatureSectionItemDescription>{feature.description}</FeatureSectionItemDescription>
			</FeatureSectionItem>
		{/each}
	</FeatureSectionList>
	{#if split}
		<FeatureSectionMedia>
			<img src={copy.image.light} alt={copy.image.alt} width={copy.image.width} height={copy.image.height} class="dark:hidden" />
			<img src={copy.image.dark} alt={copy.image.alt} width={copy.image.width} height={copy.image.height} class="hidden dark:inline" />
		</FeatureSectionMedia>
	{/if}
</FeatureSection>
