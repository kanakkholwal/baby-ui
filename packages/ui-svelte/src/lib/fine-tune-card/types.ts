export type FineTuneField = {
	key: string;
	label: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	suffix?: string;
};

export type FineTuneCardLabels = {
	title?: string;
	layout?: string;
	type?: string;
	placeholder?: string;
	adjust?: string;
	edited?: string;
};

export type FineTuneState = {
	segment: number;
	values: Record<string, number>;
	type: string;
};
