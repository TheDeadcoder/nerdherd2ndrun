<script>
    import {isRunningClass} from '../stores/isRunningClass'

    let classid = $isRunningClass.classid

    $: classid = $isRunningClass.classid

    let homeVisible = 0;


</script>

<div class="pt-5 w-full mx-auto dark:bg-[#070707]">
    <div class="p-0 flex flex-col  w-full">
      
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            
            <div
                class="cursor-pointer flex-grow px-5 py-5 text-center
                       font-bold text-2xl hover:text-[27px] hover:bg-[#d8f0fd]  
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
                class="cursor-pointer flex-grow px-5 py-5 text-center
                       font-bold text-2xl hover:text-[27px] hover:bg-[#d8f0fd]  
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
                class="cursor-pointer flex-grow px-5 py-5 text-center
                       font-bold text-2xl hover:text-[27px] hover:bg-[#d8f0fd]  
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
                
            >
                <a href="/trainerverified/runningclass/{classid}/credentials" class="sidebar-item">
                    <div class="flex flex-row">
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
                class="cursor-pointer flex-grow px-5 py-5 text-center
                       font-bold text-2xl hover:text-[27px] hover:bg-[#d8f0fd] 
                       border-r-4 text-[#57a8d6] border-[#57a8d6] dark:text-[#a7afb4] dark:border-[#a7afb4] dark:hover:bg-[#313b40]"
                
            >
                <a href="/trainerverified/runningclass/{classid}/live" class="sidebar-item">
                    <div class="flex flex-row">
                        <img
                            src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/conference-live-video-svgrepo-com.svg?t=2024-02-09T19%3A53%3A53.776Z"
                            alt="Dashboard Icon"
                            class="h-6 mr-3 hover:rotate-12"
                        />
                        <p class="font-bold">Go Live</p>
                    </div>
                </a>
            </div>
     
    </div>
  </div>