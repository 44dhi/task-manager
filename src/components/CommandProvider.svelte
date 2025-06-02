<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import { getCommandState } from '$lib/state/Command.svelte';
	import { getGlobalDialogState } from '$lib/state/GlobalDialog.svelte';
	import { getTaskState } from '$lib/state/taskState.svelte';
	import type { Task } from '$lib/state/taskState.svelte';

	const commandState = getCommandState();
	const taskState = getTaskState();
	const globalDialogState = getGlobalDialogState();

	function handleSelect(item: Task) {
		commandState.closeCommand();
		setTimeout(() => {
			globalDialogState.openGlobalDialog('task', { type: 'edit', task: item });
		}, 200);
	}
</script>

<Command.Dialog bind:open={commandState.open}>
	<Command.Input placeholder="Search..." class="border-none " />
	<Command.List>
		<Command.Group class="flex flex-col gap-2s" heading={'Tasks'}>
			{#each taskState.taskCategories as category}
				{#each category.items as item}
					<Command.LinkItem
						onSelect={() => {
							handleSelect(item);
						}}>{item.title}</Command.LinkItem
					>
				{/each}
			{/each}
		</Command.Group>
		<Command.Empty class="text-zinc-500">No results found</Command.Empty>
	</Command.List>
</Command.Dialog>
