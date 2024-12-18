import { StorageType } from '../index.d';
export declare const createStore: <T extends object>(initialState: T, options?: {
    persistKey?: string;
    storageType?: StorageType;
}) => {
    getState: () => T;
    setState: (update: Partial<T>) => void;
    subscribe: (listener: () => void) => () => boolean;
    transaction: (callback: (update: (update: Partial<T>) => void) => void) => void;
};
