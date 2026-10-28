import {
	Button,
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@baby-ui/react";

export function Example() {
	return (
		<Empty variant="outline">
			<EmptyHeader>
				<EmptyMedia variant="icon" tone="primary">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.75"
						aria-hidden
					>
						<path d="M12 5v14M5 12h14" strokeLinecap="round" />
					</svg>
				</EmptyMedia>
				<EmptyTitle>No projects yet</EmptyTitle>
				<EmptyDescription>Create a project to start inviting your team.</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button size="sm">New project</Button>
			</EmptyContent>
		</Empty>
	);
}
