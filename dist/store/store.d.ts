import { Store, State } from '../types';
export declare function createStore<S extends State>(initialState: S | (() => Promise<S>)): Store<S>;
