import { cn } from "../lib/cn";
import {
	type OgAuthorProfileMode,
	type OgAuthorProfileTone,
	ogAuthorProfile,
} from "./variants";

export type { OgAuthorProfileMode, OgAuthorProfileTone };

export interface OgAuthorProfileProps {
	name: string;
	role?: string;
	bio?: string;
	/** Social handle; a leading "@" is dropped since the icon draws one. */
	handle?: string;
	/** Site or publication name shown top left. */
	site?: string;
	avatar?: string;
	/** Up to three pre-formatted stats, e.g. `{ value: "12.4k", label: "Followers" }`. */
	stats?: { value: string; label: string }[];
	mode?: OgAuthorProfileMode;
	tone?: OgAuthorProfileTone;
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
	stats,
	mode = "light",
	tone = "chart",
	className,
}: OgAuthorProfileProps) {
	const s = ogAuthorProfile({ mode, tone });
	const initials = name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0]?.toUpperCase())
		.join("");
	const shown = stats?.slice(0, 3) ?? [];
	return (
		<div data-slot="og-author-profile" className={cn(s.root(), className)}>
			<div className={s.panel()}>
				<div className={s.dots()} />
				<div className={s.halo()} />
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
					{handle ? (
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
							<span>{handle.replace(/^@/, "")}</span>
						</span>
					) : null}
				</div>
				<div className={s.body()}>
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
