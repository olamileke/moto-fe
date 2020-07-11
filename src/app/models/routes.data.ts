import { Route } from './route';

export interface RoutesData {
    data:{
        routes:Route[],
        total?:number
    }
}