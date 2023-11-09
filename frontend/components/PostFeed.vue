
<script setup lang="ts">
    interface Author {
        username:String,
        name:String,
        userProfile:string,
        createdAt:String,
    }
    interface PostFeedProps {
        id:Number,
        content:String,
        image:String,
        createdAt:String,
        updatedAt:String,
        authorId:String,
        author:Author,
        commentId:Number,
        commentTo:PostFeedProps
        _count:{
            commentBy:Number,
            likedBy:Number,
            views:Number,
        }
    }
    defineProps({
        id:Number,
        content:String,
        image:String,
        createdAt:String,
        updatedAt:String,
        authorId:Number,
        author:{
            type: Object as PropType<Author>,
        },
        commentId:Number,
        commentTo: {
            type:Object as PropType<PostFeedProps[]>,
            default:() => []
        },
        _count:{
            type:Object as PropType<{
                commentBy:Number,
                likedBy:Number,
                views:Number,
            }>
        }
    })
</script>
<template>
    <div class="">
        <div class="flex gap-3">
            <img :src="author!.userProfile" class="rounded-full h-12">
            <div class="pr-4">
                <div class="flex gap-1">
                    <p class="font-bold text-white">{{ author!.name }}</p>
                    <p class="text-gray-200">@{{ author!.username }}</p>
                    <p class="text-gray-200">• {{ createdAt }}</p>
                </div>
                <p class="mb-4">{{ content }}</p>
                <img :src="image" class="rounded-2xl" v-if="image">
                <div class="flex align-center justify-between text-white mt-4">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-2xl">forum</span>
                        <p>{{ _count!.commentBy }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-2xl">equalizer</span>
                        <p>{{ _count!.views }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-2xl">favorite</span>
                        <p>{{ _count!.likedBy }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>