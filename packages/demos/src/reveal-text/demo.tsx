"use client";

import { RevealText } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function RevealTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof RevealText>>(props);
	const split = p.split ?? "word";
	const trigger = p.trigger ?? "mount";
	return (
		<div className="text-2xl">
			<RevealText
				key={`${p.variant}-${split}-${trigger}-${props.once}-${props.staggerMs}-${props.delayMs}-${props.blur}-${props.direction}-${props.staggerFrom}-${props.mask}`}
				as="h2"
				text="Design meets motion, one word at a time"
				variant={p.variant}
				split={split}
				trigger={trigger}
				once={Boolean(props.once ?? true)}
				staggerMs={Number(props.staggerMs ?? 90)}
				delayMs={Number(props.delayMs ?? 0)}
				blur={Number(props.blur ?? 12)}
				direction={p.direction ?? "up"}
				staggerFrom={p.staggerFrom ?? "start"}
				mask={props.mask === true}
				size={p.size ?? "inherit"}
				className="text-center font-semibold text-foreground tracking-tight"
			/>
		</div>
	);
}
