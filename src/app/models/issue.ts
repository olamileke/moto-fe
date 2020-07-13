
export interface Issue {
    _id:string,
    user:{
        _id:string,
        name:string,
        picture:string
    },
    vehicle:{
        _id:string,
        model:string,
        picture:string
    },
    picture:string,
    fixed:boolean,
    fixed_at:string,
    created_at:string
}