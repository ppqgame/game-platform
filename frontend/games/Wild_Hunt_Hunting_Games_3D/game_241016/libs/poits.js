window.PoitTools = function() {
    "use strict";
    "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
    var t, i = (function(t, i) {
        t.exports = function() {
            function t(t, i, n) {
                var h = t[i];
                t[i] = t[n], t[n] = h;
            }
            function i(t, i) {
                return t < i ? -1 : t > i ? 1 : 0;
            }
            return function(n, h, r, e, a) {
                !function i(n, h, r, e, a) {
                    for (;e > r; ) {
                        if (e - r > 600) {
                            var o = e - r + 1, s = h - r + 1, l = Math.log(o), u = .5 * Math.exp(2 * l / 3), c = .5 * Math.sqrt(l * u * (o - u) / o) * (s - o / 2 < 0 ? -1 : 1);
                            i(n, h, Math.max(r, Math.floor(h - s * u / o + c)), Math.min(e, Math.floor(h + (o - s) * u / o + c)), a);
                        }
                        var f = n[h], m = r, d = e;
                        for (t(n, r, h), a(n[e], f) > 0 && t(n, r, e); m < d; ) {
                            for (t(n, m, d), m++, d--; a(n[m], f) < 0; ) m++;
                            for (;a(n[d], f) > 0; ) d--;
                        }
                        0 === a(n[r], f) ? t(n, r, d) : t(n, ++d, e), d <= h && (r = d + 1), h <= d && (e = d - 1);
                    }
                }(n, h, r || 0, e || n.length - 1, a || i);
            };
        }();
    }(t = {
        exports: {}
    }), t.exports), n = r, h = r;
    function r(t, i) {
        if (!(this instanceof r)) return new r(t, i);
        this._maxEntries = Math.max(4, t || 9), this._minEntries = Math.max(2, Math.ceil(.4 * this._maxEntries)), 
        i && this._initFormat(i), this.clear();
    }
    function e(t, i, n) {
        if (!n) return i.indexOf(t);
        for (var h = 0; h < i.length; h++) if (n(t, i[h])) return h;
        return -1;
    }
    function a(t, i) {
        o(t, 0, t.children.length, i, t);
    }
    function o(t, i, n, h, r) {
        r || (r = x(null)), r.minX = 1 / 0, r.minY = 1 / 0, r.maxX = -1 / 0, r.maxY = -1 / 0;
        for (var e, a = i; a < n; a++) e = t.children[a], s(r, t.leaf ? h(e) : e);
        return r;
    }
    function s(t, i) {
        return t.minX = Math.min(t.minX, i.minX), t.minY = Math.min(t.minY, i.minY), t.maxX = Math.max(t.maxX, i.maxX), 
        t.maxY = Math.max(t.maxY, i.maxY), t;
    }
    function l(t, i) {
        return t.minX - i.minX;
    }
    function u(t, i) {
        return t.minY - i.minY;
    }
    function c(t) {
        return (t.maxX - t.minX) * (t.maxY - t.minY);
    }
    function f(t) {
        return t.maxX - t.minX + (t.maxY - t.minY);
    }
    function m(t, i) {
        return t.minX <= i.minX && t.minY <= i.minY && i.maxX <= t.maxX && i.maxY <= t.maxY;
    }
    function d(t, i) {
        return i.minX <= t.maxX && i.minY <= t.maxY && i.maxX >= t.minX && i.maxY >= t.minY;
    }
    function x(t) {
        return {
            children: t,
            height: 1,
            leaf: !0,
            minX: 1 / 0,
            minY: 1 / 0,
            maxX: -1 / 0,
            maxY: -1 / 0
        };
    }
    function p(t, n, h, r, e) {
        for (var a, o = [ n, h ]; o.length; ) (h = o.pop()) - (n = o.pop()) <= r || (a = n + Math.ceil((h - n) / r / 2) * r, 
        i(t, a, n, h, e), o.push(n, a, a, h));
    }
    function M(t, i, n) {
        const h = i.search({
            minX: t[0] - n,
            minY: t[1] - n,
            maxX: t[0] + n,
            maxY: t[1] + n
        });
        if (0 == h.length) return 1 / 0;
        const r = h.reduce((i, n) => Math.min(i, function(t, i) {
            return Math.pow(t[0] - i[0], 2) + Math.pow(t[1] - i[1], 2);
        }(t, n)), 1 / 0);
        return Math.sqrt(r);
    }
    return r.prototype = {
        all: function() {
            return this._all(this.data, []);
        },
        search: function(t) {
            var i = this.data, n = [], h = this.toBBox;
            if (!d(t, i)) return n;
            for (var r, e, a, o, s = []; i; ) {
                for (r = 0, e = i.children.length; r < e; r++) a = i.children[r], d(t, o = i.leaf ? h(a) : a) && (i.leaf ? n.push(a) : m(t, o) ? this._all(a, n) : s.push(a));
                i = s.pop();
            }
            return n;
        },
        collides: function(t) {
            var i = this.data, n = this.toBBox;
            if (!d(t, i)) return !1;
            for (var h, r, e, a, o = []; i; ) {
                for (h = 0, r = i.children.length; h < r; h++) if (e = i.children[h], d(t, a = i.leaf ? n(e) : e)) {
                    if (i.leaf || m(t, a)) return !0;
                    o.push(e);
                }
                i = o.pop();
            }
            return !1;
        },
        load: function(t) {
            if (!t || !t.length) return this;
            if (t.length < this._minEntries) {
                for (var i = 0, n = t.length; i < n; i++) this.insert(t[i]);
                return this;
            }
            var h = this._build(t.slice(), 0, t.length - 1, 0);
            if (this.data.children.length) if (this.data.height === h.height) this._splitRoot(this.data, h); else {
                if (this.data.height < h.height) {
                    var r = this.data;
                    this.data = h, h = r;
                }
                this._insert(h, this.data.height - h.height - 1, !0);
            } else this.data = h;
            return this;
        },
        insert: function(t) {
            return t && this._insert(t, this.data.height - 1), this;
        },
        clear: function() {
            return this.data = x([]), this;
        },
        remove: function(t, i) {
            if (!t) return this;
            for (var n, h, r, a, o = this.data, s = this.toBBox(t), l = [], u = []; o || l.length; ) {
                if (o || (o = l.pop(), h = l[l.length - 1], n = u.pop(), a = !0), o.leaf && -1 !== (r = e(t, o.children, i))) return o.children.splice(r, 1), 
                l.push(o), this._condense(l), this;
                a || o.leaf || !m(o, s) ? h ? (n++, o = h.children[n], a = !1) : o = null : (l.push(o), 
                u.push(n), n = 0, h = o, o = o.children[0]);
            }
            return this;
        },
        toBBox: function(t) {
            return t;
        },
        compareMinX: l,
        compareMinY: u,
        toJSON: function() {
            return this.data;
        },
        fromJSON: function(t) {
            return this.data = t, this;
        },
        _all: function(t, i) {
            for (var n = []; t; ) t.leaf ? i.push.apply(i, t.children) : n.push.apply(n, t.children), 
            t = n.pop();
            return i;
        },
        _build: function(t, i, n, h) {
            var r, e = n - i + 1, o = this._maxEntries;
            if (e <= o) return a(r = x(t.slice(i, n + 1)), this.toBBox), r;
            h || (h = Math.ceil(Math.log(e) / Math.log(o)), o = Math.ceil(e / Math.pow(o, h - 1))), 
            (r = x([])).leaf = !1, r.height = h;
            var s, l, u, c, f = Math.ceil(e / o), m = f * Math.ceil(Math.sqrt(o));
            for (p(t, i, n, m, this.compareMinX), s = i; s <= n; s += m) for (p(t, s, u = Math.min(s + m - 1, n), f, this.compareMinY), 
            l = s; l <= u; l += f) c = Math.min(l + f - 1, u), r.children.push(this._build(t, l, c, h - 1));
            return a(r, this.toBBox), r;
        },
        _chooseSubtree: function(t, i, n, h) {
            for (var r, e, a, o, s, l, u, f, m, d; h.push(i), !i.leaf && h.length - 1 !== n; ) {
                for (u = f = 1 / 0, r = 0, e = i.children.length; r < e; r++) s = c(a = i.children[r]), 
                m = t, d = a, (l = (Math.max(d.maxX, m.maxX) - Math.min(d.minX, m.minX)) * (Math.max(d.maxY, m.maxY) - Math.min(d.minY, m.minY)) - s) < f ? (f = l, 
                u = s < u ? s : u, o = a) : l === f && s < u && (u = s, o = a);
                i = o || i.children[0];
            }
            return i;
        },
        _insert: function(t, i, n) {
            var h = this.toBBox, r = n ? t : h(t), e = [], a = this._chooseSubtree(r, this.data, i, e);
            for (a.children.push(t), s(a, r); i >= 0 && e[i].children.length > this._maxEntries; ) this._split(e, i), 
            i--;
            this._adjustParentBBoxes(r, e, i);
        },
        _split: function(t, i) {
            var n = t[i], h = n.children.length, r = this._minEntries;
            this._chooseSplitAxis(n, r, h);
            var e = this._chooseSplitIndex(n, r, h), o = x(n.children.splice(e, n.children.length - e));
            o.height = n.height, o.leaf = n.leaf, a(n, this.toBBox), a(o, this.toBBox), i ? t[i - 1].children.push(o) : this._splitRoot(n, o);
        },
        _splitRoot: function(t, i) {
            this.data = x([ t, i ]), this.data.height = t.height + 1, this.data.leaf = !1, a(this.data, this.toBBox);
        },
        _chooseSplitIndex: function(t, i, n) {
            var h, r, e, a, s, l, u, f, m, d, x, p, M, g;
            for (l = u = 1 / 0, h = i; h <= n - i; h++) m = r = o(t, 0, h, this.toBBox), d = e = o(t, h, n, this.toBBox), 
            x = Math.max(m.minX, d.minX), p = Math.max(m.minY, d.minY), M = Math.min(m.maxX, d.maxX), 
            g = Math.min(m.maxY, d.maxY), a = Math.max(0, M - x) * Math.max(0, g - p), s = c(r) + c(e), 
            a < l ? (l = a, f = h, u = s < u ? s : u) : a === l && s < u && (u = s, f = h);
            return f;
        },
        _chooseSplitAxis: function(t, i, n) {
            var h = t.leaf ? this.compareMinX : l, r = t.leaf ? this.compareMinY : u;
            this._allDistMargin(t, i, n, h) < this._allDistMargin(t, i, n, r) && t.children.sort(h);
        },
        _allDistMargin: function(t, i, n, h) {
            t.children.sort(h);
            var r, e, a = this.toBBox, l = o(t, 0, i, a), u = o(t, n - i, n, a), c = f(l) + f(u);
            for (r = i; r < n - i; r++) e = t.children[r], s(l, t.leaf ? a(e) : e), c += f(l);
            for (r = n - i - 1; r >= i; r--) e = t.children[r], s(u, t.leaf ? a(e) : e), c += f(u);
            return c;
        },
        _adjustParentBBoxes: function(t, i, n) {
            for (var h = n; h >= 0; h--) s(i[h], t);
        },
        _condense: function(t) {
            for (var i, n = t.length - 1; n >= 0; n--) 0 === t[n].children.length ? n > 0 ? (i = t[n - 1].children).splice(i.indexOf(t[n]), 1) : this.clear() : a(t[n], this.toBBox);
        },
        _initFormat: function(t) {
            this.compareMinX = function(t, i) {
                return t[0] - i[0];
            }, this.compareMinY = function(t, i) {
                return t[1] - i[1];
            }, this.toBBox = (t => ({
                minX: t[0],
                minY: t[1],
                maxX: t[0],
                maxY: t[1]
            }));
        }
    }, n.default = h, function(t, i, h = Math.random, r = .1) {
        const e = i instanceof Function ? i : () => i, [a, o] = t, s = r / Math.SQRT2, l = n(9, [ "[0]", "[1]", "[0]", "[1]" ]);
        let u, c = [], f = [];
        function m(t) {
            return [ Math.ceil(t[0] / s) * s, Math.ceil(t[1] / s) * s ];
        }
        const d = m([ h() * a, h() * o ]);
        for (l.insert(d), c.push(d), f.push(d); f.length; ) {
            const i = f.splice(Math.floor(h() * f.length), 1)[0], n = e(i);
            for (u = 0; u < 30; ) {
                const r = u / 30, e = n + Math.sqrt(h()) * n * r, a = 2 * Math.PI * h(), o = m([ i[0] + e * Math.cos(a), i[1] + e * Math.sin(a) ]), s = M(o, l, n);
                x = t, (p = o)[0] > 0 && p[0] < x[0] && p[1] > 0 && p[1] < x[1] && s < 2 * n && s > n && (l.insert(o), 
                c.push(o), f.push(o)), u++;
            }
        }
        var x, p;
        return c;
    };
}();