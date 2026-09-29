"use client";

import { OgNewsletterIssue } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { OG_NEWSLETTER_ISSUE } from "../data/og-samples";
import { controlProps } from "../data/preview-props";
import { OgFrame } from "./og-frame";

type Props = Record<string, unknown>;

export function OgNewsletterIssueDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof OgNewsletterIssue>>(props);
	return (
		<OgFrame>
			<OgNewsletterIssue
				publication={p.publication || "The Render Loop"}
				headline={p.headline || "Why every design system eventually rebuilds its tokens"}
				issue={p.issue ?? undefined}
				date={p.date ?? undefined}
				inside={OG_NEWSLETTER_ISSUE.inside}
				insideLabel={p.insideLabel || undefined}
				mode={p.mode ?? "light"}
				tone={p.tone ?? "neutral"}
			/>
		</OgFrame>
	);
}
