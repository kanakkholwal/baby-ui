"use client";

import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function NativeSelectDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof NativeSelect>>(props);
	const size = p.size ?? "default";
	const [region, setRegion] = useState("fra");
	return (
		<div className="flex w-full max-w-60 flex-col gap-1.5">
			<label htmlFor="region" className="font-medium text-sm">
				Region
			</label>
			<NativeSelect
				id="region"
				className="w-full"
				size={size}
				value={region}
				onChange={(e) => setRegion(e.currentTarget.value)}
				disabled={p.disabled ?? false}
			>
				<NativeSelectOptGroup label="Europe">
					<NativeSelectOption value="fra">Frankfurt</NativeSelectOption>
					<NativeSelectOption value="lhr">London</NativeSelectOption>
				</NativeSelectOptGroup>
				<NativeSelectOptGroup label="Americas">
					<NativeSelectOption value="iad">Virginia</NativeSelectOption>
					<NativeSelectOption value="sfo">San Francisco</NativeSelectOption>
				</NativeSelectOptGroup>
			</NativeSelect>
		</div>
	);
}
