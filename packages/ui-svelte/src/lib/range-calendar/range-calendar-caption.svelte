<script lang="ts">
import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
import type { RangeCalendar as CalendarPrimitive } from "bits-ui";
import type { CalendarCaptionLayout } from "../calendar/variants";
import RangeCalendarMonthSelect from "./range-calendar-month-select.svelte";
import RangeCalendarYearSelect from "./range-calendar-year-select.svelte";

let {
	captionLayout,
	months,
	monthFormat,
	years,
	yearFormat,
	month,
	locale,
	placeholder = $bindable(),
	monthIndex = 0,
}: {
	captionLayout: CalendarCaptionLayout;
	months?: CalendarPrimitive.MonthSelectProps["months"];
	monthFormat?: CalendarPrimitive.MonthSelectProps["monthFormat"];
	years?: CalendarPrimitive.YearSelectProps["years"];
	yearFormat?: CalendarPrimitive.YearSelectProps["yearFormat"];
	month: DateValue;
	placeholder: DateValue | undefined;
	locale: string;
	monthIndex?: number;
} = $props();

function formatYear(date: DateValue) {
	const d = date.toDate(getLocalTimeZone());
	if (typeof yearFormat === "function") return yearFormat(d.getFullYear());
	return new DateFormatter(locale, { year: yearFormat ?? "numeric" }).format(d);
}

function formatMonth(date: DateValue) {
	const d = date.toDate(getLocalTimeZone());
	if (typeof monthFormat === "function") return monthFormat(d.getMonth() + 1);
	return new DateFormatter(locale, { month: monthFormat ?? "long" }).format(d);
}
</script>

{#snippet monthSelect()}
	<RangeCalendarMonthSelect
		{months}
		{monthFormat}
		value={month.month}
		onchange={(e) => {
			if (!placeholder) return;
			// With several months shown, the select edits its own month, not the first.
			const next = placeholder.set({ month: Number.parseInt(e.currentTarget.value) });
			placeholder = next.subtract({ months: monthIndex });
		}}
	/>
{/snippet}

{#snippet yearSelect()}
	<RangeCalendarYearSelect {years} {yearFormat} value={month.year} />
{/snippet}

{#if captionLayout === "dropdown"}
	{@render monthSelect()}
	{@render yearSelect()}
{:else if captionLayout === "dropdown-months"}
	{@render monthSelect()}
	{#if placeholder}{formatYear(placeholder)}{/if}
{:else if captionLayout === "dropdown-years"}
	{#if placeholder}{formatMonth(placeholder)}{/if}
	{@render yearSelect()}
{:else}
	{formatMonth(month)} {formatYear(month)}
{/if}
