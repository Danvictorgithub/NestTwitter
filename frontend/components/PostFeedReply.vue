
<script setup lang="ts">
    interface Author {
        id:Number
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
        commentTo:PostFeedProps,
        commentBy:PostFeedProps[],
        _count:{
            commentBy:Number,
            likedBy:Number,
            views:Number,
        }
    }
    const props = defineProps({
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
            type:Object as PropType<PostFeedProps>
        },
        commentBy: {
            type:Array as PropType<PostFeedProps[]>,
        },
        _count:{
            type:Object as PropType<{
                commentBy:Number,
                likedBy:Number,
                views:Number,
            }>
        }
    })
    const {userProfile} = useUserObj().value;
    import {useFileDialog} from "@vueuse/core"
    // Modal commands
    const modal = ref(false);
    function closeModal() {
        modal.value = false;
    }
    function openModal() {
        modal.value = true;
    }
    // File handling
    const {createPostReply} = useUser();
    const formResponse = ref("");
    const formData:Ref<{content:string,image:null|FileList}> = ref({
        content:'',
        image:null})
    const uploadedImage = ref();
    const uploadedImagepreview = ref("");
    const {files,open,reset,onChange} = useFileDialog({
        accept:`image/*`,
        // directory: true
    });
    onChange((files) => {
        formData.value.image = files![0] as unknown as FileList;
        uploadedImagepreview.value = URL.createObjectURL(files![0]);
    })
    async function uploadPost(e:Event) {
        const target = e.target as HTMLElement
        const result:{statusCode:number,id:number,message:string} = await createPostReply(formData.value.content, formData.value.image as unknown as File,parseInt(target.id));
        if (result.statusCode == 400 || result.statusCode == 422) {
            formResponse.value = (Array.isArray(result.message)) ? result.message[0] : result.message;
        }
        else {
            formResponse.value = "";
            reset();
            closeModal();
            return await navigateTo(`/post/${result.id}`);
        }
    }
    console.log(props.commentBy)
