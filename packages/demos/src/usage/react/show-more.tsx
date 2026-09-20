import { ShowMore } from "@baby-ui/react";

export function Example() {
	return (
		<ShowMore lines={3}>
			<p>
				Components here are copied into your project rather than installed, which means
				you own the source and can change anything. The registry only decides what the
				first version looks like.
			</p>
		</ShowMore>
	);
}
