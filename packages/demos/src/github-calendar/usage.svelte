<script lang="ts">
import { GithubCalendar, type GithubCalendarDay } from "@baby-ui/svelte";

let { days }: { days: GithubCalendarDay[] } = $props();
</script>

<GithubCalendar {days} title="@octocat" tone="primary" />
