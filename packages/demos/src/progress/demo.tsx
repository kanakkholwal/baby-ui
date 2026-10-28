"use client";

import { Progress } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function ProgressDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Progress>>(props);
	const value = Number(p.value ?? 68);
	const indeterminate = p.indeterminate ?? false;
	return (
		<div className="flex w-full max-w-72 flex-col items-center gap-2">
			<Progress
				value={value}
				indeterminate={indeterminate}
				size={p.size ?? "default"}
				tone={p.tone ?? "default"}
				variant={p.variant ?? "linear"}
				showValue={p.showValue === true}
				label={p.label || "design-system.zip"}
				helper={p.helper || "12.4 MB of 18.2 MB, 6s remaining"}
				indeterminateLabel="Preparing"
			/>
		</div>
	);
}
