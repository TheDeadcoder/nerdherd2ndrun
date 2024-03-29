<script lang="ts">
    import { onMount } from 'svelte';
    import Footer from '$lib/footer.svelte';
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
    import { z } from 'zod';
    import type { PageData } from './$types';

    export let data: PageData;

    const returnAccessType = ()=>{
        window.open('/accessType','_self')
    }

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

    let showPassword = false;

    function togglePasswordVisibility() {
        showPassword = !showPassword;
        const passwordInput = document.getElementById('password');
		if (passwordInput instanceof HTMLInputElement) {
    		passwordInput.type = showPassword ? 'text' : 'password';
		}
    }

    onMount(() => {
        modeSwitch();
        // Ensure password input type is set correctly on mount
        const passwordInput = document.getElementById('password');
		if (passwordInput instanceof HTMLInputElement) {
			passwordInput.type = 'password';
		}
    });

    const modeSwitch = ()=>{
		let isDark = document.documentElement.classList.contains('dark')
		const element = document.getElementById("login_id");

		if(element!==null){
			if(isDark===true){
				element.style.backgroundImage = "url('https://skawbthbjfypoflcurec.supabase.co/storage/v1/object/public/avro012/trainerloginDark.svg')"
			}
			else{
				element.style.backgroundImage = "url('https://skawbthbjfypoflcurec.supabase.co/storage/v1/object/public/avro012/trainerlogin.svg')"
			}
		}
	}

</script>

<div id="login_id" class="learnerloginContainer">
    <nav class="w-full py-6  ">
        <div class="flex justify-between mx-6">
			<div class="flex"  on:click={returnAccessType}>
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
				<div class="flex space-x-3">
					<!-- <LightSwitch /> -->
					<div class=" ">
						<div class="border-black bg-[#ffffff] dark:bg-[#5e5d5d] rounded-full">
							<LightSwitch class='' on:click={modeSwitch}/>
						</div>
					</div>
					<a class="btn btn-sm variant-ghost-surface" href="/about" target="_blank" rel="noreferrer">
						About us
					</a>
				</div>
				
			</div>
		</div>
    </nav>
    <div class="container h-full mx-auto mb-12 flex justify-center items-center mt-7">
        <div class="max-h-screen text-center flex flex-col items-center">
            <div class="flex bg-[#e2e6e9]  shadow-2xl rounded-xl overflow-hidden max-w-4xl dark:text-[#e1e1e1] dark:bg-[#212020]">
                <!-- Photo on the left side of the card -->
    
                <!-- Previous Card Content -->
                <div class="w-full p-8 ">
                    <div class="flex flex-col space-y-9 ">
                        <div class="company-name">
                            <span class="company-name text-2xl font-extrabold">NerD</span><span
                                class="company-name white-text text-xl font-extrabold">Herd</span
                            >
                        </div>
    
                        <h2 class="mt-3 text-center text-xl font-extrabold">Log In</h2>
                    </div>
                    {#if $message}
                        <div
                            class="text-red-500 border-red-500 border-2 bg-red-100 py-2 px-2 rounded-sm text-base"
                        >
                            {$message}
                        </div>
                    {/if}
                    <form class="mt-6 space-y-6" method="POST" use:enhance>
                        <div class="rounded-md shadow-sm ">
                            <div>
                                <label class="label text-left">
                                    <span class="text-left">Email</span>
                                    <div class="input-name">
                                        <input
                                            class="input border-0 rounded-sm hover:border-b-2"
                                            id="email"
                                            name="email"
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
                                    <span class="text-left">Password</span>
                                    <div class="input-name" style="position: relative;">
                                        <input
                                            class="input border-0 rounded-sm hover:border-b-2"
                                            type="password"
                                            id="password"
                                            name="password"
                                            bind:value={$form.password}
                                            placeholder="type your password here"
                                        />
                                        <span class="underline-animation"></span>
                                        <button class="password-toggle" tabindex="0" on:click={togglePasswordVisibility} style="position: absolute; right: 0; top: 50%; transform: translateY(-50%);">
                                            {#if showPassword}
                                                <!-- Use an icon for show password -->
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M4.7 4.7l14.6 14.6M5.66 16.66l.88.88M19.07 5.99l.88.88M18 12a6 6 0 11-12 0 6 6 0 0112 0z"
                                                    />
                                                </svg>
                                            {:else}
                                                <!-- Use an icon for hide password -->
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M4 4.5l16 16"
                                                    />
                                                </svg>
                                            {/if}
                                        </button>
                                    </div>
    
                                </label>
    
                                {#if $errors.password}
                                    <div>
                                        <small class="text-red-500">{$errors.password[0]}</small>
                                    </div>
                                {/if}
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
                        </div>
    
    
                        <div>
                            <button type="submit" class=" btn font-bold text-xl p-2  rounded-full shadow-md  hover:text-[21px] hover:shadow-lg w-[100%]  dark:text-[#e1e1e1] dark:bg-[#3b6f8e] hover:bg-[#619ecf] bg-[#77B8De]"  tabindex="0">
                                Sign In
                            </button>
                        </div>
                    </form>
                    <div class="flex flex-col mt-2">
                        <div class="my-2 text-center border-b-[1px] border-black h-[25px] w-[100%] leading-5 pt-3 ">
							<span class="text-[16px] bg-[#e2e6e9] px-2 py-[10px] dark:text-[#e1e1e1] dark:bg-[#212020]">
							  Or Continue with <!--Padding is optional-->
							</span>
						</div>
                        <div class="flex justify-center">
                            
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
    </div>
    <Footer />
</div>

<style>
    .company-name {
        font-size: 2rem; /* Adjust font size as needed */
        margin-top: 1rem; /* Add spacing if necessary */
        font-family: 'CustomFont', sans-serif; /* Use your custom font */
    }
	.learnerloginContainer{
		z-index: -5;
		aspect-ratio: 960/300;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		/* background-image: url("../../lib/svgs/trainerlogin.svg"); */
	}

    /* Style "Herd" in red */
    .white-text {
        color: red;
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


