"use client";

import { DateField, Field, FieldDescription, FieldLabel } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

// A sign-up form: a birthday is known, so it is typed, never picked.
export function DateFieldDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof DateField>>(props);
	const [birthday, setBirthday] = useState<Date | null>(null);
	return (
		<Field className="w-fit">
			<FieldLabel>Date of birth</FieldLabel>
			<DateField
				value={birthday}
				onValueChange={setBirthday}
				max={new Date()}
				locale={p.locale || undefined}
				invalid={p.invalid ?? false}
				size={p.size ?? "default"}
				aria-label="Date of birth"
				aria-describedby="demo-birthday-hint"
			/>
			<FieldDescription id="demo-birthday-hint">
				Type it, or use the arrow keys.
			</FieldDescription>
		</Field>
	);
}
