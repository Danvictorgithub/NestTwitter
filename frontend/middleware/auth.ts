export default defineNuxtRouteMiddleware(async (to,from) => {
    const token = useCookie('token');
    const apiLink = useAPILink();
    if (token.value === undefined) {
        await navigateTo('/login');
    }
    // Verify token
    const result = await $fetch(`${apiLink.value}auth/validate`,{
        headers:{
            Authorization: `Bearer ${token.value}`,
            ContentType: 'application/json',
        },
        method: 'GET',
    }).catch(error => {
        navigateTo("/login");
    });
    if (result) {
        const userObj = useUserObj();
        userObj.value = result;
        console.log(userObj.value.id);
    }
})
