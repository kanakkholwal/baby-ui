import type { HTMLAttributes } from "react";
import { Badge } from "../badge/badge";
import { Button } from "../button/button";
import { cn } from "../lib/cn";
import type { GradientHero01Action } from "./types";
import {
	type GradientHero01Size,
	type GradientHero01Tone,
	gradientHero01,
} from "./variants";

export type { GradientHero01Action, GradientHero01Size, GradientHero01Tone };

export interface GradientHero01Props extends Omit<HTMLAttributes<HTMLElement>, "title"> {
	headline: string;
	description?: string;
	/** Pill above the headline. */
	badge?: string;
	/** The first is the primary action; the rest are outlined. */
	actions?: GradientHero01Action[];
	tone?: GradientHero01Tone;
	size?: GradientHero01Size;
}

export function GradientHero01({
	headline,
	description,
	badge,
	actions = [],
	tone = "chart",
	size = "screen",
	className,
	...props
}: GradientHero01Props) {
	const s = gradientHero01({ tone, size });
	const live = actions.filter((a) => a.href !== undefined || a.onClick !== undefined);

	return (
		<section data-slot="gradient-hero-01" className={cn(s.root(), className)} {...props}>
			<div aria-hidden className={s.blob()} />
			<div aria-hidden className={s.wash()} />
			<div aria-hidden className={s.vignette()} />
			<div aria-hidden className={s.fade()} />
			<div className={s.inner()}>
				{badge ? (
					<Badge variant="outline" className={s.badge()}>
						{badge}
					</Badge>
				) : null}
				<h1 className={s.title()}>{headline}</h1>
				{description ? <p className={s.description()}>{description}</p> : null}
				{live.length ? (
					<div className={s.actions()}>
						{live.map((action, i) => {
							const variant = i === 0 ? "default" : "outline";
							return action.href !== undefined ? (
								<Button
									key={i}
									href={action.href}
									variant={variant}
									size="lg"
									className={s.action()}
									onClick={action.onClick}
								>
									{action.label}
								</Button>
							) : (
								<Button
									key={i}
									variant={variant}
									size="lg"
									className={s.action()}
									onClick={action.onClick}
								>
									{action.label}
								</Button>
							);
						})}
					</div>
				) : null}
			</div>
		</section>
	);
}
