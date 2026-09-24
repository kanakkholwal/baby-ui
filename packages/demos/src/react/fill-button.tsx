"use client";

import { FillButton, type FillButtonSize, type FillButtonTone } from "@baby-ui/react";

type Props = Record<string, unknown>;

export function FillButtonDemo({ props }: { props: Props }) {
	return (
		<FillButton
			tone={(props.tone as FillButtonTone) ?? "soft"}
			size={(props.size as FillButtonSize) ?? "md"}
		>
			Get started
		</FillButton>
	);
}
