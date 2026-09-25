import { Button, ShowcaseGrid, ShowcasePanel } from "@baby-ui/react";

export function Example() {
	return (
		<ShowcaseGrid>
			<ShowcasePanel span={7} actions={<Button size="sm">Open</Button>}>
				Charts
			</ShowcasePanel>
			<ShowcasePanel span={5}>Agents</ShowcasePanel>
			<ShowcasePanel>Blocks</ShowcasePanel>
		</ShowcaseGrid>
	);
}
