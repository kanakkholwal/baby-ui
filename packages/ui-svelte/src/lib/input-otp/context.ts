import { getContext, hasContext, setContext } from "svelte";
import type { InputOtpSize } from "./variants";

const SIZE = Symbol("input-otp-size");
export const setInputOtpSize = (get: () => InputOtpSize) => setContext(SIZE, get);
/** The root's size, read lazily so a changed prop reaches every slot. */
export const getInputOtpSize = (): InputOtpSize =>
	hasContext(SIZE) ? getContext<() => InputOtpSize>(SIZE)() : "md";
