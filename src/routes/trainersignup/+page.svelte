<script lang="ts">
	import { Stepper, Step, InputChip, LightSwitch } from '@skeletonlabs/skeleton';
	import Footer from '$lib/footer.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { z } from 'zod';
	import type { PageData } from './$types';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	export let data: PageData;

	// Define a regex for the password requirements
	const done = false;
	const phoneRegex = /^01\d{9}$/;
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const newSignupSchema = z
		.object({
			name: z.string().min(3, { message: 'Name is required and at least of length 3' }),
			dob: z.string().refine(
				(dob) => {
					// Convert the input string to a Date object
					const inputDate = new Date(dob);
					inputDate.setHours(0, 0, 0, 0);
					// Check that the input date is before today
					return inputDate < today;
				},
				{
					message: 'Date of birth must be in the past'
				}
			),
			address: z.string().optional(),
			gender: z.enum(['Male', 'Female', 'Rather Not Say']),
			currstatus: z.string().min(1, { message: 'Current Status is required' }),
			currins: z.string().optional(),
			highestdeg: z.string().min(1, { message: 'Highest Degree is required' }),
			currdeg: z.string().optional(),
			mobile: z
				.string()
				.regex(phoneRegex, { message: 'Phone number must be exactly 11 digits and start with 01' }),
			email: z
				.string()
				.email({ message: 'Invalid email address' })
				.min(1, { message: 'Email is required' }),
			password: z
				.string()
				.min(7, {
					message: `Password must be at least 7 characters containing at least 1 uppercase letter, 1 special character, 1 number`
				})
				.regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
				.regex(/[0-9]/, { message: 'Password must contain at least one number' })
				.regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' }),

			confirmPassword: z.string(),
			reasoning: z.string().min(15, { message: 'Your reasoning must be at least 15 words long' }),
			interest: z.string().optional()
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: 'Passwords do not match',
			path: ['confirmPassword'] // This specifies that the error should be attached to the confirmPassword field
		});

	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		taintedMessage: 'Are you sure you want leave?',
		validators: newSignupSchema
	});

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

