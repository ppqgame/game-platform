
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var TDinit = function TDinit() {

    "use strict";

    if (!window.localStorage) {
        window.localStorage = Laya.LocalStorage;
    }

    if (!window.sessionStorage) {
        window.sessionStorage = Laya.LocalStorage;
    }

    var gameChannel = window.GameParameter["gameName"].val;

    var appid = "55049B363EFA47549BDA4EE35B7FBC5D";

    var TDRequestUrl = 'https://h5.udrig.com/app/v1';

    var _ = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        c = function (c) {
        var d,
            u,
            a = 0,
            s = c.document,
            l = /^(?:text|application)\/javascript/i,
            p = /^(?:text|application)\/xml/i,
            f = "application/json",
            g = "text/html",
            m = /^\s*$/,
            v = function e(t) {
            var o = A({}, t || {});
            for (d in e.settings) {
                void 0 === o[d] && (o[d] = e.settings[d]);
            }(n = o).global && 0 == v.active++ && S(n), o.crossDomain || (o.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(o.url) && RegExp.$2 != c.location.host);
            var r = o.dataType,
                t = /=\?/.test(o.url);
            if ("jsonp" == r || t) return t || (o.url = P(o.url, "callback=?")), e.JSONP(o);
            o.url || (o.url = c.location.toString()), D(o);
            var i,
                n = o.accepts[r],
                t = {},
                a = /^([\w-]+:)\/\//.test(o.url) ? RegExp.$1 : c.location.protocol,
                s = e.settings.xhr();
            o.crossDomain || (t["X-Requested-With"] = "XMLHttpRequest"), n && (-1 < (t.Accept = n).indexOf(",") && (n = n.split(",", 2)[0]), s.overrideMimeType && s.overrideMimeType(n)), (o.contentType || o.data && "GET" != o.type.toUpperCase()) && (t["Content-Type"] = o.contentType || "application/x-www-form-urlencoded"), o.headers = A(t, o.headers || {}), s.onreadystatechange = function () {
                if (4 == s.readyState) {
                    clearTimeout(i);
                    var e,
                        t = !1;
                    if (200 <= s.status && s.status < 300 || 304 == s.status || 0 == s.status && "file:" == a) {
                        r = r || (n = s.getResponseHeader("content-type")) && (n == g ? "html" : n == f ? "json" : l.test(n) ? "script" : p.test(n) && "xml") || "text", e = s.responseText;
                        try {
                            "script" == r ? (0, eval)(e) : "xml" == r ? e = s.responseXML : "json" == r && (e = m.test(e) ? null : JSON.parse(e));
                        } catch (e) {
                            t = e;
                        }
                        t ? y(t, "parsererror", s, o) : T(e, s, o);
                    } else y(null, "error", s, o);
                }
                var n;
            };
            t = !("async" in o) || o.async;
            for (u in s.open(o.type, o.url, t), o.headers) {
                s.setRequestHeader(u, o.headers[u]);
            }return !1 === function (e, t) {
                var n = t.context;
                if (!1 === t.beforeSend.call(n, e, t) || !1 === S(t)) return !1;
                S(t);
            }(s, o) ? (s.abort(), !1) : (0 < o.timeout && (i = setTimeout(function () {
                s.onreadystatechange = w, s.abort(), y(null, "timeout", s, o);
            }, o.timeout)), s.send(o.data || null), s);
        };

        function S(e) {
            if (e.global) return !0;
        }

        function T(e, t, n) {
            var o = n.context,
                r = "success";
            n.success.call(o, e, r, t), S(n), h(r, t, n);
        }

        function y(e, t, n, o) {
            var r = o.context;
            o.error.call(r, n, t, e), S(o), h(t, n, o);
        }

        function h(e, t, n) {
            var o = n.context;
            n.complete.call(o, t, e), S(n), (n = n).global && ! --v.active && S(n);
        }

        function w() {}

        function P(e, t) {
            return (e + "&" + t).replace(/[&?]{1,2}/, "?");
        }

        function D(e) {
            var t, n, o;
            "object" === _(e.data) && (e.data = (t = e.data, (o = []).add = function (e, t) {
                this.push(r(e) + "=" + r(t));
            }, function e(t, n, o, r) {
                var i = "array" == typeof n;
                for (var a in n) {
                    var s = n[a];
                    r && (a = o ? r : r + "[" + (i ? "" : a) + "]"), !r && i ? t.add(s.name, s.value) : (o ? "array" == typeof s : "object" === (void 0 === s ? "undefined" : _(s))) ? e(t, s, o, a) : t.add(a, s);
                }
            }(o, t, n), o.join("&").replace("%20", "+"))), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = P(e.url, e.data));
        }
        v.active = 0, v.JSONP = function (t) {
            if (!("type" in t)) return v(t);
            var n,
                o = "jsonp" + ++a,
                e = s.createElement("script"),
                r = {
                abort: function abort() {
                    o in c && (c[o] = w), h("abort", r, t);
                }
            },
                i = s.getElementsByTagName("head")[0] || s.documentElement;
            return t.error && (e.onerror = function () {
                r.abort(), t.error();
            }), c[o] = function (e) {
                clearTimeout(n), delete c[o], T(e, r, t);
            }, D(t), e.src = t.url.replace(/=\?/, "=" + o), i.insertBefore(e, i.firstChild), 0 < t.timeout && (n = setTimeout(function () {
                r.abort(), h("timeout", r, t);
            }, t.timeout)), r;
        }, v.settings = {
            type: "GET",
            beforeSend: w,
            success: w,
            error: w,
            complete: w,
            context: null,
            global: !0,
            xhr: function xhr() {
                return new c.XMLHttpRequest();
            },
            accepts: {
                script: "text/javascript, application/javascript",
                json: f,
                xml: "application/xml, text/xml",
                html: g,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0
        }, v.get = function (e, t) {
            return v({
                url: e,
                success: t
            });
        }, v.post = function (e, t, n, o) {
            return "function" == typeof t && (o = o || n, n = t, t = null), v({
                type: "POST",
                url: e,
                data: t,
                success: n,
                dataType: o
            });
        }, v.getJSON = function (e, t) {
            return v({
                url: e,
                success: t,
                dataType: "json"
            });
        };
        var r = encodeURIComponent;

        function A(t) {
            return Array.prototype.slice.call(arguments, 1).forEach(function (e) {
                for (d in e) {
                    void 0 !== e[d] && (t[d] = e[d]);
                }
            }), t;
        }
        return {
            ajax: v
        };
    }(window),
        u = {
        deviceId: "",
        appkey: appid || "",
        appProfile: {
            versionName: "",
            versionCode: "",
            initTime: "",
            sdkVersion: "H5+APP+v1.0.6",
            partner: ""
        },
        deviceProfile: {
            pixel: "",
            language: navigator.language,
            timezone: new Date().getTimezoneOffset() / 60 * -1
        },
        msgs: []
    },
        r = {
        type: 2,
        data: {
            id: "",
            start: 0,
            duration: 0
        }
    },
        l = {
        autoTrack: !0
    };
    !function () {
        for (var e = document.getElementsByTagName("script"), t = 0; t < e.length; t++) {
            var n = e[t].getAttribute("td-autoTrack");
            if ("false" === n || !1 === n) {
                l.autoTrack = !1;
                break;
            }
        }
    }();
    var p = new Date().getTime(),
        e = function e(_e, t, n) {
        _e.addEventListener ? _e.addEventListener(t, n, !1) : _e.attachEvent ? _e.attachEvent("on" + t, n) : _e["on" + t] = n;
    };

    function t(e, t, n) {
        if (void 0 === t) {
            var o = null;
            if (document.cookie && "" != document.cookie) for (var r = document.cookie.split(";"), i = 0; i < r.length; i++) {
                var a = r[i];
                if (a.substring(0, e.length + 1) == e + "=") {
                    o = decodeURIComponent(a.substring(e.length + 1));
                    break;
                }
            }
            return o;
        }
        n = n || {}, null === t && (t = "", n.expires = -1);
        var s = "";
        n.expires && ("number" == typeof n.expires || n.expires.toUTCString) && ("number" == typeof n.expires ? (d = new Date()).setTime(d.getTime() + 24 * n.expires * 60 * 60 * 1e3) : d = n.expires, s = "; expires=" + d.toUTCString());
        var c = n.path ? "; path=" + n.path : "",
            d = n.domain ? "; domain=" + n.domain : "",
            n = n.secure ? "; secure" : "";
        document.cookie = [e, "=", encodeURIComponent(t), s, c, d, n].join("");
    }
    l.localStorage = {
        add: function add(e, t) {
            this.addLocalStorage(e, t), "sessionId" != e && this.addCookie(e, t);
        },
        get: function get(e) {
            var t = this.getLocalStorage(e);
            return t || this._getCookie(e);
        },
        create: function create() {
            t("__TD_LOCAL") || (this._addCookie(""), window.localStorage);
        },
        addCookie: function addCookie(e, t) {
            if (!window.localStorage) {
                this.create();
                var n = this.cookieList();
                n[e] = t;
                var o,
                    r = [];
                for (o in n) {
                    r.push(o + "=" + n[o]);
                }this._addCookie(r.join(";"));
            }
        },
        _setCookie: function _setCookie() {
            this.cookieList();
            t("__TD_LOCAL", "", {
                expires: 1095,
                path: "/",
                domain: location.hostname
            });
        },
        _addCookie: function _addCookie(e) {
            t("__TD_LOCAL", e, {
                expires: 1095,
                path: "/",
                domain: location.hostname
            });
        },
        _getCookie: function _getCookie(e) {
            var t = this.cookieList();
            if (t && t[e]) return t[e];
        },
        delCookie: function delCookie(e) {},
        cookieList: function cookieList() {
            var e = t("__TD_LOCAL");
            return this.format(e);
        },
        addLocalStorage: function addLocalStorage(e, t) {
            window.localStorage && ("sessionId" == e && window.sessionStorage ? sessionStorage.setItem("__TD_" + e, t) : localStorage["__TD_" + e] = t);
        },
        delLocalStorage: function delLocalStorage(e) {
            window.localStorage && localStorage.removeItem("__TD_" + e);
        },
        getLocalStorage: function getLocalStorage(e) {
            if (window.localStorage) return "sessionId" == e && window.sessionStorage ? sessionStorage.getItem("__TD_" + e) : localStorage["__TD_" + e];
        },
        format: function format(e) {
            var t = {};
            if (!e) return t;
            for (var n = e.split(";"), o = n.length, r = 0; r < o; r++) {
                var i = n[r].split("=");
                2 == i.length && (t[i[0]] = i[1]);
            }
            return t;
        }
    }, l.sessionStorage = {
        add: function add(e, t) {
            window.sessionStorage && sessionStorage.setItem("__TD_" + e, t);
        },
        get: function get(e) {
            return sessionStorage.getItem("__TD_" + e);
        },
        remove: function remove(e) {
            sessionStorage.removeItem("__TD_" + e);
        }
    };
    var d,
        i,
        a,
        f,
        n,
        g = !0,
        m = !1;

    function v() {
        this.url = TDRequestUrl, this.opts = {}, this.requestArray = new Array();
    }
    v.prototype = {
        getAjax: function getAjax(o, r, i, a, s) {
            (function (e) {
                var t, n;
                0 < navigator.userAgent.indexOf("MSIE 9.0") ? "MSIE6.0" == (t = navigator.appVersion.split(";")[1].replace(/[ ]/g, "")) || "MSIE7.0" == t ? alert("no support IE6,IE7") : window.XDomainRequest && ((n = new XDomainRequest()) ? (e.error && "function" == typeof e.error && (n.onerror = function () {
                    e.error();
                }), e.timeout && "function" == typeof e.timeout && (n.ontimeout = function () {
                    e.timeout();
                }), e.success && "function" == typeof e.success && (n.onload = function () {
                    e.dataType ? "json" == e.dataType.toLowerCase() && e.success(JSON.parse(n.responseText)) : e.success(n.responseText);
                }), n.open(e.type, e.url), n.send(e.param)) : alert("Failed to create XDomainRequest")) : g ? (S.add("td-unique", "true"), g = !1, d = c.ajax({
                    type: o,
                    url: r,
                    data: JSON.stringify(i),
                    dataType: "text",
                    success: a,
                    error: s,
                    complete: function complete() {
                        g = !(d = void 0), m && (T.getAjax(), m = !1), S.delLocalStorage("td-unique");
                    }
                })) : m = !0;
            })({
                url: this.url,
                type: "POST",
                param: JSON.stringify(i),
                success: a
            });
        },
        set: function set(e, t, n) {
            this.opts = e, this.send(t, n);
        },
        send: function send(e, t) {
            this.getAjax("post", this.url, this.opts, e, t);
        }
    }, (i = window).TDBASE = i.TDBASE || {}, TDBASE.cacheName = "cacheList", TDBASE.unique = function (e) {
        e.sort();
        for (var t = [e[0]], n = 1; n < e.length; n++) {
            e[n] !== t[t.length - 1] && t.push(e[n]);
        }return t;
    }, TDBASE.getArgs = function () {
        for (var e = new Object(), t = i.location.search.substring(1).split("&"), n = 0; n < t.length; n++) {
            var o,
                r = t[n].indexOf("=");-1 != r && (o = t[n].substring(0, r), r = t[n].substring(r + 1), r = decodeURIComponent(r), e[o] = r);
        }
        return e;
    }, TDBASE.getCommon = function (e) {
        var t = S.get("appkey") ? S.get("appkey") : u.appkey,
            e = {
            deviceId: u.deviceId,
            appkey: t,
            appProfile: u.appProfile,
            deviceProfile: u.deviceProfile,
            msgs: e.msg
        };
        return u.appContext && (e.appContext = u.appContext), e;
    }, TDBASE.getCommonMsg = function (e, t, n, o, r, i) {
        return {
            type: 2,
            data: {
                id: e,
                start: t,
                status: n,
                duration: o || 0,
                pages: i ? [i] : [],
                events: r || []
            }
        };
    }, TDBASE.addSessionStart = function (e, t) {
        S.add("lastSession", JSON.stringify({
            id: r.data.id,
            start: r.data.start
        })), n = (n = S.get("td-hold-event")) && JSON.parse(n);
        var n = TDBASE.getCommonMsg(r.data.id, r.data.start, t, e, n);
        TDBASE.addMsg(n), S.delLocalStorage("td-hold-event");
    }, TDBASE.equal = function (e, t) {
        if ((void 0 === e ? "undefined" : _(e)) != (void 0 === t ? "undefined" : _(t))) return !1;
        if (_(e.length) != _(t.length)) return !1;
        var n = !0,
            o = [],
            r = [];
        for (i in e) {
            "count" === i || "start" === i || o.push(i);
        }for (i in t) {
            "count" === i || "start" === i || r.push(i);
        }if (o.length != r.length) return !1;
        for (var i = 0, a = r.length; i < a; i++) {
            o.push(r[i]);
        }for (var s = TDBASE.unique(o), i = 0, a = s.length; i < a; i++) {
            if (!(s[i] in e && s[i] in t)) return !1;
            if ("object" == _(e[s[i]]) && "object" == _(t[s[i]])) n = TDBASE.equal(e[s[i]], t[s[i]]);else if (e[s[i]] !== t[s[i]]) return !1;
        }
        return n;
    }, TDBASE.addGenre = function (e, t, n) {
        if (S.get("sessionMsg")) {
            n && n(e);
            var n = JSON.parse(S.get("sessionMsg")),
                o = n.msg[n.msg.length - 1].data[t];
            if ("events" !== t) o.push(e), S.add("sessionMsg", JSON.stringify(n));else {
                if (0 != o.length) {
                    for (var r = !1, i = 0; i < o.length; i++) {
                        if (TDBASE.equal(o[i], e)) {
                            r = !0, o[i].count += 1, o[i].start = e.start;
                            break;
                        }
                    }r || o.push(e);
                } else o.push(e);
                S.add("sessionMsg", JSON.stringify(n));
            }
        }
    }, TDBASE.lealSet = function (e) {
        S.add("leavetime", e), S.add("leaveSession", parseInt((e - s.get("SessionStart")) / 1e3));
    }, TDBASE.addMsg = function (e) {
        var t;
        S.get("sessionMsg") ? ((t = JSON.parse(S.get("sessionMsg"))).msg.push(e), S.add("sessionMsg", JSON.stringify(t))) : S.add("sessionMsg", JSON.stringify({
            msg: [e]
        }));
    }, (a = {
        currentPage: null,
        pageStartTime: 0,
        ref: "",
        logoutCalled: !1,
        init: function init() {
            // e(window, "pagehide", a.pageLogout),
            //  e(window, "beforeunload", a.pageLogout),

            setTimeout(function () {
                a.pageLogout();
            }, 5000);
            window.TDAPP = window.TDAPP || {}, window.TDAPP.onPage = a.onPage, l.autoTrack && (a.currentPage = window.location.href, a.ref = document.referrer);
        },
        onPage: function onPage(e) {
            var t = new Date().getTime();
            a.pageLogout("force"), a.pageEnter(e, a.currentPage, t), a.ref = a.currentPage, a.currentPage = e, a.pageStartTime = t, T.getAjax();
        },
        pageEnter: function pageEnter(e, t, n) {
            t = {
                name: e,
                start: n,
                duration: 0,
                refer: t || document.referrer
            };
            TDBASE.addGenre(t, "pages");
        },
        pageLogout: function pageLogout(e) {
            if ("force" !== e) {
                if (a.logoutCalled) return;
                a.logoutCalled = !0;
            }
            var t = null,
                n = 0,
                o = null;
            if (l.autoTrack) t = a.currentPage || window.location.href, n = a.pageStartTime || p, o = a.ref || document.referrer;else {
                if (!a.currentPage) return;
                t = a.currentPage, n = a.pageStartTime, o = a.ref || document.referrer;
            }
            e = new Date().getTime();
            TDBASE.lealSet(e), TDBASE.addGenre({
                name: t,
                start: n,
                duration: 6,
                refer: o
            }, "pages");
        }
    }).init(), f = {
        init: function init() {
            try {
                var e = l.localStorage.get("profile");
                e && (e = JSON.parse(e), e = f._transform(e), u.appContext = u.appContext || {}, u.appContext.account = e);
            } catch (e) {
                console.error(e);
            }
        },
        _transform: function _transform(e) {
            e = JSON.parse(JSON.stringify(e));
            return e.accountId = e.profileId, e.type = e.profileType, delete e.profileType, delete e.profileId, e;
        },
        _transformInverse: function _transformInverse(e) {
            e = JSON.parse(JSON.stringify(e));
            return e.profileId = e.accountId, e.profileType = e.type, delete e.type, delete e.accountId, e;
        },
        login: function login(e) {
            f._event(e, "login");
        },
        register: function register(e) {
            f._event(e, "register");
        },
        updateProfile: function updateProfile(e) {
            f._event(e, "update");
        },
        _chekProfile: function _chekProfile() {
            return "object" === _(u.appContext) && "object" === _(u.appContext.account) ? u.appContext.account : null;
        },
        _event: function _event(e, t) {
            if (!e || "object" !== (void 0 === e ? "undefined" : _(e))) return console.log("profile淇℃伅蹇呭～!");
            if ("update" !== t && !e.profileId && !/0{1}/.test(e.profileId)) return console.log("profileId 淇℃伅涓哄繀濉�!");
            if ("update" !== t && "number" != typeof e.profileType) return console.log("profileType 涓哄繀濉�!");
            var n,
                o = f._getProfile(e, t),
                r = {
                profileId: "_setId",
                profileType: "_setProfileType",
                name: "_setName",
                gender: "_setGender",
                age: "_setAge"
            },
                i = new RegExp("^property[1-9]$");
            for (n in e) {
                var a,
                    s = e[n],
                    c = r[n];
                if (!c || "update" === t && "profileId" === n) {
                    if (i.test(n) || "property10" === n) if (a = f._setProperty(o, n, s)) return void console.log(a);
                } else if (a = f[c](o, s)) return void console.log(a);
            }
            u.appContext = u.appContext || {}, u.appContext.account = o;
            var d = f._transformInverse(o);
            l.localStorage.add("profile", JSON.stringify(d)), o = f._transform(o), d = f._transform(e), y.setProfile(d, t);
        },
        _getProfile: function _getProfile(e, t) {
            var n = {};
            return u.appContext && u.appContext.account && (n = JSON.parse(JSON.stringify(u.appContext.account))), "update" == t || e.profileId === n.accountId ? n : {};
        },
        _setId: function _setId(e, t) {
            if (!t && !/0{1}/.test(t)) return "profileId涓哄繀濉瓧娈碉紒";
            e.accountId = t;
        },
        _setProfileType: function _setProfileType(e, t) {
            if ("number" != typeof t || t != t || t < -1 || 6 < t && t < 11 || 20 < t) return "璇蜂笂浼犳纭殑profileType";
            e.type = t;
        },
        _setName: function _setName(e, t) {
            if ("string" != typeof t) return "profile name 绫诲瀷閿欒";
            e.name = t;
        },
        _setAge: function _setAge(e, t) {
            if ("number" != typeof t || t != t) return "profile age 绫诲瀷閿欒";
            e.age = t;
        },
        _setGender: function _setGender(e, t) {
            if (0 !== t && 1 !== t & 2 !== t) return "profile gender 绫诲瀷閿欒";
            e.gender = t;
        },
        _setProperty: function _setProperty(e, t, n) {
            if ("number" == typeof n && n != n || "string" != typeof n && "number" != typeof n) return "profile property 绫诲瀷閿欒";
            e[t] = n;
        }
    }, window.TDAPP = window.TDAPP || {}, window.TDAPP.login = f.login, window.TDAPP.register = f.register, window.TDAPP.updateProfile = f.updateProfile, window.TDAPP.ProfileType = {
        0: "ANONYMOUS",
        1: "REGISTERED",
        2: "SINA_WEIBO",
        3: "QQ",
        4: "QQ_WEIBO",
        5: "ND91",
        6: "WEIXIN",
        11: "TYPE1",
        12: "TYPE2",
        13: "TYPE3",
        14: "TYPE4",
        15: "TYPE5",
        16: "TYPE6",
        17: "TYPE7",
        18: "TYPE8",
        19: "TYPE9",
        20: "TYPE10"
    }, f.init(), n = {
        isObject: function isObject(e) {
            return e && "object" === (void 0 === e ? "undefined" : _(e));
        },
        isStrNotEmpty: function isStrNotEmpty(e) {
            return e || /0{1}/.test(e);
        },
        isNumber: function isNumber(e) {
            return "number" == typeof e && e == e;
        },
        isCurrencyTypeAvailabal: function isCurrencyTypeAvailabal(e) {
            return e && "string" == typeof e && 3 === e.length;
        },
        _checkParam: function _checkParam(e) {
            return n.isObject(e) ? n.isStrNotEmpty(e.orderId) ? n.isNumber(e.amount) ? !!n.isCurrencyTypeAvailabal(e.currencyType) || (console.warn("璇疯緭鍏ユ纭殑currencyType!"), !1) : (console.warn("璇疯緭鍏ユ纭殑amount!"), !1) : (console.warn("璇疯緭鍏ユ纭殑orderId!"), !1) : (console.warn("璇疯緭鍏ユ纭殑鍙傛暟!"), !1);
        },
        onPlaceOrder: function onPlaceOrder(e) {
            n._checkParam(e) && (e = {
                count: 1,
                start: new Date().getTime(),
                domain: "iap",
                id: "placeOrder",
                params: e
            }, y._saveAndFetch(e));
        },
        onOrderPaySucc: function onOrderPaySucc(e) {
            n._checkParam(e) && ((e = JSON.parse(JSON.stringify(e))).paymentType && n.isStrNotEmpty(e.paymentType) && (e.payType = e.paymentType), delete e.paymentType, e = {
                count: 1,
                start: new Date().getTime(),
                domain: "iap",
                id: "pay",
                params: e
            }, y._saveAndFetch(e));
        },
        onCancelOrder: function onCancelOrder(e) {
            n._checkParam(e) && (e = {
                count: 1,
                start: new Date().getTime(),
                domain: "iap",
                id: "cancelOrder",
                params: e
            }, y._saveAndFetch(e));
        }
    }, window.TDAPP = window.TDAPP || {}, window.TDAPP.onPlaceOrder = n.onPlaceOrder, window.TDAPP.onOrderPaySucc = n.onOrderPaySucc, window.TDAPP.onCancelOrder = n.onCancelOrder;
    var S = l.localStorage,
        s = l.sessionStorage,
        T = {
        timedif: void 0,
        state: 1,
        deviceId: 0,
        sessionId: 0,
        local: [],
        sendInit: 0,
        set: function set() {
            try {

                this.setDeviceId(), this.setSession(), this.setSessionTime(), this.setInitTime(), this.setPartner(), this.setResolution(), this.addlastSession(), this.setPageEnter(), this.getAjax(1);
            } catch (e) {
                console.log(e);
            }
        },
        setDeviceId: function setDeviceId() {

            if (Laya.LocalStorage.getItem("_TD_deviceId")) {

                this.deviceId = Laya.LocalStorage.getItem("_TD_deviceId");
            } else {
                this.sendInit = 1;
                for (var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), t = [], n = e.length, o = 0; o < 16; o++) {
                    t[o] = e[0 | Math.random() * n];
                }this.deviceId = t.join(""),

                // S.add("deviceId", this.deviceId)
                Laya.LocalStorage.setItem('_TD_deviceId', this.deviceId);
            }
            u.deviceId = this.deviceId;

            // if (S.get("deviceId")) 
            // {

            //     this.deviceId = S.get("deviceId");
            // }
            // else {
            //     this.sendInit = 1;
            //     for (var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), t = [], n = e.length, o = 0; o < 16; o++) t[o] = e[0 | Math.random() * n];

            //     this.deviceId = t.join(""), 

            //     S.add("deviceId", this.deviceId)
            // }
            // u.deviceId = this.deviceId
        },
        setSession: function setSession() {
            var e, t;
            if (s.get("sessionId") && S.get("appkey") == u.appkey ? t = s.get("sessionId") : (e = new Date().getTime(), t = -1 < this.deviceId.indexOf("-") ? this.deviceId.split("-")[0] + e : this.deviceId + e, this.sendInit = 0 == this.sendInit ? 2 : this.sendInit, s.add("sessionId", t)), 0 < 32 - t.length) for (var n = 0, o = 32 - t.length; n < o; n++) {
                t += "0";
            }32 - t.length < 0 && (t = t.substring(0, 32)), r.data.id = this.sessionId = t;
        },
        setSessionTime: function setSessionTime() {
            var e = new Date().getTime();
            s.get("SessionStart") && S.get("appkey") == u.appkey ? e = s.get("SessionStart") : s.add("SessionStart", e), r.data.start = parseInt(e);
        },
        setInitTime: function setInitTime() {
            S.get("initTime") ? u.appProfile.initTime = parseInt(S.get("initTime")) : (u.appProfile.initTime = p, S.add("initTime", p));
        },
        setPartner: function setPartner() {
            var e = s.get("td_channel"),
                t = gameChannel;
            e ? u.appProfile.partner = e : null != t && (s.add("td_channel", t), u.appProfile.partner = t);
        },
        setResolution: function setResolution() {
            var e = [window.screen.width, window.screen.height];
            window.devicePixelRatio && e.push(window.devicePixelRatio), u.deviceProfile.pixel = e.join("*");
        },
        addlastSession: function addlastSession() {
            var e = S.get("lastSession");
            void 0 === e && (S.delLocalStorage("sessionMsg"), S.delLocalStorage("lastSession")), e ? (e = JSON.parse(e)).id != r.data.id && (e = TDBASE.getCommonMsg(e.id, e.start, 3, parseInt(S.get("leaveSession"))), TDBASE.addMsg(e), this.timedif = parseInt((r.data.start - S.get("leavetime")) / 1e3), S.get("appkey") && S.get("appkey") != u.appkey || (TDBASE.addSessionStart(this.timedif, 1), this.addAppInitEvent())) : (TDBASE.addSessionStart(0, 1), this.addAppInitEvent());
        },
        setPageEnter: function setPageEnter() {
            var e;
            l.autoTrack && (e = {
                name: "http://localhost:1111/",
                start: new Date().getTime(),
                duration: 6,
                refer: "http://localhost:1111/"
            }, TDBASE.addGenre(e, "pages"));
        },
        addAppInitEvent: function addAppInitEvent() {
            var e;
            0 != this.sendInit && (e = {
                id: "init",
                domain: "app",
                start: p || new Date().getTime(),
                count: 1,
                params: {
                    first: !0
                }
            }, 2 == this.sendInit && (e.params.first = !1), TDBASE.addGenre(e, "events"));
        },
        getAjax: function getAjax(e) {
            var t = this,
                n = new v();
            localStorage.__TD_sessionMsg || TDBASE.addSessionStart(0, 2);
            var o,
                r = JSON.parse(S.get("sessionMsg")),
                i = TDBASE.getCommon(r),
                a = localStorage["__TD_td-init-event"];
            !a || (o = i.msgs[i.msgs.length - 1]) && (r = o.data.events, o.data.events = r.concat(JSON.parse(a))), S.delLocalStorage("td-init-event");
            for (var s = [], c = 0; c < i.msgs.length; c++) {
                var d = i.msgs[c];
                (2 !== d.data.status || d.data.pages && 0 !== d.data.pages.length || d.data.events && 0 !== d.data.events.length) && s.push(d);
            }
            0 !== s.length && (i.msgs = s, S.get("appkey") ? S.get("appkey") != u.appkey ? n.set(i, function (e) {
                S.delLocalStorage("sessionMsg"), u.appProfile.initTime = p, S.add("initTime", p), TDBASE.addSessionStart(0, 1), t.addAppInitEvent(), t.getAjax();
            }, function (e) {
                console.log(e);
            }) : n.set(i, function (e) {
                S.delLocalStorage("sessionMsg"), TDBASE.addSessionStart(0, 2);
            }, function (e) {
                console.log(e);
            }) : n.set(i, function (e) {
                S.delLocalStorage("sessionMsg"), TDBASE.addSessionStart(0, 2);
            }, function (e) {
                console.log(e);
            }), S.add("appkey", u.appkey));
        }
    };
    T.set();
    var y = {
        set: function set(e, t, n, o) {
            var r;
            if (e || /0{1}/.test(e)) {
                if (0 < arguments.length) try {
                    var i = {
                        count: 1,
                        start: new Date().getTime()
                    };
                    if (null != e && (i.id = "string" != typeof e ? JSON.stringify(e) : e), i.label = null != t ? "string" != typeof t ? JSON.stringify(t) : t : "", null != n && ("object" != (void 0 === (r = n) ? "undefined" : _(r)) || "[object object]" != Object.prototype.toString.call(r).toLowerCase() || r.length || (i.params = n)), o && "smart" === o) i.type = "smart";else if (void 0 !== o) {
                        if ("number" != typeof o || isNaN(o)) return void console.error("value鍙兘涓簄umber");
                        i.value = o;
                    }
                    y._saveAndFetch(i);
                } catch (e) {}
            } else console.warn("event  Id涓哄繀濉瓧娈碉紒");
        },
        setProfile: function setProfile(e, t) {
            e = {
                count: 1,
                start: new Date().getTime(),
                domain: "account",
                id: t,
                params: e
            };
            y._saveAndFetch(e);
        },
        _saveAndFetch: function _saveAndFetch(e) {
            d ? TDBASE.addGenre(e, "events", function (e) {
                var t = S.get("td-hold-event"),
                    n = [];
                if (n.push(e), t) {
                    t = JSON.parse(t);
                    for (var o = 0; o < t.length; o++) {
                        if (TDBASE.equal(t[o], e)) {
                            t[o].count += 1, t[o].start = e.start;
                            break;
                        }
                    }S.add("td-hold-event", JSON.stringify(t));
                } else S.add("td-hold-event", JSON.stringify(n));
            }) : (TDBASE.addGenre(e, "events"), setTimeout(function () {
                T.getAjax();
            }, 500));
        },
        unload: function unload() {
            try {
                T.getAjax();
            } catch (e) {}
        }
    };
    window.TDAPP = window.TDAPP || {}, window.TDAPP.onEvent = y.set;
};

