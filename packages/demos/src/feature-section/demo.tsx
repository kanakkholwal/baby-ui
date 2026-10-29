"use client";

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
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { FEATURE_SECTION as copy } from "../data/feature-section";
import { controlProps } from "../data/preview-props";

export function FeatureSectionDemo({ props }: { props: Record<string, unknown> }) {
	const variant =
		controlProps<ComponentProps<typeof FeatureSection>>(props).variant ?? "cards";
	const split = variant === "split";
	const features = split ? copy.features.slice(0, 4) : copy.features;
	return (
		<FeatureSection variant={variant}>
			<FeatureSectionHeader>
				<FeatureSectionEyebrow>{copy.eyebrow}</FeatureSectionEyebrow>
				<FeatureSectionTitle>{copy.title}</FeatureSectionTitle>
				<FeatureSectionDescription>{copy.description}</FeatureSectionDescription>
			</FeatureSectionHeader>
			<FeatureSectionList>
				{features.map((feature) => (
					<FeatureSectionItem key={feature.title}>
						<FeatureSectionIcon>
							<svg
								aria-hidden
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d={feature.icon} />
							</svg>
						</FeatureSectionIcon>
						<FeatureSectionItemTitle>{feature.title}</FeatureSectionItemTitle>
						<FeatureSectionItemDescription>
							{feature.description}
						</FeatureSectionItemDescription>
					</FeatureSectionItem>
				))}
			</FeatureSectionList>
			{split ? (
				<FeatureSectionMedia>
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
				</FeatureSectionMedia>
			) : null}
		</FeatureSection>
	);
}
