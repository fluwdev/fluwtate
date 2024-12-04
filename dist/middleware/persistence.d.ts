import { Middleware } from '../types';
interface PersistenceOptions<S> {
    key: string;
    storage?: Storage;
    serializer?: (state: S) => string;
    deserializer?: (data: string) => S;
}
export declare function createPersistenceMiddleware<S>({ key, storage, serializer, }: PersistenceOptions<S>): Middleware<S>;
export declare function loadPersistedState<S>({ key, storage, deserializer, }: Pick<PersistenceOptions<S>, "key" | "storage" | "deserializer">): S | undefined;
export {};
