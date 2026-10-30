import { avatar } from "./media";

const quote = (
	text: string,
	name: string,
	role: string,
	face: number,
	featured = false,
) => ({
	text,
	name,
	role,
	avatar: avatar(face),
	initials: name
		.split(" ")
		.map((w) => w[0])
		.join(""),
	featured,
});

export const TESTIMONIAL_SECTION = {
	title: "Teams that switched never looked back",
	description: "Thousands of teams plan, ship and report here every day.",
	quotes: [
		quote(
			"We replaced three tools and a weekly status meeting. Planning used to take a morning; now it is a ten minute check-in, and nobody has to chase updates.",
			"Mina Patel",
			"Design systems lead, Northstar",
			47,
			true,
		),
		quote(
			"Setup took an afternoon. The import kept every comment.",
			"Daniel Reyes",
			"CTO, Fieldwork",
			12,
		),
		quote(
			"Our support queue finally talks to the roadmap, so customers hear back when their request ships.",
			"Priya Raman",
			"Head of support, Lumen",
			45,
		),
		quote(
			"Fast enough that people stopped keeping private spreadsheets.",
			"Tom Becker",
			"Ops manager, Harbor",
			15,
		),
		quote(
			"Permissions per project meant we could finally invite contractors without a second workspace.",
			"Lena Novak",
			"Engineering manager, Quill",
			32,
		),
		quote(
			"The weekly digest is the only report our board reads.",
			"Sam Adeyemi",
			"COO, Brightline",
			53,
		),
		quote(
			"Moving from a ticket tracker felt risky. Two weeks in, nobody wanted to go back.",
			"Hana Sato",
			"Product lead, Orbit",
			44,
		),
	],
};
