import { defineComponent } from "../index.ts";

const sizeProp = {
	name: "size",
	type: '"sm" | "md" | "lg"',
	description: "Field height and width.",
	default: "md",
	control: { kind: "select" as const, options: ["sm", "md", "lg"] },
};

const popoverMotion = {
	springs: [],
	reducedMotion: "The popover appears and leaves without scaling.",
	behaviour: [
		"The popover grows from its trigger on the shared anchored contract: 200ms in, 120ms out.",
	],
};

const shadcn = {
	source: "shadcn/ui",
	url: "https://github.com/shadcn-ui/ui",
	license: "MIT",
	copyright: "Copyright (c) 2023 shadcn",
};

export const datePicker = defineComponent({
	slug: "date-picker",
	name: "Date Picker",
	description:
		"Typed date field with a calendar popover: parses what you type on blur, in the locale's order.",
	category: "base",
	status: "beta",
	props: [
		{
			name: "value",
			type: "Date | null (React) · DateValue | undefined (Svelte)",
			description:
				"The chosen day. React takes a `Date`; Svelte takes an `@internationalized/date` value, bindable.",
			control: { kind: "none" },
		},
		{
			name: "onValueChange",
			type: "(value) => void",
			description: "Called with the new day, or empty when cleared.",
			control: { kind: "none" },
		},
		{
			name: "locale",
			type: "string",
			description: "BCP 47 locale for parsing typed dates and formatting the field.",
			control: { kind: "select", options: ["en-US", "en-GB", "de-DE", "ja-JP"] },
		},
		{
			name: "min / max",
			type: "Date (React) · DateValue (Svelte)",
			description:
				"Earliest and latest selectable day; typed dates outside show an error.",
			control: { kind: "none" },
		},
		{
			name: "disabledDates / isDateDisabled",
			type: "Matcher | Matcher[] (React) · (date) => boolean (Svelte)",
			description: "Extra unavailable days, in each calendar's own format.",
			control: { kind: "none" },
		},
		{
			name: "captionLayout",
			type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
			description: "Calendar heading style; dropdowns suit far-off dates like birthdays.",
			default: "dropdown",
			control: {
				kind: "select",
				options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
			},
		},
		sizeProp,
		{
			name: "labels",
			type: "Partial<DatePickerLabels>",
			description: "Placeholder, button names and error copy.",
			control: { kind: "none" },
		},
	],
	motion: popoverMotion,
	a11y: {
		keyboard: [
			"Type a date and press Enter or Tab to commit it",
			"Alt+ArrowDown opens the calendar; Escape closes it and returns focus to its button",
			"Arrow keys move by day in the calendar; Enter selects",
		],
		notes: [
			"An invalid or out-of-range date is announced through the field's error, linked by aria-describedby.",
			"The calendar button has aria-haspopup and aria-expanded from the popover primitive.",
		],
	},
	licenseOrigin: shadcn,
	impl: {
		react: {
			entry: "DatePicker",
			files: [
				{ path: "date-picker/date-picker.tsx", type: "registry:ui" },
				{ path: "date-picker/core.ts", type: "registry:ui" },
				{ path: "date-picker/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants", "react-day-picker"],
			registryDependencies: ["calendar", "popover", "input-group", "field", "button"],
		},
		svelte: {
			entry: "DatePicker",
			files: [
				{ path: "date-picker/date-picker.svelte", type: "registry:ui" },
				{ path: "date-picker/core.ts", type: "registry:ui" },
				{ path: "date-picker/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: [
				"clsx",
				"tailwind-merge",
				"tailwind-variants",
				"bits-ui",
				"@internationalized/date",
			],
			registryDependencies: ["calendar", "popover", "input-group", "field", "button"],
		},
	},
	keywords: ["date picker", "datepicker", "calendar popover", "date input", "form"],
});

export const dateRangePicker = defineComponent({
	slug: "date-range-picker",
	name: "Date Range Picker",
	description:
		"Range trigger with a two-month calendar, a presets rail and optional Apply, for reports and bookings.",
	category: "base",
	status: "beta",
	props: [
		{
			name: "value",
			type: "DateRange | undefined",
			description:
				"React: react-day-picker's `{ from, to }`. Svelte: bits-ui's `{ start, end }`, bindable.",
			control: { kind: "none" },
		},
		{
			name: "presets",
			type: "DateRangePreset[]",
			description:
				"Quick ranges built from today. Defaults to Today, Last 7 days, This month and Last 30 days; pass [] to hide the rail.",
			control: { kind: "none" },
		},
		{
			name: "confirm",
			type: "boolean",
			description:
				"Hold the pick in a draft until Apply, instead of committing each click.",
			default: "false",
			control: { kind: "boolean" },
		},
		{
			name: "locale",
			type: "string",
			description: "BCP 47 locale for the trigger's range label.",
			control: { kind: "select", options: ["en-US", "en-GB", "de-DE", "ja-JP"] },
		},
		sizeProp,
		{
			name: "labels",
			type: "Partial<DateRangePickerLabels>",
			description: "Placeholder, presets group name, Apply and Cancel.",
			control: { kind: "none" },
		},
	],
	motion: popoverMotion,
	a11y: {
		keyboard: [
			"Enter or Space on the trigger opens the popover; Escape closes it and returns focus",
			"Tab moves from the presets to the calendar; arrow keys move by day",
		],
		notes: [
			"Presets are toggle buttons in a labelled group; the one matching the range reports aria-pressed.",
			"Two months show from 640px up, one below, so the popover never overflows a phone.",
		],
	},
	licenseOrigin: shadcn,
	impl: {
		react: {
			entry: "DateRangePicker",
			files: [
				{ path: "date-range-picker/date-range-picker.tsx", type: "registry:ui" },
				{ path: "date-range-picker/core.ts", type: "registry:ui" },
				{ path: "date-range-picker/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants", "react-day-picker"],
			registryDependencies: ["range-calendar", "popover", "button"],
		},
		svelte: {
			entry: "DateRangePicker",
			files: [
				{ path: "date-range-picker/date-range-picker.svelte", type: "registry:ui" },
				{ path: "date-range-picker/core.ts", type: "registry:ui" },
				{ path: "date-range-picker/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: [
				"clsx",
				"tailwind-merge",
				"tailwind-variants",
				"bits-ui",
				"@internationalized/date",
			],
			registryDependencies: ["range-calendar", "popover", "button"],
		},
	},
	keywords: ["date range picker", "range", "presets", "report filter", "booking", "form"],
});

export const timePicker = defineComponent({
	slug: "time-picker",
	name: "Time Picker",
	description:
		"Hour and minute segments with AM/PM on a 12-hour clock, stepped by arrow keys or typed.",
	category: "base",
	status: "beta",
	props: [
		{
			name: "value",
			type: "string | null",
			description:
				'24-hour "HH:mm", the same string `<input type="time">` uses. Bindable in Svelte.',
			control: { kind: "none" },
		},
		{
			name: "hourCycle",
			type: "12 | 24",
			description: "Clock style. Defaults to the locale's own.",
			control: { kind: "select", options: ["12", "24"] },
		},
		{
			name: "step",
			type: "number",
			description: "Minutes moved per arrow press, snapping to the step grid.",
			default: "1",
			control: { kind: "select", options: ["1", "5", "15", "30"] },
		},
		{
			name: "locale",
			type: "string",
			description: "BCP 47 locale for the AM/PM label and the default clock.",
			control: { kind: "none" },
		},
		sizeProp,
	],
	motion: {
		springs: [],
		reducedMotion: "Nothing animates.",
		behaviour: [
			"Segments change in place; stepping a time repeats too fast for motion to help.",
		],
	},
	a11y: {
		keyboard: [
			"ArrowUp and ArrowDown step the focused segment; minutes move by `step`",
			"ArrowLeft and ArrowRight move between segments",
			"Digits type a value and jump to the next segment when complete",
			"A or P sets the period; Backspace clears the time",
		],
		notes: [
			"Each segment is a labelled spinbutton with its range and a spoken value, inside a named group.",
		],
	},
	impl: {
		react: {
			entry: "TimePicker",
			files: [
				{ path: "time-picker/time-picker.tsx", type: "registry:ui" },
				{ path: "time-picker/core.ts", type: "registry:ui" },
				{ path: "time-picker/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "TimePicker",
			files: [
				{ path: "time-picker/time-picker.svelte", type: "registry:ui" },
				{ path: "time-picker/core.ts", type: "registry:ui" },
				{ path: "time-picker/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["time picker", "time input", "clock", "booking", "form"],
});
