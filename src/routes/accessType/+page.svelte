<script>
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Switch from '$lib/Switch.svelte'

	import Footer from '$lib/footer.svelte';
	let isLoading = true;
	let id;
	let password;
	let isLearner = 'ON';
	function handleSignInUser() {
		window.open('/learnerlogin', '_self');
	}
	function handleSignInAdmin() {
		window.open('/adminlogin', '_self');
	}

	function handleSignInTrainer() {
		window.open('/trainerlogin', '_self');
	}

	onMount(() => {
		setTimeout(() => {
			isLoading = false;
		}, 1500); // Simulating an async load for the image.
	});
</script>

<div class="accessTypeContainer">
	<nav class=" w-full py-6">
		<div class="flex justify-between mx-6">
			<div class="flex">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/GeekGlasses.png"
					class="transform transition duration-300 hover:rotate-12"
					alt="title"
					width={60}
				/>
				<span class="company-name text-2xl font-extrabold">NerD</span><span
					class="company-name white-text text-2xl font-extrabold">Herd</span
				>
			</div>
	
			<div >
				<!-- <LightSwitch /> -->
				<a class="btn btn-sm variant-ghost-surface" href="/about" target="_blank" rel="noreferrer">
					About us
				</a>
			</div>
		</div>
	</nav>
	<section >
		{#if isLoading}
			<div class="flex space-x-2 justify-center items-center h-screen dark:invert">
				<div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
				<div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
				<div class="h-8 w-8 bg-black rounded-full animate-bounce"></div>
			</div>
		{:else}
			<div class=" mx-auto flex  justify-center items-center space-x-8 mb-5 mt-5">
				<!-- {#if isLearner === 'ON'} -->
					<div class="flex flex-col space-y-6 w-1/3 items-center justify-center bg-[#f8f8f8]">
						<div class="text-center flex flex-col items-center">
							<div class="flex card shadow-2xl rounded-xl overflow-hidden max-w-4xl">
								<!-- Photo on the left side of the card -->
	
								<!-- Previous Card Content -->
								<div class="w-full p-8 flex flex-col items-center relative">
									<!-- <div class="absolute right-2 ">
										<Switch bind:value={isLearner} fontSize={12} label="Switch to Learner" design="slider" />
									</div> -->
									<div class="flex justify-center w-1/2">
										<img
											src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/teacher-removebg-preview.png"
											alt="Trainer"
											class="object-contain object-center mb-6"
										/>
									</div>
									<div class="flex flex-col space-y-9">
										<div class="text-3xl text-center font-bold mb-6">As a Trainer</div>
									</div>
									<div>
										<p class="text-l text-center">
											Create your own class to teach enthusiast individuals.
											<br />
											Set the goals. Maintain the resources. Take Video classroom.
											<br />Create Question for Community purpose.
										</p>
									</div>
	
									<div class="w-[100%] mt-5">
										<button
											type="submit"
											class=" btn font-bold text-xl p-4 bg-[#77B8De] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[21px] hover:shadow-lg w-1/2"
											on:click={handleSignInTrainer}
										>
											Sign In
										</button>
									</div>
	
									<div class="flex flex-col items-center justify-between mt-3">
										<p>
											Don't have account? <a  href="/trainersignup" target="_blank" class="font-medium"><span class="hover-underline-animation">Sign up</span></a>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				<!-- {:else} -->
					<div class="flex flex-col space-y-6 w-1/3 items-center justify-center bg-[#f8f8f8]">
						<div class="text-center flex flex-col items-center">
							<div class="flex card shadow-2xl rounded-xl overflow-hidden max-w-4xl">
								<!-- Photo on the left side of the card -->
	
								<!-- Previous Card Content -->
								<div class="w-full p-8 flex flex-col items-center relative">
									<!-- <div class="absolute right-2 "> -->
										<!-- <span>Switch To Trainer</span> -->
										<!-- <Switch bind:value={isLearner} fontSize={12} label="Switch to Trainer" design="slider" /> -->
									<!-- </div> --> 
									<div class="flex justify-center w-1/2">
										<img
											src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/student.png"
											alt="Learner"
											class="object-contain object-center mb-6"
										/>
									</div>
									
									<div class="flex flex-col space-y-9">
										<div class="text-3xl text-center font-bold mb-6">As a Learner</div>
									</div>
									<div>
										<p class="text-l text-center">
											Join the community of the Nerds🔥. Keep up-to-date.
											<br />
											Communicate & collaborate. Avail Contents. Help from AI.
											<br />⚡Storm your Brain with mind-boggling questions🧠
										</p>
									</div>
	
									<div class="w-[100%] mt-5">
										<button
											type="submit"
											class=" btn font-bold text-xl p-4 bg-[#CF9261] rounded-xl shadow-md hover:bg-[#e39b5f] hover:text-[21px] hover:shadow-lg w-1/2"
											on:click={handleSignInUser}
										>
											Sign In
										</button>
									</div>
	
									<div class="flex flex-col items-center justify-between mt-3">
										<p>
											Don't have account?<a href="/learnersignup" target="_blank" class="font-medium"> <span class="hover-underline-animation">Sign up</span> </a>
											
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				<!-- {/if} -->
			</div>
			
			<div>
				<Footer></Footer>
			</div>
		{/if}
	</section>
</div>

<style>
	.accessTypeContainer{
		z-index: -5;
		aspect-ratio: 960/300;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		background-image: url("../../lib/svgs/access-type-bg.svg");
	}
	.white-text {
		color: red;
	}
	.company-name {
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 1rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
	}
	.hover-underline-animation {
		display: inline-block;
		position: relative;
		color: #000000;
	}

	.hover-underline-animation::after {
		content: '';
		position: absolute;
		width: 100%;
		transform: scaleX(0);
		height: 2px;
		bottom: 0;
		left: 0;
		background-color: #000000;
		transform-origin: bottom right;
		transition: transform 0.25s ease-out;
	}

	.hover-underline-animation:hover::after {
		transform: scaleX(1);
		transform-origin: bottom left;
	}
</style>
