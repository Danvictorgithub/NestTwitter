export const useUser = () => {
    const createPost = async (content:string,file:File):Promise<{id:number,statusCode:number,message:string}> => {
        const apiLink = useAPILink();
        const cookie = useCookie('token');
        const formData = new FormData();
        formData.append('content',content);
        if (file) {
            formData.append('image',file);
        }
        console.log(apiLink.value);
        const data = await $fetch(`${apiLink.value}post`,{
            headers:{
                ContentType: 'application/json',
                Authorization: `Bearer ${cookie.value}`
            },
            method: 'POST',
            body: formData
        }).catch(error => error.data);
        return data as {id:number,statusCode:number,message:string};
    }
    const createPostReply = async (content:string,file:File,postId:number):Promise<{id:number,statusCode:number,message:string}> => {
        const apiLink = useAPILink();
        const cookie = useCookie('token');
        const formData = new FormData();
        formData.append('content',content);
        if (file) {
            formData.append('image',file);
        }
        const data = await $fetch(`${apiLink.value}post/${postId}`,{
            headers:{
                ContentType: 'application/json',
                Authorization: `Bearer ${cookie.value}`
            },
            method: 'POST',
            body: formData
        }).catch(error => error.data);
        return data as {id:number,statusCode:number,message:string};
    }
    return {createPost, createPostReply}
}