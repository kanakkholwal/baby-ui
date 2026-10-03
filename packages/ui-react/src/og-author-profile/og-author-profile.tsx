import { cn } from "../lib/cn";
import {
	OG_AUTHOR_PROFILE_CONTOURS,
	type OgAuthorProfileMode,
	type OgAuthorProfileTone,
	type OgAuthorProfileVariant,
	ogAuthorProfile,
} from "./variants";

export type { OgAuthorProfileMode, OgAuthorProfileTone, OgAuthorProfileVariant };

export interface OgAuthorProfileProps {
	name: string;
	role?: string;
	/** In `editorial`, each line break starts a new staggered line. */
	bio?: string;
	/** Social handle; a leading "@" is dropped. The motto beside the site in `pass`. */
	handle?: string;
	/** Site or publication name shown top left. */
	site?: string;
	avatar?: string;
	/** Caption over the name, e.g. "Author", or "Passenger" on the `pass` ticket. */
	label?: string;
	/** Up to three pre-formatted stats, e.g. `{ value: "12.4k", label: "Followers" }`. */
	stats?: { value: string; label: string }[];
	mode?: OgAuthorProfileMode;
	tone?: OgAuthorProfileTone;
	variant?: OgAuthorProfileVariant;
	className?: string;
}

/** A 1200x630 author profile card. Render it to PNG with takumi-js (see the docs recipe). */
export function OgAuthorProfile({
	name,
	role,
	bio,
	handle,
	site,
	avatar,
	label,
	stats,
	mode = "light",
	tone = "neutral",
	variant = "default",
	className,
}: OgAuthorProfileProps) {
	const s = ogAuthorProfile({ mode, tone, variant });
	const initials = name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0]?.toUpperCase())
		.join("");
	const shown = stats?.slice(0, 3) ?? [];
	const motto = handle?.replace(/^@/, "");

	if (variant === "editorial") {
		const lines = [name, ...(bio?.split("\n") ?? [])].filter(Boolean).slice(0, 6);
		return (
			<div data-slot="og-author-profile" className={cn(s.root(), className)}>
				<div className={s.circle()} />
				<div className={cn(s.cross(), "top-[315px] left-[588px] h-px w-6")} />
				<div className={cn(s.cross(), "top-[303px] left-[600px] h-6 w-px")} />
				<div className={s.lines()}>
					{lines.map((line, i) => (
						<span
							key={`${i}-${line}`}
							className={cn(s.line(), i % 2 === 1 && s.indent())}
						>
							{line}
						</span>
					))}
				</div>
			</div>
		);
	}

	if (variant === "pass") {
		return (
			<div data-slot="og-author-profile" className={cn(s.root(), className)}>
				<div className={s.ticket()}>
					<div className={s.stripes()} />
					<svg
						viewBox="0 0 460 440"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						className={s.contour()}
						aria-hidden="true"
					>
						{OG_AUTHOR_PROFILE_CONTOURS.map((d) => (
							<path key={d} d={d} />
						))}
					</svg>
					<div className={s.ticketHeader()}>
						{avatar ? <img src={avatar} alt="" className={s.emblem()} /> : null}
						{site ? <span className={s.airline()}>{site}</span> : null}
						{motto ? (
							<>
								<span className={s.bar()} />
								<span className={s.motto()}>{motto}</span>
							</>
						) : null}
					</div>
					<div className="relative mt-[44px] flex flex-col gap-2">
						{label ? <span className={s.field()}>{label}</span> : null}
						<span className={s.passenger()}>{name}</span>
						{role ? <span className={s.job()}>{role}</span> : null}
					</div>
					{shown.length ? (
						<div className={s.fields()}>
							{shown.map((stat) => (
								<div key={stat.label} className="flex flex-col gap-3">
									<span className={s.field()}>{stat.label}</span>
									<span className={s.fieldValue()}>{stat.value}</span>
								</div>
							))}
						</div>
					) : null}
				</div>
			</div>
		);
	}

	return (
		<div data-slot="og-author-profile" className={cn(s.root(), className)}>
			<div className={s.panel()}>
				<div className={s.dots()} />
				<div className={cn(s.ring(), "h-[360px] w-[360px]")} />
				<div className={cn(s.ring(), "h-[460px] w-[460px]")} />
				<div className={s.avatarRing()}>
					{avatar ? (
						<img src={avatar} alt="" className={s.avatar()} />
					) : (
						<span className={s.initials()}>{initials}</span>
					)}
				</div>
			</div>
			<div className={s.content()}>
				<div className={s.header()}>
					<span className={s.site()}>{site}</span>
					{motto ? (
						<span className={s.handle()}>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className={s.handleIcon()}
								aria-hidden="true"
							>
								<path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
								<path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
							</svg>
							<span>{motto}</span>
						</span>
					) : null}
				</div>
				<div className={s.body()}>
					{label ? <span className={s.label()}>{label}</span> : null}
					<h1 className={s.name()}>{name}</h1>
					{role ? <p className={s.role()}>{role}</p> : null}
					{bio ? <p className={s.bio()}>{bio}</p> : null}
				</div>
				{shown.length ? (
					<div className={s.stats()}>
						{shown.map((stat, i) => (
							<div key={stat.label} className={s.statCell()}>
								{i > 0 ? <div className={s.divider()} /> : null}
								<div className={s.stat()}>
									<span className={s.statValue()}>{stat.value}</span>
									<span className={s.statLabel()}>{stat.label}</span>
								</div>
							</div>
						))}
					</div>
				) : null}
			</div>
		</div>
	);
}
