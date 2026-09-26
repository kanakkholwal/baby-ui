<script lang="ts">
import { cn } from "../lib/cn";
import {
	type OgAuthorProfileMode,
	type OgAuthorProfileTone,
	ogAuthorProfile,
} from "./variants";

let {
	name,
	role,
	bio,
	handle,
	site,
	avatar,
	stats,
	mode = "light",
	tone = "chart",
	class: className,
}: {
	name: string;
	role?: string;
	bio?: string;
	/** Social handle; a leading "@" is dropped since the icon draws one. */
	handle?: string;
	/** Site or publication name shown top left. */
	site?: string;
	avatar?: string;
	/** Up to three pre-formatted stats, e.g. `{ value: "12.4k", label: "Followers" }`. */
	stats?: { value: string; label: string }[];
	mode?: OgAuthorProfileMode;
	tone?: OgAuthorProfileTone;
	class?: string;
} = $props();

const s = $derived(ogAuthorProfile({ mode, tone }));
const initials = $derived(
	name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0]?.toUpperCase())
		.join(""),
);
const shown = $derived(stats?.slice(0, 3) ?? []);
</script>

<div data-slot="og-author-profile" class={cn(s.root(), className)}>
	<div class={s.panel()}>
		<div class={s.dots()}></div>
		<div class={s.halo()}></div>
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
			{#if handle}
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
					<span>{handle.replace(/^@/, "")}</span>
				</span>
			{/if}
		</div>
		<div class={s.body()}>
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
