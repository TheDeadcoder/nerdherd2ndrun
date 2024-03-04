<script lang="ts">
	import Sidebar from '$lib/sidebar.svelte';
import { Avatar, LightSwitch, popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings, Table } from '@skeletonlabs/skeleton';

	export let data;

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	};
	const popupHover1: PopupSettings = {
		event: 'hover',
		target: 'popupHover1',
		placement: 'top'
	};

	let {
		session,
		supabase,
		teacherNow,
		blog,
		classes,
		teacherqual,
		teacherskills,
		commonUserNow,
		follower
	} = data;
	$: ({
		session,
		supabase,
		teacherNow,
		blog,
		classes,
		teacherqual,
		teacherskills,
		commonUserNow,
		follower
	} = data);

	function refresh() {
		window.open(`/viewonly/teacher/${teacherNow.id}`, '_self');
	}

	async function unfriend() {
		const { error } = await supabase
			.from('follower')
			.delete()
			.eq('ifollow', commonUserNow.id)
			.eq('followu', teacherNow.id);

		refresh();
	}
	async function makefriend() {
		const { data, error } = await supabase
			.from('follower')
			.insert([{ ifollow: commonUserNow.id, followu: teacherNow.id }]);

		refresh();
	}
	function formatDate(dateString) {
		const dateObj = new Date(dateString);
		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
	}
	function classifyClass(startDateStr) {
		// Parse the start date string into a Date object
		const startDate = new Date(startDateStr);

		const today = new Date();
		return startDate > today; // True for upcoming, false for running
	}

	let option = 1;
	const setOption=(value)=>{
		option = value
	}
	const handleGoBack = ()=>{
		history.back();
	}

</script>

