"use client";

import { ALERT_ICON, Alert, AlertDescription, AlertTitle } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function AlertDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Alert>>(props);
	const variant = p.variant ?? "info";
	return (
		<div className="w-full max-w-md">
			<Alert
				key={`${variant}-${String(p.dismissible)}`}
				variant={variant}
				dismissible={p.dismissible ?? false}
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden>
					<circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.3" />
					<path
						d={ALERT_ICON[variant]}
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<AlertTitle>Deployment finished</AlertTitle>
				<AlertDescription>
					Your last deploy finished 4 minutes ago and is serving traffic.
				</AlertDescription>
			</Alert>
		</div>
	);
}
