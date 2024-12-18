import type { Store, State, StateUpdater } from "../index.d";

export function createModule<S extends State, K extends keyof S>(
  store: Store<S>,
  moduleName: K
) {
  return {
    getState: () => store.getState()[moduleName],

    setState: (updater: StateUpdater<S[K]> | Partial<S[K]>) => {
      store.setState((state) => ({
        ...state,
        [moduleName]:
          typeof updater === "function"
            ? (updater as StateUpdater<S[K]>)(state[moduleName])
            : Object.assign({}, state[moduleName], updater),
      }));
    },

    subscribe: (listener: (state: S[K]) => void) => {
      return store.subscribe((state) => listener(state[moduleName]));
    },
  };
}
