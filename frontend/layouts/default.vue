<template>
    <div class="flex container mx-auto bg-slate-500 h-full overflow-auto items-start">
        <header class="bg-red-500 flex flex-col items-end w-[450px] h-full">
            <div class="bg-red-400 flex flex-col flex-1 p-4 w-[300px] h-full absolute">
                <div class="">
                    <img src="/favicon.png" class="h-12 mb-4" alt="logo">
                    <nav class="grid gap-4 text-white font-bold text-xl">
                        <NuxtLink class="flex items-center" to="/home"><span class="material-symbols-outlined text-3xl mr-3">home</span>Home</NuxtLink>
                        <NuxtLink class="flex items-center" to="/explore"><span class="material-symbols-outlined text-3xl mr-3">search</span>Explore</NuxtLink>
                        <NuxtLink class="flex items-center" to="/profile"><span class="material-symbols-outlined text-3xl mr-3">person</span>Profile</NuxtLink>
                        <button class="btn border-2 border-white hover:bg-white hover:text-red-400">post</button>
                    </nav>
                </div>
                <div class="flex-1 flex items-end ">
                    <div class="flex items-center justify-between w-full">
                        <div class="flex">
                            <span class="material-symbols-outlined text-5xl mr-3">account_circle</span> 
                            <div class="">
                                <p class="font-bold text-white">Username</p>
                                <p class="text-gray-600">@Username123</p>
                            </div>
                        </div>
                        
                        <span class="material-symbols-outlined text-3xl font-black text-white">logout</span>
                    </div>
                </div>
            </div>
        </header>
        <div class="flex-1 items-stretch flex ">
            <slot />
            <div class="w-[535px] bg-yellow-500">
                <div class="w-[350px] bg-yellow-400">
                    <h1>New Users</h1>
                    <h2 v-for="i in [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,]">Username</h2>
                </div>
                <h2 class="sticky top-0">Who to follow</h2>
            </div>
        </div>

    </div>
</template>