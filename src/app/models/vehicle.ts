
export interface Vehicle {
    model:string,
    plate_number:string,
    picture:string,
    reserved_till:Date | null,
    created_at:Date
}