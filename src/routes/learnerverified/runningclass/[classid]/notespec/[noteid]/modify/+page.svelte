<script>
	import { onMount, onDestroy } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	const { classid, noteid } = $page.params;

	export let data;
	import { browser } from '$app/environment';
	// let value = false;
	let monacoEditor;
	let editorInstance;
	let memberid = null;

	import { isLearnerInClass } from '../../../../../../../stores/isLearnerInClass';

	function closeclassmodal() {
		memberid = null;
	}
	let { session, supabase, classNow, studentNow, students, ownerNow, accessPeople, teacherNow } =
		data;
	$: ({ session, supabase, classNow, studentNow, students, ownerNow, accessPeople, teacherNow } =
		data);

	const images = {
		text: 'https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/txt-svgrepo-com.svg',
		javascript:
			'https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/javascript-svgrepo-com.svg',
		typescript:
			'https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/typescript-logo-svgrepo-com.svg',
		html: 'https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/html-5-svgrepo-com.svg',
		css: 'https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/css-3-svgrepo-com.svg'
	};
	function getImage(variant) {
		return images[variant];
	}

	const documentId = noteid;
	let docTitle;

	let doclang;
	// function toggleVal() {
	// 	value = !value;
	// 	console.log(value);
	// }
	function debounce(func, wait, immediate) {
		var timeout;
		return function () {
			var context = this,
				args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	const hasAccess = (sid) => {
		for (let i = 0; i < accessPeople.length; i++) {
			if (accessPeople[i].cuid === studentNow.id) continue;
			if (accessPeople[i].cuid === sid) return true;
		}
		return false;
	};

	async function initMonaco(content = '// Your content here\n') {
		if (browser) {
			monacoEditor = await import('monaco-editor');

			editorInstance = monacoEditor.editor.create(document.getElementById('editor'), {
				value: content,
				language: `${doclang}`,
				theme: 'vs-dark'
			});

			// Handle editor changes with debounce to minimize database updates
			editorInstance.onDidChangeModelContent(
				debounce((event) => {
					updateDocument(editorInstance.getValue());
				}, 1000)
			); // Adjust debounce time as necessary
		}
	}
	async function loadDocument() {
		const { data, error } = await supabase
			.from('classnote')
			.select('*')
			.eq('id', documentId)
			.single();

		if (data) {
			docTitle = data.title;
			doclang = data.lang;

			initMonaco(data.content);
			subscribeToChanges();
		} else if (error) {
			console.error('Error loading document:', error);
		}
	}
	function subscribeToChanges() {
		supabase
			.channel(`custom-all-channel`)
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'classnote', filter: `id=eq.${documentId}` },
				(payload) => {
					console.log('Change received!', payload);
					const newContent = payload.new.content;
					if (newContent !== editorInstance.getValue()) {
						const position = editorInstance.getPosition();
						editorInstance.getModel().setValue(newContent);
						if (position) {
							editorInstance.setPosition(position);
						}
					}
				}
			)
			.subscribe();
	}

	async function updateDocument(content) {
		// Debounce this call to prevent excessive database updates
		await supabase.from('classnote').update({ content }).eq('id', documentId);
	}
	const handleSignOut = async () => {
		// console.log('logout start');
		await data.supabase.auth.signOut();
		// console.log('logout done');
		window.open('/trainerlogin', '_self');
	};

	onMount(async () => {
		loadDocument();
		isLearnerInClass.set({ classid: classNow.id, isClass: true });
	});

	onDestroy(() => {
		isLearnerInClass.set({ classid: '', isClass: false });
	});
</script>

