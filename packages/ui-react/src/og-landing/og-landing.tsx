import { cn } from "../lib/cn";
import {
	OG_LANDING_AXIS,
	OG_LANDING_HANDLES,
	OG_LANDING_ROW,
	OG_LANDING_SHOWCASE,
	OG_LANDING_SPOTLIGHT,
	OG_LANDING_STREAKS,
	type OgLandingMode,
	type OgLandingTone,
	type OgLandingVariant,
	type OgLandingWordStep,
	ogLanding,
	ogLandingWord,
} from "./variants";

export type { OgLandingMode, OgLandingTone, OgLandingVariant };

const STEPS: OgLandingWordStep[] = [0, 1, 2, 3];

export interface OgLandingProps {
	/** Headline; the lead word in `picker`. */
	title: string;
	/** Product name beside the logo. */
	site?: string;
	logo?: string;
	description?: string;
	/** Button label under the lead word in `picker`. */
	cta?: string;
	/** Screenshots for `showcase` and `screen`, portraits for `spotlight`; they cycle. */
	images?: string[];
	/** The vertical word list in `picker`. */
	words?: string[];
	/** Index of the selected word in `picker`; defaults to the middle one. */
	active?: number;
	mode?: OgLandingMode;
	tone?: OgLandingTone;
	variant?: OgLandingVariant;
	className?: string;
}

/** A 1200x630 product landing card in five layouts. Render it to PNG with takumi-js. */
export function OgLanding({
	title,
	site,
	logo,
	description,
	cta,
	images,
	words,
	active,
	mode = "light",
	tone = "neutral",
	variant = "streaks",
	className,
}: OgLandingProps) {
	const s = ogLanding({ mode, tone, variant });
	const pics = images?.filter(Boolean) ?? [];
	const list = words?.filter(Boolean) ?? [];
	const picked = Math.min(
		Math.max(active ?? Math.floor(list.length / 2), 0),
		list.length - 1,
	);
	const brand =
		logo || site ? (
			<div className={s.brand()}>
				{logo ? <img src={logo} alt="" className={s.logo()} /> : null}
				{site ? <span className={s.site()}>{site}</span> : null}
			</div>
		) : null;
	const headline = (
		<h1 className={s.title()}>
			{variant === "streaks" ? title.replace(/\.$/, "") : title}
			{variant === "streaks" ? <span className={s.mark()}>.</span> : null}
		</h1>
	);

	return (
		<div data-slot="og-landing" className={cn(s.root(), className)}>
			{variant === "streaks" ? (
				<>
					{OG_LANDING_STREAKS.map((line) => (
						<div
							key={line.left}
							className={line.accent ? s.streakAccent() : s.streak()}
							style={{ left: line.left, top: 700, opacity: line.opacity }}
						/>
					))}
					<div className={s.spark()} />
					<div className={s.sparkCore()} />
				</>
			) : null}
			{variant === "showcase" && pics.length
				? OG_LANDING_SHOWCASE.map((col, c) => (
						<div
							key={col.left}
							className={s.column()}
							style={{ left: col.left, top: col.top }}
						>
							{col.heights.map((height, i) => (
								<div key={`${c}-${height}-${i}`} className={s.frame()} style={{ height }}>
									<img
										src={pics[(c * 3 + i) % pics.length]}
										alt=""
										className={s.shot()}
									/>
								</div>
							))}
						</div>
					))
				: null}
			{variant === "screen" ? (
				<>
					<div className={s.glow()} />
					{pics.length ? <img src={pics[0]} alt="" className={s.screen()} /> : null}
				</>
			) : null}
			{variant === "spotlight" ? (
				<>
					<div className={s.grid()} />
					{pics.length
						? OG_LANDING_SPOTLIGHT.map((tile, i) => (
								<img
									key={`${tile.left}-${tile.top}`}
									src={pics[i % pics.length]}
									alt=""
									className={s.face()}
									style={{
										left: tile.left,
										top: tile.top,
										width: tile.width,
										height: tile.height,
									}}
								/>
							))
						: null}
				</>
			) : null}
			{variant === "picker" ? (
				<>
					<div className={s.wash()} />
					{list.length ? (
						<div
							className={s.words()}
							style={{
								top: OG_LANDING_AXIS - picked * OG_LANDING_ROW - OG_LANDING_ROW / 2,
							}}
						>
							{list.map((word, i) => (
								<div
									key={`${i}-${word}`}
									className={ogLandingWord({
										step: STEPS[Math.min(Math.abs(i - picked), 3)],
									})}
								>
									{i === picked ? (
										<>
											<div className={s.box()}>
												{OG_LANDING_HANDLES.map(([x, y]) => (
													<div
														key={`${x}-${y}`}
														className={s.handle()}
														style={{ left: `${x}%`, top: `${y}%` }}
													/>
												))}
											</div>
											<svg
												viewBox="0 0 24 24"
												fill="currentColor"
												stroke="currentColor"
												strokeWidth="2.5"
												strokeLinejoin="round"
												className={cn(s.cursor(), "text-foreground")}
												aria-hidden="true"
											>
												<path d="M4 3l16 7.5-7 1.8-2.2 7.2z" />
											</svg>
										</>
									) : null}
									<span className="relative">{word}</span>
								</div>
							))}
						</div>
					) : null}
					{brand}
					{headline}
					{cta ? <span className={s.cta()}>{cta}</span> : null}
				</>
			) : variant === "spotlight" ? (
				<>
					{headline}
					{brand}
				</>
			) : (
				<>
					{brand}
					{headline}
					{description ? <p className={s.description()}>{description}</p> : null}
				</>
			)}
		</div>
	);
}
