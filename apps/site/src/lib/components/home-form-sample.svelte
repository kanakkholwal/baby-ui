<script lang="ts">
import { Button, Input, Label, TagInput } from "@baby-ui/svelte";

let email = $state("");
let topics = $state<string[]>([]);
let status = $state("");
let invalid = $state(false);

// A live example, not a mock: it validates and reports, it just never sends anything.
function submit(event: SubmitEvent) {
	event.preventDefault();
	invalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	status = invalid
		? "Enter an email like name@company.com."
		: `Looks good: ${topics.length} topic${topics.length === 1 ? "" : "s"} for ${email}.`;
}
</script>

<form class="flex w-full max-w-sm flex-col gap-5 text-left" novalidate onsubmit={submit}>
	<div class="flex flex-col gap-1.5">
		<Label for="home-form-email">Work email</Label>
		<Input
			id="home-form-email"
			type="email"
			autocomplete="email"
			placeholder="you@company.com"
			bind:value={email}
			{invalid}
			aria-describedby="home-form-status"
		/>
	</div>
	<div class="flex flex-col gap-1.5">
		<span class="font-medium text-sm">Topics</span>
		<TagInput bind:tags={topics} placeholder="Type and press Enter" label="Topics" max={5} />
	</div>
	<div class="flex items-center justify-between gap-3">
		<p id="home-form-status" aria-live="polite" class="min-h-5 text-muted-foreground text-xs">
			{status}
		</p>
		<Button type="submit" size="sm">Continue</Button>
	</div>
</form>
