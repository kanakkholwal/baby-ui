"use client";

import { Switch } from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

// Switch renders its own label; reversing the row puts the text first without a second one.
const SWITCH_ROW = "flex w-full flex-row-reverse items-center justify-between gap-6";

export function SwitchDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Switch>>(props);
	const [checked, setChecked] = useState(false);
	const [digest, setDigest] = useState(true);
	useEffect(() => setChecked(Boolean(props.checked)), [props.checked]);
	const size = p.size ?? "default";

	return (
		<div className="flex w-full max-w-72 flex-col divide-y divide-border rounded-xl border border-border">
			<div className="px-4 py-3">
				<Switch
					checked={checked}
					onCheckedChange={setChecked}
					disabled={p.disabled ?? false}
					size={size}
					label={p.label || "Push notifications"}
					className={SWITCH_ROW}
				/>
			</div>
			<div className="px-4 py-3">
				<Switch
					checked={digest}
					onCheckedChange={setDigest}
					label="Weekly digest"
					className={SWITCH_ROW}
				/>
			</div>
			<div className="px-4 py-3">
				<Switch checked={false} disabled label="SMS alerts" className={SWITCH_ROW} />
			</div>
		</div>
	);
}
