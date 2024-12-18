import { Store, State, StateUpdater } from '../index.d';
export declare function createModule<S extends State, K extends keyof S>(store: Store<S>, moduleName: K): {
    getState: () => S[K];
    setState: (updater: StateUpdater<S[K]> | Partial<S[K]>) => void;
    subscribe: (listener: (state: S[K]) => void) => () => void;
};
