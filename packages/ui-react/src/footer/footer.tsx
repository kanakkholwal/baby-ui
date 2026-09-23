import type { ReactNode } from "react";
import { cn } from "../lib/cn";

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
	className?: string;
}

export function Footer({
	brand,
	description,
	columns,
	socials = [],
	copyright,
	wordmark,
	className,
}: FooterProps) {
	return (
		<footer
			data-slot="footer"
			className={cn(
				"@container w-full relative border-border border-t bg-card",
				className,
			)}
		>
			<div className="mx-auto max-w-6xl px-6 pt-20 pb-10 @3xl:pt-24 @3xl:pb-12">
				<div className="grid gap-14 @3xl:grid-cols-12">
					<div className="@3xl:col-span-5">
						{brand ? (
							<span className="inline-flex items-center gap-2.5">{brand}</span>
						) : null}
						{description ? (
							<p className="mt-6 max-w-sm text-pretty text-muted-foreground text-sm">
								{description}
							</p>
						) : null}
						{socials.length ? (
							<div className="mt-7 flex items-center gap-2">
								{socials.map(({ icon, href, label }) => (
									<a
										key={href}
										href={href}
										aria-label={label}
										target={href.startsWith("http") ? "_blank" : undefined}
										rel={href.startsWith("http") ? "noreferrer" : undefined}
										className="grid size-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground motion-reduce:transition-none [&_svg]:size-4"
									>
										{icon}
									</a>
								))}
							</div>
						) : null}
						{copyright ? (
							<p className="mt-7 text-muted-foreground text-xs">{copyright}</p>
						) : null}
					</div>

					<div className="grid gap-10 @xl:grid-cols-3 @3xl:col-span-7">
						{columns.map((column) => (
							<div key={column.title}>
								<h4 className="font-semibold text-foreground text-sm">{column.title}</h4>
								<ul className="mt-4 space-y-3">
									{column.links.map((link) => (
										<li key={link.href}>
											<a
												href={link.href}
												target={link.external ? "_blank" : undefined}
												rel={link.external ? "noreferrer" : undefined}
												className="text-muted-foreground text-sm transition-colors hover:text-foreground motion-reduce:transition-none"
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
				<div className="relative overflow-hidden px-4 pb-8 @3xl:pb-10">
					<span className="footer-wordmark block select-none text-center font-semibold text-[22cqw] leading-[0.82] tracking-tight">
						{wordmark}
					</span>
				</div>
			) : null}
		</footer>
	);
}
