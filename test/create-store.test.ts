import { describe, it, expect, vi } from "vitest";
import { createStore } from "../src/store/store";
import { Middleware } from "../src/types";

// Mock para `shallow`
vi.mock("../shallow", () => ({
  shallow: (objA: any, objB: any) => JSON.stringify(objA) === JSON.stringify(objB),
}));

// Mock para `runMiddlewares`
vi.mock("./middleware", () => ({
  runMiddlewares: vi.fn(() => true),
}));

describe("createStore", () => {
  it("should be initialized with a synchronous state", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);
    expect(store.getState()).toEqual(initialState);
  });

  it("should be initialized with an asynchronous state", async () => {
    const initialState = async () => ({ count: 5 });
    const store = createStore(initialState);

    // Esperar a que se resuelva el estado asíncrono
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(store.getState()).toEqual({ count: 5 });
  });

  it("should allow updating state with an object", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);

    store.setState({ count: 1 });
    expect(store.getState()).toEqual({ count: 1 });
  });

  it("should allow updating the status with a function", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);

    store.setState((state) => ({ count: state.count + 1 }));
    expect(store.getState()).toEqual({ count: 1 });
  });

  it("should notify subscribers when the status changes", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);

    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    store.setState({ count: 1 });
    expect(listener).toHaveBeenCalledWith({ count: 1 });

    unsubscribe();
    store.setState({ count: 2 });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("should not notify subscribers if the status does not change", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);

    const listener = vi.fn();
    store.subscribe(listener);

    store.setState({ count: 0 }); // Mismo estado
    expect(listener).not.toHaveBeenCalled();
  });

  it("should run middlewares before updating state", () => {
    const initialState = { count: 0 };
    const middleware: Middleware<typeof initialState> = vi.fn(() => true);

    const store = createStore(initialState);
    store.use(middleware);

    store.setState({ count: 1 });

    expect(middleware).toHaveBeenCalledWith(initialState, { count: 1 });
  });

  it("should not update state if a middleware blocks it", () => {
    const initialState = { count: 0 };
    const middleware: Middleware<typeof initialState> = vi.fn(() => false);

    const store = createStore(initialState);
    store.use(middleware);

    store.setState({ count: 1 });

    expect(store.getState()).toEqual(initialState);
    expect(middleware).toHaveBeenCalled();
  });
});
