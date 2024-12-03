import type { Middleware } from "../types";

interface AsyncPersistenceOptions<S> {
  key: string;
  storage: {
    setItem: (key: string, value: string) => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
  };
  serializer?: (state: S) => string;
  deserializer?: (data: string) => S;
}

// Middleware asincrónico de persistencia
export function createAsyncPersistence<S>({
  key,
  storage,
  serializer = JSON.stringify,
}: AsyncPersistenceOptions<S>): Middleware<S> {
  return (_, nextState) => {
    Promise.resolve(storage.setItem(key, serializer(nextState))).catch(
      (error) => console.error("Error persisting state❌:", error)
    );
    return true;
  };
}

// Cargar estado de forma asincrónica
export async function loadAsyncPersistedState<S>({
  key,
  storage,
  deserializer = JSON.parse,
}: Pick<
  AsyncPersistenceOptions<S>,
  "key" | "storage" | "deserializer"
>): Promise<S | undefined> {
  try {
    const storedData = await storage.getItem(key);
    return storedData ? deserializer(storedData) : undefined;
  } catch (error) {
    console.error("Error loading persisted state❌:", error);
    return undefined;
  }
}
