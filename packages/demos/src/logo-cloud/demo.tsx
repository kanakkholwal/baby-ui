"use client";

import {
	LogoCloud,
	LogoCloudContent,
	LogoCloudItem,
	LogoCloudLink,
	LogoCloudList,
	LogoCloudTitle,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { LOGO_CLOUD as copy } from "../data/logo-cloud";
import { controlProps } from "../data/preview-props";

export function LogoCloudDemo({ props }: { props: Record<string, unknown> }) {
	const variant = controlProps<ComponentProps<typeof LogoCloud>>(props).variant ?? "grid";
	return (
		<LogoCloud variant={variant}>
			<LogoCloudTitle>{copy.title}</LogoCloudTitle>
			<LogoCloudContent>
				<LogoCloudList>
					{copy.logos.map((logo) => (
						<LogoCloudItem key={logo.name}>
							<img src={logo.logo} alt={logo.name} width={24} height={24} />
						</LogoCloudItem>
					))}
				</LogoCloudList>
				<LogoCloudLink href={copy.link.href}>{copy.link.label}</LogoCloudLink>
			</LogoCloudContent>
		</LogoCloud>
	);
}
