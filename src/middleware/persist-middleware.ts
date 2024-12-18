import { StorageType } from "../index.d";

export const persistMiddleware = <T extends object>(
  key: string,
  storageType: StorageType = "localStorage"
) => {
  const storage = window[storageType];

  return (_prevState: T, nextState: T) => {
    try {
      const serializedState = JSON.stringify(nextState);
      storage.setItem(key, serializedState);
    } catch (error) {
      console.error(`Failed to persist state in ${storageType}:`, error);
    }
  };
};
