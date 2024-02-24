<script>

    let tabs = ["Home", " Library", "Class", "Compete", "Chatbot","Planner"]
    let homeVisible = 0;

</script>

<div class="flex flex-col pt-20 w-full mx-auto justify-between">
    <div class="p-0 flex flex-col justify-between w-full">
      
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="text-black cursor-pointer flex-grow px-5 py-5 text-center font-bold text-2xl hover:bg-green-100 border-r-4 text-green-700 border-green-700"
                on:click={() => homeVisible = homeVisible^1}
            >
                Home

                {#if  homeVisible===1 }
                    <div>
                        <ul class="flex flex-col">
                            <li class="text-black cursor-pointer flex-grow px-5 py-5 text-center font-bold text-2xl hover:bg-green-100 border-r-4 text-green-700 border-green-700">
                                <a href="/trainerverified/home/recent" >
                                    Recent
                                </a>
                            </li>
                            <li class="text-black cursor-pointer flex-grow px-5 py-5 text-center font-bold text-2xl hover:bg-green-100 border-r-4 text-green-700 border-green-700"> 
                                <a href="/trainerverified/home/my" >
                                    My
                                </a>
                            </li>
                            <li class="text-black cursor-pointer flex-grow px-5 py-5 text-center font-bold text-2xl hover:bg-green-100 border-r-4 text-green-700 border-green-700">
                                <a href="/trainerverified/home/populer" >
                                    Populer
                                </a>
                            </li>
                            <li class="text-black cursor-pointer flex-grow px-5 py-5 text-center font-bold text-2xl hover:bg-green-100 border-r-4 text-green-700 border-green-700">
                                <a href="/trainerverified/home/saved" >
                                    Saved
                                </a>
                            </li>
                        </ul>
                    </div>
                {/if}

            </div>
           
            <div
                class="text-black cursor-pointer flex-grow px-5 py-5 text-center
                       font-bold text-2xl hover:bg-green-100 
                       border-r-4 text-green-700 border-green-700"
                on:click={() =>"hello"}
            >
                <a href="/trainerverified/library">
                    Library
                </a>
            </div>
            <div
                class="text-black cursor-pointer flex-grow px-5 py-5 text-center
                       font-bold text-2xl hover:bg-green-100 
                       border-r-4 text-green-700 border-green-700"
                on:click={() =>"hello"}
            >
                <a href="/trainerverified/classes">
                    Classes
                </a>
            </div>
            <div
                class="text-black cursor-pointer flex-grow px-5 py-5 text-center
                       font-bold text-2xl hover:bg-green-100 
                       border-r-4 text-green-700 border-green-700"
                on:click={() =>"hello"}
            >
                <a href="/trainerverified/contest">
                    Contest
                </a>
            </div>
            <div
                class="text-black cursor-pointer flex-grow px-5 py-5 text-center
                       font-bold text-2xl hover:bg-green-100 
                       border-r-4 text-green-700 border-green-700"
                
            >
                <a href="/trainerverified/planner" class="">
                    
                    Planner
                </a>
            </div>
     
    </div>
  </div>