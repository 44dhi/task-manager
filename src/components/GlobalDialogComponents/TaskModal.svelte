<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { getGlobalDialogState } from '$lib/state/GlobalDialog.svelte';
	import { getTaskState, type Task } from '$lib/state/taskState.svelte';
	import { Plus, Save } from 'lucide-svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { format } from 'date-fns';

	const globalDialogState = getGlobalDialogState();
	const type = $derived(globalDialogState.data.type);
	const taskState = getTaskState();
	const taskCount = taskState.taskCategories.reduce(
		(acc, category) => acc + category.items.length,
		0
	);

	const defaultTask: Task = {
		title: `New Task #${taskCount + 1}`,
		description: '',
		id: uuidv4(),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		status: 'todo'
	};

	let currentTask = $state<Task>(defaultTask);

	function onchange(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		currentTask.description = target.value;
	}

	function handleTitleInput(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	}

	function sanitizeTitle(title: string): string {
		return title
			.replace(/<[^>]*>/g, '') // Remove HTML tags
			.replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
			.replace(/[\n\r]+/g, ' ') // Replace newlines with space
			.replace(/\s+/g, ' ') // Replace multiple spaces with single space
			.trim();
	}

	function onsave() {
		currentTask.title = sanitizeTitle(currentTask.title);

		if (type === 'edit') {
			taskState.editTask(currentTask);
		}

		if (type === 'add') {
			taskState.addTask(currentTask);
		}

		globalDialogState.closeGlobalDialog();
	}

	function oncancel() {
		globalDialogState.closeGlobalDialog();
	}

	$effect(() => {
		if (globalDialogState.open) {
			if (type === 'edit' && globalDialogState.data.task) {
				currentTask = { ...globalDialogState.data.task };
			} else {
				currentTask = { ...defaultTask };
			}
		}
	});
</script>

<Dialog.Content class="gap-3">
	<Dialog.Header>
		<Dialog.Title class="!text-sm text-zinc-500 !mb-0 flex gap-2 ">
			<span>
				{type === 'edit' ? 'Edit Task' : 'Add Task'}
			</span>
			{#if type === 'edit'}
				<span>|</span>
				<span>
					Last updated: {format(new Date(currentTask.updatedAt), 'MMM dd, yyyy')}
				</span>
			{/if}
		</Dialog.Title>
	</Dialog.Header>
	<h3
		placeholder="Title"
		class="text-2xl font-bold py-1 transition-all duration-300 focus:outline-none border-b border-transparent focus:border-zinc-600 focus:ring-0"
		bind:innerHTML={currentTask.title}
		contenteditable="true"
		onkeydown={handleTitleInput}
	></h3>
	<textarea
		placeholder="Description"
		value={currentTask?.description}
		{onchange}
		class=" h-42 resize-none p-2 py-2.5 border text-base border-zinc-800 rounded-md bg-secondary"
	></textarea>
	<div class="flex gap-2 justify-end mt-2">
		<Button type="button" variant="outline" onclick={oncancel}>Cancel</Button>
		<Button onclick={onsave}>
			{#if type === 'edit'}
				<Save />
				<span>Save Changes</span>
			{:else}
				<Plus />
				<span>Add Task</span>
			{/if}
		</Button>
	</div>
</Dialog.Content>
