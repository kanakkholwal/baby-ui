<script lang="ts">
import {
	Testimonial,
	TestimonialAuthor,
	TestimonialAuthorDetails,
	TestimonialAuthorName,
	TestimonialAuthorTagline,
	TestimonialAvatar,
	TestimonialAvatarFallback,
	TestimonialAvatarImage,
	TestimonialQuote,
	TestimonialSection,
	TestimonialSectionDescription,
	TestimonialSectionHeader,
	TestimonialSectionItem,
	TestimonialSectionList,
	TestimonialSectionTitle,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { TESTIMONIAL_SECTION as copy } from "../data/testimonial-section";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const variant = $derived(
	controlProps<ComponentProps<typeof TestimonialSection>>(props).variant ?? "masonry",
);
</script>

<TestimonialSection {variant}>
	<TestimonialSectionHeader>
		<TestimonialSectionTitle>{copy.title}</TestimonialSectionTitle>
		<TestimonialSectionDescription>{copy.description}</TestimonialSectionDescription>
	</TestimonialSectionHeader>
	<TestimonialSectionList>
		{#each copy.quotes as q (q.name)}
			<TestimonialSectionItem featured={q.featured}>
				<Testimonial>
					<TestimonialQuote>{q.text}</TestimonialQuote>
					<TestimonialAuthor>
						<TestimonialAvatar>
							<TestimonialAvatarImage src={q.avatar} alt={q.name} />
							<TestimonialAvatarFallback>{q.initials}</TestimonialAvatarFallback>
						</TestimonialAvatar>
						<TestimonialAuthorDetails>
							<TestimonialAuthorName>{q.name}</TestimonialAuthorName>
							<TestimonialAuthorTagline>{q.role}</TestimonialAuthorTagline>
						</TestimonialAuthorDetails>
					</TestimonialAuthor>
				</Testimonial>
			</TestimonialSectionItem>
		{/each}
	</TestimonialSectionList>
</TestimonialSection>
