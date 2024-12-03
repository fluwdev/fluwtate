import { describe, it, expect, vi } from "vitest";
import { createModule } from "../src/modules/create-module";
import type { Store } from "../src/types";

describe("createModule", () => {
  const initialState = {
    moduleA: { value: 1 },
    moduleB: { data: "test" },
  };

  const mockStore: Store<typeof initialState> = {
    getState: vi.fn(() => initialState),
    setState: vi.fn(),
    subscribe: vi.fn(),
  };

  it("should get the status of the specified module", () => {
    const moduleA = createModule(mockStore, "moduleA");

    const state = moduleA.getState();
    expect(state).toEqual({ value: 1 });
    expect(mockStore.getState).toHaveBeenCalled();
  });

  it("should update the module state with an object", () => {
    const moduleA = createModule(mockStore, "moduleA");

    moduleA.setState({ value: 2 });
    expect(mockStore.setState).toHaveBeenCalledWith(
      expect.any(Function)
    );

    // Simular llamada a setState
    const updateFn = mockStore.setState.mock.calls[0][0];
    const updatedState = updateFn(initialState);

    expect(updatedState).toEqual({
      ...initialState,
      moduleA: { value: 2 },
    });
  });

  it("should update the module state with a function", () => {
    const moduleA = createModule(mockStore, "moduleA");

    moduleA.setState((state) => ({ value: state.value + 1 }));
    expect(mockStore.setState).toHaveBeenCalledWith(
      expect.any(Function)
    );

    // Simular llamada a setState
    const updateFn = mockStore.setState.mock.calls[0][0];
    const updatedState = updateFn(initialState);

    expect(updatedState).toEqual({
      ...initialState,
      moduleA: { value: 2 },
    });
  });

  it("should subscribe to changes in the module state", () => {
    const mockListener = vi.fn();
    const moduleB = createModule(mockStore, "moduleB");

    mockStore.subscribe.mockImplementation((listener) => {
      // Simular suscripción
      listener(initialState);
      return () => { };
    });

    moduleB.subscribe(mockListener);

    expect(mockStore.subscribe).toHaveBeenCalledWith(expect.any(Function));
    expect(mockListener).toHaveBeenCalledWith({ data: "test" });
  });
});
