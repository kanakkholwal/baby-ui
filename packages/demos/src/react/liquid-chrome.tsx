"use client";

import {
	LiquidChrome,
	type LiquidChromeSpeed,
	type LiquidChromeTone,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function LiquidChromeDemo({ props }: { props: Props }) {
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<LiquidChrome
				position="absolute"
				tone={(props.tone as LiquidChromeTone) ?? "chrome"}
				speed={(props.speed as LiquidChromeSpeed) ?? "normal"}
				amplitude={Number(props.amplitude ?? 0.6)}
				interactive={props.interactive !== false}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</LiquidChrome>
		</div>
	);
}
