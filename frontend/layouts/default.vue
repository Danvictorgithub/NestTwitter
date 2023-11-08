<script setup>
    const {username,name,id,userProfile} = useUserObj().value;
    const {logout} = useAuths();
</script>
<template>
    <div class="flex container mx-auto h-full overflow-auto items-start no-scrollbar">
        <header class=" flex flex-col items-end w-[450px] h-full">
            <div class="flex flex-col flex-1 p-4 w-[300px] h-full absolute">
                <div class="">
                    <div class="flex justify-start items-baseline">
                        <img src="/favicon.png" class="h-12 mb-4" alt="logo">
                        <h1 class="text-white font-black text-3xl">Ibon</h1>
                    </div>
                    <nav class="grid gap-4 text-white font-bold text-xl">
                        <NuxtLink class="flex items-center" to="/home"><span class="material-symbols-outlined text-3xl mr-3">home</span>Home</NuxtLink>
                        <NuxtLink class="flex items-center" to="/explore"><span class="material-symbols-outlined text-3xl mr-3">search</span>Explore</NuxtLink>
                        <NuxtLink class="flex items-center" :to="`/profile/${id}`" ><span class="material-symbols-outlined text-3xl mr-3">person</span>Profile</NuxtLink>
                        <button class="btn border-2 border-red-600 bg-red-600 hover:border-white hover:bg-white hover:text-red-600 active:bg-zinc-950  ">post</button>
                    </nav>
                </div>
                <div class="flex-1 flex items-end ">
                    <div class="flex items-center justify-between w-full">
                        <div class="flex">
                            <span class="material-symbols-outlined text-5xl mr-3 text-white" v-if="userProfile == ''">account_circle</span>
                            <img :src="userProfile" class="rounded-full left-6 bottom-0 h-16 w-16 object-cover" alt="user_profile" v-else>
                            <div class="">
                                <p class="font-bold text-white">{{ name }}</p>
                                <p class="text-gray-600">@{{username}}</p>
                            </div>
                        </div>
                        <button @click="logout" class="hover:bg-white hover:text-black text-white h-12 w-12 rounded-lg">
                            <span class="material-symbols-outlined text-3xl font-black">logout</span>
                        </button> 
                    </div>
                </div>
            </div>
        </header>
        <div class="flex-1 items-stretch flex">
            <slot />
            <div class="w-[500px p-4 text-white">
                <div class="w-[350px] flex flex-col gap-2 mb-4 rounded-xl bg-zinc-900 p-4">
                    <h1 class="text-3xl font-bold pb-2">New Users</h1>
                    <User v-for="i in [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10]"/>
                </div>
                <div class="pb-2 sticky top-10 mb-4 rounded-xl bg-zinc-900 p-4">
                    <h2 class="text-3xl font-bold mb-4">Who to follow</h2>
                    <div class="flex flex-col gap-2 mb-4">
                        <User v-for="i in [1,2,3,4,5,6,7,8,9,10]"/>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>