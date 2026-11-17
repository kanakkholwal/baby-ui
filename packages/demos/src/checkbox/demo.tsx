"use client";

import { Checkbox } from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const SCOPES = ["Read repositories", "Write issues", "Manage webhooks"];

export function CheckboxDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Checkbox>>(props);
	const [checked, setChecked] = useState(false);
	const [scopes, setScopes] = useState([true, false, false]);
	useEffect(() => setChecked(Boolean(props.checked)), [props.checked]);
	const granted = scopes.filter(Boolean).length;
	const variant = p.variant ?? "default";

	return (
		<div className="flex w-full max-w-72 flex-col gap-3">
			<Checkbox
				checked={granted === SCOPES.length}
				indeterminate={granted > 0 && granted < SCOPES.length}
				onCheckedChange={(next) => setScopes(SCOPES.map(() => next))}
				variant={variant}
				label="All permissions"
			/>
			<div
				className={
					variant === "card"
						? "flex flex-col gap-2"
						: "flex flex-col gap-3 border-border/60 border-l pl-4"
				}
			>
				{SCOPES.map((scope, i) => (
					<Checkbox
						key={scope}
						checked={scopes[i]}
						onCheckedChange={(next) =>
							setScopes(scopes.map((on, j) => (i === j ? next : on)))
						}
						variant={variant}
						label={scope}
					/>
				))}
			</div>
			<Checkbox
				checked={checked}
				onCheckedChange={setChecked}
				disabled={p.disabled ?? false}
				variant={variant}
				indeterminate={p.indeterminate ?? false}
				size={p.size ?? "default"}
				label={p.label || "Remember this grant"}
				description={p.description || "Skips the prompt for the next 30 days."}
			/>
		</div>
	);
}
