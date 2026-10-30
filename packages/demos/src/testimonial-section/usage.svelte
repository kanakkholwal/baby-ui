<script lang="ts">
import {
	Testimonial,
	TestimonialAuthor,
	TestimonialAuthorName,
	TestimonialQuote,
	TestimonialSection,
	TestimonialSectionHeader,
	TestimonialSectionItem,
	TestimonialSectionList,
	TestimonialSectionTitle,
} from "@baby-ui/svelte";
</script>

<TestimonialSection variant="masonry">
	<TestimonialSectionHeader>
		<TestimonialSectionTitle>Teams that switched never looked back</TestimonialSectionTitle>
	</TestimonialSectionHeader>
	<TestimonialSectionList>
		<TestimonialSectionItem featured>
			<Testimonial>
				<TestimonialQuote>We replaced three tools and a weekly meeting.</TestimonialQuote>
				<TestimonialAuthor>
					<TestimonialAuthorName>Mina Patel</TestimonialAuthorName>
				</TestimonialAuthor>
			</Testimonial>
		</TestimonialSectionItem>
	</TestimonialSectionList>
</TestimonialSection>
