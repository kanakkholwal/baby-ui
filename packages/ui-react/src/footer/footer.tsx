import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { type FooterLayout, footer } from "./variants";

export type { FooterLayout };

export type FooterLink = { label: string; href: string; external?: boolean };
export type FooterColumn = { title: string; links: FooterLink[] };
export type FooterSocialLink = { icon: ReactNode; href: string; label: string };

export interface FooterProps {
	brand?: ReactNode;
	description?: string;
	columns: FooterColumn[];
	socials?: FooterSocialLink[];
	copyright?: ReactNode;
	/** Giant background wordmark text; omit to skip that section entirely. */
	wordmark?: string;
	/** Brand beside the link columns, or centred above them. */
	layout?: FooterLayout;
	className?: string;
}

export function Footer({
	brand,
	description,
	columns,
	socials = [],
	copyright,
	wordmark,
	layout = "split",
	className,
}: FooterProps) {
	const styles = footer({ layout });
	return (
		<footer
			data-slot="footer"
			data-layout={layout}
			className={cn(styles.root(), className)}
		>
			<div className={styles.inner()}>
				<div className={styles.grid()}>
					<div className={styles.brandBlock()}>
						{brand ? (
							<span className="inline-flex items-center gap-2.5">{brand}</span>
						) : null}
						{description ? <p className={styles.description()}>{description}</p> : null}
						{socials.length ? (
							<div className={styles.socials()}>
								{socials.map(({ icon, href, label }) => (
									<a
										key={href}
										href={href}
										aria-label={label}
										target={href.startsWith("http") ? "_blank" : undefined}
										rel={href.startsWith("http") ? "noreferrer" : undefined}
										className={styles.social()}
									>
										{icon}
									</a>
								))}
							</div>
						) : null}
						{copyright ? <p className={styles.copyright()}>{copyright}</p> : null}
					</div>

					<div className={styles.columns()}>
						{columns.map((column) => (
							<div key={column.title}>
								<h4 className={styles.columnTitle()}>{column.title}</h4>
								<ul className={styles.links()}>
									{column.links.map((link) => (
										<li key={link.href}>
											<a
												href={link.href}
												target={link.external ? "_blank" : undefined}
												rel={link.external ? "noreferrer" : undefined}
												className={styles.link()}
											>
												{link.label}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>

			{wordmark ? (
				<div className={styles.wordmarkWrap()}>
					<span className={styles.wordmark()}>{wordmark}</span>
				</div>
			) : null}
		</footer>
	);
}
