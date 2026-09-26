"use client";

import {
	MacKeyboard,
	type MacKeyboardSize,
	type MacKeyboardVariant,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function MacKeyboardDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-4xl overflow-x-auto p-2">
			<MacKeyboard
				listen={(props.listen as boolean) ?? true}
				variant={(props.variant as MacKeyboardVariant) ?? "default"}
				size={(props.size as MacKeyboardSize) ?? "md"}
			/>
		</div>
	);
}
