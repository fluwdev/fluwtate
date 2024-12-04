import { Middleware } from '../types';
export declare function runMiddlewares<S>(stack: Middleware<S>[], prevState: S, nextState: S): boolean;
