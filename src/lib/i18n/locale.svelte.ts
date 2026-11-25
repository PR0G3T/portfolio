import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { getContext } from 'svelte';
import type { CvData } from '#lib/cv/types.js';
import cv from '#lib/data/cv.js';
import { localizeCv } from './localize.js';
import { DEFAULT_LOCALE, UI, type Locale, type UiStrings } from './ui.js';

export const LOCALE_STORAGE_KEY = 'cv-locale';
export const LOCALE_CONTEXT = Symbol('cv-locale');

export const isLocale = (value: unknown): value is Locale => value === 'fr' || value === 'en';

export interface LocaleState {
	readonly locale: Locale;
	readonly ui: UiStrings;
	readonly cv: CvData;
	setLocale: (next: Locale, options?: { persist?: boolean; updateUrl?: boolean }) => void;
	syncFromEnvironment: () => void;
}

/** URL first (shareable), then localStorage, then English. */
export const detectLocale = (): Locale => {
	if (!browser) return DEFAULT_LOCALE;

	const match = window.location.search.match(/[?&]lang=(fr|en)(?:&|$)/);
	const fromUrl = match?.[1] ?? null;
	if (isLocale(fromUrl)) return fromUrl;

	try {
		const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
		if (isLocale(stored)) return stored;
	} catch {
		// Storage can be unavailable in private browsing; English remains a safe default.
	}

	return DEFAULT_LOCALE;
};

export const createLocaleState = (initial: Locale = DEFAULT_LOCALE): LocaleState => {
	let locale = $state<Locale>(initial);
	const ui = $derived(UI[locale]);
	const localizedCv = $derived(localizeCv(cv, locale));

	const setLocale = (
		next: Locale,
		options: { persist?: boolean; updateUrl?: boolean } = {}
	): void => {
		locale = next;
		if (!browser) return;

		document.documentElement.lang = next;

		if (options.persist !== false) {
			try {
				localStorage.setItem(LOCALE_STORAGE_KEY, next);
			} catch {
				// The selector still works for the current page.
			}
		}

		if (options.updateUrl !== false) {
			const pathname = resolve('/(portfolio)');
			const target = next === DEFAULT_LOCALE ? pathname : `${pathname}?lang=${next}`;
			// Dynamic query string built from a resolved pathname.
			// eslint-disable-next-line svelte/no-navigation-without-resolve
			void goto(target, { replace: true, reset: false }).catch(() => undefined);
		}
	};

	const syncFromEnvironment = (): void => {
		setLocale(detectLocale(), { persist: false, updateUrl: false });
	};

	return {
		get locale() {
			return locale;
		},
		get ui() {
			return ui;
		},
		get cv() {
			return localizedCv;
		},
		setLocale,
		syncFromEnvironment
	};
};

export const getLocaleContext = (): LocaleState => {
	const context = getContext<LocaleState | undefined>(LOCALE_CONTEXT);
	if (!context) throw new Error('Locale context is not available');
	return context;
};
