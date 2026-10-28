"use client";

import { Button, Spinner } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function SpinnerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Spinner>>(props);
	const label = p.label || "Checking availability";
	return (
		<div className="flex w-64 flex-col items-center gap-4">
			<div className="flex items-center gap-2.5 text-muted-foreground">
				<Spinner size={p.size ?? "default"} label={label} />
				<span className="text-sm">{label}</span>
			</div>
			<Button loading loadingLabel="Reserving…" className="w-full">
				Reserve name
			</Button>
		</div>
	);
}
