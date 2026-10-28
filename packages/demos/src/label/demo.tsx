"use client";

import { Input, Label } from "@baby-ui/react";
import { useId } from "react";

type Props = Record<string, unknown>;

export function LabelDemo({ props }: { props: Props }) {
	const id = useId();
	return (
		<div className="flex w-full max-w-72 flex-col gap-1.5">
			<Label
				htmlFor={id}
				required={Boolean(props.required)}
				disabled={Boolean(props.disabled)}
			>
				Email address
			</Label>
			<Input id={id} placeholder="you@example.com" disabled={Boolean(props.disabled)} />
		</div>
	);
}
