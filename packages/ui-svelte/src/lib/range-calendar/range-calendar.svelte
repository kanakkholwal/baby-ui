<script lang="ts">
import { type DateValue, isEqualMonth } from "@internationalized/date";
import { RangeCalendar as CalendarPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import type { ButtonVariant } from "../button/variants";
import type { WithoutChildren } from "../calendar/types";
import {
	type CalendarCaptionLayout,
	type CalendarSize,
	calendar,
} from "../calendar/variants";
import { cn } from "../lib/cn";
import RangeCalendarCaption from "./range-calendar-caption.svelte";
import RangeCalendarCell from "./range-calendar-cell.svelte";
import RangeCalendarDay from "./range-calendar-day.svelte";
import RangeCalendarGrid from "./range-calendar-grid.svelte";
import RangeCalendarGridBody from "./range-calendar-grid-body.svelte";
import RangeCalendarGridHead from "./range-calendar-grid-head.svelte";
import RangeCalendarGridRow from "./range-calendar-grid-row.svelte";
import RangeCalendarHeadCell from "./range-calendar-head-cell.svelte";
import RangeCalendarHeader from "./range-calendar-header.svelte";
import RangeCalendarMonth from "./range-calendar-month.svelte";
import RangeCalendarMonths from "./range-calendar-months.svelte";
import RangeCalendarNav from "./range-calendar-nav.svelte";
import RangeCalendarNextButton from "./range-calendar-next-button.svelte";
import RangeCalendarPrevButton from "./range-calendar-prev-button.svelte";

let {
	ref = $bindable(null),
	value = $bindable(),
	placeholder = $bindable(),
	class: classProp,
	weekdayFormat = "short",
	buttonVariant = "ghost",
	captionLayout = "label",
	size = "md",
	locale = "en-US",
	months: monthsProp,
	years,
	monthFormat: monthFormatProp,
	yearFormat = "numeric",
	day,
	disableDaysOutsideMonth = false,
	...rest
}: WithoutChildren<CalendarPrimitive.RootProps> & {
	buttonVariant?: ButtonVariant;
	captionLayout?: CalendarCaptionLayout;
	size?: CalendarSize;
	months?: CalendarPrimitive.MonthSelectProps["months"];
	years?: CalendarPrimitive.YearSelectProps["years"];
	monthFormat?: CalendarPrimitive.MonthSelectProps["monthFormat"];
	yearFormat?: CalendarPrimitive.YearSelectProps["yearFormat"];
	day?: Snippet<[{ day: DateValue; outsideMonth: boolean }]>;
} = $props();

const monthFormat = $derived(
	monthFormatProp ?? (captionLayout.startsWith("dropdown") ? "short" : "long"),
);
</script>

<CalendarPrimitive.Root
	bind:value
	bind:ref
	bind:placeholder
	{weekdayFormat}
	{disableDaysOutsideMonth}
	{locale}
	{monthFormat}
	{yearFormat}
	data-slot="range-calendar"
	class={cn(calendar({ size }).root(), classProp)}
	{...rest}
>
	{#snippet children({ months, weekdays })}
		<RangeCalendarMonths>
			<RangeCalendarNav>
				<RangeCalendarPrevButton variant={buttonVariant} />
				<RangeCalendarNextButton variant={buttonVariant} />
			</RangeCalendarNav>
			{#each months as month, monthIndex (month)}
				<RangeCalendarMonth>
					<RangeCalendarHeader>
						<RangeCalendarCaption
							{captionLayout}
							months={monthsProp}
							{monthFormat}
							{years}
							{yearFormat}
							month={month.value}
							bind:placeholder
							{locale}
							{monthIndex}
						/>
					</RangeCalendarHeader>
					<RangeCalendarGrid>
						<RangeCalendarGridHead>
							<RangeCalendarGridRow class="select-none">
								{#each weekdays as weekday, i (i)}
									<RangeCalendarHeadCell>{weekday.slice(0, 2)}</RangeCalendarHeadCell>
								{/each}
							</RangeCalendarGridRow>
						</RangeCalendarGridHead>
						<RangeCalendarGridBody>
							{#each month.weeks as weekDates (weekDates)}
								<RangeCalendarGridRow class="mt-2">
									{#each weekDates as date (date)}
										<RangeCalendarCell {date} month={month.value}>
											{#if day}
												{@render day({ day: date, outsideMonth: !isEqualMonth(date, month.value) })}
											{:else}
												<RangeCalendarDay />
											{/if}
										</RangeCalendarCell>
									{/each}
								</RangeCalendarGridRow>
							{/each}
						</RangeCalendarGridBody>
					</RangeCalendarGrid>
				</RangeCalendarMonth>
			{/each}
		</RangeCalendarMonths>
	{/snippet}
</CalendarPrimitive.Root>
