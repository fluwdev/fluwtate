import { shallow } from "../shallow";
import { Middleware, Listener, Store, StateUpdater, State } from "../types";
import { runMiddlewares } from "./middleware";

export function createStore<S extends State>(
  initialState: S | (() => Promise<S>)
): Store<S> {
  let state: S;
  const listeners: Set<Listener<S>> = new Set();
  const middlewareStack: Middleware<S>[] = [];

  if (typeof initialState === "function") {
    (initialState as () => Promise<S>)().then((resolvedState) => {
      state = resolvedState;
    });
  } else {
    state = initialState;
  }

  return {
    getState() {
      return state;
    },

    setState(updater) {
      const nextState =
        typeof updater === "function"
          ? (updater as StateUpdater<S>)(state)
          : { ...state, ...updater };

      if (!runMiddlewares(middlewareStack, state, nextState)) return;

      if (!shallow(state, nextState)) {
        state = nextState;
        listeners.forEach((listener) => listener(state));
      }
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    use(middleware) {
      middlewareStack.push(middleware);
    },
  };
}
