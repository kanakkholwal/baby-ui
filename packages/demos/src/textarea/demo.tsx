"use client";

import {
	Field,
	FieldDescription,
	FieldLabel,
	Textarea,
	TextareaCount,
} from "@baby-ui/react";
import { type ComponentProps, useId, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function TextareaDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Textarea>>(props);
	const id = useId();
	const [value, setValue] = useState(
		"Same field tokens as Input, so labels and focus rings stay consistent.",
	);
	return (
		<Field className="w-full max-w-md">
			<FieldLabel htmlFor={id}>Message</FieldLabel>
			<Textarea
				id={id}
				value={value}
				onChange={(e) => setValue(e.currentTarget.value)}
				aria-describedby={`${id}-description`}
				size={p.size ?? "default"}
				variant={p.variant ?? "outline"}
				rows={p.rows ?? 4}
				autoGrow={p.autoGrow ?? false}
				maxRows={p.maxRows ?? 10}
				maxLength={280}
				invalid={p.invalid ?? false}
				disabled={p.disabled ?? false}
			/>
			<div className="flex items-start justify-between gap-3">
				<FieldDescription id={`${id}-description`}>
					Markdown is supported.
				</FieldDescription>
				<TextareaCount value={value.length} max={280} />
			</div>
		</Field>
	);
}
