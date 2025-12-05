import '../chunks/DsnmJJEf.js';
import { i as ee } from '../chunks/1iG_nhpO.js';
import {
	G as Va,
	n as re,
	D as Ta,
	o as sa,
	A as te,
	p as ie,
	T as i,
	al as se,
	B as ne,
	H as le,
	C as Oa,
	F as Aa,
	z as ha,
	Z as oe,
	a1 as ve,
	w as Sa,
	J as ce,
	I as de,
	am as ue,
	an as _e,
	ao as Ba,
	a5 as Ya,
	i as fe,
	ap as pe,
	K as qa,
	L as he,
	aq as me,
	ar as ge,
	as as Ca,
	y as za,
	$ as be,
	at as ke,
	a4 as xe,
	au as ye,
	ac as we,
	ab as Ee,
	ae as E,
	ag as H,
	ah as w,
	ad as Te,
	ai as t,
	aj as r,
	ak as a,
	av as Ia,
	af as ma,
	aw as Ae
} from '../chunks/T-takki6.js';
import { s as k } from '../chunks/6tDHpIjM.js';
import { i as z } from '../chunks/BOmIoF0c.js';
import { s as J, c as K } from '../chunks/D9HRYXrv.js';
import { b as Ua } from '../chunks/NpN9Af7k.js';
function va(o, s) {
	return s;
}
function Ce(o, s, e) {
	for (var f = o.items, h = [], p = s.length, g = 0; g < p; g++) ke(s[g].e, h, !0);
	var C = p > 0 && h.length === 0 && e !== null;
	if (C) {
		var O = e.parentNode;
		(xe(O), O.append(e), f.clear(), W(o, s[0].prev, s[p - 1].next));
	}
	ye(h, () => {
		for (var I = 0; I < p; I++) {
			var N = s[I];
			(C || (f.delete(N.k), W(o, N.prev, N.next)), za(N.e, !C));
		}
	});
}
function ca(o, s, e, f, h, p = null) {
	var g = o,
		C = { flags: s, items: new Map(), first: null };
	{
		var O = o;
		g = sa ? Ta(te(O)) : O.appendChild(Va());
	}
	sa && ie();
	var I = null,
		N = !1,
		j = new Map(),
		c = se(() => {
			var _ = e();
			return fe(_) ? _ : _ == null ? [] : Ya(_);
		}),
		b,
		d;
	function u() {
		(Ie(d, b, C, j, g, h, s, f, e),
			p !== null &&
				(b.length === 0
					? I
						? qa(I)
						: (I = Sa(() => p(g)))
					: I !== null &&
						he(I, () => {
							I = null;
						})));
	}
	(re(() => {
		((d ??= we), (b = i(c)));
		var _ = b.length;
		if (N && _ === 0) return;
		N = _ === 0;
		let X = !1;
		if (sa) {
			var P = ne(g) === le;
			P !== (_ === 0) && ((g = Oa()), Ta(g), Aa(!1), (X = !0));
		}
		if (sa) {
			for (var m = null, L, x = 0; x < _; x++) {
				if (ha.nodeType === oe && ha.data === ve) {
					((g = ha), (X = !0), Aa(!1));
					break;
				}
				var V = b[x],
					G = f(V, x);
				((L = Ma(ha, C, m, null, V, G, x, h, s, e)), C.items.set(G, L), (m = L));
			}
			_ > 0 && Ta(Oa());
		}
		if (sa) _ === 0 && p && (I = Sa(() => p(g)));
		else if (ce()) {
			var aa = new Set(),
				D = de;
			for (x = 0; x < _; x += 1) {
				((V = b[x]), (G = f(V, x)));
				var da = C.items.get(G) ?? j.get(G);
				(da ? Ja(da, V, x) : ((L = Ma(null, C, null, null, V, G, x, h, s, e, !0)), j.set(G, L)),
					aa.add(G));
			}
			for (const [ea, ua] of C.items) aa.has(ea) || D.skipped_effects.add(ua.e);
			D.add_callback(u);
		} else u();
		(X && Aa(!0), i(c));
	}),
		sa && (g = ha));
}
function Ie(o, s, e, f, h, p, g, C, O) {
	var I = s.length,
		N = e.items,
		j = e.first,
		c = j,
		b,
		d = null,
		u = [],
		_ = [],
		X,
		P,
		m,
		L;
	for (L = 0; L < I; L += 1) {
		if (((X = s[L]), (P = C(X, L)), (m = N.get(P)), m === void 0)) {
			var x = f.get(P);
			if (x !== void 0) {
				(f.delete(P), N.set(P, x));
				var V = d ? d.next : c;
				(W(e, d, x), W(e, x, V), La(x, V, h), (d = x));
			} else {
				var G = c ? c.e.nodes_start : h;
				d = Ma(G, e, d, d === null ? e.first : d.next, X, P, L, p, g, O);
			}
			(N.set(P, d), (u = []), (_ = []), (c = d.next));
			continue;
		}
		if ((Ja(m, X, L), (m.e.f & Ca) !== 0 && qa(m.e), m !== c)) {
			if (b !== void 0 && b.has(m)) {
				if (u.length < _.length) {
					var aa = _[0],
						D;
					d = aa.prev;
					var da = u[0],
						ea = u[u.length - 1];
					for (D = 0; D < u.length; D += 1) La(u[D], aa, h);
					for (D = 0; D < _.length; D += 1) b.delete(_[D]);
					(W(e, da.prev, ea.next),
						W(e, d, da),
						W(e, ea, aa),
						(c = aa),
						(d = ea),
						(L -= 1),
						(u = []),
						(_ = []));
				} else
					(b.delete(m),
						La(m, c, h),
						W(e, m.prev, m.next),
						W(e, m, d === null ? e.first : d.next),
						W(e, d, m),
						(d = m));
				continue;
			}
			for (u = [], _ = []; c !== null && c.k !== P; )
				((c.e.f & Ca) === 0 && (b ??= new Set()).add(c), _.push(c), (c = c.next));
			if (c === null) continue;
			m = c;
		}
		(u.push(m), (d = m), (c = m.next));
	}
	if (c !== null || b !== void 0) {
		for (var ua = b === void 0 ? [] : Ya(b); c !== null; )
			((c.e.f & Ca) === 0 && ua.push(c), (c = c.next));
		var ga = ua.length;
		if (ga > 0) {
			var ya = I === 0 ? h : null;
			Ce(e, ua, ya);
		}
	}
	((o.first = e.first && e.first.e), (o.last = d && d.e));
	for (var _a of f.values()) za(_a.e);
	f.clear();
}
function Ja(o, s, e, f) {
	(ue(o.v, s), (o.i = e));
}
function Ma(o, s, e, f, h, p, g, C, O, I, N) {
	var j = (O & me) !== 0,
		c = (O & ge) === 0,
		b = j ? (c ? _e(h, !1, !1) : Ba(h)) : h,
		d = (O & pe) === 0 ? g : Ba(g),
		u = { i: d, v: b, k: p, a: null, e: null, prev: e, next: f };
	try {
		if (o === null) {
			var _ = document.createDocumentFragment();
			_.append((o = Va()));
		}
		return (
			(u.e = Sa(() => C(o, b, d, I), sa)),
			(u.e.prev = e && e.e),
			(u.e.next = f && f.e),
			e === null ? N || (s.first = u) : ((e.next = u), (e.e.next = u.e)),
			f !== null && ((f.prev = u), (f.e.prev = u.e)),
			u
		);
	} finally {
	}
}
function La(o, s, e) {
	for (
		var f = o.next ? o.next.e.nodes_start : e, h = s ? s.e.nodes_start : e, p = o.e.nodes_start;
		p !== null && p !== f;

	) {
		var g = be(p);
		(h.before(p), (p = g));
	}
}
function W(o, s, e) {
	(s === null ? (o.first = e) : ((s.next = e), (s.e.next = e && e.e)),
		e !== null && ((e.prev = s), (e.e.prev = s && s.e)));
}
function Le(o, s) {
	return o == null ? null : String(o);
}
function xa(o, s, e, f) {
	var h = o.__style;
	if (sa || h !== s) {
		var p = Le(s);
		((!sa || p !== o.getAttribute('style')) &&
			(p == null ? o.removeAttribute('style') : (o.style.cssText = p)),
			(o.__style = s));
	}
	return f;
}
var Se = E('<span class="tag"> </span>'),
	Me = E('<p class="muted item-meta"> </p>'),
	$e = E('<p class="muted item-text"> </p>'),
	Ne = E(
		'<article class="item-block"><header><div class="row-center"><img width="28" height="28" class="logo"/> <h3> </h3> <span class="muted"> </span></div> <p class="muted item-meta"> </p> <!></header> <div></div></article>'
	),
	De = E('<a class="link" rel="noopener noreferrer" target="_blank">Link</a>'),
	Re = E(
		'<article class="item-block"><header class="row-baseline"><h3> </h3> <!></header> <p class="muted item-text"> </p></article>'
	),
	He = E(
		'<div class="section-sep"></div> <section class="grid-2" aria-labelledby="projects-title"><h2 id="projects-title" class="section-title">Projects</h2> <div></div></section>',
		1
	),
	Pe = E('<p class="muted item-text"> </p>'),
	Ge = E(
		'<a class="link cred-link inline-block" rel="noopener noreferrer" target="_blank">Credential</a>'
	),
	Fe = E(
		'<article class="item-block"><div class="row-center"><img width="28" height="28" class="logo"/> <h3> </h3></div> <p class="muted"> </p> <p class="muted item-meta"> </p> <!> <!></article>'
	),
	Ke = E(
		'<div class="section-sep"></div> <section class="grid-2" aria-labelledby="education-title"><h2 id="education-title" class="section-title">Education</h2> <div></div></section>',
		1
	),
	Oe = E('<p class="muted item-meta"> </p>'),
	Be = E('<a class="link cred-link inline-block" rel="noopener noreferrer" target="_blank"> </a>'),
	Ue = E('<div class="mt-1 cred-buttons-container"></div>'),
	Ve = E(
		'<a class="link cred-link inline-block" rel="noopener noreferrer" target="_blank">Credentials</a>'
	),
	Ye = E(
		'<article class="item-block"><header><div class="row-center"><img width="28" height="28" class="logo"/> <h3> </h3> <!></div> <p class="muted"> </p> <!> <!></header></article>'
	),
	qe = E(
		'<div class="section-sep"></div> <section class="grid-2" aria-labelledby="licenses-title"><h2 id="licenses-title" class="section-title">Licenses & certifications</h2> <div></div></section>',
		1
	),
	ze = E('<article class="item-block"><h3> </h3> <p class="muted text-sm"> </p></article>'),
	Je = E(
		'<div class="section-sep"></div> <section class="grid-2" aria-labelledby="languages-title"><h2 id="languages-title" class="section-title">Languages</h2> <div></div></section>',
		1
	),
	Xe = E(
		'<main class="container"><section class="fade-in pt-12 pb-6"><div class="row-between"><div class="row-center-lg flex-auto-min-240"><img width="112" height="112" class="avatar"/> <div><h1 class="page-title"> </h1> <p class="muted mt-1"> </p></div></div> <nav class="row-center ml-auto gap-4"><a class="icon-link linkedin" href="https://www.linkedin.com/in/killian-ott/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><span class="svg-icon linkedin-mask" aria-hidden="true"></span></a> <a class="icon-link github" href="https://github.com/PR0G3T" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><span class="svg-icon" aria-hidden="true"></span></a> <a class="icon-link instagram" href="https://www.instagram.com/pr0g3t/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><span class="svg-icon" aria-hidden="true"></span></a> <a class="icon-link facebook" href="https://www.facebook.com/PR0G3T/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><span class="svg-icon" aria-hidden="true"></span></a></nav></div></section> <div class="section-sep"></div> <section class="grid-2" aria-labelledby="about-title"><h2 id="about-title" class="section-title">About</h2> <p class="prose text-sm leading-relaxed"> </p></section> <div class="section-sep"></div> <section class="grid-2" aria-labelledby="skills-title"><h2 id="skills-title" class="section-title">Skills</h2> <div></div></section> <div class="section-sep"></div> <section class="grid-2" aria-labelledby="experience-title"><h2 id="experience-title" class="section-title">Experience</h2> <div></div></section> <!> <!> <!> <!> <footer class="footer-space"><p class="muted text-xs"> </p></footer></main>'
	);
