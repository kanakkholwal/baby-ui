<script lang="ts">
import {
	ContentSection,
	ContentSectionBody,
	ContentSectionMedia,
	ContentSectionQuote,
	ContentSectionQuoteAuthor,
	ContentSectionQuoteText,
	ContentSectionTitle,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { CONTENT_SECTION as copy } from "../data/content-section";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const variant = $derived(
	controlProps<ComponentProps<typeof ContentSection>>(props).variant ?? "split",
);
</script>

<ContentSection {variant}>
	<ContentSectionTitle>{copy.title}</ContentSectionTitle>
	<ContentSectionMedia>
		<img src={copy.image.light} alt={copy.image.alt} width={copy.image.width} height={copy.image.height} class="dark:hidden" />
		<img src={copy.image.dark} alt={copy.image.alt} width={copy.image.width} height={copy.image.height} class="hidden dark:inline" />
	</ContentSectionMedia>
	<ContentSectionBody>
		<p>{copy.lead}</p>
		<p><strong>{copy.highlight}</strong>, so nobody has to ask where a number came from. {copy.body}</p>
		<ContentSectionQuote>
			<ContentSectionQuoteText>{copy.quote.text}</ContentSectionQuoteText>
			<ContentSectionQuoteAuthor>{copy.quote.author}</ContentSectionQuoteAuthor>
		</ContentSectionQuote>
	</ContentSectionBody>
</ContentSection>
