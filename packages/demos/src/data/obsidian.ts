/** Sample lines for the text-reel demos; real apps pass their own. */
export const REEL_ITEMS = ["Design", "Build", "Ship", "Iterate", "Measure"];

/** Sample photo cards for the draggable-marquee demos. */
export const MARQUEE_TILES = [
	{ title: "Coastline", meta: "Iceland", src: "https://picsum.photos/id/1036/480/320" },
	{ title: "Pier", meta: "Norway", src: "https://picsum.photos/id/1043/480/320" },
	{ title: "Summit", meta: "Alps", src: "https://picsum.photos/id/1050/480/320" },
	{ title: "Harbour", meta: "Portugal", src: "https://picsum.photos/id/1057/480/320" },
	{ title: "Old town", meta: "Prague", src: "https://picsum.photos/id/1067/480/320" },
	{ title: "Deep blue", meta: "Pacific", src: "https://picsum.photos/id/1069/480/320" },
];

const PHOTO = (id: number) => `https://picsum.photos/id/${id}/600/600`;

/** Sample tiles for the art-gallery demos: Picsum stock photos, served with CORS headers. */
export const GALLERY_ITEMS = [
	{ src: PHOTO(1015), title: "River Bend", caption: "2024" },
	{ src: PHOTO(1016), title: "Canyon", caption: "2023" },
	{ src: PHOTO(1018), title: "Highlands", caption: "2024" },
	{ src: PHOTO(1019), title: "Low Tide", caption: "2022" },
	{ src: PHOTO(1020), title: "Snowline", caption: "2024" },
	{ src: PHOTO(1021), title: "Fog Field", caption: "2023" },
	{ src: PHOTO(1022), title: "Aurora", caption: "2024" },
	{ src: PHOTO(1024), title: "Vulture", caption: "2022" },
	{ src: PHOTO(1025), title: "Pug Study", caption: "2023" },
	{ src: PHOTO(1027), title: "Portrait", caption: "2024" },
];
