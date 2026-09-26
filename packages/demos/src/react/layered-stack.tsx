"use client";

import {
	LayeredStack,
	type LayeredStackAspect,
	type LayeredStackColumns,
} from "@baby-ui/react";
import { LAYERED_ITEMS } from "../data/stacks";

type Props = Record<string, unknown>;

export function LayeredStackDemo({ props }: { props: Props }) {
	return (
		<LayeredStack
			items={LAYERED_ITEMS}
			columns={(props.columns as LayeredStackColumns) ?? "4"}
			aspect={(props.aspect as LayeredStackAspect) ?? "portrait"}
			tilt={Number(props.tilt ?? 10)}
			className="max-w-3xl"
		/>
	);
}
