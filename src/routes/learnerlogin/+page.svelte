<script lang="ts">
	import Footer from '$lib/footer.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
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

	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		taintedMessage: 'Are you sure you want leave?',
		validators: newSignupSchema
	});
</script>

<nav class="fixed top-0 z-50 w-full py-6 backdrop-blur-md">
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

		<div class="flex space-x-3">
			<LightSwitch />
			<a class="btn btn-sm variant-ghost-surface" href="/about" target="_blank" rel="noreferrer">
				About us
			</a>
		</div>
	</div>
</nav>
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="max-h-screen text-center flex flex-col items-center">
		<div class="flex card shadow-2xl rounded-xl overflow-hidden max-w-4xl">
			<!-- Photo on the left side of the card -->

			<!-- Previous Card Content -->
			<div class="w-full p-8">
				<div class="flex flex-col space-y-9">
					<div class="company-name">
						<span class="company-name text-xl font-extrabold">NerD</span><span
							class="company-name white-text text-xl font-extrabold">Herd</span
						>
					</div>

					<h2 class="mt-3 text-center text-3xl font-extrabold">Sign in to your account</h2>
				</div>
				{#if $message}
					<div
						class="text-red-500 border-red-500 border-2 bg-red-100 py-2 px-2 rounded-sm text-base"
					>
						{$message}
					</div>
				{/if}
				<form class="mt-6 space-y-6" method="POST" use:enhance>
					<div class="rounded-md shadow-sm space-y-2">
						<div>
							<label class="label text-left">
								<span class="text-left">Email</span>
								<input
									class="input"
									id="email"
									name="email"
									bind:value={$form.email}
									placeholder="name@domain.com"
								/>
							</label>

							{#if $errors.email}
								<div>
									<small class="text-red-500">{$errors.email}</small>
								</div>
							{/if}
						</div>
						<div>
							<label class="label text-left">
								<span class="text-left">Password</span>
								<input
									class="input"
									type="password"
									id="password"
									name="password"
									bind:value={$form.password}
									placeholder="type your password here"
								/>
							</label>

							{#if $errors.password}
								<div>
									<small class="text-red-500">{$errors.password[0]}</small>
								</div>
							{/if}
						</div>
					</div>

					<div class="flex items-center justify-between">
						<div class="flex items-center">
							<input
								id="remember_me"
								name="remember_me"
								type="checkbox"
								class="h-4 w-4 border-gray-300 rounded"
							/>
							<label for="remember_me" class="ml-2 block text-sm"> Remember me </label>
						</div>
						<div class="text-sm">
							<a href="#/usersignup" class="font-medium"> Forgot Password? </a>
						</div>
					</div>

					<div>
						<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
							Sign In
						</button>
					</div>
				</form>
				<div class="flex flex-col">
					<button type="button" class="btn variant-filled mt-4">
						<span
							><img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/google-svgrepo-com.svg"
								class="transform transition duration-300 hover:rotate-45 hover:scale-110"
								alt="title"
								width={25}
								height={25}
							/>
						</span>
						<span class="text-xl font-semibold">Sign in with Google</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
<Footer />

<style>
	.company-name {
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 1rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
	}

	/* Style "Herd" in red */
	.white-text {
		color: red;
	}
</style>
