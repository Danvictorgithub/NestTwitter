export const useAPILink = () => useState<string>("apiLink", () => process.env.API!);
export const useUserObj = () => useState<{username:string,id:number,name:string,userProfile:string}>("userObj", () => {
    return {
        username: "",
        name: "",
        userProfile:"",
        id:NaN
    }
});