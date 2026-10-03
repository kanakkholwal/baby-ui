import { cn } from "../lib/cn";
import {
	OG_BRAND_MOSAIC,
	OG_BRAND_PIPES,
	OG_BRAND_SCATTER,
	OG_BRAND_WAVES,
	type OgBrandMode,
	type OgBrandVariant,
	ogBrand,
	ogBrandBand,
} from "./variants";

export type { OgBrandMode, OgBrandVariant };

export interface OgBrandProps {
	/** Brand name, set as the wordmark. */
	name: string;
	/** Logo image URL beside (or, in `mosaic`, above) the name. */
	logo?: string;
	/** One quiet line under the wordmark. */
	tagline?: string;
	/** Image URLs for `scatter` tiles, `mosaic` columns and the `split` panel; they cycle. */
	images?: string[];
	mode?: OgBrandMode;
	variant?: OgBrandVariant;
	className?: string;
}

/** A 1200x630 brand card: the wordmark over one of eight backgrounds. Render it with takumi-js. */
export function OgBrand({
	name,
	logo,
	tagline,
	images,
	mode = "light",
	variant = "plain",
	className,
}: OgBrandProps) {
	const s = ogBrand({ mode, variant });
	const pics = images?.filter(Boolean) ?? [];
	const pick = (i: number) => pics[i % pics.length];
	return (
		<div data-slot="og-brand" className={cn(s.root(), className)}>
			{variant === "waves" ? (
				<>
					<svg
						viewBox="0 0 1200 630"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.25"
						className={s.field()}
						aria-hidden="true"
					>
						{OG_BRAND_WAVES.map((d) => (
							<path key={d} d={d} />
						))}
					</svg>
					<div className={s.hairX()} />
					<div className={s.hairY()} />
				</>
			) : null}
			{variant === "pipes" ? (
				<>
					<div className={s.dots()} />
					{OG_BRAND_PIPES.map((band) => (
						<div
							key={`${band.left}-${band.top}`}
							className={ogBrandBand({ side: band.side, slot: band.slot })}
							style={{
								left: band.left,
								top: band.top,
								width: band.width,
								height: band.height,
								[band.side === "lb" ? "borderBottomLeftRadius" : "borderTopLeftRadius"]:
									band.radius,
							}}
						/>
					))}
				</>
			) : null}
			{variant === "mesh" || variant === "blur" ? (
				<>
					<div className={s.blobA()} />
					<div className={s.blobB()} />
					<div className={s.blobC()} />
				</>
			) : null}
			{variant === "mesh" ? (
				<>
					<div className={s.sheen()} />
					<div className={s.veil()} />
				</>
			) : null}
			{pics.length && variant === "scatter"
				? OG_BRAND_SCATTER.map((tile, i) => (
						<img
							key={`${tile.left}-${tile.top}`}
							src={pick(i)}
							alt=""
							className={cn(s.tile(), tile.soft && s.softTile())}
							style={{
								left: tile.left,
								top: tile.top,
								width: tile.width,
								height: tile.height,
							}}
						/>
					))
				: null}
			{pics.length && variant === "mosaic"
				? OG_BRAND_MOSAIC.map((tile, i) => (
						<img
							key={`${tile.left}-${tile.top}`}
							src={pick(i)}
							alt=""
							className={s.tile()}
							style={{
								left: tile.left,
								top: tile.top,
								width: tile.width,
								height: tile.height,
							}}
						/>
					))
				: null}
			{pics.length && variant === "split" ? (
				<img src={pick(0)} alt="" className={s.panel()} />
			) : null}
			<div className={s.mark()}>
				<div className={s.wordmark()}>
					{logo ? <img src={logo} alt="" className={s.logo()} /> : null}
					<span className={s.name()}>{name}</span>
				</div>
				{tagline ? <p className={s.tagline()}>{tagline}</p> : null}
			</div>
		</div>
	);
}
