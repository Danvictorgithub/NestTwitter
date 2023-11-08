export const useAPILink = () => useState<string>("apiLink", () => "http://localhost:8080/");
export const useUserObj = () => useState<{username:string,id:number,name:string,userProfile:string}>("userObj", () => {
    return {
        username: "",
        name: "",
        userProfile:"",
        id:NaN
    }
});