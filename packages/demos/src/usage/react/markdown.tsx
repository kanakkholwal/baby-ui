import { Markdown } from "@baby-ui/react";

const content = [
	"## Installing",
	"Components are copied into your project rather than installed.",
	"",
	"- You own the source",
	"- Updates are a diff, not a version bump",
].join("\n");

export function Example() {
	return <Markdown content={content} />;
}
