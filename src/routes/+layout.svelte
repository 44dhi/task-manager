<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Navigation from '../components/Navigation.svelte';
	import GlobalDialog from '../components/GlobalDialog.svelte';
	import { setTaskState } from '$lib/state/taskState.svelte';
	import { setGlobalDialogState } from '$lib/state/GlobalDialog.svelte';
	import { getCommandState, setCommandState } from '$lib/state/Command.svelte';
	import CommandProvider from '../components/CommandProvider.svelte';

	let { children } = $props();

	// State initialization
	setTaskState();
	setGlobalDialogState();
	setCommandState();

	const commandState = getCommandState();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			commandState.openCommand();
		}
	}
</script>

<ModeWatcher />
<svelte:document onkeydown={handleKeydown} />

<div class="flex flex-col min-h-screen">
	<Navigation />
	<GlobalDialog>
		<CommandProvider />
		{@render children()}
	</GlobalDialog>
</div>
