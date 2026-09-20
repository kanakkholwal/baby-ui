import { ResponseStream } from "@baby-ui/react";

export function Example() {
	return (
		<ResponseStream text="Streaming one character at a time, at a readable pace." speed={60} />
	);
}
