"use client";

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
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";
import { TESTIMONIAL_SECTION as copy } from "../data/testimonial-section";

export function TestimonialSectionDemo({ props }: { props: Record<string, unknown> }) {
	const variant =
		controlProps<ComponentProps<typeof TestimonialSection>>(props).variant ?? "masonry";
	return (
		<TestimonialSection variant={variant}>
			<TestimonialSectionHeader>
				<TestimonialSectionTitle>{copy.title}</TestimonialSectionTitle>
				<TestimonialSectionDescription>{copy.description}</TestimonialSectionDescription>
			</TestimonialSectionHeader>
			<TestimonialSectionList>
				{copy.quotes.map((q) => (
					<TestimonialSectionItem key={q.name} featured={q.featured}>
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
				))}
			</TestimonialSectionList>
		</TestimonialSection>
	);
}
