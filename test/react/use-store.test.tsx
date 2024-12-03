import React from "react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, act, screen } from "@testing-library/react";
import { useStore } from "../../src/react/use-store";
import { Store } from "../../src/types";

const TestComponent = ({ store, selector }: any) => {
  const selectedState = useStore(store, selector);
  return <div>{selectedState}</div>;
};

describe("useStore Hook", () => {
  let store: Store<any>;
  let mockState: { value: number };

  beforeEach(() => {
    mockState = { value: 42 };

    store = {
      getState: vi.fn(() => mockState),
      subscribe: vi.fn((listener) => {
        // Simula que el listener se ejecuta al cambiar el estado
        return () => { }; // Simula una función de desuscripción
      }),
    };
  });

  it("should return the selected state correctly", () => {
    render(<TestComponent store={store} selector={(state: any) => state.value} />);
    expect(screen.queryByText("42")).not.toBeNull(); // Verifica que se muestra el estado inicial
  });

  it("should update the state when the store changes", async () => {
    render(<TestComponent store={store} selector={(state: any) => state.value} />);

    // Simula un cambio en el estado
    act(() => {
      mockState.value = 84;
      store.subscribe.mock.calls[0][0](mockState); // Ejecuta el listener
    });

    expect(screen.queryByText("84")).not.toBeNull(); // Verifica que el estado se actualizó
  });

  it("should use the selector correctly", () => {
    const newSelector = (state: any) => state.value + 10;

    render(<TestComponent store={store} selector={newSelector} />);
    expect(screen.queryByText("52")).not.toBeNull(); // Verifica que el selector transformó el estado
  });
});
