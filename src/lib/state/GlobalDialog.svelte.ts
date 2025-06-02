/* eslint-disable @typescript-eslint/no-explicit-any */

import { getContext } from 'svelte';

import { setContext } from 'svelte';

interface GlobalDialogStateProps {
	open: boolean;
	type: string | null;
	data: any;
}

class globalDialogState implements GlobalDialogStateProps {
	open = $state(false);
	type = $state<string | null>(null);
	data = $state<any>(null);

	openGlobalDialog(type: string, data: any) {
		this.open = true;
		this.type = type;
		this.data = data;
	}

	closeGlobalDialog() {
		this.open = false;

		setTimeout(() => {
			this.type = null;
			this.data = null;
		}, 200);
	}
}

const DEFAULT_KEY = '$global_dialog_state';

export const getGlobalDialogState = (key = DEFAULT_KEY) => {
	return getContext<globalDialogState>(key);
};

export const setGlobalDialogState = (key = DEFAULT_KEY) => {
	const state = new globalDialogState();
	return setContext(key, state);
};
