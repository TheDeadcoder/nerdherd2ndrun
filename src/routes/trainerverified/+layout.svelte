<script>
	import Sidebar from "$lib/sidebar.svelte";
    import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<div class="grid grid-rows-[75px_auto]">
    <div class="w-full bg-[#97c2db] self-start sticky top-0 dark:bg-[#070707] dark:text-[#a7afb4] z-10">
        <div class="flex justify-between">
            <div class="flex p-4 flex-row text-center">
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

            <div>
                <LightSwitch></LightSwitch>
            </div>
        </div>
    </div>



    <div class="grid grid-cols-[15%_auto]">
        <div class=" dark:bg-[#070707]">
            <div class="self-start sticky top-[78px] overflow-auto">
                <Sidebar></Sidebar>
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