setTimeout(function () {

    TDinit();

    try {} catch (error) {}
}, 100);

setTimeout(function () {
    TDinit();

    try {} catch (error) {}
}, 4000);

},{}],"/AdSdk/domparserinone.js":[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var entityMap = {
	lt: '<',
	gt: '>',
	amp: '&',
	quot: '"',
	apos: "'",
	Agrave: "À",
	Aacute: "Á",
	Acirc: "Â",
	Atilde: "Ã",
	Auml: "Ä",
	Aring: "Å",
	AElig: "Æ",
	Ccedil: "Ç",
	Egrave: "È",
	Eacute: "É",
	Ecirc: "Ê",
	Euml: "Ë",
	Igrave: "Ì",
	Iacute: "Í",
	Icirc: "Î",
	Iuml: "Ï",
	ETH: "Ð",
	Ntilde: "Ñ",
	Ograve: "Ò",
	Oacute: "Ó",
	Ocirc: "Ô",
	Otilde: "Õ",
	Ouml: "Ö",
	Oslash: "Ø",
	Ugrave: "Ù",
	Uacute: "Ú",
	Ucirc: "Û",
	Uuml: "Ü",
	Yacute: "Ý",
	THORN: "Þ",
	szlig: "ß",
	agrave: "à",
	aacute: "á",
	acirc: "â",
	atilde: "ã",
	auml: "ä",
	aring: "å",
	aelig: "æ",
	ccedil: "ç",
	egrave: "è",
	eacute: "é",
	ecirc: "ê",
	euml: "ë",
	igrave: "ì",
	iacute: "í",
	icirc: "î",
	iuml: "ï",
	eth: "ð",
	ntilde: "ñ",
	ograve: "ò",
	oacute: "ó",
	ocirc: "ô",
	otilde: "õ",
	ouml: "ö",
	oslash: "ø",
	ugrave: "ù",
	uacute: "ú",
	ucirc: "û",
	uuml: "ü",
	yacute: "ý",
	thorn: "þ",
	yuml: "ÿ",
	nbsp: " ",
	iexcl: "¡",
	cent: "¢",
	pound: "£",
	curren: "¤",
	yen: "¥",
	brvbar: "¦",
	sect: "§",
	uml: "¨",
	copy: "©",
	ordf: "ª",
	laquo: "«",
	not: "¬",
	shy: "­­",
	reg: "®",
	macr: "¯",
	deg: "°",
	plusmn: "±",
	sup2: "²",
	sup3: "³",
	acute: "´",
	micro: "µ",
	para: "¶",
	middot: "·",
	cedil: "¸",
	sup1: "¹",
	ordm: "º",
	raquo: "»",
	frac14: "¼",
	frac12: "½",
	frac34: "¾",
	iquest: "¿",
	times: "×",
	divide: "÷",
	forall: "∀",
	part: "∂",
	exist: "∃",
	empty: "∅",
	nabla: "∇",
	isin: "∈",
	notin: "∉",
	ni: "∋",
	prod: "∏",
	sum: "∑",
	minus: "−",
	lowast: "∗",
	radic: "√",
	prop: "∝",
	infin: "∞",
	ang: "∠",
	and: "∧",
	or: "∨",
	cap: "∩",
	cup: "∪",
	'int': "∫",
	there4: "∴",
	sim: "∼",
	cong: "≅",
	asymp: "≈",
	ne: "≠",
	equiv: "≡",
	le: "≤",
	ge: "≥",
	sub: "⊂",
	sup: "⊃",
	nsub: "⊄",
	sube: "⊆",
	supe: "⊇",
	oplus: "⊕",
	otimes: "⊗",
	perp: "⊥",
	sdot: "⋅",
	Alpha: "Α",
	Beta: "Β",
	Gamma: "Γ",
	Delta: "Δ",
	Epsilon: "Ε",
	Zeta: "Ζ",
	Eta: "Η",
	Theta: "Θ",
	Iota: "Ι",
	Kappa: "Κ",
	Lambda: "Λ",
	Mu: "Μ",
	Nu: "Ν",
	Xi: "Ξ",
	Omicron: "Ο",
	Pi: "Π",
	Rho: "Ρ",
	Sigma: "Σ",
	Tau: "Τ",
	Upsilon: "Υ",
	Phi: "Φ",
	Chi: "Χ",
	Psi: "Ψ",
	Omega: "Ω",
	alpha: "α",
	beta: "β",
	gamma: "γ",
	delta: "δ",
	epsilon: "ε",
	zeta: "ζ",
	eta: "η",
	theta: "θ",
	iota: "ι",
	kappa: "κ",
	lambda: "λ",
	mu: "μ",
	nu: "ν",
	xi: "ξ",
	omicron: "ο",
	pi: "π",
	rho: "ρ",
	sigmaf: "ς",
	sigma: "σ",
	tau: "τ",
	upsilon: "υ",
	phi: "φ",
	chi: "χ",
	psi: "ψ",
	omega: "ω",
	thetasym: "ϑ",
	upsih: "ϒ",
	piv: "ϖ",
	OElig: "Œ",
	oelig: "œ",
	Scaron: "Š",
	scaron: "š",
	Yuml: "Ÿ",
	fnof: "ƒ",
	circ: "ˆ",
	tilde: "˜",
	ensp: " ",
	emsp: " ",
	thinsp: " ",
	zwnj: "‌",
	zwj: "‍",
	lrm: "‎",
	rlm: "‏",
	ndash: "–",
	mdash: "—",
	lsquo: "‘",
	rsquo: "’",
	sbquo: "‚",
	ldquo: "“",
	rdquo: "”",
	bdquo: "„",
	dagger: "†",
	Dagger: "‡",
	bull: "•",
	hellip: "…",
	permil: "‰",
	prime: "′",
	Prime: "″",
	lsaquo: "‹",
	rsaquo: "›",
	oline: "‾",
	euro: "€",
	trade: "™",
	larr: "←",
	uarr: "↑",
	rarr: "→",
	darr: "↓",
	harr: "↔",
	crarr: "↵",
	lceil: "⌈",
	rceil: "⌉",
	lfloor: "⌊",
	rfloor: "⌋",
	loz: "◊",
	spades: "♠",
	clubs: "♣",
	hearts: "♥",
	diams: "♦"
};
//for(var  n in exports.entityMap){console.log(exports.entityMap[n].charCodeAt())}

//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/; //\u10000-\uEFFFF
var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + '\\u00B7\\u0300-\\u036F\\u203F-\\u2040]');
var tagNamePattern = new RegExp('^' + nameStartChar.source + nameChar.source + '*(?:\:' + nameStartChar.source + nameChar.source + '*)?$');
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
var S_TAG = 0; //tag name offerring
var S_ATTR = 1; //attr name offerring 
var S_ATTR_SPACE = 2; //attr name end and space offer
var S_EQ = 3; //=space?
var S_ATTR_NOQUOT_VALUE = 4; //attr value(no quot value only)
var S_ATTR_END = 5; //attr value end and no space(quot end)
var S_TAG_SPACE = 6; //(attr value end || tag end ) && (space offer)
var S_TAG_CLOSE = 7; //closed el<el />

