import { Store, State } from '../types';
export declare function useStore<S extends State, T = S>(store: Store<S>, selector?: (state: S) => T): T;
