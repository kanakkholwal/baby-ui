const photo = (id: number, w: number, h: number) =>
	`https://picsum.photos/id/${id}/${w}/${h}`;

export const TILTED_IMAGES = [10, 11, 15, 16, 17, 20, 28, 29, 37, 42].map((id) => ({
	src: photo(id, 640, 800),
	alt: `Photo ${id}`,
}));

export const STICKY_CARDS = [
	{ title: "Misty Alps", id: 29 },
	{ title: "Sunlit Grove", id: 15 },
	{ title: "Quiet Shore", id: 16 },
	{ title: "Mountain Pass", id: 17 },
	{ title: "Rolling Hills", id: 28 },
].map(({ title, id }) => ({ title, src: photo(id, 920, 580) }));

export const LAYERED_ITEMS = [1, 3, 6, 9, 12, 13, 14, 18].map((id) => ({
	src: photo(id, 500, 640),
	alt: `Photo ${id}`,
}));

export const ORBIT_PEOPLE = [
	{
		name: "Mira Vale",
		role: "Creative Lead",
		description: "Shapes visual systems with restraint and enough edge to be remembered.",
		stat: "Identity",
		image: "https://i.pravatar.cc/480?img=47",
	},
	{
		name: "Noor Kade",
		role: "Product Strategy",
		description: "Turns loose ideas into sharp product moves and crisp priorities.",
		stat: "Roadmap",
		image: "https://i.pravatar.cc/480?img=32",
	},
	{
		name: "Ari Chen",
		role: "Founder",
		description: "Sets the taste bar and keeps the team pointed at the same signal.",
		stat: "Vision",
		href: "#ari-chen",
	},
	{
		name: "Sana Holt",
		role: "Frontend Engineer",
		description: "Builds the motion and polish that make the product feel calm.",
		stat: "Motion",
		image: "https://i.pravatar.cc/480?img=44",
		href: "#sana-holt",
	},
	{
		name: "Ezra Moon",
		role: "Operations",
		description: "Keeps handoffs clean and the team moving without friction.",
		stat: "Systems",
		image: "https://i.pravatar.cc/480?img=12",
	},
];
