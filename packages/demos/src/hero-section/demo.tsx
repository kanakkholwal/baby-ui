"use client";

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
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { HERO_SECTION as copy } from "../data/hero-section";
import { controlProps } from "../data/preview-props";

export function HeroSectionDemo({ props }: { props: Record<string, unknown> }) {
	const p = controlProps<ComponentProps<typeof HeroSection>>(props);
	const variant = p.variant ?? "centered";
	const media = controlProps<{ media?: HeroSectionMediaVariant }>(props).media;
	return (
		<HeroSection variant={variant}>
			<HeroSectionContent>
				<HeroSectionAnnouncement
					href={copy.announcement.href}
					label={copy.announcement.label}
				>
					{copy.announcement.text}
				</HeroSectionAnnouncement>
				<HeroSectionTitle>{copy.title}</HeroSectionTitle>
				<HeroSectionDescription>{copy.description}</HeroSectionDescription>
				<HeroSectionActions>
					{copy.actions.map((action, i) => (
						<HeroSectionAction
							key={action.label}
							href={action.href}
							variant={i === 0 ? "default" : "ghost"}
						>
							{action.label}
						</HeroSectionAction>
					))}
				</HeroSectionActions>
				<HeroSectionLogos label={copy.logosLabel}>
					{copy.logos.map((logo) => (
						<img key={logo.name} src={logo.logo} alt={logo.name} width={24} height={24} />
					))}
				</HeroSectionLogos>
			</HeroSectionContent>
			<HeroSectionMedia variant={media ?? "framed"}>
				<img
					src={copy.image.light}
					alt={copy.image.alt}
					width={copy.image.width}
					height={copy.image.height}
					className="dark:hidden"
				/>
				<img
					src={copy.image.dark}
					alt={copy.image.alt}
					width={copy.image.width}
					height={copy.image.height}
					className="hidden dark:inline"
				/>
			</HeroSectionMedia>
		</HeroSection>
	);
}
