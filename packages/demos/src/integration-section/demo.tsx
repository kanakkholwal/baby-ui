"use client";

import {
	IntegrationSection,
	IntegrationSectionDescription,
	IntegrationSectionHeader,
	IntegrationSectionItem,
	IntegrationSectionItemDescription,
	IntegrationSectionItemLink,
	IntegrationSectionItemLogo,
	IntegrationSectionItemName,
	IntegrationSectionList,
	IntegrationSectionTitle,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import {
	INTEGRATION_SECTION as copy,
	INTEGRATION_MARK,
} from "../data/integration-section";
import { controlProps } from "../data/preview-props";

export function IntegrationSectionDemo({ props }: { props: Record<string, unknown> }) {
	const variant =
		controlProps<ComponentProps<typeof IntegrationSection>>(props).variant ?? "grid";
	return (
		<IntegrationSection variant={variant}>
			<IntegrationSectionHeader>
				<IntegrationSectionTitle>{copy.title}</IntegrationSectionTitle>
				<IntegrationSectionDescription>{copy.description}</IntegrationSectionDescription>
			</IntegrationSectionHeader>
			<IntegrationSectionList>
				{copy.items.map((item) => (
					<IntegrationSectionItem key={item.name} featured={item.featured}>
						<IntegrationSectionItemLogo>
							{item.logo ? (
								<img src={item.logo} alt="" width={32} height={32} />
							) : (
								<svg
									aria-hidden
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.6"
									strokeLinejoin="round"
								>
									<path d={INTEGRATION_MARK} />
								</svg>
							)}
						</IntegrationSectionItemLogo>
						<IntegrationSectionItemName>{item.name}</IntegrationSectionItemName>
						<IntegrationSectionItemDescription>
							{item.description}
						</IntegrationSectionItemDescription>
						<IntegrationSectionItemLink
							href={item.href}
							aria-label={`${copy.link} about ${item.name}`}
						>
							{copy.link}
						</IntegrationSectionItemLink>
					</IntegrationSectionItem>
				))}
			</IntegrationSectionList>
		</IntegrationSection>
	);
}
