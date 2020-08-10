
export class Request {
    _id:string;
    user:{
        _id:string;
        name:string;
        avatar:string;
    };
    vehicle:{
        _id:string;
        model:string;
        plate_number:string;
        picture:string;
    };
    route:{
        _id:string;
        from:string;
        to:string;
    };
    distance:number;
    approved:boolean;
    pending:boolean;
    expires_at:string;
    created_at:string
}