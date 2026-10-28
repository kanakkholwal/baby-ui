"use client";

import { MorphingModal } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function MorphingModalDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof MorphingModal>>(props);
	return (
		<MorphingModal
			title="Deploy to production"
			spring={p.spring ?? "gentle"}
			size={p.size ?? "default"}
			dismissOnBackdrop={props.dismissOnBackdrop !== false}
			backdropBlur={Number(props.backdropBlur ?? 8)}
			trigger={
				<div className="w-56 rounded-2xl border border-border bg-card p-4">
					<p className="font-medium text-foreground text-sm">Deploy to production</p>
					<p className="mt-1 text-muted-foreground text-xs">Click to expand</p>
				</div>
			}
		>
			This dialog grew out of the card&apos;s own box. Closing runs the same path in
			reverse, a little faster.
		</MorphingModal>
	);
}
