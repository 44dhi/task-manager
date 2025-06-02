<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { SvelteComponent } from 'svelte';

	type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, 'type'> &
			({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined }) & {
				icon?: any; // Using any temporarily to fix the type error
			}
	>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		icon,
		...restProps
	}: Props = $props();
</script>

{#if type === 'file'}
	<input
		bind:this={ref}
		data-slot="input"
		class={cn(
			'selection:bg-primary dark:bg-input/30 selection:text-primary-foreground border-input ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-8 w-full min-w-0 rounded-md border bg-transparent px-3 text-sm font-medium outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
			'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
			'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
			className
		)}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<div class="relative flex items-center w-full">
		{#if icon}
			<span class="absolute left-3 top-2 text-muted-foreground">
				<!-- svelte-ignore svelte_component_deprecated -->
				<svelte:component this={icon} size={18} strokeWidth={1.5} />
			</span>
		{/if}
		<input
			bind:this={ref}
			data-slot="input"
			class={cn(
				'border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-8 w-full min-w-0 rounded-md border px-3 text-base outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				icon && 'pl-9',
				className
			)}
			{type}
			bind:value
			{...restProps}
		/>
	</div>
{/if}
