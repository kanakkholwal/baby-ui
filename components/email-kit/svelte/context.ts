import { getContext, setContext } from "svelte";
import type { EmailShellSurface } from "../variants";

const KEY = Symbol("email-surface");

export function setEmailSurface(surface: () => EmailShellSurface) {
	setContext(KEY, surface);
}

/** The footer's `band` is a strip inside a card; on a plain page it falls back to `plain`. */
export function getEmailSurface(): () => EmailShellSurface {
	return getContext<(() => EmailShellSurface) | undefined>(KEY) ?? (() => "plain");
}
