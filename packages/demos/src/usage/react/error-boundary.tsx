import { ErrorBoundary } from "@baby-ui/react";

function Revenue(): never {
	throw new Error("Revenue service unavailable");
}

export function Example() {
	return (
		<ErrorBoundary variant="outline" onError={(error) => console.error(error)}>
			<Revenue />
		</ErrorBoundary>
	);
}
