"use client";

import { Button, Skeleton } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function SkeletonDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Skeleton>>(props);
	const shape = p.shape ?? "line";
	const [loading, setLoading] = useState(true);
	return (
		<div className="grid w-full max-w-72 gap-6">
			<div className="flex items-center gap-3">
				<Skeleton width="2.5rem" height="2.5rem" shape="circle" />
				<div className="flex flex-1 flex-col gap-2">
					<Skeleton width={p.width || "100%"} height={p.height || "1rem"} shape={shape} />
					<Skeleton width="60%" height="0.75rem" />
				</div>
			</div>
			<div className="grid gap-2">
				<Skeleton loading={loading} shape="block">
					<p className="text-muted-foreground text-sm leading-relaxed">
						The placeholder takes this paragraph's shape, then crossfades into it.
					</p>
				</Skeleton>
				<Button
					size="sm"
					variant="outline"
					className="justify-self-start"
					onClick={() => setLoading((v) => !v)}
				>
					{loading ? "Finish loading" : "Load again"}
				</Button>
			</div>
		</div>
	);
}
