import { StorageType } from "../index.d";
import { persistMiddleware } from "../middleware/persist-middleware";
import { rehydrateState } from "../modules/rehydrate-state";

export const createStore = <T extends object>(
  initialState: T,
  options?: { persistKey?: string; storageType?: StorageType }
) => {
  const { persistKey, storageType = "localStorage" } = options || {};

  const listeners = new Set<() => void>();
  let currentState = persistKey
    ? rehydrateState<T>(persistKey, initialState, storageType)
    : initialState;

  let transactionActive = false;
  let transactionBuffer: Partial<T> | null = null;

  const getState = () => currentState;

  const setState = (update: Partial<T>) => {
    if (transactionActive) {
      transactionBuffer = { ...transactionBuffer, ...update };
    } else {
      applyState(update);
    }
  };

  const applyState = (update: Partial<T>) => {
    const prevState = currentState;
    currentState = { ...currentState, ...update };
    listeners.forEach((listener) => listener());

    if (persistKey) {
      persistMiddleware<T>(persistKey, storageType)(prevState, currentState);
    }
  };

  const transaction = (
    callback: (update: (update: Partial<T>) => void) => void
  ) => {
    transactionActive = true;
    transactionBuffer = {};

    try {
      callback(setState);

      if (transactionBuffer) {
        applyState(transactionBuffer);
      }
    } catch (error) {
      console.error("Transaction failed:", error);
      throw error;
    } finally {
      transactionActive = false;
      transactionBuffer = null;
    }
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getState, setState, subscribe, transaction };
};
