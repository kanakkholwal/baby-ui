<script lang="ts">
import Checkbox from "../../checkbox/svelte/checkbox.svelte";
import Input from "../../input/svelte/input.svelte";
import { cn } from "../../lib/cn";
import RadioGroup from "../../radio-group/svelte/radio-group.svelte";
import RadioGroupItem from "../../radio-group/svelte/radio-group-item.svelte";
import { questionState } from "./context";

let { class: classProp }: { class?: string } = $props();
const q = questionState("QuestionContent");
const s = $derived(q.styles);
</script>

<!-- The current question's description, its options and an optional free-text answer. -->
{#if q.item}
	{@const item = q.item}
	<div data-slot="question-content" data-open={q.interactive || undefined} class={s.fold()}>
		<div class={s.clip()} inert={!q.interactive}>
			{#key item.id}
				<div class={cn(s.pane(), classProp)}>
					{#if item.description}<p class={s.description()}>{item.description}</p>{/if}
					{#if item.options?.length}
						{#if item.multiple}
							<div class={s.options()}>
								{#each item.options as option (option.value)}
									<Checkbox
										bind:checked={
											() => q.answer.selected.includes(option.value),
											(checked) =>
												q.setAnswer({
													...q.answer,
													selected: checked
														? [...q.answer.selected, option.value]
														: q.answer.selected.filter((v) => v !== option.value),
												})
										}
										disabled={q.busy || option.disabled}
										label={option.label}
										description={option.description}
										class={s.option()}
									/>
								{/each}
							</div>
						{:else}
							<RadioGroup
								bind:value={
									() => q.answer.selected[0] ?? "",
									(value) => {
										q.setAnswer({ selected: [value], custom: "" });
										q.queueAdvance();
									}
								}
								class={s.options()}
							>
								{#each item.options as option (option.value)}
									<RadioGroupItem value={option.value} label={option.label} description={option.description} disabled={q.busy || option.disabled} class={s.option()} />
								{/each}
							</RadioGroup>
						{/if}
					{/if}
					{#if item.allowCustom}
						<Input
							value={q.answer.custom ?? ""}
							disabled={q.busy}
							aria-label={item.customPlaceholder ?? "Another response"}
							placeholder={item.customPlaceholder ?? "Add another response…"}
							oninput={(event) => q.setAnswer({ selected: item.multiple ? q.answer.selected : [], custom: event.currentTarget.value })}
							class={s.custom()}
						/>
					{/if}
				</div>
			{/key}
		</div>
	</div>
{/if}
