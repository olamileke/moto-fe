import { User } from './user';

export interface UserData {
    data:{
        user:User,
        token?:string
    }
}