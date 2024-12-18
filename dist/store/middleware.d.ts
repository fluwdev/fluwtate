import { Middleware } from '../index.d';
export declare function runMiddlewares<S>(stack: Middleware<S>[], prevState: S, nextState: S): boolean;
