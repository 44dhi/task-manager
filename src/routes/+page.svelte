<script lang="ts">
	import { flip } from 'svelte/animate';

	import { getTaskState, type Task } from '$lib/state/taskState.svelte';
	import TaskCard from '$lib/components/TaskCard/TaskCard.svelte';
	import { dndzone } from 'svelte-dnd-action';

	// Styles
	const flipDurationMs = 200;
	const taskState = getTaskState();

	let gridStyle =
		'col-span-1 flex flex-col gap-5 bg-zinc-800 overflow-auto h-[calc(100vh-144px)] rounded-lg px-3 py-4';

	function handleDndConsiderCards(cid: string, e: { detail: { items: Task[] } }) {
		const categoryIndex = taskState.taskCategories.findIndex((cat) => cat.name === cid);
		if (categoryIndex !== -1) {
			taskState.taskCategories[categoryIndex].items = e.detail.items;
		}
	}

	function handleDndFinalizeCards(cid: string, e: { detail: { items: Task[] } }) {
		const categoryIndex = taskState.taskCategories.findIndex((cat) => cat.name === cid);
		if (categoryIndex !== -1) {
			taskState.taskCategories[categoryIndex].items = e.detail.items;
			taskState.taskCategories = [...taskState.taskCategories];
		}
	}
</script>

<div class="max-width-controller transition-all duration-300 flex flex-col h-full flex-1">
	<div class="md:p-5 max-md:p-4 flex flex-1">
		<div class="w-full grid grid-cols-4 gap-5">
			{#each taskState.taskCategories as category, index (index)}
				<div class={gridStyle}>
					<span class="flex items-center gap-2 justify-between">
						<div class="flex items-center gap-2">
							<category.icon size={20} color={category.color} />
							<span class="text-gray-400 text-sm uppercase !font-bold">{category.label}</span>
						</div>
						<span
							class="{category.name === 'done'
								? 'text-green-400'
								: 'text-zinc-500'} text-sm uppercase !font-bold">{category.items.length}</span
						>
					</span>
					<div
						class="flex flex-col gap-3 h-full"
						use:dndzone={{
							items: category.items,
							flipDurationMs,
							dropTargetStyle: {
								outline: '2px solid rgba(194,65,12,0.5)',
								transition: 'all 0.2s ease-in-out',
								borderRadius: '10px'
							}
						}}
						on:consider={(e) => handleDndConsiderCards(category.name, e)}
						on:finalize={(e) => handleDndFinalizeCards(category.name, e)}
					>
						{#each category.items as task (task.id)}
							<div
								class="bg-zinc-700 rounded-lg cursor-move"
								animate:flip={{ duration: flipDurationMs }}
							>
								<TaskCard {task} />
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
