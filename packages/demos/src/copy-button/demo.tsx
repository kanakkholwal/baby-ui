"use client";

import { CopyButton } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function CopyButtonDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof CopyButton>>(props);
	const text = p.text || "npx shadcn@latest add button";
	return (
		<div className="flex w-full max-w-[22rem] items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2">
			<code className="truncate font-mono text-foreground text-xs">{text}</code>
			<CopyButton
				text={text}
				label={p.label || "Copy"}
				copiedLabel={p.copiedLabel || "Copied"}
				iconOnly={p.iconOnly ?? true}
			/>
		</div>
	);
}
