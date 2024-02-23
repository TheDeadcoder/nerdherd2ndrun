<script>
	import { onMount } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	/** @type {import('./$types').PageData} */
	export let data;
	/**
	 * @type {typeof import("./Videocall.svelte").default}
	 */
	let Videocall;
	let inCall = true;

	async function updateSofar() {
		//console.log('Update e aschi');
		let curr = new Date();

		let { data: attendance, error: err1 } = await data.supabase
			.from('attendance')
			.select('*')
			.eq('liveid', data.classLive.id)
			.eq('sid', data.userNow.id);

		let currAtt = attendance[0];

		if (currAtt.joined) {
			let timespent = (Date.parse(curr) - Date.parse(currAtt.joined)) / 1000 + currAtt.time;

			const { data: dt2, error: err2 } = await data.supabase
				.from('attendance')
				.update({ time: timespent, joined: null })
				.eq('liveid', data.classLive.id)
				.eq('sid', data.userNow.id);
		}

		inCall = false;
		// window.location.href = `/commonverified/call/${val}?uid=${studentNow.id}`;
	}

	async function rejoinBack() {
		//console.log('Rejoin e aschi');
		const { data: dt2, error: err2 } = await data.supabase
			.from('attendance')
			.update({ joined: new Date() })
			.eq('liveid', data.classLive.id)
			.eq('sid', data.userNow.id);

		inCall = true;
	}

	async function endClass() {
		//console.log('Rejoin e aschi');
		const { data: dt2, error: err2 } = await data.supabase
			.from('classlive')
			.update({ done: true })
			.eq('id', data.classLive.id);

		window.location.href = `/trainerverified/runningclass/${data.classNow.id}/live`;
	}

	function subscribeToNewMessages() {
		const channels = data.supabase
			.channel('custom-insert-channel')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'classlive' },
				(payload) => {
					console.log('Change received!', payload);
					// Update your messages array to reflect the new message
					// Ensure the new message is added in a way that doesn't duplicate it if you've already optimistically added it to the UI
					const newUpdate = payload.new;
					if (newUpdate.id === data.classLive.id) {
						if (data.isTrainer === false) {
							updateSofar();
							window.location.href = `/learnerverified/runningclass/${data.classNow.id}/live`;
						}
					}
				}
			)
			.subscribe();
	}

	onMount(async () => {
		const module = await import('./Videocall.svelte');
		Videocall = module.default;
		subscribeToNewMessages();

		//console.log(data.isTrainer);
	});
</script>

<section class="p-8">
	<div class="flex flex-row justify-between">
		<div class="flex flex-row space-x-2">
			<Avatar src={data.classNow.image} width="w-12" rounded="rounded-full" />
			<h1 class="ml-3 text-4xl font-extrabold">{data.classNow.title}</h1>
		</div>
		<div class="flex flex-row space-x-2">
			<img
				src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/red-circle-svgrepo-com.svg"
				class="w-6 h-6 mt-1"
				alt="live"
			/>
			<h1 class="ml-3 text-2xl font-bold">Topic: {data.classLive.topic}</h1>
		</div>
	</div>
	<div>
		{#if inCall}
			{#if data.isTrainer}
				<div class="flex flex-row items-center justify-center space-x-4" style="text-align: center">
					<button
						class="btn flex flex-row space-x-2"
						on:click={() => {
							inCall = false;
						}}
						><img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/end-call-icon.svg?t=2024-02-16T05%3A43%3A33.489Z"
							alt="Dashboard Icon"
							class="h-8 mr-1 hover:rotate-12"
						/>
						<h1 class="font-bold">End Call</h1>
					</button>
				</div>
			{:else}
				<div class="flex flex-row items-center justify-center space-x-4" style="text-align: center">
					<button class="btn flex flex-row space-x-2" on:click={updateSofar}
						><img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/end-call-icon.svg?t=2024-02-16T05%3A43%3A33.489Z"
							alt="Dashboard Icon"
							class="h-8 mr-1 hover:rotate-12"
						/>
						<h1 class="font-bold">End Call</h1>
					</button>
				</div>
			{/if}

			<br />
			<svelte:component this={Videocall} {data} />
		{:else}
			<div class="flex flex-row items-center justify-center space-x-4" style="text-align: center">
				{#if data.isTrainer}
					<button class="btn flex flex-row space-x-2" on:click={() => (inCall = true)}>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/phone-call-telephone-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-8 mr-1 hover:rotate-12"
						/>
						<h1 class="font-bold">Rejoin</h1>
					</button>
				{:else}
					<button class="btn flex flex-row space-x-2" on:click={rejoinBack}>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/phone-call-telephone-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-8 mr-1 hover:rotate-12"
						/>
						<h1 class="font-bold">Rejoin</h1>
					</button>
				{/if}

				{#if data.isTrainer}
					<button class="btn flex flex-row space-x-2" on:click={endClass}>
						<img
							src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/power-button-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-8 mr-1 hover:rotate-12"
						/>
						<h1 class="font-bold">End Class For All</h1>
					</button>
				{:else}
					<a href="/learnerverified/runningclass/{data.classNow.id}/live">
						<button class="btn flex flex-row space-x-2">
							<img
								src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/power-button-svgrepo-com.svg"
								alt="Dashboard Icon"
								class="h-8 mr-1 hover:rotate-12"
							/>
							<h1 class="font-bold">Go back To Class</h1>
						</button>
					</a>
				{/if}
			</div>
		{/if}
	</div>
</section>
