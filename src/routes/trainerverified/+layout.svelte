<script lang='ts'>
	import Sidebar from "$lib/sidebar.svelte";
    import ClassSideBar from "$lib/classSideBar.svelte"
    import { Avatar, LightSwitch, popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings, Table } from '@skeletonlabs/skeleton';
    import {isRunningClass} from '../../stores/isRunningClass'

    export let data;

	let { session, supabase, teacherNow } = data;
	$: ({ session, supabase, teacherNow } = data);


    import { createEventDispatcher } from 'svelte';





    const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	}

    const returnHome = ()=>{
        window.open('/trainerverified/home/recent','_self')
    }

    const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/trainerlogin', '_self');
	}
    

</script>

<div class="grid grid-rows-[75px_auto]">
    <div class="w-full bg-[#97c2db] self-start sticky top-0 dark:bg-[#070707] dark:text-[#a7afb4] z-10">
        <div class="flex justify-between">
            <div class="flex p-4 flex-row text-center" on:click={returnHome}>
                <img
                    src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/GeekGlasses.png"
                    class="transform transition duration-300 hover:rotate-12 w-[50px] mr-4"
                    alt="title"
                    width={50}
                />
                <span class="company-name text-2xl font-extrabold">NerD</span><span
                    class="company-name white-text text-2xl text-red-700 font-extrabold">Herd</span
                >
            </div>

            <div class="p-5 ">
                <div class="flex justify-center align-middle">
                    <div class="border-black bg-[#ffffff] dark:bg-[#5e5d5d] rounded-full h-6  m-2">
                        <LightSwitch class=''/>
                    </div>
                    <div use:popup={popupClick}>
                        <Avatar src={teacherNow.image} width="w-10" rounded="rounded-full" />
                        <div data-popup="popupClick" class="h-32 absolute">
                            <ul class="text-lg font-semibold bg-[#b7dbf6] ml-0 dark:text-[#e1e1e1] dark:bg-[#070707]">
                                <li class="mt-2 mb-3 p-2">
                                    <a href="/trainerverified/profile" class="flex items-center font-bold"
                                        ><img
                                            src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/user-person-profile-block-account-circle-svgrepo-com.svg"
                                            alt="Dashboard Icon"
                                            class="h-7 mr-1 hover:rotate-12"
                                        />
                                        Profile</a
                                    >
                                </li>
                                <li class="mt-2 mb-3 p-2">
                                    <button on:click={()=>handleSignOut()} class="flex items-center font-bold">
                                        <img src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/logout-arrows-svgrepo-com.svg" 
                                            alt="Dashboard Icon" 
                                            class="h-7 ml-1 hover:rotate-12"
                                        />
                                        <p style="text-align: center; margin-left: 0.2cm;">
                                            Log Out
                                        </p>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div class="grid grid-cols-[17%_auto]">
        <div class=" dark:bg-[#070707] ">
            <div class="self-start sticky top-[78px] overflow-auto">
                {#if $isRunningClass.isClass}
                    <ClassSideBar></ClassSideBar>
                {:else}
                    <Sidebar on:callParentFunction={handleSignOut}></Sidebar>
                {/if}
            </div>
        </div>
        <slot></slot>
    </div>

</div>

<style>
    .company-name {
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 1rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
	}
</style>