<script lang="ts">
import {
	HeroSection,
	HeroSectionAction,
	HeroSectionActions,
	HeroSectionAnnouncement,
	HeroSectionContent,
	HeroSectionDescription,
	HeroSectionLogos,
	HeroSectionMedia,
	type HeroSectionMediaVariant,
	HeroSectionTitle,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { HERO_SECTION as copy } from "../data/hero-section";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const variant = $derived(
	controlProps<ComponentProps<typeof HeroSection>>(props).variant ?? "centered",
);
const media = $derived(controlProps<{ media?: HeroSectionMediaVariant }>(props).media);
</script>

<HeroSection {variant}>
	<HeroSectionContent>
		<HeroSectionAnnouncement href={copy.announcement.href} label={copy.announcement.label}>
			{copy.announcement.text}
		</HeroSectionAnnouncement>
		<HeroSectionTitle>{copy.title}</HeroSectionTitle>
		<HeroSectionDescription>{copy.description}</HeroSectionDescription>
		<HeroSectionActions>
			{#each copy.actions as action, i (action.label)}
				<HeroSectionAction href={action.href} variant={i === 0 ? "default" : "ghost"}>
					{action.label}
				</HeroSectionAction>
			{/each}
		</HeroSectionActions>
		<HeroSectionLogos label={copy.logosLabel}>
			{#each copy.logos as logo (logo.name)}
				<img src={logo.logo} alt={logo.name} width="24" height="24" />
			{/each}
		</HeroSectionLogos>
	</HeroSectionContent>
	<HeroSectionMedia variant={media ?? "framed"}>
		<img src={copy.image.light} alt={copy.image.alt} width={copy.image.width} height={copy.image.height} class="dark:hidden" />
		<img src={copy.image.dark} alt={copy.image.alt} width={copy.image.width} height={copy.image.height} class="hidden dark:inline" />
	</HeroSectionMedia>
</HeroSection>
