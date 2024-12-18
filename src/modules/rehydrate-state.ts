import { StorageType } from "../index.d";

export const rehydrateState = <T>(
  key: string,
  initialState: T,
  storageType: StorageType = "localStorage"
): T => {
  try {
    const storage = window[storageType];
    const storedData = storage.getItem(key);

    if (!storedData) {
      return initialState;
    }

    const parsedData = JSON.parse(storedData);
    return { ...initialState, ...parsedData };
  } catch (error) {
    console.error(`Failed to rehydrate state from ${storageType}:`, error);
    return initialState;
  }
};
