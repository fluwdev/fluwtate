import { useRef as d, useEffect as f, useCallback as y, useState as g } from "react";
function S(s, e) {
  if (Object.is(s, e)) return !0;
  if (typeof s != "object" || s === null || typeof e != "object" || e === null)
    return !1;
  const r = /* @__PURE__ */ new WeakMap();
  function t(n, o) {
    var i;
    if (Object.is(n, o)) return !0;
    if (typeof n != "object" || n === null || typeof o != "object" || o === null)
      return !1;
    if (r.has(n) && ((i = r.get(n)) != null && i.has(o))) return !0;
    r.has(n) || r.set(n, /* @__PURE__ */ new Set()), r.get(n).add(o);
    const c = Object.keys(n), u = Object.keys(o);
    if (c.length !== u.length) return !1;
    for (const a of c)
      if (!Object.prototype.hasOwnProperty.call(o, a) || !t(n[a], o[a])) return !1;
    return !0;
  }
  return t(s, e);
}
function p(s, e, r) {
  for (const t of s)
    if (t(e, r) === !1)
      return console.warn(
        "Middleware blocked state change🔒:",
        t.name || "anonymous"
      ), !1;
  return !0;
}
function _(s) {
  let e;
  const r = /* @__PURE__ */ new Set(), t = [];
  return typeof s == "function" ? s().then((n) => {
    e = n;
  }) : e = s, {
    getState() {
      return e;
    },
    setState(n) {
      const o = typeof n == "function" ? n(e) : { ...e, ...n };
      p(t, e, o) && (S(e, o) || (e = o, r.forEach((c) => c(e))));
    },
    subscribe(n) {
      return r.add(n), () => r.delete(n);
    },
    use(n) {
      t.push(n);
    }
  };
}
function E(s, e) {
  return {
    getState: () => s.getState()[e],
    setState: (r) => {
      s.setState((t) => ({
        ...t,
        [e]: typeof r == "function" ? r(t[e]) : { ...t[e], ...r }
      }));
    },
    subscribe: (r) => s.subscribe((t) => r(t[e]))
  };
}
function O({
  key: s,
  storage: e,
  serializer: r = JSON.stringify
}) {
  return (t, n) => (Promise.resolve(e.setItem(s, r(n))).catch(
    (o) => console.error("Error persisting state❌:", o)
  ), !0);
}
async function h({
  key: s,
  storage: e,
  deserializer: r = JSON.parse
}) {
  try {
    const t = await e.getItem(s);
    return t ? r(t) : void 0;
  } catch (t) {
    console.error("Error loading persisted state❌:", t);
    return;
  }
}
function k(s = "CustomStore") {
  const e = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__.connect({ name: s });
  return (r, t) => (e == null || e.send(
    {
      type: "STATE_UPDATE",
      payload: t
    },
    t
  ), !0);
}
function b({
  key: s,
  storage: e = localStorage,
  serializer: r = JSON.stringify
}) {
  return (t, n) => {
    try {
      e.setItem(s, r(n));
    } catch (o) {
      console.error("Error persisting state❌:", o);
    }
    return !0;
  };
}
function D({
  key: s,
  storage: e = localStorage,
  deserializer: r = JSON.parse
}) {
  try {
    const t = e.getItem(s);
    return t ? r(t) : void 0;
  } catch (t) {
    console.error("Error loading persisted state❌:", t);
    return;
  }
}
function P(s, e = (r) => r) {
  const r = d(e);
  f(() => {
    r.current = e;
  }, [e]);
  const t = y(() => {
    const u = s.getState();
    return r.current(u);
  }, [s]), [n, o] = g(t), c = d(n);
  return f(() => {
    c.current = n;
  }, [n]), f(() => {
    const u = (a) => {
      const l = t();
      S(l, c.current) || o(l);
    }, i = s.subscribe(u);
    return () => i();
  }, [s, t]), n;
}
export {
  O as createAsyncPersistence,
  E as createModule,
  b as createPersistenceMiddleware,
  _ as createStore,
  k as devtool,
  h as loadAsyncPersistedState,
  D as loadPersistedState,
  S as shallow,
  P as useStore
};
