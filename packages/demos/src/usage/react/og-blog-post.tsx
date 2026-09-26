import { OgBlogPost } from "@baby-ui/react";

export function Example() {
	return (
		<OgBlogPost
			title="Designing motion that respects the reader"
			site="Acme"
			category="Engineering"
			author={{ name: "Ada Park" }}
			date="Sep 26, 2026"
		/>
	);
}
