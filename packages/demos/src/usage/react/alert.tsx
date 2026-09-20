import { Alert } from "@baby-ui/react";

export function Example() {
	return (
		<Alert variant="warning" title="Unsaved changes" dismissible>
			Leaving this page now will discard the draft.
		</Alert>
	);
}
