<script lang="ts">
	import { getTaskState, type Task } from '$lib/state/taskState.svelte';
	import { format } from 'date-fns';
	import { getGlobalDialogState } from '$lib/state/GlobalDialog.svelte';
	interface TaskCardProps {
		task: Task;
	}

	let { task }: TaskCardProps = $props();
	const globalDialogState = getGlobalDialogState();
	const taskState = getTaskState();

	function getTaskColor(task: Task) {
		return taskState.taskCategories.find((category) =>
			category.items.some((item) => item.id === task.id)
		)?.color;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="bg-zinc-700/50 rounded-lg p-3 cursor-pointer hover:bg-zinc-700/70 transition-all duration-300"
	onclick={() => globalDialogState.openGlobalDialog('task', { task, type: 'edit' })}
>
	<div class="flex items-center gap-2">
		<div class="flex flex-col gap-1.5">
			<h1 class="text-lg font-bold line-clamp-2">
				<div
					class="inline-block !size-[12px] mx-1 outline rounded-full"
					style="outline-color: {getTaskColor(task)};"
				></div>
				{task.title}
			</h1>
			<span class="text-sm text-zinc-300 line-clamp-2">{task.description}</span>
			<div class="flex items-center justify-between gap-2 mt-2">
				<span class="text-xs text-zinc-400">{format(new Date(task.createdAt), 'MMM dd, yyyy')}</span
				>
			</div>
		</div>
	</div>
</div>
