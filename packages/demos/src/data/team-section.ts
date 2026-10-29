import { avatar } from "./media";

/** Stroke paths on a 24px grid for the member links. */
export const TEAM_LINK_ICON = {
	site: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z",
	mail: "M4 6h16v12H4zM4 7l8 6 8-6",
};

const member = (name: string, role: string, face: number, bio: string) => ({
	name,
	role,
	bio,
	// 480px so the cards portrait stays sharp; the round faces reuse it.
	avatar: avatar(face, 480),
	links: [
		{ kind: "site" as const, href: "#", label: `${name}'s site` },
		{ kind: "mail" as const, href: "#", label: `Email ${name}` },
	],
});

export const TEAM_SECTION = {
	title: "The people behind the product",
	description:
		"A small team across four time zones, shipping every week and answering support ourselves.",
	groups: [
		{
			title: "Leadership",
			members: [
				member(
					"Maya Okafor",
					"Co-founder, CEO",
					47,
					"Ran product at two payments startups.",
				),
				member(
					"Daniel Reyes",
					"Co-founder, CTO",
					12,
					"Built the sync engine on a long weekend.",
				),
				member("Priya Raman", "Head of Design", 45, "Draws every icon twice."),
				member("Tom Becker", "Head of Growth", 15, "Turns support tickets into roadmap."),
			],
		},
		{
			title: "Engineering",
			members: [
				member(
					"Lena Novak",
					"Staff Engineer",
					32,
					"Keeps the p99 under a hundred milliseconds.",
				),
				member(
					"Sam Adeyemi",
					"Frontend Engineer",
					53,
					"Animates things nobody asked to animate.",
				),
				member(
					"Hana Sato",
					"Platform Engineer",
					44,
					"Owns deploys, on-call and the coffee rota.",
				),
				member("Owen Clarke", "Mobile Engineer", 59, "Ships the iOS app from a train."),
			],
		},
	],
};