<section class="flex flex-col items-center justify-center mt-28">
	<div class="card p-12 w-1/2">
		<div class="flex flex-col items-center justify-center mb-8">
			<img
				src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/teacher.svg"
				alt="Teacher"
				class="transform transition duration-300 hover:rotate-12 hover:scale-110"
				height={50}
				width={50}
			/>
			<h1 class="text-2xl font-bold">Enlist Yourself as a Trainer🔥</h1>
		</div>
		{#if $message}
			{#if $message === 'Sign Up successful. Please wait for the Admin to approve your request'}
				<div class="flex flex-col items-center justify-center z-50 backdrop-blur-lg">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/confirm-svgrepo-com.svg"
						alt="prescription"
						class="w-16 h-16 mr-2 transform transition duration-300 hover:rotate-12"
					/>
					<h1 class="font-bold text-xl">{$message}</h1>
				</div>
			{:else}
				<div class="text-red-500 border-red-500 border-2 bg-red-100 py-2 px-2 rounded-sm text-base">
					{$message}
				</div>
			{/if}
		{/if}
		<form class="mt-6 space-y-6" method="POST" use:enhance>
			<div class="space-y-1">
				<legend class="flex items-center font-bold text-xl mb-4"
					><img
						src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/information-icon.svg?t=2023-11-02T10%3A55%3A30.544Z"
						alt="prescription"
						class="w-5 h-5 mr-2 transform transition duration-300 hover:rotate-12"
					/>
					Personal Information</legend
				>
				<label class="label text-left">
					<span class="font-semibold">Name*</span>
					<div class="input-name">
						<input
							class="input border-0 rounded-sm hover:border-b-2"
							type="text"
							id="name"
							name="name"
							bind:value={$form.name}
							placeholder="Enter Your Name"
						/>
						<span class="underline-animation"></span>
					</div>
					
					{#if $errors.name}
						<div>
							<small class="text-red-500">{$errors.name}</small>
						</div>
					{/if}
				</label>
				<label class="label text-left">
					<span class="font-semibold">Date of Birth*</span>
					<div class="input-name">
						<input 	class="input border-0 rounded-sm hover:border-b-2"
								type="date" id="dob" name="dob" bind:value={$form.dob} 
						/>
						<span class="underline-animation"></span></div>
					{#if $errors.dob}
						<div>
							<small class="text-red-500">{$errors.dob}</small>
						</div>
					{/if}
				</label>
				<label class="label text-left">
					<span class="font-semibold">Address</span>
					<div class="input-name">
						<input
							class="input border-0 rounded-sm hover:border-b-2"
							type="text"
							id="address"
							name="address"
							bind:value={$form.address}
							placeholder="Enter Your Current Address"
						/>
						<span class="underline-animation"></span>
					</div>
					
					{#if $errors.address}
						<div>
							<small class="text-red-500">{$errors.address}</small>
						</div>
					{/if}
				</label>

				<label class="label text-left">
					<span class="font-semibold">Gender*</span>
					<div class="flex justify-between leading-3">
						<label class="label flex items-center space-x-2">
							<input
								class="radio"
								type="radio"
								checked
								name="gender"
								value="Male"
								id="Male"
								bind:group={$form.gender}
							/>
							<p class="pb-2">Male</p>
						</label>
						<label class="label flex items-center space-x-2">
							<input
								class="radio"
								type="radio"
								name="gender"
								value="Female"
								id="Female"
								bind:group={$form.gender}
							/>
							<p class="pb-2">Female</p>
						</label>
						<label class="label flex items-center space-x-2">
							<input
								class="radio"
								type="radio"
								name="gender"
								value="Rather Not Say"
								id="Rather Not Say"
								bind:group={$form.gender}
							/>
							<p class="pb-2">Rather Not Say</p>
						</label>
					</div>
					{#if $errors.gender}
						<div>
							<small class="text-red-500">{$errors.gender}</small>
						</div>
					{/if}
				</label>
			</div>
			<div class="space-y-1 mt-11">
				<legend class="flex items-center font-bold text-xl mb-4"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/internet-education-graduation-svgrepo-com.svg"
						alt="prescription"
						class="w-5 h-5 mr-2 transform transition duration-300 hover:rotate-12"
					/>
					Educational Information</legend
				>
				<label class="label text-left">
					<span class="font-semibold">Current Status*</span>
					<select bind:value={$form.currstatus} class="select" id="currstatus" name="currstatus">
						<option value="Teaching">Teaching</option>
						<option value="Student">Student</option>
					</select>
					{#if $errors.currstatus}
						<div>
							<small class="text-red-500">{$errors.currstatus}</small>
						</div>
					{/if}
				</label>
				<label class="label text-left">
					<span class="font-semibold">Current Institution (If any)</span>
					
					<div class="input-name">
						<input
							class="input border-0 rounded-sm hover:border-b-2"
							type="text"
							id="currins"
							name="currins"
							placeholder="Enter Your Current institution"
							bind:value={$form.currins}
						/>
						<span class="underline-animation"></span></div>
				</label>
				<label class="label text-left">
					<span>Highest Degree*</span>
					<select bind:value={$form.highestdeg} class="select" id="highestdeg" name="highestdeg">
						<option value="HSC">HSC</option>
						<option value="Bachelor of Arts">Bachelor of Arts</option>
						<option value="Bachelor of Business Administration"
							>Bachelor of Business Administration</option
						>
						<option value="Bachelor of Commerce">Bachelor of Commerce</option>
						<option value="Bachelor of Home Economics">Bachelor of Home Economics</option>
						<option value="Bachelor of Science">Bachelor of Science</option>
						<option value="Bachelor of Social Science">Bachelor of Social Science</option>
						<option value="Bachelor of Pharmacy">Bachelor of Pharmacy</option>
						<option value="Bachelor of Law">Bachelor of Law</option>
						<option value="Master of Arts">Master of Arts</option>
						<option value="Master of Business Administration"
							>Master of Business Administration</option
						>
						<option value="Master of Commerce">Master of Commerce</option>
						<option value="Master of Engineering">Master of Engineering</option>
						<option value="Master of Laws">Master of Laws</option>
						<option value="Master of Science">Master of Science</option>
					</select>
					{#if $errors.highestdeg}
						<div>
							<small class="text-red-500">{$errors.highestdeg}</small>
						</div>
					{/if}
				</label>
				<label class="label text-left">
					<span>Currently persuing Degree (If any)</span>
					<select bind:value={$form.currdeg} class="select" id="currdeg" name="currdeg">
						<option value="HSC">HSC</option>
						<option value="Bachelor of Arts">Bachelor of Arts</option>
						<option value="Bachelor of Business Administration"
							>Bachelor of Business Administration</option
						>
						<option value="Bachelor of Commerce">Bachelor of Commerce</option>
						<option value="Bachelor of Home Economics">Bachelor of Home Economics</option>
						<option value="Bachelor of Science">Bachelor of Science</option>
						<option value="Bachelor of Social Science">Bachelor of Social Science</option>
						<option value="Bachelor of Pharmacy">Bachelor of Pharmacy</option>
						<option value="Bachelor of Law">Bachelor of Law</option>
						<option value="Master of Arts">Master of Arts</option>
						<option value="Master of Business Administration"
							>Master of Business Administration</option
						>
						<option value="Master of Commerce">Master of Commerce</option>
						<option value="Master of Engineering">Master of Engineering</option>
						<option value="Master of Laws">Master of Laws</option>
						<option value="Master of Science">Master of Science</option>
					</select>
				</label>
			</div>
			<div class="space-y-1">
				<legend class="flex items-center font-bold text-xl mb-4"
					><img
						src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/email-blue.svg"
						alt="prescription"
						class="w-5 h-5 mr-2 transform transition duration-300 hover:rotate-12"
					/>
					Contact Information</legend
				>
				
				<label class="label text-left">
					<span class="font-semibold">Contact Number</span>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]  border-0 rounded-lg ">
						<div class="input-group-shim">+88</div>

						<input
							class="input border-0 rounded-sm hover:border-b-2"
							title="Input (number)"
							type="text"
							name="mobile"
							placeholder="01759949778"
							id="mobile"
							bind:value={$form.mobile}
						/>
					</div>
					{#if $errors.mobile}
						<div>
							<small class="text-red-500">{$errors.mobile}</small>
						</div>
					{/if}
				</label>
				<label class="label text-left">
					<span class="font-semibold">Email</span>
					<div class="input-name">
						<input
							class="input border-0 rounded-sm hover:border-b-2"
							title="Input (email)"
							type="email"
							placeholder="name@example.com"
							autocomplete="email"
							name="email"
							id="email"
							bind:value={$form.email}
						/>
						<span class="underline-animation"></span>
					</div>
					
					{#if $errors.email}
						<div>
							<small class="text-red-500">{$errors.email}</small>
						</div>
					{/if}
				</label>
				<label class="label text-left">
					<span class="font-semibold">Password</span>
					<div class="input-name">
						<input
							class="input border-0 rounded-sm hover:border-b-2"
							title="Input (email)"
							type="password"
							name="password"
							placeholder="Enter your password"
							bind:value={$form.password}
							id="password"
						/>
						<span class="underline-animation"></span>
					</div>
					
					{#if $errors.password}
						<div>
							<small class="text-red-500">{$errors.password}</small>
						</div>
					{/if}
				</label>
				<label class="label text-left">
					<span class="font-semibold">Confirm Password</span>
					<div class="input-name">
						<input
							class="input border-0 rounded-sm hover:border-b-2"
							title="Input (password)"
							type="password"
							name="confirmPassword"
							placeholder="Confirm your password"
							bind:value={$form.confirmPassword}
							id="confirmPassword"
						/>
						<span class="underline-animation"></span>
					</div>
					
					{#if $errors.confirmPassword}
						<div>
							<small class="text-red-500">{$errors.confirmPassword}</small>
						</div>
					{/if}
				</label>
			</div>
			<div class="space-y-1">
				<legend class="flex items-center font-bold text-xl mb-4"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/teach-svgrepo-com.svg"
						alt="prescription"
						class="w-5 h-5 mr-2 transform transition duration-300 hover:rotate-12"
					/>
					Teaching Information</legend
				>

				<label class="label text-left">
					<span>Tell us Why do you want to become a trainer?</span>
					<textarea
						class="textarea"
						rows="4"
						placeholder="Your motivation..."
						id="reasoning"
						name="reasoning"
						bind:value={$form.reasoning}
					/>
					{#if $errors.reasoning}
						<div>
							<small class="text-red-500">{$errors.reasoning}</small>
						</div>
					{/if}
				</label>
				<label class="label text-left">
					<span>Your Topic of Interest</span>
					<textarea
						class="textarea"
						rows="4"
						placeholder="Your interests (separate by comma)..."
						name="interest"
						id="interest"
						bind:value={$form.interest}
					/>
					{#if $errors.interest}
						<div>
							<small class="text-red-500">{$errors.interest}</small>
						</div>
					{/if}
				</label>
			</div>
			<div class="space-y-1">
				<legend class="flex items-center font-bold text-xl mb-4"
					><img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/confirm-svgrepo-com.svg"
						alt="prescription"
						class="w-5 h-5 mr-2 transform transition duration-300 hover:rotate-12"
					/>
					Confirmation Preview</legend
				>
				<div>
					<h1 class="text-2xl font-semibold">
						{$form.name}
					</h1>
					<p class="font-semibold text-lg">
						{$form.gender} Age:{calculateAge($form.dob)}
					</p>
				</div>
				<div>
					<h1 class="font-semibold"><u># Educational Qualification</u></h1>
					<p>
						Currently {$form.currstatus}
					</p>

					{#if $form.currins}
						<p>
							Currently in {$form.currins}
						</p>
					{/if}
					<p>
						Achieved {$form.highestdeg} degree
					</p>
					{#if $form.currdeg}
						<p>
							Currently persuing {$form.currdeg}
						</p>
					{/if}
				</div>
				<div>
					<h1 class="font-semibold"><u># Contact Information</u></h1>
					<p>
						Mobile number: {$form.mobile}
					</p>
					<p>
						Email: {$form.email}
					</p>
				</div>
				<div>
					<h1 class="font-semibold"><u># Reasoning</u></h1>

					<p>Reason for choosing to instruct in Nerdherd:</p>
					<p>
						{$form.reasoning}
					</p>

					<p>Topics of Interest:</p>
					<p>
						{$form.interest}
					</p>
				</div>
				<div class="py-3">
					<button type="submit" class="w-1/2 btn font-bold text-xl p-2 bg-[#77B8De] rounded-full shadow-md hover:bg-[#619ecf] hover:text-[21px] hover:shadow-lg ">
						⚡Sign Up⚡
					</button>
				</div>
			</div>
		</form>
	</div>
	<Footer />
</section>

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
