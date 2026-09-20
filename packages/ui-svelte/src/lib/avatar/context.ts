import { createContext } from "svelte";

export type AvatarContext = {
	readonly loaded: boolean;
	setLoaded: (loaded: boolean) => void;
};

export const [getAvatar, setAvatar] = createContext<AvatarContext>();
