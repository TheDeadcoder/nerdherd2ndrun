<script lang="ts">
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
</script>

<div>
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

	<div class="h-screen flex justify-center mt-5">
		<div class="grid grid-cols-[30%_auto] w-4/5 ">
			<div class="w-1/4 border-none border-r-2 border-black">
				
				<div class="flex justify-center">
					<img src={teacherNow.image} alt="" class="border-2 border-black rounded-full h-[200px]" />
				</div>
				<div class="p-3 m-3 ">
					<p class="text-2xl font-semibold">{teacherNow.name}</p>
					<p class="font-thin">{teacherNow.email}</p>
					<p class="font-thin">{teacherNow.institute}</p>
					<div class="mt-3">
						<p>{teacherNow.about}</p>
					</div>
				</div>

				<div>
					<ul class="">
						<li class="p-2 border-b-2 pl-4 text-[18px] hover:text-[19px] font-semibold">Qualification</li>
						<li class="p-2 border-b-2 pl-4 text-[18px] hover:text-[19px] font-semibold">Blog</li>
						<li class="p-2 border-b-2 pl-4 text-[18px] hover:text-[19px] font-semibold">Classes</li>
						
					</ul>
				</div>
			</div>

			<div>

			</div>
		</div>
	</div>
</div>

<pre>{JSON.stringify(teacherNow, null, 2)}</pre>
<pre>{JSON.stringify(blog, null, 2)}</pre>
<pre>{JSON.stringify(classes, null, 2)}</pre>
<pre>{JSON.stringify(teacherqual, null, 2)}</pre>
<pre>{JSON.stringify(teacherskills, null, 2)}</pre>
<pre>{JSON.stringify(commonUserNow, null, 2)}</pre>
<pre>{JSON.stringify(follower, null, 2)}</pre>

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
