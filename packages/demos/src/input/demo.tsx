"use client";

import { Input, Label } from "@baby-ui/react";
import { type ComponentProps, useId, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function InputDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Input>>(props);
	const id = useId();
	const [value, setValue] = useState("");
	return (
		<div className="flex w-full max-w-72 flex-col gap-1.5">
			<Label htmlFor={id} required>
				Workspace name
			</Label>
			<Input
				id={id}
				value={value}
				onChange={(e) => setValue(e.currentTarget.value)}
				size={p.size ?? "default"}
				invalid={p.invalid ?? false}
				disabled={p.disabled ?? false}
				placeholder={p.placeholder || "Enter a value"}
			/>
			{p.invalid ? (
				<p className="text-destructive-strong text-xs">That name is already taken.</p>
			) : null}
		</div>
	);
}