<div class="">
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

            <div class="p-5 ">
                <div class="flex justify-center align-middle">
                    <div class="border-black bg-[#ffffff] dark:bg-[#5e5d5d] rounded-full h-6  m-2">
                        <LightSwitch/>
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
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

	<div class="min-h-[100vh-300px] w-full  flex justify-center   dark:bg-[#212020] dark:text-[#e1e1e1]">
		

		<div class="grid grid-cols-[17%_auto] w-full ">

			<div class="self-start sticky top-[78px] overflow-auto">
				<Sidebar on:callParentFunction={handleGoBack}></Sidebar>
			</div>

			<div class="grid grid-cols-[30%_auto] pl-6">
				<div class=" self-start sticky top-[105px] overflow-auto ">
					
					<div class="flex justify-center">
						<img src={teacherNow.image} alt="" class="border-2 border-black rounded-full h-[200px]" />
					</div>
					<div class="p-3 m-3 ">
						<p class="text-3xl font-semibold">{teacherNow.name}</p>
						<p class="font-thin">{teacherNow.email}</p>
						<p class="font-thin">{teacherNow.mobile}</p>
						<p class="font-thin">{teacherNow.address}</p>
						<div class="mt-3">
							<p class="">{teacherNow.about}</p>
						</div>
					</div>
					<div>
						<ul class="mb-4">
							<li class="p-2 border-b-2 pl-4 text-[18px] hover:text-[19px] font-semibold"><button on:click={()=>setOption(1)}>Qualification</button></li>
							<li class="p-2 border-b-2 pl-4 text-[18px] hover:text-[19px] font-semibold"><button on:click={()=>setOption(2)}>Blog</button></li>
							<li class="p-2 border-b-2 pl-4 text-[18px] hover:text-[19px] font-semibold"><button on:click={()=>setOption(3)}>Classes</button></li>
						</ul>
					</div>
				</div>
				
			<div>
				{#if option===1}
					<div class="m-4">
						<p class="font-semibold text-[18px]">Academic Qualification:</p>
						{#each teacherqual as qual,index}
							<div class="grid grid-cols-[30%_auto] w-[250px] border ml-4 m-2">
								<div>
									<img src={qual.image} class="w-14" alt="">
								</div>
								<div>
									<p>{qual.institute}</p>
									<p>{qual.from}-{qual.to}</p>
								</div>
							</div>
						{/each}
					</div>

					<div class="m-4">
						<p class="font-semibold text-[18px]">Skillsets :</p>
						<div class="flex">
							{#each teacherskills as skill,index}
								<div class="rounded-full bg-[#9ed2fa] m-2 dark:text-[#e1e1e1] dark:bg-[#070707]">
									<p class="px-2 py-1">{skill.body}</p>
								</div>
							{/each}
						</div>
					</div>

				{:else if option===2}
					<div class="grid grid-cols-3 mt-6 p-6 w-full">
						{#each blog as currblog, i}
							<a
								href="/commonverified/article/{currblog.id}"
								class="m-3 overflow-hidden bg-white hover:bg-[#efeded] rounded-md shadow-2xl pb-3 cursor-pointer dark:text-[#e1e1e1] dark:bg-[#070707]"
							>
								<div class="hover:scale-105">
									<div class="mb-3  rounded-full">
										<img
											src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/istockphoto-1143088863-612x612.jpg"
											alt="User "
											class=" w-[100%] items-center justify-center object-contain object-center"
										/>
									</div>
									<div class="px-4">
										<div>
											<h1 class="text-2xl font-semibold mb-2">
												{currblog.title}
											</h1>
										</div>
										<div class="flex flex-row">
											
											<p class="text-sm text-justify font-light">
												{formatDate(currblog.createdat)} | {currblog.timetoread} minutes read
											</p>

										</div>

										<div>
											<p class="text-md text-justify">
												{currblog.description.slice(0, 100)} ...
											</p>
										</div>
									</div>
								</div>
							</a>
						{/each}
					</div>

				{:else if option===3}
					<div>
						<div>
							<div>
								<h1 class="text-2xl font-bold mt-4 ml-8 dark:text-[#f3f2f2] ">Upcoming Classes</h1>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
								
								{#each classes as currClass}
									{#if classifyClass(currClass.start)}
										<div class=" bg-[#dfedf8] pb-6 grid grid-rows-[200px_auto] rounded-lg shadow-xl dark:text-[#e1e1e1] dark:bg-[#070707]">
											<div class="h-[200px] overflow-hidden">
												<img src={currClass.image} alt="Dashboard Icon" class="object-cover  max-h-[200px] w-[100%] hover:scale-105" />
											</div>
											<div class="px-4 pb-4">
												<div >
													<h1 class="text-xl font-bold mt-4">
														{currClass.title}
													</h1>
												</div>
							
												<div class="flex justify-between items-center ">
							
													<div class="mt-2">
														<div>
															<p class="text-sm"><span class="font-semibold">Duration : </span>  {currClass.duration} weeks</p>
														</div>
														<div>
															<p class="text-sm"><span class="font-semibold">Start : </span>{currClass.start}</p>
														</div>
													</div>
									
													<div>
														<button class="btn  font-semibold text-base p-2 bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[17px] hover:shadow-lg dark:text-[#e1e1e1] dark:bg-[#3b6f8e]" on:click={() => viewDetails(currClass)}>
															View Details
														</button>
													</div>
							
												</div>
											</div>
						
										</div>
									{/if}
								{/each}
							</div>
						</div>
						<div>
							<div>
								<h1 class="text-2xl font-bold mt-4 ml-8 dark:text-[#f3f2f2]">Running Classes</h1>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
								{#each classes as currClass}
									{#if classifyClass(currClass.start) === false}
									
										<div class=" bg-[#dfedf8] pb-6 grid grid-rows-[200px_auto] rounded-lg shadow-xl dark:text-[#e1e1e1] dark:bg-[#070707]">
							
											<div class="h-[200px] overflow-hidden">
												<img src={currClass.image} alt="Dashboard Icon" class="object-cover  max-h-[200px] w-[100%] hover:scale-105"/>
											</div>	
							
											<div class="px-4 pb-4">
												<div >
													<h1 class="text-xl font-bold mt-4">
														{currClass.title}
													</h1>
												</div>
								
												<div class="flex justify-between items-center ">
													<div class="mt-2">
														<div>
															<p class="text-sm"><span class="font-semibold">Duration : </span>  {currClass.duration} weeks</p>
														</div>
														<div>
															<p class="text-sm"><span class="font-semibold">Start : </span>{currClass.start}</p>
														</div>
													</div>
									
													<div>
														<a
															href="/trainerverified/runningclass/{currClass.id}/chat"
															class="btn  font-semibold text-base p-2 bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[17px] hover:shadow-lg dark:text-[#e1e1e1] dark:bg-[#3b6f8e]"
															data-sveltekit-prefetch
														>
															Go to Class
														</a>
													</div>
												</div>
											</div>
										</div>
									{/if}
								{/each}
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
		</div>
		
	</div>


	<!-- go back button -->
	
</div>

<!-- <pre>{JSON.stringify(teacherNow, null, 2)}</pre> -->
<!-- <pre>{JSON.stringify(blog, null, 2)}</pre> -->
<!-- <pre>{JSON.stringify(classes, null, 2)}</pre> -->
<!-- <pre>{JSON.stringify(teacherqual, null, 2)}</pre> -->
<!-- <pre>{JSON.stringify(teacherskills, null, 2)}</pre> -->
<!--<pre>{JSON.stringify(commonUserNow, null, 2)}</pre>
<pre>{JSON.stringify(follower, null, 2)}</pre> -->

<style>
	.navbar {
		background-color: rgb(188, 223, 253);
	}
	.appbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
	}

	.logo-container {
		display: flex;
		align-items: center;
	}

	.logo-container img {
		width: 50px;
		margin-right: 1rem;
	}
	.white-text {
		color: red;
	}
	.company-name {
		font-size: 2rem; /* Adjust font size as needed */
		margin-top: 1rem; /* Add spacing if necessary */
		font-family: 'CustomFont', sans-serif; /* Use your custom font */
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
