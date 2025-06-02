import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Get initial language from localStorage or default to 'en'
const storedLanguage = browser ? localStorage.getItem('language') : null;
export const language = writable(storedLanguage || 'en');

// Subscribe to language changes and update localStorage
if (browser) {
	language.subscribe((value) => {
		localStorage.setItem('language', value);
	});
}
