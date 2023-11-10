<script setup lang="ts">
    defineProps({
        image:String,
    })
    import {useFileDialog} from "@vueuse/core"
    // File handling
    const {id} = useRoute().params;
    const {createPostReply} = useUser();
    const formResponse = ref("");
    const formData:Ref<{content:string,image:null|File}> = ref({
        content:'',
        image:null})
    const uploadedImagepreview = ref("");
    const {files,open,reset,onChange} = useFileDialog({
        accept:`image/*`,
        // directory: true
    });
    onChange((files:any) => {
        formData.value.image = files[0];
        uploadedImagepreview.value = URL.createObjectURL(files[0]);
    })
    async function uploadPost() {
        const result:any = await createPostReply(formData.value.content, formData.value.image as File,id as unknown as number);
        if (result.statusCode == 400 || result.statusCode == 422) {
            formResponse.value = (Array.isArray(result.message)) ? result.message[0] : result.message;
        } 
        else {
            formResponse.value = "";
            reset();
            console.log(result);
            return await navigateTo(`/post/${result.id}`);
        }
    }
</script>
<template>
    <div>
        <div class="flex h-36 p-2">
            <div class="mr-4">
                <img :src="image" class="rounded-full h-12">
            </div>
            <div class="py-3 flex-1">
                <input v-model="formData.content" type="text" class="w-full h-10 mb-4 bg-inherit text-white text-xl placeholder:text-white border-0 outline-none" placeholder="What do you want to say?">
                <img :src="uploadedImagepreview" class="my-4 rounded-xl">
                <div class="flex items-center justify-between border-t-2 pt-2">
                    <div @click="(open as any)" class="cursor-pointer transition-opacity hover:bg-white hover:text-black text-white flex justify-center items-center rounded-md">   
                        <span class="material-symbols-outlined">image</span>
                    </div>
                    <button @click="uploadPost" class="px-2 w-20 btn border-red-600 text-white bg-red-600 hover:border-white hover:bg-white hover:text-red-600 active:bg-zinc-950  ">post</button>
                </div>
                <p class="text-white">{{ formResponse }}</p>
            </div>
        </div>
    </div>
</template>