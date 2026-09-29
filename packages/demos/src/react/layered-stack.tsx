"use client";

import { LayeredStack } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";
import { LAYERED_ITEMS } from "../data/stacks";

type Props = Record<string, unknown>;

export function LayeredStackDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof LayeredStack>>(props);
	return (
		<LayeredStack
			items={LAYERED_ITEMS}
			columns={p.columns ?? "4"}
			aspect={p.aspect ?? "portrait"}
			tilt={Number(props.tilt ?? 10)}
			className="max-w-3xl"
		/>
	);
}
