<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import Footer from '$lib/footer.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { z } from 'zod';
	import type { PageData } from './$types';

	export let data: PageData;

	const newSignupSchema = z.object({
		email: z.string().email({ message: 'Invalid email format' }),
		password: z
			.string()
			.min(7, {
				message: `Password must be at least 7 characters containing at least 1 uppercase letter, 1 special character, 1 number`
			})
			.regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
			.regex(/[0-9]/, { message: 'Password must contain at least one number' })
			.regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' })
	});

	const { form, errors, enhance, constraints } = superForm(data.form, {
		taintedMessage: 'Are you sure you want leave?',
		validators: newSignupSchema
	});
</script>

<div>
	<nav class="fixed top-0 z-50 w-full py-6  bg-[#77B8De] dark:bg-[#212021]">
		<div class="flex justify-between mx-6">
			<div class="flex">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/GeekGlasses.png"
					class="transform transition duration-300 hover:rotate-12"
					alt="title"
					width={60}
				/>
				<span class="company-name text-2xl font-extrabold dark:text-[#e1e1e1]">NerD</span><span
					class="company-name white-text text-2xl font-extrabold">Herd</span
				>
			</div>
	
			<div class="flex space-x-3">
				<!-- <LightSwitch /> -->
				<div class=" ">
					<div class="border-black bg-[#ffffff] dark:bg-[#5e5d5d] rounded-full">
						<LightSwitch class='' />
					</div>
				</div>
				<a class="btn btn-sm variant-ghost-surface" href="/about" target="_blank" rel="noreferrer">
					About us
				</a>
			</div>
		</div>
	</nav>
	
	<div class="container h-full min-h-screen px-auto flex justify-center items-center pt-28 dark:bg-[#212020] pb-5">
		<div class="max-h-screen text-center flex flex-col items-center">
			<div class="flex card shadow-2xl rounded-xl overflow-hidden max-w-4xl">
				<!-- Photo on the left side of the card -->
	
				<!-- Previous Card Content -->
				<div class="w-full p-8 dark:bg-[#292929] shadow-lg dark:text-[#e1e1e1]">
					<div class="flex flex-col space-y-9">
						
	
						<h2 class="mt-3 text-center text-2xl font-extrabold">🔥Ready to join the Nerds?🔥</h2>
					</div>
					<form class="mt-6 space-y-6" method="POST" use:enhance>
						<div class="rounded-md shadow-sm space-y-2">
							<div>
								<label class="label text-left">
									<div class="text-left font-semibold">Email :</div>
									<div class="input-name">
										<input
											class="input border-0 rounded-md shadow-sm hover-underline-animation"
											id="email"
											name="email"
											type="text"
											bind:value={$form.email}
											placeholder="name@domain.com"
										/>
										<span class="underline-animation"></span>
									</div>
								</label>
	
								{#if $errors.email}
									<div>
										<small class="text-red-500">{$errors.email}</small>
									</div>
								{/if}
							</div>
							
							<div>
								<label class="label text-left">
									<div class="text-left font-semibold">Password</div>
									<div class="input-name ">
										<input
										class="input border-0 rounded-md shadow-sm hover-underline-animation"
										type="password"
										id="password"
										name="password"
										bind:value={$form.password}
										placeholder="type your password here"
									/>
									<span class="underline-animation"></span>
									</div>
								</label>
	
								{#if $errors.password}
									<div>
										<small class="text-red-500">{$errors.password[0]}</small>
									</div>
								{/if}
							</div>
						</div>
	
						<div>
							<button type="submit" class=" btn font-bold text-xl p-3  rounded-full shadow-md  hover:text-[20px] hover:shadow-lg w-[100%] dark:text-[#e1e1e1] dark:bg-[#3b6f8e] hover:bg-[#619ecf] bg-[#77B8De]"
							>
								⚡Sign Up⚡
							</button>
						</div>
					</form>
					<div class="my-2 text-center border-b-[1px] border-black h-[25px] w-[100%] leading-3 pt-3">
						<span  class="bg-[#f3f5f6] px-0 py-[10px] text-[16px] dark:bg-[#292929]">
						  Or Continue with <!--Padding is optional-->
						</span>
					  </div>
					<div class="flex justify-center">
						<!-- <button type="button" class="btn variant-filled mt-4">
							<span
								><img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/google-svgrepo-com.svg"
									class="transform transition duration-300 hover:rotate-45 hover:scale-110"
									alt="title"
									width={25}
									height={25}
								/>
							</span>
							<span class="text-xl font-semibold">Continue with Google</span>
						</button>
						<button type="button" class="btn variant-filled mt-4">
							<span>
								<img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/discord-icon-svgrepo-com.svg"
									class="transform transition duration-300 hover:rotate-45 hover:scale-110"
									alt="title"
									width={25}
									height={25}
								/>
							</span>
							<span class="text-xl font-semibold">Continue with Discord</span>
						</button> -->
						<div class="border-[1px] border-black p-2 rounded-full shadow-2xl m-2">
							<img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/discord-icon-svgrepo-com.svg"
									class="transform transition duration-300 hover:rotate-45 hover:scale-110"
									alt="title"
									width={25}
									height={25}
							/>
						</div>
						<div class="border-[1px] border-black p-2 rounded-full shadow-2xl m-2">
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/google-svgrepo-com.svg"
								class="transform transition duration-300 hover:rotate-45 hover:scale-110"
								alt="title"
								width={25}
								height={25}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="dark:bg-[#212020] dark:text-[#e1e1e1]">
		<Footer />
	</div>

	
</div>
<style>
	.white-text {
		color: red;
	}
	.company-name {
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 1rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
	}
	.input-name{
		position: relative;
		display: inline-block;
		overflow: hidden;
		width: 100%;
	}
	.input-name > input{
		border: none;
		border-bottom: 1px solid rgb(255, 255, 255);
		outline: none;
	}

	.underline-animation{
		transition: all 0.5s;
		display: inline-block;
		bottom: 0;
		left: -100%;
		position: absolute;
		width: 100%;
		height: 1px;
		background-color: #000000;
	}
	.input-name > input:focus + .underline-animation{
	    left: 0;
	}
</style>