var SaxO = {};
function XMLReader() {}

XMLReader.prototype = {
	parse: function parse(source, defaultNSMap, entityMap) {
		var domBuilder = this.domBuilder;
		domBuilder.startDocument();
		_copy(defaultNSMap, defaultNSMap = {});
		_parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
		domBuilder.endDocument();
	}
};
function _parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
	function fixedFromCharCode(code) {
		// String.prototype.fromCharCode does not supports
		// > 2 bytes unicode chars directly
		if (code > 0xffff) {
			code -= 0x10000;
			var surrogate1 = 0xd800 + (code >> 10),
			    surrogate2 = 0xdc00 + (code & 0x3ff);

			return String.fromCharCode(surrogate1, surrogate2);
		} else {
			return String.fromCharCode(code);
		}
	}
	function entityReplacer(a) {
		var k = a.slice(1, -1);
		if (k in entityMap) {
			return entityMap[k];
		} else if (k.charAt(0) === '#') {
			return fixedFromCharCode(parseInt(k.substr(1).replace('x', '0x')));
		} else {
			errorHandler.error('entity not found:' + a);
			return a;
		}
	}
	function appendText(end) {
		//has some bugs
		if (end > start) {
			var xt = source.substring(start, end).replace(/&#?\w+;/g, entityReplacer);
			locator && position(start);
			domBuilder.characters(xt, 0, end - start);
			start = end;
		}
	}
	function position(p, m) {
		while (p >= lineEnd && (m = linePattern.exec(source))) {
			lineStart = m.index;
			lineEnd = lineStart + m[0].length;
			locator.lineNumber++;
			//console.log('line++:',locator,startPos,endPos)
		}
		locator.columnNumber = p - lineStart + 1;
	}
	var lineStart = 0;
	var lineEnd = 0;
	var linePattern = /.*(?:\r\n?|\n)|.*$/g;
	var locator = domBuilder.locator;

	var parseStack = [{ currentNSMap: defaultNSMapCopy }];
	var closeMap = {};
	var start = 0;
	while (true) {
		try {
			var tagStart = source.indexOf('<', start);
			if (tagStart < 0) {
				if (!source.substr(start).match(/^\s*$/)) {
					var doc = domBuilder.doc;
					var text = doc.createTextNode(source.substr(start));
					doc.appendChild(text);
					domBuilder.currentElement = text;
				}
				return;
			}
			if (tagStart > start) {
				appendText(tagStart);
			}
			switch (source.charAt(tagStart + 1)) {
				case '/':
					var end = source.indexOf('>', tagStart + 3);
					var tagName = source.substring(tagStart + 2, end);
					var config = parseStack.pop();
					if (end < 0) {

						tagName = source.substring(tagStart + 2).replace(/[\s<].*/, '');
						//console.error('#@@@@@@'+tagName)
						errorHandler.error("end tag name: " + tagName + ' is not complete:' + config.tagName);
						end = tagStart + 1 + tagName.length;
					} else if (tagName.match(/\s</)) {
						tagName = tagName.replace(/[\s<].*/, '');
						errorHandler.error("end tag name: " + tagName + ' maybe not complete');
						end = tagStart + 1 + tagName.length;
					}
					//console.error(parseStack.length,parseStack)
					//console.error(config);
					var localNSMap = config.localNSMap;
					var endMatch = config.tagName == tagName;
					var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
					if (endIgnoreCaseMach) {
						domBuilder.endElement(config.uri, config.localName, tagName);
						if (localNSMap) {
							for (var prefix in localNSMap) {
								domBuilder.endPrefixMapping(prefix);
							}
						}
						if (!endMatch) {
							errorHandler.fatalError("end tag name: " + tagName + ' is not match the current start tagName:' + config.tagName);
						}
					} else {
						parseStack.push(config);
					}

					end++;
					break;
				// end elment
				case '?':
					// <?...?>
					locator && position(tagStart);
					end = parseInstruction(source, tagStart, domBuilder);
					break;
				case '!':
					// <!doctype,<![CDATA,<!--
					locator && position(tagStart);
					end = parseDCC(source, tagStart, domBuilder, errorHandler);
					break;
				default:
					locator && position(tagStart);
					var el = new ElementAttributes();
					var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
					//elStartEnd
					var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
					var len = el.length;

					if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
						el.closed = true;
						if (!entityMap.nbsp) {
							errorHandler.warning('unclosed xml attribute');
						}
					}
					if (locator && len) {
						var locator2 = copyLocator(locator, {});
						//try{//attribute position fixed
						for (var i = 0; i < len; i++) {
							var a = el[i];
							position(a.offset);
							a.locator = copyLocator(locator, {});
						}
						//}catch(e){console.error('@@@@@'+e)}
						domBuilder.locator = locator2;
						if (SaxO.appendElement(el, domBuilder, currentNSMap)) {
							parseStack.push(el);
						}
						domBuilder.locator = locator;
					} else {
						if (SaxO.appendElement(el, domBuilder, currentNSMap)) {
							parseStack.push(el);
						}
					}

					if (el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed) {
						end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
					} else {
						end++;
					}
			}
		} catch (e) {
			errorHandler.error('element parse error: ' + e);
			//errorHandler.error('element parse error: '+e);
			end = -1;
			//throw e;
		}
		if (end > start) {
			start = end;
		} else {
			//TODO: 这里有可能sax回退，有位置错误风险
			appendText(Math.max(tagStart, start) + 1);
		}
	}
}
function copyLocator(f, t) {
	t.lineNumber = f.lineNumber;
	t.columnNumber = f.columnNumber;
	return t;
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
	var attrName;
	var value;
	var p = ++start;
	var s = S_TAG; //status
	while (true) {
		var c = source.charAt(p);
		switch (c) {
			case '=':
				if (s === S_ATTR) {
					//attrName
					attrName = source.slice(start, p);
					s = S_EQ;
				} else if (s === S_ATTR_SPACE) {
					s = S_EQ;
				} else {
					//fatalError: equal must after attrName or space after attrName
					throw new Error('attribute equal must after attrName');
				}
				break;
			case '\'':
			case '"':
				if (s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
				) {
						//equal
						if (s === S_ATTR) {
							errorHandler.warning('attribute value must after "="');
							attrName = source.slice(start, p);
						}
						start = p + 1;
						p = source.indexOf(c, start);
						if (p > 0) {
							value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
							el.add(attrName, value, start - 1);
							s = S_ATTR_END;
						} else {
							//fatalError: no end quot match
							throw new Error('attribute value no end \'' + c + '\' match');
						}
					} else if (s == S_ATTR_NOQUOT_VALUE) {
					value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
					//console.log(attrName,value,start,p)
					el.add(attrName, value, start);
					//console.dir(el)
					errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ')!!');
					start = p + 1;
					s = S_ATTR_END;
				} else {
					//fatalError: no equal before
					throw new Error('attribute value must after "="');
				}
				break;
			case '/':
				switch (s) {
					case S_TAG:
						el.setTagName(source.slice(start, p));
					case S_ATTR_END:
					case S_TAG_SPACE:
					case S_TAG_CLOSE:
						s = S_TAG_CLOSE;
						el.closed = true;
					case S_ATTR_NOQUOT_VALUE:
					case S_ATTR:
					case S_ATTR_SPACE:
						break;
					//case S_EQ:
					default:
						throw new Error("attribute invalid close char('/')");
				}
				break;
			case '':
				//end document
				//throw new Error('unexpected end of input')
				errorHandler.error('unexpected end of input');
				if (s == S_TAG) {
					el.setTagName(source.slice(start, p));
				}
				return p;
			case '>':
				switch (s) {
					case S_TAG:
						el.setTagName(source.slice(start, p));
					case S_ATTR_END:
					case S_TAG_SPACE:
					case S_TAG_CLOSE:
						break; //normal
					case S_ATTR_NOQUOT_VALUE: //Compatible state
					case S_ATTR:
						value = source.slice(start, p);
						if (value.slice(-1) === '/') {
							el.closed = true;
							value = value.slice(0, -1);
						}
					case S_ATTR_SPACE:
						if (s === S_ATTR_SPACE) {
							value = attrName;
						}
						if (s == S_ATTR_NOQUOT_VALUE) {
							errorHandler.warning('attribute "' + value + '" missed quot(")!!');
							el.add(attrName, value.replace(/&#?\w+;/g, entityReplacer), start);
						} else {
							if (currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)) {
								errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
							}
							el.add(value, value, start);
						}
						break;
					case S_EQ:
						throw new Error('attribute value missed!!');
				}
				//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
				return p;
			/*xml space '\x20' | #x9 | #xD | #xA; */
			case '\x80':
				c = ' ';
			default:
				if (c <= ' ') {
					//space
					switch (s) {
						case S_TAG:
							el.setTagName(source.slice(start, p)); //tagName
							s = S_TAG_SPACE;
							break;
						case S_ATTR:
							attrName = source.slice(start, p);
							s = S_ATTR_SPACE;
							break;
						case S_ATTR_NOQUOT_VALUE:
							var value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
							errorHandler.warning('attribute "' + value + '" missed quot(")!!');
							el.add(attrName, value, start);
						case S_ATTR_END:
							s = S_TAG_SPACE;
							break;
						//case S_TAG_SPACE:
						//case S_EQ:
						//case S_ATTR_SPACE:
						//	void();break;
						//case S_TAG_CLOSE:
						//ignore warning
					}
				} else {
					//not space
					//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
					//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
					switch (s) {
						//case S_TAG:void();break;
						//case S_ATTR:void();break;
						//case S_ATTR_NOQUOT_VALUE:void();break;
						case S_ATTR_SPACE:
							var tagName = el.tagName;
							if (currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
								errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
							}
							el.add(attrName, attrName, start);
							start = p;
							s = S_ATTR;
							break;
						case S_ATTR_END:
							errorHandler.warning('attribute space is required"' + attrName + '"!!');
						case S_TAG_SPACE:
							s = S_ATTR;
							start = p;
							break;
						case S_EQ:
							s = S_ATTR_NOQUOT_VALUE;
							start = p;
							break;
						case S_TAG_CLOSE:
							throw new Error("elements closed character '/' and '>' must be connected to");
					}
				}
		} //end outer switch
		//console.log('p++',p)
		p++;
	}
}
/**
 * @return true if has new namespace define
 */
