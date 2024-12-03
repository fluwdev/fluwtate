import type { Middleware } from "../types";

interface PersistenceOptions<S> {
  key: string;
  storage?: Storage;
  serializer?: (state: S) => string;
  deserializer?: (data: string) => S;
}

export function createPersistenceMiddleware<S>({
  key,
  storage = localStorage,
  serializer = JSON.stringify,
}: PersistenceOptions<S>): Middleware<S> {
  return (_, nextState) => {
    try {
      storage.setItem(key, serializer(nextState));
    } catch (error) {
      console.error("Error persisting state❌:", error);
    }
    return true;
  };
}

export function loadPersistedState<S>({
  key,
  storage = localStorage,
  deserializer = JSON.parse,
}: Pick<PersistenceOptions<S>, "key" | "storage" | "deserializer">):
  | S
  | undefined {
  try {
    const storedData = storage.getItem(key);
    return storedData ? deserializer(storedData) : undefined;
  } catch (error) {
    console.error("Error loading persisted state❌:", error);
    return undefined;
  }
}