function tr(o, s) {
	Ee(s, !1);
	const e = (v) => {
			const n = v.replace(/^\//, '');
			return Ua ? `${Ua}/${n}` : `/${n}`;
		},
		f = { 'Körber Supply Chain Software': 'korber', 'Team Cardinalis': 'teamcardinalis' },
		h = { 'Körber Supply Chain Software': 'KÖRBER Supply Chain Software' },
		p = (v) => h[v] ?? v,
		g = (v) => {
			const n = f[v];
			return e(`images/companies/${n ?? 'default'}.png`);
		},
		C = (v) => {
			const n = v.currentTarget;
			n && (n.src = e('images/companies/default.png'));
		},
		O = {
			'University of Helsinki': 'university-of-helsinki',
			'MITx Courses': 'mitx_courses',
			'Lycée Polyvalent Louis Armand': 'default'
		},
		I = (v) => {
			const n = O[v];
			return e(`images/schools/${n ?? 'default'}.png`);
		},
		N = {
			'Google Cloud': 'google',
			'NVIDIA Deep Learning Institute': 'nvidia',
			'NASA - National Aeronautics and Space Administration': 'nasa',
			MITx: 'mitx'
		},
		j = (v) => {
			const n = N[v];
			return e(`images/companies/${n ?? 'default'}.png`);
		};
	ee();
	var c = Xe(),
		b = r(c),
		d = r(b),
		u = r(d),
		_ = r(u),
		X = t(_, 2),
		P = r(X),
		m = r(P, !0);
	a(P);
	var L = t(P, 2),
		x = r(L, !0);
	(a(L), a(X), a(u));
	var V = t(u, 2),
		G = r(V),
		aa = r(G);
	a(G);
	var D = t(G, 2),
		da = r(D);
	a(D);
	var ea = t(D, 2),
		ua = r(ea);
	a(ea);
	var ga = t(ea, 2),
		ya = r(ga);
	(a(ga), a(V), a(d), a(b));
	var _a = t(b, 4),
		$a = t(r(_a), 2),
		Xa = r($a, !0);
	(a($a), a(_a));
	var wa = t(_a, 4),
		Na = t(r(wa), 2);
	(ca(
		Na,
		5,
		() => K.skills,
		va,
		(v, n) => {
			var y = Se(),
				T = r(y, !0);
			(a(y), H(() => k(T, i(n))), w(v, y));
		}
	),
		a(Na),
		a(wa));
	var Ea = t(wa, 4),
		Da = t(r(Ea), 2);
	(ca(
		Da,
		5,
		() => K.experience,
		va,
		(v, n) => {
			var y = Ne(),
				T = r(y),
				B = r(T),
				l = r(B),
				A = t(l, 2),
				$ = r(A, !0);
			a(A);
			var S = t(A, 2),
				F = r(S);
			(a(S), a(B));
			var U = t(B, 2),
				ra = r(U, !0);
			a(U);
			var na = t(U, 2);
			{
				var ta = (R) => {
					var q = Me(),
						ia = r(q, !0);
					(a(q), H(() => k(ia, i(n).location)), w(R, q));
				};
				z(na, (R) => {
					i(n).location && R(ta);
				});
			}
			a(T);
			var Y = t(T, 2);
			(ca(
				Y,
				5,
				() => i(n).items,
				va,
				(R, q) => {
					var ia = $e(),
						fa = r(ia, !0);
					(a(ia), H(() => k(fa, i(q))), w(R, ia));
				}
			),
				a(Y),
				a(y),
				H(
					(R, q) => {
						(J(l, 'src', R),
							J(l, 'alt', i(n).company),
							k($, i(n).role),
							k(F, `@ ${q ?? ''}`),
							k(ra, i(n).period));
					},
					[() => g(i(n).company), () => p(i(n).company)]
				),
				Ia('error', l, C),
				w(v, y));
		}
	),
		a(Da),
		a(Ea));
	var Ra = t(Ea, 2);
	{
		var Za = (v) => {
			var n = He(),
				y = t(ma(n), 2),
				T = t(r(y), 2);
			(ca(
				T,
				5,
				() => K.projects,
				va,
				(B, l) => {
					var A = Re(),
						$ = r(A),
						S = r($),
						F = r(S, !0);
					a(S);
					var U = t(S, 2);
					{
						var ra = (Y) => {
							var R = De();
							(H(() => J(R, 'href', i(l).link)), w(Y, R));
						};
						z(U, (Y) => {
							i(l).link && Y(ra);
						});
					}
					a($);
					var na = t($, 2),
						ta = r(na, !0);
					(a(na),
						a(A),
						H(() => {
							(k(F, i(l).name), k(ta, i(l).description));
						}),
						w(B, A));
				}
			),
				a(T),
				a(y),
				w(v, n));
		};
		z(Ra, (v) => {
			K.projects?.length && v(Za);
		});
	}
	var Ha = t(Ra, 2);
	{
		var Qa = (v) => {
			var n = Ke(),
				y = t(ma(n), 2),
				T = t(r(y), 2);
			(ca(
				T,
				5,
				() => K.education,
				va,
				(B, l) => {
					var A = Fe(),
						$ = r(A),
						S = r($),
						F = t(S, 2),
						U = r(F, !0);
					(a(F), a($));
					var ra = t($, 2),
						na = r(ra, !0);
					a(ra);
					var ta = t(ra, 2),
						Y = r(ta, !0);
					a(ta);
					var R = t(ta, 2);
					{
						var q = (Z) => {
							var la = Pe(),
								M = r(la, !0);
							(a(la), H(() => k(M, i(l).details)), w(Z, la));
						};
						z(R, (Z) => {
							i(l).details && Z(q);
						});
					}
					var ia = t(R, 2);
					{
						var fa = (Z) => {
							var la = Ge();
							(H(() => J(la, 'href', i(l).credential)), w(Z, la));
						};
						z(ia, (Z) => {
							i(l).credential && Z(fa);
						});
					}
					(a(A),
						H(
							(Z) => {
								(J(S, 'src', Z),
									J(S, 'alt', i(l).school),
									k(U, i(l).degree),
									k(na, i(l).school),
									k(Y, i(l).period));
							},
							[() => I(i(l).school)]
						),
						Ia('error', S, C),
						w(B, A));
				}
			),
				a(T),
				a(y),
				w(v, n));
		};
		z(Ha, (v) => {
			K.education?.length && v(Qa);
		});
	}
	var Pa = t(Ha, 2);
	{
		var Wa = (v) => {
			var n = qe(),
				y = t(ma(n), 2),
				T = t(r(y), 2);
			(ca(
				T,
				5,
				() => K.certifications,
				va,
				(B, l) => {
					var A = Ye(),
						$ = r(A),
						S = r($),
						F = r(S),
						U = t(F, 2),
						ra = r(U, !0);
					a(U);
					var na = t(U, 2);
					{
						var ta = (M) => {};
						z(na, (M) => {
							i(l).link && M(ta);
						});
					}
					a(S);
					var Y = t(S, 2),
						R = r(Y, !0);
					a(Y);
					var q = t(Y, 2);
					{
						var ia = (M) => {
							var Q = Oe(),
								pa = r(Q, !0);
							(a(Q), H(() => k(pa, i(l).year)), w(M, Q));
						};
						z(q, (M) => {
							i(l).year && M(ia);
						});
					}
					var fa = t(q, 2);
					{
						var Z = (M) => {
								var Q = Ue();
								(ca(
									Q,
									5,
									() => i(l).subCertifications,
									va,
									(pa, ba) => {
										var oa = Be(),
											ka = r(oa, !0);
										(a(oa),
											H(() => {
												(J(oa, 'href', i(ba).link), k(ka, i(ba).name));
											}),
											w(pa, oa));
									}
								),
									a(Q),
									w(M, Q));
							},
							la = (M) => {
								var Q = Ae(),
									pa = ma(Q);
								{
									var ba = (oa) => {
										var ka = Ve();
										(H(() => J(ka, 'href', i(l).link)), w(oa, ka));
									};
									z(
										pa,
										(oa) => {
											i(l).link && oa(ba);
										},
										!0
									);
								}
								w(M, Q);
							};
						z(fa, (M) => {
							i(l).subCertifications ? M(Z) : M(la, !1);
						});
					}
					(a($),
						a(A),
						H(
							(M) => {
								(J(F, 'src', M), J(F, 'alt', i(l).issuer), k(ra, i(l).name), k(R, i(l).issuer));
							},
							[() => j(i(l).issuer)]
						),
						Ia('error', F, C),
						w(B, A));
				}
			),
				a(T),
				a(y),
				w(v, n));
		};
		z(Pa, (v) => {
			K.certifications?.length && v(Wa);
		});
	}
	var Ga = t(Pa, 2);
	{
		var ja = (v) => {
			var n = Je(),
				y = t(ma(n), 2),
				T = t(r(y), 2);
			(ca(
				T,
				5,
				() => K.languages,
				va,
				(B, l) => {
					var A = ze(),
						$ = r(A),
						S = r($, !0);
					a($);
					var F = t($, 2),
						U = r(F, !0);
					(a(F),
						a(A),
						H(() => {
							(k(S, i(l).language), k(U, i(l).proficiency));
						}),
						w(B, A));
				}
			),
				a(T),
				a(y),
				w(v, n));
		};
		z(Ga, (v) => {
			K.languages?.length && v(ja);
		});
	}
	var Fa = t(Ga, 2),
		Ka = r(Fa),
		ae = r(Ka);
	(a(Ka),
		a(Fa),
		a(c),
		H(
			(v, n, y, T, B, l) => {
				(J(_, 'src', v),
					J(_, 'alt', K.name),
					k(m, K.name),
					k(x, K.title),
					xa(aa, n),
					xa(da, y),
					xa(ua, T),
					xa(ya, B),
					k(Xa, K.summary),
					k(ae, `Last updated ${l ?? ''}`));
			},
			[
				() => e('images/profile.png'),
				() => `--mask-url: url('${e('icons/linkedin.svg')}')`,
				() => `--mask-url: url('${e('icons/github.svg')}')`,
				() => `--mask-url: url('${e('icons/instagram.svg')}')`,
				() => `--mask-url: url('${e('icons/facebook.svg')}')`,
				() => new Date().getFullYear()
			]
		),
		w(o, c),
		Te());
}
export { tr as component };
