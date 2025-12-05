import {
	Y as p,
	A as S,
	Z as N,
	_ as b,
	$ as I,
	a0 as g,
	F as c,
	D as R,
	p as L,
	z as _,
	a1 as M,
	a2 as V,
	a3 as Y,
	a4 as C,
	a5 as H,
	a6 as $,
	a7 as A,
	a8 as x,
	a9 as h,
	G as F,
	w as P,
	o as m,
	aa as W,
	ab as j,
	c as k,
	r as z,
	ac as G,
	ad as Z
} from './T-takki6.js';
const q = ['touchstart', 'touchmove'];
function B(t) {
	return q.includes(t);
}
function Q(t, e) {
	var a = e == null ? '' : typeof e == 'object' ? e + '' : e;
	a !== (t.__t ??= t.nodeValue) && ((t.__t = a), (t.nodeValue = a + ''));
}
function J(t, e) {
	return D(t, e);
}
function U(t, e) {
	(p(), (e.intro = e.intro ?? !1));
	const a = e.target,
		l = m,
		u = _;
	try {
		for (var r = S(a); r && (r.nodeType !== N || r.data !== b); ) r = I(r);
		if (!r) throw g;
		(c(!0), R(r), L());
		const o = D(t, { ...e, anchor: r });
		if (_ === null || _.nodeType !== N || _.data !== M) throw (V(), g);
		return (c(!1), o);
	} catch (o) {
		if (
			o instanceof Error &&
			o.message
				.split(
					`
`
				)
				.some((f) => f.startsWith('https://svelte.dev/e/'))
		)
			throw o;
		return (
			o !== g && console.warn('Failed to hydrate: ', o),
			e.recover === !1 && Y(),
			p(),
			C(a),
			c(!1),
			J(t, e)
		);
	} finally {
		(c(l), R(u), W());
	}
}
const i = new Map();
function D(t, { target: e, anchor: a, props: l = {}, events: u, context: r, intro: o = !0 }) {
	p();
	var f = new Set(),
		v = (d) => {
			for (var s = 0; s < d.length; s++) {
				var n = d[s];
				if (!f.has(n)) {
					f.add(n);
					var w = B(n);
					e.addEventListener(n, h, { passive: w });
					var T = i.get(n);
					T === void 0
						? (document.addEventListener(n, h, { passive: w }), i.set(n, 1))
						: i.set(n, T + 1);
				}
			}
		};
	(v(H($)), A.add(v));
	var y = void 0,
		O = x(() => {
			var d = a ?? e.appendChild(F());
			return (
				P(() => {
					if (r) {
						j({});
						var s = k;
						s.c = r;
					}
					(u && (l.$$events = u),
						m && z(d, null),
						(y = t(d, l) || {}),
						m && (G.nodes_end = _),
						r && Z());
				}),
				() => {
					for (var s of f) {
						e.removeEventListener(s, h);
						var n = i.get(s);
						--n === 0 ? (document.removeEventListener(s, h), i.delete(s)) : i.set(s, n);
					}
					(A.delete(v), d !== a && d.parentNode?.removeChild(d));
				}
			);
		});
	return (E.set(y, O), y);
}
let E = new WeakMap();
function X(t, e) {
	const a = E.get(t);
	return a ? (E.delete(t), a(e)) : Promise.resolve();
}
export { U as h, J as m, Q as s, X as u };
