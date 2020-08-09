
export interface Route {
    _id?:string;
    from:string;
    to:string;
    description:string;
    trips:number;
    distance:number;
    active:boolean;
    created_at:string | null
}