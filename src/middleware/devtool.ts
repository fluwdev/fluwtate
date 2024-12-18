import type { Middleware, State } from "../index.d";

export function devtool<S extends State>(name = "CustomStore"): Middleware<S> {
  const devTools =
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect({ name });

  return (_, nextState) => {
    devTools?.send(
      {
        type: "STATE_UPDATE",
        payload: nextState,
      },
      nextState
    );
    return true;
  };
}
