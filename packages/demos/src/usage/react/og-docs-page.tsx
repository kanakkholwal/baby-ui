import { OgDocsPage } from "@baby-ui/react";

export function Example() {
	return (
		<OgDocsPage
			title="Dialog"
			site="Acme"
			section={["Docs", "Components"]}
			description="A modal surface that returns focus on close."
			snippet={["$ pnpm add @acme/ui"]}
			motif="terminal"
		/>
	);
}
