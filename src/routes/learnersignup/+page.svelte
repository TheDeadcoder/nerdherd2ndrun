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

					<h2 class="mt-3 text-center text-3xl font-extrabold">🔥Ready to join the Nerds?🔥</h2>
				</div>
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

					<div>
						<button type="submit" class="btn variant-filled-primary text-xl font-semibold">
							⚡Sign Up⚡
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
						<span class="text-xl font-semibold">Sign up with Google</span>
					</button>
					<button type="button" class="btn variant-filled mt-4">
						<span
							><img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/discord-icon-svgrepo-com.svg"
								class="transform transition duration-300 hover:rotate-45 hover:scale-110"
								alt="title"
								width={25}
								height={25}
							/>
						</span>
						<span class="text-xl font-semibold">Sign up with Discord</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
<Footer />

<style>
	.white-text {
		color: red;
	}
	.company-name {
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 1rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
	}
</style>
