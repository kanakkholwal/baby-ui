import { cn } from "../lib/cn";
import {
	type OgNewsletterIssueMode,
	type OgNewsletterIssueTone,
	ogNewsletterIssue,
} from "./variants";

export type { OgNewsletterIssueMode, OgNewsletterIssueTone };

export interface OgNewsletterIssueProps {
	/** Newsletter name, set small at the top. */
	publication: string;
	/** Lead story headline, the focal point; clamps to three lines. */
	headline: string;
	/** Pre-formatted issue label, e.g. "No. 42". */
	issue?: string;
	date?: string;
	logo?: string;
	/** One "also inside" headline under the lead. */
	inside?: string;
	insideLabel?: string;
	mode?: OgNewsletterIssueMode;
	tone?: OgNewsletterIssueTone;
	className?: string;
}

/** A 1200x630 newsletter issue card. Render it to PNG with takumi-js (see the docs recipe). */
export function OgNewsletterIssue({
	publication,
	headline,
	issue,
	date,
	logo,
	inside,
	insideLabel = "Also inside",
	mode = "light",
	tone = "chart",
	className,
}: OgNewsletterIssueProps) {
	const s = ogNewsletterIssue({ mode, tone });
	const issueLine = [issue, date].filter(Boolean).join(" · ");
	return (
		<div data-slot="og-newsletter-issue" className={cn(s.root(), className)}>
			<div className={s.masthead()}>
				<div className={s.brand()}>
					{logo ? <img src={logo} alt="" className={s.logo()} /> : null}
					<span className={s.publication()}>{publication}</span>
				</div>
				{issueLine ? <span className={s.issue()}>{issueLine}</span> : null}
			</div>
			<h1 className={s.headline()}>{headline}</h1>
			{inside ? (
				<div className={s.inside()}>
					<span className={s.insideLabel()}>{insideLabel}</span>
					<span className={s.insideText()}>{inside}</span>
				</div>
			) : null}
		</div>
	);
}
