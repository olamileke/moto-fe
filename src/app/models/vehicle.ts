
export interface Vehicle {
    _id?:string,
    model:string,
    plate_number:string,
    picture:string,
    reserved_till:Date | null,
    created_at:Date
}