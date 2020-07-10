
export interface Vehicle {
    _id?:string,
    model:string,
    plate_number:string,
    picture:string,
    trips:number,
    pending:boolean,
    reserved_till:string,
    created_at:string
}