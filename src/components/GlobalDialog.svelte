<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { getGlobalDialogState } from '$lib/state/GlobalDialog.svelte';
	import TaskModal from './GlobalDialogComponents/TaskModal.svelte';

	let { children } = $props();
	const globalDialogState = getGlobalDialogState();
</script>

{@render children?.()}
<Dialog.Root bind:open={globalDialogState.open}>
	{#if globalDialogState.type === 'task'}
		<TaskModal />
	{/if}
</Dialog.Root>
