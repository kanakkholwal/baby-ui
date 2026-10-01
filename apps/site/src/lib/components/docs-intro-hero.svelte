<script lang="ts">
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Checkbox,
	ColorPicker,
	FieldSeparator,
	Input,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	Label,
	Slider,
	Switch,
	ToggleGroup,
	ToggleGroupItem,
} from "@baby-ui/svelte";

// A live collage of base components; every control works.
let code = $state("4320");
let range = $state("1d");
let price = $state(250);
let notify = $state(true);
let terms = $state(true);
let brand = $state("#2f6fdb");
</script>

<section
	aria-label="Baby UI components"
	class="not-prose grid gap-8 rounded-2xl border border-border bg-card p-6 md:grid-cols-3 md:p-8"
>
	<div class="flex flex-col gap-6">
		<div class="flex flex-col gap-1.5">
			<Label for="intro-email" required>Your email</Label>
			<Input id="intro-email" type="email" placeholder="john@email.com" />
			<p class="text-muted-foreground text-xs">We won't share your email</p>
		</div>
		<div class="flex flex-col gap-1.5">
			<Label for="intro-brand">Brand colour</Label>
			<ColorPicker variant="field" id="intro-brand" bind:value={brand} label="Brand colour" />
		</div>
		<div class="flex items-center gap-5">
			<Switch bind:checked={notify} label="Notify" />
			<Checkbox bind:checked={terms} label="Terms" />
		</div>
		<Slider
			bind:value={price}
			max={500}
			step={10}
			label="Price"
			showValue
			formatValue={(v) => `$${v}.00`}
		/>
	</div>

	<div class="flex flex-col gap-6">
		<div class="flex flex-col gap-2">
			<p class="font-medium text-foreground text-sm">Verify account</p>
			<p class="text-muted-foreground text-sm">We sent a code to a****@gmail.com</p>
			<InputOTP maxlength={6} bind:value={code} aria-label="Verification code">
				{#snippet children({ cells })}
					<InputOTPGroup>
						{#each cells as cell (cell)}
							<InputOTPSlot {cell} />
						{/each}
					</InputOTPGroup>
				{/snippet}
			</InputOTP>
		</div>
		<div class="grid grid-cols-3 gap-2">
			<Button size="sm">Click me</Button>
			<Button size="sm" variant="default_soft">Click me</Button>
			<Button size="sm" variant="secondary">Click me</Button>
			<Button size="sm" variant="destructive">Click me</Button>
			<Button size="sm" variant="destructive_soft">Click me</Button>
			<Button size="sm" variant="ghost">Click me</Button>
		</div>
		<ToggleGroup bind:value={range} label="Range" class="self-start">
			<ToggleGroupItem value="1d">1D</ToggleGroupItem>
			<ToggleGroupItem value="7d">7D</ToggleGroupItem>
			<ToggleGroupItem value="1m">1M</ToggleGroupItem>
			<ToggleGroupItem value="1y">1Y</ToggleGroupItem>
		</ToggleGroup>
	</div>

	<Card class="self-start">
		<CardHeader>
			<CardTitle>Create an account</CardTitle>
			<CardDescription>Start your free 7-day trial. No card required.</CardDescription>
		</CardHeader>
		<CardContent class="flex flex-col gap-2">
			<Button>Get started</Button>
			<FieldSeparator class="my-1 [&>[data-slot=field-separator-content]]:bg-card">OR</FieldSeparator>
			<Button variant="outline">Continue with Google</Button>
			<Button variant="outline">Continue with Apple</Button>
		</CardContent>
	</Card>
</section>
