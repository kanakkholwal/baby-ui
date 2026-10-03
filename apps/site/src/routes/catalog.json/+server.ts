import { catalog } from "#lib/server/registry.js";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = () => Response.json(catalog());
