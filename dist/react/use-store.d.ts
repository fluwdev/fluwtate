import { Store, State } from '../index.d';
export declare function useStore<S extends State, T = S>(store: Store<S>, selector?: (state: S) => T): T;