SaxO.appendElement = function appendElement(el, domBuilder, currentNSMap) {
	var tagName = el.tagName;
	var localNSMap = null;
	//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
	var i = el.length;
	while (i--) {
		var a = el[i];
		var qName = a.qName;
		var value = a.value;
		var nsp = qName.indexOf(':');
		if (nsp > 0) {
			var prefix = a.prefix = qName.slice(0, nsp);
			var localName = qName.slice(nsp + 1);
			var nsPrefix = prefix === 'xmlns' && localName;
		} else {
			localName = qName;
			prefix = null;
			nsPrefix = qName === 'xmlns' && '';
		}
		//can not set prefix,because prefix !== ''
		a.localName = localName;
		//prefix == null for no ns prefix attribute 
		if (nsPrefix !== false) {
			//hack!!
			if (localNSMap == null) {
				localNSMap = {};
				//console.log(currentNSMap,0)
				_copy(currentNSMap, currentNSMap = {});
				//console.log(currentNSMap,1)
			}
			currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
			a.uri = 'http://www.w3.org/2000/xmlns/';
			domBuilder.startPrefixMapping(nsPrefix, value);
		}
	}
	var i = el.length;
	while (i--) {
		a = el[i];
		var prefix = a.prefix;
		if (prefix) {
			//no prefix attribute has no namespace
			if (prefix === 'xml') {
				a.uri = 'http://www.w3.org/XML/1998/namespace';
			}if (prefix !== 'xmlns') {
				a.uri = currentNSMap[prefix || ''];

				//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
			}
		}
	}
	var nsp = tagName.indexOf(':');
	if (nsp > 0) {
		prefix = el.prefix = tagName.slice(0, nsp);
		localName = el.localName = tagName.slice(nsp + 1);
	} else {
		prefix = null; //important!!
		localName = el.localName = tagName;
	}
	//no prefix element has default namespace
	var ns = el.uri = currentNSMap[prefix || ''];
	domBuilder.startElement(ns, localName, tagName, el);
	//endPrefixMapping and startPrefixMapping have not any help for dom builder
	//localNSMap = null
	if (el.closed) {
		domBuilder.endElement(ns, localName, tagName);
		if (localNSMap) {
			for (prefix in localNSMap) {
				domBuilder.endPrefixMapping(prefix);
			}
		}
	} else {
		el.currentNSMap = currentNSMap;
		el.localNSMap = localNSMap;
		//parseStack.push(el);
		return true;
	}
};
function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
	if (/^(?:script|textarea)$/i.test(tagName)) {
		var elEndStart = source.indexOf('</' + tagName + '>', elStartEnd);
		var text = source.substring(elStartEnd + 1, elEndStart);
		if (/[&<]/.test(text)) {
			if (/^script$/i.test(tagName)) {
				//if(!/\]\]>/.test(text)){
				//lexHandler.startCDATA();
				domBuilder.characters(text, 0, text.length);
				//lexHandler.endCDATA();
				return elEndStart;
				//}
			} //}else{//text area
			text = text.replace(/&#?\w+;/g, entityReplacer);
			domBuilder.characters(text, 0, text.length);
			return elEndStart;
			//}
		}
	}
	return elStartEnd + 1;
}
function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
	//if(tagName in closeMap){
	var pos = closeMap[tagName];
	if (pos == null) {
		//console.log(tagName)
		pos = source.lastIndexOf('</' + tagName + '>');
		if (pos < elStartEnd) {
			//忘记闭合
			pos = source.lastIndexOf('</' + tagName);
		}
		closeMap[tagName] = pos;
	}
	return pos < elStartEnd;
	//} 
}
function _copy(source, target) {
	for (var n in source) {
		target[n] = source[n];
	}
}
function parseDCC(source, start, domBuilder, errorHandler) {
	//sure start with '<!'
	var next = source.charAt(start + 2);
	switch (next) {
		case '-':
			if (source.charAt(start + 3) === '-') {
				var end = source.indexOf('-->', start + 4);
				//append comment source.substring(4,end)//<!--
				if (end > start) {
					domBuilder.comment(source, start + 4, end - start - 4);
					return end + 3;
				} else {
					errorHandler.error("Unclosed comment");
					return -1;
				}
			} else {
				//error
				return -1;
			}
		default:
			if (source.substr(start + 3, 6) == 'CDATA[') {
				var end = source.indexOf(']]>', start + 9);
				domBuilder.startCDATA();
				domBuilder.characters(source, start + 9, end - start - 9);
				domBuilder.endCDATA();
				return end + 3;
			}
			//<!DOCTYPE
			//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
			var matchs = split(source, start);
			var len = matchs.length;
			if (len > 1 && /!doctype/i.test(matchs[0][0])) {
				var name = matchs[1][0];
				var pubid = len > 3 && /^public$/i.test(matchs[2][0]) && matchs[3][0];
				var sysid = len > 4 && matchs[4][0];
				var lastMatch = matchs[len - 1];
				domBuilder.startDTD(name, pubid && pubid.replace(/^(['"])(.*?)\1$/, '$2'), sysid && sysid.replace(/^(['"])(.*?)\1$/, '$2'));
				domBuilder.endDTD();

				return lastMatch.index + lastMatch[0].length;
			}
	}
	return -1;
}

function parseInstruction(source, start, domBuilder) {
	var end = source.indexOf('?>', start);
	if (end) {
		var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
		if (match) {
			var len = match[0].length;
			domBuilder.processingInstruction(match[1], match[2]);
			return end + 2;
		} else {
			//error
			return -1;
		}
	}
	return -1;
}

/**
 * @param source
 */
function ElementAttributes(source) {}
ElementAttributes.prototype = {
	setTagName: function setTagName(tagName) {
		if (!tagNamePattern.test(tagName)) {
			throw new Error('invalid tagName:' + tagName);
		}
		this.tagName = tagName;
	},
	add: function add(qName, value, offset) {
		if (!tagNamePattern.test(qName)) {
			throw new Error('invalid attribute:' + qName);
		}
		this[this.length++] = { qName: qName, value: value, offset: offset };
	},
	length: 0,
	getLocalName: function getLocalName(i) {
		return this[i].localName;
	},
	getLocator: function getLocator(i) {
		return this[i].locator;
	},
	getQName: function getQName(i) {
		return this[i].qName;
	},
	getURI: function getURI(i) {
		return this[i].uri;
	},
	getValue: function getValue(i) {
		return this[i].value;
	}
	//	,getIndex:function(uri, localName)){
	//		if(localName){
	//			
	//		}else{
	//			var qName = uri
	//		}
	//	},
	//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
	//	getType:function(uri,localName){}
	//	getType:function(i){},
};

function split(source, start) {
	var match;
	var buf = [];
	var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
	reg.lastIndex = start;
	reg.exec(source); //skip <
	while (match = reg.exec(source)) {
		buf.push(match);
		if (match[1]) return buf;
	}
}
if (typeof require == 'function') {
	window.XMLReader = XMLReader;
}

/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */

function copy(src, dest) {
	for (var p in src) {
		dest[p] = src[p];
	}
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class, Super) {
	var pt = Class.prototype;
	if (!(pt instanceof Super)) {
		var t = function t() {};

		;
		t.prototype = Super.prototype;
		t = new t();
		copy(pt, t);
		Class.prototype = pt = t;
	}
	if (pt.constructor != Class) {
		if (typeof Class != 'function') {
			console.error("unknow Class:" + Class);
		}
		pt.constructor = Class;
	}
}
var htmlns = 'http://www.w3.org/1999/xhtml';
// Node Types
var NodeType = {};
var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
var TEXT_NODE = NodeType.TEXT_NODE = 3;
var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
var NOTATION_NODE = NodeType.NOTATION_NODE = 12;

// ExceptionCode
var ExceptionCode = {};
var ExceptionMessage = {};
var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
//level2
var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);

function DOMException(code, message) {
	if (message instanceof Error) {
		var error = message;
	} else {
		error = this;
		Error.call(this, ExceptionMessage[code]);
		this.message = ExceptionMessage[code];
		if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
	}
	error.code = code;
	if (message) this.message = this.message + ": " + message;
	return error;
};
DOMException.prototype = Error.prototype;
copy(ExceptionCode, DOMException);
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {};
NodeList.prototype = {
	/**
  * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
  * @standard level1
  */
	length: 0,
	/**
  * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
  * @standard level1
  * @param index  unsigned long 
  *   Index into the collection.
  * @return Node
  * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
  */
	item: function item(index) {
		return this[index] || null;
	},
	toString: function toString(isHTML, nodeFilter) {
		for (var buf = [], i = 0; i < this.length; i++) {
			serializeToString(this[i], buf, isHTML, nodeFilter);
		}
		return buf.join('');
	}
};
function LiveNodeList(node, refresh) {
	this._node = node;
	this._refresh = refresh;
	_updateLiveList(this);
}
function _updateLiveList(list) {
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if (list._inc != inc) {
		var ls = list._refresh(list._node);
		//console.log(ls.length)
		__set__(list, 'length', ls.length);
		copy(ls, list);
		list._inc = inc;
	}
}
LiveNodeList.prototype.item = function (i) {
	_updateLiveList(this);
	return this[i];
};

_extends(LiveNodeList, NodeList);
/**
 * 
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities 
 */
function NamedNodeMap() {};

function _findNodeIndex(list, node) {
	var i = list.length;
	while (i--) {
		if (list[i] === node) {
			return i;
		}
	}
}

function _addNamedNode(el, list, newAttr, oldAttr) {
	if (oldAttr) {
		list[_findNodeIndex(list, oldAttr)] = newAttr;
	} else {
		list[list.length++] = newAttr;
	}
	if (el) {
		newAttr.ownerElement = el;
		var doc = el.ownerDocument;
		if (doc) {
			oldAttr && _onRemoveAttribute(doc, el, oldAttr);
			_onAddAttribute(doc, el, newAttr);
		}
	}
}
function _removeNamedNode(el, list, attr) {
	//console.log('remove attr:'+attr)
	var i = _findNodeIndex(list, attr);
	if (i >= 0) {
		var lastIndex = list.length - 1;
		while (i < lastIndex) {
			list[i] = list[++i];
		}
		list.length = lastIndex;
		if (el) {
			var doc = el.ownerDocument;
			if (doc) {
				_onRemoveAttribute(doc, el, attr);
				attr.ownerElement = null;
			}
		}
	} else {
		throw DOMException(NOT_FOUND_ERR, new Error(el.tagName + '@' + attr));
	}
}
NamedNodeMap.prototype = {
	length: 0,
	item: NodeList.prototype.item,
	getNamedItem: function getNamedItem(key) {
		//		if(key.indexOf(':')>0 || key == 'xmlns'){
		//			return null;
		//		}
		//console.log()
		var i = this.length;
		while (i--) {
			var attr = this[i];
			//console.log(attr.nodeName,key)
			if (attr.nodeName == key) {
				return attr;
			}
		}
	},
	setNamedItem: function setNamedItem(attr) {
		var el = attr.ownerElement;
		if (el && el != this._ownerElement) {
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		var oldAttr = this.getNamedItem(attr.nodeName);
		_addNamedNode(this._ownerElement, this, attr, oldAttr);
		return oldAttr;
	},
	/* returns Node */
	setNamedItemNS: function setNamedItemNS(attr) {
		// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
		var el = attr.ownerElement,
		    oldAttr;
		if (el && el != this._ownerElement) {
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
		_addNamedNode(this._ownerElement, this, attr, oldAttr);
		return oldAttr;
	},

	/* returns Node */
	removeNamedItem: function removeNamedItem(key) {
		var attr = this.getNamedItem(key);
		_removeNamedNode(this._ownerElement, this, attr);
		return attr;
	}, // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR

	//for level2
	removeNamedItemNS: function removeNamedItemNS(namespaceURI, localName) {
		var attr = this.getNamedItemNS(namespaceURI, localName);
		_removeNamedNode(this._ownerElement, this, attr);
		return attr;
	},
	getNamedItemNS: function getNamedItemNS(namespaceURI, localName) {
		var i = this.length;
		while (i--) {
			var node = this[i];
			if (node.localName == localName && node.namespaceURI == namespaceURI) {
				return node;
			}
		}
		return null;
	}
};
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation( /* Object */features) {
	this._features = {};
	if (features) {
		for (var feature in features) {
			this._features = features[feature];
		}
	}
};

DOMImplementation.prototype = {
	hasFeature: function hasFeature( /* string */feature, /* string */version) {
		var versions = this._features[feature.toLowerCase()];
		if (versions && (!version || version in versions)) {
			return true;
		} else {
			return false;
		}
	},
	// Introduced in DOM Level 2:
	createDocument: function createDocument(namespaceURI, qualifiedName, doctype) {
		// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
		var doc = new Document();
		doc.implementation = this;
		doc.childNodes = new NodeList();
		doc.doctype = doctype;
		if (doctype) {
			doc.appendChild(doctype);
		}
		if (qualifiedName) {
			var root = doc.createElementNS(namespaceURI, qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	// Introduced in DOM Level 2:
	createDocumentType: function createDocumentType(qualifiedName, publicId, systemId) {
		// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
		var node = new DocumentType();
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId;
		node.systemId = systemId;
		// Introduced in DOM Level 2:
		//readonly attribute DOMString        internalSubset;

		//TODO:..
		//  readonly attribute NamedNodeMap     entities;
		//  readonly attribute NamedNodeMap     notations;
		return node;
	}
};

/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {};

Node.prototype = {
	firstChild: null,
	lastChild: null,
	previousSibling: null,
	nextSibling: null,
	attributes: null,
	parentNode: null,
	childNodes: null,
	ownerDocument: null,
	nodeValue: null,
	namespaceURI: null,
	prefix: null,
	localName: null,
	// Modified in DOM Level 2:
	insertBefore: function insertBefore(newChild, refChild) {
		//raises 
		return _insertBefore(this, newChild, refChild);
	},
	replaceChild: function replaceChild(newChild, oldChild) {
		//raises 
		this.insertBefore(newChild, oldChild);
		if (oldChild) {
			this.removeChild(oldChild);
		}
	},
	removeChild: function removeChild(oldChild) {
		return _removeChild(this, oldChild);
	},
	appendChild: function appendChild(newChild) {
		return this.insertBefore(newChild, null);
	},
	hasChildNodes: function hasChildNodes() {
		return this.firstChild != null;
	},
	cloneNode: function cloneNode(deep) {
		return _cloneNode(this.ownerDocument || this, this, deep);
	},
	// Modified in DOM Level 2:
	normalize: function normalize() {
		var child = this.firstChild;
		while (child) {
			var next = child.nextSibling;
			if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
				this.removeChild(next);
				child.appendData(next.data);
			} else {
				child.normalize();
				child = next;
			}
		}
	},
	// Introduced in DOM Level 2:
	isSupported: function isSupported(feature, version) {
		return this.ownerDocument.implementation.hasFeature(feature, version);
	},
	// Introduced in DOM Level 2:
	hasAttributes: function hasAttributes() {
		return this.attributes.length > 0;
	},
	lookupPrefix: function lookupPrefix(namespaceURI) {
		var el = this;
		while (el) {
			var map = el._nsMap;
			//console.dir(map)
			if (map) {
				for (var n in map) {
					if (map[n] == namespaceURI) {
						return n;
					}
				}
			}
			el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
		}
		return null;
	},
	// Introduced in DOM Level 3:
	lookupNamespaceURI: function lookupNamespaceURI(prefix) {
		var el = this;
		while (el) {
			var map = el._nsMap;
			//console.dir(map)
			if (map) {
				if (prefix in map) {
					return map[prefix];
				}
			}
			el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
		}
		return null;
	},
	// Introduced in DOM Level 3:
	isDefaultNamespace: function isDefaultNamespace(namespaceURI) {
		var prefix = this.lookupPrefix(namespaceURI);
		return prefix == null;
	}
};

function _xmlEncoder(c) {
	return c == '<' && '&lt;' || c == '>' && '&gt;' || c == '&' && '&amp;' || c == '"' && '&quot;' || '&#' + c.charCodeAt() + ';';
}

copy(NodeType, Node);
copy(NodeType, Node.prototype);

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node, callback) {
	if (callback(node)) {
		return true;
	}
	if (node = node.firstChild) {
		do {
			if (_visitNode(node, callback)) {
				return true;
			}
		} while (node = node.nextSibling);
	}
}

function Document() {}
function _onAddAttribute(doc, el, newAttr) {
	doc && doc._inc++;
	var ns = newAttr.namespaceURI;
	if (ns == 'http://www.w3.org/2000/xmlns/') {
		//update namespace
		el._nsMap[newAttr.prefix ? newAttr.localName : ''] = newAttr.value;
	}
}
function _onRemoveAttribute(doc, el, newAttr, remove) {
	doc && doc._inc++;
	var ns = newAttr.namespaceURI;
	if (ns == 'http://www.w3.org/2000/xmlns/') {
		//update namespace
		delete el._nsMap[newAttr.prefix ? newAttr.localName : ''];
	}
}
function _onUpdateChild(doc, el, newChild) {
	if (doc && doc._inc) {
		doc._inc++;
		//update childNodes
		var cs = el.childNodes;
		if (newChild) {
			cs[cs.length++] = newChild;
		} else {
			//console.log(1)
			var child = el.firstChild;
			var i = 0;
			while (child) {
				cs[i++] = child;
				child = child.nextSibling;
			}
			cs.length = i;
		}
	}
}

/**
 * attributes;
 * children;
 * 
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */
function _removeChild(parentNode, child) {
	var previous = child.previousSibling;
	var next = child.nextSibling;
	if (previous) {
		previous.nextSibling = next;
	} else {
		parentNode.firstChild = next;
	}
	if (next) {
		next.previousSibling = previous;
	} else {
		parentNode.lastChild = previous;
	}
	_onUpdateChild(parentNode.ownerDocument, parentNode);
	return child;
}
/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode, newChild, nextChild) {
	var cp = newChild.parentNode;
	if (cp) {
		cp.removeChild(newChild); //remove and update
	}
	if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
		var newFirst = newChild.firstChild;
		if (newFirst == null) {
			return newChild;
		}
		var newLast = newChild.lastChild;
	} else {
		newFirst = newLast = newChild;
	}
	var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

	newFirst.previousSibling = pre;
	newLast.nextSibling = nextChild;

	if (pre) {
		pre.nextSibling = newFirst;
	} else {
		parentNode.firstChild = newFirst;
	}
	if (nextChild == null) {
		parentNode.lastChild = newLast;
	} else {
		nextChild.previousSibling = newLast;
	}
	do {
		newFirst.parentNode = parentNode;
	} while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
	_onUpdateChild(parentNode.ownerDocument || parentNode, parentNode);
	//console.log(parentNode.lastChild.nextSibling == null)
	if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
		newChild.firstChild = newChild.lastChild = null;
	}
	return newChild;
}
function _appendSingleChild(parentNode, newChild) {
	var cp = newChild.parentNode;
	if (cp) {
		var pre = parentNode.lastChild;
		cp.removeChild(newChild); //remove and update
		var pre = parentNode.lastChild;
	}
	var pre = parentNode.lastChild;
	newChild.parentNode = parentNode;
	newChild.previousSibling = pre;
	newChild.nextSibling = null;
	if (pre) {
		pre.nextSibling = newChild;
	} else {
		parentNode.firstChild = newChild;
	}
	parentNode.lastChild = newChild;
	_onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
	return newChild;
	//console.log("__aa",parentNode.lastChild.nextSibling == null)
}
Document.prototype = {
	//implementation : null,
	nodeName: '#document',
	nodeType: DOCUMENT_NODE,
	doctype: null,
	documentElement: null,
	_inc: 1,

	insertBefore: function insertBefore(newChild, refChild) {
		//raises 
		if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
			var child = newChild.firstChild;
			while (child) {
				var next = child.nextSibling;
				this.insertBefore(child, refChild);
				child = next;
			}
			return newChild;
		}
		if (this.documentElement == null && newChild.nodeType == ELEMENT_NODE) {
			this.documentElement = newChild;
		}

		return _insertBefore(this, newChild, refChild), newChild.ownerDocument = this, newChild;
	},
	removeChild: function removeChild(oldChild) {
		if (this.documentElement == oldChild) {
			this.documentElement = null;
		}
		return _removeChild(this, oldChild);
	},
	// Introduced in DOM Level 2:
	importNode: function importNode(importedNode, deep) {
		return _importNode(this, importedNode, deep);
	},
	// Introduced in DOM Level 2:
	getElementById: function getElementById(id) {
		var rtv = null;
		_visitNode(this.documentElement, function (node) {
			if (node.nodeType == ELEMENT_NODE) {
				if (node.getAttribute('id') == id) {
					rtv = node;
					return true;
				}
			}
		});
		return rtv;
	},

	//document factory method:
	createElement: function createElement(tagName) {
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		node.childNodes = new NodeList();
		var attrs = node.attributes = new NamedNodeMap();
		attrs._ownerElement = node;
		return node;
	},
	createDocumentFragment: function createDocumentFragment() {
		var node = new DocumentFragment();
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		return node;
	},
	createTextNode: function createTextNode(data) {
		var node = new Text();
		node.ownerDocument = this;
		node.appendData(data);
		return node;
	},
	createComment: function createComment(data) {
		var node = new Comment();
		node.ownerDocument = this;
		node.appendData(data);
		return node;
	},
	createCDATASection: function createCDATASection(data) {
		var node = new CDATASection();
		node.ownerDocument = this;
		node.appendData(data);
		return node;
	},
	createProcessingInstruction: function createProcessingInstruction(target, data) {
		var node = new ProcessingInstruction();
		node.ownerDocument = this;
		node.tagName = node.target = target;
		node.nodeValue = node.data = data;
		return node;
	},
	createAttribute: function createAttribute(name) {
		var node = new Attr();
		node.ownerDocument = this;
		node.name = name;
		node.nodeName = name;
		node.localName = name;
		node.specified = true;
		return node;
	},
	createEntityReference: function createEntityReference(name) {
		var node = new EntityReference();
		node.ownerDocument = this;
		node.nodeName = name;
		return node;
	},
	// Introduced in DOM Level 2:
	createElementNS: function createElementNS(namespaceURI, qualifiedName) {
		var node = new Element();
		var pl = qualifiedName.split(':');
		var attrs = node.attributes = new NamedNodeMap();
		node.childNodes = new NodeList();
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.tagName = qualifiedName;
		node.namespaceURI = namespaceURI;
		if (pl.length == 2) {
			node.prefix = pl[0];
			node.localName = pl[1];
		} else {
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		attrs._ownerElement = node;
		return node;
	},
	// Introduced in DOM Level 2:
	createAttributeNS: function createAttributeNS(namespaceURI, qualifiedName) {
		var node = new Attr();
		var pl = qualifiedName.split(':');
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
		node.namespaceURI = namespaceURI;
		node.specified = true;
		if (pl.length == 2) {
			node.prefix = pl[0];
			node.localName = pl[1];
		} else {
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		return node;
	}
};
_extends(Document, Node);

function Element() {
	this._nsMap = {};
};
Element.prototype = {
	nodeType: ELEMENT_NODE,
	hasAttribute: function hasAttribute(name) {
		return this.getAttributeNode(name) != null;
	},
	getAttribute: function getAttribute(name) {
		var attr = this.getAttributeNode(name);
		return attr && attr.value || '';
	},
	getAttributeNode: function getAttributeNode(name) {
		return this.attributes.getNamedItem(name);
	},
	setAttribute: function setAttribute(name, value) {
		var attr = this.ownerDocument.createAttribute(name);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr);
	},
	removeAttribute: function removeAttribute(name) {
		var attr = this.getAttributeNode(name);
		attr && this.removeAttributeNode(attr);
	},

	//four real opeartion method
	appendChild: function appendChild(newChild) {
		if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
			return this.insertBefore(newChild, null);
		} else {
			return _appendSingleChild(this, newChild);
		}
	},
	setAttributeNode: function setAttributeNode(newAttr) {
		return this.attributes.setNamedItem(newAttr);
	},
	setAttributeNodeNS: function setAttributeNodeNS(newAttr) {
		return this.attributes.setNamedItemNS(newAttr);
	},
	removeAttributeNode: function removeAttributeNode(oldAttr) {
		//console.log(this == oldAttr.ownerElement)
		return this.attributes.removeNamedItem(oldAttr.nodeName);
	},
	//get real attribute name,and remove it by removeAttributeNode
	removeAttributeNS: function removeAttributeNS(namespaceURI, localName) {
		var old = this.getAttributeNodeNS(namespaceURI, localName);
		old && this.removeAttributeNode(old);
	},

	hasAttributeNS: function hasAttributeNS(namespaceURI, localName) {
		return this.getAttributeNodeNS(namespaceURI, localName) != null;
	},
	getAttributeNS: function getAttributeNS(namespaceURI, localName) {
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr && attr.value || '';
	},
	setAttributeNS: function setAttributeNS(namespaceURI, qualifiedName, value) {
		var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr);
	},
	getAttributeNodeNS: function getAttributeNodeNS(namespaceURI, localName) {
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},

	getElementsByTagName: function getElementsByTagName(tagName) {
		return new LiveNodeList(this, function (base) {
			var ls = [];
			_visitNode(base, function (node) {
				if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)) {
					ls.push(node);
				}
			});
			return ls;
		});
	},
	getElementsByTagNameNS: function getElementsByTagNameNS(namespaceURI, localName) {
		return new LiveNodeList(this, function (base) {
			var ls = [];
			_visitNode(base, function (node) {
				if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)) {
					ls.push(node);
				}
			});
			return ls;
		});
	}
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;

