"use client";

import { OrbitHero } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { ORBIT_GLYPHS, ORBIT_GROUPS, ORBIT_HERO } from "../data/orbit-hero";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

function Glyph({ name }: { name: string }) {
	return (
		<svg
			aria-hidden
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			{(ORBIT_GLYPHS[name] ?? []).map(([d, faded]) => (
				<path key={d} d={d} opacity={faded ? 0.5 : undefined} />
			))}
		</svg>
	);
}

export function OrbitHeroDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof OrbitHero>>(props);
	return (
		<OrbitHero
			headline={p.headline ?? ORBIT_HERO.headline}
			subheading={p.subheading ?? ORBIT_HERO.subheading}
			description={p.description ?? ORBIT_HERO.description}
			badge={p.badge}
			interval={p.interval}
			variant={p.variant}
			size={p.size ?? "section"}
			groups={ORBIT_GROUPS}
			actions={ORBIT_HERO.actions}
			renderItem={(name) => <Glyph name={name} />}
		/>
	);
}
