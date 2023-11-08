<script setup lang="ts">
    import {format} from "date-fns";
    definePageMeta({
        middleware:'auth'
    })
    const {id} = useRoute().params;
    const apiLink:Ref<string> = useAPILink();
    const cookie = useCookie('token');
    const {data, error}:any = await useFetch(`${apiLink.value}user/${id}`, {
        headers: {
            ContentType: 'applicaton/json',
            Authorization: `Bearer ${cookie.value}`
        },
        method: 'GET'
    });
    if (error.value ) {
        throw createError({statusCode:404,message:'User not found'});
    }
    console.log(data.userProfile)
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
                <img :src="data.userCover" class="h-[200px] w-full object-cover rounded-xl" alt="">
                <img :src="data.userProfile" class="rounded-full absolute left-6 bottom-0 h-32 w-32 object-cover border-4">
            </div>
        </div>
        <div>
            <h1 class="text-2xl font-black items-center">{{ data.name }}</h1>
            <p class="text-gray-400">@{{ data.username }}</p>
            <div class="flex gap-1 mt-4">
                <span class="material-symbols-outlined">calendar_today</span>
                <p>{{ format(new Date(data.createdAt),'MMMM dd yyyy') }}</p>
            </div>
            <div class="flex gap-4 py-3">
                <div class="flex gap-1">
                    <p class="font-black">{{data._count.following}}</p>
                    <p class="text-gray-400">Following</p>
                </div>
                <div class="flex gap-1">
                    <p class="font-black">{{ data._count.followers }}</p>
                    <p class="text-gray-400">Followers</p>
                </div>
            </div>
            <div class="flex items-center text-center h-[75px] font-bold text-gray-400">
                <NuxtLink to='./' class="w-full h-full flex items-center justify-center hover:bg-gray-900">Posts</NuxtLink>
                <NuxtLink to='./replies' class="w-full h-full flex items-center justify-center hover:bg-gray-900">Replies</NuxtLink>
                <NuxtLink to='./media' class="w-full h-full flex items-center justify-center hover:bg-gray-900">Media</NuxtLink>
                <NuxtLink to='./likes' class="w-full h-full flex items-center justify-center hover:bg-gray-900">Likes</NuxtLink>
            </div>
            <div class="flex flex-col gap-2 mt-4" >
                <PostFeed v-for="i in [true,false,true,false,true,false,true,false,true,false,true,false,]" :image="i" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.router-link-exact-active {
    color:white
}
</style>