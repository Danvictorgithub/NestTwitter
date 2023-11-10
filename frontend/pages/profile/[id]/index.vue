<script setup lang="ts">
    import {format} from "date-fns";
    definePageMeta({
        middleware:'auth'
    })
    import {nanoid} from "nanoid";
    const {id} = useRoute().params;
    const apiLink:Ref<string> = useAPILink();
    const cookie = useCookie('token');
    const {data, error, pending}:any = await useFetch(`${apiLink.value}user/${id}`, {
        transform:(datas:any) => {
            datas.createdAt = format(new Date(datas.createdAt), 'MMM dd yyyy');
            datas.posts.forEach((post:any) => {
                post.createdAt = format(new Date(post.createdAt), 'MMM dd yyyy');
            });
            return datas;
        },
        headers: {
            ContentType: 'applicaton/json',
            Authorization: `Bearer ${cookie.value}`
        },
        method: 'GET'
    });
    if (error.value ) {
        throw createError({statusCode:404,message:'User not found'});
    }
</script>
<template>
    <div class="flex-1 flex flex-col px-4 w-[600px] text-white">
        <div class="sticky top-0 h-[50px] z-10 backdrop-blur-md">
            <NuxtLink to='/home' class="h-12 flex items-center text-white mb-6">
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
                <p>{{ data.createdAt}}</p>
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
                <NuxtLink :to="`/profile/${id}`" class="w-full h-full flex items-center justify-center hover:bg-gray-900">Posts</NuxtLink>
                <NuxtLink :to="`/profile/${id}/replies`" class="w-full h-full flex items-center justify-center hover:bg-gray-900">Replies</NuxtLink>
                <NuxtLink :to="`/profile/${id}/media`" class="w-full h-full flex items-center justify-center hover:bg-gray-900">Media</NuxtLink>
                <NuxtLink :to="`/profile/${id}/likes`" class="w-full h-full flex items-center justify-center hover:bg-gray-900">Likes</NuxtLink>
            </div>
            <div class="flex flex-col gap-2 mt-4 mb-20" ref="el">
                <PostFeed v-for="post in data.posts" v-bind="post" />
            </div>
        </div>
    </div>
</template>
<!-- <template></template> -->
<style scoped>
.router-link-exact-active {
    color:white
}
</style>