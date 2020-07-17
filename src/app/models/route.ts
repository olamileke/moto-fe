
export interface Route {
    _id?:string;
    name:string;
    description:string;
    trips:number;
    active:boolean;
    created_at:string | null
}