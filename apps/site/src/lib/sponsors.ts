export type Sponsor = {
	name: string;
	/** One line on what they do. */
	tagline: string;
	href: string;
	/** A square logo; the first letter stands in when there is none. */
	logo?: string;
};

export type SponsorTier = { label: string; sponsors: Sponsor[] };

/** Where someone goes to back the project. */
export const SPONSOR_URL = "https://github.com/sponsors/kanakkholwal";

/** Sponsors by tier, shown under the promo in the page rail. Empty until someone sponsors. */
export const SPONSORS: SponsorTier[] = [];
