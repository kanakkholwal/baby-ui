// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		/** From the root +layout.server.ts, so every page has it. */
		interface PageData {
			categories?: import("$lib/registry").NavCategory[];
			total?: number;
			footerPicks?: { slug: string; name: string; href: string }[];
		}
		// interface PageState {}
		// interface Platform {}
	}

	interface ImportMetaEnv {
		readonly VITE_POSTHOG_KEY?: string;
	}
}

export {};
