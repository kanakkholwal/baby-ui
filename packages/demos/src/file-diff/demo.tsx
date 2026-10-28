"use client";

import { FileDiff } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const DIFF = [
	{ kind: "context" as const, text: "export function Button(props: ButtonProps) {" },
	{ kind: "remove" as const, text: "  const classes = button({ variant });" },
	{
		kind: "add" as const,
		text: "  const classes = cn(button({ variant, size }), className);",
	},
	{ kind: "context" as const, text: "  return <button className={classes} />;" },
	{ kind: "context" as const, text: "}" },
];

export function FileDiffDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof FileDiff>>(props);
	return (
		<div className="w-full max-w-lg">
			<FileDiff
				filename={p.filename || "src/button.tsx"}
				lines={DIFF}
				showLineNumbers={p.showLineNumbers ?? true}
			/>
		</div>
	);
}
