import { Check, LayoutList, ListTodo, Loader, ScanEye } from 'lucide-svelte';
import { getContext, setContext } from 'svelte';
import { v4 as uuidv4 } from 'uuid';

export interface TaskCategory {
	name: string;
	color: string;
	label: string;
	icon: typeof ListTodo;
	items: Task[];
}

export interface Task {
	id: string;
	title: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	status: string;
}

export interface TaskState {
	taskCategories: TaskCategory[];
}

class taskState implements TaskState {
	taskCategories = $state([
		{
			name: 'todo',
			color: 'oklch(0.59 0.20 277)',
			label: 'Todo',
			icon: LayoutList,
			items: [
				{
					id: uuidv4(),
					title: 'This is your first task',
					description: 'This is your first task description',
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					status: 'todo'
				}
			]
		},
		{
			name: 'in_progress',
			color: 'oklch(0.77 0.16 70)',
			label: 'In Progress',
			icon: Loader,
			items: []
		},
		{
			name: 'in_review',
			color: 'oklch(0.55 0.02 264)',
			label: 'In Review',
			icon: ScanEye,
			items: []
		},
		{ name: 'done', color: 'oklch(0.72 0.19 150)', label: 'Done', icon: Check, items: [] }
	]);

	editTask(task: Task) {
		const taskCategory = this.taskCategories.find((category) =>
			category.items.some((item) => item.id === task.id)
		);
		if (taskCategory) {
			taskCategory.items = taskCategory.items.map((item) =>
				item.id === task.id
					? {
							...task,
							title: task.title.trim(),
							description: task.description.trim(),
							updatedAt: new Date().toISOString()
						}
					: item
			);
		}
	}

	addTask(task: Task) {
		this.taskCategories
			.find((category) => category.name === task.status)
			?.items.push({ ...task, title: task.title.trim(), description: task.description.trim() });
	}
}

const DEFAULT_KEY = '$task_state';

export const getTaskState = (key = DEFAULT_KEY) => {
	return getContext<taskState>(key);
};

export const setTaskState = (key = DEFAULT_KEY) => {
	const state = new taskState();
	return setContext(key, state);
};
