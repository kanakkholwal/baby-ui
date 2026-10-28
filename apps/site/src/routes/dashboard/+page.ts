import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const prerender = false;

// The dashboard split into /account and /account/downloads; old links land on the first.
export const load: PageLoad = () => redirect(308, "/account");
