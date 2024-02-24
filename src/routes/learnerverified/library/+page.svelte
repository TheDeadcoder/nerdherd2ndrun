<script lang="ts">
	import Footer from '$lib/footer.svelte';
	import BookCategory from '../../../lib/Book_category.svelte';
	import OverlayPdf from '$lib/OverlayPdf.svelte';
	import { isOverlayPdf } from '../../../stores/OverlayPdf';
	import { AppRail, LightSwitch, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';

	let currentTile: number = 1;

	export let data;

	let { session, supabase, book } = data;
	$: ({ session, supabase, book } = data);

	let categoryName = ['Children Book', 'Science', 'Art', 'Finance'];
	let url = '';

	$: console.log(url);

	const handleSignOut = async () => {
		//	await data.supabase.auth.signOut();
		window.open('/accessType', '_self');
	};
</script>

<div>
	<div>
		<div class="navbar">
			<nav class="appbar grid grid-cols-2 justify-between">
				<div class="logo-container">
					<img
						src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/GeekGlasses.png"
						class="transform transition duration-300 hover:rotate-12"
						alt="title"
						width={60}
					/>
					<span class="company-name text-2xl font-extrabold">NerD</span><span
						class="company-name white-text text-2xl font-extrabold">Admin</span
					>
				</div>
				<div>
					<ul class="links">
						<li>
							<a href="/adminverified/home" class="flex items-center p-1 font-bold"
								><img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/home-house-svgrepo-com.svg"
									alt="Dashboard Icon"
									class="h-6 mr-1 hover:rotate-12"
								/>
								Home</a
							>
						</li>
						<li>
							<a href="/adminverified/home" class="flex items-center p-1 font-bold"
								><img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/robot-one-svgrepo-com.svg"
									alt="Dashboard Icon"
									class="h-6 mr-1 hover:rotate-12"
								/>
								FineTune</a
							>
						</li>
						<li>
							<a href="/adminverified/home" class="flex items-center p-1 font-bold"
								><img
									src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/add-user-add-svgrepo-com.svg"
									alt="Dashboard Icon"
									class="h-6 mr-1 hover:rotate-12"
								/>
								Add Trainer</a
							>
						</li>
						<li>
							<LightSwitch />
						</li>
						<li on:click={handleSignOut}>
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/logout-arrows-svgrepo-com.svg"
								alt="Dashboard Icon"
								class="h-8 mr-1 hover:rotate-12 hover:scale-110"
							/>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	</div>
	<div class="grid grid-cols-[8%_auto] mt-[80px]">
		<div class="">
			<div class="fixed">
				<AppRail class="h-screen w-fit overflow-hidden">
					<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
						<a
							href="/trainerverified/home/recent"
							class="flex flex-col items-center justify-center p-3 font-bold"
							><img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/clock-svgrepo-com.svg"
								alt="Dashboard Icon"
								class="h-10 w-10 hover:rotate-12 hover:scale-105"
							/>
							Recent
						</a>
					</AppRailTile>
					<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
						<a
							href="/trainerverified/home/my"
							class="flex flex-col items-center justify-center p-3 font-bold"
							><img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/personal-account-account-svgrepo-com.svg"
								alt="Dashboard Icon"
								class="h-10 w-10 hover:rotate-12 hover:scale-105"
							/>
							My Articles
						</a>
					</AppRailTile>
					<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
						<a
							href="/trainerverified/home/popular"
							class="flex flex-col items-center justify-center p-3 font-bold"
							><img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/fire-svgrepo-com.svg"
								alt="Dashboard Icon"
								class="h-10 w-10 hover:rotate-12 hover:scale-105"
							/>
							Popular
						</a>
					</AppRailTile>

					<AppRailTile bind:group={currentTile} name="tile-5" value={4} title="tile-5">
						<a
							href="/trainerverified/home/saved"
							class="flex flex-col items-center justify-center p-3 font-bold"
							><img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/save-save-the-document-svgrepo-com.svg"
								alt="Dashboard Icon"
								class="h-10 w-10 hover:rotate-12 hover:scale-105"
							/>
							Saved
						</a>
					</AppRailTile>

					<!-- --- -->
					<svelte:fragment slot="trail">
						<div class="mb-24 flex flex-col items-center justify-center" on:click={handleSignOut}>
							<img
								src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/power-button-svgrepo-com.svg"
								alt="Dashboard Icon"
								class="h-10 w-10 hover:rotate-12 hover:scale-105"
							/>
							Logout
						</div>
					</svelte:fragment>
				</AppRail>
			</div>
		</div>
		<div class="mt-2">
			<BookCategory categoryName="Childrean" books={book} bind:url></BookCategory>
			<BookCategory categoryName="Science" books={book} bind:url></BookCategory>
		</div>

		<Footer />
	</div>

	{#if $isOverlayPdf}
		<OverlayPdf {url} />
	{/if}
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
	.navbar {
		overflow: hidden;
		position: fixed; /* Set the navbar to fixed position */
		top: 0; /* Position the navbar at the top of the page */
		width: 100%; /* Full width */
		z-index: 5;
		background-color: rgb(188, 223, 253);
	}
	.appbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;

		border-bottom: 1px solid #ccc;
	}

	.logo-container {
		display: flex;
		align-items: center;
	}

	.logo-container img {
		width: 50px;
		margin-right: 1rem;
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