_extends(Element, Node);
function Attr() {};
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr, Node);

function CharacterData() {};
CharacterData.prototype = {
	data: '',
	substringData: function substringData(offset, count) {
		return this.data.substring(offset, offset + count);
	},
	appendData: function appendData(text) {
		text = this.data + text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function insertData(offset, text) {
		this.replaceData(offset, 0, text);
	},
	appendChild: function appendChild(newChild) {
		throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
	},
	deleteData: function deleteData(offset, count) {
		this.replaceData(offset, count, "");
	},
	replaceData: function replaceData(offset, count, text) {
		var start = this.data.substring(0, offset);
		var end = this.data.substring(offset + count);
		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
	}
};
_extends(CharacterData, Node);
function Text() {};
Text.prototype = {
	nodeName: "#text",
	nodeType: TEXT_NODE,
	splitText: function splitText(offset) {
		var text = this.data;
		var newText = text.substring(offset);
		text = text.substring(0, offset);
		this.data = this.nodeValue = text;
		this.length = text.length;
		var newNode = this.ownerDocument.createTextNode(newText);
		if (this.parentNode) {
			this.parentNode.insertBefore(newNode, this.nextSibling);
		}
		return newNode;
	}
};
_extends(Text, CharacterData);
function Comment() {};
Comment.prototype = {
	nodeName: "#comment",
	nodeType: COMMENT_NODE
};
_extends(Comment, CharacterData);

function CDATASection() {};
CDATASection.prototype = {
	nodeName: "#cdata-section",
	nodeType: CDATA_SECTION_NODE
};
_extends(CDATASection, CharacterData);

function DocumentType() {};
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType, Node);

