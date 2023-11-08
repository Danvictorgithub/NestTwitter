<script setup lang="ts">
    definePageMeta({
        middleware:'auth'
    })
</script>
<template>
    <div class="flex-1 flex flex-col px-4 w-[600px] text-white">
        <div class="sticky top-0 h-[50px] z-10 backdrop-blur-md">
            <NuxtLink to='/' class="h-12 flex items-center text-white mb-6">
                <span class="material-symbols-outlined text-xl mx-3">arrow_back</span> 
                <p class="text-2xl font-bold">Post</p>
            </NuxtLink>
        </div>
        <div>
            <div class="relative h-[250px]">
                <img src="/cover.jpg" class="h-[200px] w-full object-cover rounded-xl" alt="">
                <img src="/alien.jpg" class="rounded-full absolute left-6 bottom-0 h-32 w-32 object-cover border-4">
            </div>
        </div>
        <div>
            <h1 class="text-2xl font-black items-center">Abdul Salim</h1>
            <p class="text-gray-400">@Username123</p>
            <div class="flex gap-1 mt-4">
                <span class="material-symbols-outlined">calendar_today</span>
                <p>October 22, 2023</p>
            </div>
            <div class="flex gap-4 py-3">
                <div class="flex gap-1">
                    <p class="font-black">0</p>
                    <p class="text-gray-400">Following</p>
                </div>
                <div class="flex gap-1">
                    <p class="font-black">0</p>
                    <p class="text-gray-400">Followers</p>
                </div>
            </div>
            <div class="flex items-center text-center h-[75px] font-bold text-gray-400">
                <NuxtLink to='./' class="w-full h-full flex items-center justify-center hover:bg-gray-900">Posts</NuxtLink>
                <NuxtLink to='./replies' class="w-full h-full flex items-center justify-center hover:bg-gray-900">Replies</NuxtLink>
                <NuxtLink to='./media' class="w-full h-full flex items-center justify-center hover:bg-gray-900">Media</NuxtLink>
                <NuxtLink to='./likes' class="w-full h-full flex items-center justify-center hover:bg-gray-900">Likes</NuxtLink>
            </div>
        </div>
    </div>
</template>
<style scoped>
.router-link-exact-active {
    color:white
}
</style>