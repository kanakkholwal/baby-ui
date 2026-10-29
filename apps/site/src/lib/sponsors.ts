export const SPONSORS_URL = "https://github.com/sponsors/kanakkholwal";

export type SponsorTierId = "supporter" | "backer" | "bronze" | "gold";

export type SponsorTier = {
	id: SponsorTierId;
	name: string;
	/** USD per month. */
	price: number;
	benefits: string[];
	/** Logo slots this tier shows; zero lists names only. */
	slots: number;
};

// Priced for an early open-source project: most backing is a few dollars from individuals,
// and an empty $500 tier reads as a reach, so the top tier stays small and few.
export const SPONSOR_TIERS: SponsorTier[] = [
	{
		id: "supporter",
		name: "Supporter",
		price: 3,
		slots: 0,
		benefits: ["Your name on this page", "A sponsor badge on your GitHub profile"],
	},
	{
		id: "backer",
		name: "Backer",
		price: 9,
		slots: 0,
		benefits: ["Everything in Supporter", "Early look at new components"],
	},
	{
		id: "bronze",
		name: "Bronze",
		price: 25,
		slots: 8,
		benefits: ["Small logo on this page", "Logo in the README"],
	},
	{
		id: "gold",
		name: "Gold",
		price: 49,
		slots: 3,
		benefits: ["Large logo on this page and the README", "Logo in the docs sidebar"],
	},
];

export type Sponsor = {
	name: string;
	href: string;
	tier: SponsorTierId;
	/** A logo URL; names-only tiers leave it out. */
	logo?: string;
};

// Real sponsors only, added as they join; every unfilled slot shows as open.
export const SPONSORS: Sponsor[] = [];
