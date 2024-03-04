<script>
	import { isRunningClass } from '../stores/isRunningClass';

	let classid = $isRunningClass.classid;

	$: classid = $isRunningClass.classid;
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const callParent=()=> {
        dispatch('callParentFunction');
    }

	let homeVisible = 0;
</script>

<div class="pt-5 w-full mx-auto dark:bg-[#070707]">
	<div class="p-0 flex flex-col border-2 min-h-[100vh] pb-[100px]  w-full">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->

		<div
			class="cursor-pointer px-5 py-2
			font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  
			border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
   		>
			<a href="/trainerverified/runningclass/{classid}/overview" class="sidebar-item active ">
				<div class="flex flex-row">
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/dashboard-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-6 mr-3 hover:rotate-12"
					/>
					<p class=" font-bold">Overview</p>
				</div>
			</a>
		</div>

		<div
			class="cursor-pointer px-5 py-2 
			font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  
			border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
   		>
			<a href="/trainerverified/runningclass/{classid}/chat" class="sidebar-item active">
				<div class="flex flex-row">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/chat-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-6 mr-3 hover:rotate-12"
					/>
					<p class=" font-bold">Chat</p>
				</div>
			</a>
		</div>
		<div
			class="cursor-pointer  px-5 py-2 
			font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  
			border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
   		>
			<a href="/trainerverified/runningclass/{classid}/assignments" class="sidebar-item">
				<div class="flex flex-row">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/bell-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-6 mr-3 hover:rotate-12"
					/>
					<p class="font-bold">Assignments</p>
				</div>
			</a>
		</div>
		<div
			class="cursor-pointer  px-5 py-2 
			font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  
			border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
   		>
			<a href="/trainerverified/runningclass/{classid}/notes" class="sidebar-item">
				<div class="flex flex-row">
					<img
						src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/notebook-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-6 mr-3 hover:rotate-12"
					/>
					<p class="font-bold">Notebooks</p>
				</div>
			</a>
		</div>
		<div
			class="cursor-pointer px-5 py-2 
			font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  
			border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
   		>
			<a href="/trainerverified/runningclass/{classid}/credentials" class="sidebar-item">
				<div class="flex flex-row ">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/certify-svgrepo-com.svg"
						alt="Dashboard Icon"
						class="h-6 mr-3 hover:rotate-12"
					/>
					<p class="font-bold">Credentials</p>
				</div>
			</a>
		</div>

		<div
			class=""
   		>
			<a href="/trainerverified/runningclass/{classid}/live" class="sidebar-item">
				<div class="flex flex-row cursor-pointer  px-5 py-2 
				font-bold text-[22px] hover:text-[23px] hover:bg-[#d8f0fd]  
				border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/conference-live-video-svgrepo-com.svg?t=2024-02-09T19%3A53%3A53.776Z"
						alt="Dashboard Icon"
						class="h-6 mr-3 hover:rotate-12"
					/>
					<p class="font-bold">Go Live</p>
				</div>
			</a>
		</div>

		<div
			class="cursor-pointer flex-none px-5 py-5 text-center font-bold text-2xl hover:text-[27px] hover:bg-[#d8f0fd] border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40] mt-auto"
		>
			<button on:click={() => callParent()} class="flex items-center justify-center">
				<img
					src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/logout-arrows-svgrepo-com.svg"
					alt="Dashboard Icon"
					class="h-7 ml-1 hover:rotate-12 rotate-180"
				/>

				<p style="color: red; font-size: smaller; text-align: center; margin-left: 0.5cm;">
					Go Back
				</p>
			</button>
		</div>
	</div>
</div>
