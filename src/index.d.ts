export type StorageType = "localStorage" | "sessionStorage";

export interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

export type StateValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | StateObject
  | StateValue[];

export interface StateObject {
  [key: string]: StateValue;
}

export type State = StateObject;

export type StateUpdater<S> = (state: S) => S;

export type Listener<S> = (state: S) => void;

export type Middleware<T> = (prevState: T, nextState: T) => void;

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
