"use client";

import {
	ContentSection,
	ContentSectionBody,
	ContentSectionMedia,
	ContentSectionQuote,
	ContentSectionQuoteAuthor,
	ContentSectionQuoteText,
	ContentSectionTitle,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { CONTENT_SECTION as copy } from "../data/content-section";
import { controlProps } from "../data/preview-props";

export function ContentSectionDemo({ props }: { props: Record<string, unknown> }) {
	const variant =
		controlProps<ComponentProps<typeof ContentSection>>(props).variant ?? "split";
	return (
		<ContentSection variant={variant}>
			<ContentSectionTitle>{copy.title}</ContentSectionTitle>
			<ContentSectionMedia>
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
			</ContentSectionMedia>
			<ContentSectionBody>
				<p>{copy.lead}</p>
				<p>
					<strong>{copy.highlight}</strong>, so nobody has to ask where a number came
					from. {copy.body}
				</p>
				<ContentSectionQuote>
					<ContentSectionQuoteText>{copy.quote.text}</ContentSectionQuoteText>
					<ContentSectionQuoteAuthor>{copy.quote.author}</ContentSectionQuoteAuthor>
				</ContentSectionQuote>
			</ContentSectionBody>
		</ContentSection>
	);
}
