var Kr = Object.defineProperty;
var Xr = (e, t, n) => t in e ? Kr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ot = (e, t, n) => Xr(e, typeof t != "symbol" ? t + "" : t, n);
const Jr = (e, t) => e === t, X = Symbol("solid-proxy"), Qr = typeof Proxy == "function", pt = Symbol("solid-track"), Dt = {
  equals: Jr
};
let ut = null, Ra = Ya;
const ve = 1, Bt = 2, Va = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, rn = {};
var B = null;
let sn = null, ei = null, W = null, ee = null, ge = null, Zt = 0;
function dt(e, t) {
  const n = W, a = B, r = e.length === 0, i = t === void 0 ? a : t, s = r ? Va : {
    owned: null,
    cleanups: null,
    context: i ? i.context : null,
    owner: i
  }, o = r ? e : () => e(() => re(() => ft(s)));
  B = s, W = null;
  try {
    return Ae(o, !0);
  } finally {
    W = n, B = a;
  }
}
function q(e, t) {
  t = t ? Object.assign({}, Dt, t) : Dt;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, a = (r) => (typeof r == "function" && (r = r(n.value)), Wa(n, r));
  return [za.bind(n), a];
}
function Fa(e, t, n) {
  const a = vt(e, t, !0, ve);
  rt(a);
}
function U(e, t, n) {
  const a = vt(e, t, !1, ve);
  rt(a);
}
function Ye(e, t, n) {
  Ra = ci;
  const a = vt(e, t, !1, ve);
  (!n || !n.render) && (a.user = !0), ge ? ge.push(a) : rt(a);
}
function N(e, t, n) {
  n = n ? Object.assign({}, Dt, n) : Dt;
  const a = vt(e, t, !0, 0);
  return a.observers = null, a.observerSlots = null, a.comparator = n.equals || void 0, rt(a), za.bind(a);
}
function ti(e) {
  return e && typeof e == "object" && "then" in e;
}
function ni(e, t, n) {
  let a, r, i;
  typeof t == "function" ? (a = e, r = t, i = {}) : (a = !0, r = e, i = t || {});
  let s = null, o = rn, l = !1, c = "initialValue" in i, u = typeof a == "function" && N(a);
  const d = /* @__PURE__ */ new Set(), [m, _] = (i.storage || q)(i.initialValue), [h, f] = q(void 0), [x, S] = q(void 0, {
    equals: !1
  }), [v, y] = q(c ? "ready" : "unresolved");
  function b(k, P, H, G) {
    return s === k && (s = null, G !== void 0 && (c = !0), (k === o || P === o) && i.onHydrated && queueMicrotask(
      () => i.onHydrated(G, {
        value: P
      })
    ), o = rn, w(P, H)), P;
  }
  function w(k, P) {
    Ae(() => {
      P === void 0 && _(() => k), y(P !== void 0 ? "errored" : c ? "ready" : "unresolved"), f(P);
      for (const H of d.keys()) H.decrement();
      d.clear();
    }, !1);
  }
  function A() {
    const k = si, P = m(), H = h();
    if (H !== void 0 && !s) throw H;
    return W && W.user, P;
  }
  function T(k = !0) {
    if (k !== !1 && l) return;
    l = !1;
    const P = u ? u() : a;
    if (P == null || P === !1) {
      b(s, re(m));
      return;
    }
    const H = o !== rn ? o : re(
      () => r(P, {
        value: m(),
        refetching: k
      })
    );
    return ti(H) ? (s = H, "value" in H ? (H.status === "success" ? b(s, H.value, void 0, P) : b(s, void 0, yn(H.value), P), H) : (l = !0, queueMicrotask(() => l = !1), Ae(() => {
      y(c ? "refreshing" : "pending"), S();
    }, !1), H.then(
      (G) => b(H, G, void 0, P),
      (G) => b(H, void 0, yn(G), P)
    ))) : (b(s, H, void 0, P), H);
  }
  return Object.defineProperties(A, {
    state: {
      get: () => v()
    },
    error: {
      get: () => h()
    },
    loading: {
      get() {
        const k = v();
        return k === "pending" || k === "refreshing";
      }
    },
    latest: {
      get() {
        if (!c) return A();
        const k = h();
        if (k && !s) throw k;
        return m();
      }
    }
  }), u ? Fa(() => T(!1)) : T(!1), [
    A,
    {
      refetch: T,
      mutate: _
    }
  ];
}
function mt(e) {
  return Ae(e, !1);
}
function re(e) {
  if (W === null) return e();
  const t = W;
  W = null;
  try {
    return e();
  } finally {
    W = t;
  }
}
function at(e) {
  Ye(() => re(e));
}
function Fe(e) {
  return B === null || (B.cleanups === null ? B.cleanups = [e] : B.cleanups.push(e)), e;
}
function ai(e, t) {
  ut || (ut = Symbol("error")), B = vt(void 0, void 0, !0), B.context = {
    ...B.context,
    [ut]: [t]
  };
  try {
    return e();
  } catch (n) {
    It(n);
  } finally {
    B = B.owner;
  }
}
function ht() {
  return W;
}
function Da() {
  return B;
}
function ri(e, t) {
  const n = B, a = W;
  B = e, W = null;
  try {
    return Ae(t, !0);
  } catch (r) {
    It(r);
  } finally {
    B = n, W = a;
  }
}
const [Ou, Ru] = /* @__PURE__ */ q(!1);
function Ba(e, t) {
  const n = Symbol("context");
  return {
    id: n,
    Provider: ui(n),
    defaultValue: e
  };
}
function ii(e) {
  let t;
  return B && B.context && (t = B.context[e.id]) !== void 0 ? t : e.defaultValue;
}
function Ua(e) {
  const t = N(e), n = N(() => xn(t()));
  return n.toArray = () => {
    const a = n();
    return Array.isArray(a) ? a : a != null ? [a] : [];
  }, n;
}
let si;
function za() {
  if (this.sources && this.state)
    if (this.state === ve) rt(this);
    else {
      const e = ee;
      ee = null, Ae(() => zt(this), !1), ee = e;
    }
  if (W) {
    const e = this.observers ? this.observers.length : 0;
    W.sources ? (W.sources.push(this), W.sourceSlots.push(e)) : (W.sources = [this], W.sourceSlots = [e]), this.observers ? (this.observers.push(W), this.observerSlots.push(W.sources.length - 1)) : (this.observers = [W], this.observerSlots = [W.sources.length - 1]);
  }
  return this.value;
}
function Wa(e, t, n) {
  let a = e.value;
  return (!e.comparator || !e.comparator(a, t)) && (e.value = t, e.observers && e.observers.length && Ae(() => {
    for (let r = 0; r < e.observers.length; r += 1) {
      const i = e.observers[r], s = sn && sn.running;
      s && sn.disposed.has(i), (s ? !i.tState : !i.state) && (i.pure ? ee.push(i) : ge.push(i), i.observers && Za(i)), s || (i.state = ve);
    }
    if (ee.length > 1e6)
      throw ee = [], new Error();
  }, !1)), t;
}
function rt(e) {
  if (!e.fn) return;
  ft(e);
  const t = Zt;
  oi(
    e,
    e.value,
    t
  );
}
function oi(e, t, n) {
  let a;
  const r = B, i = W;
  W = B = e;
  try {
    a = e.fn(t);
  } catch (s) {
    return e.pure && (e.state = ve, e.owned && e.owned.forEach(ft), e.owned = null), e.updatedAt = n + 1, It(s);
  } finally {
    W = i, B = r;
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? Wa(e, a) : e.value = a, e.updatedAt = n);
}
function vt(e, t, n, a = ve, r) {
  const i = {
    fn: e,
    state: a,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: B,
    context: B ? B.context : null,
    pure: n
  };
  return B === null || B !== Va && (B.owned ? B.owned.push(i) : B.owned = [i]), i;
}
function Ut(e) {
  if (e.state === 0) return;
  if (e.state === Bt) return zt(e);
  if (e.suspense && re(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Zt); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (e = t[n], e.state === ve)
      rt(e);
    else if (e.state === Bt) {
      const a = ee;
      ee = null, Ae(() => zt(e, t[0]), !1), ee = a;
    }
}
function Ae(e, t) {
  if (ee) return e();
  let n = !1;
  t || (ee = []), ge ? n = !0 : ge = [], Zt++;
  try {
    const a = e();
    return li(n), a;
  } catch (a) {
    n || (ge = null), ee = null, It(a);
  }
}
function li(e) {
  if (ee && (Ya(ee), ee = null), e) return;
  const t = ge;
  ge = null, t.length && Ae(() => Ra(t), !1);
}
function Ya(e) {
  for (let t = 0; t < e.length; t++) Ut(e[t]);
}
function ci(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    const a = e[t];
    a.user ? e[n++] = a : Ut(a);
  }
  for (t = 0; t < n; t++) Ut(e[t]);
}
function zt(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const a = e.sources[n];
    if (a.sources) {
      const r = a.state;
      r === ve ? a !== t && (!a.updatedAt || a.updatedAt < Zt) && Ut(a) : r === Bt && zt(a, t);
    }
  }
}
function Za(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state || (n.state = Bt, n.pure ? ee.push(n) : ge.push(n), n.observers && Za(n));
  }
}
function ft(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(), a = e.sourceSlots.pop(), r = n.observers;
      if (r && r.length) {
        const i = r.pop(), s = n.observerSlots.pop();
        a < r.length && (i.sourceSlots[s] = a, r[a] = i, n.observerSlots[a] = s);
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) ft(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) ft(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function yn(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function Xn(e, t, n) {
  try {
    for (const a of t) a(e);
  } catch (a) {
    It(a, n && n.owner || null);
  }
}
function It(e, t = B) {
  const n = ut && t && t.context && t.context[ut], a = yn(e);
  if (!n) throw a;
  ge ? ge.push({
    fn() {
      Xn(a, n, t);
    },
    state: ve
  }) : Xn(a, n, t);
}
function xn(e) {
  if (typeof e == "function" && !e.length) return xn(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const a = xn(e[n]);
      Array.isArray(a) ? t.push.apply(t, a) : t.push(a);
    }
    return t;
  }
  return e;
}
function ui(e, t) {
  return function(a) {
    let r;
    return U(
      () => r = re(() => (B.context = {
        ...B.context,
        [e]: a.value
      }, Ua(() => a.children))),
      void 0
    ), r;
  };
}
const di = Symbol("fallback");
function Jn(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function mi(e, t, n = {}) {
  let a = [], r = [], i = [], s = 0, o = t.length > 1 ? [] : null;
  return Fe(() => Jn(i)), () => {
    let l = e() || [], c = l.length, u, d;
    return l[pt], re(() => {
      let _, h, f, x, S, v, y, b, w;
      if (c === 0)
        s !== 0 && (Jn(i), i = [], a = [], r = [], s = 0, o && (o = [])), n.fallback && (a = [di], r[0] = dt((A) => (i[0] = A, n.fallback())), s = 1);
      else if (s === 0) {
        for (r = new Array(c), d = 0; d < c; d++)
          a[d] = l[d], r[d] = dt(m);
        s = c;
      } else {
        for (f = new Array(c), x = new Array(c), o && (S = new Array(c)), v = 0, y = Math.min(s, c); v < y && a[v] === l[v]; v++) ;
        for (y = s - 1, b = c - 1; y >= v && b >= v && a[y] === l[b]; y--, b--)
          f[b] = r[y], x[b] = i[y], o && (S[b] = o[y]);
        for (_ = /* @__PURE__ */ new Map(), h = new Array(b + 1), d = b; d >= v; d--)
          w = l[d], u = _.get(w), h[d] = u === void 0 ? -1 : u, _.set(w, d);
        for (u = v; u <= y; u++)
          w = a[u], d = _.get(w), d !== void 0 && d !== -1 ? (f[d] = r[u], x[d] = i[u], o && (S[d] = o[u]), d = h[d], _.set(w, d)) : i[u]();
        for (d = v; d < c; d++)
          d in f ? (r[d] = f[d], i[d] = x[d], o && (o[d] = S[d], o[d](d))) : r[d] = dt(m);
        r = r.slice(0, s = c), a = l.slice(0);
      }
      return r;
    });
    function m(_) {
      if (i[d] = _, o) {
        const [h, f] = q(d);
        return o[d] = f, t(l[d], h);
      }
      return t(l[d]);
    }
  };
}
function p(e, t) {
  return re(() => e(t || {}));
}
function kt() {
  return !0;
}
const _i = {
  get(e, t, n) {
    return t === X ? n : e.get(t);
  },
  has(e, t) {
    return t === X ? !0 : e.has(t);
  },
  set: kt,
  deleteProperty: kt,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: kt,
      deleteProperty: kt
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function on(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function pi() {
  for (let e = 0, t = this.length; e < t; ++e) {
    const n = this[e]();
    if (n !== void 0) return n;
  }
}
function de(...e) {
  let t = !1;
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    t = t || !!o && X in o, e[s] = typeof o == "function" ? (t = !0, N(o)) : o;
  }
  if (Qr && t)
    return new Proxy(
      {
        get(s) {
          for (let o = e.length - 1; o >= 0; o--) {
            const l = on(e[o])[s];
            if (l !== void 0) return l;
          }
        },
        has(s) {
          for (let o = e.length - 1; o >= 0; o--)
            if (s in on(e[o])) return !0;
          return !1;
        },
        keys() {
          const s = [];
          for (let o = 0; o < e.length; o++)
            s.push(...Object.keys(on(e[o])));
          return [...new Set(s)];
        }
      },
      _i
    );
  const n = {}, a = /* @__PURE__ */ Object.create(null);
  for (let s = e.length - 1; s >= 0; s--) {
    const o = e[s];
    if (!o) continue;
    const l = Object.getOwnPropertyNames(o);
    for (let c = l.length - 1; c >= 0; c--) {
      const u = l[c];
      if (u === "__proto__" || u === "constructor") continue;
      const d = Object.getOwnPropertyDescriptor(o, u);
      if (!a[u])
        a[u] = d.get ? {
          enumerable: !0,
          configurable: !0,
          get: pi.bind(n[u] = [d.get.bind(o)])
        } : d.value !== void 0 ? d : void 0;
      else {
        const m = n[u];
        m && (d.get ? m.push(d.get.bind(o)) : d.value !== void 0 && m.push(() => d.value));
      }
    }
  }
  const r = {}, i = Object.keys(a);
  for (let s = i.length - 1; s >= 0; s--) {
    const o = i[s], l = a[o];
    l && l.get ? Object.defineProperty(r, o, l) : r[o] = l ? l.value : void 0;
  }
  return r;
}
const $a = (e) => `Stale read from <${e}>.`;
function Te(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return N(mi(() => e.each, e.children, t || void 0));
}
function M(e) {
  const t = e.keyed, n = N(() => e.when, void 0, void 0), a = t ? n : N(n, void 0, {
    equals: (r, i) => !r == !i
  });
  return N(
    () => {
      const r = a();
      if (r) {
        const i = e.children;
        return typeof i == "function" && i.length > 0 ? re(
          () => i(
            t ? r : () => {
              if (!re(a)) throw $a("Show");
              return n();
            }
          )
        ) : i;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}
function Ot(e) {
  const t = Ua(() => e.children), n = N(() => {
    const a = t(), r = Array.isArray(a) ? a : [a];
    let i = () => {
    };
    for (let s = 0; s < r.length; s++) {
      const o = s, l = r[s], c = i, u = N(
        () => c() ? void 0 : l.when,
        void 0,
        void 0
      ), d = l.keyed ? u : N(u, void 0, {
        equals: (m, _) => !m == !_
      });
      i = () => c() || (d() ? [o, u, l] : void 0);
    }
    return i;
  });
  return N(
    () => {
      const a = n()();
      if (!a) return e.fallback;
      const [r, i, s] = a, o = s.children;
      return typeof o == "function" && o.length > 0 ? re(
        () => o(
          s.keyed ? i() : () => {
            var c;
            if (((c = re(n)()) == null ? void 0 : c[0]) !== r) throw $a("Match");
            return i();
          }
        )
      ) : o;
    },
    void 0,
    void 0
  );
}
function qe(e) {
  return e;
}
let Nt;
function hi(e) {
  let t;
  const [n, a] = q(t, void 0);
  return Nt || (Nt = /* @__PURE__ */ new Set()), Nt.add(a), Fe(() => Nt.delete(a)), N(
    () => {
      let r;
      if (r = n()) {
        const i = e.fallback;
        return typeof i == "function" && i.length ? re(() => i(r, () => a())) : i;
      }
      return ai(() => e.children, a);
    },
    void 0,
    void 0
  );
}
function fi(e, t, n) {
  let a = n.length, r = t.length, i = a, s = 0, o = 0, l = t[r - 1].nextSibling, c = null;
  for (; s < r || o < i; ) {
    if (t[s] === n[o]) {
      s++, o++;
      continue;
    }
    for (; t[r - 1] === n[i - 1]; )
      r--, i--;
    if (r === s) {
      const u = i < a ? o ? n[o - 1].nextSibling : n[i - o] : l;
      for (; o < i; ) e.insertBefore(n[o++], u);
    } else if (i === o)
      for (; s < r; )
        (!c || !c.has(t[s])) && t[s].remove(), s++;
    else if (t[s] === n[i - 1] && n[o] === t[r - 1]) {
      const u = t[--r].nextSibling;
      e.insertBefore(n[o++], t[s++].nextSibling), e.insertBefore(n[--i], u), t[r] = n[i];
    } else {
      if (!c) {
        c = /* @__PURE__ */ new Map();
        let d = o;
        for (; d < i; ) c.set(n[d], d++);
      }
      const u = c.get(t[s]);
      if (u != null)
        if (o < u && u < i) {
          let d = s, m = 1, _;
          for (; ++d < r && d < i && !((_ = c.get(t[d])) == null || _ !== u + m); )
            m++;
          if (m > u - o) {
            const h = t[s];
            for (; o < u; ) e.insertBefore(n[o++], h);
          } else e.replaceChild(n[o++], t[s++]);
        } else s++;
      else t[s++].remove();
    }
  }
}
const Qn = "_$DX_DELEGATE";
function C(e, t, n, a) {
  let r;
  const i = () => {
    const o = a ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
    return o.innerHTML = e, n ? o.content.firstChild.firstChild : a ? o.firstChild : o.content.firstChild;
  }, s = t ? () => re(() => document.importNode(r || (r = i()), !0)) : () => (r || (r = i())).cloneNode(!0);
  return s.cloneNode = s, s;
}
function it(e, t = window.document) {
  const n = t[Qn] || (t[Qn] = /* @__PURE__ */ new Set());
  for (let a = 0, r = e.length; a < r; a++) {
    const i = e[a];
    n.has(i) || (n.add(i), t.addEventListener(i, yi));
  }
}
function R(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function z(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function bn(e, t, n, a) {
  Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
}
function gi(e, t, n) {
  return re(() => e(t, n));
}
function g(e, t, n, a) {
  if (n !== void 0 && !a && (a = []), typeof t != "function") return Wt(e, t, a, n);
  U((r) => Wt(e, t(), r, n), a);
}
function yi(e) {
  let t = e.target;
  const n = `$$${e.type}`, a = e.target, r = e.currentTarget, i = (l) => Object.defineProperty(e, "target", {
    configurable: !0,
    value: l
  }), s = () => {
    const l = t[n];
    if (l && !t.disabled) {
      const c = t[`${n}Data`];
      if (c !== void 0 ? l.call(t, c, e) : l.call(t, e), e.cancelBubble) return;
    }
    return t.host && typeof t.host != "string" && !t.host._$host && t.contains(e.target) && i(t.host), !0;
  }, o = () => {
    for (; s() && (t = t._$host || t.parentNode || t.host); ) ;
  };
  if (Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), e.composedPath) {
    const l = e.composedPath();
    i(l[0]);
    for (let c = 0; c < l.length - 2 && (t = l[c], !!s()); c++) {
      if (t._$host) {
        t = t._$host, o();
        break;
      }
      if (t.parentNode === r)
        break;
    }
  } else o();
  i(a);
}
function Wt(e, t, n, a, r) {
  for (; typeof n == "function"; ) n = n();
  if (t === n) return n;
  const i = typeof t, s = a !== void 0;
  if (e = s && n[0] && n[0].parentNode || e, i === "string" || i === "number") {
    if (i === "number" && (t = t.toString(), t === n))
      return n;
    if (s) {
      let o = n[0];
      o && o.nodeType === 3 ? o.data !== t && (o.data = t) : o = document.createTextNode(t), n = Ge(e, n, a, o);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  } else if (t == null || i === "boolean")
    n = Ge(e, n, a);
  else {
    if (i === "function")
      return U(() => {
        let o = t();
        for (; typeof o == "function"; ) o = o();
        n = Wt(e, o, n, a);
      }), () => n;
    if (Array.isArray(t)) {
      const o = [], l = n && Array.isArray(n);
      if (wn(o, t, n, r))
        return U(() => n = Wt(e, o, n, a, !0)), () => n;
      if (o.length === 0) {
        if (n = Ge(e, n, a), s) return n;
      } else l ? n.length === 0 ? ea(e, o, a) : fi(e, n, o) : (n && Ge(e), ea(e, o));
      n = o;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (s) return n = Ge(e, n, a, t);
        Ge(e, n, null, t);
      } else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function wn(e, t, n, a) {
  let r = !1;
  for (let i = 0, s = t.length; i < s; i++) {
    let o = t[i], l = n && n[e.length], c;
    if (!(o == null || o === !0 || o === !1)) if ((c = typeof o) == "object" && o.nodeType)
      e.push(o);
    else if (Array.isArray(o))
      r = wn(e, o, l) || r;
    else if (c === "function")
      if (a) {
        for (; typeof o == "function"; ) o = o();
        r = wn(
          e,
          Array.isArray(o) ? o : [o],
          Array.isArray(l) ? l : [l]
        ) || r;
      } else
        e.push(o), r = !0;
    else {
      const u = String(o);
      l && l.nodeType === 3 && l.data === u ? e.push(l) : e.push(document.createTextNode(u));
    }
  }
  return r;
}
function ea(e, t, n = null) {
  for (let a = 0, r = t.length; a < r; a++) e.insertBefore(t[a], n);
}
function Ge(e, t, n, a) {
  if (n === void 0) return e.textContent = "";
  const r = a || document.createTextNode("");
  if (t.length) {
    let i = !1;
    for (let s = t.length - 1; s >= 0; s--) {
      const o = t[s];
      if (r !== o) {
        const l = o.parentNode === e;
        !i && !s ? l ? e.replaceChild(r, o) : e.insertBefore(r, n) : l && o.remove();
      } else i = !0;
    }
  } else e.insertBefore(r, n);
  return [r];
}
const xi = "http://www.w3.org/2000/svg";
function bi(e, t = !1) {
  return t ? document.createElementNS(xi, e) : document.createElement(e);
}
function wi(e) {
  const { useShadow: t } = e, n = document.createTextNode(""), a = () => e.mount || document.body, r = Da();
  let i;
  return Ye(
    () => {
      i || (i = ri(r, () => N(() => e.children)));
      const s = a();
      if (s instanceof HTMLHeadElement) {
        const [o, l] = q(!1), c = () => l(!0);
        dt((u) => g(s, () => o() ? u() : i(), null)), Fe(c);
      } else {
        const o = bi(e.isSVG ? "g" : "div", e.isSVG), l = t && o.attachShadow ? o.attachShadow({
          mode: "open"
        }) : o;
        Object.defineProperty(o, "_$host", {
          get() {
            return n.parentNode;
          },
          configurable: !0
        }), g(l, i), s.appendChild(o), e.ref && e.ref(o), Fe(() => s.removeChild(o));
      }
    },
    void 0,
    {
      render: !0
    }
  ), n;
}
function Ci(e) {
  return Object.keys(e).reduce((n, a) => {
    const r = e[a];
    return n[a] = Object.assign({}, r), ja(r.value) && !Pi(r.value) && !Array.isArray(r.value) && (n[a].value = Object.assign({}, r.value)), Array.isArray(r.value) && (n[a].value = r.value.slice(0)), n;
  }, {});
}
function vi(e) {
  return e ? Object.keys(e).reduce((n, a) => {
    const r = e[a];
    return n[a] = ja(r) && "value" in r ? r : {
      value: r
    }, n[a].attribute || (n[a].attribute = Si(a)), n[a].parse = "parse" in n[a] ? n[a].parse : typeof n[a].value != "string", n;
  }, {}) : {};
}
function Ii(e) {
  return Object.keys(e).reduce((n, a) => (n[a] = e[a].value, n), {});
}
function Ai(e, t) {
  const n = Ci(t);
  return Object.keys(t).forEach((r) => {
    const i = n[r], s = e.getAttribute(i.attribute), o = e[r];
    s != null && (i.value = i.parse ? Ga(s) : s), o != null && (i.value = Array.isArray(o) ? o.slice(0) : o), i.reflect && ta(e, i.attribute, i.value, !!i.parse), Object.defineProperty(e, r, {
      get() {
        return i.value;
      },
      set(l) {
        const c = i.value;
        i.value = l, i.reflect && ta(this, i.attribute, i.value, !!i.parse);
        for (let u = 0, d = this.__propertyChangedCallbacks.length; u < d; u++)
          this.__propertyChangedCallbacks[u](r, l, c);
      },
      enumerable: !0,
      configurable: !0
    });
  }), n;
}
function Ga(e) {
  if (e)
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
}
function ta(e, t, n, a) {
  if (n == null || n === !1) return e.removeAttribute(t);
  let r = a ? JSON.stringify(n) : n;
  e.__updating[t] = !0, r === "true" && (r = ""), e.setAttribute(t, r), Promise.resolve().then(() => delete e.__updating[t]);
}
function Si(e) {
  return e.replace(/\.?([A-Z]+)/g, (t, n) => "-" + n.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function ja(e) {
  return e != null && (typeof e == "object" || typeof e == "function");
}
function Pi(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
function Ei(e) {
  return typeof e == "function" && e.toString().indexOf("class") === 0;
}
let ln;
function ki(e, t) {
  const n = Object.keys(t);
  return class extends e {
    static get observedAttributes() {
      return n.map((r) => t[r].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized) return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = Ai(this, t);
      const r = Ii(this.props), i = this.Component, s = ln;
      try {
        ln = this, this.__initialized = !0, Ei(i) ? new i(r, {
          element: this
        }) : i(r, {
          element: this
        });
      } finally {
        ln = s;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected) return;
      this.__propertyChangedCallbacks.length = 0;
      let r = null;
      for (; r = this.__releaseCallbacks.pop(); ) r(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(r, i, s) {
      if (this.__initialized && !this.__updating[r] && (r = this.lookupProp(r), r in t)) {
        if (s == null && !this[r]) return;
        this[r] = t[r].parse ? Ga(s) : s;
      }
    }
    lookupProp(r) {
      if (t)
        return n.find((i) => r === i || r === t[i].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(r) {
      this.__releaseCallbacks.push(r);
    }
    addPropertyChangedCallback(r) {
      this.__propertyChangedCallbacks.push(r);
    }
  };
}
function Ni(e, t = {}, n = {}) {
  const {
    BaseElement: a = HTMLElement,
    extension: r,
    customElements: i = window.customElements
  } = n;
  return (s) => {
    if (!e) throw new Error("tag is required to register a Component");
    let o = i.get(e);
    return o ? (o.prototype.Component = s, o) : (o = ki(a, vi(t)), o.prototype.Component = s, o.prototype.registeredTag = e, i.define(e, o, r), o);
  };
}
function Ti(e) {
  const t = Object.keys(e), n = {};
  for (let a = 0; a < t.length; a++) {
    const [r, i] = q(e[t[a]]);
    Object.defineProperty(n, t[a], {
      get: r,
      set(s) {
        i(() => s);
      }
    });
  }
  return n;
}
function Li(e) {
  if (e.assignedSlot && e.assignedSlot._$owner) return e.assignedSlot._$owner;
  let t = e.parentNode;
  for (; t && !t._$owner && !(t.assignedSlot && t.assignedSlot._$owner); )
    t = t.parentNode;
  return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner;
}
function Hi(e) {
  return (t, n) => {
    const { element: a } = n;
    return dt((r) => {
      const i = Ti(t);
      a.addPropertyChangedCallback((o, l) => i[o] = l), a.addReleaseCallback(() => {
        a.renderRoot.textContent = "", r();
      });
      const s = e(i, n);
      return g(a.renderRoot, s);
    }, Li(a));
  };
}
function Hn(e, t, n) {
  return arguments.length === 2 && (n = t, t = {}), Ni(e, t)(Hi(n));
}
var qa = /* @__PURE__ */ ((e) => (e.V5 = "5", e))(qa || {}), Ka = /* @__PURE__ */ ((e) => (e.PRODUCTION = "production", e.STAGING = "staging", e.INTEGRATION = "integration", e.DEVELOPMENT = "development", e))(Ka || {});
function Xa(e) {
  return !(e && !Object.values(Ka).includes(e));
}
function Mn(e) {
  return e && e !== "production" ? `.${e}` : "";
}
function Mi(e) {
  return `https://${`cdn${Mn(e.environment)}.scalapay.com`}/widget/configurations/${e.merchantToken}/widget_configuration.json?v=${qa.V5}`;
}
function Oi(e) {
  return `https://${`widget${Mn(e)}.scalapay.com`}/v1/collect`;
}
var gt, I, fe, oe, na, aa;
(function(e) {
  e.ONLINE = "online", e.OFFLINE = "offline";
})(gt || (gt = {})), function(e) {
  e.PAY_IN_THREE = "pay-in-3", e.PAY_IN_FOUR = "pay-in-4", e.PAY_IN_SIX = "pay-in-6", e.PAY_IN_NINE = "pay-in-9", e.PAY_IN_TWELVE = "pay-in-12", e.PAY_NOW_CHECKOUT = "pay-now-checkout", e.PAY_LATER = "later", e.PAY_IN_X = "pay-in-x";
}(I || (I = {})), function(e) {
  e.DEFAULT = "default", e.EXP_5_10 = "exp_5_10", e.EXP_5_15 = "exp_5_15", e.EXP_5_20 = "exp_5_20";
}(fe || (fe = {})), function(e) {
  e.DEUTSCHE_BANK = "deutsche_bank", e.BBVA = "bbva";
}(oe || (oe = {})), function(e) {
  e[e.DEUTSCHE_BANK = 1] = "DEUTSCHE_BANK", e[e.BBVA = 2] = "BBVA";
}(na || (na = {})), function(e) {
  e.DEUTSCHE_BANK = "deutsche_bank", e.BBVA = "bbva";
}(aa || (aa = {}));
const On = (e) => e ? { [oe.DEUTSCHE_BANK]: "Deutsche Bank", [oe.BBVA]: "BBVA" }[e] ?? null : null;
function ke(e) {
  return Math.round(100 * e);
}
function Pe(e) {
  return (e / 100).toFixed(2);
}
const ra = [I.PAY_IN_TWELVE, I.PAY_IN_NINE, I.PAY_IN_SIX, I.PAY_IN_THREE, I.PAY_IN_FOUR, I.PAY_NOW_CHECKOUT, I.PAY_LATER, I.PAY_IN_X], Ri = { [I.PAY_NOW_CHECKOUT]: 1, [I.PAY_LATER]: 1, [I.PAY_IN_THREE]: 3, [I.PAY_IN_FOUR]: 4, [I.PAY_IN_SIX]: 6, [I.PAY_IN_NINE]: 9, [I.PAY_IN_TWELVE]: 12 }, De = [I.PAY_IN_SIX, I.PAY_IN_NINE, I.PAY_IN_TWELVE], Vi = [I.PAY_IN_X, I.PAY_IN_TWELVE, I.PAY_IN_NINE, I.PAY_IN_SIX, I.PAY_IN_FOUR, I.PAY_IN_THREE, I.PAY_NOW_CHECKOUT], $t = { 1: oe.DEUTSCHE_BANK, 2: oe.BBVA, deutsche_bank: oe.DEUTSCHE_BANK, bbva: oe.BBVA };
var j, _t;
(function(e) {
  e.EN = "en", e.IT = "it", e.PT = "pt", e.DE = "de", e.FR = "fr", e.ES = "es";
})(j || (j = {})), function(e) {
  e.LB = "fr", e.CA = "es", e.EU = "es", e.GL = "es", e.OC = "es", e.RM = "it";
}(_t || (_t = {}));
const me = j.EN, yt = { widget: { variant: null, collect: !1 }, products: [{ type: gt.ONLINE, product: I.PAY_IN_THREE, numberOfInstallments: 3, frequency: { number: 1, frequencyType: "monthly" }, isStackable: !0, configuration: { splitFee: !1, minimumAmount: { amount: 5, currency: "EUR" }, maximumAmount: { amount: 3e3, currency: "EUR" } } }] };
function Ja(e, t) {
  const n = new Date(e), a = n.getUTCDate();
  return n.setUTCMonth(n.getUTCMonth() + t), n.getUTCDate() !== a && n.setUTCDate(0), n;
}
function Rn(e, t) {
  const n = [];
  let a = t;
  for (; a > 1; ) {
    const r = Math.round(e / a);
    n.push(r), e -= r, a--;
  }
  return n.push(e), n.sort((r, i) => r - i);
}
const Ke = (e) => (e instanceof Date ? e : new Date(e)).toISOString(), V = (e) => new Date(e).getTime();
function Ie(e, t) {
  const n = new Date(e), a = new Date(t), r = n.getUTCFullYear(), i = n.getUTCMonth() + 1, s = Math.min(n.getUTCDate(), 30);
  return 360 * (a.getUTCFullYear() - r) + 30 * (a.getUTCMonth() + 1 - i) + (Math.min(a.getUTCDate(), 30) - s);
}
function ia(e, t) {
  const n = new Date(e), a = n.getUTCDate();
  return n.setUTCMonth(n.getUTCMonth() + t), n.getUTCDate() !== a && n.setUTCDate(0), n;
}
class Je extends Error {
  constructor(n, a, r) {
    super(a);
    ot(this, "code");
    ot(this, "details");
    this.name = "LoanEngineError", this.code = n, r && (this.details = r);
  }
}
function Fi(e, t, n) {
  return t.reduce((a, r) => a + r.amountInCents / (1 + e) ** (r.daysFromStart / n), 0);
}
function Di(e, t, n) {
  return t.reduce((a, r) => {
    const i = r.daysFromStart / n;
    return i === 0 ? a : a - r.amountInCents * i / (1 + e) ** (i + 1);
  }, 0);
}
function Bi(e) {
  const { totalAmountInCents: t, instalments: n, startDate: a } = e;
  if (2 > n.length) throw new Je("INVALID_INPUT", "Loan must have at least 2 instalments to compute APR", { numberOfInstalments: n.length });
  const r = [{ amountInCents: t - n[0].baseInstalmentAmountInCents, daysFromStart: 0 }];
  for (let i = 1; n.length > i; i++) {
    const s = Ie(a, n[i].dueDate);
    r.push({ amountInCents: -n[i].baseInstalmentAmountInCents, daysFromStart: s });
  }
  return function(i, s = 360) {
    if (2 > i.length) throw new Je("INVALID_INPUT", "cashFlows must contain at least 2 entries", { cashFlowsLength: i.length });
    const o = i.reduce((c, u) => c + u.amountInCents, 0);
    if (1e-6 > Math.abs(o)) return 0;
    let l = 0.1;
    for (let c = 0; 100 > c; c++) {
      const u = Fi(l, i, s), d = Di(l, i, s);
      if (1e-8 > Math.abs(u) || 1e-10 > Math.abs(d)) break;
      l -= u / d, -0.99 > l && (l = -0.99), l > 10 && (l = 10);
    }
    return Number.isFinite(l) ? Math.round(1e4 * l) : 0;
  }(r);
}
const cn = (e) => Math.floor(e);
function sa(e) {
  const { startDate: t, totalAmountInCents: n, stampDutyInCents: a, numberOfInstalments: r, narBPS: i } = e, s = i / 1e4 / 360, o = +(1e4 * s).toFixed(2), l = new Date(t), c = r - 1, u = 30 * s;
  let d;
  if (c === 0) d = n + a;
  else if (u === 0) d = cn((n + a) / r);
  else {
    const f = u / (1 - Math.pow(1 + u, -c));
    d = cn((n + a) * f / (1 + f));
  }
  const m = [];
  let _ = n;
  for (let f = 1; r >= f; f++) {
    const x = ia(l, f - 1), S = { instalmentNumber: f, baseInstalmentAmountInCents: d, principalAmountInCents: 0, dueDate: Ke(x), status: "PENDING", statusLabel: "PENDING", interestPeriods: [], retainedInterestPeriods: [], totalInterestInCents: 0, stampDutyInCents: 0, voidedAmountInCents: 0, prepaidPrincipalInCents: 0, refundedPrepaidInCents: 0, cashRefundInCents: 0, accruedInterestInCents: 0, settledInterestInCents: 0, isBorderInstalment: !1, refundedPrincipalInCents: 0, deltaVoidedAmountInCents: 0, deltaPrepaidPrincipalInCents: 0, deltaCashRefund: { totalInCents: 0, fromChargedInCents: 0, fromPrepaidInCents: 0 }, deltaRefundAmountInCents: 0, deltaRefundAmountFromChargesInCents: 0 };
    if (f === 1) {
      S.stampDutyInCents = a;
      const v = d - a;
      S.principalAmountInCents = v, _ -= v;
    } else {
      const v = ia(l, f - 2), y = x, b = Ie(v, y), w = cn(_ * s * b);
      if (S.interestPeriods.push({ from: Ke(v), to: Ke(y), outstandingPrincipalInCents: _, daysElapsed: b, interestInCents: w }), r > f) {
        const A = d - w;
        S.principalAmountInCents = A, _ -= A;
      } else S.baseInstalmentAmountInCents = _ + w, S.principalAmountInCents = _, _ = 0;
    }
    S.totalInterestInCents = S.interestPeriods.reduce((v, y) => v + y.interestInCents, 0), S.retainedInterestPeriods = [...S.interestPeriods], m.push(S);
  }
  const h = { startDate: Ke(l), totalAmountInCents: n, stampDutyInCents: a, baseInstalmentAmountInCents: d, numberOfInstalments: r, narBPS: i, dailyRateBPS: o, instalments: m, events: [] };
  return 2 > r || (h.currentAprBPS = Bi(h)), h;
}
const ie = (e) => e === "PENDING" || e === "PENDING_PARTIALLY_REFUNDED", J = (e) => e === "CHARGED" || e === "CHARGED_PARTIALLY_REFUNDED", Q = (e) => e === "REFUNDED";
function be(e) {
  let t = e.totalAmountInCents;
  for (const n of e.instalments) J(n.status) && (t -= n.principalAmountInCents), Q(n.status) && (t -= (n.voidedAmountInCents || 0) + (n.refundedPrincipalInCents || 0)), t -= n.prepaidPrincipalInCents || 0, n.status !== "PENDING_PARTIALLY_REFUNDED" && n.status !== "CHARGED_PARTIALLY_REFUNDED" || (t -= n.voidedAmountInCents || 0);
  return t;
}
function Me(e) {
  return e.events.filter((t) => t.type === "REFUND" || t.type === "CAPITAL_INJECTION").map((t) => ({ date: t.date, deltaInCents: -t.principalReductionInCents })).sort((t, n) => V(t.date) - V(n.date));
}
function Ee(e, t, n, a, r) {
  const i = V(e), s = V(t), o = a.filter((f) => V(f.date) > i && V(f.date) < s).sort((f, x) => V(f.date) - V(x.date)), l = [];
  let c = n, u = e;
  for (const f of o) l.push({ from: u, to: f.date, balance: c }), c += f.deltaInCents, c = Math.max(0, c), u = f.date;
  l.push({ from: u, to: t, balance: c });
  let d = 0;
  const m = [];
  for (const f of l) {
    const x = Ie(f.from, f.to), S = f.balance * r * x;
    d += S, m.push({ from: Ke(new Date(f.from)), to: Ke(new Date(f.to)), outstandingPrincipalInCents: f.balance, daysElapsed: x, interestInCents: Math.round(S) });
  }
  const _ = Math.round(d), h = m.reduce((f, x) => f + x.interestInCents, 0);
  return h !== _ && m.length > 0 && (m[m.length - 1].interestInCents += _ - h), { totalInterest: _, interestPeriods: m, closingBalance: c };
}
function oa(e) {
  return J(e.status) || Q(e.status) && (e.refundedPrincipalInCents || 0) > 0 && (e.voidedAmountInCents || 0) === 0;
}
function Ui(e, t) {
  const n = V(e.dueDate);
  let a = 0;
  for (const r of t.events) r.type === "CAPITAL_INJECTION" && r.prepaidInstalments && r.prepaidInstalments.includes(e.instalmentNumber) && V(r.date) >= n && (a += r.amountInCents);
  return Math.min(a, e.prepaidPrincipalInCents || 0);
}
function un(e, t) {
  const n = e.narBPS / 1e4 / 360, a = e.baseInstalmentAmountInCents, r = e.instalments.filter((l) => ie(l.status));
  for (const l of r) l.accruedInterestInCents = 0;
  if (r.length === 0) return;
  const { lastPaidDate: i, openingBalance: s } = function(l, c) {
    const u = [...l.instalments].sort((f, x) => f.instalmentNumber - x.instalmentNumber);
    let d = null;
    for (const f of u) {
      if (!oa(f)) break;
      d = f;
    }
    const m = d ? d.dueDate : l.startDate, _ = V(m);
    let h = l.totalAmountInCents;
    for (const f of u)
      if (!oa(f) || (h -= Q(f.status) ? f.refundedPrincipalInCents || 0 : f.principalAmountInCents, f === d)) break;
    for (const f of c) V(f.date) > _ || (h += f.deltaInCents);
    return { lastPaidDate: m, openingBalance: h };
  }(e, t);
  let o = s;
  for (let l = 0; r.length > l; l++) {
    const c = r[l], u = l === 0 ? i : r[l - 1].dueDate, d = c.dueDate, { totalInterest: m, interestPeriods: _, closingBalance: h } = Ee(u, d, o, t, n);
    c.interestPeriods = _;
    const f = Ui(c, e);
    if (l === r.length - 1) {
      let S = h;
      const v = V(c.dueDate);
      for (const y of t) V(y.date) < v || (S += y.deltaInCents);
      c.principalAmountInCents = Math.max(0, S), c.baseInstalmentAmountInCents = c.principalAmountInCents + m, o = 0;
    } else {
      const S = Math.min(Math.max(0, a - m), h);
      c.principalAmountInCents = Math.max(0, S - f), c.baseInstalmentAmountInCents = c.principalAmountInCents + m;
      let v = h;
      const y = V(d);
      for (const b of t) V(b.date) === y && (v += b.deltaInCents);
      o = v - S;
    }
    const x = c.settledInterestInCents || 0;
    x > 0 && (c.baseInstalmentAmountInCents = Math.max(0, c.baseInstalmentAmountInCents - x));
  }
  (function(l) {
    for (const c of l) {
      if (c.principalAmountInCents !== 0 || c.isBorderInstalment || c.baseInstalmentAmountInCents > 0) continue;
      const u = c.voidedAmountInCents || 0;
      if ((c.prepaidPrincipalInCents || 0) > 0) c.status = u > 0 ? "CHARGED_PARTIALLY_REFUNDED" : "CHARGED";
      else {
        if (0 >= u || c.status !== "PENDING_PARTIALLY_REFUNDED") continue;
        c.status = "REFUNDED";
      }
      c.baseInstalmentAmountInCents = 0, c.interestPeriods = [], c.accruedInterestInCents = 0;
    }
  })(r);
}
function zi(e, t, n) {
  const a = e.narBPS / 1e4 / 360, r = t.date, i = be(e);
  let s = 0;
  const o = e.instalments.filter((y) => ie(y.status)).sort((y, b) => b.instalmentNumber - y.instalmentNumber), l = e.instalments.filter((y) => ie(y.status)).sort((y, b) => y.instalmentNumber - b.instalmentNumber), c = function(y) {
    const b = [...y.instalments].sort((A, T) => A.instalmentNumber - T.instalmentNumber);
    let w = null;
    for (const A of b) if (J(A.status)) w = A;
    else {
      if (!Q(A.status) || 0 >= (A.refundedPrincipalInCents || 0) || (A.voidedAmountInCents || 0) !== 0) break;
      w = A;
    }
    return w ? w.dueDate : y.startDate;
  }(e), u = {};
  for (let y = 0; l.length > y; y++) u[l[y].instalmentNumber] = y === 0 ? c : l[y - 1].dueDate;
  const d = Me(e), m = [...e.instalments].sort((y, b) => y.instalmentNumber - b.instalmentNumber);
  let _ = e.totalAmountInCents;
  for (const y of m) if (J(y.status)) _ -= y.principalAmountInCents;
  else {
    if (!Q(y.status) || 0 >= (y.refundedPrincipalInCents || 0) || (y.voidedAmountInCents || 0) !== 0) break;
    _ -= y.refundedPrincipalInCents || 0;
  }
  const h = V(c);
  for (const y of d) V(y.date) > h || (_ += y.deltaInCents);
  const f = V(r), x = {};
  {
    const y = e.baseInstalmentAmountInCents;
    let b = _;
    for (let w = 0; l.length > w; w++) {
      const A = l[w], T = u[A.instalmentNumber], k = A.dueDate;
      if (f > V(T)) {
        const G = f < V(k) ? r : k, { totalInterest: xe } = Ee(T, G, b, d, a);
        x[A.instalmentNumber] = xe;
      }
      const { totalInterest: P, closingBalance: H } = Ee(T, k, b, d, a);
      if (w !== l.length - 1) {
        const G = Math.min(Math.max(0, y - P), H);
        let xe = H;
        const pe = V(k);
        for (const $e of d) V($e.date) === pe && (xe += $e.deltaInCents);
        b = xe - G;
      }
    }
  }
  const S = {};
  for (const y of l) {
    const b = y.instalmentNumber;
    S[b] = Math.max(0, (x[b] || 0) - (y.settledInterestInCents || 0));
  }
  if (l.length > 0) for (const y of l) s += S[y.instalmentNumber] || 0;
  const v = {};
  for (const y of e.instalments) v[y.instalmentNumber] = y.settledInterestInCents || 0;
  return { dailyRate: a, refundDate: r, effectiveAmount: n, balanceBeforeVoid: i, pendingTargets: o, pendingAsc: l, effectiveMaturedMap: S, maturedInterestMap: x, accruedInterestInCents: s, priorSettledSnapshot: v };
}
const Wi = [{ name: "computeDeltas", fn: function(e, t, n) {
  let a = 0, r = 0, i = 0, s = 0, o = 0;
  const l = [], c = new Map(t.instalments.map((d) => [d.instalmentNumber, d]));
  for (const d of e.instalments) {
    const m = c.get(d.instalmentNumber);
    d.deltaVoidedAmountInCents = (d.voidedAmountInCents ?? 0) - ((m == null ? void 0 : m.voidedAmountInCents) ?? 0);
    const _ = (d.refundedPrincipalInCents ?? 0) - ((m == null ? void 0 : m.refundedPrincipalInCents) ?? 0), h = (d.refundedPrepaidInCents ?? 0) - ((m == null ? void 0 : m.refundedPrepaidInCents) ?? 0);
    d.deltaCashRefund = { totalInCents: _ + h, fromChargedInCents: _, fromPrepaidInCents: h }, d.deltaPrepaidPrincipalInCents = (d.prepaidPrincipalInCents ?? 0) - ((m == null ? void 0 : m.prepaidPrincipalInCents) ?? 0), d.deltaRefundAmountInCents = d.deltaVoidedAmountInCents + d.deltaCashRefund.totalInCents, d.deltaRefundAmountFromChargesInCents = d.deltaVoidedAmountInCents + _, a += d.deltaVoidedAmountInCents, r += _, i += h, s += d.deltaPrepaidPrincipalInCents;
    const f = Math.max(0, (d.settledInterestInCents || 0) - (m && m.settledInterestInCents || 0));
    o += f, f > 0 && l.push({ instalmentNumber: d.instalmentNumber, settledInterestInCents: f });
  }
  const u = e.events[e.events.length - 1];
  u && (u.deltaVoidedAmountInCents = a, u.deltaCashRefund = { totalInCents: r + i, fromChargedInCents: r, fromPrepaidInCents: i }, u.deltaPrepaidPrincipalInCents = s, u.deltaRefundAmountInCents = a + r + i, u.deltaRefundAmountFromChargesInCents = a + r, u.type === "REFUND" && (u.deltaSettledInterestInCents = o, u.deltaSettledInterestByInstalment = l));
} }, { name: "computeRetainedInterestPeriods", fn: function(e, t, n) {
  var r, i;
  const a = new Map(t.instalments.map((s) => [s.instalmentNumber, s]));
  for (const s of e.instalments) {
    const o = a.get(s.instalmentNumber), l = (o == null ? void 0 : o.interestPeriods) ?? [];
    if (s.interestPeriods.length > 0) {
      const c = s.settledInterestInCents ?? 0, u = (o == null ? void 0 : o.retainedInterestPeriods) ?? [];
      s.retainedInterestPeriods = c > 0 && u.length > 0 ? u : s.interestPeriods;
    } else {
      const c = J(s.status) || Q(s.status) && (s.refundedPrincipalInCents ?? 0) > 0, u = s.settledInterestInCents ?? 0;
      if (c) {
        const d = e.events.some((m) => m.type === "PAYMENT" && m.instalmentNumber === s.instalmentNumber);
        s.retainedInterestPeriods = d ? l.length > 0 ? l : (r = o == null ? void 0 : o.retainedInterestPeriods) != null && r.length ? o.retainedInterestPeriods : [] : [];
      } else if (u > 0) {
        const d = (o == null ? void 0 : o.retainedInterestPeriods) ?? [];
        if (l.length > 0 || u !== ((o == null ? void 0 : o.settledInterestInCents) ?? 0)) {
          const m = (i = e.events[e.events.length - 1]) == null ? void 0 : i.date, _ = l.length > 0 ? l : d;
          if (_.length > 0 && m) {
            const h = s.dueDate;
            if (Ie(m, h) > 0) {
              const f = [];
              let x = 0;
              for (const v of _) {
                if (Ie(m, v.to) > 0) {
                  f.push({ from: v.from, to: m, outstandingPrincipalInCents: v.outstandingPrincipalInCents, daysElapsed: Ie(v.from, m), interestInCents: Math.max(0, u - x) });
                  break;
                }
                f.push({ from: v.from, to: v.to, outstandingPrincipalInCents: v.outstandingPrincipalInCents, daysElapsed: v.daysElapsed, interestInCents: v.interestInCents }), x += v.interestInCents;
              }
              const S = s.accruedInterestInCents ?? 0;
              if (ie(s.status) && S > 0) {
                const v = e.events[e.events.length - 1];
                f.push({ from: m, to: h, outstandingPrincipalInCents: (v == null ? void 0 : v.outstandingPrincipalAfterInCents) ?? _[0].outstandingPrincipalInCents, daysElapsed: Ie(m, h), interestInCents: S });
              }
              s.retainedInterestPeriods = f;
            } else {
              const f = [];
              let x = u;
              for (let S = 0; _.length > S; S++) {
                const v = _[S], y = S === _.length - 1 ? Math.max(0, x) : v.interestInCents;
                f.push({ from: v.from, to: v.to, outstandingPrincipalInCents: v.outstandingPrincipalInCents, daysElapsed: v.daysElapsed, interestInCents: y }), x -= y;
              }
              s.retainedInterestPeriods = f;
            }
          } else s.retainedInterestPeriods = [];
        } else s.retainedInterestPeriods = d;
      } else s.retainedInterestPeriods = [];
    }
  }
} }, { name: "applyInterestFieldsEarned", fn: function(e, t, n) {
  for (const a of e.instalments || []) {
    const r = (e.events || []).reduce((s, o) => o.type !== "PAYMENT" || o.instalmentNumber !== a.instalmentNumber ? s : s + (o.interestCollectedInCents || 0), 0), i = a.settledInterestInCents || 0;
    a.interestCollectedByPaymentsInCents = r, a.interestSettledAfterRefundsInCents = i, a.totalInterestEarnedInCents = r + i;
  }
} }, { name: "computeNetFields", fn: function(e, t, n) {
  for (const a of e.instalments) {
    a.netPrincipalInCents = Math.max(0, (a.principalAmountInCents ?? 0) - (a.refundedPrincipalInCents ?? 0)), a.netPrepaidPrincipalInCents = Math.max(0, (a.prepaidPrincipalInCents ?? 0) - (a.refundedPrepaidInCents ?? 0));
    const r = typeof a.accruedInterestInCents == "number" && a.accruedInterestInCents > 0, i = (a.interestPeriods || []).reduce((o, l) => o + l.interestInCents, 0);
    let s;
    s = Math.max(0, r && 0 >= i ? a.accruedInterestInCents ?? 0 : i - (a.settledInterestInCents ?? 0)), a.netInstalmentAmountInCents = a.netPrincipalInCents + a.netPrepaidPrincipalInCents + (a.stampDutyInCents ?? 0) + s, a.feeAmountOwingInCents = a.instalmentNumber === 1 ? a.stampDutyInCents ?? 0 : J(a.status) && s === 0 ? Math.max(0, a.baseInstalmentAmountInCents - a.netPrincipalInCents) : Q(a.status) && (a.refundedPrincipalInCents ?? 0) > 0 ? a.totalInterestEarnedInCents ?? 0 : s, a.amountOwingInCents = a.netPrincipalInCents + (a.feeAmountOwingInCents ?? 0);
  }
} }, { name: "computeTotalInterest", fn: function(e, t, n) {
  let a = 0;
  for (const r of e.instalments) {
    const i = r.instalmentNumber === 1 ? 0 : r.feeAmountOwingInCents ?? 0, s = Q(r.status) && (r.refundedPrincipalInCents ?? 0) > 0;
    r.totalInterestInCents = i + (s ? 0 : r.settledInterestInCents ?? 0), a += r.totalInterestInCents;
  }
  e.totalInterestInCents = a;
} }, { name: "computeBffFields", fn: function(e, t, n) {
  e.originalTotalLoanAmountWithInterestInCents = t.originalTotalLoanAmountWithInterestInCents !== void 0 ? t.originalTotalLoanAmountWithInterestInCents : function(a) {
    let r = 0;
    for (const i of a.instalments) (J(i.status) || ie(i.status)) && (r += i.baseInstalmentAmountInCents);
    return r;
  }(t);
  for (const a of e.instalments) a.currentInstalmentAmountWithInterestInCents = J(a.status) ? a.baseInstalmentAmountInCents - (a.cashRefundInCents ?? 0) : ie(a.status) ? a.baseInstalmentAmountInCents : 0;
  e.totalLoanAmountWithInterestInCents = n === "REFUND" || n === "CAPITAL_INJECTION" ? e.instalments.reduce((a, r) => a + (r.currentInstalmentAmountWithInterestInCents ?? 0), 0) : t.totalLoanAmountWithInterestInCents !== void 0 ? t.totalLoanAmountWithInterestInCents : e.originalTotalLoanAmountWithInterestInCents;
} }, { name: "computeStatusLabels", fn: function(e, t, n) {
  for (const a of e.instalments) {
    if (!Q(a.status)) {
      a.statusLabel = a.status;
      continue;
    }
    const r = e.events.some((i) => i.type === "PAYMENT" && i.instalmentNumber === a.instalmentNumber);
    a.statusLabel = r && (a.amountOwingInCents ?? 0) > 0 ? "CHARGED_PARTIALLY_REFUNDED" : a.status;
  }
} }], Yi = { PAYMENT: function(e, t) {
  const n = e.instalments.filter((_) => ie(_.status)).sort((_, h) => _.instalmentNumber - h.instalmentNumber)[0];
  if (!n) throw new Je("NO_PENDING_INSTALMENTS", "No pending instalments to pay");
  if (t.instalmentNumber !== void 0 && t.instalmentNumber !== n.instalmentNumber) throw new Je("INSTALMENT_NUMBER_MISMATCH", `Instalment number mismatch: caller expected ${t.instalmentNumber} but engine resolved ${n.instalmentNumber}`, { expected: t.instalmentNumber, actual: n.instalmentNumber });
  const a = be(e), r = n.interestPeriods.reduce((_, h) => _ + h.interestInCents, 0), i = n.settledInterestInCents || 0;
  let s = Math.max(0, r - i), o = n.principalAmountInCents;
  const l = n.stampDutyInCents || 0;
  let c = n.baseInstalmentAmountInCents, u = 0;
  const d = V(t.date);
  if (V(n.dueDate) > d && n.interestPeriods.length > 0) {
    const _ = e.narBPS / 1e4 / 360, h = Me(e), f = [...e.instalments].sort((T, k) => T.instalmentNumber - k.instalmentNumber);
    let x = null;
    for (const T of f) if (J(T.status)) x = T;
    else {
      if (!Q(T.status) || 0 >= (T.refundedPrincipalInCents || 0) || (T.voidedAmountInCents || 0) !== 0) break;
      x = T;
    }
    const S = x ? x.dueDate : e.startDate, v = e.instalments.filter((T) => ie(T.status)).sort((T, k) => T.instalmentNumber - k.instalmentNumber), y = v.findIndex((T) => T.instalmentNumber === n.instalmentNumber), b = y === 0 ? S : v[y - 1].dueDate;
    let w, A;
    if (d > V(b)) {
      const T = n.interestPeriods[0].outstandingPrincipalInCents;
      ({ totalInterest: w, interestPeriods: A } = Ee(b, t.date, T, h, _));
    } else w = 0, A = [];
    r > w && (u = r - w, s = Math.max(0, w - i), v.length === 1 || (o = Math.min(n.principalAmountInCents + u, a)), c = o + s + l, n.principalAmountInCents = o, n.baseInstalmentAmountInCents = o + s, n.interestPeriods = A);
  }
  n.status = (n.voidedAmountInCents || 0) > 0 || (n.refundedPrepaidInCents || 0) > 0 ? "CHARGED_PARTIALLY_REFUNDED" : "CHARGED", n.accruedInterestInCents = 0;
  const m = { type: "PAYMENT", date: t.date, instalmentNumber: n.instalmentNumber, amountPaidInCents: c, principalChargedInCents: o, interestCollectedInCents: s, stampDutyInCents: l, outstandingPrincipalBeforeInCents: a, outstandingPrincipalAfterInCents: be(e) };
  u > 0 && (m.earlyPayment = !0, m.interestSavingInCents = u), e.events.push(m), un(e, Me(e));
  {
    const _ = e.narBPS / 1e4 / 360, h = Me(e), f = e.instalments.filter((x) => ie(x.status)).sort((x, S) => x.instalmentNumber - S.instalmentNumber);
    if (f.length > 0) {
      const x = [...e.instalments].sort((k, P) => k.instalmentNumber - P.instalmentNumber);
      let S = null;
      for (const k of x) if (J(k.status)) S = k;
      else {
        if (!Q(k.status) || 0 >= (k.refundedPrincipalInCents || 0) || (k.voidedAmountInCents || 0) !== 0) break;
        S = k;
      }
      const v = S ? S.dueDate : e.startDate, y = V(v), b = (k) => J(k.status) || Q(k.status) && (k.refundedPrincipalInCents || 0) > 0 && (k.voidedAmountInCents || 0) === 0;
      let w = e.totalAmountInCents;
      for (const k of x)
        if (!b(k) || (w -= Q(k.status) ? k.refundedPrincipalInCents || 0 : k.principalAmountInCents, k === S)) break;
      for (const k of h) V(k.date) > y || (w += k.deltaInCents);
      const A = V(t.date);
      let T = w;
      for (let k = 0; f.length > k; k++) {
        const P = f[k], H = k === 0 ? v : f[k - 1].dueDate, G = P.dueDate, xe = V(H), pe = P.settledInterestInCents || 0;
        if (A > xe) {
          const an = A < V(G) ? t.date : G, { totalInterest: Pt } = Ee(H, an, T, h, _), Et = Math.max(0, Pt - pe);
          (Et > 0 || pe > 0) && (P.accruedInterestInCents = Et);
        } else pe > 0 && (P.accruedInterestInCents = 0);
        const { totalInterest: $e, closingBalance: st } = Ee(H, G, T, h, _);
        if (k !== f.length - 1) {
          const an = Math.min(Math.max(0, e.baseInstalmentAmountInCents - $e), st);
          let Pt = st;
          const Et = V(G);
          for (const Kn of h) V(Kn.date) === Et && (Pt += Kn.deltaInCents);
          T = Pt - an;
        }
      }
    }
  }
}, REFUND: function(e, t) {
  const n = function(s, o) {
    const l = s.events.filter((c) => c.type === "REFUND").reduce((c, u) => c + u.amountInCents, 0);
    return Math.min(o.amountInCents, Math.max(0, s.totalAmountInCents - l));
  }(e, t);
  if (0 >= n) return void e.events.push({ type: "REFUND", date: t.date, requestedAmountInCents: t.amountInCents, amountInCents: 0, principalReductionInCents: 0, accruedInterestInCents: 0, outstandingPrincipalBeforeInCents: be(e), outstandingPrincipalAfterInCents: be(e), voidedInstalments: [], cashRefundInCents: 0 });
  const a = zi(e, t, n), r = { remaining: n, pendingAllocationPhaseInterestSettled: 0, cashRefundInCents: 0, voidedNumbers: [], settledInterestMap: {} };
  (function(s, o) {
    for (const l of s.pendingTargets) {
      if (0 >= o.remaining) break;
      const c = l.accruedInterestInCents || 0;
      if (c > 0 && l.principalAmountInCents === 0 && o.remaining > 0) {
        const h = Math.min(c, o.remaining);
        o.pendingAllocationPhaseInterestSettled += h, o.remaining -= h, o.settledInterestMap[l.instalmentNumber] = (o.settledInterestMap[l.instalmentNumber] || 0) + h, l.accruedInterestInCents -= h, l.accruedInterestInCents > 0 ? l.baseInstalmentAmountInCents = l.accruedInterestInCents : (l.accruedInterestInCents = 0, l.baseInstalmentAmountInCents = 0, l.interestPeriods = [], l.status = (l.prepaidPrincipalInCents || 0) - (l.refundedPrepaidInCents || 0) > 0 ? (l.voidedAmountInCents || 0) > 0 || (l.refundedPrepaidInCents || 0) > 0 ? "CHARGED_PARTIALLY_REFUNDED" : "CHARGED" : "REFUNDED");
      }
      const u = l.prepaidPrincipalInCents || 0, d = l.voidedAmountInCents || 0, m = l.principalAmountInCents, _ = Math.min(o.remaining, m);
      if (_ > 0) {
        if (l.voidedAmountInCents = d + _, m > _) l.status = "PENDING_PARTIALLY_REFUNDED", l.principalAmountInCents -= _, l.baseInstalmentAmountInCents -= _;
        else if (u > 0 && d === 0) {
          l.principalAmountInCents = 0, l.baseInstalmentAmountInCents = 0, l.interestPeriods = [];
          const h = s.effectiveMaturedMap[l.instalmentNumber] || 0;
          let f = 0;
          if (h > 0) {
            const x = Math.min(h, Math.max(0, o.remaining - _));
            x > 0 && (o.pendingAllocationPhaseInterestSettled += x, o.remaining -= x), o.settledInterestMap[l.instalmentNumber] = x, f = h - x, l.accruedInterestInCents = f > 0 ? f : 0;
          }
          f > 0 ? (l.status = "PENDING_PARTIALLY_REFUNDED", l.baseInstalmentAmountInCents = f) : l.status = "CHARGED_PARTIALLY_REFUNDED";
        } else {
          if (o.remaining - _ > 0) {
            const h = s.effectiveMaturedMap[l.instalmentNumber] || 0;
            if (h > 0) {
              const f = Math.min(h, o.remaining - _);
              o.pendingAllocationPhaseInterestSettled += f, o.remaining -= f, o.settledInterestMap[l.instalmentNumber] = (o.settledInterestMap[l.instalmentNumber] || 0) + f;
            }
          }
          if (u > 0) {
            const h = l.refundedPrepaidInCents || 0, f = Math.min(u - h, o.remaining - _);
            f > 0 && (l.refundedPrepaidInCents = h + f, l.cashRefundInCents = (l.cashRefundInCents || 0) + f, o.cashRefundInCents += f, o.remaining -= f), l.status = u - (l.refundedPrepaidInCents || 0) > 0 ? "CHARGED_PARTIALLY_REFUNDED" : "REFUNDED";
          } else l.status = "REFUNDED";
          if (l.principalAmountInCents = 0, l.baseInstalmentAmountInCents = 0, l.interestPeriods = [], 0 >= u || d !== 0) {
            const h = (s.effectiveMaturedMap[l.instalmentNumber] || 0) - (o.settledInterestMap[l.instalmentNumber] || 0);
            if (h > 0) {
              const f = Math.min(h, o.remaining - _);
              f > 0 && (o.pendingAllocationPhaseInterestSettled += f, o.remaining -= f, o.settledInterestMap[l.instalmentNumber] = (o.settledInterestMap[l.instalmentNumber] || 0) + f);
              const x = h - f;
              x > 0 && (l.accruedInterestInCents = x, l.status = "PENDING_PARTIALLY_REFUNDED", l.baseInstalmentAmountInCents = x);
            }
          }
        }
        o.voidedNumbers.push(l.instalmentNumber), o.remaining -= _;
      }
    }
  })(a, r), function(s, o, l) {
    if (0 >= l.remaining) return;
    l.remaining -= Math.min(Math.max(0, o.accruedInterestInCents - l.pendingAllocationPhaseInterestSettled), l.remaining);
    const c = s.instalments.filter((u) => J(u.status) || (u.prepaidPrincipalInCents || 0) > 0).sort((u, d) => d.instalmentNumber - u.instalmentNumber);
    for (const u of c) {
      if (0 >= l.remaining) break;
      const d = ie(u.status);
      if (d && l.remaining > 0) {
        const h = Math.min(l.remaining, u.principalAmountInCents);
        h > 0 && (u.voidedAmountInCents = (u.voidedAmountInCents || 0) + h, u.principalAmountInCents -= h, u.baseInstalmentAmountInCents -= h, l.voidedNumbers.includes(u.instalmentNumber) || l.voidedNumbers.push(u.instalmentNumber), l.remaining -= h);
      }
      const m = u.refundedPrepaidInCents || 0, _ = Math.min(l.remaining, (u.prepaidPrincipalInCents || 0) - m);
      if (_ > 0 && (u.refundedPrepaidInCents = m + _, u.cashRefundInCents = (u.cashRefundInCents || 0) + _, l.cashRefundInCents += _, l.remaining -= _), d && u.isBorderInstalment && 0 >= (u.prepaidPrincipalInCents || 0) - (u.refundedPrepaidInCents || 0) && u.principalAmountInCents === 0) {
        const h = o.effectiveMaturedMap[u.instalmentNumber] !== void 0 ? o.effectiveMaturedMap[u.instalmentNumber] : u.interestPeriods.reduce((x, S) => x + S.interestInCents, 0), f = Math.min(h, l.remaining);
        l.remaining -= f, f > 0 && (l.settledInterestMap[u.instalmentNumber] = (l.settledInterestMap[u.instalmentNumber] || 0) + f);
      }
      if (d) {
        const h = (u.prepaidPrincipalInCents || 0) - (u.refundedPrepaidInCents || 0);
        u.principalAmountInCents > 0 || h > 0 ? 0 >= u.principalAmountInCents && h > 0 ? (u.status = "CHARGED_PARTIALLY_REFUNDED", u.principalAmountInCents = 0, u.baseInstalmentAmountInCents = 0, u.interestPeriods = []) : ((u.voidedAmountInCents || 0) > 0 || (u.refundedPrepaidInCents || 0) > 0) && (u.status = "PENDING_PARTIALLY_REFUNDED") : (u.status = "REFUNDED", u.principalAmountInCents = 0, u.baseInstalmentAmountInCents = 0, u.interestPeriods = []);
      }
      if (0 >= l.remaining) break;
      if (!d) {
        const h = Math.min(l.remaining, u.principalAmountInCents - (u.refundedPrincipalInCents || 0));
        h > 0 && (u.refundedPrincipalInCents = (u.refundedPrincipalInCents || 0) + h, u.cashRefundInCents = (u.cashRefundInCents || 0) + h, l.cashRefundInCents += h, l.remaining -= h);
      }
    }
  }(e, a, r), function(s) {
    for (const o of s.instalments) if (J(o.status)) {
      const l = o.refundedPrincipalInCents || 0, c = o.refundedPrepaidInCents || 0, u = o.prepaidPrincipalInCents || 0;
      0 >= l && 0 >= c || o.principalAmountInCents !== 0 && o.principalAmountInCents > l || u !== 0 && u > c ? (c > 0 || l > 0) && (o.status = "CHARGED_PARTIALLY_REFUNDED") : o.status = "REFUNDED";
    }
  }(e);
  const i = a.balanceBeforeVoid - be(e);
  e.events.push({ type: "REFUND", date: a.refundDate, requestedAmountInCents: t.amountInCents, amountInCents: n, principalReductionInCents: i, accruedInterestInCents: a.accruedInterestInCents, outstandingPrincipalBeforeInCents: a.balanceBeforeVoid, outstandingPrincipalAfterInCents: be(e), voidedInstalments: r.voidedNumbers, cashRefundInCents: r.cashRefundInCents }), un(e, Me(e));
  for (const s of e.instalments) if (ie(s.status)) {
    const o = r.settledInterestMap[s.instalmentNumber] || 0, l = (a.priorSettledSnapshot[s.instalmentNumber] || 0) + o;
    s.accruedInterestInCents = Math.max(0, (a.maturedInterestMap[s.instalmentNumber] || 0) - l), s.settledInterestInCents = l, l > 0 && (o > 0 && (s.baseInstalmentAmountInCents = Math.max(0, s.baseInstalmentAmountInCents - o)), s.interestPeriods = []);
  }
  for (const s of e.instalments) if (Q(s.status)) {
    s.interestPeriods = [], s.principalAmountInCents = 0, s.baseInstalmentAmountInCents = 0, s.accruedInterestInCents = 0;
    const o = r.settledInterestMap[s.instalmentNumber] || 0, l = a.priorSettledSnapshot[s.instalmentNumber] || 0;
    (o > 0 || l > 0) && (s.settledInterestInCents = l + o);
  }
  for (const s of e.instalments) if (J(s.status)) {
    const o = r.settledInterestMap[s.instalmentNumber] || 0, l = a.priorSettledSnapshot[s.instalmentNumber] || 0;
    (o > 0 || l > 0) && (s.settledInterestInCents = l + o, s.accruedInterestInCents = 0);
  }
}, CAPITAL_INJECTION: function(e, t) {
  const n = e.narBPS / 1e4 / 360, a = be(e), r = Math.min(t.amountInCents, a);
  if (0 >= r) throw new Je("CAPITAL_INJECTION_REJECTED", `Capital injection of ${t.amountInCents} cents rejected: outstanding balance is ${a} cents`, { requestedAmountInCents: t.amountInCents, outstandingBalanceInCents: a });
  const i = t.date, s = V(i), { allocated: o, remaining: l } = function(b, w) {
    const A = b.filter((P) => ie(P.status)).sort((P, H) => H.instalmentNumber - P.instalmentNumber), T = [];
    let k = w;
    for (const P of A) {
      if (0 >= k) break;
      const H = Math.min(k, P.principalAmountInCents || 0);
      H > 0 && (T.push({ instalmentNumber: P.instalmentNumber, amount: H }), k -= H);
    }
    return { allocated: T, remaining: k };
  }(e.instalments, r), c = e.instalments.filter((b) => ie(b.status)).sort((b, w) => b.instalmentNumber - w.instalmentNumber), u = [...e.instalments].sort((b, w) => b.instalmentNumber - w.instalmentNumber);
  let d = null;
  for (const b of u) if (J(b.status)) d = b;
  else {
    if (!Q(b.status) || 0 >= (b.refundedPrincipalInCents || 0) || (b.voidedAmountInCents || 0) !== 0) break;
    d = b;
  }
  const m = d ? d.dueDate : e.startDate, _ = [];
  for (const { instalmentNumber: b, amount: w } of o) {
    const A = e.instalments.find((k) => k.instalmentNumber === b);
    A.prepaidPrincipalInCents = (A.prepaidPrincipalInCents || 0) + w;
    const T = c.findIndex((k) => k.instalmentNumber === b);
    Ie(T === 0 ? m : c[T - 1].dueDate, t.date) > 0 && Ie(t.date, A.dueDate) > 0 && (A.isBorderInstalment = !0), _.push(b);
  }
  const h = r - l, f = Me(e);
  let x = e.totalAmountInCents;
  for (const b of u) if (J(b.status)) x -= b.principalAmountInCents;
  else {
    if (!Q(b.status) || 0 >= (b.refundedPrincipalInCents || 0) || (b.voidedAmountInCents || 0) !== 0) break;
    x -= b.refundedPrincipalInCents || 0;
  }
  const S = V(m);
  for (const b of f) V(b.date) > S || (x += b.deltaInCents);
  let v = 0;
  const y = {};
  {
    const b = e.baseInstalmentAmountInCents;
    let w = x;
    for (let A = 0; c.length > A; A++) {
      const T = c[A], k = A === 0 ? m : c[A - 1].dueDate, P = T.dueDate;
      if (s > V(k)) {
        const xe = s < V(P) ? i : P, { totalInterest: pe } = Ee(k, xe, w, f, n);
        y[T.instalmentNumber] = pe, v += pe;
      }
      const { totalInterest: H, closingBalance: G } = Ee(k, P, w, f, n);
      if (A !== c.length - 1) {
        const xe = Math.min(Math.max(0, b - H), G);
        let pe = G;
        const $e = V(P);
        for (const st of f) V(st.date) === $e && (pe += st.deltaInCents);
        w = pe - xe;
      }
    }
  }
  e.events.push({ type: "CAPITAL_INJECTION", date: i, amountInCents: r, principalReductionInCents: h, accruedInterestInCents: v, outstandingPrincipalBeforeInCents: a, outstandingPrincipalAfterInCents: be(e), prepaidInstalments: _ }), un(e, Me(e));
  for (const b of e.instalments) ie(b.status) && (b.accruedInterestInCents = y[b.instalmentNumber] || 0);
} };
function Qa(e, t) {
  const n = Yi[t.type];
  if (!n) throw new Je("UNKNOWN_EVENT_TYPE", "Unknown event type: " + t.type, { eventType: t.type });
  const a = function(r) {
    return JSON.parse(JSON.stringify(r));
  }(e);
  return n(a, t), function(r, i, s) {
    for (const o of Wi) o.fn(r, i, s);
  }(a, e, t.type), a;
}
const Zi = (e) => ({ applyEvent: (t) => (e.loan = Qa(e.loan, t), e.history.push(e.loan), e.loan) }), $i = (e) => ({ applyEvents: (t) => (e.loan = function(n, a) {
  return [...a].sort((r, i) => new Date(r.date).getTime() - new Date(i.date).getTime()).reduce((r, i) => Qa(r, i), n);
}(e.loan, t), e.history.push(e.loan), e.loan) });
function Gi({ numberOfInstallments: e, totalAmountInCents: t, stampDutyInCents: n = 1600, tanPercentage: a, roundingCents: r = 0 }) {
  if (!a || Number.isNaN(a) || 0 >= a) throw Error("tanPercentage must be greater than 0 for consumer lending products");
  const i = 100 * a, s = function(d) {
    const m = sa(d), _ = { initialLoan: m, loan: m, history: [m], config: d };
    return { ...Zi(_), ...$i(_), get state() {
      return _;
    }, get loan() {
      return _.loan;
    }, get initialLoan() {
      return _.initialLoan;
    }, get history() {
      return _.history;
    }, get config() {
      return _.config;
    }, get outstandingBalance() {
      return be(_.loan);
    }, historyAt(h) {
      if (0 > h || h >= _.history.length) throw Error("Invalid history index");
      _.loan = _.history[h], _.history = _.history.slice(0, h + 1);
    }, initFromConfig(h) {
      _.config = h;
      const f = sa(h);
      _.initialLoan = f, _.loan = f, _.history = [_.initialLoan];
    } };
  }({ startDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0], totalAmountInCents: t, stampDutyInCents: n, numberOfInstalments: e, narBPS: i }), { instalments: o, currentAprBPS: l, totalInterestInCents: c } = s.loan, u = ((l ?? 0) / 100).toFixed(2);
  return o.map((d) => ({ sequence: d.instalmentNumber, dueDate: new Date(d.dueDate), amount: { amount: Pe(d.baseInstalmentAmountInCents - r), amountInCents: d.baseInstalmentAmountInCents - r, currency: "EUR" }, installmentAmount: { amount: Pe(d.baseInstalmentAmountInCents), amountInCents: d.baseInstalmentAmountInCents, currency: "EUR" }, principalAmount: { amount: Pe(d.principalAmountInCents), amountInCents: d.principalAmountInCents, currency: "EUR" }, stampDutyAmount: { amount: Pe(d.stampDutyInCents), amountInCents: d.stampDutyInCents, currency: "EUR" }, tanPercentage: a.toFixed(2), taegPercentage: u, totalInterestInCents: { amount: Pe(c ?? 0), amountInCents: c ?? 0, currency: "EUR" } }));
}
const Vn = (e, t, n, a = "v1") => {
  if (n === j.ES) return ji(e);
  if ([j.IT, j.FR, j.EN].includes(n)) {
    if (t === 4) return qi(e);
    if (t === 3) return Ki(e);
  }
  return 0;
}, ji = (e) => e > 499 ? Math.round(0.01 * e) : null, qi = (e) => e > 499 ? e > 999 ? e > 1999 ? e > 3499 ? e > 4999 ? e > 6499 ? e > 7999 ? e > 9499 ? e > 10999 ? e > 12499 ? e > 13999 ? e > 15999 ? e > 17999 ? e > 19999 ? e > 34999 ? e > 49999 ? e > 64999 ? e > 79999 ? e > 99999 ? e > 149999 ? e > 199999 ? e > 499999 ? null : 3700 : 2770 : 1850 : 1480 : 1200 : 920 : 650 : 360 : 330 : 290 : 260 : 230 : 200 : 170 : 140 : 120 : 90 : 60 : 35 : 18 : 9 : null, Ki = (e) => e > 499 ? e > 999 ? e > 1999 ? e > 3499 ? e > 4999 ? e > 6499 ? e > 7999 ? e > 9499 ? e > 10999 ? e > 12499 ? e > 13999 ? e > 15999 ? e > 17999 ? e > 19999 ? e > 34999 ? e > 49999 ? e > 64999 ? e > 79999 ? e > 99999 ? e > 149999 ? e > 199999 ? e > 499999 ? null : 2400 : 1850 : 1230 : 990 : 800 : 620 : 430 : 250 : 220 : 200 : 170 : 150 : 130 : 110 : 100 : 80 : 60 : 40 : 25 : 12 : 6 : null;
function Xi({ numberOfInstallments: e, totalAmountInCents: t, hasSplitFee: n = !1, locale: a = j.IT, roundingCents: r = 0 }) {
  const i = /* @__PURE__ */ new Date();
  return Rn(t, e).map((s, o) => {
    const l = Ja(i, o);
    let c = 0;
    return o === 0 && n && (c = Vn(s, e, a) ?? 0), { sequence: o + 1, dueDate: l, amount: { amount: Pe(s + c - r), amountInCents: s + c - r, currency: "EUR" }, orderPlacementFee: c > 0 ? { amount: Pe(c), amountInCents: c, currency: "EUR" } : void 0 };
  });
}
function Ji({ numberOfInstallments: e, totalAmountInCents: t, tan: n, roundingCents: a = 0 }) {
  const r = /* @__PURE__ */ new Date();
  return function(s, o, l) {
    if (l === 0) return Rn(s, o);
    const c = l / 12 / 100, u = Math.pow(1 + c, o), d = Math.round(s * (c * u) / (u - 1));
    return Array(o).fill(d);
  }(t, e, n).map((s, o) => ({ sequence: o + 1, dueDate: Ja(r, o), amount: { amount: Pe(s - a), amountInCents: s - a, currency: "EUR" }, orderPlacementFee: void 0 }));
}
function Qi(e, t, n, a = 0) {
  let r;
  const i = e.numberOfInstallments || 0;
  return r = De.includes(e.product) && e.configuration.tan && e.configuration.tan > 0 ? Gi({ numberOfInstallments: i, totalAmountInCents: t, tanPercentage: e.configuration.tan, roundingCents: a }) : e.product === I.PAY_IN_X && e.configuration.maxInstallments ? Ji({ numberOfInstallments: i, totalAmountInCents: t, tan: e.configuration.tan || 0, roundingCents: a }) : Xi({ numberOfInstallments: i, totalAmountInCents: t, hasSplitFee: !!e.configuration.splitFee, locale: n, roundingCents: a }), { paymentSchedule: r, isDefault: !1, isOfferedForCustomer: !0 };
}
function es(e) {
  const t = Object.keys(e);
  if (t.length === 0) return e;
  let n = t[0], a = 1 / 0, r = [];
  if (t.forEach((i) => {
    const s = e[i].paymentSchedule;
    if (!s || s.length === 0) return;
    const o = parseFloat(s[0].amount.amount);
    r.push(o), a > o && (a = o, n = i);
  }), r.every((i) => i === a)) {
    let i = 0;
    t.forEach((s) => {
      const o = e[s].paymentSchedule.length;
      o > i && (i = o, n = s);
    });
  }
  return { ...e, [n]: { ...e[n], isDefault: !0 } };
}
function Fn(e, t, n, a = 1) {
  const r = {};
  return e.forEach((i) => {
    try {
      const s = Qi(i, t, n, a);
      r[i.product] = s;
    } catch {
    }
  }), es(r);
}
function Dn(e) {
  const t = Object.keys(e).find((n) => e[n].isDefault);
  return t ? e[t] : e[Object.keys(e)[0]];
}
function Gt(e) {
  const t = e.paymentSchedule.reduce((n, a) => n.amount.amountInCents > a.amount.amountInCents ? a : n, e.paymentSchedule[0]);
  return { amount: t.amount.amount, amountInCents: t.amount.amountInCents, currency: t.amount.currency };
}
function Bn(e) {
  return e.product === I.PAY_IN_X ? e.configuration.maxInstallments || 0 : Ri[e.product] || 0;
}
function jt(e, t) {
  return e ? e.reduce((n, a) => a.type === gt.ONLINE && ((r) => {
    if (t === null) return !0;
    const i = r.configuration.minimumAmount ? ke(r.configuration.minimumAmount.amount) : null, s = r.configuration.maximumAmount ? ke(r.configuration.maximumAmount.amount) : null;
    return !(!i || i > t || !s || t > s);
  })(a) && a.isStackable && Vi.includes(a.product) ? [...n, { ...a, numberOfInstallments: Bn(a) }] : n, []) : yt.products;
}
function ts(e, t) {
  if (t === null) return !0;
  const n = e.configuration.minimumAmount ? ke(e.configuration.minimumAmount.amount) : null, a = e.configuration.maximumAmount ? ke(e.configuration.maximumAmount.amount) : null;
  return !(!n || n > t) && !(!a || t > a);
}
function qt(e, t) {
  return e ? e.filter((n) => n.type === gt.ONLINE && n.isStackable).map((n) => ({ ...n, numberOfInstallments: Bn(n), isAvailable: ts(n, t) })).sort((n, a) => n.isAvailable !== a.isAvailable ? n.isAvailable ? 1 : -1 : (a.numberOfInstallments || 0) - (n.numberOfInstallments || 0)) : [];
}
function er(e) {
  return Math.max(...e.map((t) => Bn(t) || 0));
}
function tr(e, t) {
  if (t === null || !e.configuration.minimumAmount) return 0;
  const n = ke(e.configuration.minimumAmount.amount);
  return n && n > 0 ? Math.min(t / n * 100, 100) : 0;
}
const Tt = (e, t) => e.find((n) => n.product === t) || null, nr = (e) => e.length === 1 && e.every((t) => t.product === I.PAY_IN_X), ar = (e) => e.length === 1 && e.every((t) => t.product === I.PAY_NOW_CHECKOUT), Cn = (e) => e.some((t) => t.product === I.PAY_IN_X), Re = (e) => e.some((t) => t.product !== I.PAY_IN_X), rr = (e) => {
  const t = e.filter((n) => n.product === I.PAY_IN_X)[0];
  return !(!t || !t.configuration) && Number(t.configuration.tan) === 0;
}, ir = (e) => e.product === I.PAY_IN_THREE, vn = (e) => e.product === I.PAY_IN_FOUR, Xe = (e) => e.product === I.PAY_IN_X, Qe = (e) => e.product === I.PAY_NOW_CHECKOUT, xt = (e) => De.includes(e.product), ns = (e) => e.sort((t, n) => ra.indexOf(t.product) - ra.indexOf(n.product));
class as extends Error {
  constructor(t) {
    super(t), this.name = "NoMerchantConfigurationFound";
  }
}
class rs extends Error {
  constructor(t) {
    super(t), this.name = "ConfigurationEnvironmentNotSupported";
  }
}
const is = "[Scalapay]";
class ss {
  constructor() {
    ot(this, "debugLog", !1);
    ot(this, "prefix", is);
    sessionStorage.getItem("scalapay-log") && (this.debugLog = !0);
  }
  warn(...t) {
    console.warn(this.prefix, ...t);
  }
  error(...t) {
    console.error(this.prefix, ...t);
  }
  log(...t) {
    console.log(this.prefix, ...t);
  }
  info(...t) {
    console.info(this.prefix, ...t);
  }
  debug(...t) {
    this.debugLog && console.debug(this.prefix, ...t);
  }
  group(...t) {
    console.group(this.prefix, ...t);
  }
  groupEnd() {
    console.groupEnd();
  }
}
const Z = new ss();
function os(e) {
  return e && typeof e == "object" && "products" in e ? (Z.debug("Received v4/configuration", e), e) : e && Array.isArray(e) ? (Z.debug("Received v3/configuration, transforming it", e), {
    ...yt,
    products: e
  }) : (Z.warn("Unexpected response for merchant configuration", e), yt);
}
async function ls(e) {
  try {
    if (Z.debug("Fetching merchant configuration", e), !Xa(e.environment))
      throw new rs(
        `Environment ${e.environment} for merchant token ${e.merchantToken} not supported`
      );
    const t = e.merchantToken, n = Mi(e), a = await fetch(n, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (!a.ok)
      throw new as(
        `Failed to fetch merchant configuration for merchant token ${t}`
      );
    const r = await a.json();
    return os(r);
  } catch (t) {
    return Z.warn(t), yt;
  }
}
const cs = `.skeleton__container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    rgba(221, 221, 221, 0.6) 25%,
    rgba(255, 255, 255, 0.6) 50%,
    #ddda 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.3s infinite linear;
  cursor: progress;
}
`;
var us = /* @__PURE__ */ C("<style>"), ds = /* @__PURE__ */ C("<div class=skeleton__container>"), ms = /* @__PURE__ */ C("<div role=alert aria-busy=true>");
const _s = (e) => {
  const t = de({
    width: "300px",
    height: "20px",
    className: "",
    borderRadius: "0.25rem",
    numberOfLines: 1
  }, e), n = N(() => Array.from({
    length: t.numberOfLines
  }, (a, r) => r + 1));
  return [(() => {
    var a = us();
    return g(a, cs), a;
  })(), (() => {
    var a = ds();
    return g(a, p(Te, {
      get each() {
        return n();
      },
      children: () => (() => {
        var r = ms();
        return U((i) => {
          var s = `skeleton ${t.className}`, o = t.width, l = t.height, c = t.borderRadius, u = t.height;
          return s !== i.e && z(r, i.e = s), o !== i.t && ((i.t = o) != null ? r.style.setProperty("width", o) : r.style.removeProperty("width")), l !== i.a && ((i.a = l) != null ? r.style.setProperty("height", l) : r.style.removeProperty("height")), c !== i.o && ((i.o = c) != null ? r.style.setProperty("border-radius", c) : r.style.removeProperty("border-radius")), u !== i.i && ((i.i = u) != null ? r.style.setProperty("min-height", u) : r.style.removeProperty("min-height")), i;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0
        }), r;
      })()
    })), a;
  })()];
}, Un = (e) => {
  const t = () => e.merchantToken ? {
    merchantToken: e.merchantToken,
    environment: e.environment
  } : (Z.warn("To show the widget properly, the merchant-token property is required."), null), [n] = ni(t, ls);
  return p(M, {
    get when() {
      return !n.loading;
    },
    get fallback() {
      return p(_s, {
        get numberOfLines() {
          return e.skeletonSize ?? 1;
        }
      });
    },
    get children() {
      return e.children(n() ?? yt);
    }
  });
}, dn = {
  [j.EN]: {
    // Product widget
    "product_widget:pay_in_3": 'Pay in 3 installments <span class="{{textStyle}}">of {{installmentAmount}}</span> with',
    "product_widget:pay_in_4": 'Pay in 4{{feeStar}} installments <span class="{{textStyle}}">of {{installmentAmount}}</span> with',
    "product_widget:pay_up_to_n_installments": 'Pay in up to {{installments}} installments <span class="{{textStyle}}">of {{installmentAmount}}</span> with',
    "product_widget:pay_in_3_pay_in_4": 'Pay in 3 or 4{{feeStar}} installments <span class="{{textStyle}}">of {{installmentAmount}}</span> with',
    "product_widget:pay_in_4_service_fee_single": "*A service fee of up to {{feeAmount}} may apply.",
    "product_widget:pay_in_4_service_fee_single_no_amount": "*A service fee may apply.",
    "product_widget:learn_more": "Learn more",
    "product_widget:no_interest": "Interest-free.",
    // Product widget no installments
    "product_widget:pay_in_3_no_installments": "Pay in 3 installments with",
    "product_widget:pay_in_3_pay_now_checkout_no_installments": "Pay in 3 installments with",
    "product_widget:pay_in_4_no_installments": "Pay in 4{{feeStar}} installments with",
    "product_widget:pay_in_4_pay_now_checkout_no_installments": "Pay in 4{{feeStar}} installments with",
    "product_widget:pay_in_3_pay_in_4_no_installments": "Pay in 3 or 4{{feeStar}} installments with",
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout_no_installments": "Pay in 3 or 4{{feeStar}} installments with",
    "product_widget:pay_now_checkout_no_installments": "Pay with",
    "product_widget:pay_up_to_n_installments_no_installments": "Pay in up to {{installments}} installments with",
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout": 'Pay in 3 or 4{{feeStar}} installments <strong class="{{textStyle}}">of {{installmentAmount}}</strong> with',
    "product_widget:pay_in_3_pay_now_checkout": 'Pay in 3 installments <strong class="{{textStyle}}">of {{installmentAmount}}</strong> with',
    "product_widget:pay_in_4_pay_now_checkout": 'Pay in 4{{feeStar}} installments <strong class="{{textStyle}}">of {{installmentAmount}}</strong> with',
    "product_widget:pay_in_3_pay_in_4_pay_later": 'Pay in 3 or 4 installments or later, starting from <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_3_pay_later": 'Pay in 3 installments or later, starting from <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_4_pay_later": 'Pay in 3 installments or later, starting from <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_now_checkout_pay_later": "Pay now or later",
    "product_widget:pay_in_3_pay_now_checkout_pay_later": 'Pay in 3 installments, starting from <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_4_pay_now_checkout_pay_later": 'Pay in 4 installments, starting from <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout_pay_later": 'Pay in 3 or 4 installments, starting from <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_now_checkout": "Pay with",
    "product_widget:pay_later": "Pay later",
    "product_widget:pay_in_x": '<span class="{{textStyle}}">Or</span> pay in up to <span class="{{textStyle}}">{{maxInstallments}} installments</span> with {{lenderName}}',
    "product_widget:pay_in_x_interest_free": '<span class="{{textStyle}}">Or</span> pay in up to <span class="{{textStyle}}">{{maxInstallments}} installments interest free</span> with {{lenderName}}',
    "product_widget:pay_in_x_only": 'Pay in <span class="{{textStyle}}">up to {{maxInstallments}} installments</span> with {{lenderName}}.',
    "product_widget:pay_in_x_only_interest_free": 'Pay in <span class="{{textStyle}}">up to {{maxInstallments}} installments interest free</span> with {{lenderName}}.',
    // Checkout widget
    "checkout_widget:pay_in_3": 'Pay in 3 installments of <span class="{{textStyle}}">{{installmentAmount}}</span> without interest.',
    "checkout_widget:pay_in_4": 'Pay in 4{{feeStar}} installments of <span class="{{textStyle}}">{{installmentAmount}}</span> without interest.',
    "checkout_widget:pay_now_checkout": "Fast checkout with your account.",
    "checkout_widget:pay_later": "Pay later without interest.",
    "checkout_widget:pay_in_x": 'Pay in up to <span class="{{textStyle}}">{{maxInstallments}} installments</span> with {{lenderName}}',
    "checkout_widget:pay_in_x_interest_free": 'Pay in up to <span class="{{textStyle}}">{{maxInstallments}} installments interest free</span> with {{lenderName}}',
    "checkout_widget:pay_in_x_only": 'Pay in <span class="{{textStyle}}">up to {{maxInstallments}} installments</span> with {{lenderName}}.',
    "checkout_widget:pay_in_x_only_interest_free": 'Pay in <span class="{{textStyle}}">up to {{maxInstallments}} installments interest free</span> with {{lenderName}}.',
    "checkout_widget:accepted_methods": "We accept all major payment methods, including prepaid cards.",
    "checkout_widget:pay_in_n_consumer_landing": 'Pay in {{installments}}* installments of <span class="{{textStyle}}">{{installmentAmount}}</span>.',
    "checkout_widget:pay_in_n_consumer_landing_tan_taeg": "*APR {{tan}}% & APRC {{taeg}}% apply",
    // Checkout widget no installments
    "checkout_widget:pay_in_3_no_installments": "Pay in 3 installments without interest.",
    "checkout_widget:pay_in_4_no_installments": "Pay in 4{{feeStar}} installments without interest.",
    // Checkout Title
    "checkout_title:pay_in_3": "Pay in 3 installments of {{installmentAmount}} with",
    "checkout_title:pay_in_4": "Pay in 4 installments of {{installmentAmount}} with",
    "checkout_title:pay_in_3_pay_in_4": "Pay in 3 or 4 installments of {{installmentAmount}} with",
    "checkout_title:pay_in_3_pay_in_4_pay_in_x": "Pay in 3 or 4, or up to {{maxInstallments}} installments with {{lenderName}}",
    "checkout_title:single_product": "Pay in {{installments}} installments of {{installmentAmount}} with",
    "checkout_title:pay_in_3_pay_in_x": "Pay in 3 or up to {{maxInstallments}} installments with {{lenderName}}",
    "checkout_title:pay_in_4_pay_in_x": "Pay in 4 or up to {{maxInstallments}} installments with {{lenderName}}",
    "checkout_title:pay_in_3_consumer_lending": "Pay in 3 or up to {{maxRate}} installments with",
    "checkout_title:pay_in_4_consumer_lending": "Pay in 4 or up to {{maxRate}} installments with",
    "checkout_title:pay_in_3_pay_in_4_consumer_lending": "Pay in 3 or 4, or up to {{maxRate}} installments with",
    "checkout_title:consumer_lending_only": "Pay up to {{maxRate}} installments with",
    "checkout_title:pay_now": "Pay now with Scalapay",
    //ProductWidget Exp5.10 specific translations
    "product_widget_exp5_10:from_x_in_n_installments": 'from <span class="{{textStyle}}">{{installmentAmount}}/month</span> in {{installments}} installments',
    "product_widget_exp5_10:pay_now": "pay now with Scalapay",
    "product_widget_exp5_10:pay_in_n_installments": 'pay in <span class="{{textStyle}}">{{installments}} installments</span>',
    "product_widget_exp5_10:pay_up_to_n_installments": 'pay in up to <span class="{{textStyle}}">{{installments}} installments</span>',
    "product_widget_exp5_10:sub_label_only_core_products": 'Add another {{differenceAmount}} to <span class="{{textStyle}}">pay in <span class="{{textStyleInner}}">{{installments}} installments</span></span>',
    "product_widget_exp5_10:sub_label_consumer_lending_products": "{{installments}} installments available from {{minAmount}} cart value",
    //CheckoutWidget Exp5.10 specific translations
    "checkout_widget_exp5_10:title_multiple_products": "Pay for your purchases in installments with maximum freedom,",
    "checkout_widget_exp5_10:title_single_product": "Pay for your purchases in {{installments}} installments with maximum freedom.",
    "checkout_widget_exp5_10:title_pay_now": 'Pay in full with Scalapay, the products you purchase are <span class="{{textStyle}}">covered by insurance</span>.',
    "checkout_widget_exp5_10:choose_installments": "choose between {{installmentList}} or {{maxInstallment}} installments.",
    "checkout_widget_exp5_10:choose_installments_pay_in_x": "choose between {{installmentList}}, or up to {{maxInstallment}} installments.",
    "checkout_widget_exp5_10:accepted_methods": "We accept all major payment methods:",
    "checkout_widget_exp5_10:card_list": "VISA, Mastercard and prepaid cards.",
    // Info card
    "product_widget:pay_in_n_label": "Pay in {{installments}} installments",
    "product_widget:pay_in_x_label": "Pay in up to {{maxInstallments}} installments",
    "product_widget:pay_now_checkout_label": "Pay in full",
    "product_widget:later_label": "Pay later",
    "summary_card:no_interest_info": "Interest-free",
    "how_to_card:information_1": '<strong class="text-black">Choose Scalapay</strong> at Checkout.',
    "how_to_card:information_2": '<strong class="text-black">Create an account in 2 mins</strong> and <strong class="text-black">enter a payment method. </strong>',
    "how_to_card:information_3:travel": "Pay only the first installment and confirm your reservation right away.",
    "how_to_card:information_4:travel": 'Enjoy your experience and <strong class="text-sp-exp5-black font-semibold">settle the remaining installments every 30 days*</strong>.',
    // Pay in X / Lending Info card
    "how_to_card:pay_in_x:description": 'Buy today and split the total in up to <strong class="text-black">{{maxInstallments}} installments</strong>.<br>A simple way to manage your purchases with <strong class="text-black">more freedom</strong>.<br>Financial solution offered by {{lenderName}}',
    "how_to_card:pay_in_x:title": "What will you need?",
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_1": '<strong class="text-black">ID document</strong> (Italian ID or EU driving license)',
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_2": '<strong class="text-black">Italian Fiscal Code card</strong> ("Tessera sanitaria")',
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_3": '<strong class="text-black">European IBAN</strong> registered to who is requests the loan',
    "how_to_card:pay_lending_or_in_x:bbva:information_1": '<strong class="text-black">ID document</strong> (DNI or TIE original and valid)',
    "how_to_card:pay_lending_or_in_x:bbva:information_2": '<strong class="text-black">Spanish IBAN</strong>: a bank account registered to who is requesting the loan',
    "info_card_lending:installments": "{{installments}} installments of {{installmentAmount}}",
    "info_card_lending:schedule": "Every 30 days, including interest",
    // Modal
    "modal:terms_and_conditions": 'Installments will be automatically charged to the payment method used. In some cases, the first installment may be higher than the remaining ones.<br/>See full T&Cs at <a class="underline decoration-solid underline-offset-[20%] decoration-[15%]" href="https://www.scalapay.com/?utm_source={{utmSource}}&utm_medium=referral&utm_campaign=link-widget" target="_blank">www.scalapay.com</a>.',
    "modal:installments_card_title": "How it works?",
    "modal:close_button": "Close",
    // Installment summary
    "installment_summary:total": '<span>Total:</span> <strong class="text-black">{{total}}</strong> <sup>{{asterisk}}</sup> <strong class="text-black">{{fee}}</strong> ',
    "installment_summary:pay_now": "Today",
    "installment_summary:days-prefix": "",
    "installment_summary:days": "days",
    "installment_summary:monthly_plural": "{{numberOfInstallments}} months",
    "installment_summary:weekly_plural": "{{numberOfInstallments}} weeks",
    "installment_summary:daily_plural": "{{numberOfInstallments}} days",
    "installment_summary:monthly_single": "month",
    "installment_summary:weekly_single": "week",
    "installment_summary:daily_single": "day",
    "installment_summary:service_fee": "* A service fee of up to {{fee}} may apply only on the first installment",
    // Interests disclaimer
    "card_summary:interests_disclaimer": "Interests rates apply",
    "card_summary:interests_disclaimer_free": "Interest free",
    // Learn more modal
    "learn_more_modal:title": "What you love in easy installments. Interest-free.",
    // Learn more modal 5.1
    "learn_more_modal_51:title": "Choose the installment",
    "learn_more_modal_51:instead_of": "Instead of",
    "learn_more_modal_51:pay_in_n": "Pay in {{count}}",
    "learn_more_modal_51:pay_in_full": "Pay in full",
    "learn_more_modal_51:available_above": "Available if your cart exceeds {{amount}}",
    "learn_more_modal_51:split_fee_first_installment": "{{amount}} only on first installment",
    "learn_more_modal_51:interest_amount": "{{amount}} of interest",
    "learn_more_modal_51:interests_disclaimer": "Interests rates apply",
    "learn_more_modal_51:tan_taeg_details": "APR {{tan}}% APRC {{taeg}}%",
    "learn_more_modal_51:in_partnership_with": "In partnership with",
    "learn_more_modal_51:interest_free": "Interest free",
    "learn_more_modal_51:see_more_info": "See more information",
    "learn_more_modal_51:installment_disclaimer": "*In some cases, installments may be shifted up to 30 days in the future.",
    "learn_more_modal_51:installments_card_title": "How does it work?",
    "learn_more_modal_51:how_to_1": "<strong class='text-sp-exp5-black font-semibold'>Select 'Scalapay'</strong> at checkout.",
    "learn_more_modal_51:how_to_2": '<strong class="text-sp-exp5-black font-semibold">Create an account in 2 minutes</strong> and link a payment method.',
    "learn_more_modal_51:how_to_3": "Pay only the first installment and receive your order immediately.",
    "learn_more_modal_51:how_to_3:travel": "Pay only the first installment and confirm your reservation right away.",
    "learn_more_modal_51:how_to_4": 'Enjoy your purchase and <strong class="text-sp-exp5-black font-semibold">pay the remaining installments every 30 days*</strong>.',
    "learn_more_modal_51:how_to_4:travel": 'Enjoy your experience and <strong class="text-sp-exp5-black font-semibold">settle the remaining installments every 30 days*</strong>.'
  },
  [j.IT]: {
    // Product widget
    "product_widget:pay_in_3": 'Paga in 3 rate <span class="{{textStyle}}">da {{installmentAmount}}</span> con',
    "product_widget:pay_in_4": 'Paga in 4{{feeStar}} rate <span class="{{textStyle}}">da {{installmentAmount}}</span> con',
    "product_widget:pay_up_to_n_installments": 'Paga fino a {{installments}} rate <span class="{{textStyle}}">da {{installmentAmount}}</span> con',
    "product_widget:pay_in_3_pay_in_4": 'Paga in 3 o 4{{feeStar}} rate <span class="{{textStyle}}">da {{installmentAmount}}</span> con',
    "product_widget:pay_in_4_service_fee_single": "*Si applica una commissione di servizio di {{feeAmount}}.",
    "product_widget:pay_in_4_service_fee_single_no_amount": "*Si applica una commissione di servizio.",
    "product_widget:learn_more": "Scopri di più",
    "product_widget:no_interest": "Senza interessi.",
    // Product widget no installments
    "product_widget:pay_in_3_no_installments": "Paga in 3 rate con",
    "product_widget:pay_in_3_pay_now_checkout_no_installments": "Paga in 3 rate con",
    "product_widget:pay_in_4_no_installments": "Paga in 4{{feeStar}} rate con",
    "product_widget:pay_in_4_pay_now_checkout_no_installments": "Paga in 4{{feeStar}} rate con",
    "product_widget:pay_in_3_pay_in_4_no_installments": "Paga in 3 o 4{{feeStar}} rate con",
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout_no_installments": "Paga in 3 o 4{{feeStar}} rate con",
    "product_widget:pay_now_checkout_no_installments": "Paga con",
    "product_widget:pay_up_to_n_installments_no_installments": "Paga fino a {{installments}} rate con",
    "product_widget:pay_now_checkout": "Paga con",
    "product_widget:pay_later": "Paga più tardi",
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout": 'Paga in 3 o 4{{feeStar}} rate <strong class="{{textStyle}}">da {{installmentAmount}}</strong> con',
    "product_widget:pay_in_3_pay_now_checkout": 'Paga in 3 rate <strong class="{{textStyle}}">da {{installmentAmount}}</strong> con',
    "product_widget:pay_in_4_pay_now_checkout": 'Paga in 4{{feeStar}} rate <strong class="{{textStyle}}">da {{installmentAmount}}</strong> con',
    "product_widget:pay_in_3_pay_in_4_pay_later": 'Paga in 3 o 4 rate, a partire da <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_3_pay_later": 'Paga in 3 rate, a partire da <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_4_pay_later": 'Paga in 4 rate, a partire da <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_now_checkout_pay_later": "Paga ora o più tardi",
    "product_widget:pay_in_3_pay_now_checkout_pay_later": 'Paga in 3 rate, a partire da <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_4_pay_now_checkout_pay_later": 'Paga in 4 rate, a partire da <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout_pay_later": 'Paga in 3 o 4 rate, a partire da <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_x": '<span class="{{textStyle}}">Oppure</span> paga fino a <span class="{{textStyle}}">{{maxInstallments}} rate</span> con {{lenderName}}',
    "product_widget:pay_in_x_interest_free": '<span class="{{textStyle}}">Oppure</span> paga fino a <span class="{{textStyle}}">{{maxInstallments}} rate</span> a <span class="{{textStyle}}">tasso zero</span> con {{lenderName}}',
    "product_widget:pay_in_x_only": 'Paga <span class="{{textStyle}}">fino a {{maxInstallments}} rate</span> con {{lenderName}}.',
    "product_widget:pay_in_x_only_interest_free": 'Paga <span class="{{textStyle}}">fino a {{maxInstallments}} installments</span> a <span class="{{textStyle}}">tasso zero</span> con {{lenderName}}.',
    // Checkout widget
    "checkout_widget:pay_in_3": "Paga in 3 rate da <span class='{{textStyle}}'>{{installmentAmount}}</span> senza interessi.",
    "checkout_widget:pay_in_4": "Paga in 4{{feeStar}} rate da <span class='{{textStyle}}'>{{installmentAmount}}</span> senza interessi.",
    "checkout_widget:pay_now_checkout": "Pagamento rapido con il tuo account.",
    "checkout_widget:pay_later": "Paga dopo senza interessi.",
    "checkout_widget:pay_in_x": 'Paga fino a <span class="{{textStyle}}">{{maxInstallments}} rate</span> con {{lenderName}}',
    "checkout_widget:pay_in_x_interest_free": 'Paga fino a <span class="{{textStyle}}">{{maxInstallments}} rate</span> a <span class="{{textStyle}}">tasso zero</span> con {{lenderName}}',
    "checkout_widget:pay_in_x_only": 'Paga <span class="{{textStyle}}">fino a {{maxInstallments}} rate</span> con {{lenderName}}.',
    "checkout_widget:pay_in_x_only_interest_free": 'Paga <span class="{{textStyle}}">fino a {{maxInstallments}} installments</span> a <span class="{{textStyle}}">tasso zero</span> con {{lenderName}}.',
    "checkout_widget:accepted_methods": "Accettiamo tutti i principali metodi di pagamento, incluse le carte prepagate.",
    "checkout_widget:pay_in_n_consumer_landing": 'Paga in {{installments}}* rate da <span class="{{textStyle}}">{{installmentAmount}}</span>.',
    "checkout_widget:pay_in_n_consumer_landing_tan_taeg": "*Si applicano TAN {{tan}}% & TAEG {{taeg}}%",
    // Checkout widget no installments
    "checkout_widget:pay_in_3_no_installments": "Paga in 3 rate senza interessi.",
    "checkout_widget:pay_in_4_no_installments": "Paga in 4{{feeStar}} rate senza interessi.",
    // Checkout Title
    "checkout_title:pay_in_3": "Paga in 3 rate da {{installmentAmount}} con",
    "checkout_title:pay_in_4": "Paga in 4 rate da {{installmentAmount}} con",
    "checkout_title:pay_in_3_pay_in_4": "Paga in 3 o 4 rate da {{installmentAmount}} con",
    "checkout_title:pay_in_3_pay_in_4_pay_in_x": "Paga in 3 o 4 o fino a {{maxInstallments}} rate con {{lenderName}}",
    "checkout_title:single_product": "Paga in {{installments}} rate da {{installmentAmount}} con",
    "checkout_title:pay_in_3_pay_in_x": "Paga in 3 o fino a {{maxInstallments}} rate con {{lenderName}}",
    "checkout_title:pay_in_4_pay_in_x": "Paga in 4 o fino a {{maxInstallments}} rate con {{lenderName}}",
    "checkout_title:pay_in_3_consumer_lending": "Paga in 3 o fino a {{maxRate}} rate con",
    "checkout_title:pay_in_4_consumer_lending": "Paga in 4 o fino a {{maxRate}} rate con",
    "checkout_title:pay_in_3_pay_in_4_consumer_lending": "Paga in 3 o 4 o fino a {{maxRate}} rate con",
    "checkout_title:consumer_lending_only": "Paga fino a {{maxRate}} rate con",
    "checkout_title:pay_now": "Paga con Scalapay",
    //ProductWidget Exp5.10 specific translations
    "product_widget_exp5_10:from_x_in_n_installments": 'da <span class="{{textStyle}}">{{installmentAmount}}/mese</span> in {{installments}} rate',
    "product_widget_exp5_10:pay_now": "paga con Scalapay",
    "product_widget_exp5_10:pay_in_n_installments": 'paga in <span class="{{textStyle}}">{{installments}} rate</span>',
    "product_widget_exp5_10:pay_up_to_n_installments": 'paga fino a <span class="{{textStyle}}">{{installments}} rate</span>',
    "product_widget_exp5_10:sub_label_only_core_products": 'Aggiungi altri {{differenceAmount}} per <span class="{{textStyle}}">pagare in <span class="{{textStyleInner}}">{{installments}} rate</span></span>',
    "product_widget_exp5_10:sub_label_consumer_lending_products": "{{installments}} rate disponibile da {{minAmount}} di carrello",
    //CheckoutWidget Exp5.10 specific translations
    "checkout_widget_exp5_10:title_multiple_products": "Paga i tuoi acquisti a rate con la massima libertà,",
    "checkout_widget_exp5_10:title_single_product": "Paga i tuoi acquisti in {{installments}} rate con la massima libertà.",
    "checkout_widget_exp5_10:title_pay_now": 'Paga per intero con Scalapay, i prodotti che acquisti sono <span class="{{textStyle}}">protetti da assicurazione</span>.',
    "checkout_widget_exp5_10:choose_installments": "scegli tra {{installmentList}} o {{maxInstallment}} rate.",
    "checkout_widget_exp5_10:choose_installments_pay_in_x": "scegli tra {{installmentList}}, o fino a {{maxInstallment}} rate.",
    "checkout_widget_exp5_10:accepted_methods": "Accettiamo tutti i maggiori metodi di pagamento:",
    "checkout_widget_exp5_10:card_list": "VISA, Mastercard, PostePay e prepagate.",
    // Info card
    "product_widget:pay_in_n_label": "Paga in {{installments}} rate",
    "product_widget:pay_in_x_label": "Paga fino a {{maxInstallments}} rate",
    "product_widget:pay_now_checkout_label": "Paga per intero",
    "product_widget:later_label": "Paga dopo",
    "summary_card:no_interest_info": "Zero interessi",
    "how_to_card:information_1": "<strong class='text-black'>Scegli Scalapay</strong> al momento del checkout.",
    "how_to_card:information_2": "<strong class='text-black'>Crea un account in 2 minuti</strong> e <strong class='text-black'>aggiungi un metodo di pagamento.</strong>",
    "how_to_card:information_3:travel": "Paga solo la prima rata e conferma subito la tua prenotazione.",
    "how_to_card:information_4:travel": 'Goditi la tua esperienza e <strong class="text-sp-exp5-black font-semibold">salda le restanti rate ogni 30 giorni*</strong>.',
    // Pay in X / Lending Info card
    "how_to_card:pay_in_x:description": 'Acquista oggi e suddividi il totale fino a <strong class="text-black">{{maxInstallments}} rate mensili.</strong><br>Un modo semplice per gestire i tuoi acquisti con <strong class="text-black">più libertà</strong>.<br>Soluzione finanziaria offerta da {{lenderName}}',
    "how_to_card:pay_in_x:title": "Cosa ti servirà?",
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_1": `<strong class="text-black">Documento di identità</strong> (carta d'identità elettronica o patente)`,
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_2": '<strong class="text-black">Tessera sanitaria</strong>',
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_3": '<strong class="text-black">IBAN italiano</strong> o <strong class="text-black">europeo</strong> intestato a chi richiede il finanziamento',
    "how_to_card:pay_lending_or_in_x:bbva:information_1": '<strong class="text-black">Documento di identità</strong> (DNI o TIE originale e valida)',
    "how_to_card:pay_lending_or_in_x:bbva:information_2": '<strong class="text-black">IBAN spagnolo</strong>: un conto intestato a chi richiede il finanziamento',
    "info_card_lending:installments": "{{installments}} rate da {{installmentAmount}}",
    "info_card_lending:schedule": "Ogni 30 giorni, interessi inclusi",
    // Modal
    "modal:terms_and_conditions": 'Le rate verranno addebitate automaticamente sul metodo di pagamento utilizzato. In alcuni casi, la prima rata potrebbe essere superiore alle restanti.<br/>Leggi tutti i Termini e Condizioni su <a class="underline decoration-solid underline-offset-[20%] decoration-[15%]" href="https://www.scalapay.com/?utm_source={{utmSource}}&utm_medium=referral&utm_campaign=link-widget" target="_blank">www.scalapay.com</a>.',
    "modal:installments_card_title": "Come funziona?",
    "modal:close_button": "Chiudi",
    // Installment summary
    "installment_summary:total": "<span>Totale:</span> <strong class='text-black'>{{total}}</strong> <sup>{{asterisk}}</sup> <strong class='text-black'>{{fee}}</strong>",
    "installment_summary:pay_now": "Oggi",
    "installment_summary:days-prefix": "",
    "installment_summary:days": "giorni",
    "installment_summary:monthly_plural": "{{numberOfInstallments}} mesi",
    "installment_summary:weekly_plural": "{{numberOfInstallments}} settimane",
    "installment_summary:daily_plural": "{{numberOfInstallments}} giorni",
    "installment_summary:monthly_single": "mese",
    "installment_summary:weekly_single": "settimana",
    "installment_summary:daily_single": "giorno",
    "installment_summary:service_fee": "* Si applica una commissione di {{fee}} solo sulla prima rata",
    // Interests disclaimer
    "card_summary:interests_disclaimer": "Si applicano TAN e TAEG",
    "card_summary:interests_disclaimer_free": "A Tasso Zero",
    // Learn more modal
    "learn_more_modal:title": "Quello che ami in comode rate. Senza interessi.",
    // Learn more modal 5.1
    "learn_more_modal_51:title": "Scegli la rata",
    "learn_more_modal_51:instead_of": "Invece di",
    "learn_more_modal_51:pay_in_n": "Paga in {{count}}",
    "learn_more_modal_51:pay_in_full": "Paga per intero",
    "learn_more_modal_51:available_above": "Disponibile se il tuo carrello supera i {{amount}}",
    "learn_more_modal_51:split_fee_first_installment": "{{amount}} solo su prima rata",
    "learn_more_modal_51:interest_amount": "{{amount}} di interessi",
    "learn_more_modal_51:interests_disclaimer": "Si applicano TAN e TAEG",
    "learn_more_modal_51:tan_taeg_details": "TAN {{tan}}% TAEG {{taeg}}%",
    "learn_more_modal_51:in_partnership_with": "In partnership con",
    "learn_more_modal_51:interest_free": "A Tasso Zero",
    "learn_more_modal_51:see_more_info": "Vedi più informazioni",
    "learn_more_modal_51:installment_disclaimer": "*In alcuni casi le rate possono essere spostate fino a 30 giorni nel futuro.",
    "learn_more_modal_51:installments_card_title": "Come funziona?",
    "learn_more_modal_51:how_to_1": "<strong class='text-sp-exp5-black font-semibold'>Seleziona 'Scalapay'</strong> al checkout.",
    "learn_more_modal_51:how_to_2": '<strong class="text-sp-exp5-black font-semibold">Crea un account in 2 minuti</strong> e collega un metodo di pagamento.',
    "learn_more_modal_51:how_to_3": "Paga solo la prima rata e ricevi subito il tuo ordine.",
    "learn_more_modal_51:how_to_3:travel": "Paga solo la prima rata e conferma subito la tua prenotazione.",
    "learn_more_modal_51:how_to_4": 'Goditi il tuo acquisto e <strong class="text-sp-exp5-black font-semibold">salda le restanti rate ogni 30 giorni*</strong>.',
    "learn_more_modal_51:how_to_4:travel": 'Goditi la tua esperienza e <strong class="text-sp-exp5-black font-semibold">salda le restanti rate ogni 30 giorni*</strong>.'
  },
  [j.PT]: {
    // Product widget
    "product_widget:pay_in_3": 'Paga em 3 prestações <span class="{{textStyle}}">de {{installmentAmount}}</span> com',
    "product_widget:pay_in_4": 'Paga em 4 prestações <span class="{{textStyle}}">de {{installmentAmount}}</span> com',
    "product_widget:pay_up_to_n_installments": 'Paga até {{installments}} prestações <span class="{{textStyle}}">de {{installmentAmount}}</span> com',
    "product_widget:pay_in_3_pay_in_4": 'Paga em 3 ou 4 prestações <span class="{{textStyle}}">de {{installmentAmount}}</span> com',
    "product_widget:pay_in_4_service_fee_single": "",
    "product_widget:pay_in_4_service_fee_single_no_amount": "",
    "product_widget:learn_more": "Saber mais",
    "product_widget:no_interest": "Sem juros.",
    // Product widget no installments
    "product_widget:pay_in_3_no_installments": "Paga em 3 prestações com",
    "product_widget:pay_in_3_pay_now_checkout_no_installments": "Paga em 3 prestações com",
    "product_widget:pay_in_4_no_installments": "Paga em 4{{feeStar}} prestações com",
    "product_widget:pay_in_4_pay_now_checkout_no_installments": "Paga em 4{{feeStar}} prestações com",
    "product_widget:pay_in_3_pay_in_4_no_installments": "Paga em 3 ou 4{{feeStar}} prestações com",
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout_no_installments": "Paga em 3 ou 4{{feeStar}} prestações com",
    "product_widget:pay_now_checkout_no_installments": "Paga com",
    "product_widget:pay_up_to_n_installments_no_installments": "Paga até {{installments}} prestações com",
    "product_widget:pay_now_checkout": "Paga com",
    "product_widget:pay_later": "Paga depois",
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout": 'Paga em 3 ou 4{{feeStar}} prestações <strong class="{{textStyle}}">de {{installmentAmount}}</strong> com',
    "product_widget:pay_in_3_pay_now_checkout": 'Paga em 3 prestações <strong class="{{textStyle}}">de {{installmentAmount}}</strong> com',
    "product_widget:pay_in_4_pay_now_checkout": 'Paga em 4{{feeStar}} prestações <strong class="{{textStyle}}">de {{installmentAmount}}</strong> com',
    "product_widget:pay_in_3_pay_in_4_pay_later": 'Paga em 3 ou 4 prestações, a partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_3_pay_later": 'Paga em 3 prestações, a partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_4_pay_later": 'Paga em 4 prestações, a partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_now_checkout_pay_later": "Paga agora ou depois",
    "product_widget:pay_in_3_pay_now_checkout_pay_later": 'Paga em 3 prestações, a partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_4_pay_now_checkout_pay_later": 'Paga em 4 prestações, a partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout_pay_later": 'Paga em 3 ou 4 prestações, a partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_x": '<span class="{{textStyle}}">Ou</span> paga até <span class="{{textStyle}}">{{maxInstallments}} prestações</span> com {{lenderName}}',
    "product_widget:pay_in_x_interest_free": '<span class="{{textStyle}}">Ou</span> paga até <span class="{{textStyle}}">{{maxInstallments}} prestações sem juros</span> com {{lenderName}}',
    "product_widget:pay_in_x_only": 'Paga <span class="{{textStyle}}">até {{maxInstallments}} prestações</span> com {{lenderName}}.',
    "product_widget:pay_in_x_only_interest_free": 'Paga <span class="{{textStyle}}">até {{maxInstallments}} prestações sem juros</span> com {{lenderName}}.',
    // Checkout widget
    "checkout_widget:pay_in_3": "Paga em 3 prestações de <span class='{{textStyle}}'>{{installmentAmount}}</span> sem juros.",
    "checkout_widget:pay_in_4": "Paga em 4 prestações de <span class='{{textStyle}}'>{{installmentAmount}}</span> sem juros.",
    "checkout_widget:pay_now_checkout": "Checkout rápido com a tua conta.",
    "checkout_widget:pay_later": "Paga depois sem juros.",
    "checkout_widget:pay_in_x": 'Paga até <span class="{{textStyle}}">{{maxInstallments}} prestações</span> com {{lenderName}}',
    "checkout_widget:pay_in_x_interest_free": 'Paga até <span class="{{textStyle}}">{{maxInstallments}} prestações sem juros</span> com {{lenderName}}',
    "checkout_widget:pay_in_x_only": 'Paga <span class="{{textStyle}}">até {{maxInstallments}} prestações</span> com {{lenderName}}.',
    "checkout_widget:pay_in_x_only_interest_free": 'Paga <span class="{{textStyle}}">até {{maxInstallments}} prestações sem juros</span> com {{lenderName}}.',
    "checkout_widget:accepted_methods": "Aceitamos todos os principais métodos de pagamento.",
    "checkout_widget:pay_in_n_consumer_landing": 'Paga em {{installments}}* prestações de <span class="{{textStyle}}">{{installmentAmount}}</span>.',
    "checkout_widget:pay_in_n_consumer_landing_tan_taeg": "*TAN {{tan}}% & TAEG {{taeg}}%",
    // Checkout widget no installments
    "checkout_widget:pay_in_3_no_installments": "Paga em 3 prestações sem juros.",
    "checkout_widget:pay_in_4_no_installments": "Paga em 4 prestações sem juros.",
    // Checkout Title
    "checkout_title:pay_in_3": "Paga em 3 prestações de {{installmentAmount}} com",
    "checkout_title:pay_in_4": "Paga em 4 prestações de {{installmentAmount}} com",
    "checkout_title:pay_in_3_pay_in_4": "Paga em 3 ou 4 prestações de {{installmentAmount}} com",
    "checkout_title:pay_in_3_pay_in_4_pay_in_x": "Paga em 3 ou 4 ou até {{maxInstallments}} prestações com {{lenderName}}",
    "checkout_title:single_product": "Paga em {{installments}} prestações de {{installmentAmount}} com",
    "checkout_title:pay_in_3_pay_in_x": "Paga em 3 ou até {{maxInstallments}} prestações com {{lenderName}}",
    "checkout_title:pay_in_4_pay_in_x": "Paga em 4 ou até {{maxInstallments}} prestações com {{lenderName}}",
    "checkout_title:pay_in_3_consumer_lending": "Paga em 3 ou até {{maxRate}} prestações com",
    "checkout_title:pay_in_4_consumer_lending": "Paga em 4 ou até {{maxRate}} prestações com",
    "checkout_title:pay_in_3_pay_in_4_consumer_lending": "Paga em 3 ou 4 prestações ou até {{maxRate}} prestações com",
    "checkout_title:consumer_lending_only": "Paga até {{maxRate}} prestações com",
    "checkout_title:pay_now": "Paga com Scalapay",
    //ProductWidget Exp5.10 specific translations
    "product_widget_exp5_10:from_x_in_n_installments": 'a partir de <span class="{{textStyle}}">{{installmentAmount}}/mês</span> em {{installments}} prestações',
    "product_widget_exp5_10:pay_now": "paga com Scalapay",
    "product_widget_exp5_10:pay_in_n_installments": 'paga em <span class="{{textStyle}}">{{installments}} prestações</span>',
    "product_widget_exp5_10:pay_up_to_n_installments": 'paga até <span class="{{textStyle}}">{{installments}} prestações</span>',
    "product_widget_exp5_10:sub_label_only_core_products": 'Adicione mais {{differenceAmount}} para <span class="{{textStyle}}">pagar em <span class="{{textStyleInner}}">{{installments}} prestações</span></span>',
    "product_widget_exp5_10:sub_label_consumer_lending_products": "{{installments}} prestações disponíveis a partir de {{minAmount}} de carrinho de compras",
    //CheckoutWidget Exp5.10 specific translations
    "checkout_widget_exp5_10:title_multiple_products": "Paga as tuas compras em prestações com total liberdade,",
    "checkout_widget_exp5_10:title_single_product": "Paga as tuas compras em {{installments}} prestações com total liberdade.",
    "checkout_widget_exp5_10:title_pay_now": 'Paga na totalidade com a Scalapay, os produtos que compras estão <span class="{{textStyle}}">cobertos por seguro</span>.',
    "checkout_widget_exp5_10:choose_installments": "escolhe entre {{installmentList}} ou {{maxInstallment}} prestações.",
    "checkout_widget_exp5_10:choose_installments_pay_in_x": "escolhe entre {{installmentList}}, ou até {{maxInstallment}} prestações.",
    "checkout_widget_exp5_10:accepted_methods": "Aceitamos todos os principais métodos de pagamento:",
    "checkout_widget_exp5_10:card_list": "VISA, Mastercard e cartões pré-pagos.",
    // Info card
    "product_widget:pay_in_n_label": "Paga em {{installments}} prestações",
    "product_widget:pay_in_x_label": "Paga até {{maxInstallments}} prestações",
    "product_widget:pay_now_checkout_label": "Paga na totalidade",
    "product_widget:later_label": "Paga depois",
    "summary_card:no_interest_info": "Sem juros",
    "how_to_card:information_1": "<strong class='text-black'>No momento do pagamento</strong>, seleciona a Scalapay.",
    "how_to_card:information_2": "<strong class='text-black'>Cria uma conta em 2 minutos</strong> e <strong class='text-black'>adiciona um cartão bancário.</strong>",
    "how_to_card:information_3:travel": "Paga apenas a primeira prestação e confirme a tua reserva imediatamente.",
    "how_to_card:information_4:travel": 'Aproveita a tua experiência e <strong class="text-sp-exp5-black font-semibold">paga as restantes prestações a cada 30 dias*</strong>.',
    // Pay in X / Lending Info card
    "how_to_card:pay_in_x:description": 'Compre hoje e divida o total em até <strong class="text-black">{{maxInstallments}} prestações.</strong><br>Uma maneira simples de gerir as suas compras com <strong class="text-black">mais liberdade</strong>.<br>Solução financeira oferecida por {{lenderName}}',
    "how_to_card:pay_in_x:title": "O que vais precisar?",
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_1": '<strong class="text-black">Documento de identificação</strong> (Identiciação italiana ou Carta de Conduzir italiana)',
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_2": '<strong class="text-black">Código Fiscal Italiano</strong> ("NIF" italiano)',
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_3": '<strong class="text-black">IBAN europeu</strong> registado no nome do solicitante',
    "how_to_card:pay_lending_or_in_x:bbva:information_1": '<strong class="text-black">Documento de identificação</strong> (DNI ou TIE original e válido)',
    "how_to_card:pay_lending_or_in_x:bbva:information_2": '<strong class="text-black">IBAN espanhol</strong>: uma conta bancária registada em nome da pessoa que solicita o empréstimo',
    "info_card_lending:installments": "{{installments}} prestações de {{installmentAmount}}",
    "info_card_lending:schedule": "A cada 30 dias, incluindo juros",
    // Modal
    "modal:terms_and_conditions": 'As prestações serão cobradas automaticamente de acordo com o cartão bancário utilizado. Em alguns casos, a primeira prestação pode ser superior às restantes.<br/>Consulta os T&Cs completos em <a class="underline decoration-solid underline-offset-[20%] decoration-[15%]" href="https://www.scalapay.com/?utm_source={{utmSource}}&utm_medium=referral&utm_campaign=link-widget" target="_blank">www.scalapay.com</a>.',
    "modal:installments_card_title": "Como funciona?",
    "modal:close_button": "Fechar",
    // Installment summary
    "installment_summary:total": "<span>Total:</span> <strong class='text-black'>{{total}}</strong> <sup>{{asterisk}}</sup> <strong class='text-black'>{{fee}}</strong>",
    "installment_summary:pay_now": "Hoje",
    "installment_summary:days-prefix": "Em",
    "installment_summary:days": "dias",
    "installment_summary:monthly_plural": "{{numberOfInstallments}} meses",
    "installment_summary:weekly_plural": "{{numberOfInstallments}} semanas",
    "installment_summary:daily_plural": "{{numberOfInstallments}} dias",
    "installment_summary:monthly_single": "mês",
    "installment_summary:weekly_single": "semana",
    "installment_summary:daily_single": "dia",
    "installment_summary:service_fee": "",
    // Interests disclaimer
    "card_summary:interests_disclaimer": "Aplicam-se taxas de juros",
    "card_summary:interests_disclaimer_free": "Sem Juros",
    // Learn more modal
    "learn_more_modal:title": "As tuas compras em prestações simples. Sem juros.",
    // Learn more modal 5.1
    "learn_more_modal_51:title": "Escolhe a prestação",
    "learn_more_modal_51:instead_of": "Em vez de",
    "learn_more_modal_51:pay_in_n": "Paga em {{count}}",
    "learn_more_modal_51:pay_in_full": "Paga na totalidade",
    "learn_more_modal_51:available_above": "Disponível se o teu carrinho ultrapassar {{amount}}",
    "learn_more_modal_51:split_fee_first_installment": "{{amount}} apenas na primeira prestação",
    "learn_more_modal_51:interest_amount": "{{amount}} de juros",
    "learn_more_modal_51:interests_disclaimer": "Aplicam-se taxas de juros",
    "learn_more_modal_51:tan_taeg_details": "TAN {{tan}}% TAEG {{taeg}}%",
    "learn_more_modal_51:interest_free": "Sem Juros",
    "learn_more_modal_51:in_partnership_with": "Em parceria com",
    "learn_more_modal_51:see_more_info": "Ver mais informações",
    "learn_more_modal_51:installment_disclaimer": "Aproveita a tua compra e paga as restantes prestações a cada 30 dias*.",
    "learn_more_modal_51:installments_card_title": "Como funciona?",
    "learn_more_modal_51:how_to_1": "<strong class='text-sp-exp5-black font-semibold'>Seleciona 'Scalapay'</strong> no momento do pagamento.",
    "learn_more_modal_51:how_to_2": '<strong class="text-sp-exp5-black font-semibold">Cria uma conta em 2 minutos</strong> e associa um cartão bancário.',
    "learn_more_modal_51:how_to_3": "Paga apenas a primeira prestação e recebe a tua encomenda imediatamente.",
    "learn_more_modal_51:how_to_3:travel": "Paga apenas a primeira prestação e confirme a tua reserva imediatamente.",
    "learn_more_modal_51:how_to_4": 'Aproveita a tua compra e <strong class="text-sp-exp5-black font-semibold">paga as prestações restantes a cada 30 dias*</strong>.',
    "learn_more_modal_51:how_to_4:travel": 'Aproveita a tua experiência e <strong class="text-sp-exp5-black font-semibold">paga as restantes prestações a cada 30 dias*</strong>.'
  },
  [j.DE]: {
    // Product widget
    "product_widget:pay_in_3": 'Zahle in 3 bequemen Raten <span class="{{textStyle}}">à {{installmentAmount}}</span> mit',
    "product_widget:pay_in_4": 'Zahle in 4 bequemen Raten <span class="{{textStyle}}">à {{installmentAmount}}</span> mit',
    "product_widget:pay_up_to_n_installments": 'Zahle in bis zu {{installments}} Raten <span class="{{textStyle}}">à {{installmentAmount}}</span> mit',
    "product_widget:pay_in_3_pay_in_4": 'Zahle in 3 oder 4 Raten <span class="{{textStyle}}">à {{installmentAmount}}</span> mit',
    "product_widget:pay_in_4_service_fee_single": "",
    "product_widget:pay_in_4_service_fee_single_no_amount": "",
    "product_widget:learn_more": "Mehr erfahren",
    "product_widget:no_interest": "Zinsfrei.",
    // Product widget no installments
    "product_widget:pay_in_3_no_installments": "Zahle in 3 bequemen Raten mit",
    "product_widget:pay_in_3_pay_now_checkout_no_installments": "Zahle in 3 bequemen Raten mit",
    "product_widget:pay_in_4_no_installments": "Zahle in 4{{feeStar}} bequemen Raten mit",
    "product_widget:pay_in_4_pay_now_checkout_no_installments": "Zahle in 4{{feeStar}} bequemen Raten mit",
    "product_widget:pay_in_3_pay_in_4_no_installments": "Zahle in 3 oder 4{{feeStar}} Raten mit",
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout_no_installments": "Zahle in 3 oder 4{{feeStar}} Raten mit",
    "product_widget:pay_now_checkout_no_installments": "Zahle mit",
    "product_widget:pay_up_to_n_installments_no_installments": "Zahle in bis zu {{installments}} Raten mit",
    "product_widget:pay_now_checkout": "Zahle mit",
    "product_widget:pay_later": "Später bezahlen",
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout": 'Zahle in 3 oder 4{{feeStar}} Raten <strong class="{{textStyle}}">à {{installmentAmount}}</strong> mit',
    "product_widget:pay_in_3_pay_now_checkout": 'Zahle in 3 Raten <strong class="{{textStyle}}">à {{installmentAmount}}</strong> mit',
    "product_widget:pay_in_4_pay_now_checkout": 'Zahle in 4{{feeStar}} Raten <strong class="{{textStyle}}">à {{installmentAmount}}</strong> mit',
    "product_widget:pay_in_3_pay_in_4_pay_later": 'Zahlen Sie in 3 oder 4 Raten, beginnend ab <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_3_pay_later": 'Zahlen Sie in 3 Raten, beginnend ab <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_4_pay_later": 'Zahlen Sie in 4 Raten, beginnend ab <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_now_checkout_pay_later": "Jetzt oder später bezahlen",
    "product_widget:pay_in_3_pay_now_checkout_pay_later": 'Zahlen Sie in 3 Raten, beginnend ab <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_4_pay_now_checkout_pay_later": 'Zahlen Sie in 4 Raten, beginnend ab <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout_pay_later": 'Zahlen Sie in 3 oder 4 Raten, beginnend ab <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_x": '<span class="{{textStyle}}">Oder</span> zahle in bis zu <span class="{{textStyle}}">{{maxInstallments}} Raten</span> mit {{lenderName}}',
    "product_widget:pay_in_x_interest_free": '<span class="{{textStyle}}">Oder</span> zahle in bis zu <span class="{{textStyle}}">{{maxInstallments}} Raten zinsfrei</span> mit {{lenderName}}',
    "product_widget:pay_in_x_only": 'Zahle in <span class="{{textStyle}}">bis zu {{maxInstallments}} Raten</span> mit {{lenderName}}.',
    "product_widget:pay_in_x_only_interest_free": 'Zahle in <span class="{{textStyle}}">bis zu {{maxInstallments}} Raten zinsfrei</span> mit {{lenderName}}.',
    // Checkout widget
    "checkout_widget:pay_in_3": "Zahle in 3 Raten von <span class='{{textStyle}}'>{{installmentAmount}}</span> zinsfrei.",
    "checkout_widget:pay_in_4": "Zahle in 4 Raten von <span class='{{textStyle}}'>{{installmentAmount}}</span> zinsfrei.",
    "checkout_widget:pay_now_checkout": "Schneller Checkout mit deinem Konto.",
    "checkout_widget:pay_later": "Später zahlen ohne Zinsen.",
    "checkout_widget:pay_in_x": 'Zahle in bis zu <span class="{{textStyle}}">{{maxInstallments}} Raten</span> mit {{lenderName}}',
    "checkout_widget:pay_in_x_interest_free": 'Zahle in bis zu <span class="{{textStyle}}">{{maxInstallments}} Raten zinsfrei</span> mit {{lenderName}}',
    "checkout_widget:pay_in_x_only": 'Zahle in <span class="{{textStyle}}">bis zu {{maxInstallments}} Raten</span> mit {{lenderName}}.',
    "checkout_widget:pay_in_x_only_interest_free": 'Zahle in <span class="{{textStyle}}">bis zu {{maxInstallments}} Raten zinsfrei</span> mit {{lenderName}}.',
    "checkout_widget:accepted_methods": "Wir akzeptieren alle gängigen Zahlungsmethoden, einschließlich Prepaid-Karten.",
    "checkout_widget:pay_in_n_consumer_landing": 'Zahle in {{installments}}* bequemen Raten à <span class="{{textStyle}}">{{installmentAmount}}</span>.',
    "checkout_widget:pay_in_n_consumer_landing_tan_taeg": "*Sollzins {{tan}}% & Effektivzins {{taeg}}%",
    // Checkout widget no installments
    "checkout_widget:pay_in_3_no_installments": "Zahle in 3 Raten zinsfrei.",
    "checkout_widget:pay_in_4_no_installments": "Zahle in 4 Raten zinsfrei.",
    // Checkout Title
    "checkout_title:pay_in_3": "Zahle in 3 bequemen Raten à {{installmentAmount}} mit",
    "checkout_title:pay_in_4": "Zahle in 4 bequemen Raten à {{installmentAmount}} mit",
    "checkout_title:pay_in_3_pay_in_4": "Zahle in 3 oder 4 bequemen Raten à {{installmentAmount}} mit",
    "checkout_title:pay_in_3_pay_in_4_pay_in_x": "Zahle in 3 oder 4 oder zahle in bis zu {{maxInstallments}} Raten mit {{lenderName}}",
    "checkout_title:single_product": "Zahle in {{installments}} bequemen Raten à {{installmentAmount}} mit",
    "checkout_title:pay_in_3_pay_in_x": "Zahle in 3 oder zahle in bis zu {{maxInstallments}} Raten mit {{lenderName}}",
    "checkout_title:pay_in_4_pay_in_x": "Zahle in 4 oder zahle in bis zu {{maxInstallments}} Raten mit {{lenderName}}",
    "checkout_title:pay_in_3_consumer_lending": "Zahle in 3 oder zahle in bis zu {{maxRate}} Raten mit",
    "checkout_title:pay_in_4_consumer_lending": "Zahle in 4 oder zahle in bis zu {{maxRate}} Raten mit",
    "checkout_title:pay_in_3_pay_in_4_consumer_lending": "Zahle in 3 oder 4 oder zahle in bis zu {{maxRate}} Raten mit",
    "checkout_title:consumer_lending_only": "Zahle in bis zu {{maxRate}} Raten mit",
    "checkout_title:pay_now": "Zahle mit Scalapay",
    //ProductWidget Exp5.10 specific translations
    "product_widget_exp5_10:from_x_in_n_installments": 'ab <span class="{{textStyle}}">{{installmentAmount}}/monat</span> in {{installments}} raten',
    "product_widget_exp5_10:pay_now": "zahle mit Scalapay",
    "product_widget_exp5_10:pay_in_n_installments": 'zahle in <span class="{{textStyle}}">{{installments}} raten</span>',
    "product_widget_exp5_10:pay_up_to_n_installments": 'zahle in bis zu <span class="{{textStyle}}">{{installments}} raten</span>',
    "product_widget_exp5_10:sub_label_only_core_products": 'Füge weitere {{differenceAmount}} hinzu, um in <span class="{{textStyle}}"><span class="{{textStyleInner}}">{{installments}} Raten</span>zu bezahlen</span>',
    "product_widget_exp5_10:sub_label_consumer_lending_products": "{{installments}} Raten verfügbar ab {{minAmount}} Einkaufswert",
    //CheckoutWidget Exp5.10 specific translations
    "checkout_widget_exp5_10:title_multiple_products": "Zahle deine Einkäufe in Raten mit maximaler Freiheit,",
    "checkout_widget_exp5_10:title_single_product": "Zahle deine Einkäufe in {{installments}} Raten mit maximaler Freiheit.",
    "checkout_widget_exp5_10:title_pay_now": 'Zahle vollständig mit Scalapay, die von dir gekauften Produkte <span class="{{textStyle}}">sind versichert</span>.',
    "checkout_widget_exp5_10:choose_installments": "wähle zwischen {{installmentList}} oder {{maxInstallment}} Raten.",
    "checkout_widget_exp5_10:choose_installments_pay_in_x": "wähle zwischen {{installmentList}}, oder bis zu {{maxInstallment}} Raten.",
    "checkout_widget_exp5_10:accepted_methods": "Wir akzeptieren alle gängigen Zahlungsmethoden:",
    "checkout_widget_exp5_10:card_list": "VISA, Mastercard und Prepaid-Karten.",
    // Info card
    "product_widget:pay_in_n_label": "Zahle in {{installments}} Raten",
    "product_widget:pay_in_x_label": "Zahle bis zu {{maxInstallments}} Raten",
    "product_widget:pay_now_checkout_label": "Vollständig bezahlen",
    "product_widget:later_label": "Später zahlen",
    "summary_card:no_interest_info": "Zinsfrei",
    "how_to_card:information_1": "<strong class='text-black'>Scalapay</strong> beim Checkout auswählen.",
    "how_to_card:information_2": "<strong class='text-black'>Erstelle in 2 Minuten ein Konto</strong> und <strong class='text-black'>füge eine Zahlungsmethode hinzu.</strong>",
    "how_to_card:information_3:travel": "Bezahle nur die erste Rate und bestätigen Sie Ihre Reservierung sofort.",
    "how_to_card:information_4:travel": 'Genießen Sie Ihr Erlebnis und <strong class="text-sp-exp5-black font-semibold">bezahle die restlichen Raten alle 30 Tage*</strong>.',
    // Pay in X / Lending Info card
    "how_to_card:pay_in_x:description": 'Kaufen Sie noch heute und teilen Sie den Gesamtbetrag in bis zu <strong class="text-black">{{maxInstallments}} Raten auf.</strong><br>Eine einfache Möglichkeit, Ihre Einkäufe mit mehr <strong class="text-black">Freiheit zu verwalten</strong>.<br>Finanzierungslösung angeboten von {{lenderName}}',
    "how_to_card:pay_in_x:title": "Was benötigen Sie?",
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_1": '<strong class="text-black">Ausweisdokument</strong> (Italienische Personalausweis oder EU-Führerschein)',
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_2": '<strong class="text-black">Italienische Steuernummer</strong> ("Tessera sanitaria“)',
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_3": '<strong class="text-black">Europäische IBAN</strong>, die auf den Namen des Kreditantragstellers registriert ist',
    "how_to_card:pay_lending_or_in_x:bbva:information_1": '<strong class="text-black">Ausweisdokument</strong> (Original und gültiger Personalausweis oder Aufenthaltsgenehmigung)',
    "how_to_card:pay_lending_or_in_x:bbva:information_2": '<strong class="text-black">Spanische IBAN</strong>: ein Bankkonto, das auf den Namen des Kreditantragstellers lautet',
    "info_card_lending:installments": "{{installments}} Raten von {{installmentAmount}}",
    "info_card_lending:schedule": "Alle 30 Tage, einschließlich Zinsen",
    // Modal
    "modal:terms_and_conditions": 'Die Raten werden automatisch über die gewählte Zahlungsmethode abgerechnet. In einigen Fällen kann die erste Rate höher ausfallen als die folgenden.<br/>Lies alle ABG auf <a class="underline decoration-solid underline-offset-[20%] decoration-[15%]" href="https://www.scalapay.com/?utm_source={{utmSource}}&utm_medium=referral&utm_campaign=link-widget" target="_blank">www.scalapay.com</a>.',
    "modal:installments_card_title": "Wie funktioniert es?",
    "modal:close_button": "Schließen",
    // Installment summary
    "installment_summary:total": "<span>Gesamt:</span> <strong class='text-black'>{{total}}</strong> <sup>{{asterisk}}</sup> <strong class='text-black'>{{fee}}</strong>",
    "installment_summary:pay_now": "Heute",
    "installment_summary:days-prefix": "",
    "installment_summary:days": "Tage",
    "installment_summary:monthly_plural": "{{numberOfInstallments}} Monate",
    "installment_summary:weekly_plural": "{{numberOfInstallments}} Wochen",
    "installment_summary:daily_plural": "{{numberOfInstallments}} Tage",
    "installment_summary:monthly_single": "Monat",
    "installment_summary:weekly_single": "Woche",
    "installment_summary:daily_single": "Tag",
    "installment_summary:service_fee": "",
    // Interests disclaimer
    "card_summary:interests_disclaimer": "Es gelten Sollzins (TAN) und Effektivzins (TAEG)",
    "card_summary:interests_disclaimer_free": "Zinsfrei",
    // Learn more modal
    "learn_more_modal:title": "Was du liebst, in bequemen Raten. Zinsfrei.",
    // Learn more modal 5.1
    "learn_more_modal_51:title": "Wähle die Rate",
    "learn_more_modal_51:instead_of": "Statt",
    "learn_more_modal_51:pay_in_n": "Zahle in {{count}} Raten",
    "learn_more_modal_51:pay_in_full": "Sofort bezahlen",
    "learn_more_modal_51:available_above": "Verfügbar ab einem Warenkorbwert von {{amount}}",
    "learn_more_modal_51:split_fee_first_installment": "{{amount}} nur bei der ersten Rate",
    "learn_more_modal_51:interest_amount": "{{amount}} an Zinsen",
    "learn_more_modal_51:interests_disclaimer": "Es gelten Sollzins (TAN) und Effektivzins (TAEG)",
    "learn_more_modal_51:tan_taeg_details": "TAN {{tan}}% TAEG {{taeg}}%",
    "learn_more_modal_51:interest_free": "Zinsfrei",
    "learn_more_modal_51:in_partnership_with": "In Partnerschaft mit",
    "learn_more_modal_51:see_more_info": "Mehr Informationen anzeigen",
    "learn_more_modal_51:installment_disclaimer": "*In einigen Fällen können die Raten um bis zu 30 Tage verschoben werden.",
    "learn_more_modal_51:installments_card_title": "Wie funktioniert es?",
    "learn_more_modal_51:how_to_1": "<strong class='text-sp-exp5-black font-semibold'>Wähle 'Scalapay'</strong> an der Kasse aus.",
    "learn_more_modal_51:how_to_2": '<strong class="text-sp-exp5-black font-semibold">Erstelle in 2 Minuten ein Konto</strong> und verknüpfe eine Zahlungsmethode.',
    "learn_more_modal_51:how_to_3": "Bezahle nur die erste Rate und erhalte deine Bestellung sofort.",
    "learn_more_modal_51:how_to_3:travel": "Bezahle nur die erste Rate und bestätigen Sie Ihre Reservierung sofort.",
    "learn_more_modal_51:how_to_4": 'Genieße deinen Einkauf und <strong class="text-sp-exp5-black font-semibold">bezahle die restlichen Raten alle 30 Tage*</strong>.',
    "learn_more_modal_51:how_to_4:travel": 'Genieße dein Erlebnis und <strong class="text-sp-exp5-black font-semibold">bezahle die restlichen Raten alle 30 Tage*</strong>.'
  },
  [j.FR]: {
    // Product widget
    "product_widget:pay_in_3": 'Payez en 3 fois <span class="{{textStyle}}">{{installmentAmount}}</span> avec',
    "product_widget:pay_in_4": 'Payez en 4{{feeStar}} fois <span class="{{textStyle}}">{{installmentAmount}}</span> avec',
    "product_widget:pay_up_to_n_installments": `Payez jusqu'à {{installments}} fois <span class="{{textStyle}}">{{installmentAmount}}</span> avec`,
    "product_widget:pay_in_3_pay_in_4": 'Payez en 3 ou 4{{feeStar}} fois <span class="{{textStyle}}">{{installmentAmount}}</span> avec',
    "product_widget:pay_in_4_service_fee_single": "*Des frais de service de {{feeAmount}} s'appliquent.",
    "product_widget:pay_in_4_service_fee_single_no_amount": "*Des frais de service s'appliquent.",
    "product_widget:learn_more": "En savoir plus",
    "product_widget:no_interest": "Sans intérêts.",
    // Product widget no installments
    "product_widget:pay_in_3_no_installments": "Payez en 3 fois avec",
    "product_widget:pay_in_3_pay_now_checkout_no_installments": "Payez en 3 fois avec",
    "product_widget:pay_in_4_no_installments": "Payez en 4{{feeStar}} fois avec",
    "product_widget:pay_in_4_pay_now_checkout_no_installments": "Payez en 4{{feeStar}} fois avec",
    "product_widget:pay_in_3_pay_in_4_no_installments": "Payez en 3 ou 4{{feeStar}} fois avec",
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout_no_installments": "Payez en 3 ou 4{{feeStar}} fois avec",
    "product_widget:pay_now_checkout_no_installments": "Payez avec",
    "product_widget:pay_up_to_n_installments_no_installments": "Payez jusqu'à {{installments}} fois avec",
    "product_widget:pay_now_checkout": "Payez avec",
    "product_widget:pay_later": "Payez plus tard",
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout": 'Payez en 3 ou 4{{feeStar}} fois <strong class="{{textStyle}}">{{installmentAmount}}</strong> avec',
    "product_widget:pay_in_3_pay_now_checkout": 'Payez en 3 fois <strong class="{{textStyle}}">{{installmentAmount}}</strong> avec',
    "product_widget:pay_in_4_pay_now_checkout": 'Payez en 4{{feeStar}} fois <strong class="{{textStyle}}">{{installmentAmount}}</strong> avec',
    "product_widget:pay_in_3_pay_in_4_pay_later": 'Payez en 3 ou 4 fois, à partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_3_pay_later": 'Payez en 3 fois, à partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_4_pay_later": 'Payez en 4 fois, à partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_now_checkout_pay_later": "Payez maintenant ou plus tard",
    "product_widget:pay_in_3_pay_now_checkout_pay_later": 'Payez en 3 fois, à partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_4_pay_now_checkout_pay_later": 'Payez en 4 fois, à partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout_pay_later": 'Payez en 3 ou 4 fois, à partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_x": `<span class="{{textStyle}}">Ou</span> payez jusqu'à <span class="{{textStyle}}">{{maxInstallments}} fois</span> avec {{lenderName}}`,
    "product_widget:pay_in_x_interest_free": `<span class="{{textStyle}}">Ou</span> payez jusqu'à <span class="{{textStyle}}">{{maxInstallments}} fois sans frais</span> avec {{lenderName}}`,
    "product_widget:pay_in_x_only": `Payez <span class="{{textStyle}}">jusqu'à {{maxInstallments}} fois</span> avec {{lenderName}}.`,
    "product_widget:pay_in_x_only_interest_free": `Payez <span class="{{textStyle}}">jusqu'à {{maxInstallments}} fois sans frais</span> avec {{lenderName}}.`,
    // Checkout widget
    "checkout_widget:pay_in_3": "Payez en 3 fois <span class='{{textStyle}}'>{{installmentAmount}}</span> sans intérêts.",
    "checkout_widget:pay_in_4": "Payez en 4{{feeStar}} fois <span class='{{textStyle}}'>{{installmentAmount}}</span> sans intérêts.",
    "checkout_widget:pay_now_checkout": "Paiement rapide avec votre compte.",
    "checkout_widget:pay_later": "Payez plus tard sans intérêt.",
    "checkout_widget:pay_in_x": `Payez jusqu'à <span class="{{textStyle}}">{{maxInstallments}} fois</span> avec {{lenderName}}`,
    "checkout_widget:pay_in_x_interest_free": `Payez jusqu'à <span class="{{textStyle}}">{{maxInstallments}} fois sans frais</span> avec {{lenderName}}`,
    "checkout_widget:pay_in_x_only": `Payez <span class="{{textStyle}}">jusqu'à {{maxInstallments}} fois</span> avec {{lenderName}}.`,
    "checkout_widget:pay_in_x_only_interest_free": `Payez <span class="{{textStyle}}">jusqu'à {{maxInstallments}} fois sans frais</span> avec {{lenderName}}.`,
    "checkout_widget:accepted_methods": "Nous acceptons tous les principaux moyens de paiement, y compris les cartes prépayées.",
    "checkout_widget:pay_in_n_consumer_landing": 'Payez en {{installments}}* fois <span class="{{textStyle}}">{{installmentAmount}}</span>.',
    "checkout_widget:pay_in_n_consumer_landing_tan_taeg": "*TAEG {{tan}}% & TEG {{taeg}}%",
    // Checkout widget no installments
    "checkout_widget:pay_in_3_no_installments": "Payez en 3 fois sans intérêts.",
    "checkout_widget:pay_in_4_no_installments": "Payez en 4{{feeStar}} fois sans intérêts.",
    // Checkout Title
    "checkout_title:pay_in_3": "Payez en 3 fois {{installmentAmount}} avec",
    "checkout_title:pay_in_4": "Payez en 4 fois {{installmentAmount}} avec",
    "checkout_title:pay_in_3_pay_in_4": "Payez en 3 ou 4 fois {{installmentAmount}} avec",
    "checkout_title:pay_in_3_pay_in_4_pay_in_x": "Payez en 3 ou 4 ou jusqu'à {{maxInstallments}} fois avec {{lenderName}}",
    "checkout_title:single_product": "Payez en {{installments}} fois {{installmentAmount}} avec",
    "checkout_title:pay_in_3_pay_in_x": "Payez en 3 ou jusqu'à {{maxInstallments}} fois avec {{lenderName}}",
    "checkout_title:pay_in_4_pay_in_x": "Payez en 4 ou jusqu'à {{maxInstallments}} fois avec {{lenderName}}",
    "checkout_title:pay_in_3_consumer_lending": "Payez en 3 ou jusqu'à {{maxRate}} fois avec",
    "checkout_title:pay_in_4_consumer_lending": "Payez en 4 ou jusqu'à {{maxRate}} fois avec",
    "checkout_title:pay_in_3_pay_in_4_consumer_lending": "Payez en 3 ou 4 ou jusqu'à {{maxRate}} fois avec",
    "checkout_title:consumer_lending_only": "Payez jusqu'à {{maxRate}} fois avec",
    "checkout_title:pay_now": "Payez avec Scalapay",
    //ProductWidget Exp5.10 specific translations
    "product_widget_exp5_10:from_x_in_n_installments": 'à partir de <span class="{{textStyle}}">{{installmentAmount}}/mois</span> in {{installments}} fois',
    "product_widget_exp5_10:pay_now": "payez avec Scalapay",
    "product_widget_exp5_10:pay_in_n_installments": 'payez en <span class="{{textStyle}}">{{installments}} fois</span>',
    "product_widget_exp5_10:pay_up_to_n_installments": `payez jusqu'à <span class="{{textStyle}}">{{installments}} fois</span>`,
    "product_widget_exp5_10:sub_label_only_core_products": 'Ajoutez {{differenceAmount}} de plus pour <span class="{{textStyle}}">payer en <span class="{{textStyleInner}}">{{installments}} fois</span></span>',
    "product_widget_exp5_10:sub_label_consumer_lending_products": "{{installments}} versements disponibles à partir de {{minAmount}} de panier en ligne",
    //CheckoutWidget Exp5.10 specific translations
    "checkout_widget_exp5_10:title_multiple_products": "Payez vos achats en plusieurs fois en toute liberté,",
    "checkout_widget_exp5_10:title_single_product": "Payez vos achats en {{installments}} fois en toute liberté.",
    "checkout_widget_exp5_10:title_pay_now": 'Payez en totalité avec Scalapay, les produits que vous achetez sont <span class="{{textStyle}}">couverts par une assurance</span>.',
    "checkout_widget_exp5_10:choose_installments": "choisissez entre {{installmentList}} ou {{maxInstallment}} fois.",
    "checkout_widget_exp5_10:choose_installments_pay_in_x": "choisissez entre {{installmentList}}, ou jusqu'à {{maxInstallment}} fois.",
    "checkout_widget_exp5_10:accepted_methods": "Nous acceptons tous les principaux moyens de paiement:",
    "checkout_widget_exp5_10:card_list": "VISA, Mastercard et cartes prépayées.",
    // Info card
    "product_widget:pay_in_n_label": "Payez en {{installments}} fois",
    "product_widget:pay_in_x_label": "Payez jusqu'à {{maxInstallments}} fois",
    "product_widget:pay_now_checkout_label": "Payer la totalité",
    "product_widget:later_label": "Payez plus tard",
    "summary_card:no_interest_info": "Sans intérêts",
    "how_to_card:information_1": "<strong class='text-black'>Choisissez Scalapay</strong> au moment de régler.",
    "how_to_card:information_2": "<strong class='text-black'>Créez un compte en 2 minutes</strong> et <strong class='text-black'>ajoutez un moyen de paiement.</strong>",
    "how_to_card:information_3:travel": "Payez seulement le premier versement et confirmez votre réservation.",
    "how_to_card:information_4:travel": 'Profitez de votre expérience et <strong class="text-sp-exp5-black font-semibold">réglez les mensualités restantes tous les 30 jours*</strong>.',
    // Pay in X / Lending Info card
    "how_to_card:pay_in_x:description": `Achetez dès aujourd'hui et répartissez le montant total en <strong class="text-black">{{maxInstallments}} fois</strong>.<br>Une façon simple de gérer vos achats avec <strong class="text-black">plus de liberté</strong>.<br>Solution financière proposée par {{lenderName}}`,
    "how_to_card:pay_in_x:title": "De quoi aurez-vous besoin?",
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_1": `<strong class="text-black">Document d'identité</strong> (carte d'identité italienne ou permis de conduire UE)`,
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_2": '<strong class="text-black">Carte Fiscale italienne</strong> ("Tessera sanitaria")',
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_3": '<strong class="text-black">IBAN européen</strong> enregistré au nom du demandeur du crédit',
    "how_to_card:pay_lending_or_in_x:bbva:information_1": `<strong class="text-black">Document d'identité</strong> (DNI ou TIE original et en cours de validité)`,
    "how_to_card:pay_lending_or_in_x:bbva:information_2": '<strong class="text-black">IBAN espagnol</strong>: un compte bancaire enregistré au nom de la personne qui demande le prêt',
    "info_card_lending:installments": "{{installments}} fois {{installmentAmount}}",
    "info_card_lending:schedule": "Tous les 30 jours, intérêts compris",
    // Modal
    "modal:terms_and_conditions": 'Les versements seront automatiquement débités de la méthode de paiement utilisée. Dans certains cas, le premier versement peut être plus élevé que les autres.<br/>Voir les CGV sur <a class="underline decoration-solid underline-offset-[20%] decoration-[15%]" href="https://www.scalapay.com/?utm_source={{utmSource}}&utm_medium=referral&utm_campaign=link-widget" target="_blank">www.scalapay.com</a>.',
    "modal:installments_card_title": "Comment ça marche ?",
    "modal:close_button": "Fermer",
    // Installment summary
    "installment_summary:total": "<span>Total :</span> <strong class='text-black'>{{total}}</strong> <sup>{{asterisk}}</sup> <strong class='text-black'>{{fee}}</strong>",
    "installment_summary:pay_now": "Aujourd'hui",
    "installment_summary:days-prefix": "",
    "installment_summary:days": "jours",
    "installment_summary:monthly_plural": "{{numberOfInstallments}} mois",
    "installment_summary:weekly_plural": "{{numberOfInstallments}} semaines",
    "installment_summary:daily_plural": "{{numberOfInstallments}} jours",
    "installment_summary:monthly_single": "mois",
    "installment_summary:weekly_single": "semaine",
    "installment_summary:daily_single": "jour",
    "installment_summary:service_fee": "* Des frais de service de {{fee}} sont prélevés que sur le premier versement.",
    // Interests disclaimer
    "card_summary:interests_disclaimer": "Des taux d'intérêt s'appliquent",
    "card_summary:interests_disclaimer_free": "Sans frais",
    // Learn more modal
    "learn_more_modal:title": "Ce que vous aimez en plusieurs fois. Sans intérêt.",
    // Learn more modal 5.1
    "learn_more_modal_51:title": "Choisissez votre mensualité",
    "learn_more_modal_51:instead_of": "Au lieu de",
    "learn_more_modal_51:pay_in_n": "Payez en {{count}} fois",
    "learn_more_modal_51:pay_in_full": "Payer en une fois",
    "learn_more_modal_51:available_above": "Disponible si votre panier dépasse {{amount}}",
    "learn_more_modal_51:split_fee_first_installment": "{{amount}} uniquement sur la première échéance",
    "learn_more_modal_51:interest_amount": "{{amount}} d'intérêts",
    "learn_more_modal_51:interests_disclaimer": "Des taux d'intérêt s'appliquent",
    "learn_more_modal_51:tan_taeg_details": "TAN {{tan}}% TAEG {{taeg}}%",
    "learn_more_modal_51:interest_free": "Sans frais",
    "learn_more_modal_51:in_partnership_with": "En partenariat avec",
    "learn_more_modal_51:see_more_info": "Voir plus d'informations",
    "learn_more_modal_51:installment_disclaimer": "*Dans certains cas, les mensualités peuvent être reportées jusqu'à 30 jours.",
    "learn_more_modal_51:installments_card_title": "Comment ça fonctionne ?",
    "learn_more_modal_51:how_to_1": "<strong class='text-sp-exp5-black font-semibold'>Sélectionnez 'Scalapay'</strong> au moment de régler.",
    "learn_more_modal_51:how_to_2": '<strong class="text-sp-exp5-black font-semibold">Créez un compte en 2 minutes</strong> et associez un moyen de paiement.',
    "learn_more_modal_51:how_to_3": "Payez seulement la première mensualité et recevez votre commande immédiatement.",
    "learn_more_modal_51:how_to_3:travel": "Payez seulement le premier versement et confirmez votre réservation.",
    "learn_more_modal_51:how_to_4": 'Profitez de votre achat et <strong class="text-sp-exp5-black font-semibold">réglez les mensualités restantes tous les 30 jours*</strong>.',
    "learn_more_modal_51:how_to_4:travel": 'Profitez de votre expérience et <strong class="text-sp-exp5-black font-semibold">réglez les mensualités restantes tous les 30 jours*</strong>.'
  },
  [j.ES]: {
    // Product widget
    "product_widget:pay_in_3": 'Paga en 3 plazos <span class="{{textStyle}}">de {{installmentAmount}}</span> con',
    "product_widget:pay_in_4": 'Paga en 4{{feeStar}} plazos <span class="{{textStyle}}">de {{installmentAmount}}</span> con',
    "product_widget:pay_up_to_n_installments": 'Paga hasta en {{installments}} cuotas <span class="{{textStyle}}">de {{installmentAmount}}</span> con',
    "product_widget:pay_in_3_pay_in_4": 'Paga en 3 o 4{{feeStar}} plazos <span class="{{textStyle}}">de {{installmentAmount}}</span> con',
    "product_widget:pay_in_4_service_fee_single": "*Se aplica una comisión de servicio de {{feeAmount}}.",
    "product_widget:pay_in_4_service_fee_single_no_amount": "*Se aplica una comisión de servicio.",
    "product_widget:learn_more": "Descubre más",
    "product_widget:no_interest": "Sin intereses.",
    // Product widget no installments
    "product_widget:pay_in_3_no_installments": "Paga en 3 plazos con",
    "product_widget:pay_in_3_pay_now_checkout_no_installments": "Paga en 3 plazos con",
    "product_widget:pay_in_4_no_installments": "Paga en 4{{feeStar}} plazos con",
    "product_widget:pay_in_4_pay_now_checkout_no_installments": "Paga en 4{{feeStar}} plazos con",
    "product_widget:pay_in_3_pay_in_4_no_installments": "Paga en 3 o 4{{feeStar}} plazos con",
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout_no_installments": "Paga en 3 o 4{{feeStar}} plazos con",
    "product_widget:pay_now_checkout_no_installments": "Paga con",
    "product_widget:pay_up_to_n_installments_no_installments": "Paga hasta en {{installments}} cuotas con",
    "product_widget:pay_now_checkout": "Paga con",
    "product_widget:pay_later": "Paga más tarde",
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout": 'Paga en 3 o 4{{feeStar}} plazos <strong class="{{textStyle}}">de {{installmentAmount}}</strong> con',
    "product_widget:pay_in_3_pay_now_checkout": 'Paga en 3 plazos <strong class="{{textStyle}}">de {{installmentAmount}}</strong> con',
    "product_widget:pay_in_4_pay_now_checkout": 'Paga en 4{{feeStar}} plazos <strong class="{{textStyle}}">de {{installmentAmount}}</strong> con',
    "product_widget:pay_in_3_pay_in_4_pay_later": 'Paga en 3 o 4 plazos, a partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_3_pay_later": 'Paga en 3 plazos, a partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_4_pay_later": 'Paga en 4 plazos, a partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_now_checkout_pay_later": "Paga ahora o más tarde",
    "product_widget:pay_in_3_pay_now_checkout_pay_later": 'Paga en 3 plazos, a partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_4_pay_now_checkout_pay_later": 'Paga en 4 plazos, a partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_3_pay_in_4_pay_now_checkout_pay_later": 'Paga en 3 o 4 plazos, a partir de <strong class="{{textStyle}}">{{installmentAmount}}</strong>.',
    "product_widget:pay_in_x": '<span class="{{textStyle}}">O</span> paga hasta en <span class="{{textStyle}}">{{maxInstallments}} cuotas</span> con {{lenderName}}',
    "product_widget:pay_in_x_interest_free": '<span class="{{textStyle}}">O</span> paga hasta en <span class="{{textStyle}}">{{maxInstallments}} cuotas sin intereses</span> con {{lenderName}}',
    "product_widget:pay_in_x_only": 'Paga <span class="{{textStyle}}">hasta en {{maxInstallments}} plazos</span> con {{lenderName}}.',
    "product_widget:pay_in_x_only_interest_free": 'Paga <span class="{{textStyle}}">hasta en {{maxInstallments}} plazos sin intereses</span> con {{lenderName}}.',
    // Checkout widget
    "checkout_widget:pay_in_3": "Paga en 3 plazos de <span class='{{textStyle}}'>{{installmentAmount}}</span> sin intereses.",
    "checkout_widget:pay_in_4": "Paga en 4{{feeStar}} plazos de <span class='{{textStyle}}'>{{installmentAmount}}</span> sin intereses.",
    "checkout_widget:pay_now_checkout": "Pago rápido con tu cuenta.",
    "checkout_widget:pay_later": "Paga después sin intereses.",
    "checkout_widget:pay_in_x": 'Paga hasta en <span class="{{textStyle}}">{{maxInstallments}} cuotas</span> con {{lenderName}}',
    "checkout_widget:pay_in_x_interest_free": 'Paga hasta en <span class="{{textStyle}}">{{maxInstallments}} cuotas sin intereses</span> con {{lenderName}}',
    "checkout_widget:pay_in_x_only": 'Paga <span class="{{textStyle}}">hasta en {{maxInstallments}} cuotas</span> con {{lenderName}}.',
    "checkout_widget:pay_in_x_only_interest_free": 'Paga <span class="{{textStyle}}">hasta en {{maxInstallments}} cuotas sin intereses</span> con {{lenderName}}.',
    "checkout_widget:accepted_methods": "Aceptamos todos los métodos de pago principales.",
    "checkout_widget:pay_in_n_consumer_landing": 'Paga en {{installments}}* plazos de <span class="{{textStyle}}">{{installmentAmount}}</span>.',
    "checkout_widget:pay_in_n_consumer_landing_tan_taeg": "*TIN {{tan}}% & TAE {{taeg}}%",
    // Checkout widget no installments
    "checkout_widget:pay_in_3_no_installments": "Paga en 3 plazos sin intereses.",
    "checkout_widget:pay_in_4_no_installments": "Paga en 4{{feeStar}} plazos sin intereses.",
    // Checkout Title
    "checkout_title:pay_in_3": "Paga en 3 plazos de {{installmentAmount}} con",
    "checkout_title:pay_in_4": "Paga en 4 plazos de {{installmentAmount}} con",
    "checkout_title:pay_in_3_pay_in_4": "Paga en 3 o 4 plazos de {{installmentAmount}} con",
    "checkout_title:pay_in_3_pay_in_4_pay_in_x": "Paga en 3 o 4 o hasta en {{maxInstallments}} plazos con {{lenderName}}",
    "checkout_title:single_product": "Paga en {{installments}} plazos de {{installmentAmount}} con",
    "checkout_title:pay_in_3_pay_in_x": "Paga en 3 o hasta en {{maxInstallments}} plazos con {{lenderName}}",
    "checkout_title:pay_in_4_pay_in_x": "Paga en 4 o hasta en {{maxInstallments}} plazos con {{lenderName}}",
    "checkout_title:pay_in_3_consumer_lending": "Paga en 3 o hasta en {{maxRate}} plazos con",
    "checkout_title:pay_in_4_consumer_lending": "Paga en 4 o hasta en {{maxRate}} plazos con",
    "checkout_title:pay_in_3_pay_in_4_consumer_lending": "Paga en 3 o 4 o hasta en {{maxRate}} plazos con",
    "checkout_title:consumer_lending_only": "Paga hasta en {{maxRate}} plazos con",
    "checkout_title:pay_now": "Paga con Scalapay",
    //ProductWidget Exp5.10 specific translations
    "product_widget_exp5_10:from_x_in_n_installments": 'a partir de <span class="{{textStyle}}">{{installmentAmount}}/mes</span> en {{installments}} plazos',
    "product_widget_exp5_10:pay_now": "paga con Scalapay",
    "product_widget_exp5_10:pay_in_n_installments": 'paga en <span class="{{textStyle}}">{{installments}} plazos</span>',
    "product_widget_exp5_10:pay_up_to_n_installments": 'paga hasta en <span class="{{textStyle}}">{{installments}} plazos</span>',
    "product_widget_exp5_10:sub_label_only_core_products": 'Añade otros {{differenceAmount}} para <span class="{{textStyle}}">pagar en <span class="{{textStyleInner}}">{{installments}} plazos</span></span>',
    "product_widget_exp5_10:sub_label_consumer_lending_products": "{{installments}} plazos disponibles a partir de {{minAmount}} de carrito de compra",
    //CheckoutWidget Exp5.10 specific translations
    "checkout_widget_exp5_10:title_multiple_products": "Paga tus compras a plazos con total libertad,",
    "checkout_widget_exp5_10:title_single_product": "Paga tus compras en {{installments}} plazos con total libertad.",
    "checkout_widget_exp5_10:title_pay_now": 'Paga en su totalidad con Scalapay, los productos que compras están <span class="{{textStyle}}">protegidos por un seguro</span>.',
    "checkout_widget_exp5_10:choose_installments": "elige entre {{installmentList}} o {{maxInstallment}} plazos.",
    "checkout_widget_exp5_10:choose_installments_pay_in_x": "elige entre {{installmentList}}, o hasta {{maxInstallment}} plazos.",
    "checkout_widget_exp5_10:accepted_methods": "Aceptamos todos los principales métodos de pago:",
    "checkout_widget_exp5_10:card_list": "VISA, Mastercard y tarjetas prepago.",
    // Info card
    "product_widget:pay_in_n_label": "Paga en {{installments}} plazos",
    "product_widget:pay_in_x_label": "Paga hasta en {{maxInstallments}} cuotas",
    "product_widget:pay_now_checkout_label": "Paga el total",
    "product_widget:later_label": "Paga después",
    "summary_card:no_interest_info": "Sin intereses",
    "how_to_card:information_1": "<strong class='text-black'>Elige Scalapay</strong> al momento de pagar.",
    "how_to_card:information_2": "<strong class='text-black'>Crea una cuenta en 2 minutos</strong> y <strong class='text-black'>añade un método de pago.</strong>",
    "how_to_card:information_3:travel": "Paga solo el primer plazo y confirme tu reserva ahora.",
    "how_to_card:information_4:travel": 'Disfrute de su experiencia y <strong class="text-sp-exp5-black font-semibold">paga los plazos restantes cada 30 días*</strong>.',
    // Pay in X / Lending Info card
    "how_to_card:pay_in_x:description": 'Compre hoy y divida el total en hasta <strong class="text-black">{{maxInstallments}} cuotas</strong>.<br>Una forma sencilla de gestionar tus compras con <strong class="text-black">más libertad</strong>.<br>Solución financiera ofrecida por {{lenderName}}',
    "how_to_card:pay_in_x:title": "¿Qué necesitarás?",
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_1": '<strong class="text-black">Documento de identidad</strong> (DNI italiano, o carnet de conducir de la UE)',
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_2": '<strong class="text-black">Tarjeta con el Código Fiscal italiano</strong> ("Tessera sanitaria")',
    "how_to_card:pay_lending_or_in_x:deutsche_bank:information_3": '<strong class="text-black">IBAN europeo</strong> registrado a nombre de quien solicita el préstamo',
    "how_to_card:pay_lending_or_in_x:bbva:information_1": '<strong class="text-black">Documento de identidad</strong> (DNI o TIE original y en vigor)',
    "how_to_card:pay_lending_or_in_x:bbva:information_2": '<strong class="text-black">IBAN Español</strong>: Una cuenta bancaria de la que seas titular',
    "info_card_lending:installments": "{{installments}} plazos de {{installmentAmount}}",
    "info_card_lending:schedule": "Cada 30 días, incluidos los intereses",
    // Modal
    "modal:terms_and_conditions": 'Los plazos se cargarán automáticamente al método de pago utilizado. En algunos casos, el primer plazo puede ser superior a los restantes.<br/>Consulta los T&C completos en <a class="underline decoration-solid underline-offset-[20%] decoration-[15%]" href="https://www.scalapay.com/?utm_source={{utmSource}}&utm_medium=referral&utm_campaign=link-widget" target="_blank">www.scalapay.com</a>.',
    "modal:installments_card_title": "¿Cómo funciona?",
    "modal:close_button": "Cerrar",
    // Installment summary
    "installment_summary:total": "<span>Total:</span> <strong class='text-black'>{{total}}</strong> <sup>{{asterisk}}</sup> <strong class='text-black'>{{fee}}</strong>",
    "installment_summary:pay_now": "Hoy",
    "installment_summary:days-prefix": "",
    "installment_summary:days": "días",
    "installment_summary:monthly_plural": "{{numberOfInstallments}} meses",
    "installment_summary:weekly_plural": "{{numberOfInstallments}} semanas",
    "installment_summary:daily_plural": "{{numberOfInstallments}} días",
    "installment_summary:monthly_single": "mes",
    "installment_summary:weekly_single": "semana",
    "installment_summary:daily_single": "día",
    "installment_summary:service_fee": "* Sólo se cobra una tarifa de servicio de {{fee}} en el primer plazo",
    // Interests disclaimer
    "card_summary:interests_disclaimer": "Se aplican tasas de interés",
    "card_summary:interests_disclaimer_free": "Sin intereses",
    // Learn more modal
    "learn_more_modal:title": "Lo que te gusta en cómodos plazos. Sin intereses.",
    // Learn more modal 5.1
    "learn_more_modal_51:title": "Elige tu plazo",
    "learn_more_modal_51:instead_of": "En lugar de",
    "learn_more_modal_51:pay_in_n": "Paga en {{count}} cuotas",
    "learn_more_modal_51:pay_in_full": "Pagar de una vez",
    "learn_more_modal_51:available_above": "Disponible si tu carrito supera los {{amount}}",
    "learn_more_modal_51:split_fee_first_installment": "{{amount}} solo en la primera cuota",
    "learn_more_modal_51:interest_amount": "{{amount}} de intereses",
    "learn_more_modal_51:interests_disclaimer": "Se aplican tasas de interés",
    "learn_more_modal_51:tan_taeg_details": "TAN {{tan}}% TAEG {{taeg}}%",
    "learn_more_modal_51:interest_free": "Sin intereses",
    "learn_more_modal_51:in_partnership_with": "En colaboración con",
    "learn_more_modal_51:see_more_info": "Ver más información",
    "learn_more_modal_51:installment_disclaimer": "*En algunos casos, los plazos pueden ampliarse hasta 30 días.",
    "learn_more_modal_51:installments_card_title": "¿Cómo funciona?",
    "learn_more_modal_51:how_to_1": "<strong class='text-sp-exp5-black font-semibold'>Selecciona 'Scalapay'</strong> al momento de pagar.",
    "learn_more_modal_51:how_to_2": '<strong class="text-sp-exp5-black font-semibold">Crea una cuenta en 2 minutos</strong> y vincula un método de pago.',
    "learn_more_modal_51:how_to_3": "Paga solo la primera cuota y recibe tu pedido de inmediato.",
    "learn_more_modal_51:how_to_3:travel": "Paga solo el primer plazo y confirma tu reserva ahora.",
    "learn_more_modal_51:how_to_4": 'Disfruta de tu compra y <strong class="text-sp-exp5-black font-semibold">paga los plazos restantes cada 30 días*</strong>.',
    "learn_more_modal_51:how_to_4:travel": 'Disfruta de tu experiencia y <strong class="text-sp-exp5-black font-semibold">paga los plazos restantes cada 30 días*</strong>.'
  }
}, E = (e, t, n = {}) => (e in dn || (e = me), t in dn[e] ? Object.keys(n).reduce((r, i) => {
  const s = new RegExp(`{{(${i})}}`, "gi");
  return r.replace(s, n[i] || `{{${i}}}`);
}, dn[e][t]).replace(/{{.*?}}/g, "") : t), la = {
  euro: {
    symbol: "€",
    code: "EUR"
  }
}, ps = {
  it: {
    position: "after",
    display: "symbol"
  },
  en: {
    position: "before",
    display: "symbol"
  }
};
function sr(e) {
  return e && e === j.EN ? "before" : "after";
}
var ce = /* @__PURE__ */ ((e) => (e.PRODUCT = "product", e.CHECKOUT = "checkout", e))(ce || {}), Be = /* @__PURE__ */ ((e) => (e.TRAVEL = "travel", e))(Be || {}), le = /* @__PURE__ */ ((e) => (e.LEFT = "left", e.RIGHT = "right", e.CENTER = "center", e))(le || {}), Se = /* @__PURE__ */ ((e) => (e.NEVER = "never", e.SYSTEM = "system", e.ALWAYS = "always", e))(Se || {});
const ca = {
  [fe.DEFAULT]: "5.0.0",
  [fe.EXP_5_10]: "5.1.0",
  [fe.EXP_5_15]: "5.1.5",
  [fe.EXP_5_20]: "5.2.0"
}, hs = 60, fs = 120, Ve = (e, t) => {
  if (!e)
    return null;
  let n = String(e);
  return n = ((r, i) => r.replace(new RegExp(`^[${i}]+|[${i}]+$`, "g"), ""))(n.replace(/[^0-9,.]/g, ""), ",. "), t === "." && (n = n.replace(/,/g, "")), t === "," && (n = n.replace(/[.]/g, "")), parseFloat(
    parseFloat(
      n.replace(/[.,](?=.*[.,])/g, "").replace(/,/, ".")
    ).toFixed(2)
  ) * 100;
}, zn = (e) => {
  const t = new Set(Object.values(j)), n = new Set(
    Object.keys(_t).map((r) => r.toLowerCase())
  );
  if (typeof e != "string") return me;
  const a = e.toLowerCase().trim();
  if (t.has(a))
    return a;
  if (n.has(a))
    return _t[a.toUpperCase()];
  if (a.length > 2 && a.indexOf("-") === 2) {
    const r = a.slice(0, 2);
    if (t.has(r)) return r;
    if (n.has(r))
      return _t[r.toUpperCase()];
  }
  return me;
}, $ = (e, t = me, n, a) => {
  const r = ps[t], i = n || (r == null ? void 0 : r.display) || "symbol", s = a || (r == null ? void 0 : r.position) || "after", o = i === "code" ? " " : "", l = new Intl.NumberFormat(t, {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "code"
  }).format(e / 100).replace("EUR", "").trim(), c = la.euro[i] || la.euro.code;
  return s === "before" ? `${c}${o}${l}` : `${l}${o}${c}`;
}, gs = (e) => {
  switch (e) {
    case "monthly":
      return 30;
    case "daily":
      return 1;
    case "weekly":
      return 7;
    default:
      return null;
  }
}, Yt = (e, t, n, a) => {
  const r = n && Vn(e, t, a) || 0, i = e + r, s = Rn(
    e,
    t
  );
  return n && r > 0 && (s[0] += r), { baseInstallmentAmount: Math.min(...s), installmentAmounts: s, total: i, splitFee: r };
}, ys = (e, t, n, a, r) => {
  const { baseInstallmentAmount: i, installmentAmounts: s, total: o, splitFee: l } = e, c = $(
    i,
    n,
    a,
    r
  ), u = s.map(
    (_) => $(
      _,
      n,
      a,
      r
    )
  ), d = $(
    o,
    n,
    a,
    r
  ), m = t && l ? $(l, n, a, r) : void 0;
  return {
    baseInstallmentAmount: c,
    installmentAmounts: u,
    total: d,
    splitFee: m
  };
}, xs = (e, t) => {
  const n = gs(e.frequencyType);
  return n !== null ? n * (e.number * t) : 0;
}, Oe = (e) => {
  const t = e === "text";
  return {
    [le.LEFT]: t ? "text-left" : "",
    [le.RIGHT]: t ? "text-right" : `${e}-end`,
    [le.CENTER]: t ? "text-center" : `${e}-center`
  };
}, bs = (e, t) => {
  const n = nr(e), a = rr(e);
  switch (t) {
    case ce.PRODUCT:
      return n ? a ? "product_widget:pay_in_x_only_interest_free" : "product_widget:pay_in_x_only" : a ? "product_widget:pay_in_x_interest_free" : "product_widget:pay_in_x";
    case ce.CHECKOUT:
      return n ? a ? "checkout_widget:pay_in_x_only_interest_free" : "checkout_widget:pay_in_x_only" : a ? "checkout_widget:pay_in_x_interest_free" : "checkout_widget:pay_in_x";
    default:
      return "";
  }
}, or = (e, t, n, a) => {
  const r = e.filter((l) => l.product === I.PAY_IN_X)[0];
  if (!r || !(r != null && r.configuration.maxInstallments) || !(r != null && r.configuration.lenderId))
    return null;
  const i = bs(e, n), s = r == null ? void 0 : r.configuration.lenderId, o = s ? $t[s] : void 0;
  return E(t, i, {
    maxInstallments: r == null ? void 0 : r.configuration.maxInstallments,
    lenderName: On(o),
    textStyle: `font-semibold ${a ? "text-white" : "text-black"}`
  });
}, ws = (e, t, n) => n ? E(e, t, { maxInstallments: n }) : null;
var Rt = /* @__PURE__ */ ((e) => (e.WOOCOMMERCE = "woocommerce", e.MAGENTO2 = "magento2", e.PRESTASHOP1_7 = "prestashop1.7", e.PRESTASHOP1_6 = "prestashop1.6", e.CUSTOM = "custom", e))(Rt || {});
const Cs = [
  {
    platform: "woocommerce",
    getElement: () => document.querySelector(
      'li.payment_method_scalapay label[for="payment_method_scalapay"]'
    ) ?? document.querySelector("div.scalapay-checkout-label > span"),
    setTitle: (e, t) => {
      const n = document.querySelector(
        'li.payment_method_scalapay label[for="payment_method_scalapay"] img.scalapay-checkout-label__icon'
      );
      return e.textContent !== t ? (e.innerHTML = t + ((n == null ? void 0 : n.outerHTML) ?? ""), !0) : !1;
    }
  },
  {
    platform: "magento2",
    getElement: () => {
      const e = document.querySelector(
        'input[type="radio"]#scalapay'
      );
      return e ? document.querySelector(`label[for="${e.id}"] span`) : null;
    },
    setTitle: (e, t) => {
      var r;
      const n = ((r = document.querySelector(".scalapay-checkout-widget-logo")) == null ? void 0 : r.outerHTML) || "", a = `${t} ${n}`;
      return e.innerHTML !== a ? (e.innerHTML = a, !0) : !1;
    }
  },
  {
    platform: "prestashop1.7",
    getElement: () => {
      const e = document.querySelector(
        'div[id^="payment-option-"]:has(scalapay-widget[type="checkout"])'
      );
      return e ? document.querySelector(
        `label[for="${e.id.replace("-additional-information", "")}"] span`
      ) : null;
    },
    setTitle: (e, t) => e.textContent !== t ? (e.textContent = t, !0) : !1
  },
  {
    platform: "prestashop1.6",
    getElement: () => document.querySelector(
      'div.scalapay_payment_module:has(scalapay-widget[type="checkout"]) a.scalapay'
    ),
    setTitle: (e, t) => e.textContent !== t ? (e.textContent = t, e.title = t, !0) : !1
  }
], vs = 1e3, Wn = (e) => {
  const t = {
    locale: zn(e.locale)
  }, n = de({}, e, t), a = N(() => {
    var d;
    return jt(n.products ?? ((d = n == null ? void 0 : n.merchantConfig) == null ? void 0 : d.products), Ve(n.amount));
  }), r = N(() => {
    if (n.installmentAmount)
      return n.installmentAmount;
    if (!n.amount)
      return null;
    const d = Ve(n.amount);
    if (!d)
      return null;
    const m = Fn(a(), d, n.locale), _ = Dn(m), h = Gt(_);
    return $(h.amountInCents, n.locale);
  }), i = () => {
    if (!a())
      return null;
    const d = Tt(a(), I.PAY_IN_THREE) !== null, m = Tt(a(), I.PAY_IN_FOUR) !== null, _ = Tt(a(), I.PAY_IN_X), h = Tt(a(), I.PAY_NOW_CHECKOUT), f = a().filter((y) => De.includes(y.product)), x = f.length > 0, S = a().filter((y) => y.product !== I.PAY_IN_X && y.product !== I.PAY_NOW_CHECKOUT), v = r();
    if (S.length === 1 && !_ && !h) {
      const y = S[0];
      return v ? E(n.locale, "checkout_title:single_product", {
        installments: y.numberOfInstallments,
        installmentAmount: v
      }) : null;
    }
    if (h && S.length === 0 && !_ && !x)
      return E(n.locale, "checkout_title:pay_now");
    if (x && (d || m)) {
      const y = Math.max(...f.map((w) => w.numberOfInstallments ?? w.configuration.maxInstallments ?? 0));
      let b;
      return d && m ? b = "checkout_title:pay_in_3_pay_in_4_consumer_lending" : d ? b = "checkout_title:pay_in_3_consumer_lending" : b = "checkout_title:pay_in_4_consumer_lending", E(n.locale, b, {
        maxRate: y
      });
    }
    if (x) {
      const y = Math.max(...f.map((b) => b.numberOfInstallments ?? b.configuration.maxInstallments ?? 0));
      return E(n.locale, "checkout_title:consumer_lending_only", {
        maxRate: y
      });
    }
    if (_ && (d || m)) {
      const y = _.configuration.lenderId, b = y ? $t[y] : void 0;
      let w;
      return d && m ? w = "checkout_title:pay_in_3_pay_in_4_pay_in_x" : d ? w = "checkout_title:pay_in_3_pay_in_x" : w = "checkout_title:pay_in_4_pay_in_x", E(n.locale, w, {
        maxInstallments: _.configuration.maxInstallments,
        lenderName: On(b)
      });
    }
    return v ? d && m ? E(n.locale, "checkout_title:pay_in_3_pay_in_4", {
      installmentAmount: v
    }) : E(n.locale, "checkout_title:pay_in_3", {
      installmentAmount: v
    }) : null;
  }, s = (d) => n.checkoutTitleSelector ? o(n.checkoutTitleSelector, d) : l(d), o = (d, m) => {
    const _ = document.querySelector(d);
    return _ ? _.textContent === m ? {
      platform: Rt.CUSTOM,
      isCheckoutTitleUpdated: !1,
      isTargetElementFound: !0
    } : (_.textContent = m, {
      platform: Rt.CUSTOM,
      isCheckoutTitleUpdated: !0,
      isTargetElementFound: !0
    }) : {
      platform: Rt.CUSTOM,
      isCheckoutTitleUpdated: !1,
      isTargetElementFound: !1
    };
  }, l = (d) => {
    const m = Cs.find((_) => _.getElement() !== null);
    if (m) {
      const _ = m.getElement();
      return {
        platform: m.platform,
        isTargetElementFound: !0,
        isCheckoutTitleUpdated: m.setTitle(_, d)
      };
    }
    return {
      platform: null,
      isTargetElementFound: !1,
      isCheckoutTitleUpdated: !1
    };
  };
  let c, u = 0;
  return at(() => {
    const d = i();
    if (!d)
      return;
    s(d).isTargetElementFound || (c = new MutationObserver(() => {
      const _ = i();
      if (!_)
        return;
      if (u > vs) {
        console.warn("Stopping observer after too many attempts to avoid infinite loops"), c.disconnect();
        return;
      }
      s(_).isCheckoutTitleUpdated && u++;
    }), c.observe(document.body, {
      childList: !0,
      subtree: !0,
      attributes: !1,
      characterData: !1
    }));
  }), Ye(() => {
    const d = i();
    d && s(d);
  }), [];
}, lr = '*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/*! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com*/*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-size:1em;font-variation-settings:normal}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-feature-settings:inherit;font-size:100%;font-variation-settings:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]:where(:not([hidden=until-found])){display:none}.container{width:100%}@media (min-width:640px){.container{max-width:640px}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{top:0;right:0;bottom:0;left:0}.left-0{left:0}.right-0{right:0}.top-0{top:0}.top-\\[5vh\\]{top:5vh}.isolate{isolation:isolate}.z-\\[2147483646\\]{z-index:2147483646}.z-\\[2147483647\\]{z-index:2147483647}.m-0{margin:0}.mx-auto{margin-left:auto;margin-right:auto}.my-auto{margin-bottom:auto;margin-top:auto}.mb-0{margin-bottom:0}.mb-1{margin-bottom:calc(var(--srem)*.25)}.mb-2{margin-bottom:calc(var(--srem)*.5)}.mb-4{margin-bottom:calc(var(--srem)*1)}.mb-\\[12px\\]{margin-bottom:12px}.ml-5{margin-left:calc(var(--srem)*1.25)}.ml-\\[8px\\]{margin-left:8px}.mr-\\[8px\\]{margin-right:8px}.mt-1{margin-top:calc(var(--srem)*.25)}.mt-2{margin-top:calc(var(--srem)*.5)}.mt-3{margin-top:calc(var(--srem)*.75)}.mt-4{margin-top:calc(var(--srem)*1)}.block{display:block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.contents{display:contents}.h-10{height:calc(var(--srem)*2.5)}.h-2{height:calc(var(--srem)*.5)}.h-\\[21px\\]{height:21px}.h-full{height:100%}.max-h-\\[95vh\\]{max-height:95vh}.max-h-\\[calc\\(70vh-2rem\\)\\]{max-height:calc(70vh - 2rem)}.w-\\[40\\%\\]{width:40%}.w-\\[60\\%\\]{width:60%}.w-auto{width:auto}.w-full{width:100%}.min-w-\\[100px\\]{min-width:100px}.max-w-\\[600px\\]{max-width:600px}.max-w-fit{max-width:-moz-fit-content;max-width:fit-content}.max-w-full{max-width:100%}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.grow{flex-grow:1}.-translate-y-16{--tw-translate-y:calc(var(--srem)*4*-1)}.-translate-y-16,.rotate-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate:0deg}.rotate-180{--tw-rotate:180deg}.rotate-180,.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-default{cursor:default}.cursor-pointer{cursor:pointer}.list-decimal{list-style-type:decimal}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.flex-nowrap{flex-wrap:nowrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:calc(var(--srem)*.25)}.gap-2{gap:calc(var(--srem)*.5)}.gap-2\\.5{gap:calc(var(--srem)*.625)}.gap-4{gap:calc(var(--srem)*1)}.gap-6{gap:calc(var(--srem)*1.5)}.gap-9{gap:calc(var(--srem)*2.25)}.gap-x-1{-moz-column-gap:calc(var(--srem)*.25);column-gap:calc(var(--srem)*.25)}.self-center{align-self:center}.self-baseline{align-self:baseline}.overflow-hidden{overflow:hidden}.overflow-visible{overflow:visible}.overflow-y-auto{overflow-y:auto}.rounded-2xl{border-radius:calc(var(--srem)*1)}.rounded-3xl{border-radius:calc(var(--srem)*1.5)}.rounded-\\[10px\\]{border-radius:10px}.rounded-\\[4px\\]{border-radius:4px}.rounded-\\[8px\\]{border-radius:8px}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:calc(var(--srem)*.5)}.rounded-b-xl{border-bottom-left-radius:calc(var(--srem)*.75);border-bottom-right-radius:calc(var(--srem)*.75)}.border{border-width:1px}.border-0{border-width:0}.border-b-\\[1px\\]{border-bottom-width:1px}.border-solid{border-style:solid}.border-none{border-style:none}.border-sp-exp5-gray{--tw-border-opacity:1;border-color:rgb(224 227 238/var(--tw-border-opacity,1))}.border-b-sp-exp5-light-gray{--tw-border-opacity:1;border-bottom-color:rgb(239 241 245/var(--tw-border-opacity,1))}.bg-black\\/50{background-color:#00000080}.bg-sp-exp5-black{--tw-bg-opacity:1;background-color:rgb(39 39 39/var(--tw-bg-opacity,1))}.bg-sp-exp5-light-gray{--tw-bg-opacity:1;background-color:rgb(239 241 245/var(--tw-bg-opacity,1))}.bg-sp-lilla-1{--tw-bg-opacity:1;background-color:rgb(235 235 255/var(--tw-bg-opacity,1))}.bg-sp-primary-blue{--tw-bg-opacity:1;background-color:rgb(86 102 240/var(--tw-bg-opacity,1))}.bg-sp-primary-pink{--tw-bg-opacity:1;background-color:rgb(249 220 222/var(--tw-bg-opacity,1))}.bg-sp-white-1{--tw-bg-opacity:1;background-color:rgb(246 247 251/var(--tw-bg-opacity,1))}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity,1))}.p-0{padding:0}.p-1{padding:calc(var(--srem)*.25)}.p-2{padding:calc(var(--srem)*.5)}.p-3{padding:calc(var(--srem)*.75)}.p-4{padding:calc(var(--srem)*1)}.p-\\[12px\\]{padding:12px}.p-\\[4px\\]{padding:4px}.px-1{padding-left:calc(var(--srem)*.25);padding-right:calc(var(--srem)*.25)}.px-20{padding-left:calc(var(--srem)*5);padding-right:calc(var(--srem)*5)}.px-3{padding-left:calc(var(--srem)*.75);padding-right:calc(var(--srem)*.75)}.px-4{padding-left:calc(var(--srem)*1);padding-right:calc(var(--srem)*1)}.py-1{padding-bottom:calc(var(--srem)*.25);padding-top:calc(var(--srem)*.25)}.py-2{padding-bottom:calc(var(--srem)*.5);padding-top:calc(var(--srem)*.5)}.py-2\\.5{padding-bottom:calc(var(--srem)*.625);padding-top:calc(var(--srem)*.625)}.py-4{padding-bottom:calc(var(--srem)*1);padding-top:calc(var(--srem)*1)}.py-\\[4px\\]{padding-bottom:4px;padding-top:4px}.pb-0{padding-bottom:0}.pb-12{padding-bottom:calc(var(--srem)*3)}.pb-16{padding-bottom:calc(var(--srem)*4)}.pb-2{padding-bottom:calc(var(--srem)*.5)}.pb-3{padding-bottom:calc(var(--srem)*.75)}.pb-4{padding-bottom:calc(var(--srem)*1)}.pb-\\[12px\\]{padding-bottom:12px}.pl-0{padding-left:0}.pl-2{padding-left:calc(var(--srem)*.5)}.pl-4{padding-left:calc(var(--srem)*1)}.pl-\\[4px\\]{padding-left:4px}.pr-1{padding-right:calc(var(--srem)*.25)}.pr-3{padding-right:calc(var(--srem)*.75)}.pr-\\[8px\\]{padding-right:8px}.pt-2{padding-top:calc(var(--srem)*.5)}.pt-6{padding-top:calc(var(--srem)*1.5)}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.align-super{vertical-align:super}.font-scalapay-poppins{font-family:Scalapay Poppins,Poppins,ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.\\!text{font-size:calc(var(--srem)*1)!important}.text{font-size:calc(var(--srem)*1)}.text-2xs{font-size:calc(var(--srem)*.7);line-height:calc(var(--srem)*1)}.text-3xl{font-size:calc(var(--srem)*1.875);line-height:calc(var(--srem)*2.25)}.text-\\[11px\\]{font-size:11px}.text-\\[19px\\]{font-size:19px}.text-base{font-size:calc(var(--srem)*1);line-height:calc(var(--srem)*1.5)}.text-lg{font-size:calc(var(--srem)*1.125);line-height:calc(var(--srem)*1.75)}.text-sm{font-size:calc(var(--srem)*.875);line-height:calc(var(--srem)*1.25)}.text-xl{font-size:calc(var(--srem)*1.25);line-height:calc(var(--srem)*1.75)}.text-xs{line-height:calc(var(--srem)*1)}.text-xs,.text-xs\\/5{font-size:calc(var(--srem)*.75)}.text-xs\\/5{line-height:calc(var(--srem)*1.25)}.font-bold{font-weight:700}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.lowercase{text-transform:lowercase}.leading-4{line-height:calc(var(--srem)*1)}.leading-6{line-height:calc(var(--srem)*1.5)}.leading-8{line-height:calc(var(--srem)*2)}.leading-\\[21px\\]{line-height:21px}.text-black{--tw-text-opacity:1;color:rgb(0 0 0/var(--tw-text-opacity,1))}.text-gray-500{--tw-text-opacity:1;color:rgb(107 114 128/var(--tw-text-opacity,1))}.text-gray-700{--tw-text-opacity:1;color:rgb(55 65 81/var(--tw-text-opacity,1))}.text-gray-900{--tw-text-opacity:1;color:rgb(17 24 39/var(--tw-text-opacity,1))}.text-sp-exp5-black{--tw-text-opacity:1;color:rgb(39 39 39/var(--tw-text-opacity,1))}.text-sp-exp5-dark-gray{--tw-text-opacity:1;color:rgb(46 51 55/var(--tw-text-opacity,1))}.text-sp-exp5-light-gray-2{--tw-text-opacity:1;color:rgb(109 113 131/var(--tw-text-opacity,1))}.text-sp-exp5-pink{--tw-text-opacity:1;color:rgb(243 185 188/var(--tw-text-opacity,1))}.text-sp-light-gray-1{--tw-text-opacity:1;color:rgb(117 121 135/var(--tw-text-opacity,1))}.text-sp-light-gray-2{--tw-text-opacity:1;color:rgb(166 169 178/var(--tw-text-opacity,1))}.text-sp-primary-gray{--tw-text-opacity:1;color:rgb(74 77 90/var(--tw-text-opacity,1))}.text-sp-white-2{--tw-text-opacity:1;color:rgb(209 211 216/var(--tw-text-opacity,1))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.underline{text-decoration-line:underline}.no-underline{text-decoration-line:none}.decoration-solid{text-decoration-style:solid}.decoration-\\[15\\%\\]{text-decoration-thickness:15%}.underline-offset-\\[20\\%\\]{text-underline-offset:20%}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-colors{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-none{transition-property:none}.transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.duration-300{transition-duration:.3s}:host,:root{--srem:14px;--sp-primary-gray:#4a4d5a;--sp-primary-blue:#5666f0;--sp-light-gray-1:#757987;--bg-white:#fff;--bg-transparent:transparent;--bg-gradient-logo:linear-gradient(90deg,#fae0e6 27.08%,#bbe4ff);--sp-white-1:#f6f7fb}.hover\\:bg-sp-blue-1:hover{--tw-bg-opacity:1;background-color:rgb(70 74 229/var(--tw-bg-opacity,1))}.hover\\:bg-sp-pink-1:hover{--tw-bg-opacity:1;background-color:rgb(251 210 212/var(--tw-bg-opacity,1))}.hover\\:text-sp-primary-blue:hover{--tw-text-opacity:1;color:rgb(86 102 240/var(--tw-text-opacity,1))}@media (min-width:361px){.min-\\[361px\\]\\:w-auto{width:auto}}@media (min-width:450px){.min-\\[450px\\]\\:max-w-sp-exp5-modal{max-width:min(80vw,440px)}.min-\\[450px\\]\\:max-w-sp-modal{max-width:min(80vw,375px)}}';
var In = function(e, t) {
  return In = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
    n.__proto__ = a;
  } || function(n, a) {
    for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (n[r] = a[r]);
  }, In(e, t);
};
function ye(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  In(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var L = function() {
  return L = Object.assign || function(t) {
    for (var n, a = 1, r = arguments.length; a < r; a++) {
      n = arguments[a];
      for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, L.apply(this, arguments);
};
function Is(e, t) {
  var n = {};
  for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, a = Object.getOwnPropertySymbols(e); r < a.length; r++)
      t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]]);
  return n;
}
function se(e, t, n) {
  if (n || arguments.length === 2) for (var a = 0, r = t.length, i; a < r; a++)
    (i || !(a in t)) && (i || (i = Array.prototype.slice.call(t, 0, a)), i[a] = t[a]);
  return e.concat(i || Array.prototype.slice.call(t));
}
function ne(e, t) {
  var n = t && t.cache ? t.cache : Ns, a = t && t.serializer ? t.serializer : ks, r = t && t.strategy ? t.strategy : Ps;
  return r(e, {
    cache: n,
    serializer: a
  });
}
function As(e) {
  return e == null || typeof e == "number" || typeof e == "boolean";
}
function Ss(e, t, n, a) {
  var r = As(a) ? a : n(a), i = t.get(r);
  return typeof i > "u" && (i = e.call(this, a), t.set(r, i)), i;
}
function cr(e, t, n) {
  var a = Array.prototype.slice.call(arguments, 3), r = n(a), i = t.get(r);
  return typeof i > "u" && (i = e.apply(this, a), t.set(r, i)), i;
}
function ur(e, t, n, a, r) {
  return n.bind(t, e, a, r);
}
function Ps(e, t) {
  var n = e.length === 1 ? Ss : cr;
  return ur(e, this, n, t.cache.create(), t.serializer);
}
function Es(e, t) {
  return ur(e, this, cr, t.cache.create(), t.serializer);
}
var ks = function() {
  return JSON.stringify(arguments);
};
function Yn() {
  this.cache = /* @__PURE__ */ Object.create(null);
}
Yn.prototype.get = function(e) {
  return this.cache[e];
};
Yn.prototype.set = function(e, t) {
  this.cache[e] = t;
};
var Ns = {
  create: function() {
    return new Yn();
  }
}, ae = {
  variadic: Es
}, F;
(function(e) {
  e[e.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", e[e.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", e[e.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", e[e.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", e[e.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", e[e.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", e[e.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", e[e.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", e[e.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", e[e.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", e[e.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", e[e.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", e[e.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", e[e.INVALID_TAG = 23] = "INVALID_TAG", e[e.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", e[e.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", e[e.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
})(F || (F = {}));
var Y;
(function(e) {
  e[e.literal = 0] = "literal", e[e.argument = 1] = "argument", e[e.number = 2] = "number", e[e.date = 3] = "date", e[e.time = 4] = "time", e[e.select = 5] = "select", e[e.plural = 6] = "plural", e[e.pound = 7] = "pound", e[e.tag = 8] = "tag";
})(Y || (Y = {}));
var et;
(function(e) {
  e[e.number = 0] = "number", e[e.dateTime = 1] = "dateTime";
})(et || (et = {}));
function ua(e) {
  return e.type === Y.literal;
}
function Ts(e) {
  return e.type === Y.argument;
}
function dr(e) {
  return e.type === Y.number;
}
function mr(e) {
  return e.type === Y.date;
}
function _r(e) {
  return e.type === Y.time;
}
function pr(e) {
  return e.type === Y.select;
}
function hr(e) {
  return e.type === Y.plural;
}
function Ls(e) {
  return e.type === Y.pound;
}
function fr(e) {
  return e.type === Y.tag;
}
function gr(e) {
  return !!(e && typeof e == "object" && e.type === et.number);
}
function An(e) {
  return !!(e && typeof e == "object" && e.type === et.dateTime);
}
var yr = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/, Hs = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function Ms(e) {
  var t = {};
  return e.replace(Hs, function(n) {
    var a = n.length;
    switch (n[0]) {
      // Era
      case "G":
        t.era = a === 4 ? "long" : a === 5 ? "narrow" : "short";
        break;
      // Year
      case "y":
        t.year = a === 2 ? "2-digit" : "numeric";
        break;
      case "Y":
      case "u":
      case "U":
      case "r":
        throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
      // Quarter
      case "q":
      case "Q":
        throw new RangeError("`q/Q` (quarter) patterns are not supported");
      // Month
      case "M":
      case "L":
        t.month = ["numeric", "2-digit", "short", "long", "narrow"][a - 1];
        break;
      // Week
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        t.day = ["numeric", "2-digit"][a - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      // Weekday
      case "E":
        t.weekday = a === 4 ? "long" : a === 5 ? "narrow" : "short";
        break;
      case "e":
        if (a < 4)
          throw new RangeError("`e..eee` (weekday) patterns are not supported");
        t.weekday = ["short", "long", "narrow", "short"][a - 4];
        break;
      case "c":
        if (a < 4)
          throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        t.weekday = ["short", "long", "narrow", "short"][a - 4];
        break;
      // Period
      case "a":
        t.hour12 = !0;
        break;
      case "b":
      // am, pm, noon, midnight
      case "B":
        throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
      // Hour
      case "h":
        t.hourCycle = "h12", t.hour = ["numeric", "2-digit"][a - 1];
        break;
      case "H":
        t.hourCycle = "h23", t.hour = ["numeric", "2-digit"][a - 1];
        break;
      case "K":
        t.hourCycle = "h11", t.hour = ["numeric", "2-digit"][a - 1];
        break;
      case "k":
        t.hourCycle = "h24", t.hour = ["numeric", "2-digit"][a - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      // Minute
      case "m":
        t.minute = ["numeric", "2-digit"][a - 1];
        break;
      // Second
      case "s":
        t.second = ["numeric", "2-digit"][a - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      // Zone
      case "z":
        t.timeZoneName = a < 4 ? "short" : "long";
        break;
      case "Z":
      // 1..3, 4, 5: The ISO8601 varios formats
      case "O":
      // 1, 4: milliseconds in day short, long
      case "v":
      // 1, 4: generic non-location format
      case "V":
      // 1, 2, 3, 4: time zone ID or city
      case "X":
      // 1, 2, 3, 4: The ISO8601 varios formats
      case "x":
        throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
    }
    return "";
  }), t;
}
var Os = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function Rs(e) {
  if (e.length === 0)
    throw new Error("Number skeleton cannot be empty");
  for (var t = e.split(Os).filter(function(m) {
    return m.length > 0;
  }), n = [], a = 0, r = t; a < r.length; a++) {
    var i = r[a], s = i.split("/");
    if (s.length === 0)
      throw new Error("Invalid number skeleton");
    for (var o = s[0], l = s.slice(1), c = 0, u = l; c < u.length; c++) {
      var d = u[c];
      if (d.length === 0)
        throw new Error("Invalid number skeleton");
    }
    n.push({ stem: o, options: l });
  }
  return n;
}
function Vs(e) {
  return e.replace(/^(.*?)-/, "");
}
var da = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g, xr = /^(@+)?(\+|#+)?[rs]?$/g, Fs = /(\*)(0+)|(#+)(0+)|(0+)/g, br = /^(0+)$/;
function ma(e) {
  var t = {};
  return e[e.length - 1] === "r" ? t.roundingPriority = "morePrecision" : e[e.length - 1] === "s" && (t.roundingPriority = "lessPrecision"), e.replace(xr, function(n, a, r) {
    return typeof r != "string" ? (t.minimumSignificantDigits = a.length, t.maximumSignificantDigits = a.length) : r === "+" ? t.minimumSignificantDigits = a.length : a[0] === "#" ? t.maximumSignificantDigits = a.length : (t.minimumSignificantDigits = a.length, t.maximumSignificantDigits = a.length + (typeof r == "string" ? r.length : 0)), "";
  }), t;
}
function wr(e) {
  switch (e) {
    case "sign-auto":
      return {
        signDisplay: "auto"
      };
    case "sign-accounting":
    case "()":
      return {
        currencySign: "accounting"
      };
    case "sign-always":
    case "+!":
      return {
        signDisplay: "always"
      };
    case "sign-accounting-always":
    case "()!":
      return {
        signDisplay: "always",
        currencySign: "accounting"
      };
    case "sign-except-zero":
    case "+?":
      return {
        signDisplay: "exceptZero"
      };
    case "sign-accounting-except-zero":
    case "()?":
      return {
        signDisplay: "exceptZero",
        currencySign: "accounting"
      };
    case "sign-never":
    case "+_":
      return {
        signDisplay: "never"
      };
  }
}
function Ds(e) {
  var t;
  if (e[0] === "E" && e[1] === "E" ? (t = {
    notation: "engineering"
  }, e = e.slice(2)) : e[0] === "E" && (t = {
    notation: "scientific"
  }, e = e.slice(1)), t) {
    var n = e.slice(0, 2);
    if (n === "+!" ? (t.signDisplay = "always", e = e.slice(2)) : n === "+?" && (t.signDisplay = "exceptZero", e = e.slice(2)), !br.test(e))
      throw new Error("Malformed concise eng/scientific notation");
    t.minimumIntegerDigits = e.length;
  }
  return t;
}
function _a(e) {
  var t = {}, n = wr(e);
  return n || t;
}
function Bs(e) {
  for (var t = {}, n = 0, a = e; n < a.length; n++) {
    var r = a[n];
    switch (r.stem) {
      case "percent":
      case "%":
        t.style = "percent";
        continue;
      case "%x100":
        t.style = "percent", t.scale = 100;
        continue;
      case "currency":
        t.style = "currency", t.currency = r.options[0];
        continue;
      case "group-off":
      case ",_":
        t.useGrouping = !1;
        continue;
      case "precision-integer":
      case ".":
        t.maximumFractionDigits = 0;
        continue;
      case "measure-unit":
      case "unit":
        t.style = "unit", t.unit = Vs(r.options[0]);
        continue;
      case "compact-short":
      case "K":
        t.notation = "compact", t.compactDisplay = "short";
        continue;
      case "compact-long":
      case "KK":
        t.notation = "compact", t.compactDisplay = "long";
        continue;
      case "scientific":
        t = L(L(L({}, t), { notation: "scientific" }), r.options.reduce(function(l, c) {
          return L(L({}, l), _a(c));
        }, {}));
        continue;
      case "engineering":
        t = L(L(L({}, t), { notation: "engineering" }), r.options.reduce(function(l, c) {
          return L(L({}, l), _a(c));
        }, {}));
        continue;
      case "notation-simple":
        t.notation = "standard";
        continue;
      // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
      case "unit-width-narrow":
        t.currencyDisplay = "narrowSymbol", t.unitDisplay = "narrow";
        continue;
      case "unit-width-short":
        t.currencyDisplay = "code", t.unitDisplay = "short";
        continue;
      case "unit-width-full-name":
        t.currencyDisplay = "name", t.unitDisplay = "long";
        continue;
      case "unit-width-iso-code":
        t.currencyDisplay = "symbol";
        continue;
      case "scale":
        t.scale = parseFloat(r.options[0]);
        continue;
      case "rounding-mode-floor":
        t.roundingMode = "floor";
        continue;
      case "rounding-mode-ceiling":
        t.roundingMode = "ceil";
        continue;
      case "rounding-mode-down":
        t.roundingMode = "trunc";
        continue;
      case "rounding-mode-up":
        t.roundingMode = "expand";
        continue;
      case "rounding-mode-half-even":
        t.roundingMode = "halfEven";
        continue;
      case "rounding-mode-half-down":
        t.roundingMode = "halfTrunc";
        continue;
      case "rounding-mode-half-up":
        t.roundingMode = "halfExpand";
        continue;
      // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
      case "integer-width":
        if (r.options.length > 1)
          throw new RangeError("integer-width stems only accept a single optional option");
        r.options[0].replace(Fs, function(l, c, u, d, m, _) {
          if (c)
            t.minimumIntegerDigits = u.length;
          else {
            if (d && m)
              throw new Error("We currently do not support maximum integer digits");
            if (_)
              throw new Error("We currently do not support exact integer digits");
          }
          return "";
        });
        continue;
    }
    if (br.test(r.stem)) {
      t.minimumIntegerDigits = r.stem.length;
      continue;
    }
    if (da.test(r.stem)) {
      if (r.options.length > 1)
        throw new RangeError("Fraction-precision stems only accept a single optional option");
      r.stem.replace(da, function(l, c, u, d, m, _) {
        return u === "*" ? t.minimumFractionDigits = c.length : d && d[0] === "#" ? t.maximumFractionDigits = d.length : m && _ ? (t.minimumFractionDigits = m.length, t.maximumFractionDigits = m.length + _.length) : (t.minimumFractionDigits = c.length, t.maximumFractionDigits = c.length), "";
      });
      var i = r.options[0];
      i === "w" ? t = L(L({}, t), { trailingZeroDisplay: "stripIfInteger" }) : i && (t = L(L({}, t), ma(i)));
      continue;
    }
    if (xr.test(r.stem)) {
      t = L(L({}, t), ma(r.stem));
      continue;
    }
    var s = wr(r.stem);
    s && (t = L(L({}, t), s));
    var o = Ds(r.stem);
    o && (t = L(L({}, t), o));
  }
  return t;
}
var Lt = {
  "001": [
    "H",
    "h"
  ],
  419: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  AC: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  AD: [
    "H",
    "hB"
  ],
  AE: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  AF: [
    "H",
    "hb",
    "hB",
    "h"
  ],
  AG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  AI: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  AL: [
    "h",
    "H",
    "hB"
  ],
  AM: [
    "H",
    "hB"
  ],
  AO: [
    "H",
    "hB"
  ],
  AR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  AS: [
    "h",
    "H"
  ],
  AT: [
    "H",
    "hB"
  ],
  AU: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  AW: [
    "H",
    "hB"
  ],
  AX: [
    "H"
  ],
  AZ: [
    "H",
    "hB",
    "h"
  ],
  BA: [
    "H",
    "hB",
    "h"
  ],
  BB: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BD: [
    "h",
    "hB",
    "H"
  ],
  BE: [
    "H",
    "hB"
  ],
  BF: [
    "H",
    "hB"
  ],
  BG: [
    "H",
    "hB",
    "h"
  ],
  BH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  BI: [
    "H",
    "h"
  ],
  BJ: [
    "H",
    "hB"
  ],
  BL: [
    "H",
    "hB"
  ],
  BM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BN: [
    "hb",
    "hB",
    "h",
    "H"
  ],
  BO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  BQ: [
    "H"
  ],
  BR: [
    "H",
    "hB"
  ],
  BS: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BT: [
    "h",
    "H"
  ],
  BW: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  BY: [
    "H",
    "h"
  ],
  BZ: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CA: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  CC: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CD: [
    "hB",
    "H"
  ],
  CF: [
    "H",
    "h",
    "hB"
  ],
  CG: [
    "H",
    "hB"
  ],
  CH: [
    "H",
    "hB",
    "h"
  ],
  CI: [
    "H",
    "hB"
  ],
  CK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CL: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  CM: [
    "H",
    "h",
    "hB"
  ],
  CN: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  CO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  CP: [
    "H"
  ],
  CR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  CU: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  CV: [
    "H",
    "hB"
  ],
  CW: [
    "H",
    "hB"
  ],
  CX: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CY: [
    "h",
    "H",
    "hb",
    "hB"
  ],
  CZ: [
    "H"
  ],
  DE: [
    "H",
    "hB"
  ],
  DG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  DJ: [
    "h",
    "H"
  ],
  DK: [
    "H"
  ],
  DM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  DO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  DZ: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  EA: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  EC: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  EE: [
    "H",
    "hB"
  ],
  EG: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  EH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  ER: [
    "h",
    "H"
  ],
  ES: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  ET: [
    "hB",
    "hb",
    "h",
    "H"
  ],
  FI: [
    "H"
  ],
  FJ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  FK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  FM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  FO: [
    "H",
    "h"
  ],
  FR: [
    "H",
    "hB"
  ],
  GA: [
    "H",
    "hB"
  ],
  GB: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GD: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GE: [
    "H",
    "hB",
    "h"
  ],
  GF: [
    "H",
    "hB"
  ],
  GG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GH: [
    "h",
    "H"
  ],
  GI: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GL: [
    "H",
    "h"
  ],
  GM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GN: [
    "H",
    "hB"
  ],
  GP: [
    "H",
    "hB"
  ],
  GQ: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  GR: [
    "h",
    "H",
    "hb",
    "hB"
  ],
  GT: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  GU: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GW: [
    "H",
    "hB"
  ],
  GY: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  HK: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  HN: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  HR: [
    "H",
    "hB"
  ],
  HU: [
    "H",
    "h"
  ],
  IC: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  ID: [
    "H"
  ],
  IE: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IL: [
    "H",
    "hB"
  ],
  IM: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IN: [
    "h",
    "H"
  ],
  IO: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IQ: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  IR: [
    "hB",
    "H"
  ],
  IS: [
    "H"
  ],
  IT: [
    "H",
    "hB"
  ],
  JE: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  JM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  JO: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  JP: [
    "H",
    "K",
    "h"
  ],
  KE: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  KG: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  KH: [
    "hB",
    "h",
    "H",
    "hb"
  ],
  KI: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KM: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  KN: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KP: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  KR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  KW: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  KY: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KZ: [
    "H",
    "hB"
  ],
  LA: [
    "H",
    "hb",
    "hB",
    "h"
  ],
  LB: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  LC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  LI: [
    "H",
    "hB",
    "h"
  ],
  LK: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  LR: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  LS: [
    "h",
    "H"
  ],
  LT: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  LU: [
    "H",
    "h",
    "hB"
  ],
  LV: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  LY: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MA: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  MC: [
    "H",
    "hB"
  ],
  MD: [
    "H",
    "hB"
  ],
  ME: [
    "H",
    "hB",
    "h"
  ],
  MF: [
    "H",
    "hB"
  ],
  MG: [
    "H",
    "h"
  ],
  MH: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  ML: [
    "H"
  ],
  MM: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  MN: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  MO: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MP: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MQ: [
    "H",
    "hB"
  ],
  MR: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MS: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  MT: [
    "H",
    "h"
  ],
  MU: [
    "H",
    "h"
  ],
  MV: [
    "H",
    "h"
  ],
  MW: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MX: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  MY: [
    "hb",
    "hB",
    "h",
    "H"
  ],
  MZ: [
    "H",
    "hB"
  ],
  NA: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  NC: [
    "H",
    "hB"
  ],
  NE: [
    "H"
  ],
  NF: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NI: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  NL: [
    "H",
    "hB"
  ],
  NO: [
    "H",
    "h"
  ],
  NP: [
    "H",
    "h",
    "hB"
  ],
  NR: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NU: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NZ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  OM: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PA: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PE: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PF: [
    "H",
    "h",
    "hB"
  ],
  PG: [
    "h",
    "H"
  ],
  PH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PK: [
    "h",
    "hB",
    "H"
  ],
  PL: [
    "H",
    "h"
  ],
  PM: [
    "H",
    "hB"
  ],
  PN: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  PR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PS: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PT: [
    "H",
    "hB"
  ],
  PW: [
    "h",
    "H"
  ],
  PY: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  QA: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  RE: [
    "H",
    "hB"
  ],
  RO: [
    "H",
    "hB"
  ],
  RS: [
    "H",
    "hB",
    "h"
  ],
  RU: [
    "H"
  ],
  RW: [
    "H",
    "h"
  ],
  SA: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SB: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SC: [
    "H",
    "h",
    "hB"
  ],
  SD: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SE: [
    "H"
  ],
  SG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SH: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  SI: [
    "H",
    "hB"
  ],
  SJ: [
    "H"
  ],
  SK: [
    "H"
  ],
  SL: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SM: [
    "H",
    "h",
    "hB"
  ],
  SN: [
    "H",
    "h",
    "hB"
  ],
  SO: [
    "h",
    "H"
  ],
  SR: [
    "H",
    "hB"
  ],
  SS: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  ST: [
    "H",
    "hB"
  ],
  SV: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  SX: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  SY: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SZ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TA: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  TC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TD: [
    "h",
    "H",
    "hB"
  ],
  TF: [
    "H",
    "h",
    "hB"
  ],
  TG: [
    "H",
    "hB"
  ],
  TH: [
    "H",
    "h"
  ],
  TJ: [
    "H",
    "h"
  ],
  TL: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  TM: [
    "H",
    "h"
  ],
  TN: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  TO: [
    "h",
    "H"
  ],
  TR: [
    "H",
    "hB"
  ],
  TT: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TW: [
    "hB",
    "hb",
    "h",
    "H"
  ],
  TZ: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  UA: [
    "H",
    "hB",
    "h"
  ],
  UG: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  UM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  US: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  UY: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  UZ: [
    "H",
    "hB",
    "h"
  ],
  VA: [
    "H",
    "h",
    "hB"
  ],
  VC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VE: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  VG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VI: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VN: [
    "H",
    "h"
  ],
  VU: [
    "h",
    "H"
  ],
  WF: [
    "H",
    "hB"
  ],
  WS: [
    "h",
    "H"
  ],
  XK: [
    "H",
    "hB",
    "h"
  ],
  YE: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  YT: [
    "H",
    "hB"
  ],
  ZA: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  ZM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  ZW: [
    "H",
    "h"
  ],
  "af-ZA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "ar-001": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "ca-ES": [
    "H",
    "h",
    "hB"
  ],
  "en-001": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "en-HK": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "en-IL": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "en-MY": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "es-BR": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-ES": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-GQ": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "fr-CA": [
    "H",
    "h",
    "hB"
  ],
  "gl-ES": [
    "H",
    "h",
    "hB"
  ],
  "gu-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "hi-IN": [
    "hB",
    "h",
    "H"
  ],
  "it-CH": [
    "H",
    "h",
    "hB"
  ],
  "it-IT": [
    "H",
    "h",
    "hB"
  ],
  "kn-IN": [
    "hB",
    "h",
    "H"
  ],
  "ml-IN": [
    "hB",
    "h",
    "H"
  ],
  "mr-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "pa-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "ta-IN": [
    "hB",
    "h",
    "hb",
    "H"
  ],
  "te-IN": [
    "hB",
    "h",
    "H"
  ],
  "zu-ZA": [
    "H",
    "hB",
    "hb",
    "h"
  ]
};
function Us(e, t) {
  for (var n = "", a = 0; a < e.length; a++) {
    var r = e.charAt(a);
    if (r === "j") {
      for (var i = 0; a + 1 < e.length && e.charAt(a + 1) === r; )
        i++, a++;
      var s = 1 + (i & 1), o = i < 2 ? 1 : 3 + (i >> 1), l = "a", c = zs(t);
      for ((c == "H" || c == "k") && (o = 0); o-- > 0; )
        n += l;
      for (; s-- > 0; )
        n = c + n;
    } else r === "J" ? n += "H" : n += r;
  }
  return n;
}
function zs(e) {
  var t = e.hourCycle;
  if (t === void 0 && // @ts-ignore hourCycle(s) is not identified yet
  e.hourCycles && // @ts-ignore
  e.hourCycles.length && (t = e.hourCycles[0]), t)
    switch (t) {
      case "h24":
        return "k";
      case "h23":
        return "H";
      case "h12":
        return "h";
      case "h11":
        return "K";
      default:
        throw new Error("Invalid hourCycle");
    }
  var n = e.language, a;
  n !== "root" && (a = e.maximize().region);
  var r = Lt[a || ""] || Lt[n || ""] || Lt["".concat(n, "-001")] || Lt["001"];
  return r[0];
}
var mn, Ws = new RegExp("^".concat(yr.source, "*")), Ys = new RegExp("".concat(yr.source, "*$"));
function D(e, t) {
  return { start: e, end: t };
}
var Zs = !!String.prototype.startsWith && "_a".startsWith("a", 1), $s = !!String.fromCodePoint, Gs = !!Object.fromEntries, js = !!String.prototype.codePointAt, qs = !!String.prototype.trimStart, Ks = !!String.prototype.trimEnd, Xs = !!Number.isSafeInteger, Js = Xs ? Number.isSafeInteger : function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e && Math.abs(e) <= 9007199254740991;
}, Sn = !0;
try {
  var Qs = vr("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  Sn = ((mn = Qs.exec("a")) === null || mn === void 0 ? void 0 : mn[0]) === "a";
} catch {
  Sn = !1;
}
var pa = Zs ? (
  // Native
  function(t, n, a) {
    return t.startsWith(n, a);
  }
) : (
  // For IE11
  function(t, n, a) {
    return t.slice(a, a + n.length) === n;
  }
), Pn = $s ? String.fromCodePoint : (
  // IE11
  function() {
    for (var t = [], n = 0; n < arguments.length; n++)
      t[n] = arguments[n];
    for (var a = "", r = t.length, i = 0, s; r > i; ) {
      if (s = t[i++], s > 1114111)
        throw RangeError(s + " is not a valid code point");
      a += s < 65536 ? String.fromCharCode(s) : String.fromCharCode(((s -= 65536) >> 10) + 55296, s % 1024 + 56320);
    }
    return a;
  }
), ha = (
  // native
  Gs ? Object.fromEntries : (
    // Ponyfill
    function(t) {
      for (var n = {}, a = 0, r = t; a < r.length; a++) {
        var i = r[a], s = i[0], o = i[1];
        n[s] = o;
      }
      return n;
    }
  )
), Cr = js ? (
  // Native
  function(t, n) {
    return t.codePointAt(n);
  }
) : (
  // IE 11
  function(t, n) {
    var a = t.length;
    if (!(n < 0 || n >= a)) {
      var r = t.charCodeAt(n), i;
      return r < 55296 || r > 56319 || n + 1 === a || (i = t.charCodeAt(n + 1)) < 56320 || i > 57343 ? r : (r - 55296 << 10) + (i - 56320) + 65536;
    }
  }
), eo = qs ? (
  // Native
  function(t) {
    return t.trimStart();
  }
) : (
  // Ponyfill
  function(t) {
    return t.replace(Ws, "");
  }
), to = Ks ? (
  // Native
  function(t) {
    return t.trimEnd();
  }
) : (
  // Ponyfill
  function(t) {
    return t.replace(Ys, "");
  }
);
function vr(e, t) {
  return new RegExp(e, t);
}
var En;
if (Sn) {
  var fa = vr("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  En = function(t, n) {
    var a;
    fa.lastIndex = n;
    var r = fa.exec(t);
    return (a = r[1]) !== null && a !== void 0 ? a : "";
  };
} else
  En = function(t, n) {
    for (var a = []; ; ) {
      var r = Cr(t, n);
      if (r === void 0 || Ir(r) || io(r))
        break;
      a.push(r), n += r >= 65536 ? 2 : 1;
    }
    return Pn.apply(void 0, a);
  };
var no = (
  /** @class */
  function() {
    function e(t, n) {
      n === void 0 && (n = {}), this.message = t, this.position = { offset: 0, line: 1, column: 1 }, this.ignoreTag = !!n.ignoreTag, this.locale = n.locale, this.requiresOtherClause = !!n.requiresOtherClause, this.shouldParseSkeletons = !!n.shouldParseSkeletons;
    }
    return e.prototype.parse = function() {
      if (this.offset() !== 0)
        throw Error("parser can only be used once");
      return this.parseMessage(0, "", !1);
    }, e.prototype.parseMessage = function(t, n, a) {
      for (var r = []; !this.isEOF(); ) {
        var i = this.char();
        if (i === 123) {
          var s = this.parseArgument(t, a);
          if (s.err)
            return s;
          r.push(s.val);
        } else {
          if (i === 125 && t > 0)
            break;
          if (i === 35 && (n === "plural" || n === "selectordinal")) {
            var o = this.clonePosition();
            this.bump(), r.push({
              type: Y.pound,
              location: D(o, this.clonePosition())
            });
          } else if (i === 60 && !this.ignoreTag && this.peek() === 47) {
            if (a)
              break;
            return this.error(F.UNMATCHED_CLOSING_TAG, D(this.clonePosition(), this.clonePosition()));
          } else if (i === 60 && !this.ignoreTag && kn(this.peek() || 0)) {
            var s = this.parseTag(t, n);
            if (s.err)
              return s;
            r.push(s.val);
          } else {
            var s = this.parseLiteral(t, n);
            if (s.err)
              return s;
            r.push(s.val);
          }
        }
      }
      return { val: r, err: null };
    }, e.prototype.parseTag = function(t, n) {
      var a = this.clonePosition();
      this.bump();
      var r = this.parseTagName();
      if (this.bumpSpace(), this.bumpIf("/>"))
        return {
          val: {
            type: Y.literal,
            value: "<".concat(r, "/>"),
            location: D(a, this.clonePosition())
          },
          err: null
        };
      if (this.bumpIf(">")) {
        var i = this.parseMessage(t + 1, n, !0);
        if (i.err)
          return i;
        var s = i.val, o = this.clonePosition();
        if (this.bumpIf("</")) {
          if (this.isEOF() || !kn(this.char()))
            return this.error(F.INVALID_TAG, D(o, this.clonePosition()));
          var l = this.clonePosition(), c = this.parseTagName();
          return r !== c ? this.error(F.UNMATCHED_CLOSING_TAG, D(l, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
            val: {
              type: Y.tag,
              value: r,
              children: s,
              location: D(a, this.clonePosition())
            },
            err: null
          } : this.error(F.INVALID_TAG, D(o, this.clonePosition())));
        } else
          return this.error(F.UNCLOSED_TAG, D(a, this.clonePosition()));
      } else
        return this.error(F.INVALID_TAG, D(a, this.clonePosition()));
    }, e.prototype.parseTagName = function() {
      var t = this.offset();
      for (this.bump(); !this.isEOF() && ro(this.char()); )
        this.bump();
      return this.message.slice(t, this.offset());
    }, e.prototype.parseLiteral = function(t, n) {
      for (var a = this.clonePosition(), r = ""; ; ) {
        var i = this.tryParseQuote(n);
        if (i) {
          r += i;
          continue;
        }
        var s = this.tryParseUnquoted(t, n);
        if (s) {
          r += s;
          continue;
        }
        var o = this.tryParseLeftAngleBracket();
        if (o) {
          r += o;
          continue;
        }
        break;
      }
      var l = D(a, this.clonePosition());
      return {
        val: { type: Y.literal, value: r, location: l },
        err: null
      };
    }, e.prototype.tryParseLeftAngleBracket = function() {
      return !this.isEOF() && this.char() === 60 && (this.ignoreTag || // If at the opening tag or closing tag position, bail.
      !ao(this.peek() || 0)) ? (this.bump(), "<") : null;
    }, e.prototype.tryParseQuote = function(t) {
      if (this.isEOF() || this.char() !== 39)
        return null;
      switch (this.peek()) {
        case 39:
          return this.bump(), this.bump(), "'";
        // '{', '<', '>', '}'
        case 123:
        case 60:
        case 62:
        case 125:
          break;
        case 35:
          if (t === "plural" || t === "selectordinal")
            break;
          return null;
        default:
          return null;
      }
      this.bump();
      var n = [this.char()];
      for (this.bump(); !this.isEOF(); ) {
        var a = this.char();
        if (a === 39)
          if (this.peek() === 39)
            n.push(39), this.bump();
          else {
            this.bump();
            break;
          }
        else
          n.push(a);
        this.bump();
      }
      return Pn.apply(void 0, n);
    }, e.prototype.tryParseUnquoted = function(t, n) {
      if (this.isEOF())
        return null;
      var a = this.char();
      return a === 60 || a === 123 || a === 35 && (n === "plural" || n === "selectordinal") || a === 125 && t > 0 ? null : (this.bump(), Pn(a));
    }, e.prototype.parseArgument = function(t, n) {
      var a = this.clonePosition();
      if (this.bump(), this.bumpSpace(), this.isEOF())
        return this.error(F.EXPECT_ARGUMENT_CLOSING_BRACE, D(a, this.clonePosition()));
      if (this.char() === 125)
        return this.bump(), this.error(F.EMPTY_ARGUMENT, D(a, this.clonePosition()));
      var r = this.parseIdentifierIfPossible().value;
      if (!r)
        return this.error(F.MALFORMED_ARGUMENT, D(a, this.clonePosition()));
      if (this.bumpSpace(), this.isEOF())
        return this.error(F.EXPECT_ARGUMENT_CLOSING_BRACE, D(a, this.clonePosition()));
      switch (this.char()) {
        // Simple argument: `{name}`
        case 125:
          return this.bump(), {
            val: {
              type: Y.argument,
              // value does not include the opening and closing braces.
              value: r,
              location: D(a, this.clonePosition())
            },
            err: null
          };
        // Argument with options: `{name, format, ...}`
        case 44:
          return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(F.EXPECT_ARGUMENT_CLOSING_BRACE, D(a, this.clonePosition())) : this.parseArgumentOptions(t, n, r, a);
        default:
          return this.error(F.MALFORMED_ARGUMENT, D(a, this.clonePosition()));
      }
    }, e.prototype.parseIdentifierIfPossible = function() {
      var t = this.clonePosition(), n = this.offset(), a = En(this.message, n), r = n + a.length;
      this.bumpTo(r);
      var i = this.clonePosition(), s = D(t, i);
      return { value: a, location: s };
    }, e.prototype.parseArgumentOptions = function(t, n, a, r) {
      var i, s = this.clonePosition(), o = this.parseIdentifierIfPossible().value, l = this.clonePosition();
      switch (o) {
        case "":
          return this.error(F.EXPECT_ARGUMENT_TYPE, D(s, l));
        case "number":
        case "date":
        case "time": {
          this.bumpSpace();
          var c = null;
          if (this.bumpIf(",")) {
            this.bumpSpace();
            var u = this.clonePosition(), d = this.parseSimpleArgStyleIfPossible();
            if (d.err)
              return d;
            var m = to(d.val);
            if (m.length === 0)
              return this.error(F.EXPECT_ARGUMENT_STYLE, D(this.clonePosition(), this.clonePosition()));
            var _ = D(u, this.clonePosition());
            c = { style: m, styleLocation: _ };
          }
          var h = this.tryParseArgumentClose(r);
          if (h.err)
            return h;
          var f = D(r, this.clonePosition());
          if (c && pa(c == null ? void 0 : c.style, "::", 0)) {
            var x = eo(c.style.slice(2));
            if (o === "number") {
              var d = this.parseNumberSkeletonFromString(x, c.styleLocation);
              return d.err ? d : {
                val: { type: Y.number, value: a, location: f, style: d.val },
                err: null
              };
            } else {
              if (x.length === 0)
                return this.error(F.EXPECT_DATE_TIME_SKELETON, f);
              var S = x;
              this.locale && (S = Us(x, this.locale));
              var m = {
                type: et.dateTime,
                pattern: S,
                location: c.styleLocation,
                parsedOptions: this.shouldParseSkeletons ? Ms(S) : {}
              }, v = o === "date" ? Y.date : Y.time;
              return {
                val: { type: v, value: a, location: f, style: m },
                err: null
              };
            }
          }
          return {
            val: {
              type: o === "number" ? Y.number : o === "date" ? Y.date : Y.time,
              value: a,
              location: f,
              style: (i = c == null ? void 0 : c.style) !== null && i !== void 0 ? i : null
            },
            err: null
          };
        }
        case "plural":
        case "selectordinal":
        case "select": {
          var y = this.clonePosition();
          if (this.bumpSpace(), !this.bumpIf(","))
            return this.error(F.EXPECT_SELECT_ARGUMENT_OPTIONS, D(y, L({}, y)));
          this.bumpSpace();
          var b = this.parseIdentifierIfPossible(), w = 0;
          if (o !== "select" && b.value === "offset") {
            if (!this.bumpIf(":"))
              return this.error(F.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, D(this.clonePosition(), this.clonePosition()));
            this.bumpSpace();
            var d = this.tryParseDecimalInteger(F.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, F.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
            if (d.err)
              return d;
            this.bumpSpace(), b = this.parseIdentifierIfPossible(), w = d.val;
          }
          var A = this.tryParsePluralOrSelectOptions(t, o, n, b);
          if (A.err)
            return A;
          var h = this.tryParseArgumentClose(r);
          if (h.err)
            return h;
          var T = D(r, this.clonePosition());
          return o === "select" ? {
            val: {
              type: Y.select,
              value: a,
              options: ha(A.val),
              location: T
            },
            err: null
          } : {
            val: {
              type: Y.plural,
              value: a,
              options: ha(A.val),
              offset: w,
              pluralType: o === "plural" ? "cardinal" : "ordinal",
              location: T
            },
            err: null
          };
        }
        default:
          return this.error(F.INVALID_ARGUMENT_TYPE, D(s, l));
      }
    }, e.prototype.tryParseArgumentClose = function(t) {
      return this.isEOF() || this.char() !== 125 ? this.error(F.EXPECT_ARGUMENT_CLOSING_BRACE, D(t, this.clonePosition())) : (this.bump(), { val: !0, err: null });
    }, e.prototype.parseSimpleArgStyleIfPossible = function() {
      for (var t = 0, n = this.clonePosition(); !this.isEOF(); ) {
        var a = this.char();
        switch (a) {
          case 39: {
            this.bump();
            var r = this.clonePosition();
            if (!this.bumpUntil("'"))
              return this.error(F.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, D(r, this.clonePosition()));
            this.bump();
            break;
          }
          case 123: {
            t += 1, this.bump();
            break;
          }
          case 125: {
            if (t > 0)
              t -= 1;
            else
              return {
                val: this.message.slice(n.offset, this.offset()),
                err: null
              };
            break;
          }
          default:
            this.bump();
            break;
        }
      }
      return {
        val: this.message.slice(n.offset, this.offset()),
        err: null
      };
    }, e.prototype.parseNumberSkeletonFromString = function(t, n) {
      var a = [];
      try {
        a = Rs(t);
      } catch {
        return this.error(F.INVALID_NUMBER_SKELETON, n);
      }
      return {
        val: {
          type: et.number,
          tokens: a,
          location: n,
          parsedOptions: this.shouldParseSkeletons ? Bs(a) : {}
        },
        err: null
      };
    }, e.prototype.tryParsePluralOrSelectOptions = function(t, n, a, r) {
      for (var i, s = !1, o = [], l = /* @__PURE__ */ new Set(), c = r.value, u = r.location; ; ) {
        if (c.length === 0) {
          var d = this.clonePosition();
          if (n !== "select" && this.bumpIf("=")) {
            var m = this.tryParseDecimalInteger(F.EXPECT_PLURAL_ARGUMENT_SELECTOR, F.INVALID_PLURAL_ARGUMENT_SELECTOR);
            if (m.err)
              return m;
            u = D(d, this.clonePosition()), c = this.message.slice(d.offset, this.offset());
          } else
            break;
        }
        if (l.has(c))
          return this.error(n === "select" ? F.DUPLICATE_SELECT_ARGUMENT_SELECTOR : F.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, u);
        c === "other" && (s = !0), this.bumpSpace();
        var _ = this.clonePosition();
        if (!this.bumpIf("{"))
          return this.error(n === "select" ? F.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : F.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, D(this.clonePosition(), this.clonePosition()));
        var h = this.parseMessage(t + 1, n, a);
        if (h.err)
          return h;
        var f = this.tryParseArgumentClose(_);
        if (f.err)
          return f;
        o.push([
          c,
          {
            value: h.val,
            location: D(_, this.clonePosition())
          }
        ]), l.add(c), this.bumpSpace(), i = this.parseIdentifierIfPossible(), c = i.value, u = i.location;
      }
      return o.length === 0 ? this.error(n === "select" ? F.EXPECT_SELECT_ARGUMENT_SELECTOR : F.EXPECT_PLURAL_ARGUMENT_SELECTOR, D(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !s ? this.error(F.MISSING_OTHER_CLAUSE, D(this.clonePosition(), this.clonePosition())) : { val: o, err: null };
    }, e.prototype.tryParseDecimalInteger = function(t, n) {
      var a = 1, r = this.clonePosition();
      this.bumpIf("+") || this.bumpIf("-") && (a = -1);
      for (var i = !1, s = 0; !this.isEOF(); ) {
        var o = this.char();
        if (o >= 48 && o <= 57)
          i = !0, s = s * 10 + (o - 48), this.bump();
        else
          break;
      }
      var l = D(r, this.clonePosition());
      return i ? (s *= a, Js(s) ? { val: s, err: null } : this.error(n, l)) : this.error(t, l);
    }, e.prototype.offset = function() {
      return this.position.offset;
    }, e.prototype.isEOF = function() {
      return this.offset() === this.message.length;
    }, e.prototype.clonePosition = function() {
      return {
        offset: this.position.offset,
        line: this.position.line,
        column: this.position.column
      };
    }, e.prototype.char = function() {
      var t = this.position.offset;
      if (t >= this.message.length)
        throw Error("out of bound");
      var n = Cr(this.message, t);
      if (n === void 0)
        throw Error("Offset ".concat(t, " is at invalid UTF-16 code unit boundary"));
      return n;
    }, e.prototype.error = function(t, n) {
      return {
        val: null,
        err: {
          kind: t,
          message: this.message,
          location: n
        }
      };
    }, e.prototype.bump = function() {
      if (!this.isEOF()) {
        var t = this.char();
        t === 10 ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += t < 65536 ? 1 : 2);
      }
    }, e.prototype.bumpIf = function(t) {
      if (pa(this.message, t, this.offset())) {
        for (var n = 0; n < t.length; n++)
          this.bump();
        return !0;
      }
      return !1;
    }, e.prototype.bumpUntil = function(t) {
      var n = this.offset(), a = this.message.indexOf(t, n);
      return a >= 0 ? (this.bumpTo(a), !0) : (this.bumpTo(this.message.length), !1);
    }, e.prototype.bumpTo = function(t) {
      if (this.offset() > t)
        throw Error("targetOffset ".concat(t, " must be greater than or equal to the current offset ").concat(this.offset()));
      for (t = Math.min(t, this.message.length); ; ) {
        var n = this.offset();
        if (n === t)
          break;
        if (n > t)
          throw Error("targetOffset ".concat(t, " is at invalid UTF-16 code unit boundary"));
        if (this.bump(), this.isEOF())
          break;
      }
    }, e.prototype.bumpSpace = function() {
      for (; !this.isEOF() && Ir(this.char()); )
        this.bump();
    }, e.prototype.peek = function() {
      if (this.isEOF())
        return null;
      var t = this.char(), n = this.offset(), a = this.message.charCodeAt(n + (t >= 65536 ? 2 : 1));
      return a ?? null;
    }, e;
  }()
);
function kn(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function ao(e) {
  return kn(e) || e === 47;
}
function ro(e) {
  return e === 45 || e === 46 || e >= 48 && e <= 57 || e === 95 || e >= 97 && e <= 122 || e >= 65 && e <= 90 || e == 183 || e >= 192 && e <= 214 || e >= 216 && e <= 246 || e >= 248 && e <= 893 || e >= 895 && e <= 8191 || e >= 8204 && e <= 8205 || e >= 8255 && e <= 8256 || e >= 8304 && e <= 8591 || e >= 11264 && e <= 12271 || e >= 12289 && e <= 55295 || e >= 63744 && e <= 64975 || e >= 65008 && e <= 65533 || e >= 65536 && e <= 983039;
}
function Ir(e) {
  return e >= 9 && e <= 13 || e === 32 || e === 133 || e >= 8206 && e <= 8207 || e === 8232 || e === 8233;
}
function io(e) {
  return e >= 33 && e <= 35 || e === 36 || e >= 37 && e <= 39 || e === 40 || e === 41 || e === 42 || e === 43 || e === 44 || e === 45 || e >= 46 && e <= 47 || e >= 58 && e <= 59 || e >= 60 && e <= 62 || e >= 63 && e <= 64 || e === 91 || e === 92 || e === 93 || e === 94 || e === 96 || e === 123 || e === 124 || e === 125 || e === 126 || e === 161 || e >= 162 && e <= 165 || e === 166 || e === 167 || e === 169 || e === 171 || e === 172 || e === 174 || e === 176 || e === 177 || e === 182 || e === 187 || e === 191 || e === 215 || e === 247 || e >= 8208 && e <= 8213 || e >= 8214 && e <= 8215 || e === 8216 || e === 8217 || e === 8218 || e >= 8219 && e <= 8220 || e === 8221 || e === 8222 || e === 8223 || e >= 8224 && e <= 8231 || e >= 8240 && e <= 8248 || e === 8249 || e === 8250 || e >= 8251 && e <= 8254 || e >= 8257 && e <= 8259 || e === 8260 || e === 8261 || e === 8262 || e >= 8263 && e <= 8273 || e === 8274 || e === 8275 || e >= 8277 && e <= 8286 || e >= 8592 && e <= 8596 || e >= 8597 && e <= 8601 || e >= 8602 && e <= 8603 || e >= 8604 && e <= 8607 || e === 8608 || e >= 8609 && e <= 8610 || e === 8611 || e >= 8612 && e <= 8613 || e === 8614 || e >= 8615 && e <= 8621 || e === 8622 || e >= 8623 && e <= 8653 || e >= 8654 && e <= 8655 || e >= 8656 && e <= 8657 || e === 8658 || e === 8659 || e === 8660 || e >= 8661 && e <= 8691 || e >= 8692 && e <= 8959 || e >= 8960 && e <= 8967 || e === 8968 || e === 8969 || e === 8970 || e === 8971 || e >= 8972 && e <= 8991 || e >= 8992 && e <= 8993 || e >= 8994 && e <= 9e3 || e === 9001 || e === 9002 || e >= 9003 && e <= 9083 || e === 9084 || e >= 9085 && e <= 9114 || e >= 9115 && e <= 9139 || e >= 9140 && e <= 9179 || e >= 9180 && e <= 9185 || e >= 9186 && e <= 9254 || e >= 9255 && e <= 9279 || e >= 9280 && e <= 9290 || e >= 9291 && e <= 9311 || e >= 9472 && e <= 9654 || e === 9655 || e >= 9656 && e <= 9664 || e === 9665 || e >= 9666 && e <= 9719 || e >= 9720 && e <= 9727 || e >= 9728 && e <= 9838 || e === 9839 || e >= 9840 && e <= 10087 || e === 10088 || e === 10089 || e === 10090 || e === 10091 || e === 10092 || e === 10093 || e === 10094 || e === 10095 || e === 10096 || e === 10097 || e === 10098 || e === 10099 || e === 10100 || e === 10101 || e >= 10132 && e <= 10175 || e >= 10176 && e <= 10180 || e === 10181 || e === 10182 || e >= 10183 && e <= 10213 || e === 10214 || e === 10215 || e === 10216 || e === 10217 || e === 10218 || e === 10219 || e === 10220 || e === 10221 || e === 10222 || e === 10223 || e >= 10224 && e <= 10239 || e >= 10240 && e <= 10495 || e >= 10496 && e <= 10626 || e === 10627 || e === 10628 || e === 10629 || e === 10630 || e === 10631 || e === 10632 || e === 10633 || e === 10634 || e === 10635 || e === 10636 || e === 10637 || e === 10638 || e === 10639 || e === 10640 || e === 10641 || e === 10642 || e === 10643 || e === 10644 || e === 10645 || e === 10646 || e === 10647 || e === 10648 || e >= 10649 && e <= 10711 || e === 10712 || e === 10713 || e === 10714 || e === 10715 || e >= 10716 && e <= 10747 || e === 10748 || e === 10749 || e >= 10750 && e <= 11007 || e >= 11008 && e <= 11055 || e >= 11056 && e <= 11076 || e >= 11077 && e <= 11078 || e >= 11079 && e <= 11084 || e >= 11085 && e <= 11123 || e >= 11124 && e <= 11125 || e >= 11126 && e <= 11157 || e === 11158 || e >= 11159 && e <= 11263 || e >= 11776 && e <= 11777 || e === 11778 || e === 11779 || e === 11780 || e === 11781 || e >= 11782 && e <= 11784 || e === 11785 || e === 11786 || e === 11787 || e === 11788 || e === 11789 || e >= 11790 && e <= 11798 || e === 11799 || e >= 11800 && e <= 11801 || e === 11802 || e === 11803 || e === 11804 || e === 11805 || e >= 11806 && e <= 11807 || e === 11808 || e === 11809 || e === 11810 || e === 11811 || e === 11812 || e === 11813 || e === 11814 || e === 11815 || e === 11816 || e === 11817 || e >= 11818 && e <= 11822 || e === 11823 || e >= 11824 && e <= 11833 || e >= 11834 && e <= 11835 || e >= 11836 && e <= 11839 || e === 11840 || e === 11841 || e === 11842 || e >= 11843 && e <= 11855 || e >= 11856 && e <= 11857 || e === 11858 || e >= 11859 && e <= 11903 || e >= 12289 && e <= 12291 || e === 12296 || e === 12297 || e === 12298 || e === 12299 || e === 12300 || e === 12301 || e === 12302 || e === 12303 || e === 12304 || e === 12305 || e >= 12306 && e <= 12307 || e === 12308 || e === 12309 || e === 12310 || e === 12311 || e === 12312 || e === 12313 || e === 12314 || e === 12315 || e === 12316 || e === 12317 || e >= 12318 && e <= 12319 || e === 12320 || e === 12336 || e === 64830 || e === 64831 || e >= 65093 && e <= 65094;
}
function Nn(e) {
  e.forEach(function(t) {
    if (delete t.location, pr(t) || hr(t))
      for (var n in t.options)
        delete t.options[n].location, Nn(t.options[n].value);
    else dr(t) && gr(t.style) || (mr(t) || _r(t)) && An(t.style) ? delete t.style.location : fr(t) && Nn(t.children);
  });
}
function so(e, t) {
  t === void 0 && (t = {}), t = L({ shouldParseSkeletons: !0, requiresOtherClause: !0 }, t);
  var n = new no(e, t).parse();
  if (n.err) {
    var a = SyntaxError(F[n.err.kind]);
    throw a.location = n.err.location, a.originalMessage = n.err.message, a;
  }
  return t != null && t.captureLocation || Nn(n.val), n.val;
}
var Ce;
(function(e) {
  e.MISSING_VALUE = "MISSING_VALUE", e.INVALID_VALUE = "INVALID_VALUE", e.MISSING_INTL_API = "MISSING_INTL_API";
})(Ce || (Ce = {}));
var Le = (
  /** @class */
  function(e) {
    ye(t, e);
    function t(n, a, r) {
      var i = e.call(this, n) || this;
      return i.code = a, i.originalMessage = r, i;
    }
    return t.prototype.toString = function() {
      return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
    }, t;
  }(Error)
), ga = (
  /** @class */
  function(e) {
    ye(t, e);
    function t(n, a, r, i) {
      return e.call(this, 'Invalid values for "'.concat(n, '": "').concat(a, '". Options are "').concat(Object.keys(r).join('", "'), '"'), Ce.INVALID_VALUE, i) || this;
    }
    return t;
  }(Le)
), oo = (
  /** @class */
  function(e) {
    ye(t, e);
    function t(n, a, r) {
      return e.call(this, 'Value for "'.concat(n, '" must be of type ').concat(a), Ce.INVALID_VALUE, r) || this;
    }
    return t;
  }(Le)
), lo = (
  /** @class */
  function(e) {
    ye(t, e);
    function t(n, a) {
      return e.call(this, 'The intl string context variable "'.concat(n, '" was not provided to the string "').concat(a, '"'), Ce.MISSING_VALUE, a) || this;
    }
    return t;
  }(Le)
), te;
(function(e) {
  e[e.literal = 0] = "literal", e[e.object = 1] = "object";
})(te || (te = {}));
function co(e) {
  return e.length < 2 ? e : e.reduce(function(t, n) {
    var a = t[t.length - 1];
    return !a || a.type !== te.literal || n.type !== te.literal ? t.push(n) : a.value += n.value, t;
  }, []);
}
function uo(e) {
  return typeof e == "function";
}
function Vt(e, t, n, a, r, i, s) {
  if (e.length === 1 && ua(e[0]))
    return [
      {
        type: te.literal,
        value: e[0].value
      }
    ];
  for (var o = [], l = 0, c = e; l < c.length; l++) {
    var u = c[l];
    if (ua(u)) {
      o.push({
        type: te.literal,
        value: u.value
      });
      continue;
    }
    if (Ls(u)) {
      typeof i == "number" && o.push({
        type: te.literal,
        value: n.getNumberFormat(t).format(i)
      });
      continue;
    }
    var d = u.value;
    if (!(r && d in r))
      throw new lo(d, s);
    var m = r[d];
    if (Ts(u)) {
      (!m || typeof m == "string" || typeof m == "number") && (m = typeof m == "string" || typeof m == "number" ? String(m) : ""), o.push({
        type: typeof m == "string" ? te.literal : te.object,
        value: m
      });
      continue;
    }
    if (mr(u)) {
      var _ = typeof u.style == "string" ? a.date[u.style] : An(u.style) ? u.style.parsedOptions : void 0;
      o.push({
        type: te.literal,
        value: n.getDateTimeFormat(t, _).format(m)
      });
      continue;
    }
    if (_r(u)) {
      var _ = typeof u.style == "string" ? a.time[u.style] : An(u.style) ? u.style.parsedOptions : a.time.medium;
      o.push({
        type: te.literal,
        value: n.getDateTimeFormat(t, _).format(m)
      });
      continue;
    }
    if (dr(u)) {
      var _ = typeof u.style == "string" ? a.number[u.style] : gr(u.style) ? u.style.parsedOptions : void 0;
      _ && _.scale && (m = m * (_.scale || 1)), o.push({
        type: te.literal,
        value: n.getNumberFormat(t, _).format(m)
      });
      continue;
    }
    if (fr(u)) {
      var h = u.children, f = u.value, x = r[f];
      if (!uo(x))
        throw new oo(f, "function", s);
      var S = Vt(h, t, n, a, r, i), v = x(S.map(function(w) {
        return w.value;
      }));
      Array.isArray(v) || (v = [v]), o.push.apply(o, v.map(function(w) {
        return {
          type: typeof w == "string" ? te.literal : te.object,
          value: w
        };
      }));
    }
    if (pr(u)) {
      var y = u.options[m] || u.options.other;
      if (!y)
        throw new ga(u.value, m, Object.keys(u.options), s);
      o.push.apply(o, Vt(y.value, t, n, a, r));
      continue;
    }
    if (hr(u)) {
      var y = u.options["=".concat(m)];
      if (!y) {
        if (!Intl.PluralRules)
          throw new Le(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, Ce.MISSING_INTL_API, s);
        var b = n.getPluralRules(t, { type: u.pluralType }).select(m - (u.offset || 0));
        y = u.options[b] || u.options.other;
      }
      if (!y)
        throw new ga(u.value, m, Object.keys(u.options), s);
      o.push.apply(o, Vt(y.value, t, n, a, r, m - (u.offset || 0)));
      continue;
    }
  }
  return co(o);
}
function mo(e, t) {
  return t ? L(L(L({}, e || {}), t || {}), Object.keys(e).reduce(function(n, a) {
    return n[a] = L(L({}, e[a]), t[a] || {}), n;
  }, {})) : e;
}
function _o(e, t) {
  return t ? Object.keys(e).reduce(function(n, a) {
    return n[a] = mo(e[a], t[a]), n;
  }, L({}, e)) : e;
}
function _n(e) {
  return {
    create: function() {
      return {
        get: function(t) {
          return e[t];
        },
        set: function(t, n) {
          e[t] = n;
        }
      };
    }
  };
}
function po(e) {
  return e === void 0 && (e = {
    number: {},
    dateTime: {},
    pluralRules: {}
  }), {
    getNumberFormat: ne(function() {
      for (var t, n = [], a = 0; a < arguments.length; a++)
        n[a] = arguments[a];
      return new ((t = Intl.NumberFormat).bind.apply(t, se([void 0], n, !1)))();
    }, {
      cache: _n(e.number),
      strategy: ae.variadic
    }),
    getDateTimeFormat: ne(function() {
      for (var t, n = [], a = 0; a < arguments.length; a++)
        n[a] = arguments[a];
      return new ((t = Intl.DateTimeFormat).bind.apply(t, se([void 0], n, !1)))();
    }, {
      cache: _n(e.dateTime),
      strategy: ae.variadic
    }),
    getPluralRules: ne(function() {
      for (var t, n = [], a = 0; a < arguments.length; a++)
        n[a] = arguments[a];
      return new ((t = Intl.PluralRules).bind.apply(t, se([void 0], n, !1)))();
    }, {
      cache: _n(e.pluralRules),
      strategy: ae.variadic
    })
  };
}
var Ar = (
  /** @class */
  function() {
    function e(t, n, a, r) {
      n === void 0 && (n = e.defaultLocale);
      var i = this;
      if (this.formatterCache = {
        number: {},
        dateTime: {},
        pluralRules: {}
      }, this.format = function(l) {
        var c = i.formatToParts(l);
        if (c.length === 1)
          return c[0].value;
        var u = c.reduce(function(d, m) {
          return !d.length || m.type !== te.literal || typeof d[d.length - 1] != "string" ? d.push(m.value) : d[d.length - 1] += m.value, d;
        }, []);
        return u.length <= 1 ? u[0] || "" : u;
      }, this.formatToParts = function(l) {
        return Vt(i.ast, i.locales, i.formatters, i.formats, l, void 0, i.message);
      }, this.resolvedOptions = function() {
        var l;
        return {
          locale: ((l = i.resolvedLocale) === null || l === void 0 ? void 0 : l.toString()) || Intl.NumberFormat.supportedLocalesOf(i.locales)[0]
        };
      }, this.getAst = function() {
        return i.ast;
      }, this.locales = n, this.resolvedLocale = e.resolveLocale(n), typeof t == "string") {
        if (this.message = t, !e.__parse)
          throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
        var s = r || {};
        s.formatters;
        var o = Is(s, ["formatters"]);
        this.ast = e.__parse(t, L(L({}, o), { locale: this.resolvedLocale }));
      } else
        this.ast = t;
      if (!Array.isArray(this.ast))
        throw new TypeError("A message must be provided as a String or AST.");
      this.formats = _o(e.formats, a), this.formatters = r && r.formatters || po(this.formatterCache);
    }
    return Object.defineProperty(e, "defaultLocale", {
      get: function() {
        return e.memoizedDefaultLocale || (e.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale), e.memoizedDefaultLocale;
      },
      enumerable: !1,
      configurable: !0
    }), e.memoizedDefaultLocale = null, e.resolveLocale = function(t) {
      if (!(typeof Intl.Locale > "u")) {
        var n = Intl.NumberFormat.supportedLocalesOf(t);
        return n.length > 0 ? new Intl.Locale(n[0]) : new Intl.Locale(typeof t == "string" ? t : t[0]);
      }
    }, e.__parse = so, e.formats = {
      number: {
        integer: {
          maximumFractionDigits: 0
        },
        currency: {
          style: "currency"
        },
        percent: {
          style: "percent"
        }
      },
      date: {
        short: {
          month: "numeric",
          day: "numeric",
          year: "2-digit"
        },
        medium: {
          month: "short",
          day: "numeric",
          year: "numeric"
        },
        long: {
          month: "long",
          day: "numeric",
          year: "numeric"
        },
        full: {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }
      },
      time: {
        short: {
          hour: "numeric",
          minute: "numeric"
        },
        medium: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        },
        long: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        },
        full: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        }
      }
    }, e;
  }()
), Ue;
(function(e) {
  e.FORMAT_ERROR = "FORMAT_ERROR", e.UNSUPPORTED_FORMATTER = "UNSUPPORTED_FORMATTER", e.INVALID_CONFIG = "INVALID_CONFIG", e.MISSING_DATA = "MISSING_DATA", e.MISSING_TRANSLATION = "MISSING_TRANSLATION";
})(Ue || (Ue = {}));
var At = (
  /** @class */
  function(e) {
    ye(t, e);
    function t(n, a, r) {
      var i = this, s = r ? r instanceof Error ? r : new Error(String(r)) : void 0;
      return i = e.call(this, "[@formatjs/intl Error ".concat(n, "] ").concat(a, `
`).concat(s ? `
`.concat(s.message, `
`).concat(s.stack) : "")) || this, i.code = n, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(i, t), i;
    }
    return t;
  }(Error)
), ho = (
  /** @class */
  function(e) {
    ye(t, e);
    function t(n, a) {
      return e.call(this, Ue.UNSUPPORTED_FORMATTER, n, a) || this;
    }
    return t;
  }(At)
), fo = (
  /** @class */
  function(e) {
    ye(t, e);
    function t(n, a) {
      return e.call(this, Ue.INVALID_CONFIG, n, a) || this;
    }
    return t;
  }(At)
), ya = (
  /** @class */
  function(e) {
    ye(t, e);
    function t(n, a) {
      return e.call(this, Ue.MISSING_DATA, n, a) || this;
    }
    return t;
  }(At)
), _e = (
  /** @class */
  function(e) {
    ye(t, e);
    function t(n, a, r) {
      var i = e.call(this, Ue.FORMAT_ERROR, "".concat(n, `
Locale: `).concat(a, `
`), r) || this;
      return i.locale = a, i;
    }
    return t;
  }(At)
), pn = (
  /** @class */
  function(e) {
    ye(t, e);
    function t(n, a, r, i) {
      var s = e.call(this, "".concat(n, `
MessageID: `).concat(r == null ? void 0 : r.id, `
Default Message: `).concat(r == null ? void 0 : r.defaultMessage, `
Description: `).concat(r == null ? void 0 : r.description, `
`), a, i) || this;
      return s.descriptor = r, s.locale = a, s;
    }
    return t;
  }(_e)
), go = (
  /** @class */
  function(e) {
    ye(t, e);
    function t(n, a) {
      var r = e.call(this, Ue.MISSING_TRANSLATION, 'Missing message: "'.concat(n.id, '" for locale "').concat(a, '", using ').concat(n.defaultMessage ? "default message (".concat(typeof n.defaultMessage == "string" ? n.defaultMessage : n.defaultMessage.map(function(i) {
        var s;
        return (s = i.value) !== null && s !== void 0 ? s : JSON.stringify(i);
      }).join(), ")") : "id", " as fallback.")) || this;
      return r.descriptor = n, r;
    }
    return t;
  }(At)
);
function Ze(e, t, n) {
  return n === void 0 && (n = {}), t.reduce(function(a, r) {
    return r in e ? a[r] = e[r] : r in n && (a[r] = n[r]), a;
  }, {});
}
var yo = function(e) {
  process.env.NODE_ENV !== "production" && console.error(e);
}, xo = function(e) {
  process.env.NODE_ENV !== "production" && console.warn(e);
}, Sr = {
  formats: {},
  messages: {},
  timeZone: void 0,
  defaultLocale: "en",
  defaultFormats: {},
  fallbackOnEmptyString: !0,
  onError: yo,
  onWarn: xo
};
function Pr() {
  return {
    dateTime: {},
    number: {},
    message: {},
    relativeTime: {},
    pluralRules: {},
    list: {},
    displayNames: {}
  };
}
function He(e) {
  return {
    create: function() {
      return {
        get: function(t) {
          return e[t];
        },
        set: function(t, n) {
          e[t] = n;
        }
      };
    }
  };
}
function bo(e) {
  e === void 0 && (e = Pr());
  var t = Intl.RelativeTimeFormat, n = Intl.ListFormat, a = Intl.DisplayNames, r = ne(function() {
    for (var o, l = [], c = 0; c < arguments.length; c++)
      l[c] = arguments[c];
    return new ((o = Intl.DateTimeFormat).bind.apply(o, se([void 0], l, !1)))();
  }, {
    cache: He(e.dateTime),
    strategy: ae.variadic
  }), i = ne(function() {
    for (var o, l = [], c = 0; c < arguments.length; c++)
      l[c] = arguments[c];
    return new ((o = Intl.NumberFormat).bind.apply(o, se([void 0], l, !1)))();
  }, {
    cache: He(e.number),
    strategy: ae.variadic
  }), s = ne(function() {
    for (var o, l = [], c = 0; c < arguments.length; c++)
      l[c] = arguments[c];
    return new ((o = Intl.PluralRules).bind.apply(o, se([void 0], l, !1)))();
  }, {
    cache: He(e.pluralRules),
    strategy: ae.variadic
  });
  return {
    getDateTimeFormat: r,
    getNumberFormat: i,
    getMessageFormat: ne(function(o, l, c, u) {
      return new Ar(o, l, c, L({ formatters: {
        getNumberFormat: i,
        getDateTimeFormat: r,
        getPluralRules: s
      } }, u || {}));
    }, {
      cache: He(e.message),
      strategy: ae.variadic
    }),
    getRelativeTimeFormat: ne(function() {
      for (var o = [], l = 0; l < arguments.length; l++)
        o[l] = arguments[l];
      return new (t.bind.apply(t, se([void 0], o, !1)))();
    }, {
      cache: He(e.relativeTime),
      strategy: ae.variadic
    }),
    getPluralRules: s,
    getListFormat: ne(function() {
      for (var o = [], l = 0; l < arguments.length; l++)
        o[l] = arguments[l];
      return new (n.bind.apply(n, se([void 0], o, !1)))();
    }, {
      cache: He(e.list),
      strategy: ae.variadic
    }),
    getDisplayNames: ne(function() {
      for (var o = [], l = 0; l < arguments.length; l++)
        o[l] = arguments[l];
      return new (a.bind.apply(a, se([void 0], o, !1)))();
    }, {
      cache: He(e.displayNames),
      strategy: ae.variadic
    })
  };
}
function Zn(e, t, n, a) {
  var r = e && e[t], i;
  if (r && (i = r[n]), i)
    return i;
  a(new ho("No ".concat(t, " format named: ").concat(n)));
}
function wo(e, t, n) {
  if (n === void 0 && (n = Error), !e)
    throw new n(t);
}
ne(function() {
  for (var e, t = [], n = 0; n < arguments.length; n++)
    t[n] = arguments[n];
  return new ((e = Intl.NumberFormat).bind.apply(e, se([void 0], t, !1)))();
}, {
  strategy: ae.variadic
});
ne(function() {
  for (var e, t = [], n = 0; n < arguments.length; n++)
    t[n] = arguments[n];
  return new ((e = Intl.DateTimeFormat).bind.apply(e, se([void 0], t, !1)))();
}, {
  strategy: ae.variadic
});
ne(function() {
  for (var e, t = [], n = 0; n < arguments.length; n++)
    t[n] = arguments[n];
  return new ((e = Intl.PluralRules).bind.apply(e, se([void 0], t, !1)))();
}, {
  strategy: ae.variadic
});
ne(function() {
  for (var e, t = [], n = 0; n < arguments.length; n++)
    t[n] = arguments[n];
  return new ((e = Intl.Locale).bind.apply(e, se([void 0], t, !1)))();
}, {
  strategy: ae.variadic
});
ne(function() {
  for (var e, t = [], n = 0; n < arguments.length; n++)
    t[n] = arguments[n];
  return new ((e = Intl.ListFormat).bind.apply(e, se([void 0], t, !1)))();
}, {
  strategy: ae.variadic
});
function Ht(e, t) {
  return Object.keys(e).reduce(function(n, a) {
    return n[a] = L({ timeZone: t }, e[a]), n;
  }, {});
}
function xa(e, t) {
  var n = Object.keys(L(L({}, e), t));
  return n.reduce(function(a, r) {
    return a[r] = L(L({}, e[r] || {}), t[r] || {}), a;
  }, {});
}
function ba(e, t) {
  if (!t)
    return e;
  var n = Ar.formats;
  return L(L(L({}, n), e), { date: xa(Ht(n.date, t), Ht(e.date || {}, t)), time: xa(Ht(n.time, t), Ht(e.time || {}, t)) });
}
var wa = function(e, t, n, a, r) {
  var i = e.locale, s = e.formats, o = e.messages, l = e.defaultLocale, c = e.defaultFormats, u = e.fallbackOnEmptyString, d = e.onError, m = e.timeZone, _ = e.defaultRichTextElements;
  n === void 0 && (n = { id: "" });
  var h = n.id, f = n.defaultMessage;
  wo(!!h, "[@formatjs/intl] An `id` must be provided to format a message. You can either:\n1. Configure your build toolchain with [babel-plugin-formatjs](https://formatjs.io/docs/tooling/babel-plugin)\nor [@formatjs/ts-transformer](https://formatjs.io/docs/tooling/ts-transformer) OR\n2. Configure your `eslint` config to include [eslint-plugin-formatjs](https://formatjs.io/docs/tooling/linter#enforce-id)\nto autofix this issue");
  var x = String(h), S = (
    // In case messages is Object.create(null)
    // e.g import('foo.json') from webpack)
    // See https://github.com/formatjs/formatjs/issues/1914
    o && Object.prototype.hasOwnProperty.call(o, x) && o[x]
  );
  if (Array.isArray(S) && S.length === 1 && S[0].type === Y.literal)
    return S[0].value;
  if (!a && S && typeof S == "string" && !_)
    return S.replace(/'\{(.*?)\}'/gi, "{$1}");
  if (a = L(L({}, _), a || {}), s = ba(s, m), c = ba(c, m), !S) {
    if (u === !1 && S === "")
      return S;
    if ((!f || i && i.toLowerCase() !== l.toLowerCase()) && d(new go(n, i)), f)
      try {
        var v = t.getMessageFormat(f, l, c, r);
        return v.format(a);
      } catch (y) {
        return d(new pn('Error formatting default message for: "'.concat(x, '", rendering default message verbatim'), i, n, y)), typeof f == "string" ? f : x;
      }
    return x;
  }
  try {
    var v = t.getMessageFormat(S, i, s, L({ formatters: t }, r || {}));
    return v.format(a);
  } catch (y) {
    d(new pn('Error formatting message: "'.concat(x, '", using ').concat(f ? "default message" : "id", " as fallback."), i, n, y));
  }
  if (f)
    try {
      var v = t.getMessageFormat(f, l, c, r);
      return v.format(a);
    } catch (y) {
      d(new pn('Error formatting the default message for: "'.concat(x, '", rendering message verbatim'), i, n, y));
    }
  return typeof S == "string" ? S : typeof f == "string" ? f : x;
}, Er = [
  "formatMatcher",
  "timeZone",
  "hour12",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "hourCycle",
  "dateStyle",
  "timeStyle",
  "calendar",
  // 'dayPeriod',
  "numberingSystem",
  "fractionalSecondDigits"
];
function Kt(e, t, n, a) {
  var r = e.locale, i = e.formats, s = e.onError, o = e.timeZone;
  a === void 0 && (a = {});
  var l = a.format, c = L(L({}, o && { timeZone: o }), l && Zn(i, t, l, s)), u = Ze(a, Er, c);
  return t === "time" && !u.hour && !u.minute && !u.second && !u.timeStyle && !u.dateStyle && (u = L(L({}, u), { hour: "numeric", minute: "numeric" })), n(r, u);
}
function Co(e, t) {
  for (var n = [], a = 2; a < arguments.length; a++)
    n[a - 2] = arguments[a];
  var r = n[0], i = n[1], s = i === void 0 ? {} : i, o = typeof r == "string" ? new Date(r || 0) : r;
  try {
    return Kt(e, "date", t, s).format(o);
  } catch (l) {
    e.onError(new _e("Error formatting date.", e.locale, l));
  }
  return String(o);
}
function vo(e, t) {
  for (var n = [], a = 2; a < arguments.length; a++)
    n[a - 2] = arguments[a];
  var r = n[0], i = n[1], s = i === void 0 ? {} : i, o = typeof r == "string" ? new Date(r || 0) : r;
  try {
    return Kt(e, "time", t, s).format(o);
  } catch (l) {
    e.onError(new _e("Error formatting time.", e.locale, l));
  }
  return String(o);
}
function Io(e, t) {
  for (var n = [], a = 2; a < arguments.length; a++)
    n[a - 2] = arguments[a];
  var r = n[0], i = n[1], s = n[2], o = s === void 0 ? {} : s, l = e.timeZone, c = e.locale, u = e.onError, d = Ze(o, Er, l ? { timeZone: l } : {});
  try {
    return t(c, d).formatRange(r, i);
  } catch (m) {
    u(new _e("Error formatting date time range.", e.locale, m));
  }
  return String(r);
}
function Ao(e, t) {
  for (var n = [], a = 2; a < arguments.length; a++)
    n[a - 2] = arguments[a];
  var r = n[0], i = n[1], s = i === void 0 ? {} : i, o = typeof r == "string" ? new Date(r || 0) : r;
  try {
    return Kt(e, "date", t, s).formatToParts(o);
  } catch (l) {
    e.onError(new _e("Error formatting date.", e.locale, l));
  }
  return [];
}
function So(e, t) {
  for (var n = [], a = 2; a < arguments.length; a++)
    n[a - 2] = arguments[a];
  var r = n[0], i = n[1], s = i === void 0 ? {} : i, o = typeof r == "string" ? new Date(r || 0) : r;
  try {
    return Kt(e, "time", t, s).formatToParts(o);
  } catch (l) {
    e.onError(new _e("Error formatting time.", e.locale, l));
  }
  return [];
}
var Po = [
  "style",
  "type",
  "fallback",
  "languageDisplay"
];
function Eo(e, t, n, a) {
  var r = e.locale, i = e.onError, s = Intl.DisplayNames;
  s || i(new Le(`Intl.DisplayNames is not available in this environment.
Try polyfilling it using "@formatjs/intl-displaynames"
`, Ce.MISSING_INTL_API));
  var o = Ze(a, Po);
  try {
    return t(r, o).of(n);
  } catch (l) {
    i(new _e("Error formatting display name.", r, l));
  }
}
var ko = [
  "type",
  "style"
], Ca = Date.now();
function No(e) {
  return "".concat(Ca, "_").concat(e, "_").concat(Ca);
}
function To(e, t, n, a) {
  a === void 0 && (a = {});
  var r = kr(e, t, n, a).reduce(function(i, s) {
    var o = s.value;
    return typeof o != "string" ? i.push(o) : typeof i[i.length - 1] == "string" ? i[i.length - 1] += o : i.push(o), i;
  }, []);
  return r.length === 1 ? r[0] : r.length === 0 ? "" : r;
}
function kr(e, t, n, a) {
  var r = e.locale, i = e.onError;
  a === void 0 && (a = {});
  var s = Intl.ListFormat;
  s || i(new Le(`Intl.ListFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-listformat"
`, Ce.MISSING_INTL_API));
  var o = Ze(a, ko);
  try {
    var l = {}, c = n.map(function(u, d) {
      if (typeof u == "object") {
        var m = No(d);
        return l[m] = u, m;
      }
      return String(u);
    });
    return t(r, o).formatToParts(c).map(function(u) {
      return u.type === "literal" ? u : L(L({}, u), { value: l[u.value] || u.value });
    });
  } catch (u) {
    i(new _e("Error formatting list.", r, u));
  }
  return n;
}
var Lo = ["type"];
function Ho(e, t, n, a) {
  var r = e.locale, i = e.onError;
  a === void 0 && (a = {}), Intl.PluralRules || i(new Le(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, Ce.MISSING_INTL_API));
  var s = Ze(a, Lo);
  try {
    return t(r, s).select(n);
  } catch (o) {
    i(new _e("Error formatting plural.", r, o));
  }
  return "other";
}
var Mo = ["numeric", "style"];
function Oo(e, t, n) {
  var a = e.locale, r = e.formats, i = e.onError;
  n === void 0 && (n = {});
  var s = n.format, o = !!s && Zn(r, "relative", s, i) || {}, l = Ze(n, Mo, o);
  return t(a, l);
}
function Ro(e, t, n, a, r) {
  r === void 0 && (r = {}), a || (a = "second");
  var i = Intl.RelativeTimeFormat;
  i || e.onError(new Le(`Intl.RelativeTimeFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-relativetimeformat"
`, Ce.MISSING_INTL_API));
  try {
    return Oo(e, t, r).format(n, a);
  } catch (s) {
    e.onError(new _e("Error formatting relative time.", e.locale, s));
  }
  return String(n);
}
var Vo = [
  "style",
  "currency",
  "unit",
  "unitDisplay",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  // ES2020 NumberFormat
  "compactDisplay",
  "currencyDisplay",
  "currencySign",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "numberingSystem",
  // ES2023 NumberFormat
  "trailingZeroDisplay",
  "roundingPriority",
  "roundingIncrement",
  "roundingMode"
];
function Nr(e, t, n) {
  var a = e.locale, r = e.formats, i = e.onError;
  n === void 0 && (n = {});
  var s = n.format, o = s && Zn(r, "number", s, i) || {}, l = Ze(n, Vo, o);
  return t(a, l);
}
function Fo(e, t, n, a) {
  a === void 0 && (a = {});
  try {
    return Nr(e, t, a).format(n);
  } catch (r) {
    e.onError(new _e("Error formatting number.", e.locale, r));
  }
  return String(n);
}
function Do(e, t, n, a) {
  a === void 0 && (a = {});
  try {
    return Nr(e, t, a).formatToParts(n);
  } catch (r) {
    e.onError(new _e("Error formatting number.", e.locale, r));
  }
  return [];
}
function Bo(e) {
  var t = e ? e[Object.keys(e)[0]] : void 0;
  return typeof t == "string";
}
function Uo(e) {
  e.onWarn && e.defaultRichTextElements && Bo(e.messages || {}) && e.onWarn(`[@formatjs/intl] "defaultRichTextElements" was specified but "message" was not pre-compiled. 
Please consider using "@formatjs/cli" to pre-compile your messages for performance.
For more details see https://formatjs.io/docs/getting-started/message-distribution`);
}
function va(e, t) {
  var n = bo(t), a = L(L({}, Sr), e), r = a.locale, i = a.defaultLocale, s = a.onError;
  return r ? !Intl.NumberFormat.supportedLocalesOf(r).length && s ? s(new ya('Missing locale data for locale: "'.concat(r, '" in Intl.NumberFormat. Using default locale: "').concat(i, '" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details'))) : !Intl.DateTimeFormat.supportedLocalesOf(r).length && s && s(new ya('Missing locale data for locale: "'.concat(r, '" in Intl.DateTimeFormat. Using default locale: "').concat(i, '" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details'))) : (s && s(new fo('"locale" was not configured, using "'.concat(i, '" as fallback. See https://formatjs.io/docs/react-intl/api#intlshape for more details'))), a.locale = a.defaultLocale || "en"), Uo(a), L(L({}, a), {
    formatters: n,
    formatNumber: Fo.bind(null, a, n.getNumberFormat),
    formatNumberToParts: Do.bind(null, a, n.getNumberFormat),
    formatRelativeTime: Ro.bind(null, a, n.getRelativeTimeFormat),
    formatDate: Co.bind(null, a, n.getDateTimeFormat),
    formatDateToParts: Ao.bind(null, a, n.getDateTimeFormat),
    formatTime: vo.bind(null, a, n.getDateTimeFormat),
    formatDateTimeRange: Io.bind(null, a, n.getDateTimeFormat),
    formatTimeToParts: So.bind(null, a, n.getDateTimeFormat),
    formatPlural: Ho.bind(null, a, n.getPluralRules),
    // @ts-expect-error TODO: will get to this later
    formatMessage: wa.bind(null, a, n),
    // @ts-expect-error TODO: will get to this later
    $t: wa.bind(null, a, n),
    formatList: To.bind(null, a, n.getListFormat),
    formatListToParts: kr.bind(null, a, n.getListFormat),
    formatDisplayName: Eo.bind(null, a, n.getDisplayNames)
  });
}
const bt = Symbol("store-raw"), we = Symbol("store-node"), ue = Symbol("store-has"), Tr = Symbol("store-self");
function Lr(e) {
  let t = e[X];
  if (!t && (Object.defineProperty(e, X, {
    value: t = new Proxy(e, Wo)
  }), !Array.isArray(e))) {
    const n = Object.keys(e), a = Object.getOwnPropertyDescriptors(e);
    for (let r = 0, i = n.length; r < i; r++) {
      const s = n[r];
      a[s].get && Object.defineProperty(e, s, {
        enumerable: a[s].enumerable,
        get: a[s].get.bind(t)
      });
    }
  }
  return t;
}
function wt(e) {
  let t;
  return e != null && typeof e == "object" && (e[X] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function ze(e, t = /* @__PURE__ */ new Set()) {
  let n, a, r, i;
  if (n = e != null && e[bt]) return n;
  if (!wt(e) || t.has(e)) return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
    for (let s = 0, o = e.length; s < o; s++)
      r = e[s], (a = ze(r, t)) !== r && (e[s] = a);
  } else {
    Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
    const s = Object.keys(e), o = Object.getOwnPropertyDescriptors(e);
    for (let l = 0, c = s.length; l < c; l++)
      i = s[l], !o[i].get && (r = e[i], (a = ze(r, t)) !== r && (e[i] = a));
  }
  return e;
}
function tt(e, t) {
  let n = e[t];
  return n || Object.defineProperty(e, t, {
    value: n = /* @__PURE__ */ Object.create(null)
  }), n;
}
function We(e, t, n) {
  if (e[t]) return e[t];
  const [a, r] = q(n, {
    equals: !1,
    internal: !0
  });
  return a.$ = r, e[t] = a;
}
function zo(e, t) {
  const n = Reflect.getOwnPropertyDescriptor(e, t);
  return !n || n.get || !n.configurable || t === X || t === we || (delete n.value, delete n.writable, n.get = () => e[X][t]), n;
}
function $n(e) {
  ht() && We(tt(e, we), Tr)();
}
function Hr(e) {
  return $n(e), Reflect.ownKeys(e);
}
const Wo = {
  get(e, t, n) {
    if (t === bt) return e;
    if (t === X) return n;
    if (t === pt)
      return $n(e), n;
    const a = tt(e, we), r = a[t];
    let i = r ? r() : e[t];
    if (t === we || t === ue || t === "__proto__") return i;
    if (!r) {
      const s = Object.getOwnPropertyDescriptor(e, t);
      ht() && (typeof i != "function" || e.hasOwnProperty(t)) && !(s && s.get) && (i = We(a, t, i)());
    }
    return wt(i) ? Lr(i) : i;
  },
  has(e, t) {
    return t === bt || t === X || t === pt || t === we || t === ue || t === "__proto__" ? !0 : (ht() && We(tt(e, ue), t)(), t in e);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: Hr,
  getOwnPropertyDescriptor: zo
};
function nt(e, t, n, a = !1) {
  if (!a && e[t] === n) return;
  const r = e[t], i = e.length;
  n === void 0 ? (delete e[t], e[ue] && e[ue][t] && r !== void 0 && e[ue][t].$()) : (e[t] = n, e[ue] && e[ue][t] && r === void 0 && e[ue][t].$());
  let s = tt(e, we), o;
  if ((o = We(s, t, r)) && o.$(() => n), Array.isArray(e) && e.length !== i) {
    for (let l = e.length; l < i; l++) (o = s[l]) && o.$();
    (o = We(s, "length", i)) && o.$(e.length);
  }
  (o = s[Tr]) && o.$();
}
function Mr(e, t) {
  const n = Object.keys(t);
  for (let a = 0; a < n.length; a += 1) {
    const r = n[a];
    nt(e, r, t[r]);
  }
}
function Yo(e, t) {
  if (typeof t == "function" && (t = t(e)), t = ze(t), Array.isArray(t)) {
    if (e === t) return;
    let n = 0, a = t.length;
    for (; n < a; n++) {
      const r = t[n];
      e[n] !== r && nt(e, n, r);
    }
    nt(e, "length", a);
  } else Mr(e, t);
}
function ct(e, t, n = []) {
  let a, r = e;
  if (t.length > 1) {
    a = t.shift();
    const s = typeof a, o = Array.isArray(e);
    if (Array.isArray(a)) {
      for (let l = 0; l < a.length; l++)
        ct(e, [a[l]].concat(t), n);
      return;
    } else if (o && s === "function") {
      for (let l = 0; l < e.length; l++)
        a(e[l], l) && ct(e, [l].concat(t), n);
      return;
    } else if (o && s === "object") {
      const { from: l = 0, to: c = e.length - 1, by: u = 1 } = a;
      for (let d = l; d <= c; d += u)
        ct(e, [d].concat(t), n);
      return;
    } else if (t.length > 1) {
      ct(e[a], t, [a].concat(n));
      return;
    }
    r = e[a], n = [a].concat(n);
  }
  let i = t[0];
  typeof i == "function" && (i = i(r, n), i === r) || a === void 0 && i == null || (i = ze(i), a === void 0 || wt(r) && wt(i) && !Array.isArray(i) ? Mr(r, i) : nt(e, a, i));
}
function Or(...[e, t]) {
  const n = ze(e || {}), a = Array.isArray(n), r = Lr(n);
  function i(...s) {
    mt(() => {
      a && s.length === 1 ? Yo(n, s[0]) : ct(n, s);
    });
  }
  return [r, i];
}
function Zo(e, t) {
  const n = Reflect.getOwnPropertyDescriptor(e, t);
  return !n || n.get || n.set || !n.configurable || t === X || t === we || (delete n.value, delete n.writable, n.get = () => e[X][t], n.set = (a) => e[X][t] = a), n;
}
const $o = {
  get(e, t, n) {
    if (t === bt) return e;
    if (t === X) return n;
    if (t === pt)
      return $n(e), n;
    const a = tt(e, we), r = a[t];
    let i = r ? r() : e[t];
    if (t === we || t === ue || t === "__proto__") return i;
    if (!r) {
      const s = Object.getOwnPropertyDescriptor(e, t), o = typeof i == "function";
      if (ht() && (!o || e.hasOwnProperty(t)) && !(s && s.get))
        i = We(a, t, i)();
      else if (i != null && o && i === Array.prototype[t])
        return (...l) => mt(() => Array.prototype[t].apply(n, l));
    }
    return wt(i) ? Rr(i) : i;
  },
  has(e, t) {
    return t === bt || t === X || t === pt || t === we || t === ue || t === "__proto__" ? !0 : (ht() && We(tt(e, ue), t)(), t in e);
  },
  set(e, t, n) {
    return mt(() => nt(e, t, ze(n))), !0;
  },
  deleteProperty(e, t) {
    return mt(() => nt(e, t, void 0, !0)), !0;
  },
  ownKeys: Hr,
  getOwnPropertyDescriptor: Zo
};
function Rr(e) {
  let t = e[X];
  if (!t) {
    Object.defineProperty(e, X, {
      value: t = new Proxy(e, $o)
    });
    const n = Object.keys(e), a = Object.getOwnPropertyDescriptors(e), r = Object.getPrototypeOf(e), i = r !== null && e !== null && typeof e == "object" && !Array.isArray(e) && r !== Object.prototype;
    if (i) {
      const s = Object.getOwnPropertyDescriptors(r);
      n.push(...Object.keys(s)), Object.assign(a, s);
    }
    for (let s = 0, o = n.length; s < o; s++) {
      const l = n[s];
      if (!(i && l === "constructor")) {
        if (a[l].get) {
          const c = a[l].get.bind(t);
          Object.defineProperty(e, l, {
            get: c,
            configurable: !0
          });
        }
        if (a[l].set) {
          const c = a[l].set;
          Object.defineProperty(e, l, {
            set: (d) => mt(() => c.call(t, d)),
            configurable: !0
          });
        }
      }
    }
  }
  return t;
}
function Go(e, t) {
  const n = ze(e || {});
  return Rr(n);
}
function Ia(e) {
  return de(Sr, {
    locale: e.locale,
    timeZone: e.timeZone,
    fallbackOnEmptyString: e.fallbackOnEmptyString,
    formats: e.formats,
    messages: e.messages,
    defaultLocale: e.defaultLocale,
    defaultFormats: e.defaultFormats,
    defaultRichTextElements: e.defaultRichTextElements,
    onError: e.onError,
    onWarn: e.onWarn
  });
}
const je = (e) => {
  var t;
  return ((t = {}.toString.call(e).match(/\s([A-Za-z]+)/)) == null ? void 0 : t[1].toLowerCase()) ?? "";
}, jo = {
  // @ts-ignore
  nullish(e) {
    return e == null;
  },
  // @ts-ignore
  string(e) {
    return je(e) === "string";
  },
  // @ts-ignore
  number(e) {
    return je(e) === "number";
  },
  // @ts-ignore
  bool(e) {
    return je(e) === "boolean";
  },
  // @ts-ignore
  object(e) {
    return je(e) === "object";
  },
  // @ts-ignore
  array(e) {
    return Array.isArray(e);
  },
  // @ts-ignore
  date(e) {
    return je(e) === "date";
  },
  // @ts-ignore
  function(e) {
    return je(e) === "function";
  }
}, qo = Ba(), Ko = (e) => {
  if (jo.nullish(e.locale))
    throw new ReferenceError('[solid-intl]: <IntlProvider /> expects a "locale" which was not configured. See https://formatjs.io/docs/react-intl/api#intlshape for more details');
  const t = Go(Pr()), [n, a] = Or(va(Ia(e), t));
  return Fa(() => {
    a(va(Ia(e), t));
  }), p(qo.Provider, {
    value: n,
    get children() {
      return e.children;
    }
  });
};
var Xo = /* @__PURE__ */ C("<svg><rect x=0.285706 width=28.2857 height=18 rx=2.57143 fill=#1434CB></svg>", !1, !0, !1), Jo = /* @__PURE__ */ C('<svg><path d="M14.3317 5.89926L13.0019 12.1167H11.3933L12.7233 5.89926H14.3317ZM21.0989 9.91391L21.9455 7.57915L22.4327 9.91391H21.0989ZM22.8941 12.1167H24.3815L23.0821 5.89926H21.7101C21.4009 5.89926 21.1403 6.07853 21.0249 6.35499L18.6114 12.1167H20.3007L20.636 11.1881H22.6993L22.8941 12.1167ZM18.6952 10.0869C18.7022 8.44602 16.4268 8.35512 16.4421 7.62194C16.447 7.39918 16.6595 7.16187 17.1241 7.10118C17.3544 7.07153 17.99 7.04748 18.7104 7.37946L18.9922 6.06049C18.6052 5.92051 18.1073 5.78571 17.4877 5.78571C15.8975 5.78571 14.779 6.63034 14.77 7.84079C14.7598 8.7359 15.569 9.23499 16.1775 9.53313C16.8048 9.83784 17.015 10.0332 17.0119 10.3055C17.0076 10.7226 16.5117 10.9073 16.05 10.9143C15.2408 10.9269 14.7718 10.6956 14.398 10.5214L14.106 11.8844C14.4825 12.0567 15.1761 12.2066 15.8943 12.2143C17.5848 12.2143 18.6901 11.3796 18.6952 10.0869ZM12.0333 5.89926L9.42715 12.1167H7.72712L6.44451 7.15474C6.36676 6.84961 6.29894 6.73745 6.06247 6.60852C5.67567 6.39848 5.03716 6.20201 4.47571 6.07979L4.51374 5.89926H7.25069C7.59931 5.89926 7.91297 6.13125 7.99282 6.53287L8.67034 10.1309L10.3435 5.89926H12.0333Z"fill=white></svg>', !1, !0, !1), Qo = /* @__PURE__ */ C("<svg><rect width=28.2857 height=18 rx=2.57143 fill=black></svg>", !1, !0, !1), el = /* @__PURE__ */ C('<svg><path d="M16.13 5.46265H12.1567V12.5384H16.13V5.46265Z"fill=#FF5F00></svg>', !1, !0, !1), tl = /* @__PURE__ */ C('<svg><path d="M12.4086 9C12.4079 8.31855 12.5638 7.64589 12.8643 7.03294C13.1647 6.42 13.602 5.88282 14.1429 5.4621C13.4731 4.94031 12.6686 4.61581 11.8214 4.5257C10.9742 4.43559 10.1185 4.58351 9.35219 4.95254C8.58583 5.32157 7.93971 5.89683 7.48766 6.61256C7.03562 7.3283 6.7959 8.15563 6.7959 9C6.7959 9.84437 7.03562 10.6717 7.48766 11.3874C7.93971 12.1032 8.58583 12.6784 9.35219 13.0475C10.1185 13.4165 10.9742 13.5644 11.8214 13.4743C12.6686 13.3842 13.4731 13.0597 14.1429 12.5379C13.602 12.1172 13.1647 11.58 12.8643 10.9671C12.5638 10.3541 12.408 9.68145 12.4086 9Z"fill=#EB001B></svg>', !1, !0, !1), nl = /* @__PURE__ */ C('<svg><path d="M21.4899 9C21.4899 9.84435 21.2502 10.6717 20.7982 11.3874C20.3462 12.1032 19.7001 12.6784 18.9337 13.0475C18.1674 13.4165 17.3117 13.5644 16.4646 13.4743C15.6174 13.3842 14.8129 13.0597 14.1431 12.5379C14.6835 12.1167 15.1204 11.5795 15.4209 10.9666C15.7213 10.3538 15.8774 9.68134 15.8774 9C15.8774 8.31866 15.7213 7.64621 15.4209 7.03336C15.1204 6.42051 14.6835 5.88325 14.1431 5.4621C14.8129 4.9403 15.6174 4.61581 16.4646 4.5257C17.3117 4.43559 18.1674 4.58351 18.9337 4.95254C19.7001 5.32158 20.3462 5.89684 20.7982 6.61258C21.2502 7.32831 21.4899 8.15564 21.4899 9Z"fill=#F79E1B></svg>', !1, !0, !1), al = /* @__PURE__ */ C('<svg><path d="M21.0561 11.7897V11.6448H21.115V11.6153H20.9649V11.6448H21.0239V11.7897H21.0561ZM21.3475 11.7897V11.615H21.3015L21.2486 11.7351L21.1956 11.615H21.1496V11.7897H21.1821V11.6579L21.2317 11.7715H21.2654L21.315 11.6576V11.7897H21.3475Z"fill=#F79E1B></svg>', !1, !0, !1), rl = /* @__PURE__ */ C('<svg><g clip-path=url(#clip0_1643_259)><rect x=0.351562 width=24.6757 height=16 rx=2.13952 fill=#006FCF></rect><path fill-rule=evenodd clip-rule=evenodd d="M25.2413 8.96802H23.9466C23.5558 8.96802 23.272 9.06034 23.071 9.20387V8.96802H21.1559C20.8497 8.96802 20.4902 9.04292 20.3202 9.20387V8.96802H16.9004V9.20387C16.6282 9.01017 16.169 8.96802 15.957 8.96802H13.7013V9.20387C13.486 8.99815 13.0071 8.96802 12.7153 8.96802H10.1907L9.61301 9.58482L9.07194 8.96802H5.30078V12.9981H9.00096L9.59624 12.3715L10.157 12.9981L12.4378 13.0001V12.052H12.662C12.9647 12.0567 13.3216 12.0446 13.6365 11.9103V12.998H15.5177V11.9476H15.6085C15.7243 11.9476 15.7357 11.9523 15.7357 12.0665V12.9979H21.4506C21.8134 12.9979 22.1927 12.9063 22.4027 12.74V12.9979H24.2155C24.5927 12.9979 24.9611 12.9457 25.2414 12.8121C25.2414 -9.23748 25.2413 18.2001 25.2413 8.96802Z"fill=white></path><path fill-rule=evenodd clip-rule=evenodd d="M1.54697 8.02725L1.81649 7.38589H2.41988L2.6887 8.02725H5.04057V7.53691L5.2505 8.02934H6.47142L6.68135 7.52959V8.02725H12.5262L12.5235 6.97445H12.6366C12.7158 6.97715 12.7389 6.98438 12.7389 7.11337V8.02725H15.7619V7.78217C16.0057 7.91107 16.3849 8.02725 16.884 8.02725H18.1558L18.4279 7.38589H19.0313L19.2975 8.02725H21.7482V7.41803L22.1194 8.02725H24.0833V4H22.1397V4.47562L21.8675 4H19.8732V4.47562L19.6232 4H16.9294C16.4784 4 16.0821 4.0621 15.7619 4.23516V4H13.9029V4.23516C13.6991 4.05679 13.4215 4 13.1127 4H6.32108L5.86538 5.04017L5.3974 4H3.25819V4.47562L3.02319 4H1.19879L0.351562 5.91477V8.02725H1.54697Z"fill=white></path><path fill-rule=evenodd clip-rule=evenodd d="M12.6941 11.4577C13.3056 11.4577 13.9124 11.2921 13.9124 10.4898C13.9124 9.6899 13.2886 9.53827 12.7334 9.53827H10.498L9.60809 10.485L8.74735 9.53827H5.93359V12.4265H8.70471L9.59996 11.4704L10.4614 12.4265H11.8212V11.4577H12.6941ZM11.8212 10.8712H12.7253C12.9941 10.8712 13.1613 10.7396 13.1613 10.4898C13.1613 10.2372 12.986 10.1357 12.7334 10.1357H11.8212V10.8712ZM8.35053 11.8246H6.63048V11.25H8.16638V10.6607H6.63048V10.1356H8.38443L9.14965 10.9773L8.35053 11.8246ZM11.1244 12.1638L10.0503 10.9874L11.1244 9.84826V12.1638Z"fill=#006FCF></path><path fill-rule=evenodd clip-rule=evenodd d="M16.9043 11.3268C16.8446 11.2426 16.7173 11.141 16.5616 11.0843C16.7457 11.0122 17.0574 10.7769 17.0574 10.3159C17.0574 9.98646 16.9186 9.80617 16.6978 9.67457C16.4682 9.55368 16.2102 9.53827 15.856 9.53827H14.2409V12.4265H14.9438V11.3716H15.6915C15.9467 11.3716 16.1025 11.3963 16.2047 11.4998C16.3218 11.6207 16.3198 11.8413 16.3182 12.0108C16.318 12.0296 16.3178 12.0478 16.3178 12.0651V12.4265H17.0202V11.8539C17.0174 11.5994 17.0031 11.4678 16.9043 11.3268ZM16.1391 10.7249C16.0455 10.7796 15.9298 10.7843 15.7936 10.7843H14.9438V10.1357H15.8052C15.9298 10.1357 16.0544 10.1383 16.1391 10.1878C16.2297 10.2346 16.2839 10.3241 16.2839 10.4476C16.2839 10.5712 16.2297 10.6708 16.1391 10.7249Z"fill=#006FCF></path><path d="M22.4518 10.9032C22.588 11.0423 22.661 11.2179 22.661 11.5151C22.661 12.1365 22.2676 12.4265 21.562 12.4265H20.1994V11.8072H21.5566C21.6893 11.8072 21.7834 11.7898 21.8423 11.7357C21.8904 11.691 21.925 11.6261 21.925 11.5473C21.925 11.4631 21.8876 11.3963 21.8396 11.3563C21.7861 11.3122 21.7123 11.2922 21.5905 11.2922C21.5476 11.2907 21.5041 11.2896 21.4601 11.2884C20.8324 11.2716 20.1169 11.2524 20.1169 10.3982C20.1169 9.97932 20.3837 9.53836 21.1171 9.53836H22.5196V10.1531H21.2363C21.1091 10.1531 21.0264 10.1578 20.956 10.2052C20.8794 10.252 20.8509 10.3214 20.8509 10.413C20.8509 10.522 20.916 10.5961 21.004 10.6282C21.0778 10.6535 21.1571 10.6609 21.2763 10.6609L21.6529 10.6709C22.0327 10.6801 22.2934 10.7449 22.4518 10.9032Z"fill=#006FCF></path><path d="M25.2424 10.1529H23.9674C23.8401 10.1529 23.7555 10.1576 23.6843 10.2051C23.6105 10.2518 23.5821 10.3212 23.5821 10.4129C23.5821 10.5218 23.6444 10.5959 23.7351 10.628C23.8089 10.6533 23.8881 10.6607 24.0047 10.6607L24.3838 10.6708C24.7664 10.6801 25.0218 10.745 25.1776 10.9032C25.2015 10.9218 25.2173 10.9423 25.2334 10.9632L25.2378 10.9688L25.2406 10.9724L25.2424 10.9747V12.0571C25.0725 12.3022 24.7414 12.4265 24.2931 12.4265H22.942V11.8072H24.2876C24.4211 11.8072 24.5145 11.7898 24.5707 11.7357C24.6195 11.691 24.6534 11.6261 24.6534 11.5473C24.6534 11.4632 24.6195 11.3964 24.568 11.3563C24.5172 11.3122 24.4433 11.2922 24.3215 11.2922C24.2785 11.2907 24.2349 11.2896 24.1908 11.2884C23.5609 11.2716 22.8451 11.2524 22.8451 10.3982C22.8451 9.97932 23.1147 9.53836 23.8489 9.53836H25.2424L25.2424 10.1529Z"fill=#006FCF></path><path d="M17.4454 9.53827H19.7803V10.1356H18.1421V10.6607H19.7403V11.2499H18.1421V11.8246L19.7803 11.8272V12.4265H17.4454V9.53827Z"fill=#006FCF></path><path fill-rule=evenodd clip-rule=evenodd d="M2.59579 6.20979L2.11696 5.05866L1.64086 6.20979H2.59579ZM13.1444 5.75144C13.0483 5.80901 12.9346 5.81093 12.7984 5.81093H11.9485V5.16956H12.8099C12.9318 5.16956 13.059 5.17496 13.1417 5.22164C13.2324 5.26371 13.2886 5.35324 13.2886 5.47692C13.2886 5.60312 13.2352 5.70467 13.1444 5.75144ZM19.2073 6.20979L18.7232 5.05866L18.2417 6.20979H19.2073ZM7.90567 7.45577H7.18848L7.18583 5.19427L6.1714 7.45577H5.55715L4.54007 5.19227V7.45577H3.11717L2.84836 6.81171H1.39173L1.12018 7.45577H0.360352L1.61314 4.56824H2.65255L3.84239 7.30214V4.56824H4.98421L5.89977 6.52708L6.74081 4.56824H7.90558V7.45577H7.90567ZM10.7641 7.45577H8.42707V4.56824H10.7641V5.16954H9.12669V5.69002H10.7248V6.28191H9.12669V6.85856H10.7641V7.45577ZM14.0593 5.3459C14.0593 5.80629 13.7478 6.04414 13.5663 6.11556C13.7194 6.17304 13.8501 6.27459 13.9124 6.35873C14.0111 6.50235 14.0282 6.63064 14.0282 6.88852V7.45577H13.3226L13.3199 7.09163C13.3199 6.91787 13.3368 6.668 13.2095 6.52908C13.1072 6.42753 12.9514 6.4055 12.6996 6.4055H11.9486V7.45577H11.249V4.56824H12.8581C13.2156 4.56824 13.4791 4.57756 13.7052 4.70654C13.9266 4.83553 14.0593 5.02383 14.0593 5.3459ZM15.1788 7.45577H14.465V4.56824H15.1788V7.45577ZM23.4602 7.45577H22.4688L21.1428 5.28851V7.45577H19.718L19.4458 6.81171H17.9925L17.7284 7.45577H16.9097C16.5697 7.45577 16.1391 7.38157 15.8953 7.13639C15.6495 6.89122 15.5215 6.55913 15.5215 6.03404C15.5215 5.60579 15.598 5.2143 15.8987 4.90494C16.1248 4.67449 16.479 4.56824 16.9611 4.56824H17.6384V5.18696H16.9753C16.72 5.18696 16.5759 5.22441 16.437 5.35801C16.3177 5.47959 16.2359 5.70944 16.2359 6.01209C16.2359 6.32145 16.2982 6.5445 16.4283 6.69021C16.536 6.80448 16.7317 6.83914 16.9158 6.83914H17.23L18.216 4.56832H19.2643L20.4487 7.29952V4.56832H21.5139L22.7437 6.57934V4.56832H23.4602V7.45577Z"fill=#006FCF></svg>', !1, !0, !1), il = /* @__PURE__ */ C("<svg><defs><clipPath id=clip0_1643_259><rect x=0.351562 width=24.6757 height=16 rx=2.13952 fill=white></svg>", !1, !0, !1), sl = /* @__PURE__ */ C("<svg><rect x=0.571411 width=28.2857 height=18 rx=2.57143 fill=#F6E21E></svg>", !1, !0, !1), ol = /* @__PURE__ */ C('<svg><path d="M11.242 6.62132C11.4284 6.3708 11.6745 6.16291 11.9801 5.99768C12.2857 5.82711 12.6198 5.74182 12.9824 5.74182C13.3139 5.74182 13.6066 5.81378 13.8604 5.9577C14.1194 6.09629 14.3188 6.29884 14.4587 6.56535C14.5986 6.82654 14.6685 7.1357 14.6685 7.49283C14.6685 7.64741 14.653 7.81264 14.6219 7.98854C14.5442 8.43096 14.3862 8.8254 14.1479 9.17187C13.9148 9.51834 13.6273 9.78752 13.2854 9.97941C12.9487 10.1713 12.5913 10.2673 12.2132 10.2673C11.8506 10.2673 11.545 10.1846 11.2963 10.0194C11.0529 9.84882 10.8768 9.63827 10.768 9.38775L10.2785 12.2741H9.57141L10.6747 5.81378H11.3818L11.242 6.62132ZM13.8993 7.98854C13.92 7.87661 13.9304 7.75401 13.9304 7.62075C13.9304 7.23164 13.819 6.92781 13.5962 6.70927C13.3735 6.4854 13.086 6.37346 12.7338 6.37346C12.4748 6.37346 12.2236 6.44009 11.9801 6.57335C11.7366 6.70128 11.5268 6.8905 11.3507 7.14103C11.1798 7.38622 11.0658 7.67139 11.0089 7.99654C10.9881 8.10848 10.9778 8.23107 10.9778 8.36433C10.9778 8.75344 11.0891 9.0626 11.3119 9.2918C11.5398 9.51568 11.8273 9.62761 12.1743 9.62761C12.4385 9.62761 12.6898 9.56365 12.928 9.43572C13.1715 9.30247 13.3787 9.11324 13.5496 8.86805C13.7257 8.61752 13.8423 8.32435 13.8993 7.98854Z"fill=#1434CB></svg>', !1, !0, !1), ll = /* @__PURE__ */ C('<svg><path d="M16.6948 6.40544C16.8709 6.20289 17.091 6.03499 17.3552 5.90173C17.6246 5.76314 17.9172 5.69385 18.2332 5.69385C18.5544 5.69385 18.8367 5.76581 19.0801 5.90973C19.3288 6.04831 19.5204 6.25086 19.6551 6.51738C19.7898 6.7839 19.8571 7.09572 19.8571 7.45285C19.8571 7.61809 19.8416 7.78866 19.8105 7.96456C19.7328 8.41763 19.5774 8.82007 19.3443 9.17187C19.1112 9.51834 18.8289 9.78752 18.4974 9.97941C18.1659 10.1713 17.8188 10.2673 17.4562 10.2673C17.1402 10.2673 16.8709 10.2006 16.6481 10.0674C16.4306 9.93411 16.2648 9.7662 16.1509 9.56365L15.6847 12.3061H14.5891L15.708 5.76581H16.8035L16.6948 6.40544ZM18.6994 7.96456C18.7149 7.85795 18.7227 7.76201 18.7227 7.67672C18.7227 7.36223 18.6347 7.11704 18.4585 6.94114C18.2824 6.76524 18.0571 6.67729 17.7825 6.67729C17.5857 6.67729 17.3915 6.73059 17.1998 6.8372C17.0081 6.93847 16.8424 7.08772 16.7025 7.28494C16.5627 7.48217 16.4694 7.71403 16.4228 7.98055C16.4021 8.11914 16.3917 8.22041 16.3917 8.28438C16.3917 8.59887 16.4798 8.84406 16.6559 9.01996C16.8372 9.19586 17.0625 9.28381 17.3319 9.28381C17.5339 9.28381 17.7307 9.23051 17.9224 9.1239C18.1141 9.01729 18.2798 8.86538 18.4197 8.66816C18.5595 8.47094 18.6528 8.2364 18.6994 7.96456Z"fill=#1434CB></svg>', !1, !0, !1), cl = /* @__PURE__ */ C("<svg><rect fill=#2d32aa height=18 rx=2.57143 width=28.2857 x=.857178></svg>", !1, !0, !1), ul = /* @__PURE__ */ C('<svg><path d="m14.3253 6.42859c.9807 0 1.7689.63825 2.1192 1.54687.1225.30927.1923.65719.1923 1.02442l-3.3798.65722c.2101.5413.6836.8506 1.2089.8506.6653-.0001 1.0684-.3675 1.3135-.67677l.7529.67677c-.3327.4639-.9808 1.0827-2.0839 1.0635-1.436 0-2.417-1.0634-2.417-2.57132 0-1.54651.9981-2.57118 2.2939-2.57129zm-4.88572.01953c1.57592.00008 2.20602.71559 2.20602 2.2041v2.78418h-1.1377v-2.78418c0-.69587-.2979-1.1405-1.05075-1.14062-.6033 0-1.0032.18747-1.01562.19336v3.75004h-1.15625v-4.60063s1.10354-.40625 2.1543-.40625zm7.63572.11719c.4553 0 .9288.23171 1.209.63769l.5605.81153 1.0499-1.42969h1.3837l-1.7334 2.3584 1.8038 2.49316h-.6661c-.4551-.0001-.9279-.2123-1.208-.6182l-.6474-.88961-1.1211 1.50781h-1.3662l1.7861-2.45508-1.7334-2.41601zm5.6397 4.87109h-1.1211v-4.85254h1.1211zm-8.3545-3.94433c-.5954.00003-1.0679.40602-1.1905 1.14062l2.2764-.44531c-.1577-.44441-.5782-.69531-1.0859-.69531z"fill=#fff></svg>', !1, !0, !1), dl = /* @__PURE__ */ C("<svg><rect x=0.571411 width=25 height=18 fill=url(#pattern0_2794_2326)></svg>", !1, !0, !1), ml = /* @__PURE__ */ C('<svg><defs><pattern id=pattern0_2794_2326 patternContentUnits=objectBoundingBox width=1 height=1><use href=#image0_2794_2326 transform="matrix(0.00336449 0 0 0.0046729 -0.0046729 0)"></use></pattern><image id=image0_2794_2326 width=300 height=214 preserveAspectRatio=none href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADWCAMAAABc3U+MAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADAFBMVEX////PCB0IRo8ITJXRDB/OAhsGQYrMARoISJAIVJ8JSZIIRI3PCh4JV6EIUpwHT5oFPoYEZq3PBh3TESEMXaYLWqQEPIT//v7NBRwKWaMIYakBbrICa7ANM3rVHiYHQ4sHTZgKX6fZLy3RDyAAcLXSFiPSHyYJN38NXKXVGSTVFiMServWIycDaa7XKCoLd7gHZKreTUAFOYHhXU7gWEnfUkQKS5TZNC81jsfTIyjXKywqh8MGY6vdRzwGdLYjg8E6kcrbRDoggL7kbV3ZODHjYlPaPDPbQjgvisZBlMvkaFgZf74SeLcZfbtImM3SGSToeWjm1NjrkYW6orEzicLeZ1mbudjno57pg3TXydHofm5XmMrbWUzaUkZPlMjki4KNstaTttjaPzXnc2Jqn83LAho+jMNZnc/sjH7id2rULEGjvtrvubSmudTcYFPwqaBwpNB1qdSxutHara/WMS7wo5ncpaTqysp3pM7kubnqh3nZu7+FsNZQm8/dz9bs0NEIcrPhcWPNy9fcbGKTrs7jfXDvnZLCy93ks7HXPjZgns59qtK2xt1jotHGuMXvxsS/nqrim5aFqc+jss3yr6dqpdJIkcbZS0Doqqa8u8zwvrq9x9rOv8nssa3UKCrul4u5wdWtv9jol47Rs7qLrM/QrbSApMvjg3nfw8a0tcrf1dzkkoqas9Lyta4qg7/as7blwcHpnpbhys7twb7FxdRynsjW0919r9bQxM/Gsb18nMPUOjTiq6nNuMKFnsK+q7ndc2zbnZxrmcXHpq/DmqOvxN3dlJCPpse0pLTXwsm8tMTEv80zaaWbrcuko7qrs8vP0d7PnqI1cq+dpL/WNTFimsrRparUQzrSLy3dfXXehX7I0OCTosBflsWMnr/PEyoxYZ2so7fdjIZzl8A4VZBWkcLPa2XZNUUyWpZKib7RVEvNeHXQXlaZob3GjpTcQUo2gbvLhIX59vjSSkLN3uzcTFRkkb/q8PXo4OQbaa3b5vC70+fojJT54eGxoLIdX6JDULFxAAAgAElEQVR42uya209UWRaHO5IQgYCQgBMutmBMqhwFSrymQaDtxis4lgGhYCLYkhIyhSjGxgJFrKAS1HQEm8hAxYIYZRQRikvXA51MOjET4hhNJzyZTuahH+Zt5sFOzPgya6299zn7XOrUMfM0CavgH/jy/X577V312Werszqrszqrszqrszqrszqr8385P/8qzz+V+Ydm/m6cn3Xzb/wYZnq6ms2hQ4f2wpSXH4Y5BnMV5yzMXZjvYS5c+AHmypUrTU2nT58+efLkn2Bewty58/Hjx3cw79++X3y/+PQ/H55+EOP+4Ha7r7H57tp3OH/G8T2HuX//fnt7+6VLl27evPkQ5sSJEy0tLV1dXXV1dfUwx2HOnLl+/SuYI0dqamoqKs6dO7cD5re/mrH63a8bpHHAn8NR5ChaX1S0HiY1NTU+Pn7jxo3wn5S0Zs2atWvXJibu3r07Lhc+63LXpaQkJCQkJ2RmZmRmZGQ4M9KdGRnpWXlZJSUlrrS0/LT8nPycbJjNMKWlhYWFW2Gqjh7dX1ZWVlxcTACJH8E7O8C4XUBuSI2gcWZ37ty6BcDevn27uLj4FMbtVjh1dgpKKiRiRISQD9IhNGcITEVFBSDZuXPnrl27tm/fvm/fl18e/OabAwcOfP31nj2bNm364jdTs3SwHA5Oi7NKjee4kjisxESkFRcXl5u7bh2DlZCcnJmJsDLSYfLyspBVSUkaTA4MZ8VgIa2jAhbZVq7AOouwGKvbCAsNY4IRK4B1C2ExVh/cKizOak6FRUKRT1wmGdYRhMVY7SRWCOsgweKsbMEiWoCqSIIVT7AYKwFLZaWB5SRYilhpJFaOUEuYVcVgFXNYZNYxHawftLDGEdaoBpb7KSXQzVgBrTk0y+fTiKXAotiZwJLEOiiLVRAblioW0VJYxatirY0mloCFYmWVuDgsGEUtCZZpCgWr8zyFTQyWYCXEQliLmhR2kllzKNZzn1kKW4xiVQixzFNYYMcsoiWJJbHSpjDXVgqJVY4klgqrWE4hF+us0vS3jWLJsJhZghZL4ZyorPs2U7hDZSVSeICzsmWWg7MS7a5LoQ2x0lGsrCyXy6XA0ol1VBbrkAYWmXVeW1mM1UvO6p2h3js7eQr19X5TJ1a9db1rUxgblkMRq8jYWDbqnaUwT4Uli7VZFiuKWVK/a85CUVmas5BwXQuLEBItn8/yLCRa2nrfJdf7AVHvBZ9i1npLWHHmKWRiCVgmKSw1mKWFNSCZdUVrllrvcgoBFTOLFZZ+b4h5FmrEEmfhHmQVE5aDF3zUFK4RS5ZOrGQhllPAcrlKLOpd1+/lSr8jrPMA67YEC2iNjxsWB6WxwgLWHHplo97tLFkFBdtsmmUi1kZb9c5TmGcqlsniYDwMB+42M1iisrhZCGsUYxh4h7B6qLJ63O4wT+GMnlX7J4llWLLswLISK8m4ZOlTqFaWyyyFpaVyZZWZw/qem3WbbQ4gVhuyGmewgNXbAMHqQVaGFPqI1f++ZMH8K1YMlbOwyLg4WJyFFrBylJW0VDGrStPvYiVt0MACsR4Bqykyq20cWHGzGCv4QAbDbh5CFGvOEEK53usMKTRdsvYoKdwWA5bDsGSZp9BQ7wosp1rvVFlpBCtHmMU3hyrdYcju1bhlDQw0N58HWCjWIMVwSpgVIli3AgGIYQ+MG//D4U6gNSM1VvC55uocPYU7d0RN4RcIy75Z6y2290SdWAkyKwOsfMHK3Cw1haeuNuDm0HwXWF2mFJJZyArEohSOAqp3gUCgp4dwXQuHSayZzhnTdv+ketek0J5ZUZasqHdozUoKZ6HOLLWzpBhWVVXtF7foag5rmLNi/U5mDVJlTQEtBis0Sp0VCCwGevgwsSYhhDMGWIKVsmTVmy5Z26MsWdtimeUwnIXxsepdgZXBzHKqh6FYSsWrA2NVKcOSzVJgNQuzQKw+OAyn2jCGkMLQ6K35+YAqVjhMrMArrCw/YxU0HoUt7O1KFcu63vdwsWKaJdd7tKuOxVmoiaHU8NkcFj8MMYZl02XTxYeqqbK8klkDaNblC7yy+jCGJ9vArJehEIpFsMisMH7C4cnwDMzcDC+sYNDQWF3a7d1yyZLqPQYsvpGaHIVmS5bxYiiLleXS33Z6CValWlkYw+q9kMPyw8MkVgOxQrNQrMFBMKtpCmKIrMZDaNY8pjDg6enxMFpgVuckY+X3+X2+ILX7fUksXQi/MnnJMrtDI6zPY8TQYeNeyBsLYekv0U7ptkOwXHJnkVgSrOliyaxjp041NDQM8MOQUjgIYjVNnURYjNaoiGEAYHkoheFJZDXjn0NWQYAVfKCE0HAUWollrPfYZsVgpcAyvjgALhZDzZ6l3Hag33t1hyGmEPvdi/0+rJrFYYFYj1AsqCyA1RFCWIyVx4OsPISKi+UHs3z9+hA+NLZ7LLHUFH5uaZbD/lWHwZIXB0ktgmWsrN5eimGlZnMAWuXe8mGsLGAlzLoMsAZvP3rU1Nd3mmLYQWaFENY8wuoBXmEP9NUkmQWokNVz9OpBe3vtpUuz+qOQsbK3vXNYMcySUxh1yTJuWVysDJ1YmEKmlgKLWG1lh+H0dHF1tbI5sBSu8MpiZl3pa+ojVsKseZhABM2CEHpQLJ5CYNXPxAKvABawmlC/yJHFsp9CO2bFqvfExDjtlpWsgSUaXoIlzCqVYe0XsLz8LORmKbCg3x8RLMzheAeKFZonszxEC8XisPwEC/sq+KD9ARNr4uGE3Fj1agij3qE1SxawsoJlsmSlmixZiVIKxV1Hbfh0Z7pmzcoXBd8rYFWKNQv6vRr73YuH4SmAdbVhZWBFwHqMndXX18cqq61DMSsSiSArz7KHs+pmrBBW8AGFcHZ2VhGrS+xY2rf3qC9Z7A4dE9YG86NQTqHhrpOiwuJ7lmyWfBpuZjEs1MEis7yYQnYYrjBW3Cwm1pAwax7VigQijFV4mWj5SSx/f7AfUAGs2lpiNTEBrBoFqyh7Q7Qlq4BYWcCyUe9rNWJJZmXKSyl7gidY+apZ2b0Aq5D3O4dVTZ1F/c4ra4XMQliDFMM+dhh2dJBZIWFWBFgtL08CLdIKUJFY5FU7wpqYeKgLYfTGipJC684yLFnx+idS7YtDSopyGipPf07lizCulgZWL65ZldKahSspdtawMItYLQCsx8gKc0hiAa5QB4kV4bAwhchq0t/NWfX3o1i1KNbN2YcoVmNLI4l1o75Vc9MxPs7oX7JYCrdYmGVMoeZ7aAGLxIqTYAmzzPasfJfSWWQWVFZlldzv1V6vyoqJtUCVRbDIrKG2IWbWSOjV/KsIzvIymDW53M3F6idaLITtsySWCCEXqxV/zmDWWNuj17sFLEesrwvXaFLIYaVIq4MES4jlYntWNjOrtFfEUDoMFbMaWA6BFopFMYR+f83MAlgjIWQ1T7A8iAtQ4fhfIKr+4BITa7aWs3p2ArzqelJ3A8VqPXPdrlgKrC12zUo1OwtVWHG8stgvQpSGd4qbdFaeSKEo+N5so1lUWZJZKyuC1eXHj1llYQqH2t4IsbhZy2yYWC/8L4DVEmdVW8vFetbY2Nj1BMW6ceN4a2uUo1CGpd3erWA5NjgsXrKSdGLJm4OSQzOz8pU9q5c6C1kxs6aniZYMC3FhDJEW73cwawhoMbNGXuGMRZYZrm4uFnq1FERaKqtn1FhPQKx6EAtY0U+Kjtivd2RlEcNoDw5JZmehnEIFltMpvdEwsVzibohmlVbSmsVhlbHFYa/3sFdj1sKCqVkdZNaryBh+FFb+FyTWxf4lxat7E5RCEgtDeKMVUshCWBNNLLMla8sfrGBFv0MbYMVpKku3Z6Ura5aLWAmzSsmsrSyGZdwsLPhhteCbf+KHIYf1eur10NAbWh1GRsissbGxZfxjXiGqixjCpaVvqbG4WBDCrkZghbCOq2JVmDeWeb1bxFCItT4qrET984wqFjdLev1zZVEIxWHYS51VySurSn8Ysn5f+YVSuICsHg/+jcEaIrP+QikcwRCOkVndZNYLnP6LS0tcrHu19+4hqhONYNYTGBKLs6qpqajhvwWRnpN130PLKbSAZed1RklhrjaFyZma178sDsvFY5idnaMchnyBB1YolnevMIttDj8hqwWCxTvrNcJ6ozEL1fqx+0cGCyNIYtV+C7BYCFEsTGEdS2HrdYTFQgi0/gioCNY+eW/QpHAbwfq9ZcEjKpMHBxmW/CVYirjsAKtkbWe5WBDFBs/MKjQehpoU/kIxXPgvcWcfWtV9xvGbRYQZ32jBI1JmJZjFgGzrakYsY6x1CMNy/6jVP5qYFUTIOoRpFgQLRqJssnLbKktw7fKHmkhwk8lailpvk0y9Lm10NZkmmmQzId2ub7veZrkzmc2el9/beb2R5Byf2P6hpTl+8vk+5zm/8zvnEqvWg8dS+1LdyOrQFTKLYL1PdY60Ospi7SSz6kgsgnWCWKFXJqtXcbfodhFC19zgmUI/WN/0vlHhXp1xwWJaC5AW96zSFQrWapzgcUOpGEo1rJM/0C2LaL22ZdBhFvd3grVD0Po0QbjOoViK1U5KIWjVsfnUu5DCEwyrWoVQdqxXpVeIynm30D1krSrzheUSa7HXdaGjv+sUwlfpglJ1Ib1s2Ypv6xjWP0Mdq55Ohi8LWsRq2zbDrEFkBbCYVepgKrVPmtW2ow3NSnyaILN2YwiPHmVUv/p4Z50IITcsJdZ+U6wfo1jf3Q6wKp+vel50rO8bA6lzyFq1MtAs19ww19HecfdMufNi5+vCKzVnqaud1epsyLQ21OsYOk+Gr40SLDaLYgis9jEtjGFbG5mVeD/x/rlz8AtZHSVYOz8GVnV1mzvexboovLqhxAJWextekiGkjrVmTZVg5VhvsIvlA+tfrvvQizWsr7lgeaRQtSxOoZjgyaz61c/UqzUHzeoFI4SjW0bJrL91gljECsQ6lpKsrhCrrgSalRCoIIVHBas69KpDiVVdbZ4JhVgvwakQd7dXMqw1Td9pst+zdwxZ+WD5rGSZ14Xl5lYjkUKFi8Waoq3KK5bZ5iwIYr0xOrwoY7jRiOEgxbDTMEvDEmYloJAV02ohVjsxhHUdLNZFFGtYeNVvE+tHmEJiBSHUYqkrnVpXe88HS7d3zzXSeVosgmVXS7Ys2te9TKECs5jVhm/pMeuk7lmNjektINYowOrsRLPOkFkpMKvbNKsLWYFYWIAKMthCqOrILGZ15MRFYgWw+sGsmvaadhQLz4TkFYWwClPY5Jix0CynWNOA5XENDbScsBaqy2gbrSlxHb3CWHRYLVdo6kXP0mIhrTSZBS0LaG2lGO4605qknpUyYHUxrXMJCaulZaei1dHxbocQa7hawNpf089iNYixAWhVQgEqaO8AC1kpWLUeKXzaH5Ztf/JiW3s3zHIODhJVKaBSN1kfXs2kG/Gv/9qWxm0nX65nVht0Ck8CrY0nZQgbuWVJs1rPkFhQaNYVZtXW1dWVoBhKVijWNRYLQthBqMCr4ephYNXf3y/FamhoYFYkVmUVsKpqUiEEWOsMWLYUBsNa4rPbzyGWrb9rsWCAf5jetWlyImc5Hg3KjU2+/vPGFzeIyUGZlRFmccuyxTAJZnWnunsOCVpdbV2JLmHWafKqpeUawLqGrNAshIWshsErEkuGsEGmkMSqqsIZq6mpSYh1wL+9lz39Tz9YHmJ5pNCxlqWXsxaUpn/9FlGyLJ9Hz6zc5EeNRsvKmGZByxpkVgDrTLJVmqVSyGadTpyWrDCE11isDhZLs0Kx2muEVw2MClnhjLUGxWoSYh2wp9AuViCsJY6WVeQJyyEWsbr64WR2eg/rZSc/2khmvZCRLStNY5Zh1hlu8MCKb9mLnTN8u5BuGf5F3TIUdw15sfR3tLRMSzW8AIErEHxhfXz/3u0kFhSIxazWH0CxegWrtU6xyqZnlncKbXcM9cnw4a4x63EebrTG3txIMcwgK1zMGh2l/o6sOlGsVjarewf95+pfnv8zy/vP6bftv2tl9/z2VA2wAq+ahFgmLFcKfc3yS6E3LKO/pycfi5Q47snfQAo5htSzUCyEBazQrGSSYrhjNh9ARazwT/YPe5tUCAHWunW9vfbpXaWwLACWs70XLfc4FxqsgFbphxP+PSq4Jt7cthHFAlZSrEHR3+1mzW4BLmtPDbD64foD65nV93prnbBYrOmZFQSL+jvvCSndlZvJcede11PWqBRrBMRKslk9qRBgYTQt62dVaBaIdQC86kVYaz1S6AfrOfcaaVGRuoo2BgcBC80az830wHNvYgyxZQ2KGCIrFmsoHLNEPdpLqA5gCHtra82OpVIYBGuJJyzRsoxlUiHW1bGYNfODHttKo4M2S7QsMGugeyA8WDGrer2EVQuw5F4/m1jFecwy27txMnTuu1204Jg1Swf9BoqFrMZJrBEwKwlmDSGtMGFZR7RYtTaxviHF8oe1xO9OhRZLmwVazVpNbEVa45IWwmodQrNSPSHCAlwn7GI1O9t7PliLHVsc5B4HfGqOxSpEVuPZ2Tzq7E8Ms86QWUlANdDTHSqsmFUjO9Za7xTOyQvLXPZTrGzbZxZusmb5sN8aHCVYkMIRnrKSA+GbZWWrOIRr7WKpFPrCCkihYyvp1OTsH/jY4DidC5GVNitcWIDrbU9YcSFWHrMWe54LBS2xI2RqLIzjnugcHx8f6ewUrIaGBgZ6UmHDisWOi47V3Owllh8sh1jmnWj7VtKpiXAOe+JDZRaKNZQaCN8sGLfOEqxmBStutPc5wTHUsIpcKeRzYVisyC1uWdKsge7wYcWOUwqBVUUFsYIqUykMNMt5qePadlu4cFYmUT9aumUhq56enrbQYT2SKRSwVsXjUqxpwJrr0bJ0e78Q5oHfBFZs1tAQ0wodlmVVglnNElaJMEuk0BfWc/YhywmLQ3gw3EO/YEthTwQ9KxY7JVNYwSlcGV8lUhhsljFkOSdSEmte2gr557zPASv8GMb2SFYCVhxgyRTmgWUbspwpnMqFfeS5pE7hvWhgWb1arJJVClZxHliLvVZn9Faj8sK3wj/yMVvLigCWZW03UrgqvnIl/JJi5YHlEsvYlzUei+DnfIhTKMw6HMG33C9TWFKiYTGrx4WlUjgv/BByECUrgHU5ghjG/ifFQlZAqmw6sMy5YblbrPLfxyKpXxpiRQLrlIBVgnMDsCrTKZyfH5anWOWfWdHAyqaiNcvaTKxKSiQszcoflmsgdcC6EIuobhIsYnX5cDRmMSxitVLPDb6w/uG+1LGnMCqx4EedYlj3AFY0PctXrEBYrksdveHvjVhkdVOwigjWfhMWsZIdyxeW50qWSuG8qWx0sLID3LIuX77cFcG3215hpFDCKiZYBQGw5vrBKi9vjUVY74n2HknPsnptKTRZ5Yfl3d4nokNlWTkFKwKz9mhWcVOs+dOA5TW9zyu/GqVYltXN7f3yrQjM+oUjhcXTMysghZtikdK6KWBFYdZ/WCyVwmIqZpUPlqdYhblIYcVyAAtZ3Qof1qNmgxVf6EwHlu+lTsQpxOphsSKAVV1hh1WsYRUUPBUMy/tSpzVqWB9wywofVrZXsYo7xCooyGeWcaPCgHUzYlbWBIsVOiyrWp8K4y6x/M3yWskSrBZlozYry2KFDmtPs6dYxdyxfM2aG5DCyFuWZV0hWJdChpU1ToVxd3vPZ5bXNXThSCxyWofZrES43+W4ndVKp1iBZi1f7tWxCjdFDiv2V2J1KVxYp5qDxSp46qdBsIrcd8AA1s3oYf03AlibabmhwjVkzVesgmD53KiIeiSlsTR0WNaR5uY8KQyGZexPlinE/Q3Rs4pliVWIsLLtajXZJZaCtTQ/LMd96MLPngCs2K1wYb39b9rfUFIiaCmx5sw3xCrwh+VzH7ow/SRgtSGrsGA96u9r7jM7loIFrHTLWro0CJbXBofCeeNPgJV1ODRY2T+19/XxvpmKEiOGT0tYSqyl/mYZYtl2kT6BMQvq0zBgWY/e3tx+vQ9Z9ZkdK063oXloMGEtDYDlEovfWDeTy+gcfwKf+BQ+/viO1/mj+OizdPBzPKDos5reg/oAX66JzxZ2IatLn/A7Nqnw+cLdu3f/Ub8Rkd6bJUo+ZEhvwuA6Il5Lw2/FON7eUHn97Nk+Lj+xaIE0P6zlPu298NmZbMoas7/1IoOPGKa3pdPpUXpQADfdjtB+P3HXXq76UXu/dOkVqHegzkPdP3+f6sH9B1R3Htyh+uLOF1R3v7iLdRu/oL68/SXXdaqzVH19vX1aLH0ujMv2zmYV5IVV5L2Xu/DZYzOFRbTwEfJMJpPOEKv0aHqcWSEt3O+HrIaG7sllP2J16ZWvENZ5L1iClYGKYd0lVBLWdWZ1lmH1CbOAlU0s6u9iMVmfC/1hLXdP7+ViL/e+GcIisTIvZoAViCW8SrNXLNYIepVkVDaxvlJiSVQOVpqWQHVbsJJmSVoClg5hs8eQNUfEULIKgKUfmDPFKlx0bOYxlCnMbEOxGgkXmUVijSRHkmyWIdYtTuE7X6kUnjdD6G+WLYXM6iyrpVjBl12suErhfJXCpQGwzAfm7G+6nSEsFOtlAIUhFBnUHcswy8ZKpdDZsQQts2HdMVqWEsurY6nu3ldhm97/Ls+F8zUsYvXYsBYtmsnZcGKLeE0kvugdP8pDvDlZvnqN370mX/zEb7vAdz91fQKsIIT4XoLTp1v+3EJ1Daru87qOzzuoLnINQ90YvoHVf6Ofqr2/XVUD1auVVdftYunBQbV3hiXECojh/4k7+9CqzjuOpzWigSTlVuWYVASXpFSyYcagRM3USJkJUfOHcf6hYgWjOGspiVz/iFJDlDWxxJquC3FXSaeZqJmhTG0uabi6+JZkQyJq3UAEoY7aQMc1Ib4k634vz3nO85xzz7nXNuf4CMU/mgY+/fx+z8u9z/N1vEpgPWR+frJWOQmP+cQNa0O5aY1/76YqjFo/KP5Nw/aD6s8luoKv/mfjsMz6V6tYNjj30OmOKkwKa7p20x4vzL2UFfwgdazo5J6/Ijlj4ovvtbmwoFLCylTaO9Ka5gFLuztuXVt9KXvD5smHZTF7b3Sh+kFFZUGerb0zq+qUYVlPONx8GbBi3LL8OuNfd1fOhfflIivTBsvLLK1jKa/O/PAyyvC6b2YxrYlRIPXmfadYShUmg2W9VjfFepUgHjyrOG91or79AiPeYG11EohFLSsZLEcRZr+W/Sx4s57wIivq3/8Ow7hYie39foK50BRrqissl46VnZ19JXhYp3kPHU3zl5Zz4fCKWoWusF61v+xnPTrTEjysbtrqrIn6+kvio3ILnZeZoL3/KFjBrx2MZt5E+wsrbeJ3Bdbhe7qjvU/1gjU98WtG2T8YgcO6zgdZPsNKO8JiFUizdLHcYL3qfF/Teow08A7/BGH9z39YRoMQy1mF07xhTdfWDer7mjuChnVBnGT5DSttQhzO8NG7dZ7MYrnDmv6q/iKw8v5a4LvDZnGQ1eG3WcZF7u/aHjoVWK5iZQTdtOLm4bvvZqUdKshTJkPZ3quxvbvB+of65QZNrGx8MfJ5oKyMJ+YHFR3+/67/OLc6tIf2hDVde5d7iipWRsbfgzUrEhystE26WOpcmBTW21ZUzGvWU6RPA90extdcDw7WocQnWcQqCSzzbXwtVicjKyvQHc9p+XFhALDilfwdI9tJlicsR/iJ9tJ0RpCLeCMaJKy07xOeZKUA620rokJ9PTkrKyfAdekT63PoIGA1qHvoVzRW7rA8xIIRYIun9s4fRAcB66TjcKbahDUtJVh0jKXBeiswtcZkew/GrHEN1mylY3mbZRNLCV3IyglKLSOyJsawLgcFy61jTXM1SxfLVoU5OVlvjQTUseRXZ4IyK9O+LZSwqj1giXN3p1iUqvNtIHsePMkCs/oCM8sYz0y3iTXbFMsNljO6MEMPTcuZFcha6zSyQlR9lwMqw4tuVTg1OawpjiLMEUGPT/3/PrwRj8FYE6RZaaO2rxmJPTSMai9YiTMxRXQh0LoXQBHGhFkg1tDloSDKcGF6wj00VqEHLEeYR5ZMiBbJhb4fAl4gsfqIVjBmGROuVVjtBStB5IJMteewpqc+z4hPYrHrMTILUIFYl2v9N2udyx4aOpY7rLed+RQy5FGmrd4c87VhDaBYsT40q+/yJ8GU4ah6RPq6usjygqV2LHMmzFFqkIILv/XxrCbezKyAVh+3rCH/zZrIc34OLcVyg6WLpfZ2TGlHWvMoBOwbv1ZbhjEY40Fi9QVUhuNyE+1YN3jAmqJE6qj9apZZg5RbmJt7zydaRndMFWto6JOhAMyKH9O/y82fgKUCy9zoaIsGE9a8mQyr6J4vlRgHVgMCF48hUMt3WOO2s3cpFs6FKcOy0o5nydRCDA/NLSr6xgda8UGBisXiIvTfrIn7yoU5oFWtLrLcYU2xMh6V5i5hzZRiwfjvZM+JRrxtAMWK4h8plv9laIzm6VVonmQJVinCslgRKpHgK0LaQysn+aOxJwOxATIrKopwiFn5DWs8L8999e4JS/1EJ0uDRfmOGIfJqeOhotAv9kximzcunBo4FRsYiEbBq2hfVKHlL6yj2n1o7XAmOSw1dVxnRSVoZtJS0urWSTs5HRs8xWIhqlgHqXUnCLOOFFg37V+3nSdXe8PSPyrMUvuV8CrXjFnFiPY5+zYbk6TVjQFMeowORJlWXwfAguE3rKMFeXwfWoFlE8sDltrelTWDKVauCYvy7OfMeePsJHSuZ203qAZjWIRRunjCYhGrS/7BMsbpuzPeYnnDUqdCuWhQxQqZYmGA7xurf9rG2hhr57jVAWEWjr6ODlOsS/6ZNTFqextEFSspLOcaS4plepWLrIpCHKMNqDDBd+9PwDX2JwWVYMVFCLRQLd9gxcfn2p+7mG0/cPCGRVXoEItZmUUYomBoU6x8jGgvv/Kj1qjxZzWUTGtm00abGVbUvP01FParDBcBjD4AABBYSURBVCfGFzkenRFi2arQE1ai7j5PWWGFQiYrIda+JUsWrFz+5YjxovX3+0//+amMPOYYX8GqT1ThHbwnN9mwjPih8dFK+5tiLousF4Q1k8WyVqOcOD5HigWsMKK9sPgFeBnPgJR5wVCEaaNYzXi1kLzq4GuFYFb4Q2vs/nD37kNy/I3GETHeU8ZfYRxVxh8oAXjdF+MnG0ZvuT0684Kw9KlQiGVjJZq77FjICmAVFq5atWrxZzuSAzPGRj7n65jE6pSWDx3tZVhUhUDLuoGJty/x6iXduzTvW3I49PAGyjt+tHFjKw66t9rY2NPY09ODMWB3F2GeB15cnfvm3Mo3Xd4U0w8cLFbJYSlizdSKUJsIEdYSLELBavnypUvPVm3bc2VkzEiM6dnIx7890XLi2v5r+80sbRFpTyHt0d7e3mjHcWEWinXp0tBVkxXRAlTf0R3Vhw0ND9c2DK99f/j9DUDrEaZDP974GFi1fl3aiLB6CNZdoHV3kXUZM+GTkfZFVgqw5CJL6VgzVbFCoZAKa58sQsFq+dKzZxdXVZUVF5dv++zLzTuuPH/+fGRkBP758ZUdm1vERd9rAEsTq00k2iOtqAhpv1PLt3vRK6T14Cqz+rcQ62E9s1o7TGYBq0cIC8R6/HUpitUoWN1CVouO6a/jo1gznO1dPyJNCksRa5YQS8AqKlGbO4mVny/EKkRYy0msxQCrqqp469at5RxnD+P27dtbtmw5L25Fn0BW+5WG1TbQ1tYmEu17j4tIe2R1J8x1KC9Bw/iO1OIyBFoU0b5hA9chsnoMXsEfCxaV4TEVFr9KMEPASk8iVsqwFFYgVgmiUpr7vvwlS0gs8qpCilVVXLx1mcYK75CfP4+sWlAsy6sbp2rw7jiL1dvLsBhVLbC6FNbEesAti66IP8SOBWYNm2WIZmEVtpJYXIa3ANbdXQnEKlBYJfw2SCqwlC20XSzNK+5YxGrlgkLZsFgsYFW8tby8XMC6TWJ9kECsnciKxBpsbo6QWACLelYtmhW+Y12wf5Cgwa8VDV6Ixf0dWxaKJcwCsXbpYlXaHnzP9BbLC5ZWhU6xFFb5lliFJJZZhMVAyxJL1CCzaoHmTmJ1klg1LBbU4CDAiogqPF4LZtXWhmGgWlrL0ubCh2bHEnMhlWFpKZvVI8wSaXzHEryOn56evL27wbop23vCKnQ0LEK1YIHFaulZk9WycoJFRdhEVUjvOLTgMw7oVSd5VQMDWQ0CqkhzRJZhF4qFZRimBn/YbpZJay2LxWqhWKwWi9VoiSXjmmxVmO5ShVOrU4GVcN2AqHJLTLEsrwQsWYTLly5eXFZVRh1r2R/LmdU2ZiXevBCs9ndSx6oBsdoIVvNgJEJm1QGrruNdoFZtuJZZHWZWVyUrWjg0XJSrLEKFDYvK8GsQS6wc3pFhq1YEUeV8u1jOPbTWsVxgGTcTtvdcoFViiSUW7vkEi1kpYpUhq+Jl2LFWI6xt65ukWH85aInVKcRqqyGxkBXSqus9Xodm1eIIh01agOuMItZ2gFWPrB4ireENsme18pq0tJTFokB7SyyZbSUzMV2qMBVYaJbcQ1vtHbUqKVFgWV5JsWjVgGKV4RoLWVER7l2/vul2kymWZNVJRbiTirAdUQlW/aRWXVcXlqFoWYfZrDMg1ibB6gDAqjfLcNgqQi5DNIsy2nveoSq0Whal8c3Xs62S7KG9zHKrQmBVUqTun/PVIiy0ZsIybljLpFhNTU3m0zMHzXdnwKtOYIVitYNWQCvCtEAsYHW8S5j1VTi8zqL1wKR1gFpWvbXZQbM2Uh2iV6WtpStWSLN2WWmrMmFOxOqkp6c7tjpTU4aVdjPhXMiwQvYqZLGQVYUoQpgJy8qKq4qBFXSs1dSxqAjplZ6DBwUrgYrFamuXYkX6e/vr6oAVDEYVRlpYhH9GVptMs7Zv11hZZpFYrSAWrxxky8IUXzWOT4OVZJHlYVaGfS5kVrkqLLtY0LAqmBV3rGWiY+1FVrfRLPZKh0Ws2tsZVnekG1hF+sEsGAIW4FrHsLBlnWFYJ0GsAxe3A6x6c5VFLWujucz6NawcUKyexp4ep1g0rLymzOSLLA+z1Cq01g3QsnAqDM1R27u5aiisqCCxFtNUiN0dzeIi5Cr8gGARq3eJVefOT5kVoTqHrLoj/f2Rukgdt6wuZgW0Lq0js84IWCepZQGr+np9MpRLUpwLV6hi/UzPPC4AWDOcYrm39xRgqe09V7DCYxmlCgEViVVRIbu7yUqKRR2LWR1s2QNevauI1Y4DWA0Cqm7wqh+rsI5hfVT7FcHidyGhCs9sQlonwawDpllymfUrIdYvBa0VKNZv1Co8tvDnC0WM73xlLvT+oCIJLMceep45FzIssctRlw0VFUoRMiyYClevFmJt2fKZQ6ydyOrzGoHq3LluGP3dKquPuug1TbMM8elMQIWssAy3m2Vo2+sgq9L/t3c+oU2ecRzfTr10h/1jMkZBtwllriM0oaB0bkvjXLeVRqhtOqWZWVmtjtKxkqVrE8xmK1MJG0pDJfQPQkun2CRie/DQSw/eevAiHnL0uDEoOJbBfn+e53mf5/2TN/XkIY9/QEEPHz7f7/t73rx53k5OoTJLiHVIvkzbeqW9x1an6ZlgyXpHVpxCwUqKJWEJVkcUKxCrZ5pDeBW9Gv+RvYrHOYTECkO4ePcuhFDBYlx3UncukVn37wOs/iKZRaeMIiwQS8Qw7BbDzjkJq6tLTaRt/Jb2g9aLx/eSwhqw3OYGKdb7ahzVxfrEIVZPT89X05pY4xjC36fiv8RvfX3rJIq19P3SIqECr+4qVmRWCs0SrEQK0SwUa0im8CywutDHZrW3E6vQ6QCZhSn8lFhxvx8+cLitjd9of9B6pb2cSA1WHin0g2VPoah3q9xVvX/pEkISaxpZXUWx0KvLl6duxm/Gb91SKaTCIlibm7FNccDtT6sIC8yiU23zZNZvRYKFtFYMsy7IGAKt00GOIYuFsI6pFB4WYrW0tLZqb2l/u549dJ2w9Hrne8nirrscGz78wLgSHrHancQiVpZYU7/H4+gVicVeLd4QYgGrBw/g5yqx+imVEpWVp36HGC5bKXyErNCsC2HBiswCVCGCpSYHIRbAapOwWlvJrFdrD1nD9cNyEetN61pobAq1S6EU6yMJa/rbrwjWdWysy5c3oLGgsCCDIoWLS4LV3ewmn5wce7D6YHWVDk2+I85L5pOSLbGGWCzY7cgYRvoiQCtIZgUAVieZ9ekZSyyCpcRCVu/abs686NNYdcDShyzeFuoplPscq96PG2KJEH5zHWCNk1gIC70isZZQrBt02vRmNsa0SmxWClil+GhpYJUXKQRaJ4DVkEghigVmhUVltZ8KSrGws2wpbNNgGfXeXF+9e8N6ybaH3u9a79am0CHWZ0IsgmWxuolHdYt2R1ZXGFY2i7SkWavCLDqMu3A/T2YVi0VZ8EOysqjgOYYRpBU8FQqpFAqxuh52sFkKVqut3t2ee6cUVp78WakPlrgWvlar3l1nLJ2V1u5Y7xt4rDldCU9+d47FQlSzCCvGXpVKyGp9XZ5bzqzyCOs3IdbQ5MrKgDIrHO7r7otEuLKCITKrc06H5Z7C2mIBrEo1V62enx/1hfWSbatjzQ0vG/WubXSOOsWaJrGuKrE2OIR4/LtkBbBuECuglUZYsRjBYrOos/LKrOXlBYIFrFQMw2wWw0JWodNzgU5h1pljAAvEOqDDavWEpX/Ht6mS+5kA5f6szyz7nSxteveeseyNZbCi8/KVV1cW8Yh8Ph4/BqzSwKq0WlJmAaxCoaCxWv7jBMAa0VMozAJWkMIgsgrAnKXEsmD5pNAhVv9uJVMu91cqmYqvWUa9iztZtVKoxDpuiPUrwxoHWBscQiHWEjUWoJqdnUVWKFY6bcWQcJ2HgudnEyaYFsEamhzAGA4CrASwCneDWJEIwQoFQ6G5gKwsMKsLYHUcqJVCj+m9khuu/N3cXKwOP9raEyyfejdYuYl13UOsKxBCQpXN3kunGVUMaTEqZEVmjY3JFJ6AGI4MrUwKsxIkVp+orOApaZYOq8MGq9X1WviK/XPo3SrCGq5Wh0f7/WB5b3XU3Qa9sjCER41doY2VFIteWMEvq9im91TMZoHWTiyLXsEvNCtJYrFZHEOANVEszkAO0azJyZWBAQtWd3e3FAvUCoUCtsrqsFLYYqZQayz7kLVv99Fw5Y3cf5DB0UKdsNyuhR63G2qIJVlNMauT9F6P7W1ihaiEWOkSsuLKAlTz51OXCpcK+YIwawbNAlgjzOri2V7sdzQLRlKorKCsrDmGpcTqYFh+9W4OWU/60ax9+S10zB+We727DFnmQKrPDb8qWBsyhPweFH4DCrKafYwhzKbvSVrJUpLEKqfw8So0awzMmijOFJcXlimFaNbgxYu9srJQrAiMpGxWgM0CsY4ds1Koi9XqvDnjfIp0X7KCMdyqDhee+MCyzQ1KLP0GqX4ttM8N9sYaN0NosQJUOzv3WCyh1nqSUAGsFD19hmKNTehmTYJZgwArQbD6OIXtHMKQrKwzEtYPz1DvQGa30LwLc+noVv+wPyz7tdC5h/ZKoWgsPYUbEpYQi9+sg149Blbo1Vo6HS1FSaxVoFVeL5+HykKzCmNjZNYMmMWsANbgYG9vgszq7uZrIXUWsQqwWASrvnp3fdhvq7zbvG+0P99cP6z9fimsIdZVm1hxKdY2iUUZ3EGxwKy1dBR+AKwk9HtuvVxOzXMKr0EKxyYA1vLMApg1MjIixepNJBJWv7fLevdM4SFnvdd8GmS0Ws7ld/23O47GYljWB/YqhZ+/Zw4OTlj6pVATi716zKzW1taiaFYGzUomUax57KzbRAvEQrMWMIZYWQNsVm/iggNWwJHCA3q9159Ct1U3LCXWW+bTDZ97sZq2WG14imWwikZLGUKVW8/h07Rk1rVrAAvMmpkhscAsTuHgWeyssIDlIpYGS4p1yGV69/8cun5Y5txQc8jyqHfnpfCcbCxkhbDuISxcmVIGYCXp6WOCdRtpSVjLBiw0ywPWx/bK2tMeumnPsF4399D6kPWOe70b28JplUK93QUsQ6wdwYpolTJCLWI1j89lk1kTyqwRCYtYJeTk0G7NDQFzItXq/VDdQ9azwdrvSGEdQ1YP38jiFBItJdY5/VIoG0uximZILMssCcuMoSVWQhcr5FVZtfbQtZ7JalK/1Yb1uuv0bhuyjBtZx4/Yp3c3sdgrgDVrikW0SphC/C6Aqqzbt2UKJ5DVgmsKI96V5VPvexSrBizHY0au9971Ieu4wUrvd62xtrmx/jUaS4gVFSG0KgvFuqaJ5Uih2+BgT2Gb95D1ordYTU65asPyGrI+tN3J8pwbxh0z1jkplgyhEgsbK2OFUEuhWVmGWGGr3oOO8d1/bmiu5xMwH7P++se28FtMX8jF99ztF0G1I2SrtKFhyuh29uqxlcGna0+jT8mrKNNK0pdxXHFZctl6y/JL7HnkfXgcTrsePkRuh2m1oWj4JE1Ly8HK3tYTj8NN9OX4i1pL+z/EPxN/fOFZvhf8xvO1Xmisxmqsxmqsxmqsxmqsxnp+1v/VFfE0ErzsjQAAAABJRU5ErkJggg=="></svg>', !1, !0, !1), _l = /* @__PURE__ */ C("<svg xmlns=http://www.w3.org/2000/svg fill=none role=img>");
const lt = ({
  width: e = 44,
  height: t = 44,
  name: n,
  className: a
}) => {
  const r = `0 0 ${e} ${t}`, i = {
    visa: [Xo(), Jo()],
    mastercard: [Qo(), el(), tl(), nl(), al()],
    amex: [rl(), il()],
    postepay: [sl(), ol(), ll()],
    nexi: [cl(), ul()],
    cartebancaire: [dl(), ml()]
  };
  return (() => {
    var s = _l();
    return R(s, "viewBox", r), R(s, "height", t), R(s, "width", e), R(s, "data-testid", `${n}-icon`), R(s, "class", a), R(s, "aria-label", n), g(s, () => i[n]), s;
  })();
};
var pl = /* @__PURE__ */ C("<figure data-testid=payment-methods>");
const hl = (e) => {
  const t = (n) => {
    switch (n) {
      case "it":
        return [p(lt, {
          name: "postepay",
          height: 18,
          width: 29,
          "data-testid": "postepay-icon"
        }), p(lt, {
          name: "nexi",
          height: 18,
          width: 29,
          "data-testid": "nexi-icon"
        })];
      case "fr":
        return p(lt, {
          name: "cartebancaire",
          height: 18,
          width: 29,
          "data-testid": "cartebancaire-icon"
        });
      default:
        return null;
    }
  };
  return (() => {
    var n = pl();
    return g(n, p(lt, {
      name: "mastercard",
      height: 18,
      width: 29,
      "data-testid": "mastercard-icon"
    }), null), g(n, p(lt, {
      name: "visa",
      height: 18,
      width: 29,
      "data-testid": "visa-icon"
    }), null), g(n, () => t(e.locale), null), U(() => z(n, `flex flex-row gap-1 ${Oe("justify")[e.alignment ?? le.LEFT]}`)), n;
  })();
};
var fl = /* @__PURE__ */ C("<span>");
const O = (e) => (() => {
  var t = fl();
  return U((n) => {
    var a = e.testId, r = e.className, i = e.children !== null && e.children !== void 0 ? e.children : void 0;
    return a !== n.e && R(t, "data-testid", n.e = a), r !== n.t && z(t, n.t = r), i !== n.a && (t.innerHTML = n.a = i), n;
  }, {
    e: void 0,
    t: void 0,
    a: void 0
  }), t;
})(), Vr = ({
  products: e,
  amount: t,
  locale: n
}) => N(() => {
  var i;
  const a = t();
  if (!a)
    return null;
  const r = e().find(
    ({ product: s }) => s === I.PAY_IN_FOUR
  );
  if (r && ((i = r.configuration) != null && i.splitFee)) {
    const s = Vn(a, 4, n()) || 0;
    return s > 0 ? s : null;
  }
  return null;
}), Xt = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, Jt = ({
  schedule: e,
  locale: t,
  currencyDisplay: n,
  currencyPosition: a
}) => N(() => {
  const r = e();
  if (!r || r.length === 0)
    return "";
  const i = r.map((o) => o.amount.amountInCents), s = Math.min(...i);
  return $(
    s,
    t(),
    n(),
    a()
  );
}), Gn = (e) => N(() => {
  const t = e();
  return !t || t.length === 0 ? 0 : parseFloat(t[0].taegPercentage ?? "0") || 0;
}), St = ({
  products: e,
  totalAmountInCents: t,
  locale: n
}) => N(
  () => t() ? Fn(
    e(),
    t(),
    n()
  ) : {}
);
var Aa = /* @__PURE__ */ C("<p>"), gl = /* @__PURE__ */ C('<article><span class="flex flex-col gap-1">'), yl = /* @__PURE__ */ C('<span class="mt-3 text-2xs">'), xl = /* @__PURE__ */ C("<span class=mt-1>");
const bl = (e) => {
  const t = e.darkMode === Se.SYSTEM && Xt() || e.darkMode === Se.ALWAYS, n = N(() => jt(e.merchantConfig.products, e.amount)), a = Vr({
    products: n,
    amount: () => e.amount,
    locale: () => e.locale
  }), r = e.hideInstallments ? "product_widget:pay_in_4_service_fee_single_no_amount" : "product_widget:pay_in_4_service_fee_single", i = (d) => {
    if (De.includes(d))
      return "checkout_widget:pay_in_n_consumer_landing";
    {
      const m = d.replaceAll("-", "_");
      return e.hideInstallments ? `checkout_widget:${m}_no_installments` : `checkout_widget:${m}`;
    }
  }, s = () => or(n(), e.locale, ce.CHECKOUT, t), o = St({
    totalAmountInCents: () => e.amount,
    products: n,
    locale: () => e.locale
  }), l = (d) => Jt({
    schedule: d,
    locale: () => e.locale,
    currencyDisplay: () => e.currencyDisplay,
    currencyPosition: () => e.currencyPosition
  }), c = (d) => Gn(d), u = N(() => {
    if (!e.amount || !o())
      return null;
    const d = Dn(o()), m = Gt(d);
    return $(m.amountInCents, e.locale, e.currencyDisplay, e.currencyPosition);
  });
  return p(M, {
    get when() {
      return e.amount;
    },
    get children() {
      return [(() => {
        var d = gl(), m = d.firstChild;
        return g(m, p(M, {
          get when() {
            return n().find((_) => _.product === I.PAY_IN_THREE);
          },
          get children() {
            return p(O, {
              testId: "checkout-label-pay-in-3",
              get children() {
                return E(e.locale, i(I.PAY_IN_THREE), {
                  installmentAmount: e.hideInstallments ? void 0 : $(Yt(e.amount ?? 0, 3, !1, e.locale).baseInstallmentAmount, e.locale, e.currencyDisplay, e.currencyPosition),
                  textStyle: `font-semibold ${t ? "text-white" : "text-black"}`
                });
              }
            });
          }
        }), null), g(m, p(M, {
          get when() {
            return n().find((_) => _.product === I.PAY_IN_FOUR);
          },
          get children() {
            return p(O, {
              testId: "checkout-label-pay-in-4",
              get children() {
                return E(e.locale, i(I.PAY_IN_FOUR), {
                  feeStar: a() ? "*" : "",
                  installmentAmount: e.hideInstallments ? void 0 : $(Yt(e.amount ?? 0, 4, !!a(), e.locale).baseInstallmentAmount, e.locale, e.currencyDisplay, e.currencyPosition),
                  textStyle: `font-semibold ${t ? "text-white" : "text-black"}`
                });
              }
            });
          }
        }), null), g(m, p(M, {
          get when() {
            return a();
          },
          get children() {
            var _ = Aa();
            return z(_, `flex-1 font-medium ${t ? "text-sp-light-gray-2" : "text-sp-light-gray-1"} text-xs`), g(_, p(O, {
              testId: "checkout-widget-service-fee",
              get children() {
                return E(e.locale, r, {
                  feeAmount: $(a(), e.locale, e.currencyDisplay, e.currencyPosition)
                });
              }
            })), _;
          }
        }), null), g(m, p(Te, {
          get each() {
            return n().filter((_) => De.includes(_.product)).sort((_, h) => _.numberOfInstallments > h.numberOfInstallments ? 1 : -1);
          },
          children: (_) => [p(O, {
            get testId() {
              return `checkout-label-pay-in-${_.numberOfInstallments}`;
            },
            get children() {
              return E(e.locale, i(_.product), {
                installments: _.numberOfInstallments,
                installmentAmount: l(() => {
                  var h;
                  return (h = o()[_.product]) == null ? void 0 : h.paymentSchedule;
                }),
                textStyle: `font-semibold ${t ? "text-white" : "text-black"}`
              });
            }
          }), (() => {
            var h = Aa();
            return z(h, `flex-1 font-medium ${t ? "text-sp-light-gray-2" : "text-sp-light-gray-1"} text-xs`), g(h, p(O, {
              testId: "checkout-widget-tag-taen",
              get children() {
                return E(e.locale, "checkout_widget:pay_in_n_consumer_landing_tan_taeg", {
                  tan: _.configuration.tan,
                  taeg: c(() => {
                    var f;
                    return (f = o()[_.product]) == null ? void 0 : f.paymentSchedule;
                  })
                });
              }
            })), h;
          })()]
        }), null), g(m, p(M, {
          get when() {
            return n().find((_) => _.product === I.PAY_NOW_CHECKOUT);
          },
          get children() {
            return p(O, {
              testId: "checkout-label-pay-now-checkout",
              get children() {
                return E(e.locale, "checkout_widget:pay_now_checkout");
              }
            });
          }
        }), null), g(m, p(M, {
          get when() {
            return s();
          },
          get children() {
            return p(O, {
              testId: "checkout-label-pay-in-x",
              get children() {
                return s();
              }
            });
          }
        }), null), g(m, (() => {
          var _ = N(() => !!Re(n()));
          return () => _() && [(() => {
            var h = yl();
            return g(h, p(O, {
              testId: "checkout-accepted-methods",
              get children() {
                return E(e.locale, "checkout_widget:accepted_methods");
              }
            })), h;
          })(), (() => {
            var h = xl();
            return g(h, p(hl, {
              get alignment() {
                return e.alignment;
              },
              get locale() {
                return e.locale;
              }
            })), h;
          })()];
        })(), null), U(() => z(d, `flex flex-col gap-1 p-2 font-medium font-scalapay-poppins text-${e.alignment} ${t ? "text-white" : "text-sp-primary-gray"}`)), d;
      })(), p(M, {
        get when() {
          return !e.disableCheckoutTitleUpdate;
        },
        get children() {
          return p(Wn, {
            get installmentAmount() {
              return u();
            },
            get merchantConfig() {
              return e.merchantConfig;
            },
            get products() {
              return n();
            },
            get locale() {
              return e.locale;
            },
            get checkoutTitleSelector() {
              return e.checkoutTitleSelector;
            }
          });
        }
      })];
    }
  });
};
var wl = /* @__PURE__ */ C('<svg viewBox="0 0 24 24"fill=none data-testid=info-icon xmlns=http://www.w3.org/2000/svg><path d="M12 2.90039C13.1949 2.90039 14.3785 3.13558 15.4824 3.59277C16.5863 4.05002 17.5896 4.72061 18.4346 5.56543C19.2795 6.41031 19.9499 7.41371 20.4072 8.51758C20.8645 9.62152 21.0996 10.8051 21.0996 12C21.0996 13.195 20.8645 14.3784 20.4072 15.4824C19.9499 16.5865 19.2796 17.5896 18.4346 18.4346C17.5896 19.2796 16.5865 19.9499 15.4824 20.4072C14.3784 20.8645 13.195 21.0996 12 21.0996C10.8051 21.0996 9.62152 20.8645 8.51758 20.4072C7.41371 19.9499 6.41031 19.2795 5.56543 18.4346C4.72061 17.5896 4.05002 16.5863 3.59277 15.4824C3.13558 14.3785 2.90039 13.1949 2.90039 12C2.90044 10.8051 3.13551 9.62152 3.59277 8.51758C4.05009 7.4136 4.72047 6.41039 5.56543 5.56543C6.41039 4.72047 7.4136 4.05009 8.51758 3.59277C9.62152 3.13551 10.8051 2.90044 12 2.90039ZM12 5.09961C11.094 5.09966 10.1964 5.27829 9.35938 5.625C8.52231 5.97176 7.76177 6.48042 7.12109 7.12109C6.48042 7.76177 5.97176 8.52231 5.625 9.35938C5.27829 10.1964 5.09966 11.094 5.09961 12C5.09961 12.906 5.27837 13.8036 5.625 14.6406C5.97169 15.4776 6.48056 16.2383 7.12109 16.8789C7.76169 17.5195 8.52242 18.0282 9.35938 18.375C10.1964 18.7217 11.094 18.9003 12 18.9004C12.9061 18.9004 13.8035 18.7217 14.6406 18.375C15.4778 18.0282 16.2382 17.5196 16.8789 16.8789C17.5196 16.2382 18.0282 15.4778 18.375 14.6406C18.6784 13.9081 18.8527 13.1292 18.8916 12.3389L18.9004 12L18.8916 11.6611C18.8527 10.8709 18.6784 10.0919 18.375 9.35938C18.0282 8.52242 17.5195 7.76169 16.8789 7.12109C16.2383 6.48056 15.4776 5.97169 14.6406 5.625C13.8036 5.27837 12.906 5.09961 12 5.09961ZM12.001 10.6006C12.4979 10.6008 12.9014 11.0041 12.9014 11.501V15.001L12.8965 15.0928C12.8501 15.5462 12.4666 15.9012 12.001 15.9014C11.5352 15.9014 11.1519 15.5463 11.1055 15.0928L11.1006 15.001V11.501C11.1006 11.0039 11.5039 10.6006 12.001 10.6006ZM12.001 8.10059C12.4979 8.1008 12.9014 8.50405 12.9014 9.00098V9.01074L12.8965 9.10254C12.8502 9.55607 12.4667 9.91093 12.001 9.91113C11.5351 9.91113 11.1518 9.55616 11.1055 9.10254L11.1006 9.01074V9.00098C11.1006 8.50392 11.5039 8.10059 12.001 8.10059Z">');
const Fr = (e) => (() => {
  var t = wl(), n = t.firstChild;
  return U((a) => {
    var r = e.width ?? 21, i = e.height ?? 21, s = e.fill ?? "currentColor";
    return r !== a.e && R(t, "width", a.e = r), i !== a.t && R(t, "height", a.t = i), s !== a.a && R(n, "fill", a.a = s), a;
  }, {
    e: void 0,
    t: void 0,
    a: void 0
  }), t;
})();
var Cl = /* @__PURE__ */ C('<svg viewBox="0 5 132 25"fill=none xmlns=http://www.w3.org/2000/svg role=img aria-label=scalapay data-testid=scalapay-logo><path fill-rule=evenodd clip-rule=evenodd d="M0.256527 10.5036C-0.0990205 10.0963 -0.0832167 9.48709 0.292984 9.0984L4.2983 4.96013C4.71179 4.53291 5.40037 4.53291 5.81386 4.96013L8.87503 8.12292C9.28852 8.55014 9.9771 8.55014 10.3906 8.12292L13.3641 5.0507C13.7776 4.62348 14.4662 4.62348 14.8797 5.0507L18.8708 9.1743C19.2468 9.56281 19.2628 10.1716 18.9077 10.579L10.4151 20.3224C9.99624 20.8029 9.24538 20.8032 8.8262 20.3229L0.256527 10.5036Z"fill=white>'), vl = /* @__PURE__ */ C('<svg viewBox="0 1 82 16"fill=none xmlns=http://www.w3.org/2000/svg role=img aria-label=scalapay data-testid=scalapay-logo><g><path d="M72 0H9C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18H72C76.9706 18 81 13.9706 81 9C81 4.02944 76.9706 0 72 0Z"fill=#030402></path><path d="M10.3022 13.3789C10.149 13.3789 10.0086 13.3278 9.90643 13.2257C9.86813 13.1874 9.82983 13.1491 9.79153 13.098C8.31068 11.4129 6.8426 9.71503 5.36174 8.02992C5.32345 7.99163 5.28515 7.95333 5.24685 7.90227C5.09366 7.68524 5.09366 7.41716 5.24685 7.2129C5.28515 7.17461 5.32345 7.13631 5.36174 7.08524C6.01281 6.40865 6.67664 5.73205 7.34047 5.04269C7.37877 5.00439 7.41706 4.96609 7.45536 4.9278C7.67238 4.73631 7.97877 4.73631 8.19579 4.9278C8.24685 4.97886 8.29791 5.02992 8.34898 5.08099C8.80855 5.55333 9.28089 6.03843 9.74047 6.51078C9.79153 6.56184 9.8426 6.6129 9.89366 6.66397C9.95749 6.7278 10.0469 6.77886 10.149 6.79163C10.3405 6.84269 10.4937 6.79163 10.6469 6.67673C10.6979 6.62567 10.749 6.57461 10.8 6.52354C11.2469 6.06397 11.7064 5.59163 12.1532 5.11929C12.2043 5.06822 12.2554 5.01716 12.3064 4.96609C12.5234 4.76184 12.8426 4.76184 13.0724 4.96609C13.1107 5.00439 13.149 5.04269 13.1873 5.08099C13.8383 5.75758 14.4894 6.43418 15.1405 7.09801C15.166 7.12354 15.1915 7.16184 15.2171 7.18737C15.4086 7.40439 15.4341 7.69801 15.2426 7.94056C15.2171 7.97886 15.1788 8.01716 15.1532 8.05546C13.6979 9.71503 12.2554 11.3746 10.8 13.0342C10.749 13.0852 10.7107 13.1491 10.6596 13.2001C10.5703 13.315 10.4298 13.3533 10.2894 13.3661L10.3022 13.3789Z"fill=#F7CBCF></path><path d="M52.4299 10.5702V5.78299C52.4299 5.70639 52.4299 5.61703 52.4299 5.54043C52.4299 5.5149 52.4682 5.4766 52.4938 5.4766C52.5321 5.4766 52.5704 5.4766 52.6087 5.4766H53.9363C53.9363 5.4766 53.9874 5.4766 54.0129 5.4766C54.0895 5.4766 54.115 5.50214 54.1278 5.57873C54.1278 5.65533 54.1278 5.71916 54.1278 5.79575C54.1278 5.84682 54.1278 5.88511 54.1278 5.93618C54.1278 5.94894 54.1661 5.97448 54.1916 5.96171C54.2555 5.92341 54.3065 5.88511 54.3704 5.83405C54.8172 5.54043 55.3023 5.37448 55.8384 5.33618C56.9874 5.27235 57.8938 5.73192 58.5831 6.63831C58.9023 7.05958 59.1065 7.54469 59.2087 8.05533C59.2725 8.34894 59.3108 8.65533 59.298 8.96171C59.2853 9.61277 59.1321 10.2128 58.8129 10.7745C58.315 11.6426 57.5746 12.1532 56.6044 12.3702C56.2597 12.4468 55.9023 12.4468 55.5576 12.4085C55.1746 12.3575 54.8172 12.217 54.4853 12.0128C54.4214 11.9745 54.3576 11.9234 54.281 11.8851C54.2555 11.8723 54.2172 11.8851 54.2172 11.9234C54.2172 12 54.2172 12.0894 54.2172 12.166V15.5362C54.2172 15.6638 54.2044 15.6894 54.064 15.6894H52.5704C52.481 15.6894 52.4555 15.6638 52.4427 15.5745C52.4427 15.5234 52.4427 15.4723 52.4427 15.4341V15.166C52.4427 13.6341 52.4427 12.1021 52.4427 10.5702H52.4299ZM54.1916 8.89788V9.80426C54.1916 9.88086 54.2172 9.94469 54.2555 9.99575C54.4214 10.2128 54.6257 10.3915 54.881 10.5192C55.3278 10.7489 55.8001 10.8128 56.2725 10.6723C56.7959 10.5192 57.1533 10.1745 57.3704 9.66384C57.4852 9.38299 57.5363 9.0766 57.5108 8.77022C57.498 8.38724 57.3831 8.04256 57.1789 7.73618C56.9363 7.37873 56.6044 7.13618 56.1704 7.04682C55.9406 6.99575 55.7108 6.99575 55.481 7.04682C54.9831 7.13618 54.5874 7.37873 54.2682 7.76171C54.2172 7.82554 54.1916 7.88937 54.1916 7.97873C54.1916 8.28511 54.1916 8.5915 54.1916 8.89788Z"fill=#F7CBCF></path><path d="M50.3872 8.89802V12.0257C50.3872 12.3193 50.4128 12.3065 50.1191 12.3065H48.8681C48.7021 12.3065 48.6894 12.2938 48.6894 12.1278C48.6894 12.0257 48.6894 11.9363 48.6894 11.847C48.6894 11.847 48.6638 11.8214 48.6511 11.8214C48.6383 11.8214 48.6255 11.8214 48.6128 11.8342C48.5745 11.8597 48.5489 11.8853 48.5106 11.898C48.0128 12.2682 47.4511 12.4342 46.8255 12.4342C45.8042 12.4342 44.7191 11.898 44.1064 10.8895C43.8128 10.4044 43.634 9.881 43.5702 9.30654C43.4936 8.65547 43.5702 8.02994 43.8255 7.41717C44.0553 6.84271 44.4128 6.34483 44.8979 5.96185C45.3191 5.62994 45.8042 5.41292 46.3404 5.34909C47.1191 5.24696 47.8596 5.38739 48.5106 5.85973C48.5617 5.89803 48.6 5.92356 48.6511 5.94909C48.6511 5.94909 48.6766 5.94909 48.6894 5.93632C48.6894 5.93632 48.7021 5.91079 48.7021 5.89802C48.7021 5.8342 48.7021 5.77037 48.7021 5.70654C48.7021 5.47675 48.7021 5.47675 48.9191 5.47675H50.1702C50.1702 5.47675 50.2851 5.47675 50.3362 5.48951C50.3489 5.48951 50.3745 5.51505 50.3872 5.54058C50.3872 5.56611 50.3872 5.59164 50.3872 5.60441V5.87249C50.3872 6.86824 50.3872 7.87675 50.3872 8.89802ZM48.6255 8.89802C48.6255 8.59164 48.6255 8.28526 48.6255 7.99164C48.6255 7.90228 48.6 7.83845 48.5489 7.77462C48.2808 7.45547 47.9617 7.23845 47.5659 7.11079C47.2723 7.02143 46.9659 6.9959 46.6596 7.05973C46.2255 7.14909 45.8808 7.39164 45.6383 7.76185C45.4723 8.00441 45.3702 8.27249 45.3319 8.56611C45.2681 9.00015 45.3064 9.40866 45.4979 9.80441C45.7021 10.2257 46.0213 10.5193 46.4681 10.6725C46.6723 10.7491 46.8894 10.7619 47.1064 10.7619C47.7064 10.7363 48.1787 10.481 48.5489 10.0214C48.6 9.9576 48.6128 9.89377 48.6128 9.82994C48.6128 9.52356 48.6128 9.21717 48.6128 8.91079L48.6255 8.89802Z"fill=#F7CBCF></path><path d="M67.2384 8.88526V11.9874C67.2384 12.064 67.2384 12.1278 67.2384 12.2044C67.2384 12.2682 67.2129 12.2938 67.1363 12.3065C67.1108 12.3065 67.0852 12.3065 67.0597 12.3065H65.7065C65.7065 12.3065 65.6554 12.3065 65.6299 12.3065C65.5661 12.3065 65.5405 12.2682 65.5405 12.2172C65.5405 12.115 65.5405 12.0129 65.5405 11.898C65.5405 11.8725 65.5405 11.847 65.5405 11.8342C65.5405 11.8342 65.515 11.8214 65.5022 11.8214C65.4639 11.847 65.4256 11.8725 65.3746 11.898C65.1959 12.0257 65.0171 12.1406 64.8129 12.2299C64.4937 12.3576 64.1746 12.4342 63.8299 12.447C62.8597 12.4725 62.0171 12.1406 61.3405 11.4385C60.9576 11.0427 60.7022 10.5704 60.549 10.0597C60.3959 9.54909 60.3448 9.03845 60.3959 8.51505C60.4597 7.92781 60.6256 7.36611 60.9448 6.86824C61.2256 6.42143 61.5959 6.05122 62.0427 5.78313C62.4895 5.51505 62.9746 5.37462 63.498 5.34909C64.0086 5.33633 64.481 5.42569 64.9405 5.64271C65.081 5.70654 65.2086 5.78313 65.3363 5.8725C65.3873 5.91079 65.4256 5.93633 65.4767 5.96186C65.4895 5.96186 65.5278 5.96186 65.5405 5.93633C65.5405 5.91079 65.5405 5.8725 65.5405 5.84696C65.5405 5.7576 65.5405 5.66824 65.5405 5.57888C65.5405 5.51505 65.5661 5.48952 65.6299 5.48952C65.6682 5.48952 65.6937 5.48952 65.732 5.48952H67.0597C67.0597 5.48952 67.149 5.48952 67.2001 5.50228C67.2001 5.50228 67.2256 5.51505 67.2384 5.54058C67.2384 5.56611 67.2384 5.59164 67.2384 5.60441C67.2384 5.68101 67.2384 5.74484 67.2384 5.82143C67.2384 6.84271 67.2384 7.87675 67.2384 8.89803V8.88526ZM65.4639 8.88526C65.4639 8.57888 65.4639 8.2725 65.4639 7.97888C65.4639 7.88952 65.4384 7.82569 65.3873 7.76186C65.0682 7.39164 64.6725 7.14909 64.1873 7.05973C63.8937 7.00867 63.6001 7.00867 63.3065 7.11079C62.8852 7.25122 62.5788 7.53207 62.3746 7.92781C62.0937 8.48952 62.0554 9.06398 62.2725 9.65122C62.4639 10.1491 62.8086 10.4938 63.3193 10.6725C63.5235 10.7363 63.7278 10.7619 63.932 10.7619C64.532 10.7363 65.0044 10.4938 65.3873 10.0342C65.4384 9.97037 65.4639 9.89377 65.4639 9.81718C65.4639 9.51079 65.4639 9.20441 65.4639 8.89803V8.88526Z"fill=#F7CBCF></path><path d="M38.2086 12.2682C38.2086 12.2682 38.183 12.2937 38.1575 12.2937C38.132 12.2937 38.0937 12.2937 38.0682 12.2937H36.6767C36.6767 12.2937 36.6128 12.2937 36.5873 12.281C36.5873 12.281 36.5618 12.2682 36.549 12.2554C36.549 12.2299 36.549 12.2044 36.5362 12.1916C36.5362 12.0895 36.5362 11.9874 36.5362 11.8725C36.5362 11.8469 36.5362 11.8214 36.4979 11.8214C36.4724 11.8214 36.4469 11.8214 36.4341 11.8342C36.4086 11.8469 36.383 11.8725 36.3575 11.898C35.8469 12.281 35.2852 12.4469 34.6469 12.4469C33.6384 12.4469 32.5533 11.9235 31.9277 10.9022C31.6086 10.3788 31.4299 9.82991 31.3916 9.22991C31.3405 8.62991 31.4171 8.04267 31.6341 7.48097C31.8511 6.93203 32.1703 6.45969 32.6171 6.07672C33.0639 5.69374 33.5745 5.45118 34.149 5.37459C34.9277 5.27246 35.6682 5.41288 36.3192 5.87246C36.3703 5.91076 36.4213 5.93629 36.4852 5.97459C36.4852 5.97459 36.5235 5.97459 36.5235 5.94906C36.5235 5.87246 36.5235 5.7831 36.5235 5.7065C36.5235 5.47671 36.5235 5.47671 36.7533 5.47671H38.0043C38.0043 5.47671 38.0809 5.47671 38.132 5.47671C38.1958 5.47671 38.2213 5.51501 38.2341 5.59161C38.2341 5.64267 38.2341 5.7065 38.2341 5.75757V12.0384C38.2341 12.1278 38.2341 12.2044 38.2086 12.281V12.2682ZM36.4596 8.88523C36.4596 8.59161 36.4596 8.31076 36.4596 8.01714C36.4596 7.88948 36.4213 7.80012 36.3448 7.71076C35.9107 7.23842 35.3873 6.99586 34.749 7.0214C34.3788 7.0214 34.0596 7.16182 33.7788 7.40437C33.5745 7.5831 33.4213 7.78735 33.3065 8.04267C33.0894 8.54054 33.0511 9.05118 33.2299 9.56182C33.4086 10.098 33.7533 10.4682 34.2894 10.6597C34.4937 10.7363 34.7107 10.7618 34.9277 10.7491C35.5022 10.7235 35.9745 10.4937 36.3448 10.0469C36.4086 9.97033 36.4469 9.88097 36.4469 9.76608C36.4469 9.47246 36.4469 9.16608 36.4469 8.87246L36.4596 8.88523Z"fill=#F7CBCF></path><path d="M70.3404 5.4894C70.3914 5.57876 70.4297 5.66812 70.468 5.74472C71.0297 6.93195 71.5914 8.11919 72.1531 9.30642C72.1914 9.37025 72.2042 9.45961 72.268 9.51067C72.3191 9.48514 72.3318 9.44685 72.3446 9.39578C72.4595 9.14046 72.5744 8.88514 72.6765 8.61706C73.0978 7.64685 73.5191 6.67663 73.9404 5.70642C73.9659 5.62982 74.0042 5.56599 74.0425 5.4894C74.0936 5.4894 74.1318 5.47663 74.1829 5.46387C74.3233 5.46387 74.451 5.46387 74.5914 5.46387H75.6765C75.6765 5.46387 75.7914 5.46387 75.8425 5.47663C75.8553 5.47663 75.868 5.4894 75.868 5.51493C75.868 5.56599 75.8425 5.60429 75.8297 5.64259C75.6382 6.06387 75.4595 6.48514 75.268 6.89365C74.0042 9.74046 72.7404 12.5745 71.4765 15.4213C71.4382 15.4979 71.4127 15.5873 71.3489 15.6639C71.3106 15.6639 71.2723 15.6639 71.234 15.6639H69.6765C69.6765 15.6639 69.6127 15.6639 69.5872 15.6639C69.5872 15.6639 69.5616 15.6383 69.5616 15.6256C69.5616 15.5873 69.5872 15.549 69.5999 15.5107C69.7021 15.2681 69.817 15.0256 69.9191 14.783C70.3531 13.8128 70.7872 12.8426 71.2212 11.8596C71.2467 11.7958 71.285 11.732 71.3106 11.6681C71.3361 11.6171 71.3361 11.5788 71.3106 11.5277C71.2723 11.4511 71.2467 11.3873 71.2084 11.3107C70.3148 9.44684 69.4212 7.58302 68.5276 5.71919C68.5021 5.65536 68.4638 5.59153 68.4382 5.5277C68.4382 5.51493 68.451 5.47663 68.4765 5.47663C68.5021 5.47663 68.5404 5.47663 68.5659 5.47663H70.1744C70.1744 5.47663 70.2638 5.47663 70.3276 5.47663L70.3404 5.4894Z"fill=#F7CBCF></path><path d="M29.2086 9.88099C29.2086 9.88099 29.2852 9.93205 29.3235 9.95758C29.7193 10.2767 30.1278 10.5703 30.5107 10.8895C30.5107 10.8895 30.5107 10.9023 30.5107 10.915C30.5107 10.9278 30.5107 10.9533 30.498 10.9661C30.1278 11.4767 29.6682 11.8852 29.0937 12.1406C28.7235 12.3065 28.3405 12.3959 27.932 12.4342C27.715 12.4469 27.498 12.4469 27.281 12.4342C25.8384 12.3576 24.5746 11.4001 24.1533 9.91929C24.0384 9.51077 23.9873 9.0895 24.0256 8.65546C24.1278 7.40439 24.7022 6.43418 25.7873 5.78312C26.298 5.4895 26.8469 5.33631 27.4341 5.32354C28.0852 5.29801 28.7107 5.4512 29.2852 5.77035C29.6554 5.9746 29.9873 6.25546 30.2554 6.58737C30.281 6.6129 30.2937 6.63843 30.3065 6.66397C30.3065 6.66397 30.3065 6.70226 30.3065 6.71503C30.281 6.74056 30.2554 6.77886 30.2299 6.80439C29.898 7.11077 29.5661 7.40439 29.2341 7.71077C29.2086 7.73631 29.1703 7.76184 29.1448 7.78737C29.1193 7.8129 29.081 7.80014 29.0554 7.78737C29.0171 7.74907 28.9788 7.69801 28.9405 7.65971C28.8129 7.51929 28.6597 7.39163 28.4937 7.2895C27.881 6.90652 27.0767 6.94482 26.5278 7.36609C26.1958 7.62141 25.9788 7.94056 25.8639 8.33631C25.749 8.74482 25.7618 9.16609 25.9022 9.56184C26.1576 10.3278 26.8214 10.698 27.4469 10.7363C28.098 10.7746 28.6086 10.5321 29.0427 10.0469C29.0937 9.99588 29.132 9.93205 29.1831 9.88099C29.1831 9.88099 29.1958 9.88099 29.2086 9.88099Z"fill=#F7CBCF></path><path d="M22.7362 6.03836C22.4553 6.47241 22.2128 6.90645 21.9192 7.31496C21.9192 7.31496 21.9064 7.31496 21.8809 7.31496C21.8298 7.27666 21.766 7.25113 21.7022 7.21283C21.4724 7.07241 21.2171 6.95751 20.949 6.90645C20.7064 6.85539 20.4511 6.86815 20.2085 6.93198C20.1192 6.95751 20.0298 6.99581 19.9532 7.05964C19.9022 7.09794 19.8511 7.149 19.8256 7.20007C19.7107 7.36602 19.7362 7.55751 19.8766 7.69794C19.9405 7.76177 20.0171 7.81283 20.0936 7.85113C20.2085 7.90219 20.3234 7.95326 20.4511 8.00432C20.6681 8.08092 20.8851 8.15751 21.1022 8.23411C21.3319 8.3107 21.5617 8.41283 21.7915 8.52773C21.9575 8.61709 22.1234 8.71921 22.2766 8.84687C22.6851 9.19156 22.9149 9.6256 22.9405 10.1618C22.9532 10.4171 22.9405 10.6724 22.8639 10.9277C22.749 11.2852 22.5319 11.5788 22.2383 11.8213C21.9447 12.0639 21.6 12.2299 21.2426 12.332C20.9107 12.4213 20.566 12.4596 20.2213 12.4469C19.4554 12.4213 18.7532 12.2043 18.1022 11.8213C17.9873 11.7575 17.8724 11.6682 17.7575 11.5916C17.6936 11.5533 17.6936 11.515 17.7319 11.4511C17.9745 11.0682 18.2171 10.6979 18.4724 10.3277C18.4724 10.315 18.4979 10.2894 18.5234 10.2767H18.5617C18.6 10.3022 18.6383 10.3277 18.6766 10.3533C19.1745 10.7235 19.7362 10.9022 20.3617 10.9022C20.4894 10.9022 20.6043 10.9022 20.7192 10.8511C20.783 10.8256 20.8468 10.8001 20.9107 10.7618C20.9617 10.7235 21.0128 10.6852 21.0511 10.6341C21.2171 10.4554 21.2171 10.2128 21.0511 10.0213C20.9873 9.94475 20.9107 9.89368 20.8341 9.84262C20.7319 9.77879 20.6171 9.72773 20.5149 9.68943C20.3107 9.61283 20.0936 9.53624 19.8894 9.44687C19.6851 9.37028 19.4809 9.29368 19.2894 9.20432C19.1362 9.14049 18.9958 9.0639 18.8681 8.97453C18.7405 8.88517 18.6 8.79581 18.4851 8.68092C18.2298 8.4256 18.0639 8.11922 18.0128 7.749C17.9234 7.08517 18.1149 6.5107 18.6 6.05113C18.8936 5.75751 19.2639 5.57879 19.6596 5.45113C19.8766 5.3873 20.1064 5.349 20.349 5.33624C21.0639 5.3107 21.7532 5.4639 22.3915 5.78305C22.4809 5.83411 22.5702 5.88517 22.6596 5.949C22.6851 5.96177 22.6979 5.9873 22.7362 6.0256V6.03836Z"fill=#F7CBCF></path><path d="M40.2639 7.30223V2.65542C40.2639 2.25968 40.2256 2.31074 40.6086 2.31074C40.9915 2.31074 41.3618 2.31074 41.7447 2.31074C41.8213 2.31074 41.8852 2.31074 41.9618 2.31074C42 2.31074 42.0256 2.34904 42.0383 2.38734C42.0383 2.45117 42.0383 2.515 42.0383 2.57883V12.0256C42.0383 12.0895 42.0383 12.1533 42.0383 12.2171C42.0383 12.2427 42.0001 12.281 41.9745 12.281C41.949 12.281 41.9107 12.281 41.8852 12.281H40.4426C40.4426 12.281 40.3788 12.281 40.3532 12.281C40.3277 12.281 40.2894 12.2427 40.2894 12.2171C40.2894 12.1916 40.2894 12.1661 40.2894 12.1405V11.9235C40.2894 10.3788 40.2894 8.83415 40.2894 7.28947L40.2639 7.30223Z"fill=#F7CBCF>'), Il = /* @__PURE__ */ C('<svg viewBox="0 0 88 16"fill=none xmlns=http://www.w3.org/2000/svg data-testid=scalapay-logo-black role=img aria-label=scalapay><path fill-rule=evenodd clip-rule=evenodd d="M0.171018 6.72233C-0.0660137 6.4616 -0.0554778 6.07174 0.195322 5.82298L2.86553 3.17448C3.14119 2.90106 3.60024 2.90106 3.87591 3.17448L5.91669 5.19867C6.19235 5.47209 6.6514 5.47209 6.92706 5.19867L8.9094 3.23245C9.18506 2.95903 9.64411 2.95903 9.91978 3.23245L12.5805 5.87155C12.8312 6.1202 12.8419 6.50984 12.6051 6.77059L6.94341 13.0063C6.66416 13.3139 6.16359 13.314 5.88413 13.0066L0.171018 6.72233ZM15.5899 11.0316L16.6542 9.46526C17.2118 9.97053 18.0734 10.2737 18.9012 10.2737C19.4925 10.2737 19.9487 9.98737 19.9487 9.58316C19.9487 8.35368 15.9785 8.79158 15.9785 6.16421C15.9785 4.59789 17.499 3.62105 19.1208 3.62105C20.1852 3.62105 21.3509 4.02526 21.8916 4.44632L20.861 6.02947C20.4386 5.72632 19.8811 5.47368 19.2898 5.47368C18.6816 5.47368 18.1748 5.70947 18.1748 6.13053C18.1748 7.19158 22.145 6.77053 22.145 9.6C22.145 11.1663 20.6076 12.1263 18.8843 12.1263C17.7524 12.1263 16.5529 11.7389 15.5899 11.0316ZM29.9165 9.02737L31.6059 10.2905C30.6429 11.5705 29.4265 12.1263 27.8891 12.1263C25.3549 12.1263 23.4965 10.24 23.4965 7.8821C23.4965 5.50737 25.4056 3.62105 27.906 3.62105C29.3252 3.62105 30.5923 4.27789 31.3525 5.25474L29.7982 6.61895C29.359 6.04632 28.7001 5.64211 27.906 5.64211C26.6389 5.64211 25.6928 6.63579 25.6928 7.8821C25.6928 9.1621 26.622 10.1053 27.9567 10.1053C28.8521 10.1053 29.5617 9.56632 29.9165 9.02737ZM38.9551 9.09474V6.65263C38.4989 6.04632 37.7724 5.64211 36.9277 5.64211C35.6437 5.64211 34.8159 6.70316 34.8159 7.8821C34.8159 9.1621 35.7451 10.1053 36.9784 10.1053C37.8062 10.1053 38.5327 9.70105 38.9551 9.09474ZM41.1514 3.78947V11.9579H39.0395V11.3011C38.3638 11.8737 37.5866 12.1263 36.7588 12.1263C35.5424 12.1263 34.3935 11.5874 33.6671 10.7453C33.0251 10.0042 32.6196 8.99368 32.6196 7.8821C32.6196 5.47368 34.4104 3.62105 36.6405 3.62105C37.5697 3.62105 38.3975 3.92421 39.0395 4.44632V3.78947H41.1514ZM45.8818 0V11.9579H43.6855V0H45.8818ZM54.0757 9.09474V6.65263C53.6196 6.04632 52.8931 5.64211 52.0484 5.64211C50.7644 5.64211 49.9365 6.70316 49.9365 7.8821C49.9365 9.1621 50.8657 10.1053 52.099 10.1053C52.9269 10.1053 53.6533 9.70105 54.0757 9.09474ZM56.272 3.78947V11.9579H54.1602V11.3011C53.4844 11.8737 52.7072 12.1263 51.8794 12.1263C50.663 12.1263 49.5142 11.5874 48.7877 10.7453C48.1457 10.0042 47.7402 8.99368 47.7402 7.8821C47.7402 5.47368 49.5311 3.62105 51.7612 3.62105C52.6904 3.62105 53.5182 3.92421 54.1602 4.44632V3.78947H56.272ZM58.8062 16V3.78947H60.918V4.44632C61.56 3.92421 62.3878 3.62105 63.317 3.62105C65.5471 3.62105 67.3379 5.47368 67.3379 7.8821C67.3379 8.99368 66.9494 10.0042 66.3074 10.7453C65.5809 11.5874 64.4152 12.1263 63.1988 12.1263C62.3709 12.1263 61.6614 11.8905 61.0025 11.3853V16H58.8062ZM61.0025 6.65263V9.09474C61.4248 9.70105 62.1513 10.1053 62.9791 10.1053C64.2124 10.1053 65.1416 9.1621 65.1416 7.8821C65.1416 6.70316 64.3138 5.64211 63.0298 5.64211C62.1851 5.64211 61.4586 6.04632 61.0025 6.65263ZM75.025 9.09474V6.65263C74.5688 6.04632 73.8424 5.64211 72.9976 5.64211C71.7136 5.64211 70.8858 6.70316 70.8858 7.8821C70.8858 9.1621 71.815 10.1053 73.0483 10.1053C73.8761 10.1053 74.6026 9.70105 75.025 9.09474ZM77.2213 3.78947V11.9579H75.1094V11.3011C74.4337 11.8737 73.6565 12.1263 72.8287 12.1263C71.6123 12.1263 70.4634 11.5874 69.737 10.7453C69.095 10.0042 68.6895 8.99368 68.6895 7.8821C68.6895 5.47368 70.4803 3.62105 72.7104 3.62105C73.6396 3.62105 74.4675 3.92421 75.1094 4.44632V3.78947H77.2213ZM82.3572 16H80.0596L82.3234 11.1326L78.6573 3.78947H81.0732L83.4723 8.69053L85.6854 3.78947H88L82.3572 16Z"fill=#272727>'), Al = /* @__PURE__ */ C('<svg viewBox="16 1 56 15"fill=none xmlns=http://www.w3.org/2000/svg data-testid=scalapay-logo-black role=img aria-label=scalapay><path fill-rule=evenodd clip-rule=evenodd fill=currentColor d="M0.171018 6.72233C-0.0660137 6.4616 -0.0554778 6.07174 0.195322 5.82298L2.86553 3.17448C3.14119 2.90106 3.60024 2.90106 3.87591 3.17448L5.91669 5.19867C6.19235 5.47209 6.6514 5.47209 6.92706 5.19867L8.9094 3.23245C9.18506 2.95903 9.64411 2.95903 9.91978 3.23245L12.5805 5.87155C12.8312 6.1202 12.8419 6.50984 12.6051 6.77059L6.94341 13.0063C6.66416 13.3139 6.16359 13.314 5.88413 13.0066L0.171018 6.72233ZM15.5899 11.0316L16.6542 9.46526C17.2118 9.97053 18.0734 10.2737 18.9012 10.2737C19.4925 10.2737 19.9487 9.98737 19.9487 9.58316C19.9487 8.35368 15.9785 8.79158 15.9785 6.16421C15.9785 4.59789 17.499 3.62105 19.1208 3.62105C20.1852 3.62105 21.3509 4.02526 21.8916 4.44632L20.861 6.02947C20.4386 5.72632 19.8811 5.47368 19.2898 5.47368C18.6816 5.47368 18.1748 5.70947 18.1748 6.13053C18.1748 7.19158 22.145 6.77053 22.145 9.6C22.145 11.1663 20.6076 12.1263 18.8843 12.1263C17.7524 12.1263 16.5529 11.7389 15.5899 11.0316ZM29.9165 9.02737L31.6059 10.2905C30.6429 11.5705 29.4265 12.1263 27.8891 12.1263C25.3549 12.1263 23.4965 10.24 23.4965 7.8821C23.4965 5.50737 25.4056 3.62105 27.906 3.62105C29.3252 3.62105 30.5923 4.27789 31.3525 5.25474L29.7982 6.61895C29.359 6.04632 28.7001 5.64211 27.906 5.64211C26.6389 5.64211 25.6928 6.63579 25.6928 7.8821C25.6928 9.1621 26.622 10.1053 27.9567 10.1053C28.8521 10.1053 29.5617 9.56632 29.9165 9.02737ZM38.9551 9.09474V6.65263C38.4989 6.04632 37.7724 5.64211 36.9277 5.64211C35.6437 5.64211 34.8159 6.70316 34.8159 7.8821C34.8159 9.1621 35.7451 10.1053 36.9784 10.1053C37.8062 10.1053 38.5327 9.70105 38.9551 9.09474ZM41.1514 3.78947V11.9579H39.0395V11.3011C38.3638 11.8737 37.5866 12.1263 36.7588 12.1263C35.5424 12.1263 34.3935 11.5874 33.6671 10.7453C33.0251 10.0042 32.6196 8.99368 32.6196 7.8821C32.6196 5.47368 34.4104 3.62105 36.6405 3.62105C37.5697 3.62105 38.3975 3.92421 39.0395 4.44632V3.78947H41.1514ZM45.8818 0V11.9579H43.6855V0H45.8818ZM54.0757 9.09474V6.65263C53.6196 6.04632 52.8931 5.64211 52.0484 5.64211C50.7644 5.64211 49.9365 6.70316 49.9365 7.8821C49.9365 9.1621 50.8657 10.1053 52.099 10.1053C52.9269 10.1053 53.6533 9.70105 54.0757 9.09474ZM56.272 3.78947V11.9579H54.1602V11.3011C53.4844 11.8737 52.7072 12.1263 51.8794 12.1263C50.663 12.1263 49.5142 11.5874 48.7877 10.7453C48.1457 10.0042 47.7402 8.99368 47.7402 7.8821C47.7402 5.47368 49.5311 3.62105 51.7612 3.62105C52.6904 3.62105 53.5182 3.92421 54.1602 4.44632V3.78947H56.272ZM58.8062 16V3.78947H60.918V4.44632C61.56 3.92421 62.3878 3.62105 63.317 3.62105C65.5471 3.62105 67.3379 5.47368 67.3379 7.8821C67.3379 8.99368 66.9494 10.0042 66.3074 10.7453C65.5809 11.5874 64.4152 12.1263 63.1988 12.1263C62.3709 12.1263 61.6614 11.8905 61.0025 11.3853V16H58.8062ZM61.0025 6.65263V9.09474C61.4248 9.70105 62.1513 10.1053 62.9791 10.1053C64.2124 10.1053 65.1416 9.1621 65.1416 7.8821C65.1416 6.70316 64.3138 5.64211 63.0298 5.64211C62.1851 5.64211 61.4586 6.04632 61.0025 6.65263ZM75.025 9.09474V6.65263C74.5688 6.04632 73.8424 5.64211 72.9976 5.64211C71.7136 5.64211 70.8858 6.70316 70.8858 7.8821C70.8858 9.1621 71.815 10.1053 73.0483 10.1053C73.8761 10.1053 74.6026 9.70105 75.025 9.09474ZM77.2213 3.78947V11.9579H75.1094V11.3011C74.4337 11.8737 73.6565 12.1263 72.8287 12.1263C71.6123 12.1263 70.4634 11.5874 69.737 10.7453C69.095 10.0042 68.6895 8.99368 68.6895 7.8821C68.6895 5.47368 70.4803 3.62105 72.7104 3.62105C73.6396 3.62105 74.4675 3.92421 75.1094 4.44632V3.78947H77.2213ZM82.3572 16H80.0596L82.3234 11.1326L78.6573 3.78947H81.0732L83.4723 8.69053L85.6854 3.78947H88L82.3572 16Z">');
const Qt = ({
  type: e = "black",
  width: t = 81,
  height: n = 16,
  scalePercent: a = 100,
  className: r
}) => {
  let i = 1;
  a && a >= hs && a <= fs && (i = a / 100);
  const s = () => t * i, o = () => n * i;
  return N(() => {
    switch (e) {
      case "white":
        return (() => {
          var c = Cl();
          return U((u) => {
            var d = s(), m = o();
            return d !== u.e && R(c, "width", u.e = d), m !== u.t && R(c, "height", u.t = m), u;
          }, {
            e: void 0,
            t: void 0
          }), c;
        })();
      case "black":
        return (() => {
          var c = vl();
          return R(c, "class", r), U((u) => {
            var d = s(), m = o();
            return d !== u.e && R(c, "width", u.e = d), m !== u.t && R(c, "height", u.t = m), u;
          }, {
            e: void 0,
            t: void 0
          }), c;
        })();
      case "white-pill":
        return (() => {
          var c = Il();
          return R(c, "width", t), R(c, "height", n), R(c, "class", r), c;
        })();
      case "custom":
        return (() => {
          var c = Al();
          return R(c, "width", t), R(c, "height", n), R(c, "class", r), c;
        })();
      default:
        return null;
    }
  });
};
var Sl = /* @__PURE__ */ C('<svg xmlns=http://www.w3.org/2000/svg fill=black data-testid=close-icon role=img aria-label=close><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">');
const Pl = ({
  width: e = 44,
  height: t = 44,
  className: n
}) => {
  const a = `0 0 ${e} ${t}`;
  return (() => {
    var r = Sl();
    return R(r, "viewBox", a), R(r, "height", t), R(r, "width", e), R(r, "class", n), r;
  })();
};
var El = /* @__PURE__ */ C("<style>");
const kl = (e) => {
  const [t, n] = q(null);
  let a = null;
  return at(() => {
    var r;
    if (e.isOpen) {
      a = document.createElement(e.tagName), a.style.display = "block";
      const i = a.attachShadow({
        mode: "open"
      });
      document.body.appendChild(a), n(i), (r = e.onMountCallback) == null || r.call(e);
    }
  }), Fe(() => {
    var r;
    (r = e.onUnmountCallback) == null || r.call(e), a == null || a.remove(), a = null;
  }), p(M, {
    get when() {
      return t();
    },
    get children() {
      return p(wi, {
        get mount() {
          return t() ?? void 0;
        },
        get children() {
          return [(() => {
            var r = El();
            return g(r, lr), r;
          })(), N(() => e.children)];
        }
      });
    }
  });
};
var Nl = /* @__PURE__ */ C('<div class="fixed inset-0 bg-black/50 z-[2147483646]">'), Tl = /* @__PURE__ */ C('<dialog role=dialog aria-modal=true aria-labelledby=scalapay-modal-title tabindex=-1><section data-testid=modal-section class="flex flex-col mx-auto self-center w-full"><div data-testid=modal-content class="flex flex-col p-4 pb-0 gap-6 max-h-[calc(70vh-2rem)] overflow-y-auto -translate-y-16"><div class="flex flex-col gap-4 m-0"data-testid=modal-children></div><footer class="flex flex-col gap-9 text-sm font-medium text-gray-500 text-left"data-testid=modal-footer>');
const Dr = (e) => {
  let t, n = null, a = null;
  const r = (c) => {
    var d;
    c.composedPath().includes(t) || (d = e.onClose) == null || d.call(e, c);
  }, i = (c) => {
    var u;
    if (c.key === "Escape" && !e.isStandalone) {
      (u = e.onClose) == null || u.call(e, c);
      return;
    }
  }, s = () => {
    var u;
    let c = document.activeElement;
    return (u = c == null ? void 0 : c.shadowRoot) != null && u.activeElement && (c = c.shadowRoot.activeElement), c;
  }, o = (c) => {
    e.isStandalone || (t = c, e.isOpen && (n = s(), a == null || a.disconnect(), a = new MutationObserver(() => {
      t && (t.focus(), a == null || a.disconnect(), a = null);
    }), a.observe(t, {
      childList: !0,
      subtree: !0
    })));
  }, l = () => {
    a == null || a.disconnect(), a = null, n && (n.focus(), n = null);
  };
  return at(() => {
    document.addEventListener("mousedown", r), document.addEventListener("keydown", i);
  }), Fe(() => {
    document.removeEventListener("mousedown", r), document.removeEventListener("keydown", i), l();
  }), p(kl, {
    get isOpen() {
      return e.isOpen;
    },
    tagName: "scalapay-modal",
    get children() {
      return [Nl(), (() => {
        var c = Tl(), u = c.firstChild, d = u.firstChild, m = d.firstChild, _ = m.nextSibling;
        return gi((h) => o(h), c), g(u, () => e.header, d), g(m, () => e.children), g(_, () => e.footer), U((h) => {
          var f = `fixed z-[2147483647] overflow-visible p-0 font-scalapay-poppins text-sm font-normal text-gray-700 text-center bg-sp-white-1 border-none rounded-3xl mx-auto my-auto max-h-[95vh] w-full top-[5vh] ${e.isOpen ? "transition-none" : "transition-opacity"} antialiased ${e.class || ""}`, x = e.isOpen;
          return f !== h.e && z(c, h.e = f), x !== h.t && (c.open = h.t = x), h;
        }, {
          e: void 0,
          t: void 0
        }), c;
      })()];
    }
  });
};
var Ll = /* @__PURE__ */ C('<div class="flex flex-col p-2 pb-16 gap-6 bg-sp-primary-pink rounded-3xl rounded-b-xl overflow-y-auto"><header class="text-gray-900 gap-4 flex flex-col items-center pt-6 pb-3 relative mb-4"><h3 id=scalapay-modal-title class="font-semibold text-[19px] leading-8 text-center m-0 px-1">'), Hl = /* @__PURE__ */ C('<button class="absolute top-0 right-0 bg-transparent border-none flex justify-center items-center p-1 rounded-full hover:bg-sp-pink-1"tabindex=0>'), Ml = /* @__PURE__ */ C('<p class="ml-5 text-[11px]">'), Ol = /* @__PURE__ */ C('<button class="bg-sp-primary-blue text-white max-w-fit border-none flex justify-center items-center cursor-pointer transition-colors duration-200 px-20 py-2.5 min-w-[100px] rounded-full self-center leading-[21px] text-sm font-semibold hover:bg-sp-blue-1"tabindex=0>');
const Rl = (e) => p(Dr, {
  get isOpen() {
    return e.isOpen;
  },
  get onClose() {
    return e.onClose;
  },
  get isStandalone() {
    return e.isStandalone;
  },
  class: "min-[450px]:max-w-sp-modal",
  get header() {
    return (() => {
      var t = Ll(), n = t.firstChild, a = n.firstChild;
      return g(n, p(Qt, {
        className: "h-10 w-auto bg-white px-4 py-2 rounded-3xl",
        type: "white-pill",
        width: 123,
        height: 25
      }), a), g(n, (() => {
        var r = N(() => !e.isStandalone);
        return () => r() && (() => {
          var i = Hl();
          return bn(i, "click", e.onClose), g(i, p(Pl, {
            height: 24,
            width: 24
          })), U(() => R(i, "aria-label", E(e.locale || me, "modal:close_button"))), i;
        })();
      })(), a), g(a, () => e.title), t;
    })();
  },
  get footer() {
    return [(() => {
      var t = Ml();
      return g(t, () => e.footer), t;
    })(), N(() => N(() => !e.isStandalone)() && (() => {
      var t = Ol();
      return bn(t, "click", e.onClose), g(t, () => E(e.locale || me, "modal:close_button")), t;
    })())];
  },
  get children() {
    return e.children;
  }
});
it(["click"]);
const Vl = `summary {
  list-style: none;
  cursor: default;
  position: relative;

  &::after {
    transform: rotate(45deg) translatey(-0.1em);
  }
}

details[open] > summary::after {
  transform: rotate(-135deg) translatey(-0.3em);
}

summary::-webkit-details-marker {
  display: none;
}

.sp_summary_card__container {
  max-width: 600px;
  padding: 12px;
  border-radius: 20px;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
}

.sp_summary_card__payment-label {
  font-weight: 600;
  font-size: 13px;
  color: #000;
  text-align: left;
}

.sp_summary_card__payment-amount {
  font-size: 20px;
  font-weight: 600;
}

.sp_summary_card__payment-frequency {
  font-size: 12px;
}

.sp_summary_card__chip {
  font-size: 13px;
  position: relative;
  z-index: 2;
  align-content: center;
  font-weight: 600;
}

.sp_summary_card__footer {
  font-size: 11px;
  font-weight: 500;
}

.sp_summary_card__subtitle,
.sp_summary_card__interests_disclaimer {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;

  span:first-of-type {
    color: var(--sp-primary-gray);
  }

  strong {
    font-weight: 600;
  }
}

.sp_summary_card__content {
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.sp_summary_card__icon--container {
  background: transparent;
  border: none;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  pointer-events: auto;
}

.sp_summary_card__icon--container:hover {
  background-color: #f0f0f0;
  pointer-events: initial;
}

.sp_summary_card__open {
  transform: rotate(180deg);
}

.sp_summary_card__closed {
  max-height: 0;
  padding: 0;
}
`;
var Fl = /* @__PURE__ */ C('<svg xmlns=http://www.w3.org/2000/svg data-testid=down-arrow role=img aria-label=next><path d="M5.3278 11.8397C4.78317 11.5709 4.55606 10.9101 4.81999 10.3631C5.08411 9.81624 5.73911 9.59061 6.28386 9.85919L12.4997 12.9246L18.7175 9.85919C19.2622 9.59087 19.9184 9.81608 20.1823 10.3631C20.4462 10.9102 20.2173 11.571 19.6725 11.8397L13.071 15.0945C12.9208 15.1857 12.7507 15.2396 12.5749 15.2508C12.5687 15.2513 12.5625 15.2524 12.5563 15.2527L12.444 15.2527C12.4368 15.2523 12.4297 15.2513 12.4225 15.2508C12.2491 15.2391 12.0807 15.187 11.9323 15.0975L5.3278 11.8397Z"fill=currentColor>');
const Br = ({
  width: e = 44,
  height: t = 44,
  className: n
}) => {
  const a = `0 0 ${e} ${t}`;
  return (() => {
    var r = Fl();
    return R(r, "viewBox", a), R(r, "height", t), R(r, "width", e), R(r, "class", n), r;
  })();
};
var Dl = /* @__PURE__ */ C('<svg xmlns=http://www.w3.org/2000/svg fill=none><g clip-path=url(#clip0_2118_90)><mask id=mask0_2118_90 style=mask-type:luminance maskUnits=userSpaceOnUse x=0 y=0 width=104 height=16><path d="M0.617432 0.321826H103.742V15.9688H0.617432V0.321826Z"fill=white></path></mask><g mask=url(#mask0_2118_90)><path d="M78.3349 12.3199L80.7948 9.54904H82.4262L79.9672 12.2835L82.7263 15.8347H81.0222L78.3349 12.3199ZM78.2885 15.8347H76.8707V6.95622H78.2885V15.8347ZM71.4399 10.2674C71.8136 9.85913 72.412 9.41616 73.4087 9.41616C74.8364 9.41616 75.5567 10.3037 75.5567 11.6232V15.8347H74.1407V11.9962C74.1407 10.964 73.7206 10.6275 73.0003 10.6275C72.352 10.6275 71.9081 10.9512 71.6935 11.3005C71.5135 11.5878 71.4771 11.9244 71.4771 12.3671V15.8347H70.0603V9.55987H71.3808L71.4399 10.2674ZM67.3776 13.5321V13.0392H65.9598C65.1568 13.0392 64.7858 13.363 64.7858 13.9504C64.7858 14.4544 65.0367 14.8743 65.8515 14.8743C66.6573 14.8743 67.1611 14.5034 67.3156 14.0232C67.3648 13.8668 67.3776 13.7359 67.3776 13.5321ZM63.67 11.2878C63.8728 10.1837 64.6166 9.41616 66.2599 9.41616C67.9641 9.41616 68.7435 10.0873 68.7435 11.6232V15.8347H67.544L67.4977 14.9699C67.1484 15.4273 66.5008 15.9675 65.506 15.9675C64.2447 15.9675 63.4053 15.2455 63.4053 13.9869C63.4053 12.7863 64.2674 12.0681 65.9598 12.0681H67.3776V11.5151C67.3776 10.7366 66.9692 10.4602 66.2245 10.4602C65.3723 10.4602 65.1204 10.8804 65.0731 11.2878H63.67ZM57.3514 11.8271V14.5752H59.4021C60.5425 14.5752 61.069 14.1904 61.069 13.1957C61.069 12.1999 60.5425 11.8271 59.4021 11.8271H57.3514ZM59.1129 8.21585H57.3514V10.5674H59.1511C60.2897 10.5674 60.6616 10.2074 60.6616 9.39164C60.6616 8.62412 60.3024 8.21585 59.1129 8.21585ZM55.8391 15.8347V6.95633H59.2584C61.3356 6.95633 62.174 7.89208 62.174 9.22395C62.174 10.1956 61.6584 10.9031 60.9736 11.1313C61.7893 11.2632 62.5941 11.9352 62.5941 13.1957C62.5941 14.8262 61.7175 15.8347 59.533 15.8347H55.8391ZM50.1076 12.1153C50.0972 11.0959 49.6661 10.4957 48.7049 10.4957C47.8415 10.4957 47.2539 10.9749 47.1931 12.1153H50.1076ZM47.1572 13.1347C47.2412 14.287 47.7337 14.8862 48.6945 14.8862C49.7485 14.8862 49.9999 14.3588 50.0594 13.9996H51.4299C51.2484 15.019 50.4328 15.9675 48.6945 15.9675C46.6774 15.9675 45.7649 14.5507 45.7649 12.7265C45.7649 10.8076 46.726 9.41616 48.6945 9.41616C50.8175 9.41616 51.4763 10.8913 51.4763 12.4637V13.1347H47.1572ZM40.754 15.8347H39.3385V6.95633H40.7412V10.3037C41.115 9.89634 41.6917 9.41616 42.6865 9.41616C44.1143 9.41616 44.8345 10.2556 44.8345 11.6232V15.8347H43.4177V12.008C43.4177 10.9749 42.9989 10.6275 42.2769 10.6275C41.6302 10.6275 41.1742 10.9512 40.9714 11.3005C40.7899 11.5878 40.754 11.8989 40.754 12.3435V15.8347ZM37.0738 11.6825C37.0147 11.2632 36.835 10.5076 35.7665 10.5076C34.843 10.5076 34.3383 11.2277 34.3383 12.7155C34.3383 13.9632 34.7352 14.8743 35.7665 14.8743C36.8222 14.8743 37.0147 14.1796 37.0506 13.6867H38.4424C38.2987 15.1018 37.4098 15.9675 35.7787 15.9675C33.5103 15.9675 32.9106 14.4433 32.9106 12.7155C32.9106 10.9868 33.523 9.41616 35.7665 9.41616C37.5553 9.41616 38.3346 10.3757 38.4533 11.6825H37.0738ZM30.8021 11.4197C30.7661 11.0241 30.4678 10.4475 29.5071 10.4475C28.8118 10.4475 28.4995 10.7594 28.4995 11.204C28.4995 11.6479 28.751 11.8516 29.3507 11.9715L30.6476 12.2353C31.691 12.45 32.2067 13.0993 32.2067 14.035C32.2067 15.019 31.5454 15.9675 29.6866 15.9675C27.8761 15.9548 27.154 15.1145 27.0949 13.9632H28.4405C28.4636 14.3232 28.6432 14.9236 29.6634 14.9344C30.5275 14.9344 30.8758 14.587 30.8758 14.095C30.8758 13.6867 30.6225 13.483 30.0709 13.363L28.7382 13.0628C27.8761 12.8711 27.1918 12.4026 27.1918 11.3005C27.1918 10.0637 28.1512 9.41616 29.5557 9.41616C31.1991 9.41616 32.027 10.2183 32.099 11.4197H30.8021ZM26.4143 15.8111C26.2474 15.8474 25.9223 15.8829 25.5145 15.8829C24.0631 15.8829 23.451 15.571 23.451 13.7949V10.6512H22.2638V9.58351H23.451V7.76018H24.8428V9.58351H26.3656V10.6512H24.8428V13.6994C24.8428 14.5752 25.0347 14.7907 25.8504 14.7907C26.1269 14.7907 26.3533 14.7426 26.4143 14.7307V15.8111ZM20.0348 14.9953C19.6861 15.451 19.0881 15.9675 18.0555 15.9675C16.5792 15.9675 15.823 15.1626 15.823 13.6158V9.54904H17.2397V13.303C17.2397 14.1796 17.4681 14.8507 18.427 14.8507C19.1959 14.8507 19.6502 14.2996 19.7938 13.9268C19.8911 13.6513 19.9016 13.3757 19.9016 13.0392V9.54904H21.3189V15.8347H20.0831L20.0348 14.9953ZM13.3803 12.1153C13.3676 11.0959 12.9365 10.4957 11.9757 10.4957C11.1119 10.4957 10.5243 10.9749 10.4635 12.1153H13.3803ZM10.4276 13.1347C10.5121 14.287 11.0041 14.8862 11.963 14.8862C13.0193 14.8862 13.2707 14.3588 13.3317 13.9996H14.7003C14.519 15.019 13.7036 15.9675 11.963 15.9675C9.94781 15.9675 9.03746 14.5507 9.03746 12.7265C9.03746 10.8076 9.99641 9.41616 11.963 9.41616C14.0879 9.41616 14.7472 10.8913 14.7472 12.4637V13.1347H10.4276ZM3.41378 8.22811H2.12974V14.5625H3.40152C5.70592 14.5625 6.4603 13.6386 6.4603 11.3231C6.4603 9.0197 5.57271 8.22811 3.41378 8.22811ZM3.83442 6.95633C6.5321 6.95633 8.10543 8.19122 8.10543 11.3477C8.10543 14.0123 6.91815 15.8347 3.80892 15.8347H0.617371V6.95633H3.83442Z"fill=#1E2A78></path><path d="M91.576 12.1119L97.6272 4.04529H100.398L94.3463 12.1119H91.576ZM88.2288 0.321786H103.742V15.8353H88.2288V0.321786ZM90.4447 13.6195H101.525V2.53763H90.4447V13.6195Z"fill=#1E2A78></path></g></g><defs><clipPath id=clip0_2118_90><rect width=103.125 height=15.647 fill=white transform="translate(0.617432 0.321823)">');
const Bl = (e) => {
  const t = e.width || 44, n = e.height || 44, a = `0 0 ${t} ${n}`;
  return (() => {
    var r = Dl();
    return R(r, "viewBox", a), R(r, "height", n), R(r, "width", t), U((i) => {
      var s = e == null ? void 0 : e.className, o = `${oe.DEUTSCHE_BANK}-logo`;
      return s !== i.e && R(r, "class", i.e = s), o !== i.t && R(r, "data-testid", i.t = o), i;
    }, {
      e: void 0,
      t: void 0
    }), r;
  })();
};
var Ul = /* @__PURE__ */ C('<svg xmlns=http://www.w3.org/2000/svg fill=none><path d="M28.5576 2.02649C28.6554 2.02649 28.7445 2.07929 28.7891 2.16809L33.3799 10.9044C33.4777 11.0912 33.7625 11.0912 33.8604 10.9044L38.4502 2.16809C38.4947 2.07931 38.5838 2.02656 38.6904 2.02649H40.915C41.066 2.02671 41.1636 2.18615 41.0928 2.31946L33.8604 15.8605C33.7536 16.047 33.4867 16.0468 33.3887 15.8605L26.1553 2.31946C26.0845 2.18608 26.1829 2.02649 26.334 2.02649H28.5576ZM7.14355 2.0177C9.53668 2.0177 11.2363 3.49434 11.2363 5.67395C11.2363 6.94609 10.6395 7.98653 9.67871 8.46692C9.67871 8.46692 11.876 9.09933 11.876 11.8038C11.8758 14.5793 10.1411 15.9933 6.84961 15.9933H0.266602C0.115387 15.9933 0 15.8779 0 15.7267V2.2843C2.00484e-05 2.1331 0.1154 2.01773 0.266602 2.0177H7.14355ZM21.2627 2.0177C23.6558 2.0177 25.3555 3.49434 25.3555 5.67395C25.3554 6.94609 24.7586 7.98653 23.7979 8.46692C23.7979 8.46692 25.9952 9.09933 25.9863 11.8038C25.9862 14.5793 24.2515 15.9933 20.96 15.9933H14.377C14.2257 15.9932 14.1104 15.8779 14.1104 15.7267V2.2843C14.1104 2.13311 14.2258 2.01774 14.377 2.0177H21.2627ZM45.6475 0.139771C45.7544 -0.0465736 46.0213 -0.0467624 46.1191 0.139771L53.3516 13.6808C53.4224 13.8141 53.3248 13.9735 53.1738 13.9738H50.9492C50.8515 13.9737 50.7623 13.9209 50.7178 13.8322L46.1279 5.09583C46.0301 4.909 45.7453 4.909 45.6475 5.09583L41.0566 13.8322C41.0121 13.912 40.9141 13.9649 40.8164 13.9738H38.5928C38.4417 13.9738 38.3433 13.8142 38.4141 13.6808L45.6475 0.139771ZM2.58008 9.7218C2.42891 9.7218 2.31261 9.84615 2.3125 9.9884V13.6984C2.3125 13.8496 2.42884 13.965 2.58008 13.965H6.7168C8.70939 13.9649 9.56337 13.4136 9.57227 11.839C9.57224 10.2822 8.69158 9.72185 6.7168 9.7218H2.58008ZM16.6904 9.7218C16.5393 9.7218 16.423 9.84615 16.4229 9.9884V13.6984C16.4229 13.8496 16.5481 13.965 16.6904 13.965H20.8271C22.8198 13.9649 23.6826 13.4136 23.6826 11.839C23.6826 10.2822 22.8019 9.72185 20.8271 9.7218H16.6904ZM2.58008 4.04602C2.42887 4.04602 2.31255 4.16143 2.3125 4.31262V7.44446C2.31262 7.59559 2.4378 7.71106 2.58008 7.71106H6.66309C8.16657 7.71106 8.93164 7.07017 8.93164 5.87805C8.93146 4.68621 8.1664 4.04602 6.66309 4.04602H2.58008ZM16.6992 4.04602C16.548 4.04602 16.4317 4.16143 16.4316 4.31262V7.44446C16.4318 7.59559 16.5481 7.71106 16.6992 7.71106H20.7822C22.2857 7.71106 23.0508 7.07017 23.0508 5.87805C23.0506 4.68621 22.2855 4.04602 20.7822 4.04602H16.6992Z"fill=#001496>');
const zl = (e) => {
  const t = e.width || 54, n = e.height || 16, a = `0 0 ${t} ${n}`;
  return (() => {
    var r = Ul();
    return R(r, "viewBox", a), R(r, "height", n), R(r, "width", t), U((i) => {
      var s = e == null ? void 0 : e.className, o = `${oe.BBVA}-logo`;
      return s !== i.e && R(r, "class", i.e = s), o !== i.t && R(r, "data-testid", i.t = o), i;
    }, {
      e: void 0,
      t: void 0
    }), r;
  })();
};
var Sa = /* @__PURE__ */ C("<div data-testid=lender-icon>");
const Ur = ({
  lenderId: e,
  width: t = 110,
  height: n = 24,
  className: a
}) => e ? {
  [oe.DEUTSCHE_BANK]: (() => {
    var i = Sa();
    return g(i, p(Bl, {
      width: t,
      height: n,
      className: a
    })), i;
  })(),
  [oe.BBVA]: (() => {
    var i = Sa();
    return g(i, p(zl, {
      width: 100,
      height: n,
      className: a
    })), i;
  })()
}[e] : null, Wl = `.sp_installment__container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 8px 0 0;
  background-color: white;
  border-bottom: 1px solid #eff1f5;
}

.sp_installment__service-fee {
  align-items: flex-start;
  border-radius: 5px;
  background-color: var(--sp-white-1);
  padding: 8px;
  font-size: 10px;
  line-height: 18px;
  font-weight: 500;

  strong {
    font-weight: 600;
  }
}

.sp_installment__timeline-container {
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  justify-content: flex-start;
}

.sp_installment__timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 16px;
}

.sp_installment__timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 12px;
  height: 80%;
  width: 2px;
  background: #eff1f5;
  transform: translateX(-50%);
}

.sp_installment__timeline-item {
  display: flex;
  align-items: flex-start;
  position: relative;
  width: 100%;
  gap: 16px;
}

.sp_installment__timeline-item:last-child {
  margin-bottom: 0;
}

.sp_installment__timeline-point {
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  background-color: #ebebff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 0 4px white;
}

.sp_installment__highlight {
  background-color: var(--sp-primary-blue);
  color: white;
}

.sp_installment__timeline-parent {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 100%;
  text-align: left;
}

.sp_installment__timeline-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.sp_installment__installment-amount {
  font-weight: 600;
  font-size: 15px;
}

.sp_installment__due_date {
  font-size: 11px;
  font-weight: 500;
}
`;
var Yl = /* @__PURE__ */ C("<style>"), Zl = /* @__PURE__ */ C("<section class=sp_installment__container><section class=sp_installment__timeline-container><div>"), $l = /* @__PURE__ */ C("<div class=sp_installment__timeline-item><div></div><div class=sp_installment__timeline-parent><div class=sp_installment__timeline-content><div></div><div>");
const Gl = (e, t, n) => {
  const {
    frequency: a
  } = e;
  return t.map((r, i) => {
    const s = a ? xs(a, i) : 0, o = i === 0 ? E(n, "installment_summary:pay_now") : `${E(n, "installment_summary:days-prefix")} ${s} ${E(n, "installment_summary:days")}`;
    return {
      step: i + 1,
      dueDate: o,
      installmentAmount: r
    };
  });
}, jl = (e) => {
  const t = de({
    splitFee: 0
  }, e), n = N(() => Gl(e.product, e.installmentAmounts, e.locale)), a = (i) => $(i.installmentAmount, e.locale, e.currencyDisplay, e.currencyPosition), r = () => t.splitFee > 0 ? $(t.splitFee, t.locale, t.currencyDisplay, t.currencyPosition) : "";
  return [(() => {
    var i = Yl();
    return g(i, Wl), i;
  })(), (() => {
    var i = Zl(), s = i.firstChild, o = s.firstChild;
    return g(o, p(Te, {
      get each() {
        return n();
      },
      children: (l, c) => (() => {
        var u = $l(), d = u.firstChild, m = d.nextSibling, _ = m.firstChild, h = _.firstChild, f = h.nextSibling;
        return g(d, () => l.step), g(h, (() => {
          var x = N(() => !!l.installmentAmount);
          return () => x() && a(l);
        })(), null), g(h, () => t.splitFee > 0 && l.step === 1 ? "*" : "", null), g(f, () => l.dueDate), U((x) => {
          var S = `sp_installment__timeline-point ${c() === 0 ? "sp_installment__highlight" : ""}`, v = `sp_installment__installment-amount ${c() === 0 ? "sp_installment__today" : ""}`, y = `text-sp-primary-gray sp_installment__due_date ${c() === 0 ? "sp_installment__today" : ""}`;
          return S !== x.e && z(d, x.e = S), v !== x.t && z(h, x.t = v), y !== x.a && z(f, x.a = y), x;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), u;
      })()
    })), g(i, (() => {
      var l = N(() => t.splitFee > 0);
      return () => l() && p(O, {
        testId: "split-fee",
        className: "text-left mb-[12px] sp_installment__service-fee",
        get children() {
          return E(t.locale, "installment_summary:service_fee", {
            fee: r()
          });
        }
      });
    })(), null), U(() => z(o, `${t.splitFee > 0 ? "" : "pb-[12px]"} sp_installment__timeline`)), i;
  })()];
}, jn = `.sp_info_card__heading {
  font-size: 14px;
  font-weight: 600;
  line-height: 26px;
  text-align: left;
  color: #000;
}

.sp_info_card__content {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding: 0;
  color: var(--sp-primary-gray);
}

.sp_info_card__content--li {
  /*
   * We want the bullets outside of the list,
   * so the text is aligned. Now the actual bullet
   * is outside of the list’s container
   */
  list-style-position: outside;

  /*
   * Because the bullet is outside of the list’s
   * container, indent the list entirely
   */
  margin-left: 1em;
  line-height: 18px;

  &:not(:last-child) {
    margin-bottom: 0;
  }

  strong {
    font-weight: 600;
  }
}

.sp_pay_in_x_info_card {
  padding: 8px;
}

.sp_pay_in_x_info_card__description {
  border-top: 1px solid #eff1f5;
  border-bottom: 1px solid #eff1f5;
  padding: 16px 0;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
}

.sp_pay_in_x_info_card__counter-container {
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  justify-content: flex-start;
}

.sp_pay_in_x_info_card__counter {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding-bottom: 12px;
}

.sp_pay_in_x_info_card__counter-item {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  gap: 8px;
}

.sp_pay_in_x_info_card__counter-item:last-child {
  margin-bottom: 0;
}

.sp_pay_in_x_info_card__counter-point {
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  background-color: #ebebff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 0 4px white;
  font-weight: 600;
  color: #5666f0;
}

.sp_pay_in_x_info_card__counter-parent {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 100%;
  text-align: left;
  justify-content: center;
}

.sp_pay_in_x_info_card__counter-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
`;
var ql = /* @__PURE__ */ C("<style>"), Kl = /* @__PURE__ */ C('<section><h3 class="sp_info_card__heading m-0"></h3><ol class="list-decimal sp_info_card__content">'), Xl = /* @__PURE__ */ C("<li class=sp_info_card__content--li>");
const zr = (e) => [(() => {
  var t = ql();
  return g(t, jn), t;
})(), (() => {
  var t = Kl(), n = t.firstChild, a = n.nextSibling;
  return g(n, () => e.title), g(a, p(Te, {
    get each() {
      return e.contents;
    },
    children: (r) => (() => {
      var i = Xl();
      return g(i, r), i;
    })()
  })), U(() => z(t, e == null ? void 0 : e.className)), t;
})()];
var Jl = /* @__PURE__ */ C("<style>"), Ql = /* @__PURE__ */ C('<section class="pb-[12px] border-b-[1px] border-solid border-b-sp-exp5-light-gray"data-testid=consumer-lending-info-card-header><div class="bg-sp-white-1 text-sp-exp5-light-gray-2 rounded-lg p-2 mt-3 text-left"><span class="font-semibold text-sp-exp5-black text-base"data-testid=info-card-lending-installments></span><div class="text-xs/5 font-medium"><p data-testid=info-card-lending-schedule></p><p data-testid=info-card-lending-tan-taeg-details>'), ec = /* @__PURE__ */ C('<section data-testid=consumer-lending-info-card><h3 data-testid=pay-in-x-title class="sp_info_card__heading mb-2"></h3><section class=sp_pay_in_x_info_card__counter-container><div class=sp_pay_in_x_info_card__counter>'), tc = /* @__PURE__ */ C("<div class=sp_pay_in_x_info_card__counter-item><div class=sp_pay_in_x_info_card__counter-point></div><div class=sp_pay_in_x_info_card__counter-parent><div class=sp_pay_in_x_info_card__counter-content>");
const nc = (e) => {
  const t = Gn(() => e.paymentSchedule), n = () => e.tan.toFixed(2).replace(".", ","), a = () => t().toFixed(2).replace(".", ","), r = () => [p(O, {
    testId: "consumer_lending_information_1",
    get children() {
      return E(e.locale, "how_to_card:pay_lending_or_in_x:deutsche_bank:information_1");
    }
  }), p(O, {
    testId: "consumer_lending_information_2",
    get children() {
      return E(e.locale, "how_to_card:pay_lending_or_in_x:deutsche_bank:information_2");
    }
  }), p(O, {
    testId: "consumer_lending_information_3",
    get children() {
      return E(e.locale, "how_to_card:pay_lending_or_in_x:deutsche_bank:information_3");
    }
  })];
  return [(() => {
    var i = Jl();
    return g(i, jn), i;
  })(), (() => {
    var i = Ql(), s = i.firstChild, o = s.firstChild, l = o.nextSibling, c = l.firstChild, u = c.nextSibling;
    return g(o, () => E(e.locale, "info_card_lending:installments", {
      installments: e.installments,
      installmentAmount: e.installmentAmount
    })), g(c, () => E(e.locale, "info_card_lending:schedule")), g(u, () => E(e.locale, "learn_more_modal_51:tan_taeg_details", {
      tan: n(),
      taeg: a()
    })), i;
  })(), (() => {
    var i = ec(), s = i.firstChild, o = s.nextSibling, l = o.firstChild;
    return g(i, p(zr, {
      get title() {
        return E(e.locale, "modal:installments_card_title");
      },
      className: "border-b-[1px] border-solid border-b-sp-exp5-light-gray flex flex-col gap-2 max-w-[600px] pt-2 pr-3 pl-0 pb-4 mb-4 roudended-2 bg-white",
      get contents() {
        return [p(O, {
          testId: "information_1",
          get children() {
            return E(e.locale, "how_to_card:information_1");
          }
        }), p(O, {
          testId: "information_2",
          get children() {
            return E(e.locale, "learn_more_modal_51:how_to_2");
          }
        }), p(O, {
          testId: "information_3",
          get children() {
            return E(e.locale, e.channel === Be.TRAVEL ? "how_to_card:information_3:travel" : "learn_more_modal_51:how_to_3", {
              textStyle: "font-semibold text-black"
            });
          }
        }), p(O, {
          testId: "information_4",
          get children() {
            return E(e.locale, e.channel === Be.TRAVEL ? "how_to_card:information_4:travel" : "learn_more_modal_51:how_to_4");
          }
        })];
      }
    }), s), g(s, () => E(e.locale, "how_to_card:pay_in_x:title")), g(l, p(Te, {
      get each() {
        return r();
      },
      children: (c, u) => (() => {
        var d = tc(), m = d.firstChild, _ = m.nextSibling, h = _.firstChild;
        return g(m, () => u() + 1), g(h, c), d;
      })()
    })), i;
  })()];
};
var ac = /* @__PURE__ */ C("<style>"), rc = /* @__PURE__ */ C('<section data-testid=pay-in-x-info-card><div class=sp_pay_in_x_info_card__description></div><h3 data-testid=pay-in-x-title class="sp_info_card__heading mt-2"></h3><section class=sp_pay_in_x_info_card__counter-container><div class=sp_pay_in_x_info_card__counter>'), ic = /* @__PURE__ */ C("<div class=sp_pay_in_x_info_card__counter-item><div class=sp_pay_in_x_info_card__counter-point></div><div class=sp_pay_in_x_info_card__counter-parent><div class=sp_pay_in_x_info_card__counter-content>");
const Wr = (e) => {
  const t = () => {
    const n = [p(O, {
      testId: "pay_in_x_information_1",
      get children() {
        return E(e.locale, `how_to_card:pay_lending_or_in_x:${e.lenderShortName}:information_1`);
      }
    }), p(O, {
      testId: "pay_in_x_information_2",
      get children() {
        return E(e.locale, `how_to_card:pay_lending_or_in_x:${e.lenderShortName}:information_2`);
      }
    })];
    return e.lenderShortName === oe.BBVA ? n : [...n, p(O, {
      testId: "pay_in_x_information_3",
      get children() {
        return E(e.locale, `how_to_card:pay_lending_or_in_x:${e.lenderShortName}:information_3`);
      }
    })];
  };
  return [(() => {
    var n = ac();
    return g(n, jn), n;
  })(), (() => {
    var n = rc(), a = n.firstChild, r = a.nextSibling, i = r.nextSibling, s = i.firstChild;
    return g(a, p(O, {
      testId: "pay-in-x-description",
      get children() {
        return E(e.locale, "how_to_card:pay_in_x:description", {
          maxInstallments: e.maxInstallments,
          lenderName: On(e.lenderShortName)
        });
      }
    })), g(r, () => E(e.locale, "how_to_card:pay_in_x:title")), g(s, p(Te, {
      get each() {
        return t();
      },
      children: (o, l) => (() => {
        var c = ic(), u = c.firstChild, d = u.nextSibling, m = d.firstChild;
        return g(u, () => l() + 1), g(m, o), c;
      })()
    })), n;
  })()];
};
var sc = /* @__PURE__ */ C('<div class="mt-2 mb-0 pl-2 sp_summary_card__content"><p class="bg-sp-white-1 text-sp-exp5-light-gray-2 text-xs rounded-lg p-3 mt-4 text-left font-medium">'), oc = /* @__PURE__ */ C('<div class="mb-0 pl-2 sp_summary_card__content p-2">'), lc = /* @__PURE__ */ C('<div class="mt-2 mb-0 pl-2 sp_summary_card__content p-2">');
const cc = (e) => [p(M, {
  get when() {
    return N(() => !Qe(e.product) && !Xe(e.product))() && !xt(e.product);
  },
  get children() {
    var t = sc(), n = t.firstChild;
    return g(t, p(jl, {
      get installmentAmounts() {
        return e.payment.installmentAmounts;
      },
      get product() {
        return e.product;
      },
      get locale() {
        return e.locale;
      },
      get splitFee() {
        return e.payment.splitFee;
      },
      get currencyDisplay() {
        return e.currencyDisplay;
      },
      get currencyPosition() {
        return e.currencyPosition;
      }
    }), n), g(t, p(zr, {
      get title() {
        return E(e.locale, "modal:installments_card_title");
      },
      className: "flex flex-col gap-2 max-w-[600px] pt-2 pr-3 pl-0 pb-0 roudended-2 bg-white",
      get contents() {
        return [p(O, {
          testId: "information_1",
          get children() {
            return E(e.locale, "how_to_card:information_1");
          }
        }), p(O, {
          testId: "information_2",
          get children() {
            return E(e.locale, "learn_more_modal_51:how_to_2");
          }
        }), p(O, {
          testId: "information_3",
          get children() {
            return E(e.locale, e.channel === Be.TRAVEL ? "how_to_card:information_3:travel" : "learn_more_modal_51:how_to_3", {
              textStyle: "font-semibold text-black"
            });
          }
        }), p(O, {
          testId: "information_4",
          get children() {
            return E(e.locale, e.channel === Be.TRAVEL ? "how_to_card:information_4:travel" : "learn_more_modal_51:how_to_4");
          }
        })];
      }
    }), n), g(n, () => E(e.locale, "learn_more_modal_51:installment_disclaimer")), t;
  }
}), p(M, {
  get when() {
    return N(() => !Qe(e.product))() && xt(e.product);
  },
  get children() {
    var t = oc();
    return g(t, p(nc, {
      get locale() {
        return e.locale;
      },
      get tan() {
        return e.product.configuration.tan;
      },
      get installments() {
        return e.product.numberOfInstallments;
      },
      get installmentAmount() {
        return e.installmentAmount;
      },
      get paymentSchedule() {
        return e.paymentSchedule;
      }
    })), t;
  }
}), p(M, {
  get when() {
    return !Qe(e.product) && Xe(e.product) && e.lenderShortName;
  },
  get children() {
    var t = lc();
    return g(t, p(Wr, {
      get locale() {
        return e.locale;
      },
      get lenderShortName() {
        return e.lenderShortName;
      },
      get maxInstallments() {
        return e.product.configuration.maxInstallments;
      }
    })), t;
  }
})];
var Tn = /* @__PURE__ */ ((e) => (e.IMPRESSION = "impression", e.INTERACTION = "interaction", e))(Tn || {}), en = /* @__PURE__ */ ((e) => (e.WIDGET_OPEN = "widget_open", e.INSTALLMENT_DETAIL_VIEW = "installment_detail_view", e))(en || {}), Ft = /* @__PURE__ */ ((e) => (e.CHECKOUT = "checkout", e.CART = "cart", e.PRODUCT = "product", e))(Ft || {});
const uc = "PV8mVtplMOnjDzAEOoFiu4Eh", dc = [
  Ft.CHECKOUT,
  Ft.CART,
  Ft.PRODUCT
], qn = "scalapay_widget_tracking_session", mc = (e, t) => t && dc.includes(e), Pa = new TextEncoder(), _c = async (e) => {
  const t = await crypto.subtle.importKey(
    "raw",
    Pa.encode(uc),
    { name: "HMAC", hash: "SHA-256" },
    !1,
    ["sign"]
  ), n = await crypto.subtle.sign(
    "HMAC",
    t,
    Pa.encode(e)
  );
  return Array.from(new Uint8Array(n)).map((a) => a.toString(16).padStart(2, "0")).join("");
}, Ea = async (e, t) => {
  try {
    const n = Oi(t), a = JSON.stringify(e), r = await _c(a);
    fetch(n, {
      method: "POST",
      body: a,
      headers: {
        "Content-Type": "application/json",
        "X-Scalapay-Hmac-V1": r
      },
      keepalive: !0,
      mode: "cors"
    }).catch((i) => Z.debug("Failed in fetch tracking event", i));
  } catch (n) {
    Z.debug(`Error while sending event ${e.eventType}`, n);
  }
}, K = [];
for (let e = 0; e < 256; ++e)
  K.push((e + 256).toString(16).slice(1));
function pc(e, t = 0) {
  return (K[e[t + 0]] + K[e[t + 1]] + K[e[t + 2]] + K[e[t + 3]] + "-" + K[e[t + 4]] + K[e[t + 5]] + "-" + K[e[t + 6]] + K[e[t + 7]] + "-" + K[e[t + 8]] + K[e[t + 9]] + "-" + K[e[t + 10]] + K[e[t + 11]] + K[e[t + 12]] + K[e[t + 13]] + K[e[t + 14]] + K[e[t + 15]]).toLowerCase();
}
let hn;
const hc = new Uint8Array(16);
function fc() {
  if (!hn) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    hn = crypto.getRandomValues.bind(crypto);
  }
  return hn(hc);
}
const gc = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), ka = { randomUUID: gc };
function yc(e, t, n) {
  var r;
  e = e || {};
  const a = e.random ?? ((r = e.rng) == null ? void 0 : r.call(e)) ?? fc();
  if (a.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return a[6] = a[6] & 15 | 64, a[8] = a[8] & 63 | 128, pc(a);
}
function Ln(e, t, n) {
  return ka.randomUUID ? ka.randomUUID() : yc(e);
}
const xc = (e) => {
  const t = tn();
  return t ? (bc(e), { sessionId: t.session_id }) : { sessionId: Yr(e).session_id };
}, Yr = (e) => {
  const t = {
    session_id: Ln(),
    sent_page_types: [e]
  };
  return sessionStorage.setItem(
    qn,
    JSON.stringify(t)
  ), t;
}, tn = () => {
  const e = sessionStorage.getItem(qn);
  if (!e)
    return null;
  try {
    return JSON.parse(e);
  } catch (t) {
    return Z.debug("Error parsing tracking session storage:", t), null;
  }
}, bc = (e) => {
  const t = tn();
  return t ? t.sent_page_types.includes(e) ? !1 : (t.sent_page_types.push(e), sessionStorage.setItem(
    qn,
    JSON.stringify(t)
  ), !0) : (Yr(e), !0);
}, Na = (e, t) => {
  let n;
  const a = () => clearTimeout(n);
  return Da() && Fe(a), Object.assign((...i) => {
    n !== void 0 && a(), n = setTimeout(() => e(...i), t);
  }, { clear: a });
};
var Ne = /* @__PURE__ */ ((e) => (e.SHOPIFY = "Shopify", e.PRESTASHOP = "PrestaShop", e.WOOCOMMERCE = "WooCommerce", e.MAGENTO2 = "Magento 2", e.UNKNOWN = "unknown", e))(Ne || {});
const wc = () => window != null && window.Shopify ? {
  platform: Ne.SHOPIFY
} : null, Cc = () => {
  var t;
  const e = document.querySelector(
    'meta[name="generator"][content*="WooCommerce"]'
  );
  if (e) {
    const n = e.content.match(/WooCommerce\s+([\d.]+)/);
    return {
      platform: Ne.WOOCOMMERCE,
      platformVersion: (n == null ? void 0 : n[1]) ?? void 0
    };
  }
  return (t = document.body) != null && t.classList.contains("woocommerce-page") ? { platform: Ne.WOOCOMMERCE } : null;
}, vc = () => {
  var t, n, a;
  if (document.querySelector('script[type="text/x-magento-init"]'))
    return { platform: Ne.MAGENTO2 };
  const e = window.require;
  return (a = (n = (t = e == null ? void 0 : e.s) == null ? void 0 : t.contexts) == null ? void 0 : n._) != null && a.config ? { platform: Ne.MAGENTO2 } : null;
}, Ic = () => window != null && window.prestashop ? {
  platform: Ne.PRESTASHOP,
  platformVersion: void 0
} : null, Ac = [
  wc,
  Cc,
  vc,
  Ic
], Sc = () => {
  for (const e of Ac) {
    const t = e();
    if (t)
      return t;
  }
  return { platform: Ne.UNKNOWN };
}, Pc = (e) => {
  const {
    merchantToken: t,
    type: n,
    widgetVariant: a,
    environment: r
  } = e, i = tn(), {
    platform: s,
    platformVersion: o
  } = Sc();
  return {
    sessionId: (i == null ? void 0 : i.session_id) ?? "",
    platform: s,
    ...o && {
      platformVersion: o
    },
    screenWidth: window.screen.width,
    widgetVersion: ca[a] ?? ca[fe.DEFAULT],
    merchantToken: t,
    pageType: n,
    environment: r
  };
}, Ec = (e) => {
  const t = Pc(e), [n, a] = Or(t), r = tn();
  function i(l) {
    a("sessionId", l);
  }
  const s = Na((l) => {
    const c = l == null ? void 0 : l.amountInCents;
    !n.sessionId || r != null && r.sent_page_types.includes(n.pageType) || Ea({
      eventId: Ln(),
      eventType: Tn.IMPRESSION,
      sessionId: n.sessionId,
      merchantToken: n.merchantToken,
      pageType: n.pageType,
      timestamp: Date.now(),
      widgetVersion: n.widgetVersion,
      platform: n.platform,
      ...n.platformVersion && {
        platformVersion: n.platformVersion
      },
      screenWidth: n.screenWidth,
      ...c && {
        amount: (c / 100).toFixed(2)
      }
    }, n.environment);
  }, 500), o = Na((l) => {
    const {
      interactionType: c,
      amountInCents: u
    } = l;
    n.sessionId && Ea({
      eventId: Ln(),
      eventType: Tn.INTERACTION,
      interactionType: c,
      sessionId: n.sessionId,
      merchantToken: n.merchantToken,
      pageType: n.pageType,
      timestamp: Date.now(),
      widgetVersion: n.widgetVersion,
      platform: n.platform,
      ...n.platformVersion && {
        platformVersion: n.platformVersion
      },
      screenWidth: n.screenWidth,
      ...u && {
        amount: (u / 100).toFixed(2)
      }
    }, n.environment);
  }, 500);
  return {
    store: n,
    setSessionId: i,
    emitImpressionTrackingEvent: s,
    emitInteractionTrackingEvent: o
  };
}, Zr = Ba(), kc = (e) => {
  const {
    merchantToken: t,
    merchantConfig: n,
    type: a,
    environment: r
  } = e;
  return Ec({
    merchantToken: t,
    type: a,
    widgetVariant: n.widget.variant ?? fe.DEFAULT,
    environment: r
  });
}, $r = (e) => {
  const {
    merchantConfig: t,
    type: n,
    merchantToken: a
  } = e, r = kc(e);
  return at(() => {
    try {
      if (!a || !mc(n, t.widget.collect))
        return;
      const {
        sessionId: i
      } = xc(n);
      r.setSessionId(i);
    } catch (i) {
      Z.debug("Failed to initialize tracking session in context", i);
    }
  }), p(Zr.Provider, {
    value: r,
    get children() {
      return e.children;
    }
  });
}, nn = () => {
  const e = ii(Zr);
  if (!e)
    throw new Error("useAppContext must be used within an AppContextProvider");
  return e;
};
var Nc = /* @__PURE__ */ C("<style>"), fn = /* @__PURE__ */ C("<div class=sp_summary_card__footer><div data-testid=product_subtitle class=sp_summary_card__subtitle>"), Tc = /* @__PURE__ */ C("<div class=sp_summary_card__footer><div data-testid=payment-interests_disclaimer class=sp_summary_card__interests_disclaimer>"), Lc = /* @__PURE__ */ C('<span data-testid=payment-chip class="sp_summary_card__chip bg-sp-lilla-1 text-sp-exp5-dark-gray rounded-[10px] p-2">'), Hc = /* @__PURE__ */ C("<div tabindex=0>"), Mc = /* @__PURE__ */ C('<details class=sp_summary_card__container data-testid=product-summary-card><summary><div><div class="flex flex-col items-start grow p-2 pb-0"><div data-testid=payment-label class=sp_summary_card__payment-label></div></div><div class=flex>');
const Oc = (e, t, n) => e !== I.PAY_NOW_CHECKOUT ? `${n}<span class="align-super text-xs">/${t}</span>` : n, Rc = (e, t) => {
  const n = t && t.number !== 1 ? "plural" : "single";
  return `${E(e, `installment_summary:${t == null ? void 0 : t.frequencyType}_${n}`, {
    numberOfInstallments: t ? t.number : ""
  })}`;
}, Vc = (e) => {
  const [t, n] = q(!1), a = nn(), {
    emitInteractionTrackingEvent: r
  } = a, i = de(e, {
    product: {
      ...e.product,
      configuration: {
        ...e.product.configuration,
        splitFee: e.product.configuration.splitFee ?? !1
      }
    }
  }), s = N(() => Yt(i.amount ?? 0, i.product.numberOfInstallments ?? 1, i.product.configuration.splitFee, e.locale)), o = N(() => ys(s(), i.product.configuration.splitFee, i.locale, i.currencyDisplay, i.currencyPosition)), l = St({
    totalAmountInCents: () => e.amount,
    products: () => [i.product],
    locale: () => e.locale
  }), c = (y) => Jt({
    schedule: y,
    locale: () => e.locale,
    currencyDisplay: () => e.currencyDisplay,
    currencyPosition: () => e.currencyPosition
  }), u = (i.product.numberOfInstallments ?? 1) > 1 || (i.product.configuration.maxInstallments ?? 1) > 1, d = Rc(i.locale, i.product.frequency), m = xt(i.product) ? c(() => {
    var y;
    return (y = l()[i.product.product]) == null ? void 0 : y.paymentSchedule;
  })() : o().baseInstallmentAmount, _ = () => e.product.numberOfInstallments ?? 0, h = i.product.configuration.lenderId, f = h ? $t[h] : void 0, x = () => {
    n(!t()), t() && r({
      interactionType: en.INSTALLMENT_DETAIL_VIEW,
      amountInCents: i.amount ?? void 0
    });
  }, S = Qe(i.product) ? E(i.locale, "product_widget:pay_now_checkout_label") : E(i.locale, "product_widget:pay_in_n_label", {
    installments: _()
  }), v = Xe(i.product) ? ws(i.locale, "product_widget:pay_in_x_label", i.product.configuration.maxInstallments) : S;
  return [(() => {
    var y = Nc();
    return g(y, Vl), y;
  })(), (() => {
    var y = Mc(), b = y.firstChild, w = b.firstChild, A = w.firstChild, T = A.firstChild, k = A.nextSibling;
    return y.addEventListener("toggle", x), g(T, v), g(A, p(M, {
      get when() {
        return ir(i.product) || vn(i.product) && !s().splitFee;
      },
      get children() {
        var P = fn(), H = P.firstChild;
        return g(H, p(O, {
          get children() {
            return E(i.locale, "summary_card:no_interest_info");
          }
        })), P;
      }
    }), null), g(A, p(M, {
      get when() {
        return N(() => !!vn(i.product))() && s().splitFee;
      },
      get children() {
        var P = fn(), H = P.firstChild;
        return g(H, p(O, {
          get children() {
            return E(i.locale, "learn_more_modal_51:split_fee_first_installment", {
              amount: o().splitFee
            });
          }
        })), P;
      }
    }), null), g(A, p(M, {
      get when() {
        return xt(i.product);
      },
      get children() {
        var P = fn(), H = P.firstChild;
        return g(H, p(O, {
          get children() {
            return E(i.locale, "learn_more_modal_51:interests_disclaimer");
          }
        })), P;
      }
    }), null), g(A, p(M, {
      get when() {
        return Xe(i.product) && f !== oe.BBVA;
      },
      get children() {
        var P = Tc(), H = P.firstChild;
        return g(H, p(O, {
          get children() {
            return E(i.locale, rr([i.product]) ? "card_summary:interests_disclaimer_free" : "card_summary:interests_disclaimer");
          }
        })), P;
      }
    }), null), g(k, p(M, {
      get when() {
        return !Xe(i.product) && i.amount;
      },
      get children() {
        var P = Lc();
        return g(P, p(O, {
          get children() {
            return Oc(i.product.product, d, m);
          }
        })), P;
      }
    }), null), g(k, p(M, {
      get when() {
        return Xe(i.product);
      },
      get children() {
        return p(Ur, {
          lenderId: f
        });
      }
    }), null), g(k, p(M, {
      when: u,
      get children() {
        var P = Hc();
        return g(P, p(Br, {
          className: "sp_summary_card__icon",
          height: 25,
          width: 25
        })), U(() => z(P, `sp_summary_card__icon--container ${t() ? "sp_summary_card__open" : ""}`)), P;
      }
    }), null), g(y, p(M, {
      get when() {
        return t();
      },
      get children() {
        return p(cc, {
          get locale() {
            return i.locale;
          },
          get product() {
            return i.product;
          },
          lenderShortName: f,
          get payment() {
            return s();
          },
          get channel() {
            return i.channel;
          },
          installmentAmount: m,
          get paymentSchedule() {
            var P;
            return (P = l()[i.product.product]) == null ? void 0 : P.paymentSchedule;
          },
          get currencyDisplay() {
            return i.currencyDisplay;
          },
          get currencyPosition() {
            return i.currencyPosition;
          }
        });
      }
    }), null), U((P) => {
      var H = t(), G = `flex flex-row  justify-between items-center ${Qe(i.product) ? "" : "cursor-pointer"}`;
      return H !== P.e && (y.open = P.e = H), G !== P.t && z(w, P.t = G), P;
    }, {
      e: void 0,
      t: void 0
    }), y;
  })()];
};
var Fc = /* @__PURE__ */ C("<br>");
const Gr = (e) => {
  const t = (s) => {
    var o;
    s.preventDefault(), (o = e.onClose) == null || o.call(e, s);
  }, n = () => E(e.locale || me, "learn_more_modal:title"), a = () => {
    const s = n(), o = s.indexOf(". ");
    let l = s;
    return o !== -1 && o < s.length - 1 && (l = [N(() => s.slice(0, o + 1)), Fc(), N(() => s.slice(o + 1).trim())]), l;
  };
  Ye(() => {
    e.open && e.isStandalone && (document.title = "Scalapay - " + n());
  });
  const r = N(() => qt(e.products, e.amount).filter((s) => s.product !== I.PAY_LATER && s.isAvailable)), i = N(() => r().filter((s) => s.isAvailable && s.product !== I.PAY_NOW_CHECKOUT && s.product !== I.PAY_LATER && s.product !== I.PAY_IN_X && s.numberOfInstallments).sort((s, o) => {
    const l = (s == null ? void 0 : s.numberOfInstallments) || 0, c = (o == null ? void 0 : o.numberOfInstallments) || 0;
    return l - c;
  }));
  return p(Rl, {
    get isOpen() {
      return e.open;
    },
    onClose: t,
    get title() {
      return a();
    },
    get isStandalone() {
      return e.isStandalone;
    },
    get footer() {
      return p(O, {
        get children() {
          return E(e.locale || me, "modal:terms_and_conditions", {
            utmSource: window.location.hostname
          });
        }
      });
    },
    get locale() {
      return e.locale;
    },
    get children() {
      return p(Te, {
        get each() {
          return [...i(), ...r().filter((s) => !i().includes(s))];
        },
        children: (s) => p(Vc, {
          product: s,
          get amount() {
            return e.amount;
          },
          get locale() {
            return e.locale;
          },
          get currencyDisplay() {
            return e.currencyDisplay;
          },
          get currencyPosition() {
            return e.currencyPosition;
          },
          get channel() {
            return e.channel;
          }
        })
      });
    }
  });
};
var Ta = /* @__PURE__ */ C("<p>"), Dc = /* @__PURE__ */ C("<div>"), Bc = /* @__PURE__ */ C('<article><div><div><div><button class="cursor-pointer bg-transparent border-0 self-baseline text-black h-[21px]"tabindex=0>'), Uc = /* @__PURE__ */ C('<span class="inline-flex items-center"><span>&period;'), zc = /* @__PURE__ */ C("<span class=pr-1>");
const he = (...e) => e.join(","), Wc = (e) => {
  const t = ns(e), n = t.map((s) => s.product).filter((s) => s !== I.PAY_IN_X), a = n.filter((s) => De.includes(s)), r = a.length ? a[0] : n.join(","), i = {
    // Single products
    [I.PAY_IN_THREE]: ["product_widget:pay_in_3", 3],
    [I.PAY_IN_FOUR]: ["product_widget:pay_in_4", 4],
    [I.PAY_IN_SIX]: ["product_widget:pay_up_to_n_installments", 6],
    [I.PAY_IN_NINE]: ["product_widget:pay_up_to_n_installments", 9],
    [I.PAY_IN_TWELVE]: ["product_widget:pay_up_to_n_installments", 12],
    [I.PAY_NOW_CHECKOUT]: ["product_widget:pay_now_checkout", 1],
    [I.PAY_LATER]: ["product_widget:pay_later", 1],
    [I.PAY_IN_X]: ["product_widget:pay_in_x_only", 12],
    // Two product combinations
    [he(I.PAY_IN_THREE, I.PAY_IN_FOUR)]: ["product_widget:pay_in_3_pay_in_4", 4],
    [he(I.PAY_IN_THREE, I.PAY_NOW_CHECKOUT)]: ["product_widget:pay_in_3_pay_now_checkout", 3],
    [he(I.PAY_IN_THREE, I.PAY_LATER)]: ["product_widget:pay_in_3_pay_later", 3],
    [he(I.PAY_IN_FOUR, I.PAY_NOW_CHECKOUT)]: ["product_widget:pay_in_4_pay_now_checkout", 4],
    [he(I.PAY_IN_FOUR, I.PAY_LATER)]: ["product_widget:pay_in_4_pay_later", 4],
    [he(I.PAY_NOW_CHECKOUT, I.PAY_LATER)]: ["product_widget:pay_now_checkout_pay_later", 1],
    // Three product combinations
    [he(I.PAY_IN_THREE, I.PAY_IN_FOUR, I.PAY_NOW_CHECKOUT)]: ["product_widget:pay_in_3_pay_in_4_pay_now_checkout", 4],
    [he(I.PAY_IN_THREE, I.PAY_IN_FOUR, I.PAY_LATER)]: ["product_widget:pay_in_3_pay_in_4_pay_later", 4],
    [he(I.PAY_IN_THREE, I.PAY_NOW_CHECKOUT, I.PAY_LATER)]: ["product_widget:pay_in_3_pay_now_checkout_pay_later", 3],
    [he(I.PAY_IN_FOUR, I.PAY_NOW_CHECKOUT, I.PAY_LATER)]: ["product_widget:pay_in_4_pay_now_checkout_pay_later", 4],
    // Four product combination
    [he(I.PAY_IN_THREE, I.PAY_IN_FOUR, I.PAY_NOW_CHECKOUT, I.PAY_LATER)]: ["product_widget:pay_in_3_pay_in_4_pay_now_checkout_pay_later", 4]
  };
  return t.length === 1 && t.every((s) => s.product === I.PAY_IN_X) ? i[I.PAY_IN_X] : i[r];
}, Yc = (e) => {
  const [t, n] = q(!1), a = nn(), {
    emitInteractionTrackingEvent: r
  } = a, i = e.darkMode === Se.SYSTEM && Xt() || e.darkMode === Se.ALWAYS, s = N(() => jt(e.merchantConfig.products, e.amount)), o = Vr({
    products: s,
    amount: () => e.amount ?? 0,
    locale: () => e.locale
  }), l = () => or(s(), e.locale, ce.PRODUCT, i), c = N(() => nr(s())), u = N(() => s().some((x) => De.includes(x.product))), d = N(() => ar(s())), m = St({
    totalAmountInCents: () => e.amount,
    products: s,
    locale: () => e.locale
  }), _ = (x) => Jt({
    schedule: x,
    locale: () => e.locale,
    currencyDisplay: () => e.currencyDisplay,
    currencyPosition: () => e.currencyPosition
  }), h = N(() => {
    let x = Wc(s());
    if (!x) {
      Z.warn(`Combination of products: (${s().map((b) => b.product)}) not supported`);
      return;
    }
    const S = e.hideInstallments && Re(s()) ? `${x[0]}_no_installments` : x[0], v = Yt(e.amount ?? 0, x[1], !!o(), e.locale), y = u() ? _(() => {
      var b;
      return (b = m()[`pay-in-${x[1]}`]) == null ? void 0 : b.paymentSchedule;
    }) : $(v.baseInstallmentAmount, e.locale, e.currencyDisplay, e.currencyPosition);
    return c() ? l() : E(e.locale, S, {
      feeStar: o() ? "*" : "",
      installmentAmount: e.hideInstallments ? void 0 : typeof y == "string" ? y : y(),
      installments: u() ? x[1] : "",
      textStyle: `font-semibold ${i ? "text-white" : "text-black"}`
    });
  }), f = e.hideInstallments ? "product_widget:pay_in_4_service_fee_single_no_amount" : "product_widget:pay_in_4_service_fee_single";
  return p(M, {
    get when() {
      return N(() => !!e.amount)() && h();
    },
    get children() {
      var x = Bc(), S = x.firstChild, v = S.firstChild, y = v.firstChild, b = y.firstChild;
      return z(x, `flex flex-col font-medium leading-6 ${i ? "text-white" : "text-sp-primary-gray"}`), g(v, p(O, {
        testId: "product-widget-label",
        get children() {
          return h();
        }
      }), y), g(v, (() => {
        var w = N(() => !!Re(s()));
        return () => w() && (() => {
          var A = Uc(), T = A.firstChild;
          return g(A, p(Qt, {
            type: "black",
            get scalePercent() {
              return e.logoSize;
            }
          }), T), A;
        })();
      })(), y), g(y, (() => {
        var w = N(() => !!(Re(s()) && !d() && !u()));
        return () => w() && (() => {
          var A = zc();
          return g(A, () => E(e.locale, "product_widget:no_interest")), A;
        })();
      })(), b), b.$$click = () => {
        n(!0), r({
          interactionType: en.WIDGET_OPEN,
          amountInCents: e.amount ?? void 0
        });
      }, g(b, (() => {
        var w = N(() => !!(e != null && e.hideLearnMore));
        return () => w() ? p(Fr, {
          fill: i ? "white" : "black"
        }) : p(O, {
          testId: "product-widget-btn",
          className: `hover:text-sp-primary-blue underline text-sm font-semibold ${i ? "text-white" : "text-black"} font-medium`,
          get children() {
            return E(e.locale, "product_widget:learn_more");
          }
        });
      })()), g(x, p(M, {
        get when() {
          return N(() => !!(Re(s()) && o()))() && !u();
        },
        get children() {
          var w = Ta();
          return g(w, p(O, {
            testId: "product-widget-service-fee",
            get children() {
              return E(e.locale, f, {
                feeAmount: $(o(), e.locale, e.currencyDisplay, e.currencyPosition)
              });
            }
          })), U(() => z(w, `flex-1 font-normal ${i ? "text-sp-white-2" : "text-sp-primary-gray"} text-xs mt-1 ${Oe("text")[e.alignment ?? le.LEFT]}`)), w;
        }
      }), null), g(x, p(M, {
        get when() {
          return u();
        },
        get children() {
          var w = Ta();
          return g(w, p(O, {
            testId: "product-widget-tan-taeg-disclaimer",
            get children() {
              return E(e.locale, "learn_more_modal_51:interests_disclaimer");
            }
          })), U(() => z(w, `flex-1 font-normal ${i ? "text-sp-white-2" : "text-sp-primary-gray"} text-xs mt-1 ${Oe("text")[e.alignment ?? le.LEFT]}`)), w;
        }
      }), null), g(x, p(M, {
        get when() {
          return N(() => !!Re(s()))() && l();
        },
        get children() {
          var w = Dc();
          return g(w, p(O, {
            testId: "product-pay-in-x-label",
            get children() {
              return l();
            }
          })), U(() => z(w, `flex flex-col gap-1 ${i ? "text-white" : ""} ${Oe("items")[e.alignment ?? le.LEFT]}`)), w;
        }
      }), null), g(x, p(M, {
        get when() {
          return t();
        },
        get children() {
          return p(Gr, {
            get amount() {
              return e.amount ?? 0;
            },
            get currencyDisplay() {
              return e.currencyDisplay;
            },
            get currencyPosition() {
              return e.currencyPosition;
            },
            get products() {
              return s();
            },
            get locale() {
              return e.locale;
            },
            onClose: () => n(!1),
            get open() {
              return t();
            },
            get channel() {
              return e.channel;
            }
          });
        }
      }), null), U((w) => {
        var A = `flex flex-col gap-1 ${Oe("items")[e.alignment ?? le.LEFT]}`, T = `flex flex-wrap items-center gap-1 ${Oe("justify")[e.alignment ?? le.LEFT]}`, k = `${Oe("justify")[e.alignment ?? le.LEFT]} w-full justify-start min-[361px]:w-auto inline-flex`;
        return A !== w.e && z(S, w.e = A), T !== w.t && z(v, w.t = T), k !== w.a && z(y, w.a = k), w;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      }), x;
    }
  });
};
it(["click"]);
var Zc = /* @__PURE__ */ C('<button class="bg-sp-primary-blue text-white max-w-fit border-none flex justify-center items-center cursor-pointer transition-colors duration-200 px-20 py-2.5 min-w-[100px] rounded-full self-center leading-[21px] text-sm font-semibold hover:bg-sp-blue-1"tabindex=0>'), $c = /* @__PURE__ */ C('<div class="flex flex-col p-2 pb-12 gap-6 rounded-3xl rounded-b-xl overflow-y-auto"><header class="text-gray-900 gap-4 flex flex-col items-center pt-6 pb-3 relative mb-4"><h3 id=scalapay-modal-title class="font-semibold text-[19px] text-center m-0 px-1">');
const Gc = (e) => p(Dr, {
  get isOpen() {
    return e.isOpen;
  },
  get onClose() {
    return e.onClose;
  },
  get isStandalone() {
    return e.isStandalone;
  },
  class: "min-[450px]:max-w-sp-exp5-modal",
  get footer() {
    return N(() => !e.isStandalone)() && (() => {
      var t = Zc();
      return bn(t, "click", e.onClose), g(t, () => E(e.locale || me, "modal:close_button")), t;
    })();
  },
  get header() {
    return (() => {
      var t = $c(), n = t.firstChild, a = n.firstChild;
      return g(n, p(Qt, {
        type: "custom",
        width: 136,
        height: 40,
        className: "rounded-full p-[12px] bg-sp-exp5-black text-sp-exp5-pink"
      }), a), g(a, () => e.title), t;
    })();
  },
  get children() {
    return e.children;
  }
});
it(["click"]);
var jc = /* @__PURE__ */ C("<p class=mt-1>"), qc = /* @__PURE__ */ C('<div data-testid=interest-disclaimer class="bg-sp-white-1 rounded-lg px-3 py-1 text-sp-exp5-light-gray-2 text-sm font-medium"><p class="inline-flex items-center gap-1"><button class="bg-transparent border-none cursor-pointer p-0 flex items-center">');
const La = (e) => {
  const [t, n] = q(!1), a = () => e.tan.toFixed(2).replace(".", ","), r = () => e.taeg.toFixed(2).replace(".", ",");
  return (() => {
    var i = qc(), s = i.firstChild, o = s.firstChild;
    return g(s, () => E(e.locale, "learn_more_modal_51:interests_disclaimer"), o), o.$$click = () => n(!t()), g(o, p(Fr, {
      width: 16,
      height: 16
    })), g(i, p(M, {
      get when() {
        return t();
      },
      get children() {
        var l = jc();
        return g(l, () => E(e.locale, "learn_more_modal_51:tan_taeg_details", {
          tan: a(),
          taeg: r()
        })), l;
      }
    }), null), i;
  })();
};
it(["click"]);
const Kc = (e) => N(() => {
  const t = e();
  return t ? t.reduce((n, a) => n + a.amount.amountInCents, 0) : 0;
}), Xc = ({
  schedule: e,
  amount: t,
  totalAmount: n,
  hasTan: a,
  locale: r,
  currencyDisplay: i,
  currencyPosition: s
}) => N(() => {
  if (!a() || !t() || !e())
    return "";
  const o = n() - t();
  return o <= 0 ? "" : $(
    o,
    r(),
    i(),
    s()
  );
});
var Jc = /* @__PURE__ */ C('<div class="flex flex-col gap-2"><p class="text-lg text-sp-light-gray-2 font-bold pb-2"></p><div class="h-2 w-full relative overflow-hidden"><div class="rounded-full bg-sp-primary-blue h-full absolute left-0 top-0 transition-all duration-300"></div><div class="border-sp-exp5-gray rounded-full h-2 border border-solid bg-white"></div></div><p class="rounded-full text-sm text-sp-exp5-light-gray-2 font-medium">'), Ha = /* @__PURE__ */ C('<div class="flex flex-col items-end justify-end w-[60%]"data-testid=installment-option-card-interest-disclaimer>'), Qc = /* @__PURE__ */ C('<div class="flex gap-2"data-testid=installment-option-card-content><div class="flex flex-col gap-1 flex-1 w-[40%]"data-testid=installment-option-card-payment-info><p class="text-lg sp-exp5-dark-gray font-semibold">'), eu = /* @__PURE__ */ C("<span>"), tu = /* @__PURE__ */ C('<p class="text-sp-exp5-light-gray-2 font-medium text-sm text-lg">'), nu = /* @__PURE__ */ C('<p class="text-sp-exp5-light-gray-2 font-medium text-sm">'), au = /* @__PURE__ */ C('<p class="text-sp-primary-gray font-medium text-sm underline cursor-pointer">'), ru = /* @__PURE__ */ C('<div class="flex flex-col items-end justify-center gap-1"data-testid=installment-option-card-lender-info><p class="text-sp-exp5-light-gray-2 text-sm font-medium">'), iu = /* @__PURE__ */ C('<div class="flex gap-2"data-testid=installment-option-card-content><div class="flex flex-col gap-1 flex-1 w-[40%]"data-testid=installment-option-card-payment-info><p class="text-lg text-sp-primary-gray font-medium"></p><p class="text-sp-exp5-dark-gray font-semibold text-xl">'), su = /* @__PURE__ */ C("<div class=mt-4>"), ou = /* @__PURE__ */ C("<div data-testid=installment-option-card-footer>"), lu = /* @__PURE__ */ C("<div data-testid=installment-option-card>");
const cu = (e) => {
  const t = () => e.product.product === I.PAY_NOW_CHECKOUT, n = () => e.product.numberOfInstallments ?? 0, a = () => e.product.configuration.splitFee ?? !1, r = () => e.product.configuration.tan != null && !e.product.configuration.lenderId, i = () => !!e.product.configuration.lenderId, s = () => {
    const b = e.product.configuration.lenderId;
    return b ? $t[b] : void 0;
  }, [o, l] = q(!1), c = () => e.paymentSchedule, u = Jt({
    schedule: c,
    locale: () => e.locale,
    currencyDisplay: () => e.currencyDisplay,
    currencyPosition: () => e.currencyPosition
  }), d = Kc(c), m = N(() => {
    const b = c();
    if (!b || b.length === 0 || !a())
      return;
    const w = b[0], A = b[1];
    if (!A)
      return;
    const T = w.amount.amountInCents - A.amount.amountInCents;
    if (!(T <= 0))
      return $(T, e.locale, e.currencyDisplay, e.currencyPosition);
  }), _ = () => e.product.configuration.tan !== null && e.product.configuration.tan !== void 0, h = Xc({
    schedule: c,
    amount: () => e.amount,
    totalAmount: d,
    hasTan: _,
    locale: () => e.locale,
    currencyDisplay: () => e.currencyDisplay,
    currencyPosition: () => e.currencyPosition
  }), f = Gn(c), x = N(() => e.product.isAvailable ? 0 : tr(e.product, e.amount)), S = N(() => {
    if (!e.product.configuration.minimumAmount)
      return "";
    const b = ke(e.product.configuration.minimumAmount.amount);
    return b ? $(b, e.locale, e.currencyDisplay, e.currencyPosition) : "";
  }), v = () => {
    const b = e.product.frequency;
    return b ? `/${E(e.locale, `installment_summary:${b.frequencyType}_single`)}` : "";
  }, y = () => t() ? E(e.locale, "learn_more_modal_51:pay_in_full") : E(e.locale, "learn_more_modal_51:pay_in_n", {
    count: n()
  });
  return (() => {
    var b = lu();
    return g(b, p(M, {
      get when() {
        return !e.product.isAvailable;
      },
      get children() {
        var w = Jc(), A = w.firstChild, T = A.nextSibling, k = T.firstChild, P = T.nextSibling;
        return g(A, y), g(P, () => E(e.locale, "learn_more_modal_51:available_above", {
          amount: S()
        })), U((H) => (H = `${x()}%`) != null ? k.style.setProperty("width", H) : k.style.removeProperty("width")), w;
      }
    }), null), g(b, p(M, {
      get when() {
        return e.product.isAvailable && !e.amount;
      },
      get children() {
        var w = Qc(), A = w.firstChild, T = A.firstChild;
        return g(T, y), g(w, p(M, {
          get when() {
            return _() || i();
          },
          get children() {
            var k = Ha();
            return g(k, p(La, {
              get locale() {
                return e.locale;
              },
              get tan() {
                return e.product.configuration.tan;
              },
              get taeg() {
                return f() ?? 0;
              }
            })), k;
          }
        }), null), w;
      }
    }), null), g(b, p(M, {
      get when() {
        var w;
        return N(() => !!e.product.isAvailable)() && ((w = c()) == null ? void 0 : w.length);
      },
      get children() {
        return [(() => {
          var w = iu(), A = w.firstChild, T = A.firstChild, k = T.nextSibling;
          return g(T, y), g(k, u, null), g(k, p(M, {
            get when() {
              return N(() => n() > 1)() && v();
            },
            get children() {
              var P = eu();
              return g(P, v), P;
            }
          }), null), g(A, p(M, {
            get when() {
              return N(() => !!a())() && m();
            },
            get children() {
              var P = tu();
              return g(P, () => E(e.locale, "learn_more_modal_51:split_fee_first_installment", {
                amount: m()
              })), P;
            }
          }), null), g(A, p(M, {
            get when() {
              return _();
            },
            get children() {
              var P = nu();
              return g(P, (() => {
                var H = N(() => !!e.product.configuration.tan);
                return () => H() ? E(e.locale, "learn_more_modal_51:interest_amount", {
                  amount: h()
                }) : E(e.locale, "learn_more_modal_51:interest_free");
              })()), P;
            }
          }), null), g(A, p(M, {
            get when() {
              return i();
            },
            get children() {
              var P = au();
              return P.$$click = () => l(!o()), g(P, () => E(e.locale, "learn_more_modal_51:see_more_info")), P;
            }
          }), null), g(w, p(M, {
            get when() {
              return r();
            },
            get children() {
              var P = Ha();
              return g(P, p(La, {
                get locale() {
                  return e.locale;
                },
                get tan() {
                  return e.product.configuration.tan;
                },
                get taeg() {
                  return f() ?? 0;
                }
              })), P;
            }
          }), null), g(w, p(M, {
            get when() {
              return i();
            },
            get children() {
              var P = ru(), H = P.firstChild;
              return g(H, () => E(e.locale, "learn_more_modal_51:in_partnership_with")), g(P, p(Ur, {
                get lenderId() {
                  return s();
                }
              }), null), P;
            }
          }), null), w;
        })(), (() => {
          var w = ou();
          return g(w, p(M, {
            get when() {
              return o();
            },
            get children() {
              var A = su();
              return g(A, p(Wr, {
                get locale() {
                  return e.locale;
                },
                get lenderShortName() {
                  return s();
                },
                get maxInstallments() {
                  return e.product.configuration.maxInstallments;
                }
              })), A;
            }
          })), w;
        })()];
      }
    }), null), U(() => z(b, `rounded-2xl p-4 text-left ${e.product.isAvailable ? "bg-white" : "bg-sp-exp5-light-gray"}`)), b;
  })();
};
it(["click"]);
var uu = /* @__PURE__ */ C('<svg width=128 height=16 viewBox="0 0 128 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.00032 13.3128C2.00032 13.3128 89.4377 -0.979749 125.534 2.56412"stroke=#5666F0 stroke-width=4 stroke-miterlimit=10 stroke-linecap=round>');
const du = () => uu();
var mu = /* @__PURE__ */ C("<span class=text-sm>"), _u = /* @__PURE__ */ C('<span class="relative mb-4"><s class="text-3xl no-underline"></s><span class="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">'), pu = /* @__PURE__ */ C('<span class="flex flex-col gap-1"><span class=text-3xl>'), hu = /* @__PURE__ */ C('<section class="bg-white rounded-2xl p-4 text-left"><h3 class="text-lg font-semibold text-black m-0 mb-2"></h3><ol class="list-decimal m-0 p-0 pl-4 flex flex-col gap-2.5 text-sp-exp5-black font-medium"><li></li><li></li><li></li><li></li></ol><p class="bg-sp-white-1 text-sp-exp5-light-gray-2 text-xs rounded-lg p-3 mt-4 text-left font-medium">'), fu = /* @__PURE__ */ C('<footer class="text-xs text-sp-exp5-light-gray-2 text-left p-4 pt-2 font-medium ">');
const jr = (e) => {
  const t = () => e.locale || me, n = N(() => qt(e.products, e.amount)), a = St({
    totalAmountInCents: () => e.amount,
    products: n,
    locale: t
  }), r = (o) => {
    var l;
    o.preventDefault(), (l = e.onClose) == null || l.call(e, o);
  }, i = () => e.amount ? $(e.amount, t(), e.currencyDisplay, e.currencyPosition) : "", s = () => (() => {
    var o = pu(), l = o.firstChild;
    return g(o, p(M, {
      get when() {
        return e.amount;
      },
      get children() {
        return [(() => {
          var c = mu();
          return g(c, () => E(t(), "learn_more_modal_51:instead_of")), c;
        })(), (() => {
          var c = _u(), u = c.firstChild, d = u.nextSibling;
          return g(u, i), g(d, p(du, {})), c;
        })()];
      }
    }), l), g(l, () => E(t(), "learn_more_modal_51:title")), o;
  })();
  return Ye(() => {
    e.open && e.isStandalone && (document.title = "Scalapay - " + E(t(), "learn_more_modal_51:title"));
  }), p(Gc, {
    get isOpen() {
      return e.open;
    },
    onClose: r,
    get title() {
      return s();
    },
    get isStandalone() {
      return e.isStandalone;
    },
    get locale() {
      return e.locale;
    },
    get children() {
      return [p(Te, {
        get each() {
          return n();
        },
        children: (o) => {
          const l = () => {
            var c;
            return (c = a()[o.product]) == null ? void 0 : c.paymentSchedule;
          };
          return p(M, {
            get when() {
              var c, u;
              return o.isAvailable || ((c = l()) == null ? void 0 : c.length) && ke(((u = o.configuration.maximumAmount) == null ? void 0 : u.amount) ?? 0) > (e.amount ?? 0);
            },
            get children() {
              return p(cu, {
                product: o,
                get amount() {
                  return e.amount;
                },
                get locale() {
                  return e.locale;
                },
                get currencyDisplay() {
                  return e.currencyDisplay;
                },
                get currencyPosition() {
                  return e.currencyPosition;
                },
                get paymentSchedule() {
                  return l();
                }
              });
            }
          });
        }
      }), (() => {
        var o = hu(), l = o.firstChild, c = l.nextSibling, u = c.firstChild, d = u.nextSibling, m = d.nextSibling, _ = m.nextSibling, h = c.nextSibling;
        return g(l, () => E(t(), "learn_more_modal_51:installments_card_title")), g(u, p(O, {
          get children() {
            return E(t(), "learn_more_modal_51:how_to_1");
          }
        })), g(d, p(O, {
          get children() {
            return E(t(), "learn_more_modal_51:how_to_2");
          }
        })), g(m, p(O, {
          get children() {
            return E(t(), e.channel === Be.TRAVEL ? "learn_more_modal_51:how_to_3:travel" : "learn_more_modal_51:how_to_3");
          }
        })), g(_, p(O, {
          get children() {
            return E(t(), e.channel === Be.TRAVEL ? "learn_more_modal_51:how_to_4:travel" : "learn_more_modal_51:how_to_4");
          }
        })), g(h, () => E(t(), "learn_more_modal_51:installment_disclaimer")), o;
      })(), (() => {
        var o = fu();
        return g(o, p(O, {
          get children() {
            return E(t(), "modal:terms_and_conditions", {
              utmSource: window.location.hostname
            });
          }
        })), o;
      })()];
    }
  });
};
var gu = /* @__PURE__ */ C('<svg xmlns=http://www.w3.org/2000/svg fill=none data-testid=tick-icon role=img><path d="M10.6728 0.32089C11.1088 0.748987 11.1091 1.44335 10.6735 1.87179L4.76934 7.67849C4.55985 7.88451 4.27558 8.00019 3.9792 8C3.68283 7.99981 3.3987 7.88377 3.18949 7.67748L0.325512 4.85342C-0.109551 4.42443 -0.108348 3.73007 0.328197 3.30253C0.764743 2.87499 1.47132 2.87617 1.90638 3.30517L3.98095 5.35082L9.09464 0.321514C9.53027 -0.106927 10.2368 -0.107207 10.6728 0.32089Z"fill=#272727>');
const yu = ({
  width: e = 11,
  height: t = 8,
  className: n
}) => {
  const a = `0 0 ${e} ${t}`;
  return (() => {
    var r = gu();
    return R(r, "viewBox", a), R(r, "height", t), R(r, "width", e), R(r, "class", n), r;
  })();
};
var xu = /* @__PURE__ */ C("<div>"), bu = /* @__PURE__ */ C('<div class="h-2 w-full relative overflow-hidden mb-1"data-testid=product-widget-progress-bar><div class="rounded-full bg-sp-primary-blue h-full absolute left-0 top-0 transition-all duration-300"></div><div class="border-sp-exp5-gray rounded-full h-2 border border-solid bg-white">'), wu = /* @__PURE__ */ C('<article><div class="flex flex-col gap-1"><div><div class="inline-flex items-center flex-1"><span class="inline-flex items-center mr-[8px] flex-shrink-0"></span><div></div></div><div class="inline-flex ml-[8px] flex-shrink-0"><button tabindex=0>');
const Mt = "symbol", Cu = (e) => {
  const [t, n] = q(!1), a = nn(), {
    emitInteractionTrackingEvent: r
  } = a, i = e.darkMode === Se.SYSTEM && Xt() || e.darkMode === Se.ALWAYS, s = N(() => qt(e.merchantConfig.products, e.amount)), o = St({
    totalAmountInCents: () => e.amount,
    products: s,
    locale: () => e.locale
  }), l = N(() => s().every((h) => !h.isAvailable)), c = N(() => s().find((h) => h.isAvailable) ?? null), u = N(() => {
    const h = [...s().filter((f) => !Qe(f))].toReversed();
    return l() ? [...h].shift() : [...h].find((f) => {
      var x;
      return !f.isAvailable && f.numberOfInstallments > ((x = c()) == null ? void 0 : x.numberOfInstallments);
    }) ?? null;
  }), d = N(() => {
    if (!c())
      return Z.debug("No products available, not showing main label"), null;
    const h = o() ? o()[c().product] : null, f = h ? Gt(h) : null;
    if (Z.debug("Evaluating label with amount, calculated installment amount and payment schedules", {
      amountInCents: e.amount,
      defaultPaymentSchedules: h,
      paymentSchedules: o(),
      lowestInstallment: f,
      firstAvailableProduct: c(),
      firstNotAvailableProduct: u()
    }), ar(s()))
      return E(e.locale, "product_widget_exp5_10:pay_now");
    if (e.amount && h && f)
      return E(e.locale, "product_widget_exp5_10:from_x_in_n_installments", {
        installments: h.paymentSchedule.length,
        installmentAmount: $(f.amountInCents, e.locale, Mt, e.currencyPosition),
        textStyle: `font-semibold ${i ? "text-white" : "text-sp-exp5-dark-gray"}`
      });
    Z.debug("No amount provided, showing default label without amount and installments", s());
    let x = "product_widget_exp5_10:pay_in_n_installments";
    return Cn(s()) && (x = "product_widget_exp5_10:pay_up_to_n_installments"), E(e.locale, x, {
      installments: er(s()),
      textStyle: `font-semibold ${i ? "text-white" : "text-sp-exp5-dark-gray"}`
    });
  }), m = N(() => {
    var v, y, b, w;
    if (!u())
      return Z.debug("All products are available, not showing sub label"), null;
    const h = e.amount ?? 0, f = ke(((y = (v = u().configuration) == null ? void 0 : v.minimumAmount) == null ? void 0 : y.amount) ?? 0), x = ir(u()) || vn(u()), S = s().some((A) => xt(A));
    return Z.debug("Evaluating sub label with", {
      minAmountInCents: f,
      amountInCents: h,
      firstNotAvailableProduct: u(),
      firstAvailableProduct: c(),
      notAvailableProductIsCoreProduct: x,
      hasConsumerLendingProducts: S
    }), h > f ? (Z.debug("Amount is above the minimum required for the not available product, not showing sub label"), null) : x ? E(e.locale, "product_widget_exp5_10:sub_label_only_core_products", {
      installments: (b = u()) == null ? void 0 : b.numberOfInstallments,
      differenceAmount: $(f - h, e.locale, Mt, e.currencyPosition),
      [l() ? "textStyle" : "textStyleInner"]: `font-semibold ${i ? "text-white" : ""}`
    }) : (S || Cn(s())) && !x ? E(e.locale, "product_widget_exp5_10:sub_label_consumer_lending_products", {
      installments: (w = u()) == null ? void 0 : w.numberOfInstallments,
      minAmount: $(f, e.locale, Mt, e.currencyPosition)
    }) : null;
  }), _ = N(() => u() !== null ? tr(u(), e.amount) : 0);
  return p(M, {
    get when() {
      return d() || m();
    },
    get children() {
      var h = wu(), f = h.firstChild, x = f.firstChild, S = x.firstChild, v = S.firstChild, y = v.nextSibling, b = S.nextSibling, w = b.firstChild;
      return z(h, `flex flex-col border rounded-[8px] py-[4px] pl-[4px] pr-[8px] font-medium leading-6 text-base border-sp-exp5-gray ${i ? "text-white" : "text-sp-exp5-dark-gray"}`), g(v, p(Qt, {
        type: "custom",
        width: 110,
        height: 24,
        className: "rounded-[4px] p-[4px] bg-sp-exp5-black text-sp-exp5-pink"
      })), g(y, p(M, {
        get when() {
          return d();
        },
        get children() {
          var A = xu();
          return g(A, p(O, {
            testId: "product-widget-label",
            get children() {
              return d();
            }
          }), null), g(A, p(M, {
            get when() {
              return N(() => !!m())() && _();
            },
            get children() {
              return p(yu, {
                width: 11,
                height: 8
              });
            }
          }), null), U(() => z(A, `flex items-center ${m() && _() ? "mb-2 gap-x-1" : ""}`)), A;
        }
      }), null), g(y, p(M, {
        get when() {
          return N(() => !!m())() && _();
        },
        get children() {
          return [(() => {
            var A = bu(), T = A.firstChild;
            return U((k) => (k = `${_()}%`) != null ? T.style.setProperty("width", k) : T.style.removeProperty("width")), A;
          })(), p(O, {
            testId: "product-widget-sublabel",
            get className() {
              return d() && !i ? "text-sp-exp5-light-gray-2 text-sm" : "";
            },
            get children() {
              return m();
            }
          })];
        }
      }), null), w.$$click = () => {
        n(!0), r({
          interactionType: en.WIDGET_OPEN,
          amountInCents: e.amount ?? void 0
        });
      }, g(w, p(Br, {
        width: 24,
        height: 24
      })), g(h, p(M, {
        get when() {
          return t();
        },
        get children() {
          return p(jr, {
            get amount() {
              return e.amount;
            },
            currencyDisplay: Mt,
            get currencyPosition() {
              return e.currencyPosition;
            },
            get products() {
              return e.merchantConfig.products;
            },
            get locale() {
              return e.locale;
            },
            onClose: () => n(!1),
            get open() {
              return t();
            },
            get channel() {
              return e.channel;
            }
          });
        }
      }), null), U((A) => {
        var T = `flex flex-nowrap items-center ${e.alignment === le.RIGHT ? "justify-end" : e.alignment === le.CENTER ? "justify-center" : "justify-between"}`, k = `flex flex-col ${d() ? "" : "mt-1"}`, P = `cursor-pointer bg-transparent border-0 ${i ? "text-white" : "text-sp-exp5-black"} ${t() ? "rotate-180" : "rotate-0"}`;
        return T !== A.e && z(x, A.e = T), k !== A.t && z(y, A.t = k), P !== A.a && z(w, A.a = P), A;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      }), h;
    }
  });
};
it(["click"]);
var vu = /* @__PURE__ */ C('<article><span class="flex flex-col gap-1 mb-4">'), Iu = /* @__PURE__ */ C('<span class="flex flex-col gap-1">');
const Au = (e) => {
  const t = e.darkMode === Se.SYSTEM && Xt() || e.darkMode === Se.ALWAYS, n = N(() => jt(e.merchantConfig.products, e.amount)), a = N(() => {
    if (!e.amount || !n().length)
      return null;
    const s = Fn(n(), e.amount, e.locale), o = Dn(s), l = Gt(o);
    return $(l.amountInCents, e.locale, e.currencyDisplay, e.currencyPosition);
  }), r = N(() => er(n())), i = N(() => n().filter((s) => (s == null ? void 0 : s.numberOfInstallments) && s.numberOfInstallments !== r() && s.numberOfInstallments > 1).map((s) => s.numberOfInstallments).sort((s, o) => s - o));
  return p(M, {
    get when() {
      return n().length > 0;
    },
    get children() {
      return [(() => {
        var s = vu(), o = s.firstChild;
        return g(o, p(M, {
          get when() {
            return N(() => n().length === 1)() && n()[0].product !== I.PAY_NOW_CHECKOUT;
          },
          get children() {
            return p(O, {
              testId: "checkout-label-single-product",
              get children() {
                return E(e.locale, "checkout_widget_exp5_10:title_single_product", {
                  installments: n()[0].numberOfInstallments
                });
              }
            });
          }
        }), null), g(o, p(M, {
          get when() {
            return N(() => n().length === 1)() && n()[0].product === I.PAY_NOW_CHECKOUT;
          },
          get children() {
            return p(O, {
              testId: "checkout-label-pay-now",
              get children() {
                return E(e.locale, "checkout_widget_exp5_10:title_pay_now", {
                  textStyle: "underline decoration-solid underline-offset-[20%] decoration-[15%]"
                });
              }
            });
          }
        }), null), g(o, p(M, {
          get when() {
            return n().length > 1;
          },
          get children() {
            return [p(O, {
              testId: "checkout-label-multiple-products",
              get children() {
                return E(e.locale, "checkout_widget_exp5_10:title_multiple_products");
              }
            }), p(O, {
              testId: "checkout-label-choose-installments",
              get children() {
                return E(e.locale, Cn(n()) ? "checkout_widget_exp5_10:choose_installments_pay_in_x" : "checkout_widget_exp5_10:choose_installments", {
                  installmentList: i().join(", "),
                  maxInstallment: r()
                });
              }
            })];
          }
        }), null), g(s, (() => {
          var l = N(() => !!Re(n()));
          return () => l() && (() => {
            var c = Iu();
            return g(c, p(O, {
              testId: "checkout-accepted-methods",
              get children() {
                return E(e.locale, "checkout_widget_exp5_10:accepted_methods");
              }
            }), null), g(c, p(O, {
              testId: "checkout-card-list",
              get children() {
                return E(e.locale, "checkout_widget_exp5_10:card_list");
              }
            }), null), c;
          })();
        })(), null), U(() => z(s, `flex flex-col gap-1 p-2 font-medium font-scalapay-poppins text-${e.alignment} ${t ? "text-white" : "text-sp-exp5-light-gray-2"}`)), s;
      })(), p(M, {
        get when() {
          return !e.disableCheckoutTitleUpdate && e.amount;
        },
        get children() {
          return p(Wn, {
            get installmentAmount() {
              return a();
            },
            get merchantConfig() {
              return e.merchantConfig;
            },
            get products() {
              return n();
            },
            get locale() {
              return e.locale;
            },
            get checkoutTitleSelector() {
              return e.checkoutTitleSelector;
            }
          });
        }
      })];
    }
  });
};
var Su = /* @__PURE__ */ C("<style>"), Pu = /* @__PURE__ */ C("<div>");
const Eu = (e) => {
  const t = nn(), {
    emitImpressionTrackingEvent: n
  } = t, a = sr(e.locale), r = de({
    type: ce.PRODUCT,
    locale: j.IT,
    currencyPosition: a,
    currencyDisplay: "symbol",
    logoSize: 100,
    alignment: "left",
    hideInstallments: !1,
    darkMode: "never",
    hideLearnMore: !1
  }, e), i = N(() => qt(r.merchantConfig.products, r.amount));
  return Ye(() => {
    var s;
    (s = i()) != null && s.length || Z.warn("No available products could be shown.");
  }), at(() => {
    n({
      amountInCents: r.amount ?? void 0
    });
  }), [(() => {
    var s = Su();
    return g(s, lr), s;
  })(), p(Ko, {
    get locale() {
      return r.locale;
    },
    messages: {},
    defaultLocale: "it",
    get children() {
      var s = Pu();
      return g(s, p(hi, {
        fallback: (o) => (Z.log("Widget error:", o), []),
        get children() {
          return p(M, {
            get when() {
              return i().length > 0;
            },
            get children() {
              return p(Ot, {
                get children() {
                  return [p(qe, {
                    get when() {
                      return r.type === ce.PRODUCT;
                    },
                    get children() {
                      return p(Ot, {
                        get fallback() {
                          return p(Yc, r);
                        },
                        get children() {
                          return p(qe, {
                            get when() {
                              return r.merchantConfig.widget.variant === fe.EXP_5_10;
                            },
                            get children() {
                              return p(Cu, r);
                            }
                          });
                        }
                      });
                    }
                  }), p(qe, {
                    get when() {
                      return r.type === ce.CHECKOUT;
                    },
                    get children() {
                      return p(Ot, {
                        get fallback() {
                          return p(bl, r);
                        },
                        get children() {
                          return p(qe, {
                            get when() {
                              return r.merchantConfig.widget.variant === fe.EXP_5_10;
                            },
                            get children() {
                              return p(Au, r);
                            }
                          });
                        }
                      });
                    }
                  })];
                }
              });
            }
          });
        }
      })), U(() => z(s, `cursor-default leading-4 ${r.type !== ce.CHECKOUT ? "py-4" : ""} text-sm font-medium font-scalapay-poppins max-w-full antialiased`)), s;
    }
  })];
}, Ma = (e, t) => (e ?? []).map((n) => {
  const a = document.querySelector(n);
  if (!a)
    return Z.debug(`Element not found for amountSelector: ${n}`), null;
  const r = Ve(a.textContent, t);
  return Number.isNaN(Number(r)) ? (Z.debug(`Invalid amount from amountSelector: ${n}`), null) : r;
}).find((n) => n) ?? null, Oa = (e, t, n) => {
  let a = Ma(e, t);
  n(a);
  const r = new MutationObserver(() => {
    let i = Ma(e, t);
    n(i);
  });
  e.map((i) => document.querySelector(i)).filter((i) => i).forEach((i) => {
    r.observe(i, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      characterData: !0
    });
  });
}, ku = (e) => {
  const t = {
    locale: zn(e.locale)
  }, n = de({
    type: ce.PRODUCT,
    locale: j.IT,
    amountSelectors: [],
    amount: ""
  }, e, t), [a, r] = q(null), [i, s] = q(null);
  at(() => {
    Oa(n.amountSelectors, n.amountSeparator, r), new MutationObserver(() => Oa(n.amountSelectors, n.amountSeparator, r)).observe(document.body, {
      childList: !0,
      subtree: !0,
      attributes: !1,
      characterData: !1
    });
  }), Ye(() => {
    let l = a();
    l || (l = Ve(n.amount, n.amountSeparator)), s(l);
  });
  const o = N(() => {
    var d, m, _, h;
    const l = i();
    if (!l)
      return !0;
    const c = Ve(((d = n.minAmount) == null ? void 0 : d.toString()) || ((m = n.min) == null ? void 0 : m.toString()), n.amountSeparator), u = Ve(((_ = n.maxAmount) == null ? void 0 : _.toString()) || ((h = n.max) == null ? void 0 : h.toString()), n.amountSeparator);
    return c && l < c ? (Z.warn(`Amount is less than minAmount: ${l} < ${c}`), !1) : u && l > u ? (Z.warn(`Amount is greater than maxAmount: ${l} > ${u}`), !1) : !0;
  });
  return p(M, {
    get when() {
      return o();
    },
    get children() {
      return p(Eu, de(n, {
        get type() {
          var l;
          return ce[(l = n.type) == null ? void 0 : l.toUpperCase()] || ce.PRODUCT;
        },
        get amount() {
          return i();
        }
      }));
    }
  });
}, Nu = (e) => {
  const t = N(() => sr(e.locale)), n = N(() => Ve(e.amount, ".") ?? 0), a = N(() => {
    const s = n();
    return typeof s == "number" && !Number.isNaN(s) && s > 0 ? !0 : (Z.error("To show the widgetModal, the amount is required"), !1);
  }), r = () => e.merchantConfig.widget.variant === fe.EXP_5_10, i = "symbol";
  return p(M, {
    get when() {
      return a();
    },
    fallback: null,
    get children() {
      return p(Ot, {
        get children() {
          return [p(qe, {
            get when() {
              return r();
            },
            get children() {
              return p(jr, {
                get amount() {
                  return n();
                },
                currencyDisplay: i,
                get currencyPosition() {
                  return t();
                },
                get products() {
                  return e.merchantConfig.products;
                },
                get locale() {
                  return e.locale;
                },
                open: !0,
                get channel() {
                  return e.channel;
                },
                isStandalone: !0
              });
            }
          }), p(qe, {
            get when() {
              return !r();
            },
            get children() {
              return p(Gr, {
                get amount() {
                  return n();
                },
                currencyDisplay: i,
                get currencyPosition() {
                  return t();
                },
                get products() {
                  return e.merchantConfig.products;
                },
                get locale() {
                  return e.locale;
                },
                open: !0,
                get channel() {
                  return e.channel;
                },
                isStandalone: !0
              });
            }
          })];
        }
      });
    }
  });
};
function Ct(e, t) {
  if (e == null) return;
  const n = e.replace(t, "");
  return n.length ? n : void 0;
}
function gn(e) {
  const t = new URLSearchParams(window.location.search);
  return Ct(t.get(e), /[^a-zA-Z]/g);
}
function Tu(e) {
  const t = new URLSearchParams(window.location.search);
  return Ct(t.get(e), /[^0-9.]/g);
}
function Lu(e) {
  const n = new URLSearchParams(window.location.search).get(e);
  return n != null && n.startsWith("test-") ? Ct(n, /[^a-zA-Z0-9_-]/g) : Ct(n, /[^a-zA-Z0-9]/g);
}
function Hu(e) {
  const t = new URLSearchParams(window.location.search);
  return Ct(t.get(e), /[^a-zA-Z]/g) === "true";
}
function qr(e, t) {
  const n = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap", a = `https://cdn${Mn(t)}.scalapay.com/widget/v5/fonts/font.css`, r = document.createElement("link");
  r.rel = "stylesheet", r.id = "scalapay-poppins", r.href = Xa(t) && e ? a : n, document.head.appendChild(r);
}
Hn("scalapay-widget", {
  type: "product",
  locale: me,
  amount: "",
  amountSeparator: void 0,
  amountSelectors: [],
  logoSize: 100,
  merchantToken: void 0,
  currencyPosition: void 0,
  currencyDisplay: void 0,
  minAmount: void 0,
  maxAmount: void 0,
  environment: void 0,
  channel: void 0,
  checkoutTitleSelector: void 0,
  disableCheckoutTitleUpdate: !1,
  alignment: void 0,
  hideInstallments: void 0,
  darkMode: void 0,
  hideLearnMore: void 0,
  loadSelfHostedFont: void 0
}, (e) => (qr(e.loadSelfHostedFont, e.environment), p(Un, {
  get merchantToken() {
    return e.merchantToken ?? "";
  },
  get environment() {
    return e.environment;
  },
  children: (t) => p($r, {
    get type() {
      return e.type;
    },
    merchantConfig: t,
    get merchantToken() {
      return e.merchantToken ?? "";
    },
    get environment() {
      return e.environment;
    },
    get children() {
      return p(ku, de(e, {
        merchantConfig: t
      }));
    }
  })
})));
Hn("scalapay-update-checkout-title", {
  locale: me,
  merchantToken: void 0,
  environment: void 0,
  checkoutTitleSelector: void 0,
  installmentAmount: "",
  amount: void 0
}, (e) => p(Un, {
  get merchantToken() {
    return e.merchantToken;
  },
  get environment() {
    return e.environment;
  },
  children: (t) => p(Wn, de(e, {
    merchantConfig: t
  }))
}));
Hn("scalapay-widget-modal", {
  locale: void 0,
  merchantToken: void 0,
  environment: void 0,
  amount: void 0,
  channel: void 0,
  loadSelfHostedFont: void 0
}, (e) => {
  const t = {
    merchantToken: Lu("merchant-token"),
    environment: gn("environment"),
    amount: Tu("amount"),
    channel: gn("channel"),
    locale: zn(gn("locale")),
    loadSelfHostedFont: Hu("load-self-hosted-font")
  }, n = de(t, e);
  return Z.debug("scalapay-widget-modal", {
    queryProps: t,
    props: e,
    merged: n
  }), qr(n.loadSelfHostedFont, n.environment), p(Un, {
    get merchantToken() {
      return n.merchantToken;
    },
    get environment() {
      return n.environment;
    },
    children: (a) => p($r, {
      get type() {
        return ce.PRODUCT;
      },
      merchantConfig: a,
      get merchantToken() {
        return e.merchantToken ?? "";
      },
      get environment() {
        return e.environment;
      },
      get children() {
        return p(Nu, de(n, {
          merchantConfig: a
        }));
      }
    })
  });
});
