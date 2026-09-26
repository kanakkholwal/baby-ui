"use client";

import { OgBlogPost, type OgBlogPostMode, type OgBlogPostTone } from "@baby-ui/react";
import { OG_BLOG_POST } from "../data/og-samples";
import { OgFrame } from "./og-frame";

type Props = Record<string, unknown>;

export function OgBlogPostDemo({ props }: { props: Props }) {
	return (
		<OgFrame>
			<OgBlogPost
				{...OG_BLOG_POST}
				title={(props.title as string) || "Designing motion that respects the reader"}
				site={(props.site as string) || "baby ui"}
				excerpt={(props.excerpt as string) ?? undefined}
				category={(props.category as string) ?? undefined}
				mode={(props.mode as OgBlogPostMode) ?? "light"}
				tone={(props.tone as OgBlogPostTone) ?? "chart"}
			/>
		</OgFrame>
	);
}
