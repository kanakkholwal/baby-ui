import { Attachment } from "@baby-ui/react";

export function Example() {
	return (
		<Attachment
			name="design-review.pdf"
			size="2.4 MB"
			status="uploading"
			progress={62}
			onRemove={() => console.log("removed")}
		/>
	);
}
