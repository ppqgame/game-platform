window.zs = window.zs || {}, window.zs.laya = window.zs.laya || {}, function(t, i) {
    "use strict";
    class e {
        constructor() {
            this._instance = null;
        }
        static initSDK() {
            this._instance = window.zsSdk, this._instance && this._instance.init();
        }
        static destroySDK() {
            this._instance = null;
        }
        static login(t, i) {
            this._instance ? this._instance.login(t, i) : i && i.runWith({
                code: 1,
                desc: "web login"
            });
        }
        static loadSubpackage(t, i, e, n) {
            return !!this._instance && this._instance.loadSubpackage(t, i, e, n);
        }
        static initVideoAd(t) {
            this._instance && this._instance.initVideoAD && this._instance.initVideoAD(t);
        }
        static playVideo(t, n, s) {
            this._instance ? (i.stage.event(e.EVENT_AD_VIDEO_PLAY), this._instance.playVideo(i.Handler.create(null, function() {
                i.stage.event(e.EVENT_AD_VIDEO_CLOSED), t && t.run();
            }, null, !1), i.Handler.create(null, function() {
                i.stage.event(e.EVENT_AD_VIDEO_CLOSED), n && n.run();
            }, null, !1), i.Handler.create(null, function(t) {
                i.stage.event(e.EVENT_AD_VIDEO_CLOSED), s && s.runWith(t);
            }, null, !1))) : t && t.run();
        }
        static isVideoEnable() {
            return !!this._instance && this._instance.isVideoEnable();
        }
        static createUserInfoButton(t, i) {
            this._instance ? this._instance.createUserInfoButton(t, i) : i && i.runWith(null);
        }
        static hideUserInfoButton() {
            this._instance && this._instance.hideUserInfoButton();
        }
        static showUserInfoButton() {
            this._instance && this._instance.showUserInfoButton();
        }
        static destroyUserInfoButton() {
            this._instance && this._instance.destroyUserInfoButton();
        }
        static openShare(t, i) {
            this._instance ? this._instance.openShare(t, i) : console.log("share:" + t + ",img:" + i);
        }
        static initInsertAd(t, i) {
            this._instance && (this._instance.initInsertAd ? this._instance.initInsertAd(t, i) : this._instance.initFullScreenAD && this._instance.initFullScreenAD(t, i));
        }
        static loadInsertAd(t, i) {
            this._instance ? this._instance.loadInsertAd ? this._instance.loadInsertAd(t, i) : this._instance.loadFullScreenAD && this._instance.loadFullScreenAD(t, i) : i && i.runWith("null");
        }
        static showInsertAd(t) {
            this._instance ? this._instance.showInsertAd ? this._instance.showInsertAd(t) : this._instance.loadFullScreenAD && this._instance.showFullScreenAD(t) : (t && t.runWith("not in wx"), 
            console.log("showFullScreenAD:" + Date.now()));
        }
        static setUserCloudStorage(t, i, e, n) {
            if (this._instance) return this._instance.setUserCloudStorage(t, i, e, n);
            i && i.runWith(null);
        }
        static playSound(t, e, n) {
            Laya.SoundManager.playSound(t, e ? 0 : 1, n);
        }
        static stopSound(t) {
            Laya.SoundManager.stopSound(t);
        }
        static recordClip(t, i) {
            this.sdkService && this.sdkService.recordClip(t, i);
        }
    }
    e._instance = null, e.EVENT_AD_VIDEO_PLAY = "EVENT_AD_VIDEO_PLAY", e.EVENT_AD_VIDEO_CLOSED = "EVENT_AD_VIDEO_CLOSED", 
    i.ILaya.regClass(e), i.ClassUtils.regClass("zs.laya.sdk.SdkService", e), i.ClassUtils.regClass("Zhise.SdkService", e);
    class n {
        constructor() {}
        static initDevice() {
            n.device = window.zsDevice, n.device && (n.device.init(), n.device.onShow(i.Handler.create(null, function(t) {
                i.stage.event(n.EVENT_ON_SHOW, t);
            }, null, !1)), n.device.onHide(i.Handler.create(null, function() {
                i.stage.event(n.EVENT_ON_HIDE);
            }, null, !1)));
        }
        static statusBarHeight() {
            return this.device ? this.device.statusBarHeight() : 0;
        }
        static screenWidth() {
            return this.device ? this.device.screenWidth() : i.stage.width;
        }
        static screenHeight() {
            return this.device ? this.device.screenHeight() : i.stage.height;
        }
        static VibrateShort() {
            this.device ? this.device.vibrateShort() : "undefined" != typeof navigator && "vibrate" in navigator ? navigator.vibrate(500) : console.log("vibrateShort");
        }
        static VibrateLong() {
            this.device ? this.device.vibrateLong() : "undefined" != typeof navigator && "vibrate" in navigator ? navigator.vibrate(1e3) : console.log("VibrateLong");
        }
        static IsNetValid() {
            return this.device ? this.device.isNetValid() : navigator.onLine;
        }
    }
    n.device = null, n.EVENT_ON_RESUME = "DEVICE_ON_RESUME", n.EVENT_ON_HIDE = "DEVICE_ON_HIDE", 
    n.EVENT_ON_SHOW = "DEVICE_ON_SHOW", i.ILaya.regClass(n), i.ClassUtils.regClass("zs.laya.sdk.DeviceService", n), 
    i.ClassUtils.regClass("Zhise.DeviceService", n);
    class s {
        constructor() {}
        static loadConfig(t, i) {
            // this.Instance.loadConfig(t, i);
        }
        static init(t, i) {
            this.Instance.init(t, i);
        }
        static sendVideoLog() {
            this.Instance.sendVideoLog();
        }
        static loadAd(t) {
            this.Instance.loadAd(t);
        }
        static navigate2Mini(t, i, e, n, s) {
            this.Instance.navigate2Mini(t, i, e, n, s);
        }
        static get Instance() {
            return this.initialized || (this.initialized = !0, zs.reportSdk ? this.instance = zs.reportSdk : this.instance = {
                loadConfig: function(t, i) {
                    i && i(), console.log("zs.sdk is undefined");
                },
                init: function(t, i) {
                    console.log("zs.sdk.init"), console.log("zs.sdk is undefined");
                },
                sendVideoLog: function() {
                    console.log("zs.sdk.sendVideoLog"), console.log("zs.sdk is undefined");
                },
                loadAd: function(t) {
                    t && t({
                        promotion: [],
                        indexLeft: [],
                        endPage: [],
                        backAd: []
                    }), console.log("zs.sdk is undefined");
                },
                navigate2Mini: function(t, i, e, n, s) {
                    n && n(), s && s(), console.log("zs.sdk is undefined");
                }
            }), this.instance;
        }
    }
    s.instance = null, s.initialized = !1, i.ClassUtils.regClass("zs.laya.sdk.ZSReportSdk", s), 
    t.SdkService = e, t.DeviceService = n, t.ZSReportSdk = s;
}(window.zs.laya.sdk = window.zs.laya.sdk || {}, Laya);