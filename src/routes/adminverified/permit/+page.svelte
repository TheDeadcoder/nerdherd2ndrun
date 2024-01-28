<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';

	export let data;
	let { pendingrequest } = data;
	$: ({ pendingrequest } = data);
	let selectedRequest = null;

	function selectRequest(request) {
		selectedRequest = request;
	}

	function closeRequest() {
		selectedRequest = null;
	}

	function calculateAge(dob) {
		const today = new Date();
		const birthDate = new Date(dob);
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	async function handleaccept() {
		if (selectedRequest) {
			console.log(selectedRequest.email);
			const myemail = selectedRequest.email;
			const mypass = selectedRequest.password;
			const myName = selectedRequest.name;
			const myphone = selectedRequest.mobile;
			const myaddress = selectedRequest.address;

			const { error: err } = await data.supabase
				.from('pendingrequest')
				.delete()
				.eq('email', myemail);

			const { data: commonUserData, error: err1 } = await data.supabase
				.from('commonuser')
				.insert([{ istrainer: true, email: myemail }]);

			if (!err1) {
				let { data: commonUserId, error } = await data.supabase
					.from('commonuser')
					.select('id')
					.eq('email', myemail);

				console.log('hmm');
				console.log(commonUserId[0].id);
				const { data: teacherData, error: teacherError } = await data.supabase
					.from('teacher')
					.insert([
						{
							id: commonUserId[0].id,
							name: myName,
							address: myaddress,
							email: myemail,
							mobile: myphone
						}
					]);

				const { data: dt, error: err } = await data.supabase.auth.signUp({
					email: myemail as string,
					password: mypass as string,
					options: {
						emailRedirectTo: `http://localhost:5173/trainerlogin`
					}
				});
			}
			selectedRequest = null;
		}
	}

	async function handlereject() {
		if (selectedRequest) {
			console.log(selectedRequest.email);
			const myemail = selectedRequest.email;
			const mypass = selectedRequest.password;

			const { error: err } = await data.supabase
				.from('pendingrequest')
				.delete()
				.eq('email', myemail);

			selectedRequest = null;
		}
	}
	const handleSignOut = async () => {
		await data.supabase.auth.signOut();
		window.open('/accessType', '_self');
	};
</script>

<main>
	<div>
		<nav class="appbar">
			<div class="logo-container">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/GeekGlasses.png"
					class="transform transition duration-300 hover:rotate-12"
					alt="title"
					width={60}
				/>
				<span class="company-name text-2xl font-extrabold">NerD</span><span
					class="company-name white-text text-2xl font-extrabold">Admin</span
				>
			</div>
			<ul class="links">
				<li>
					<a href="/adminverified/home" class="flex items-center p-1 font-bold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/home-house-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6 mr-1 hover:rotate-12"
						/>
						Home</a
					>
				</li>
				<li>
					<a href="/adminverified/home" class="flex items-center p-1 font-bold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/robot-one-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6 mr-1 hover:rotate-12"
						/>
						FineTune</a
					>
				</li>
				<li>
					<a href="/adminverified/home" class="flex items-center p-1 font-bold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/add-user-add-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-6 mr-1 hover:rotate-12"
						/>
						Add Trainer</a
					>
				</li>
				<li>
					<LightSwitch />
				</li>
				<li on:click={handleSignOut}>
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/logout-arrows-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-8 mr-1 hover:rotate-12 hover:scale-110"
					/>
				</li>
			</ul>
		</nav>
	</div>
	<div class="flex flex-row p-4">
		<img
			src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/sand-clock-svgrepo-com.svg"
			alt="Dashboard Icon"
			class="w-16 h-16 mr-1 hover:rotate-90 hover:scale-110 text-center"
		/>
		<h1 class="text-2xl font-bold justify-center items-center mt-3">Pending Requests</h1>
	</div>
	<div class="flex p-4">
		<div class="w-1/2 overflow-auto">
			{#each pendingrequest as request}
				<div
					class="cursor-pointer p-4 border-b border-gray-200 hover:bg-gray-100"
					on:click={() => selectRequest(request)}
				>
					<p class="text-lg font-semibold">{request.name}</p>
					<p class="text-sm">{calculateAge(request.dob)} years old</p>
					<p class="text-sm">{request.gender}</p>
				</div>
			{/each}
		</div>

		<!-- Right Column for Request Details -->
		<div class="w-1/2 p-4">
			{#if selectedRequest}
				<div class="relative">
					<button class="absolute top-0 right-0 text-lg p-2" on:click={closeRequest}>✖</button>
					<div class="space-y-2">
						<h2 class="text-xl font-bold">{selectedRequest.name}</h2>
						<p class="font-semibold">
							Age: {calculateAge(selectedRequest.dob)}
							{selectedRequest.gender}
						</p>

						<!-- Add more details as needed -->
					</div>

					<div class="flex">
						<div class="w-1/2 space-y-2">
							<legend class="flex items-center text-lg font-semibold mt-8"
								><img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/internet-education-graduation-svgrepo-com.svg"
									alt="prescription"
									class="w-5 h-5 mr-2 transform transition duration-300 hover:rotate-12"
								/>
								Educational Information</legend
							>
							<div class="ml-7">
								<div class="text-left mb-2">
									<span class="text-sm">State: </span>
									<p class="text-base">Currently {selectedRequest.currstatus}</p>
								</div>
								<div class="text-left mb-2">
									<span class="text-sm">Institute: </span>
									<p class="text-base">{selectedRequest.currins}</p>
								</div>
								<div class="text-left mb-2">
									<span class="text-sm">Highest Academic Degree: </span>
									<p class="text-base">{selectedRequest.highestdeg}</p>
								</div>
								<div class="text-left mb-2">
									<span class="text-sm">Currently Persuing Degree: </span>
									<p class="text-base">{selectedRequest.currdeg}</p>
								</div>
							</div>
						</div>
						<div class="w-1/2 space-y-2">
							<legend class="flex items-center text-lg font-semibold mt-8"
								><img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/connect-svgrepo-com.svg"
									alt="prescription"
									class="w-5 h-5 mr-2 transform transition duration-300 hover:rotate-12"
								/>
								Contact Information</legend
							>
							<div class="ml-7">
								<div class="flex flex-row">
									<img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/telephone-svgrepo-com.svg"
										alt="Dashboard Icon"
										class="h-6 mr-1 hover:rotate-12"
									/>
									{selectedRequest.mobile}
								</div>
								<div class="flex flex-row mt-4 mb-12">
									<img
										src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/email-letter-svgrepo-com.svg"
										alt="Dashboard Icon"
										class="h-6 mr-1 hover:rotate-12"
									/>
									{selectedRequest.email}
								</div>
							</div>
							<legend class="flex items-center text-lg font-semibold"
								><img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/location-pin-svgrepo-com.svg"
									alt="prescription"
									class="w-5 h-5 mr-2 transform transition duration-300 hover:rotate-12"
								/>
								Address</legend
							>
							<div class="ml-7">
								<div class="flex flex-row">
									{selectedRequest.address}
								</div>
							</div>
						</div>
					</div>

					<div class=" mt-4">
						<legend class="flex items-center text-lg font-semibold mt-8"
							><img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/teacher-svgrepo-com.svg"
								alt="prescription"
								class="w-5 h-5 mr-2 transform transition duration-300 hover:rotate-12"
							/>
							Teaching Information</legend
						>
						<div class="ml-7">
							<div class="text-left mb-2">
								<span class="text-sm">Reason of Interest: </span>
								<p class="text-base">{selectedRequest.reasoning}</p>
							</div>
							<div class="text-left mb-2">
								<span class="text-sm">Topic of Interest: </span>
								<p class="text-base">{selectedRequest.interest}</p>
							</div>
						</div>
					</div>
					<div class=" mt-4 flex flex-row">
						<button class="btn variant-filled-success mr-4" on:click={handleaccept}>
							Accept
						</button>
						<button class="btn variant-filled-error" on:click={handlereject}> Reject </button>
					</div>
				</div>
			{:else}
				<p class="text-center text-gray-500">No One to Show</p>
			{/if}
		</div>
	</div>
</main>

<style>
	.white-text {
		color: red;
	}
	.company-name {
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 1rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
	}
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
</style>
