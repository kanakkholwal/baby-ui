"use client";

import {
	StickyScrollCards,
	type StickyScrollCardsSize,
	type StickyScrollCardsVariant,
} from "@baby-ui/react";
import { STICKY_CARDS } from "../data/stacks";

type Props = Record<string, unknown>;

export function StickyScrollCardsDemo({ props }: { props: Props }) {
	return (
		<StickyScrollCards
			cards={STICKY_CARDS}
			variant={(props.variant as StickyScrollCardsVariant) ?? "polaroid"}
			size={(props.size as StickyScrollCardsSize) ?? "md"}
			tilt={Number(props.tilt ?? 1)}
			hint={(props.hint as string | undefined) ?? "Scroll to explore"}
			className="max-w-3xl"
		/>
	);
}
