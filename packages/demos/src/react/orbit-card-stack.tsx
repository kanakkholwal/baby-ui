"use client";

import {
	OrbitCardStack,
	type OrbitCardStackLayout,
	type OrbitCardStackSize,
} from "@baby-ui/react";
import { ORBIT_PEOPLE } from "../data/stacks";

type Props = Record<string, unknown>;

export function OrbitCardStackDemo({ props }: { props: Props }) {
	return (
		<OrbitCardStack
			items={ORBIT_PEOPLE}
			layout={(props.layout as OrbitCardStackLayout) ?? "arc"}
			size={(props.size as OrbitCardStackSize) ?? "md"}
			spread={Number(props.spread ?? 168)}
			lift={Number(props.lift ?? 34)}
		/>
	);
}
