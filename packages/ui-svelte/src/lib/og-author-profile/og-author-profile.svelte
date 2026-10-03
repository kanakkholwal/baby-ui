<script lang="ts">
import { cn } from "../lib/cn";
import {
	OG_AUTHOR_PROFILE_CONTOURS,
	type OgAuthorProfileMode,
	type OgAuthorProfileTone,
	type OgAuthorProfileVariant,
	ogAuthorProfile,
} from "./variants";

let {
	name,
	role,
	bio,
	handle,
	site,
	avatar,
	label,
	stats,
	mode = "light",
	tone = "neutral",
	variant = "default",
	class: className,
}: {
	name: string;
	role?: string;
	/** In `editorial`, each line break starts a new staggered line. */
	bio?: string;
	/** Social handle; a leading "@" is dropped. The motto beside the site in `pass`. */
	handle?: string;
	/** Site or publication name shown top left. */
	site?: string;
	avatar?: string;
	/** Caption over the name, e.g. "Author", or "Passenger" on the `pass` ticket. */
	label?: string;
	/** Up to three pre-formatted stats, e.g. `{ value: "12.4k", label: "Followers" }`. */
	stats?: { value: string; label: string }[];
	mode?: OgAuthorProfileMode;
	tone?: OgAuthorProfileTone;
	variant?: OgAuthorProfileVariant;
	class?: string;
} = $props();

const s = $derived(ogAuthorProfile({ mode, tone, variant }));
const initials = $derived(
	name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0]?.toUpperCase())
		.join(""),
);
const shown = $derived(stats?.slice(0, 3) ?? []);
const motto = $derived(handle?.replace(/^@/, ""));
const lines = $derived([name, ...(bio?.split("\n") ?? [])].filter(Boolean).slice(0, 6));
</script>

{#if variant === "editorial"}
	<div data-slot="og-author-profile" class={cn(s.root(), className)}>
		<div class={s.circle()}></div>
		<div class={cn(s.cross(), "top-[315px] left-[588px] h-px w-6")}></div>
		<div class={cn(s.cross(), "top-[303px] left-[600px] h-6 w-px")}></div>
		<div class={s.lines()}>
			{#each lines as line, i (`${i}-${line}`)}
				<span class={cn(s.line(), i % 2 === 1 && s.indent())}>{line}</span>
			{/each}
		</div>
	</div>
{:else if variant === "pass"}
	<div data-slot="og-author-profile" class={cn(s.root(), className)}>
		<div class={s.ticket()}>
			<div class={s.stripes()}></div>
			<svg
				viewBox="0 0 460 440"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				class={s.contour()}
				aria-hidden="true"
			>
				{#each OG_AUTHOR_PROFILE_CONTOURS as d (d)}<path {d} />{/each}
			</svg>
			<div class={s.ticketHeader()}>
				{#if avatar}<img src={avatar} alt="" class={s.emblem()} />{/if}
				{#if site}<span class={s.airline()}>{site}</span>{/if}
				{#if motto}
					<span class={s.bar()}></span>
					<span class={s.motto()}>{motto}</span>
				{/if}
			</div>
			<div class="relative mt-[44px] flex flex-col gap-2">
				{#if label}<span class={s.field()}>{label}</span>{/if}
				<span class={s.passenger()}>{name}</span>
				{#if role}<span class={s.job()}>{role}</span>{/if}
			</div>
			{#if shown.length}
				<div class={s.fields()}>
					{#each shown as stat (stat.label)}
						<div class="flex flex-col gap-3">
							<span class={s.field()}>{stat.label}</span>
							<span class={s.fieldValue()}>{stat.value}</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div data-slot="og-author-profile" class={cn(s.root(), className)}>
		<div class={s.panel()}>
			<div class={s.dots()}></div>
			<div class={cn(s.ring(), "h-[360px] w-[360px]")}></div>
			<div class={cn(s.ring(), "h-[460px] w-[460px]")}></div>
			<div class={s.avatarRing()}>
				{#if avatar}
					<img src={avatar} alt="" class={s.avatar()} />
				{:else}
					<span class={s.initials()}>{initials}</span>
				{/if}
			</div>
		</div>
		<div class={s.content()}>
			<div class={s.header()}>
				<span class={s.site()}>{site}</span>
				{#if motto}
					<span class={s.handle()}>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class={s.handleIcon()}
							aria-hidden="true"
						>
							<path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
							<path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
						</svg>
						<span>{motto}</span>
					</span>
				{/if}
			</div>
			<div class={s.body()}>
				{#if label}<span class={s.label()}>{label}</span>{/if}
				<h1 class={s.name()}>{name}</h1>
				{#if role}<p class={s.role()}>{role}</p>{/if}
				{#if bio}<p class={s.bio()}>{bio}</p>{/if}
			</div>
			{#if shown.length}
				<div class={s.stats()}>
					{#each shown as stat, i (stat.label)}
						<div class={s.statCell()}>
							{#if i > 0}<div class={s.divider()}></div>{/if}
							<div class={s.stat()}>
								<span class={s.statValue()}>{stat.value}</span>
								<span class={s.statLabel()}>{stat.label}</span>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
