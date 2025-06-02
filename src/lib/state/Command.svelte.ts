import { setContext } from 'svelte';

import { getContext } from 'svelte';

interface CommandStateProps {
	open: boolean;
}

class commandState implements CommandStateProps {
	open = $state(false);

	openCommand() {
		this.open = true;
	}

	closeCommand() {
		this.open = false;
	}
}

const DEFAULT_KEY = '$command_state';

export const getCommandState = (key = DEFAULT_KEY) => {
	return getContext<commandState>(key);
};

export const setCommandState = (key = DEFAULT_KEY) => {
	const state = new commandState();
	return setContext(key, state);
};
