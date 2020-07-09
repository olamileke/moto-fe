
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
        name:string
    };
    approved:boolean;
    pending:boolean;
    expires_at:string;
    created_at:string
}