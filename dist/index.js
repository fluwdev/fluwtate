import { useRef as d, useEffect as S, useCallback as g, useState as w } from "react";
const O = (n, t = "localStorage") => {
  const e = window[t];
  return (s, r) => {
    try {
      const c = JSON.stringify(r);
      e.setItem(n, c);
    } catch (c) {
      console.error(`Failed to persist state in ${t}:`, c);
    }
  };
}, _ = (n, t, e = "localStorage") => {
  try {
    const r = window[e].getItem(n);
    if (!r)
      return t;
    const c = JSON.parse(r);
    return { ...t, ...c };
  } catch (s) {
    return console.error(`Failed to rehydrate state from ${e}:`, s), t;
  }
}, D = (n, t) => {
  const { persistKey: e, storageType: s = "localStorage" } = t || {}, r = /* @__PURE__ */ new Set();
  let c = e ? _(e, n, s) : n, a = !1, o = null;
  const f = () => c, u = (l) => {
    a ? o = { ...o, ...l } : y(l);
  }, y = (l) => {
    const i = c;
    c = { ...c, ...l }, r.forEach((p) => p()), e && O(e, s)(i, c);
  };
  return { getState: f, setState: u, subscribe: (l) => (r.add(l), () => r.delete(l)), transaction: (l) => {
    a = !0, o = {};
    try {
      l(u), o && y(o);
    } catch (i) {
      throw console.error("Transaction failed:", i), i;
    } finally {
      a = !1, o = null;
    }
  } };
};
function T(n, t) {
  return {
    getState: () => n.getState()[t],
    setState: (e) => {
      n.setState((s) => ({
        ...s,
        [t]: typeof e == "function" ? e(s[t]) : Object.assign({}, s[t], e)
      }));
    },
    subscribe: (e) => n.subscribe((s) => e(s[t]))
  };
}
function R(n = "CustomStore") {
  const t = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__.connect({ name: n });
  return (e, s) => (t == null || t.send(
    {
      type: "STATE_UPDATE",
      payload: s
    },
    s
  ), !0);
}
function h(n, t) {
  if (Object.is(n, t)) return !0;
  if (typeof n != "object" || n === null || typeof t != "object" || t === null)
    return !1;
  const e = /* @__PURE__ */ new WeakMap();
  function s(r, c) {
    var f;
    if (Object.is(r, c)) return !0;
    if (typeof r != "object" || r === null || typeof c != "object" || c === null)
      return !1;
    if (e.has(r) && ((f = e.get(r)) != null && f.has(c))) return !0;
    e.has(r) || e.set(r, /* @__PURE__ */ new Set()), e.get(r).add(c);
    const a = Object.keys(r), o = Object.keys(c);
    if (a.length !== o.length) return !1;
    for (const u of a)
      if (!Object.prototype.hasOwnProperty.call(c, u) || !s(r[u], c[u])) return !1;
    return !0;
  }
  return s(n, t);
}
function j(n, t = (e) => e) {
  const e = d(t);
  S(() => {
    e.current = t;
  }, [t]);
  const s = g(() => {
    const o = n.getState();
    return e.current(o);
  }, [n]), [r, c] = w(s), a = d(r);
  return S(() => {
    a.current = r;
  }, [r]), S(() => {
    const o = () => {
      const u = s();
      h(u, a.current) || c(u);
    }, f = n.subscribe(o);
    return () => f();
  }, [n, s]), r;
}
export {
  T as createModule,
  D as createStore,
  R as devtool,
  h as shallow,
  j as useStore
};
