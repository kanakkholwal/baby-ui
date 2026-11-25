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
	const variant = p.variant ?? "default";

	if (variant === "celled") {
		return (
			<div className="flex w-full max-w-72 flex-col gap-2">
				<Switch
					variant="celled"
					size={size}
					checked={checked}
					onCheckedChange={setChecked}
					disabled={p.disabled ?? false}
					label={p.label || "Animations"}
				/>
				<Switch
					variant="celled"
					size={size}
					checked={digest}
					onCheckedChange={setDigest}
					label="Sounds"
				/>
				<Switch variant="celled" size={size} checked={false} disabled label="Haptics" />
			</div>
		);
	}

	return (
		<div className="flex w-full max-w-72 flex-col divide-y divide-border/60 rounded-xl bg-card">
			<div className="px-4 py-3">
				<Switch
					checked={checked}
					onCheckedChange={setChecked}
					disabled={p.disabled ?? false}
					size={size}
					variant={variant}
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
