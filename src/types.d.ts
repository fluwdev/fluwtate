export type State = Record<string, any>;

export type StateUpdater<S> = (state: S) => S;

export type Listener<S> = (state: S) => void;

export type Middleware<S> = (prevState: S, nextState: S) => boolean | void;

export interface Store<S extends State> {
  getState: () => S;
  setState: (updater: Partial<S> | ((state: S) => Partial<S>)) => void;
  subscribe: (listener: Listener<S>) => () => void;
  use: (middleware: Middleware<S>) => void;
}

export interface Namespace<S extends State, N extends keyof S> {
  getState: () => S[N];
  setState: (updater: StateUpdater<S[N]>) => void;
  subscribe: (listener: Listener<S[N]>) => () => void;
}
