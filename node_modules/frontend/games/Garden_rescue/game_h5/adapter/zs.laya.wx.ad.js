var conf = window.zs.wx, reportSdk = function() {
    var n = {}, e = conf.adApiUrl, t = function(n, e) {
        return n << e | n >>> 32 - e;
    }, o = function(n, e) {
        var t, o, i, a, r;
        return i = 2147483648 & n, a = 2147483648 & e, r = (1073741823 & n) + (1073741823 & e), 
        (t = 1073741824 & n) & (o = 1073741824 & e) ? 2147483648 ^ r ^ i ^ a : t | o ? 1073741824 & r ? 3221225472 ^ r ^ i ^ a : 1073741824 ^ r ^ i ^ a : r ^ i ^ a;
    }, i = function(n, e, i, a, r, s, u) {
        return n = o(n, o(o(function(n, e, t) {
            return n & e | ~n & t;
        }(e, i, a), r), u)), o(t(n, s), e);
    }, a = function(n, e, i, a, r, s, u) {
        return n = o(n, o(o(function(n, e, t) {
            return n & t | e & ~t;
        }(e, i, a), r), u)), o(t(n, s), e);
    }, r = function(n, e, i, a, r, s, u) {
        return n = o(n, o(o(function(n, e, t) {
            return n ^ e ^ t;
        }(e, i, a), r), u)), o(t(n, s), e);
    }, s = function(n, e, i, a, r, s, u) {
        return n = o(n, o(o(function(n, e, t) {
            return e ^ (n | ~t);
        }(e, i, a), r), u)), o(t(n, s), e);
    }, u = function(n) {
        var e, t = "", o = "";
        for (e = 0; e <= 3; e++) t += (o = "0" + (n >>> 8 * e & 255).toString(16)).substr(o.length - 2, 2);
        return t;
    }, p = function(n) {
        var e, t, p, c, l, d, f, g, h, m = Array();
        for (m = function(n) {
            for (var e, t = n.length, o = t + 8, i = 16 * ((o - o % 64) / 64 + 1), a = Array(i - 1), r = 0, s = 0; s < t; ) r = s % 4 * 8, 
            a[e = (s - s % 4) / 4] = a[e] | n.charCodeAt(s) << r, s++;
            return r = s % 4 * 8, a[e = (s - s % 4) / 4] = a[e] | 128 << r, a[i - 2] = t << 3, 
            a[i - 1] = t >>> 29, a;
        }(n = function(n) {
            n = n.replace(/\x0d\x0a/g, "\n");
            for (var e = "", t = 0; t < n.length; t++) {
                var o = n.charCodeAt(t);
                o < 128 ? e += String.fromCharCode(o) : o > 127 && o < 2048 ? (e += String.fromCharCode(o >> 6 | 192), 
                e += String.fromCharCode(63 & o | 128)) : (e += String.fromCharCode(o >> 12 | 224), 
                e += String.fromCharCode(o >> 6 & 63 | 128), e += String.fromCharCode(63 & o | 128));
            }
            return e;
        }(n)), d = 1732584193, f = 4023233417, g = 2562383102, h = 271733878, e = 0; e < m.length; e += 16) t = d, 
        p = f, c = g, l = h, d = i(d, f, g, h, m[e + 0], 7, 3614090360), h = i(h, d, f, g, m[e + 1], 12, 3905402710), 
        g = i(g, h, d, f, m[e + 2], 17, 606105819), f = i(f, g, h, d, m[e + 3], 22, 3250441966), 
        d = i(d, f, g, h, m[e + 4], 7, 4118548399), h = i(h, d, f, g, m[e + 5], 12, 1200080426), 
        g = i(g, h, d, f, m[e + 6], 17, 2821735955), f = i(f, g, h, d, m[e + 7], 22, 4249261313), 
        d = i(d, f, g, h, m[e + 8], 7, 1770035416), h = i(h, d, f, g, m[e + 9], 12, 2336552879), 
        g = i(g, h, d, f, m[e + 10], 17, 4294925233), f = i(f, g, h, d, m[e + 11], 22, 2304563134), 
        d = i(d, f, g, h, m[e + 12], 7, 1804603682), h = i(h, d, f, g, m[e + 13], 12, 4254626195), 
        g = i(g, h, d, f, m[e + 14], 17, 2792965006), f = i(f, g, h, d, m[e + 15], 22, 1236535329), 
        d = a(d, f, g, h, m[e + 1], 5, 4129170786), h = a(h, d, f, g, m[e + 6], 9, 3225465664), 
        g = a(g, h, d, f, m[e + 11], 14, 643717713), f = a(f, g, h, d, m[e + 0], 20, 3921069994), 
        d = a(d, f, g, h, m[e + 5], 5, 3593408605), h = a(h, d, f, g, m[e + 10], 9, 38016083), 
        g = a(g, h, d, f, m[e + 15], 14, 3634488961), f = a(f, g, h, d, m[e + 4], 20, 3889429448), 
        d = a(d, f, g, h, m[e + 9], 5, 568446438), h = a(h, d, f, g, m[e + 14], 9, 3275163606), 
        g = a(g, h, d, f, m[e + 3], 14, 4107603335), f = a(f, g, h, d, m[e + 8], 20, 1163531501), 
        d = a(d, f, g, h, m[e + 13], 5, 2850285829), h = a(h, d, f, g, m[e + 2], 9, 4243563512), 
        g = a(g, h, d, f, m[e + 7], 14, 1735328473), f = a(f, g, h, d, m[e + 12], 20, 2368359562), 
        d = r(d, f, g, h, m[e + 5], 4, 4294588738), h = r(h, d, f, g, m[e + 8], 11, 2272392833), 
        g = r(g, h, d, f, m[e + 11], 16, 1839030562), f = r(f, g, h, d, m[e + 14], 23, 4259657740), 
        d = r(d, f, g, h, m[e + 1], 4, 2763975236), h = r(h, d, f, g, m[e + 4], 11, 1272893353), 
        g = r(g, h, d, f, m[e + 7], 16, 4139469664), f = r(f, g, h, d, m[e + 10], 23, 3200236656), 
        d = r(d, f, g, h, m[e + 13], 4, 681279174), h = r(h, d, f, g, m[e + 0], 11, 3936430074), 
        g = r(g, h, d, f, m[e + 3], 16, 3572445317), f = r(f, g, h, d, m[e + 6], 23, 76029189), 
        d = r(d, f, g, h, m[e + 9], 4, 3654602809), h = r(h, d, f, g, m[e + 12], 11, 3873151461), 
        g = r(g, h, d, f, m[e + 15], 16, 530742520), f = r(f, g, h, d, m[e + 2], 23, 3299628645), 
        d = s(d, f, g, h, m[e + 0], 6, 4096336452), h = s(h, d, f, g, m[e + 7], 10, 1126891415), 
        g = s(g, h, d, f, m[e + 14], 15, 2878612391), f = s(f, g, h, d, m[e + 5], 21, 4237533241), 
        d = s(d, f, g, h, m[e + 12], 6, 1700485571), h = s(h, d, f, g, m[e + 3], 10, 2399980690), 
        g = s(g, h, d, f, m[e + 10], 15, 4293915773), f = s(f, g, h, d, m[e + 1], 21, 2240044497), 
        d = s(d, f, g, h, m[e + 8], 6, 1873313359), h = s(h, d, f, g, m[e + 15], 10, 4264355552), 
        g = s(g, h, d, f, m[e + 6], 15, 2734768916), f = s(f, g, h, d, m[e + 13], 21, 1309151649), 
        d = s(d, f, g, h, m[e + 4], 6, 4149444226), h = s(h, d, f, g, m[e + 11], 10, 3174756917), 
        g = s(g, h, d, f, m[e + 2], 15, 718787259), f = s(f, g, h, d, m[e + 9], 21, 3951481745), 
        d = o(d, t), f = o(f, p), g = o(g, c), h = o(h, l);
        return (u(d) + u(f) + u(g) + u(h)).toLowerCase();
    }, c = function(n, e) {
        e = e || !0;
        for (var t = Object.keys(n).sort(), o = "", i = 0; i < t.length; i++) o += t[i] + ":" + n[t[i]];
        e && (o += conf.secret);
        var a = p(o);
        return a = a.toLowerCase();
    }, l = function(n) {
        var e = m("zsAd");
        switch (n) {
          case "1":
            return e.more;

          case "2":
            return e.promotion;

          case "3":
            return e.indexFloat;

          case "7":
            return e.indexLeft;

          case "8":
            return e.gameFloat;

          case "9":
            return e.endPage;

          case "11":
            return e.indexLeftFloat;

          case "12":
            return e.backAd;

          case "13":
            return e.iosLinkAd;
        }
        return null;
    }, d = function(n, e) {
        var t = l(n);
        if (null == t) return console.error("custom link is null"), null;
        for (var o = 0; o < t.length; o++) if (t[o].appid == e) return t[o];
    }, f = function(n, e, t, o, i, a) {
        if ("undefined" == typeof wx) {
            var r = new XMLHttpRequest();
            r.onreadystatechange = function() {
                if (4 == r.readyState) {
                    var n = r.responseText;
                    if (r.status >= 200 && r.status < 400) {
                        var e = {};
                        try {
                            e = JSON.parse(n);
                        } catch (e) {
                            console.error("json parse error ", n), i && i(e);
                        }
                        o && o(e);
                    } else console.error("error ", n), i && i(n);
                }
            }, r.timeout = 3e3, r.ontimeout = function(n) {
                console.error("error ", n), i && i(n);
            }, r.open(t, n, !0), "POST" == t ? (r.open("POST", n), r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
            r.send(function(n) {
                var e = [];
                for (var t in n) e.push(t + "=" + n[t]);
                return e.join("&");
            }(e))) : r.send();
        } else wx.request({
            url: n,
            data: e,
            header: {
                "content-type": "application/json"
            },
            method: t,
            success: function(n) {
                o && o(n.data);
            },
            fail: function(n) {
                i && i(n);
            },
            complete: function(n) {
                a && a(n);
            }
        });
    }, g = function(e, t) {
        n.zsStorage = n.zsStorage || {}, n.zsStorage[e] = t;
    }, h = function(e) {
        return n.zsStorage = n.zsStorage || {}, n.zsStorage[e];
    }, m = function(n, e) {
        if (e) {
            var t = h(n + "_time");
            return null == t || Date.now() - Number(t) < e ? h(n) : null;
        }
        return h(n);
    }, C = function(n, e) {
        g(n, e), g(n + "_time", Date.now());
    }, v = function(n) {
        return "function" == typeof n;
    }, I = function(e, t) {
        if ("3" == e.app_type) {
            var o = h(e.appid);
            g(e.appid, null == o ? 1 : Number(o) + 1);
        }
        var i, a, r, s, u, p;
        "undefined" != typeof wx && (i = e.app_id, a = t, r = Math.round(new Date().getTime() / 1e3).toString(), 
        s = {
            user_id: a,
            from_id: conf.appId,
            to_id: i,
            timestamp: r
        }, u = c(s), p = Object.assign({}, s, {
            sign: u
        }), f("", p, "POST", function() {}, function() {
            console.log("appad_new/collect fail");
        }, function() {
            console.log("appad_new/collect complete");
        }), function(e) {
            if (conf.uploadLog) if (null != n.userId) {
                var t = {
                    appid: conf.appId,
                    from_appid: n.srcAppId,
                    to_appid: e,
                    user_id: n.userId
                };
                f("", t, "POST", function() {}, function() {
                    console.log('jump_log/app_to" fail');
                }, function() {
                    console.log('jump_log/app_to" complete');
                });
            } else console.error("userId is null");
        }(e.appid));
    };
    n.userId = null, n.platformId = null, n.srcAppId = "", n.launchScene = "", n.adJumpNum = null, 
    n.adJumpAppId = null, n.isEnableExportAdLinkId = "0", n.init = function(e, t) {
        if (console.log("zsAdSdk.init"), this.userId = e, this.platformId = t, "undefined" == typeof wx) this.launchScene = 1038, 
        this.srcAppId = ""; else {
            var o = wx.getLaunchOptionsSync();
            this.launchScene = o.scene ? o.scene : "", this.srcAppId = o.referrerInfo && o.referrerInfo.appId ? o.referrerInfo.appId : "";
        }
        !function() {
            if (conf.uploadLog) if (null != n.userId) {
                var e = {
                    appid: conf.appId,
                    from_appid: n.srcAppId,
                    user_id: n.userId,
                    scene: n.launchScene
                };
                f("", e, "POST", function() {}, function() {
                    console.log('jump_log/app_from" fail');
                }, function() {
                    console.log('jump_log/app_from" complete');
                });
            } else console.error("userId is null");
        }();
    }, n.sendVideoLog = function() {
        if (conf.uploadLog) if (null != this.userId) {
            var n = {
                appid: conf.appId,
                from_appid: this.srcAppId,
                user_id: this.userId
            };
            f("", n, "POST", function() {}, function() {
                console.log('jump_log/app_video" fail');
            }, function() {
                console.log('jump_log/app_video" complete');
            });
        } else console.error("userId is null");
    }, n.cfgCbList = [], n.inCfgRequest = !1, n.loadConfig = function(t, o) {
        var i = e, a = Math.round(new Date().getTime() / 1e3).toString(), r = 0;
        if ("undefined" != typeof wx) {
            var s = wx.getLaunchOptionsSync();
            r = s && s.scene || 0;
        }
        var u = {
            appid: conf.appId,
            timestamp: a,
            scene: r
        }, p = c(u), l = Object.assign({}, u, {
            sign: p
        }), d = m("zsCfg", 6e4);
        d ? v(t) && t(d) : this.inCfgRequest ? this.cfgCbList.push({
            success: t,
            fail: o
        }) : (this.inCfgRequest = !0, this.cfgCbList.push({
            success: t,
            fail: o
        }), f(i, l, "POST", function(e) {
            var t = e.data;
            C("zsCfg", t), n.adJumpNum = t.zs_ad_jump_num, n.adJumpAppId = t.zs_jump_appid, 
            n.isEnableExportAdLinkId = t.zs_export_ad_switch;
            for (var o = 0; o < n.cfgCbList.length; o++) v(n.cfgCbList[o].success) && n.cfgCbList[o].success(t);
            n.cfgCbList = [], n.inCfgRequest = !1;
        }, function(e) {
            for (var t = 0; t < n.cfgCbList.length; t++) v(n.cfgCbList[t].fail) && n.cfgCbList[t].fail(e);
            n.cfgCbList = [], n.inCfgRequest = !1;
        }, function(e) {
            n.cfgCbList = [], n.inCfgRequest = !1, console.log("post loadConfig complete");
        }));
    }, n.adCbList = [], n.inAdRequest = !1, n.loadAd = function(e) {
        var t = m("zsAd", 6e4);
        if (t) e(t); else if (this.inAdRequest) this.adCbList.push(e); else {
            this.inAdRequest = !0, this.adCbList.push(e);
            var o = Math.round(new Date().getTime() / 1e3).toString(), i = {
                appid: conf.appId,
                timestamp: o
            }, a = c(i), r = Object.assign({}, i, {
                sign: a
            });
            f("", r, "POST", function(e) {
                for (var t in n.inAdRequest = !1, e.data) {
                    e.data[t].sort(function() {
                        return Math.random() > .5 ? 1 : -1;
                    });
                }
                var o = {
                    more: e.data["position-1"] || [],
                    promotion: e.data["position-2"] || [],
                    indexFloat: e.data["position-3"] || [],
                    banner: e.data["position-4"] || [],
                    indexLeft: e.data["position-7"] || [],
                    gameFloat: e.data["position-8"] || [],
                    endPage: e.data["position-9"] || [],
                    indexLeftFloat: e.data["position-11"] || [],
                    backAd: e.data["position-12"] || [],
                    iosLinkAd: e.data["position-13"] || []
                };
                C("zsAd", o);
                for (var i = 0; i < n.adCbList.length; i++) v(n.adCbList[i]) && n.adCbList[i](o);
                n.adCbList = [];
            }, function(e) {
                n.inAdRequest = !1, console.log("requestAdData fail");
                for (var t = {
                    more: [],
                    promotion: [],
                    indexFloat: [],
                    banner: [],
                    indexLeft: [],
                    gameFloat: [],
                    endPage: [],
                    indexLeftFloat: [],
                    backAd: [],
                    iosLinkAd: []
                }, o = 0; o < n.adCbList.length; o++) v(n.adCbList[o]) && n.adCbList[o](t);
                n.adCbList = [];
            }, function(n) {
                console.log("requestAdData complete");
            });
        }
    }, n.navigate2Mini = function(n, e, t, o, i) {
        var a = n;
        if (null != this.adJumpNum && "3" == a.app_type) try {
            var r = h(a.appid);
            if (r = null != r ? Number(r) : 0, console.log(a.appid + ":" + r + "," + this.adJumpNum), 
            Number(r) + 1 >= this.adJumpNum) {
                if (1 == this.platformId) {
                    var s = m("zsAd");
                    if (s.iosLinkAd.length > 0) {
                        var u = s.iosLinkAd[Math.floor(s.iosLinkAd.length * Math.random())];
                        console.log("jump:" + JSON.stringify(u)), a = d(a.position_type, u.appid);
                    } else this.adJumpAppId ? (console.log("jump:" + this.adJumpAppId), a = d(a.position_type, this.adJumpAppId)) : console.log("jump self");
                } else console.log("jump link in Android"), a = function(n) {
                    var e = l(n);
                    if (null == e) return console.error("box is null"), null;
                    for (var t = 0; t < e.length; t++) if ("4" == e[t].app_type) return e[t];
                    return console.error("box is null"), null;
                }(a.position_type);
                null == a && (a = n);
            }
        } catch (n) {
            console.error(n);
        }
        if ("undefined" == typeof wx) return v(o) && o(), void (v(i) && i());
        a.extraData = a.extraData || {}, wx.navigateToMiniProgram({
            appId: a.appid,
            path: a.link_path,
            extraData: a.extraData,
            success: function(n) {
                I(a, e), v(t) && t();
            },
            fail: function(n) {
                v(o) && o();
            },
            complete: function(n) {
                v(i) && i();
            }
        });
    }, n.getShareCard = function(n, e) {
        var t = Math.round(new Date().getTime() / 1e3).toString(), o = {
            appid: conf.appId,
            timestamp: t
        }, i = c(o), a = Object.assign({}, o, {
            sign: i
        });
        f("", a, "POST", function(t) {
            v(n) && t && t.data ? n(t.data.card) : v(e) && e(t);
        }, function(n) {
            v(e) && e(n);
        }, function(n) {
            console.log("post GetShareCard complete!");
        });
    }, n.collectShareCardClick = function(n, e, t, o) {
        var i = Math.round(new Date().getTime() / 1e3).toString(), a = {
            appid: conf.appId,
            card_id: n,
            user_id: e,
            timestamp: i
        }, r = c(a), s = Object.assign({}, a, {
            sign: r
        });
        f("", s, "POST", function(n) {
            v(t) && t(n);
        }, function(n) {
            v(o) && o(n);
        }, function(n) {
            console.log("post CollectShareCardClick complete!");
        });
    };
    var _ = [ 1011, 1012, 1013, 1025, 1031, 1032, 1047, 1048, 1049, 1124, 1125, 1126 ];
    n.launchInfo = null, n.isExportValid = function() {
        return !(this.launchInfo && _.indexOf(this.launchInfo.scene) >= 0) && (null == this.launchInfo || null == this.launchInfo.query || this.launchInfo.query.customLink != this.isEnableExportAdLinkId);
    }, n.isFromLink = function() {
        return this.launchInfo && _.indexOf(this.launchInfo.scene) >= 0 ? (console.log("open by code"), 
        !0) : null != this.launchInfo && null != this.launchInfo.query && null != this.launchInfo.query.customLink;
    };
    return "undefined" == typeof wx || (n.launchInfo = wx.getLaunchOptionsSync(), console.log("scene:" + n.launchInfo.scene), 
    n.isFromLink() && console.log("open by link")), n;
}(), theEnv = "undefined" != typeof window ? window : global;

theEnv.zs = theEnv.zs || {}, theEnv.zs.reportSdk = reportSdk;