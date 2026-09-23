import type { Snippet } from "svelte";

export type FooterLink = { label: string; href: string; external?: boolean };
export type FooterColumn = { title: string; links: FooterLink[] };
export type FooterSocialLink = { icon: Snippet; href: string; label: string };
