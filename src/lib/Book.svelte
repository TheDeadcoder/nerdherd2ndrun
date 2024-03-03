<script>
	export let book;
	export let url;
	// import PdfViewer from "svelte-pdf";
	import { onMount } from 'svelte';
	import { isOverlayPdf } from '../stores/OverlayPdf';
	import { createEventDispatcher } from 'svelte';
	import exp from 'constants';

	const dispatch = createEventDispatcher();

	const sendDataToParent = (book_url) => {
		isOverlayPdf.set(true);
		// dispatch('change',{url : book_url})
		url = book_url;
	};
</script>

<div class="w-[250px] min-w-[200px]">
	<button on:click={() => sendDataToParent(book.content)}>
		<div class="grid grid-rows-[300px_75px] border-1">
			<div class="w-100%">
				<img style="width: 100%; height : 100%;" src={book.coverimg} alt="" />
			</div>
			<div>
				<h1>{book.title}</h1>
				<h2>{book.author}</h2>
				<h3 class="font-bold">Price : {book.price}</h3>
			</div>
		</div>
	</button>
</div>
