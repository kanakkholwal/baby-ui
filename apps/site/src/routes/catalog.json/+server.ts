import { json } from "@sveltejs/kit";
import { catalog } from "$lib/server/registry";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = () => json(catalog());
