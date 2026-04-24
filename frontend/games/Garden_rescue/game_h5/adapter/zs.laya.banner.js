window.zs = window.zs || {}, window.zs.laya = window.zs.laya || {}, function(e, r) {
    "use strict";
    class s {
        constructor(e, r) {
            this.initData(), this.adUnitId = e, this.adIntervals = r, this.canShowBannerAd = this.isCanShowBannerAd();
        }
        initData() {
            this.baseSize = {
                w: 750,
                h: 1334
            }, this.bannerAd = null, this.adUnitId = null, this.showType = s.BOTTOM_RIGHT, this.showMode = s.MODE_BOTTOM_TOUCH, 
            this.exposureSize = {
                w: 1,
                h: 1
            }, this.errorReLoadTimes = 3, this.reLoadDelay = 500, this.realSize = {
                w: 1,
                h: 1
            }, this.showTimes = 0, this.showExposureTimes = 0, this.preStyle = {
                left: 0,
                top: 0,
                width: 1,
                height: 1
            };
        }
        setBaseSize(e, r) {
            this.baseSize.w = e, this.baseSize.h = r;
        }
        setShowType(e) {
            this.showType = e;
        }
        setShowMode(e) {
            this.showMode = e;
        }
        setExposureSize(e, r) {
            this.exposureSize.w = e, this.exposureSize.h = r;
        }
        setBannerRect(e, r, s, t) {
            this.preStyle.top = e, this.preStyle.left = r, this.preStyle.width = s, this.preStyle.height = t;
        }
        createBanner() {
            if (this.canShowBannerAd) {
                var e = window.screen.availHeight, r = window.screen.availWidth / this.baseSize.w, s = e / this.baseSize.h, t = this.preStyle.top * s, i = this.preStyle.height * s, n = this.preStyle.left * r, h = this.preStyle.width * r;
                if (console.log("=============createBanner start...:=============", this.adUnitId, t, n, h), 
                null == this.bannerAd && (this.bannerAd = wx.createBannerAd({
                    adUnitId: this.adUnitId,
                    adIntervals: this.adIntervals,
                    style: {
                        left: n,
                        top: t,
                        width: h,
                        height: i
                    }
                })), !this.bannerAd) return console.error("Banner 创建失败!", this.bannerAd), void (this.errorReLoadTimes > 0 && (this.errorReLoadTimes--, 
                setTimeout(function() {
                    this.createBanner();
                }, this.reLoadDelay)));
                this.showTimes = 0, this.showExposureTimes = 0, this.bannerAd.onError(function(e) {
                    console.error("Banner err:", e), this.errorReLoadTimes > 0 && (this.errorReLoadTimes--, 
                    setTimeout(function() {
                        this.createBanner();
                    }, this.reLoadDelay));
                }), this.bannerAd.onResize(this.onResize.bind(this));
            }
        }
        onResize(e) {
            switch (this.realSize = {
                w: e.width,
                h: e.height
            }, this.showMode) {
              case s.MODE_NONE:
                this.updatePosition();
                break;

              case s.MODE_EXPOSURE:
                this.updateExposure();
                break;

              case s.MODE_BOTTOM_TOUCH:
                this.updateBottonTouch();
            }
        }
        getOffsetY() {
            return 750 * window.screen.availHeight > 1600 * window.screen.availWidth ? 15 * window.screen.availHeight * 750 / 1600 / window.screen.availWidth : 0;
        }
        show() {
            null != this.adUnitId && (null == this.bannerAd && this.createBanner(), this.showMode = s.MODE_BOTTOM_TOUCH, 
            this.bannerAd && this.bannerAd.show(), this.showTimes++);
        }
        updateBottonTouch() {
            this.bannerAd && this.realSize && (this.bannerAd.style.left = .5 * (window.screen.availWidth - this.realSize.w), 
            this.bannerAd.style.top = window.screen.availHeight - this.realSize.h - this.getOffsetY());
        }
        updatePosition() {
            this.bannerAd && this.realSize && (this.bannerAd.style.left = .5 * (window.screen.availWidth - this.realSize.w), 
            this.bannerAd.style.top = window.screen.availHeight - this.realSize.h);
        }
        updateExposure() {
        }
        showExposure(e, t, i) {
        }
        compareVersion(e, r) {
            e = e.split("."), r = r.split(".");
            for (var s = Math.max(e.length, r.length); e.length < s; ) e.push("0");
            for (;r.length < s; ) r.push("0");
            for (var t = 0; t < s; t++) {
                var i = parseInt(e[t]), n = parseInt(r[t]);
                if (i > n) return 1;
                if (i < n) return -1;
            }
            return 0;
        }
        hide() {
            this.bannerAd && this.bannerAd.hide();
        }
        isCanShowBannerAd() {
            var e = !1;
            return e;
        }
        updateY(e) {
        }
        destroy() {
        }
    }
    s.NONE = 0, s.HCENTER = 1, s.VCENTER = 2, s.LEFT = 4, s.RIGHT = 8, s.TOP = 16, s.TOP_LEFT = 20, 
    s.TOP_RIGHT = 24, s.TOP_HCENTER = 17, s.VCENTER_LEFT = 6, s.VCENTER_RIGHT = 10, 
    s.VCENTER_HCENTER = 3, s.BOTTOM_LEFT = 36, s.BOTTOM_RIGHT = 40, s.BOTTEOM_HCENTER = 33, 
    s.MODE_NONE = 0, s.MODE_EXPOSURE = 1, s.MODE_BOTTOM_TOUCH = 2;
    class t {
        constructor(e, r) {
            this.initData(), this.bannerArray = e, this.autoChange = r, this.bannerIds = [];
            for (var s = 0; s < e.length; s++) this.bannerIds[s] = s;
            this.curShowId = zs.laya.platform.MathUtils.random(0, this.bannerArray.length), 
            this.isChanged = !0;
        }
        initData() {
            this.bannerArray = [], this.autoChange = !1, this.curShowId = -1, this.bannerIds = [], 
            this.exposureType = [], this.showExposureIds = [], this.isChanged = !1, this.isLockHide = !1, 
            this.showCountRefresh = zs.laya.platform.ADConfig.zs_banner_show_number;
        }
        onAppShow() {
            console.log("======================== onAppShow start ========================================="), 
            r.stage.off(zs.laya.platform.PlatformMgr.APP_SHOW, this, this.onAppShow), this.show(), 
            console.log("======================== onAppShow end =========================================");
        }
        onAppHide() {
            if (console.log("======================== onAppHide start ========================================="), 
            !(this.curShowId >= this.bannerArray.length)) {
                r.stage.off(zs.laya.platform.PlatformMgr.APP_HIDE, this, this.onAppHide), r.stage.on(zs.laya.platform.PlatformMgr.APP_SHOW, this, this.onAppShow);
                var e = this.bannerArray[this.curShowId];
                e.destroy(), e.createBanner(), this.isChanged = !1, this.curShowBanner = null, console.log("======================== onAppHide end =========================================");
            }
        }
        lockHide() {
            this.isLockHide = !0, this.curShowBanner && (this.hide(), this.getCurrentShowBanner());
        }
        hideResume() {
            this.isLockHide = !1, this.curShowBanner && (this.updateBottonTouch(), this.show());
        }
        lockHideExposure() {
            for (var e = 0; e < this.showExposureIds.length; e++) {
                const s = this.showExposureIds[e];
                var r = this.bannerArray[s];
                r && r.hide();
            }
        }
        hideResumeExposure() {
            for (var e = 0; e < this.showExposureIds.length; e++) {
                const s = this.showExposureIds[e];
                var r = this.bannerArray[s];
                r && r.showExposure(this.exposureType[e]);
            }
        }
        getCurrentShowBanner() {
            return this.curShowId >= this.bannerArray.length ? null : this.curShowBanner ? this.curShowBanner : (this.autoChange && !this.isChanged && this.changeBanner(), 
            this.curShowBanner = this.bannerArray[this.curShowId]);
        }
        changeBanner() {
            this.isChanged = !0;
            var e = this.curShowId;
            this.curShowId = (this.curShowId + 1) % this.bannerArray.length, this.bannerArray[this.curShowId] && this.bannerArray[this.curShowId].updateBottonTouch(), 
            this.bannerArray[this.curShowId] && this.bannerArray[this.curShowId].hide();
            var r = this.showExposureIds.indexOf(this.curShowId);
            if (-1 != r) if (e != this.curShowId) {
                this.showExposureIds[r] = e;
                var s = this.bannerArray[e];
                s && s.showExposure(this.exposureType[r]);
            } else this.showExposureIds.splice(r, 1), this.exposureType.slice(r, 1);
        }
        show() {
            var e = this.getCurrentShowBanner();
            e && !this.isLockHide && (r.stage.on(zs.laya.platform.PlatformMgr.APP_HIDE, this, this.onAppHide), 
            e.show());
        }
        updateY(e) {
            var r = this.getCurrentShowBanner();
            r && r.updateY(e);
        }
        updateBottonTouch() {
            var e = this.getCurrentShowBanner();
            e && (e ? e.updateBottonTouch() : console.log("======================== updateBottonTouch is error ========================================="));
        }
        showExposure(e) {
            console.log("======================== wxbannerGroup showExposure", e, "start=========================================");
            var r = this.bannerIds.concat();
            this.curShowBanner && this.remove(r, this.curShowId);
            for (var s = 0; s < this.showExposureIds.length; s++) {
                const e = this.showExposureIds[s];
                this.remove(r, e);
            }
            if (r.length > 0) {
                var t = r[zs.laya.platform.MathUtils.random(0, r.length)], i = this.showExposureIds.length;
                this.showExposureIds[i] = t, this.exposureType[i] = e;
                var n = this.bannerArray[t];
                n ? n.showExposure(e) : console.error("======================== wxbannerGroup showExposure wxBanner  is error", t, this.bannerIds, r, e, "end=========================================");
            }
            console.log("======================== wxbannerGroup showExposure", e, "end=========================================");
        }
        remove(e, r) {
            var s = e.indexOf(r);
            -1 != s && e.splice(s, 1);
        }
        hide() {
            if (r.stage.off(zs.laya.platform.PlatformMgr.APP_HIDE, this, this.onAppHide), r.stage.off(zs.laya.platform.PlatformMgr.APP_SHOW, this, this.onAppShow), 
            !(this.curShowId >= this.bannerArray.length)) {
                var e = this.bannerArray[this.curShowId];
                e && e.hide(), this.isChanged = !1, this.curShowBanner = null;
            }
        }
        hideExposure() {
            if (this.showExposureIds || 0 != this.showExposureIds.length) {
                for (var e = 0; e < this.showExposureIds.length; e++) {
                    const s = this.showExposureIds[e];
                    var r = this.bannerArray[s];
                    r && r.hide();
                }
                this.showExposureIds = [], this.exposureType = [];
            } else console.log("not have exposure banner is show!");
        }
        hideAll() {
            this.hide(), this.hideExposure();
        }
        destroy() {
            for (var e = 0; e < this.bannerArray.length; e++) {
                const r = this.bannerArray[e];
                r && r.destroy();
            }
            this.curShowBanner = null;
        }
    }
    class i {
        constructor() {
            this.bannerAdExposureList = [], this.adUnitIdData = [], this.wxbannerArray = [], 
            this.bannerIds = [], this.bannerGroupArray = [];
        }
        setAdUnitId(...e) {
        }
        initBannerGroupBySign(e, r, i = !1, n = !1) {
        }
        lockHide() {
            for (var e = this.bannerGroupArray.length - 1; e >= 0; e--) {
                var r = this.bannerGroupArray[e];
                r && r.lockHide();
            }
        }
        hideResume() {
            for (var e = this.bannerGroupArray.length - 1; e >= 0; e--) {
                var r = this.bannerGroupArray[e];
                r && r.hideResume();
            }
        }
        lockHideExposure() {
            for (var e = this.bannerGroupArray.length - 1; e >= 0; e--) {
                var r = this.bannerGroupArray[e];
                r && r.lockHideExposure();
            }
        }
        hideResumeExposure() {
            for (var e = this.bannerGroupArray.length - 1; e >= 0; e--) {
                var r = this.bannerGroupArray[e];
                r && r.hideResumeExposure();
            }
        }
        getBannerGroup(e) {
            var r = this.bannerGroupArray[e];
            return r || console.error("bannerGroup is error", r), this.bannerGroupArray[e];
        }
        hideBySign(...e) {
            for (var r = 0; r < e.length; r++) {
                var s = this.bannerGroupArray[e[r]];
                s && s.hide();
            }
        }
        hideExposureBySign(...e) {
            for (var r = 0; r < e.length; r++) {
                var s = this.bannerGroupArray[e[r]];
                s && s.hideExposure();
            }
        }
        hideAllBySign(...e) {
            for (var r = 0; r < e.length; r++) {
                var s = this.bannerGroupArray[e[r]];
                s && s.hideAll();
            }
        }
        hideAllShow() {
            for (var e = this.bannerGroupArray.length - 1; e >= 0; e--) {
                var r = this.bannerGroupArray[e];
                r && r.hide();
            }
        }
        hideAll() {
            for (var e = this.bannerGroupArray.length - 1; e >= 0; e--) {
                var r = this.bannerGroupArray[e];
                r && r.hideAll();
            }
        }
        destoryAll() {
            for (var e = this.bannerGroupArray.length - 1; e >= 0; e--) {
                var r = this.bannerGroupArray[e];
                r && r.destroy();
            }
        }
    }
    i.Instance = new i(), e.WxBanner = s, e.WxBannerGroup = t, e.WxBannerMgr = i;
}(window.zs.laya.banner = window.zs.laya.banner || {}, Laya);