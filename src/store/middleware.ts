import type { Middleware } from "../index.d";

export function runMiddlewares<S>(
  stack: Middleware<S>[],
  prevState: S,
  nextState: S
): boolean {
  for (const middleware of stack) {
    const result = middleware(prevState, nextState);

    if (result !== undefined) {
      console.warn(
        "Middleware returned a value when it should return void:",
        middleware.name || "anonymous"
      );
    }
  }
  return true;
}
