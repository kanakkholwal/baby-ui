import { Button, Card, CardFooter, CardHeader } from "@baby-ui/react";

export function Example() {
	return (
		<Card interactive>
			<CardHeader title="Production" description="Deployed 4 minutes ago from main." />
			<CardFooter>
				<Button size="sm" variant="outline">
					View logs
				</Button>
			</CardFooter>
		</Card>
	);
}
