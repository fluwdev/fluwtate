import { StorageType } from "../index.d";

export const persistMiddleware = (
  key: string,
  storageType: StorageType = "localStorage"
) => {
  const storage = window[storageType];

  return (prevState: any, nextState: any) => {
    try {
      const serializedState = JSON.stringify(nextState);
      storage.setItem(key, serializedState);
    } catch (error) {
      console.error(`Failed to persist state in ${storageType}:`, error);
    }
  };
};
