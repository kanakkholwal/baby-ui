<script lang="ts">
import {
	WeekCalendar,
	type WeekCalendarVariant,
	type WeekStartsOn,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

{#key props.defaultExpanded}
	<WeekCalendar
		defaultExpanded={Boolean(props.defaultExpanded ?? false)}
		weekStartsOn={Number(props.weekStartsOn ?? 0) as WeekStartsOn}
		locale={(props.locale as string) ?? "en-US"}
		variant={(props.variant as WeekCalendarVariant) ?? "card"}
	/>
{/key}
