<script lang="ts">
	import { ListTodo, Plus, Search } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	import { getGlobalDialogState } from '$lib/state/GlobalDialog.svelte';
	import { getCommandState } from '$lib/state/Command.svelte';

	const globalDialogState = getGlobalDialogState();
	const commandState = getCommandState();

	function onaddtask() {
		globalDialogState.openGlobalDialog('task', { type: 'add' });
	}
</script>

<div class="border-b border-border">
	<div class="max-width-controller">
		<div class="flex justify-between items-center md:p-5 md:py-4 max-md:p-4 navigation">
			<div class="flex items-center gap-2.5">
				<ListTodo size={32} strokeWidth={1.6} color="oklch(0.65 0.19 41)" />
				<h4 class="text-2xl !mb-0.5 tracking-wide">Task Master</h4>
			</div>
			<div class="flex items-center gap-4">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div onclick={() => commandState.openCommand()} class="cursor-pointer">
					<Input
						class="w-[200px] pointer-events-none"
						icon={Search}
						placeholder="Search Tasks... (⌘K)"
					/>
				</div>
				<Button onclick={onaddtask}>
					<Plus />
					<span>Add Task</span>
				</Button>
			</div>
		</div>
	</div>
</div>

<style>
	.navigation {
		background-color: var(--card);
	}
</style>
