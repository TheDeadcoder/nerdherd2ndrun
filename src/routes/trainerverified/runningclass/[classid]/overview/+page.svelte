<script lang="ts">
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data;

	let { session, supabase, classNow, studclass, teacherNow, classlive } = data;
	$: ({ session, supabase, classNow, studclass, teacherNow, classlive } = data);

	import { isRunningClass } from '../../../../../stores/isRunningClass';
	const { classid } = $page.params;

	onMount(() => {
		isRunningClass.set({ classid: classid, isClass: true });
	});
	onDestroy(() => {
		isRunningClass.set({ classid: '', isClass: false });
	});
</script>

<main>
	<nav class="appbar">
		<div class="logo-container">
			<Avatar src={classNow.image} width="w-12" rounded="rounded-full" />
			<h1 class="ml-3 text-4xl font-extrabold">{classNow.title}</h1>
		</div>
	</nav>
	<div class="ml-3">
		<div class="card mt-3">
			<header class="card-header text-xl font-extrabold">Syllabus</header>
			<section class="p-4"><i>{classNow.syllabus}</i></section>
		</div>
	</div>
</main>

<style>
	.appbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;

		border-bottom: 1px solid #ccc;
	}

	.logo-container {
		display: flex;
		align-items: center;
	}

	.logo-container img {
		width: 50px;
		margin-right: 1rem;
	}

	.links {
		display: flex;
		list-style: none;
		margin: 0;
	}

	.links li {
		margin-left: 2rem;
	}

	.links a {
		text-decoration: none;

		transition: color 0.2s ease-in-out;
	}

	.links a:hover {
		color: #007bff; /* Accent color from Skeleton UI */
	}
	.sidebar-item {
		display: block;
		padding: 0.75rem 1rem;

		text-decoration: none;
		transition:
			background-color 0.2s,
			color 0.2s;
		border-radius: 0.375rem; /* Tailwind's rounded-md */
	}
	.sidebar-item.active,
	.sidebar-item:hover {
		background-color: #ebebeb; /* Tailwind's gray-100 */
	}

	.sidebar-item:active {
		background-color: #e5e7eb; /* Tailwind's gray-200 */
	}

	@media (prefers-color-scheme: dark) {
		.sidebar-item {
			color: #d1d5db; /* Tailwind's gray-300 */
		}

		.sidebar-item:hover {
			background-color: #374151; /* Tailwind's gray-700 */
			color: #ffffff; /* White text for better contrast */
		}

		.sidebar-item:active {
			background-color: #4b5563; /* Tailwind's gray-600 */
		}
	}
</style>