</script>
<template>
    <div class="top-0 absolute h-full w-full z-10 flex justify-center items-center right-0" v-if="modal">
        <div @click="closeModal" class="bg-slate-700  opacity-75 absolute top-0 h-full w-full"></div>
        <div class="text-white z-20 bg-black rounded-xl w-[600px] mx-4 p-4 flex flex-col">
        <div>
            <button @click="closeModal">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        <div class="p-2 flex gap-4 flex-1">
            <img :src="userProfile" class="rounded-full left-6 bottom-0 h-12 w-12 object-cover">
            <div class="w-full">
                <textarea
                    v-model="formData.content"
                    id="dynamic-textarea"
                    class="min-h-0 bg-black outline-none text-2xl font-medium w-full wrap resize-none overflow-hidden"
                    minlength="1"
                    maxlength="280"
                    placeholder="Say what you want to say"
                    autofocus
                    oninput="this.value = this.value.trim(); this.style.height = ''; this.style.height = (this.scrollHeight) + 'px';"
                ></textarea>
                <img class="my-4 rounded-2xl" :src="uploadedImagepreview">
            </div>
        </div>
        <div class="flex items-center justify-between border-t-2 pt-2">
            <div @click="(open as any)" class="cursor-pointer flex justify-center items-center">   
                <span class="material-symbols-outlined mr-3 text-white">image</span>
            </div>
            <button @click="uploadPost" :id="(id?.toString())" class="px-2 w-20 btn border-red-600 text-white bg-red-600 hover:border-white hover:bg-white hover:text-red-600 active:bg-zinc-950  ">post</button>
        </div>
        <div>
            <p class="text-white">{{formResponse}}</p>
        </div>
    </div>


    </div>
        <div>
            <div class="flex gap-3">
                <NuxtLink :to="`/profile/${authorId}`" v-if="commentBy!.length > 0" class="flex flex-col justify-center items-center after:content-[''] after:border-2 after:h-full after:text-center after:my-2">
                    <img :src="author!.userProfile" class="rounded-full h-12" v-if="author?.userProfile">
                    <img src="/profile.jpg" class="rounded-full h-12" v-else>
                </NuxtLink>
                <NuxtLink :to="`/profile/${authorId}`" v-else>
                    <img :src="author!.userProfile" class="rounded-full h-12" v-if="author?.userProfile">
                    <img src="/profile.jpg" class="rounded-full h-12" v-else>
                </NuxtLink>a
                <div class="pr-4 w-full">
                    <div class="flex gap-1">
                        <NuxtLink :to="`/profile/${authorId}`">
                            <p class="font-bold text-white">{{ author!.name }}</p>
                        </NuxtLink>
                        <NuxtLink :to="`/profile/${authorId}`">
                            <p class="text-gray-200">@{{ author!.username }}</p>
                        </NuxtLink>
                        <p class="text-gray-200">• {{ createdAt }}</p>
                    </div>
                    <NuxtLink :to="`/post/${id?.toString()}`">
                        <p class="mb-4 text-white">{{ content }}</p>
                        <img :src="image" class="rounded-2xl" v-if="image">
                    </NuxtLink>
                    <div class="flex align-center justify-between text-white mt-4">
                        <div @click="openModal" :id="id?.toString()" class="hover:bg-white hover:text-black rounded-xl flex items-center gap-2 transition">
                            <span class="material-symbols-outlined text-2xl">forum</span>
                            <p>{{ _count!.commentBy }}</p>
                        </div>
                        <div class="hover:bg-white hover:text-black rounded-xl flex items-center gap-2 transition">
                            <span class="material-symbols-outlined text-2xl">equalizer</span>
                            <p>{{ _count!.views }}</p>
                        </div>
                        <div class="hover:bg-white hover:text-black rounded-xl flex items-center gap-2 transition">
                            <span class="material-symbols-outlined text-2xl">favorite</span>
                            <p>{{ _count!.likedBy }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex gap-3 bg-gray-900 rounded-lg mt-2 " v-if="commentBy!.length > 0" v-for="authorReply in commentBy">
                <NuxtLink :to="`/profile/${authorReply.authorId}`" >
                    <img :src="authorReply.author!.userProfile" class="rounded-full h-12" v-if="authorReply.author?.userProfile">
                    <img src="/profile.jpg" class="rounded-full h-12" v-else>
                </NuxtLink>
                <div class="pr-4 w-full">
                    <div class="flex gap-1">
                        <NuxtLink :to="`/profile/${authorReply.authorId}`">
                            <p class="font-bold text-white">{{ authorReply.author!.name }}</p>
                        </NuxtLink>
                        <NuxtLink :to="`/profile/${authorId}`">
                            <p class="text-gray-200">@{{ authorReply.author!.username }}</p>
                        </NuxtLink>
                        <p class="text-gray-200">• {{ authorReply.createdAt }}</p>
                    </div>
                    <NuxtLink :to="`/post/${id?.toString()}`">
                        <p class="mb-4 text-white">{{ authorReply.content }}</p>
                        <img :src="authorReply.image.toString()" class="rounded-2xl" v-if="authorReply.image">
                    </NuxtLink>
                    <!-- <div class="flex align-center justify-between text-white mt-4">
                        <div @click="openModal" :id="id?.toString()" class="hover:bg-white hover:text-black rounded-xl flex items-center gap-2 transition">
                            <span class="material-symbols-outlined text-2xl">forum</span>
                            <p>{{ _count!.commentBy }}</p>
                        </div>
                        <div class="hover:bg-white hover:text-black rounded-xl flex items-center gap-2 transition">
                            <span class="material-symbols-outlined text-2xl">equalizer</span>
                            <p>{{ _count!.views }}</p>
                        </div>
                        <div class="hover:bg-white hover:text-black rounded-xl flex items-center gap-2 transition">
                            <span class="material-symbols-outlined text-2xl">favorite</span>
                            <p>{{ _count!.likedBy }}</p>
                        </div>
                    </div> -->
                </div>
            </div> 
        </div>
</template>