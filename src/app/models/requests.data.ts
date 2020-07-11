import { Request } from './request';

export class RequestsData {
    data:{
        requests:Request[],
        total?:number
    }
}