function Notation() {};
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation, Node);

function Entity() {};
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity, Node);

function EntityReference() {};
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference, Node);

function DocumentFragment() {};
DocumentFragment.prototype.nodeName = "#document-fragment";
DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment, Node);

function ProcessingInstruction() {}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction, Node);
function XMLSerializer() {}
XMLSerializer.prototype.serializeToString = function (node, isHtml, nodeFilter) {
	return nodeSerializeToString.call(node, isHtml, nodeFilter);
};
Node.prototype.toString = nodeSerializeToString;
function nodeSerializeToString(isHtml, nodeFilter) {
	var buf = [];
	var refNode = this.nodeType == 9 && this.documentElement || this;
	var prefix = refNode.prefix;
	var uri = refNode.namespaceURI;

	if (uri && prefix == null) {
		//console.log(prefix)
		var prefix = refNode.lookupPrefix(uri);
		if (prefix == null) {
			//isHTML = true;
			var visibleNamespaces = [{ namespace: uri, prefix: null
				//{namespace:uri,prefix:''}
			}];
		}
	}
	serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
	//console.log('###',this.nodeType,uri,prefix,buf.join(''))
	return buf.join('');
}
function needNamespaceDefine(node, isHTML, visibleNamespaces) {
	var prefix = node.prefix || '';
	var uri = node.namespaceURI;
	if (!prefix && !uri) {
		return false;
	}
	if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" || uri == 'http://www.w3.org/2000/xmlns/') {
		return false;
	}

	var i = visibleNamespaces.length;
	//console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
	while (i--) {
		var ns = visibleNamespaces[i];
		// get namespace prefix
		//console.log(node.nodeType,node.tagName,ns.prefix,prefix)
		if (ns.prefix == prefix) {
			return ns.namespace != uri;
		}
	}
	//console.log(isHTML,uri,prefix=='')
	//if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
	//	return false;
	//}
	//node.flag = '11111'
	//console.error(3,true,node.flag,node.prefix,node.namespaceURI)
	return true;
}
function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
	if (nodeFilter) {
		node = nodeFilter(node);
		if (node) {
			if (typeof node == 'string') {
				buf.push(node);
				return;
			}
		} else {
			return;
		}
		//buf.sort.apply(attrs, attributeSorter);
	}
	switch (node.nodeType) {
		case ELEMENT_NODE:
			if (!visibleNamespaces) visibleNamespaces = [];
			var startVisibleNamespaces = visibleNamespaces.length;
			var attrs = node.attributes;
			var len = attrs.length;
			var child = node.firstChild;
			var nodeName = node.tagName;

			isHTML = htmlns === node.namespaceURI || isHTML;
			buf.push('<', nodeName);

			for (var i = 0; i < len; i++) {
				// add namespaces for attributes
				var attr = attrs.item(i);
				if (attr.prefix == 'xmlns') {
					visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
				} else if (attr.nodeName == 'xmlns') {
					visibleNamespaces.push({ prefix: '', namespace: attr.value });
				}
			}
			for (var i = 0; i < len; i++) {
				var attr = attrs.item(i);
				if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
					var prefix = attr.prefix || '';
					var uri = attr.namespaceURI;
					var ns = prefix ? ' xmlns:' + prefix : " xmlns";
					buf.push(ns, '="', uri, '"');
					visibleNamespaces.push({ prefix: prefix, namespace: uri });
				}
				serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
			}
			// add namespace for current node		
			if (needNamespaceDefine(node, isHTML, visibleNamespaces)) {
				var prefix = node.prefix || '';
				var uri = node.namespaceURI;
				var ns = prefix ? ' xmlns:' + prefix : " xmlns";
				buf.push(ns, '="', uri, '"');
				visibleNamespaces.push({ prefix: prefix, namespace: uri });
			}

			if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
				buf.push('>');
				//if is cdata child node
				if (isHTML && /^script$/i.test(nodeName)) {
					while (child) {
						if (child.data) {
							buf.push(child.data);
						} else {
							serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
						}
						child = child.nextSibling;
					}
				} else {
					while (child) {
						serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
						child = child.nextSibling;
					}
				}
				buf.push('</', nodeName, '>');
			} else {
				buf.push('/>');
			}
			// remove added visible namespaces
			//visibleNamespaces.length = startVisibleNamespaces;
			return;
		case DOCUMENT_NODE:
		case DOCUMENT_FRAGMENT_NODE:
			var child = node.firstChild;
			while (child) {
				serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
				child = child.nextSibling;
			}
			return;
		case ATTRIBUTE_NODE:
			return buf.push(' ', node.name, '="', node.value.replace(/[<&"]/g, _xmlEncoder), '"');
		case TEXT_NODE:
			return buf.push(node.data.replace(/[<&]/g, _xmlEncoder));
		case CDATA_SECTION_NODE:
			return buf.push('<![CDATA[', node.data, ']]>');
		case COMMENT_NODE:
			return buf.push("<!--", node.data, "-->");
		case DOCUMENT_TYPE_NODE:
			var pubid = node.publicId;
			var sysid = node.systemId;
			buf.push('<!DOCTYPE ', node.name);
			if (pubid) {
				buf.push(' PUBLIC "', pubid);
				if (sysid && sysid != '.') {
					buf.push('" "', sysid);
				}
				buf.push('">');
			} else if (sysid && sysid != '.') {
				buf.push(' SYSTEM "', sysid, '">');
			} else {
				var sub = node.internalSubset;
				if (sub) {
					buf.push(" [", sub, "]");
				}
				buf.push(">");
			}
			return;
		case PROCESSING_INSTRUCTION_NODE:
			return buf.push("<?", node.target, " ", node.data, "?>");
		case ENTITY_REFERENCE_NODE:
			return buf.push('&', node.nodeName, ';');
		//case ENTITY_NODE:
		//case NOTATION_NODE:
		default:
			buf.push('??', node.nodeName);
	}
}
function _importNode(doc, node, deep) {
	var node2;
	switch (node.nodeType) {
		case ELEMENT_NODE:
			node2 = node.cloneNode(false);
			node2.ownerDocument = doc;
		//var attrs = node2.attributes;
		//var len = attrs.length;
		//for(var i=0;i<len;i++){
		//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
		//}
		case DOCUMENT_FRAGMENT_NODE:
			break;
		case ATTRIBUTE_NODE:
			deep = true;
			break;
		//case ENTITY_REFERENCE_NODE:
		//case PROCESSING_INSTRUCTION_NODE:
		////case TEXT_NODE:
		//case CDATA_SECTION_NODE:
		//case COMMENT_NODE:
		//	deep = false;
		//	break;
		//case DOCUMENT_NODE:
		//case DOCUMENT_TYPE_NODE:
		//cannot be imported.
		//case ENTITY_NODE:
		//case NOTATION_NODE：
		//can not hit in level3
		//default:throw e;
	}
	if (!node2) {
		node2 = node.cloneNode(false); //false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if (deep) {
		var child = node.firstChild;
		while (child) {
			node2.appendChild(_importNode(doc, child, deep));
			child = child.nextSibling;
		}
	}
	return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function _cloneNode(doc, node, deep) {
	var node2 = new node.constructor();
	for (var n in node) {
		var v = node[n];
		if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) != 'object') {
			if (v != node2[n]) {
				node2[n] = v;
			}
		}
	}
	if (node.childNodes) {
		node2.childNodes = new NodeList();
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
		case ELEMENT_NODE:
			var attrs = node.attributes;
			var attrs2 = node2.attributes = new NamedNodeMap();
			var len = attrs.length;
			attrs2._ownerElement = node2;
			for (var i = 0; i < len; i++) {
				node2.setAttributeNode(_cloneNode(doc, attrs.item(i), true));
			}
			break;;
		case ATTRIBUTE_NODE:
			deep = true;
	}
	if (deep) {
		var child = node.firstChild;
		while (child) {
			node2.appendChild(_cloneNode(doc, child, deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

function __set__(object, key, value) {
	object[key] = value;
}
//do dynamic
try {
	if (Object.defineProperty) {
		var getTextContent = function getTextContent(node) {
			switch (node.nodeType) {
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					var buf = [];
					node = node.firstChild;
					while (node) {
						if (node.nodeType !== 7 && node.nodeType !== 8) {
							buf.push(getTextContent(node));
						}
						node = node.nextSibling;
					}
					return buf.join('');
				default:
					return node.nodeValue;
			}
		};

		Object.defineProperty(LiveNodeList.prototype, 'length', {
			get: function get() {
				_updateLiveList(this);
				return this.$$length;
			}
		});
		Object.defineProperty(Node.prototype, 'textContent', {
			get: function get() {
				return getTextContent(this);
			},
			set: function set(data) {
				switch (this.nodeType) {
					case ELEMENT_NODE:
					case DOCUMENT_FRAGMENT_NODE:
						while (this.firstChild) {
							this.removeChild(this.firstChild);
						}
						if (data || String(data)) {
							this.appendChild(this.ownerDocument.createTextNode(data));
						}
						break;
					default:
						//TODO:
						this.data = data;
						this.value = data;
						this.nodeValue = data;
				}
			}
		});

		__set__ = function __set__(object, key, value) {
			//console.log(value)
			object['$$' + key] = value;
		};
	}
} catch (e) {//ie8
}

if (typeof require == 'function') {
	window.DOMImplementation = DOMImplementation;
	window.XMLSerializer = XMLSerializer;
}

function DOMParser(options) {
	this.options = options || { locator: {} };
}

DOMParser.prototype.parseFromString = function (source, mimeType) {
	var options = this.options;
	var sax = new XMLReader();
	var domBuilder = options.domBuilder || new DOMHandler(); //contentHandler and LexicalHandler
	var errorHandler = options.errorHandler;
	var locator = options.locator;
	var defaultNSMap = options.xmlns || {};
	var isHTML = /\/x?html?$/.test(mimeType); //mimeType.toLowerCase().indexOf('html') > -1;
	var entityMap = isHTML ? htmlEntity.entityMap : { 'lt': '<', 'gt': '>', 'amp': '&', 'quot': '"', 'apos': "'" };
	if (locator) {
		domBuilder.setDocumentLocator(locator);
	}

	sax.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
	sax.domBuilder = options.domBuilder || domBuilder;
	if (isHTML) {
		defaultNSMap[''] = 'http://www.w3.org/1999/xhtml';
	}
	defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';
	if (source) {
		sax.parse(source, defaultNSMap, entityMap);
	} else {
		sax.errorHandler.error("invalid doc source");
	}
	return domBuilder.doc;
};
function buildErrorHandler(errorImpl, domBuilder, locator) {
	if (!errorImpl) {
		if (domBuilder instanceof DOMHandler) {
			return domBuilder;
		}
		errorImpl = domBuilder;
	}
	var errorHandler = {};
	var isCallback = errorImpl instanceof Function;
	locator = locator || {};
	function build(key) {
		var fn = errorImpl[key];
		if (!fn && isCallback) {
			fn = errorImpl.length == 2 ? function (msg) {
				errorImpl(key, msg);
			} : errorImpl;
		}
		errorHandler[key] = fn && function (msg) {
			fn('[xmldom ' + key + ']\t' + msg + _locator(locator));
		} || function () {};
	}
	build('warning');
	build('error');
	build('fatalError');
	return errorHandler;
}

//console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler 
 * 
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
	this.cdata = false;
}
function position(locator, node) {
	node.lineNumber = locator.lineNumber;
	node.columnNumber = locator.columnNumber;
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */
DOMHandler.prototype = {
	startDocument: function startDocument() {
		this.doc = new DOMImplementation().createDocument(null, null, null);
		if (this.locator) {
			this.doc.documentURI = this.locator.systemId;
		}
	},
	startElement: function startElement(namespaceURI, localName, qName, attrs) {
		var doc = this.doc;
		var el = doc.createElementNS(namespaceURI, qName || localName);
		var len = attrs.length;
		appendElement(this, el);
		this.currentElement = el;

		this.locator && position(this.locator, el);
		for (var i = 0; i < len; i++) {
			var namespaceURI = attrs.getURI(i);
			var value = attrs.getValue(i);
			var qName = attrs.getQName(i);
			var attr = doc.createAttributeNS(namespaceURI, qName);
			this.locator && position(attrs.getLocator(i), attr);
			attr.value = attr.nodeValue = value;
			el.setAttributeNode(attr);
		}
	},
	endElement: function endElement(namespaceURI, localName, qName) {
		var current = this.currentElement;
		var tagName = current.tagName;
		this.currentElement = current.parentNode;
	},
	startPrefixMapping: function startPrefixMapping(prefix, uri) {},
	endPrefixMapping: function endPrefixMapping(prefix) {},
	processingInstruction: function processingInstruction(target, data) {
		var ins = this.doc.createProcessingInstruction(target, data);
		this.locator && position(this.locator, ins);
		appendElement(this, ins);
	},
	ignorableWhitespace: function ignorableWhitespace(ch, start, length) {},
	characters: function characters(chars, start, length) {
		chars = _toString.apply(this, arguments);
		//console.log(chars)
		if (chars) {
			if (this.cdata) {
				var charNode = this.doc.createCDATASection(chars);
			} else {
				var charNode = this.doc.createTextNode(chars);
			}
			if (this.currentElement) {
				this.currentElement.appendChild(charNode);
			} else if (/^\s*$/.test(chars)) {
				this.doc.appendChild(charNode);
				//process xml
			}
			this.locator && position(this.locator, charNode);
		}
	},
	skippedEntity: function skippedEntity(name) {},
	endDocument: function endDocument() {
		this.doc.normalize();
	},
	setDocumentLocator: function setDocumentLocator(locator) {
		if (this.locator = locator) {
			// && !('lineNumber' in locator)){
			locator.lineNumber = 0;
		}
	},
	//LexicalHandler
	comment: function comment(chars, start, length) {
		chars = _toString.apply(this, arguments);
		var comm = this.doc.createComment(chars);
		this.locator && position(this.locator, comm);
		appendElement(this, comm);
	},

	startCDATA: function startCDATA() {
		//used in characters() methods
		this.cdata = true;
	},
	endCDATA: function endCDATA() {
		this.cdata = false;
	},

	startDTD: function startDTD(name, publicId, systemId) {
		var impl = this.doc.implementation;
		if (impl && impl.createDocumentType) {
			var dt = impl.createDocumentType(name, publicId, systemId);
			this.locator && position(this.locator, dt);
			appendElement(this, dt);
		}
	},
	/**
  * @see org.xml.sax.ErrorHandler
  * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
  */
	warning: function warning(error) {
		console.warn('[xmldom warning]\t' + error, _locator(this.locator));
	},
	error: function error(_error) {
		console.error('[xmldom error]\t' + _error, _locator(this.locator));
	},
	fatalError: function fatalError(error) {
		console.error('[xmldom fatalError]\t' + error, _locator(this.locator));
		throw error;
	}
};
function _locator(l) {
	if (l) {
		return '\n@' + (l.systemId || '') + '#[line:' + l.lineNumber + ',col:' + l.columnNumber + ']';
	}
}
function _toString(chars, start, length) {
	if (typeof chars == 'string') {
		return chars.substr(start, length);
	} else {
		//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
		if (chars.length >= start + length || start) {
			return new java.lang.String(chars, start, length) + '';
		}
		return chars;
	}
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function (key) {
	DOMHandler.prototype[key] = function () {
		return null;
	};
});

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement(hander, node) {
	if (!hander.currentElement) {
		hander.doc.appendChild(node);
	} else {
		hander.currentElement.appendChild(node);
	}
} //appendChild and setAttributeNS are preformance key


var htmlEntity = {};
htmlEntity.entityMap = entityMap;

window.Parser = { DOMParser: DOMParser };