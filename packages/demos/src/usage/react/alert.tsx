import { Alert, AlertDescription, AlertTitle } from "@baby-ui/react";

export function Example() {
	return (
		<Alert variant="warning" dismissible>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden>
				<circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.3" />
				<path
					d="M8 5.6v3.2M8 11.1h.01"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</svg>
			<AlertTitle>Unsaved changes</AlertTitle>
			<AlertDescription>Leaving this page now will discard the draft.</AlertDescription>
		</Alert>
	);
}
