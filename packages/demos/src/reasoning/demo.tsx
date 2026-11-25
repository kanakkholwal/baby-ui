"use client";

import type { ReasoningVariant } from "@baby-ui/react";
import { Example } from "./usage";

type Props = Record<string, unknown>;

export function ReasoningDemo({ props }: { props: Props }) {
	return (
		<Example
			variant={
				props.variant === "framed" ? ("framed" satisfies ReasoningVariant) : "default"
			}
			live={props.thinking !== false}
		/>
	);
}