<main>
	<nav class="appbar">
		<div class="logo-container">
			<Avatar src={classNow.image} width="w-12" rounded="rounded-full" />
			<h1 class="ml-3 text-4xl font-extrabold">{classNow.title}</h1>
		</div>
	</nav>
	<div class="ml-6 mt-6 mr-6">
		<div class="flex flex-row justify-between ml-6 mr-6">
			<div class="flex flex-col space-y-1">
				<h1 class="font-extrabold text-2xl font-mono">
					Notebook Name: {docTitle}
				</h1>
				<div class="flex flex-row space-x-2 mt-3">
					<img
						src={ownerNow.image}
						alt="Dashboard Icon"
						class="h-16 w-16 hover:rotate-12 rounded-full"
					/>
					<h1 class="font-semibold mt-3">
						{ownerNow.name}
					</h1>
				</div>
			</div>

			<img src={getImage(doclang)} alt="Dashboard Icon" class="h-16 w-16 hover:rotate-12" />
		</div>

		<div class="flex flex-row space-x-8">
			<div id="editor" class="w-4/5 min-h-screen rounded-lg shadow-lg p-4">
				<p>
					{doclang} content goes here ...
				</p>
			</div>
			<div class="flex flex-col">
				{#if ownerNow.id === studentNow.id}
					<form
						use:enhance
						action="?/addCollaborator"
						method="POST"
						on:submit={() => {
							closeclassmodal();
						}}
					>
						<label class="label text-left mb-2">
							<span>Share with Class Member</span>
							<select bind:value={memberid} class="select" id="memberid" name="memberid">
								{#each students as student}
									{#if hasAccess(student.currStudent.id) === false}
										<option value={student.currStudent.id}>
											<div class="flex flex-row space-x-1">
												<h1 class="font-semibold">{student.currStudent.name}</h1>
											</div>
										</option>
									{/if}
								{/each}
								{#if hasAccess(teacherNow.id) === false}
									<option value={teacherNow.id}>
										<div class="flex flex-row space-x-1">
											<h1 class="font-semibold">{teacherNow.name}</h1>
										</div>
									</option>
								{/if}
							</select>
						</label>
						<button
							class="p-2 bg-green-300 hover:bg-green-400 rounded-lg"
							type="submit"
							disabled={!memberid}
						>
							+ Add Collaborator
						</button>
					</form>
				{/if}

				<h1 class="font-bold text-xl mt-5 mb-4"><u>Currently Accessed By</u></h1>
				<div class="flex flex-col space-y-3">
					{#each accessPeople as people, i}
						<div class="flex flex-row justify-between mr-1">
							<div class="flex flex-row space-x-1">
								<h1 class="font-semibold">
									{i + 1}
								</h1>
								<img
									src={people.tuser.image}
									alt="Dashboard Icon"
									class="h-8 w-8 hover:rotate-12 rounded-full"
								/>
								<h1 class="font-semibold">
									{people.tuser.name}
								</h1>
							</div>
							{#if ownerNow.id === studentNow.id}
								<form action="?/deleteCollab&id={people.id}" method="POST">
									<button type="submit">
										<img
											src="https://rxkhdqhbxkogcnbfvquu.supabase.co/storage/v1/object/public/statics/remove-svgrepo-com.svg"
											alt="Dashboard Icon"
											class="h-5 mr-2 hover:rotate-12"
										/>
									</button>
								</form>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</main>

<style>
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
	.sidebar-item {
		display: block;
		padding: 0.75rem 1rem;

		text-decoration: none;
		transition:
			background-color 0.2s,
			color 0.2s;
		border-radius: 0.375rem; /* Tailwind's rounded-md */
	}
	.sidebar-item.active,
	.sidebar-item:hover {
		background-color: #ebebeb; /* Tailwind's gray-100 */
	}

	.sidebar-item:active {
		background-color: #e5e7eb; /* Tailwind's gray-200 */
	}

	@media (prefers-color-scheme: dark) {
		.sidebar-item {
			color: #d1d5db; /* Tailwind's gray-300 */
		}

		.sidebar-item:hover {
			background-color: #374151; /* Tailwind's gray-700 */
			color: #ffffff; /* White text for better contrast */
		}

		.sidebar-item:active {
			background-color: #4b5563; /* Tailwind's gray-600 */
		}
	}
</style>
