
<script>
    import Book from '$lib/Book.svelte';
    export let categoryName;
    export let url;
    export let books;

    let slider, currentSlidePosition = 0;
    $: nextDisabled = slider? (currentSlidePosition >= slider.scrollWidth -slider.clientWidth):false;
    $: prevDisablesd = currentSlidePosition <=0;

    const slide = (direction)=>{
        const moveAmount = slider.clientWidth *0.2;
        if (direction === "next" && currentSlidePosition < slider.scrollWidth - slider.clientWidth){
            currentSlidePosition += moveAmount
        }
        else if (direction === "prev" && currentSlidePosition >0){
            currentSlidePosition -= moveAmount;
        }
        slider.scrollTo({left:currentSlidePosition, behavior :'smooth'});
        
    }

   
</script>


<div>
    <div class="relative">
        <div class="mb-5">
            <h1>{categoryName}:</h1>
        </div>
        <div class="scroller" bind:this={slider} >
            {#each books as book}
                <Book book ={book} bind:url/>
            {/each}
        </div>  
       
        <div>
            <button class={prevDisablesd?"hidden" : "prev border-2 btn-style absolute top-1/2"} on:click={()=>slide("prev")} disabled={prevDisablesd}>&lt;-</button>
            <button class={nextDisabled?"hidden" : "next border-2 btn-style absolute top-1/2 right-0"} on:click={()=>slide("next")} disabled={nextDisabled}>-&gt;</button>
        </div>
        
    </div>
</div>

<style>
   
    .scroller{
        display: flex;
        flex:1 0 auto;
        gap: 1rem;
        flex-wrap: nowrap;
        overflow: scroll;  
        
    }
    .scroller::-webkit-scrollbar {
        display: none; 
    }
    .btn-style{
        
        border: 1px solid white;
        border-radius: 90%;
        padding: 20px;
        background-color: rgba(255, 255, 255, .4);
        font-size: large;
    }
</style>