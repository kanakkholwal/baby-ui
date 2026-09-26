import { cn } from "../lib/cn";
import { type OgBlogPostMode, type OgBlogPostTone, ogBlogPost } from "./variants";

export type { OgBlogPostMode, OgBlogPostTone };

export interface OgBlogPostProps {
	title: string;
	/** Site or publication name shown top left. */
	site: string;
	logo?: string;
	excerpt?: string;
	category?: string;
	author?: { name: string; avatar?: string };
	date?: string;
	readingTime?: string;
	mode?: OgBlogPostMode;
	tone?: OgBlogPostTone;
	className?: string;
}

/** A 1200x630 blog post card. Render it to PNG with takumi-js (see the docs recipe). */
export function OgBlogPost({
	title,
	site,
	logo,
	excerpt,
	category,
	author,
	date,
	readingTime,
	mode = "light",
	tone = "chart",
	className,
}: OgBlogPostProps) {
	const s = ogBlogPost({ mode, tone });
	const meta = [date, readingTime].filter(Boolean);
	return (
		<div data-slot="og-blog-post" className={cn(s.root(), className)}>
			<div className={s.grid()} />
			<div className={s.glow()} />
			<div className={s.header()}>
				<div className={s.brand()}>
					{logo ? <img src={logo} alt="" className={s.logo()} /> : null}
					<span>{site}</span>
				</div>
				{category ? <span className={s.category()}>{category}</span> : null}
			</div>
			<div className={s.body()}>
				<h1 className={s.title()}>{title}</h1>
				{excerpt ? <p className={s.excerpt()}>{excerpt}</p> : null}
			</div>
			{author || meta.length ? (
				<div className={s.footer()}>
					{author?.avatar ? (
						<img src={author.avatar} alt="" className={s.avatar()} />
					) : null}
					{author ? <span className={s.author()}>{author.name}</span> : null}
					{meta.map((item) => (
						<span key={item} className="flex items-center gap-5">
							<span className={s.dot()} />
							<span className={s.meta()}>{item}</span>
						</span>
					))}
				</div>
			) : null}
		</div>
	);
}
