
export interface User {
    name:string,
    email:string,
    admin:boolean,
    avatar:string,
    trips?:number | null
    busy_till?:string | null,
}