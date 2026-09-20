import { type DiffLine, FileDiff } from "@baby-ui/react";

const lines: DiffLine[] = [
	{ kind: "context", text: "export function cn(...inputs: ClassValue[]) {" },
	{ kind: "remove", text: "\treturn inputs.join(' ');" },
	{ kind: "add", text: "\treturn twMerge(clsx(inputs));" },
	{ kind: "context", text: "}" },
];

export function Example() {
	return <FileDiff filename="lib/cn.ts" lines={lines} />;
}
