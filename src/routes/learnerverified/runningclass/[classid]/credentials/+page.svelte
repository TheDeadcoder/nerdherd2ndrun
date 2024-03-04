<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data;

	let { session, supabase, classNow, credentials, studentNow, teacherNow } = data;
	$: ({ session, supabase, classNow, credentials, studentNow, teacherNow } = data);

	import { isLearnerInClass } from '../../../../../stores/isLearnerInClass';

	onMount(() => {
		isLearnerInClass.set({ classid: classNow.id, isClass: true });
	});
	onDestroy(() => {
		isLearnerInClass.set({ classid: '', isClass: false });
	});
</script>

<main>
	<!-- <nav class="appbar">
		<div class="logo-container">
			<Avatar src={classNow.image} width="w-12" rounded="rounded-full" />
			<h1 class="ml-3 text-4xl font-extrabold">{classNow.title}</h1>
		</div>
	</nav> -->
	<section class="card border-b-2 shadow-md hover:shadow-2xl p-6 ml-20 mr-20 mt-16">
		<div class="flex flex-row space-x-6 items-center justify-center">
			<img
				src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/medal-champion-award-winner-olympic-6-svgrepo-com.svg"
				alt="Dashboard Icon"
				class="h-16 mr-1 hover:rotate-12"
			/>
			<h1 class="font-extrabold text-4xl font-serif mt-2">Acknowledgement For Excellence</h1>
		</div>
		<p class="font-mono text-xl mt-6">
			This Cretificate hereby states that
			<a href="/viewonly/student/{studentNow.id}">
				<u>{studentNow.name}</u>
			</a>
			has been acknowledged by his trainer
			<a href="/viewonly/teacher/{teacherNow.id}">
				<u>{teacherNow.name}</u>
			</a>
			of class "{classNow.title}" by the following message
		</p>
		<p class="font-bold font-mono text-xl text-center mt-6">
			<i>"{credentials[0].body}"</i>
		</p>
	</section>
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
