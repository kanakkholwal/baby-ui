import { GithubCalendar, type GithubCalendarDay } from "@baby-ui/react";

export function Example({ days }: { days: GithubCalendarDay[] }) {
	return <GithubCalendar days={days} title="@octocat" tone="primary" />;
}
