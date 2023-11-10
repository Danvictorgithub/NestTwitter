<script setup lang="ts">
    definePageMeta({
        middleware:'auth'
    })
    import {format} from "date-fns";
    const {userProfile} = useUserObj().value;
    const {id} = useRoute().params;
    const apiLink:string = useAPILink().value;
    const cookie = useCookie('token').value;

    interface Author {
        id:Number,
        username:String,
        name:String,
        userProfile:string,
        createdAt:String,
    }
    interface DataObj {
        id:Number,
        content:String,
        image:String,
        createdAt:String,
        updatedAt:String,
        authorId:Number,
        author:Author,
        commentId:Number,
        commentTo:DataObj,
        commentBy:DataObj[],
        _count:{
            commentBy:Number,
            likedBy:Number,
            views:Number,
        }
    }
    const result = await useFetch<DataObj>(`${apiLink}post/${id}`, {
        transform:((datas:any) => {
            datas.createdAt = format(new Date(datas.createdAt.toString()), 'MMM dd yyyy');
            datas.commentBy.forEach((data:DataObj) =>{
                data.createdAt = format(new Date(data.createdAt.toString()), 'MMM dd yyyy');
                data.commentBy = data.commentBy.filter((data:DataObj) =>{return data.authorId == 11});
            })
            return datas;
        }),
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${cookie}`
        },
        method: 'GET'
    });
    const {data, error} = result;
    console.log(data.value?.commentBy);
    if (error.value) {
        throw createError({statusCode:404,message:'Post not found'});
    }
    
</script>
<template>
    <article class="flex-1 flex flex-col p-4 w-[600px]">
        <NuxtLink to='/home' class="h-12 flex items-center text-white mb-6">
            <span class="material-symbols-outlined text-xl mx-3">arrow_back</span> 
            <p class="text-2xl font-bold">Post</p>
        </NuxtLink>
        <div class="flex items-center justify-between w-full">
            <div class="flex gap-2 mb-4">
                <img :src="data?.author.userProfile" class="rounded-full h-12">
                <div class="">
                    <p class="font-bold text-white">{{ data!.author.name}}</p>
                    <p class="text-gray-600">@{{data!.author.username}}</p>
                </div>
            </div>
            <button class="btn text-black border-2 w-24 border-white bg-white hover:bg-black hover:text-white active:bg-white">Follow</button>
        </div>
        <p class="mb-4 text-white">{{ data!.content  }}</p>
        <img :src="data?.image.toString()" class="rounded-2xl" v-if="data?.image">
        <div class="flex gap-1 text-white mt-4">
            <p>{{data?.createdAt}} ·</p>
            <p class="font-bold">{{ data?._count.views }} Views</p>
        </div>
        <div class="flex align-center justify-between text-white mt-4 border-b-2 border-white pb-2">
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-2xl">forum</span>
                <p>{{ data?._count.commentBy }}</p>
            </div>
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-2xl">favorite</span>
                <p>{{ data?._count.likedBy }}</p>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <!-- <div class="flex h-36 mt-4 gap-x-4">
                <img src="/profile.jpg" class="rounded-full h-12 mt-2">
                <div class="py-3 flex-1">
                    <input type="text" class="w-full h-10 mb-4 bg-inherit text-white text-xl placeholder:text-white border-0 outline-none" placeholder="What do you want to say?">
                    <div class="flex items-center justify-between border-t-2 pt-2">
                        <div>   
                            <span class="material-symbols-outlined mr-3 text-white">image</span>
                        </div>
                        <button class="px-2 w-20 btn text-white bg-red-400 ">post</button>
                    </div>
                </div>
            </div> -->
            <PostFormReply :image="userProfile"/>
            <PostFeedReply v-for="post in (data!.commentBy as any)" v-bind="post"/>
        </div>
    </article>
</template>