/** Sample scouting comparison for radar demos; values are 0 to 100 ratings. */
export const RADAR_METRICS = [
	{ key: "pace", label: "Pace" },
	{ key: "shooting", label: "Shooting" },
	{ key: "passing", label: "Passing" },
	{ key: "dribbling", label: "Dribbling" },
	{ key: "defending", label: "Defending" },
	{ key: "physical", label: "Physical" },
];

export const RADAR_SERIES = [
	{
		label: "Forward",
		values: {
			pace: 88,
			shooting: 84,
			passing: 70,
			dribbling: 86,
			defending: 34,
			physical: 72,
		},
	},
	{
		label: "Midfielder",
		values: {
			pace: 72,
			shooting: 68,
			passing: 90,
			dribbling: 80,
			defending: 66,
			physical: 70,
		},
	},
	{
		label: "Defender",
		values: {
			pace: 64,
			shooting: 42,
			passing: 66,
			dribbling: 58,
			defending: 89,
			physical: 84,
		},
	},
];
