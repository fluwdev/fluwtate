import type { Middleware } from "../index.d";

export function runMiddlewares<S>(
  stack: Middleware<S>[],
  prevState: S,
  nextState: S
): boolean {
  for (const middleware of stack) {
    const result = middleware(prevState, nextState);

    if (result === false) {
      console.warn(
        "Middleware blocked state change🔒:",
        middleware.name || "anonymous"
      );
      return false;
    }
  }
  return true;
}
