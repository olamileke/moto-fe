
export interface User {
    name:string,
    email:string,
    admin:boolean,
    avatar:string,
    busy_till:string | null,
    created_at:string | null
}