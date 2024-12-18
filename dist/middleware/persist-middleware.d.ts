import { StorageType } from '../index.d';
export declare const persistMiddleware: <T extends object>(key: string, storageType?: StorageType) => (_prevState: T, nextState: T) => void;
