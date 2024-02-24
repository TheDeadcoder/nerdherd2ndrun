<script>

    let homeVisible = 0;

</script>

<div class="pt-5 w-full mx-auto dark:bg-[#070707]">
    <div class="p-0 flex flex-col  w-full">
      
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="cursor-pointer flex-grow px-5 py-5 text-center font-bold text-2xl  border-r-4 text-[#57a8d6]  border-[#57a8d6] hover:bg-[#d8f0fd] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
                on:click={() => homeVisible = homeVisible^1}
            >
                Home

                {#if  homeVisible===1 }
                    <div>
                        <ul class="flex flex-col">
                            <li class=" cursor-pointer flex-grow px-5 py-5 text-center font-bold text-2xl hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]">
                                <a href="/trainerverified/home/recent" >
                                    Recent
                                </a>
                            </li>
                            <li class="cursor-pointer flex-grow px-5 py-5 text-center font-bold text-2xl hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"> 
                                <a href="/trainerverified/home/my" >
                                    My
                                </a>
                            </li>
                            <li class=" cursor-pointer flex-grow px-5 py-5 text-center font-bold text-2xl hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]">
                                <a href="/trainerverified/home/populer" >
                                    Populer
                                </a>
                            </li>
                            <li class="cursor-pointer flex-grow px-5 py-5 text-center font-bold text-2xl hover:bg-[#d8f0fd]  border-l-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]">
                                <a href="/trainerverified/home/saved" >
                                    Saved
                                </a>
                            </li>
                        </ul>
                    </div>
                {/if}

            </div>
           
            <div
                class="cursor-pointer flex-grow px-5 py-5 text-center
                       font-bold text-2xl hover:bg-[#d8f0fd]  
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
              
            >
                <a href="/trainerverified/library">
                    Library
                </a>
            </div>
            <div
                class="cursor-pointer flex-grow px-5 py-5 text-center
                       font-bold text-2xl hover:bg-[#d8f0fd]  
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
             
            >
                <a href="/trainerverified/classes">
                    Classes
                </a>
            </div>
            <div
                class="cursor-pointer flex-grow px-5 py-5 text-center
                       font-bold text-2xl hover:bg-[#d8f0fd]  
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
                
            >
                <a href="/trainerverified/contest">
                    Contest
                </a>
            </div>

            <div
                class="cursor-pointer flex-grow px-5 py-5 text-center
                       font-bold text-2xl hover:bg-[#d8f0fd] 
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
                
            >
                <a href="/trainerverified/planner" class="">
                    
                    Planner
                </a>
            </div>
     
    </div>
  </div>