import { Middleware } from '../types';
interface AsyncPersistenceOptions<S> {
    key: string;
    storage: {
        setItem: (key: string, value: string) => Promise<void>;
        getItem: (key: string) => Promise<string | null>;
    };
    serializer?: (state: S) => string;
    deserializer?: (data: string) => S;
}
export declare function createAsyncPersistence<S>({ key, storage, serializer, }: AsyncPersistenceOptions<S>): Middleware<S>;
export declare function loadAsyncPersistedState<S>({ key, storage, deserializer, }: Pick<AsyncPersistenceOptions<S>, "key" | "storage" | "deserializer">): Promise<S | undefined>;
export {};
