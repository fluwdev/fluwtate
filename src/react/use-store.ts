import { useState, useEffect, useCallback, useRef } from "react";
import { Store, State, Listener } from "../types";
import { shallow } from "../shallow";

export function useStore<S extends State, T = S>(
  store: Store<S>,
  selector: (state: S) => T = (state) => state as unknown as T
): T {
  const selectorRef = useRef(selector);

  useEffect(() => {
    selectorRef.current = selector;
  }, [selector]);

  const getSelectedState = useCallback((): T => {
    const state = store.getState();
    return selectorRef.current(state);
  }, [store]);

  const [selectedState, setSelectedState] = useState<T>(getSelectedState);

  const selectedStateRef = useRef(selectedState);

  useEffect(() => {
    selectedStateRef.current = selectedState;
  }, [selectedState]);

  useEffect(() => {
    const listener: Listener<S> = (_) => {
      const newSelectedState = getSelectedState();

      if (!shallow(newSelectedState, selectedStateRef.current)) {
        setSelectedState(newSelectedState);
      }
    };

    const unsubscribe = store.subscribe(listener);
    return () => unsubscribe();
  }, [store, getSelectedState]);

  return selectedState;
}
