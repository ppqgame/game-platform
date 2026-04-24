window.zs = window.zs || {}, window.zs.laya = window.zs.laya || {}, function(e, t) {
    "use strict";
    class s extends t.Script {
        constructor() {
            super();
        }
        static setUserID(e, t) {
            s.user_id = e, s.is_new = t;
        }
        static initCFG(e) {
            this.platformCfg = e, this.adViewUrl = {
                screenAd: "view/ad/FullAd_1.scene",
                floatAd: "view/ad/FloatAd.scene",
                listAd: "view/ad/FullAd.scene",
                knockEggAd: "view/ad/KnockEgg.scene"
            }, this.adViewScript = {
                screenAd: E,
                floatAd: v,
                listAd: E,
                knockEggAd: S
            }, this.currentView = "";
        }
        static initSoundUrl(e, t) {
            this.openSound = e, this.clickSound = t;
        }
        static initGameAd() {
            zs.laya.sdk.SdkService.initVideoAd(a.zs_video_adunit), zs.laya.sdk.SdkService.initInsertAd(a.zs_full_screen_adunit, null);
        }
        static enterGamePopup() {}
        static onGameFaildPopUp(e) {
            a.isBeforeGameAccount() ? (t.stage.on(s.UI_VIEW_CLOSED, null, s.onHideExportView, [ 0, e ]), 
            s.showListAd()) : t.stage.event(s.OPEN_FAILED_VIEW, [ e ]);
        }
        static onGameWinPopUp(e) {
            a.isBeforeGameAccount() ? (s.showListAd(), t.stage.on(s.UI_VIEW_CLOSED, null, s.onHideExportView, [ 1, e ])) : t.stage.event(s.OPEN_WIN_VIEW, [ e ]);
        }
        static onHideExportView(e, i, n) {
            if ("FullAd" == n) 0 == e ? t.stage.event(s.OPEN_FAILED_VIEW, [ i ]) : 1 == e && t.stage.event(s.OPEN_WIN_VIEW, [ i ]), 
            t.stage.off(s.UI_VIEW_CLOSED, null, s.onHideExportView); else if ("FullAd_1" == n && 2 == e && i.viewName == n) {
                t.stage.event(s.GAME_RESET_START), t.stage.off(s.UI_VIEW_CLOSED, null, s.onHideExportView);
                var r = !!i.isBackHome && i.isBackHome;
                a.isPublicVersion() && a.zs_switch && a.zs_auto_pop_ups_switch && r && s.showHomeFloatAd();
            }
        }
        static onGameOverPopUp(e) {
            if (a.isAfterGameAccount()) {
                var i = s.adViewUrl.screenAd;
                i = i.substring(i.lastIndexOf("/") + 1, i.lastIndexOf(".")), t.stage.on(s.UI_VIEW_CLOSED, null, s.onHideExportView, [ 2, {
                    viewName: i,
                    isBackHome: e.isBackHome
                } ]), s.showScreenAd(e);
            } else t.stage.event(s.GAME_RESET_START);
        }
        static showInsertAd() {
            if (a.zs_full_screen_ad_enable) {
                var e = t.LocalStorage.getItem("zs_full_screen_ad_time_stamp");
                if (null == e || "" == e || 0 == i.isToday(Number(e))) {
                    var s = this;
                    zs.laya.sdk.SdkService.loadInsertAd(t.Handler.create(null, function() {
                        s.gameState == GameState.STATE_UNBEGIN && (zs.laya.sdk.SdkService.showInsertAd(null), 
                        t.LocalStorage.setItem("zs_full_screen_ad_time_stamp", Date.now().toString()));
                    }), null);
                }
            }
        }
        static onExportJumpCancel() {
            a.zs_jump_switch && a.isPublicVersion() && a.zs_full_screen_jump && a.zs_slide_jump_switch && s.showScreenAd();
        }
        static initView(e, s, i) {
            if (e instanceof t.View && (e._gameData = i, s)) {
                var a = e.getComponent(s);
                null == a && (a = e.addComponent(s)), a.initView && a.initView(i);
            }
        }
        static showScreenAd(e) {
            this.currentView != this.adViewUrl.screenAd && (null != this.adViewUrl.screenAd ? (this.currentView = this.adViewUrl.screenAd, 
            t.Scene.open(this.adViewUrl.screenAd, !1, e, t.Handler.create(this, function(t) {
                this.initView(t, this.adViewScript.screenAd, e);
            })), Laya.SoundManager.playSound(this.openSound)) : console.error("showScreenAd error"));
        }
        static hideScreenAd() {
            null != this.adViewUrl.screenAd && (this.currentView = "", t.Scene.close(this.adViewUrl.screenAd));
        }
        static showListAd(e) {
            // this.initView(null, this.adViewScript.listAd, e)
            this.currentView != this.adViewUrl.listAd && (null != this.adViewUrl.listAd ? (this.currentView = this.adViewUrl.listAd, 
            t.Scene.open(this.adViewUrl.listAd, !1, e, t.Handler.create(this, function(t) {
                this.initView(t, this.adViewScript.listAd, e);
            })), Laya.SoundManager.playSound(this.openSound)) : console.error("showListAd error"));
        }
        static hideListAd() {
            null != this.adViewUrl.listAd && (this.currentView = "", t.Scene.close(this.adViewUrl.listAd));
        }
        static showHomeFloatAd(e) {
            this.currentView != this.adViewUrl.floatAd && (null != this.adViewUrl.floatAd ? (this.currentView = this.adViewUrl.floatAd, 
            t.Scene.open(this.adViewUrl.floatAd, !1, e, t.Handler.create(this, function(t) {
                this.initView(t, this.adViewScript.floatAd, e);
            })), Laya.SoundManager.playSound(this.openSound)) : console.error("showHomeFloatAd error"));
        }
        static hideHomeFloatAd() {
            null != this.adViewUrl.floatAd && (this.currentView = "", t.Scene.close(this.adViewUrl.floatAd));
        }
        static showKnockEggView(e) {
            this.currentView != this.adViewUrl.knockEggAd && (null != this.adViewUrl.knockEggAd ? (this.currentView = this.adViewUrl.knockEggAd, 
            t.Scene.open(this.adViewUrl.knockEggAd, !1, e, t.Handler.create(this, function(t) {
                this.initView(t, this.adViewScript.knockEggAd, e);
            }))) : console.error("knockEggAd error"));
        }
        static hideKnockEggAd() {
            null != this.adViewUrl.knockEggAd && (this.currentView = "", t.Scene.close(this.adViewUrl.knockEggAd));
        }
    }
    s.platformCfg = null, s.user_id = 1, s.is_new = 1, s.APP_SHOW = "DEVICE_ON_SHOW", 
    s.APP_HIDE = "DEVICE_ON_HIDE", s.AD_CONFIIG_LOADED = "AD_CONFIIG_LOADED", s.UI_VIEW_OPENED = "UI_VIEW_OPENED", 
    s.UI_VIEW_CLOSED = "UI_VIEW_CLOSED", s.OPEN_WIN_VIEW = "OPEN_WIN_VIEW", s.OPEN_FAILED_VIEW = "OPEN_FAILED_VIEW", 
    s.GAME_RESET_START = "GAME_RESET_START", s.EGG_GET_AWARD = "EGG_GET_AWARD", t.ILaya.regClass(s), 
    t.ClassUtils.regClass("zs.laya.platform.PlatformMgr", s), t.ClassUtils.regClass("Zhise.PlatformMgr", s);
    class i {
        static compareVersion(e, t) {
            e = e.split("."), t = t.split(".");
            for (var s = Math.max(e.length, t.length); e.length < s; ) e.push("0");
            for (;t.length < s; ) t.push("0");
            for (var i = 0; i < s; i++) {
                var a = parseInt(e[i]), n = parseInt(t[i]);
                if (a > n) return 1;
                if (a < n) return -1;
            }
            return 0;
        }
        static isToday(e) {
            var t = new Date(Date.now()), s = new Date(e);
            return t.getFullYear() == s.getFullYear() && t.getMonth() == s.getMonth() && t.getDate() == s.getDate();
        }
        static random(e, t) {
            return Math.random() * (t - e) + e << 0;
        }
        static IsNumber(e) {
            return !(!/^\d+(\.\d+)?$/.test(e) && !/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/.test(e));
        }
    }
    class a {
        constructor() {
            this.current_version = "1.0";
        }
        static initAdSetting(e, s) {
            this.current_version = e, this.response = s;
            var n = s.zs_banner_system ? String(s.zs_banner_system).toUpperCase() : null;
            this.zs_version = s.zs_number ? s.zs_number : "0.0";
            var r = !n || !t.Browser.onMobile || !(-1 != n.indexOf("ANDROID") && t.Browser.onAndroid || -1 != n.indexOf("IOS") && !t.Browser.onAndroid);
            this.zs_switch = 1 == s.zs_switch && r && this.isPublicVersion(), this.egg_switch = 1 == s.zs_switch && this.isPublicVersion(), 
            this.zs_video_adunit = s.zs_video_adunit, this.zs_banner_adunit = s.zs_banner_adunit, 
            this.zs_full_screen_adunit = s.zs_full_screen_adunit, this.zs_full_screen_ad_enable = 1 == s.zs_full_screen_ad, 
            this.zs_banner_text_time = s.zs_banner_text_time ? Number(s.zs_banner_text_time) : 1e3, 
            this.zs_banner_banner_time = s.zs_banner_banner_time ? Number(s.zs_banner_banner_time) : 1e3, 
            this.zs_banner_refresh_time = s.zs_banner_refresh_time ? Number(s.zs_banner_refresh_time) : 1e3, 
            this.zs_banner_move_time = s.zs_banner_move_time ? Number(s.zs_banner_move_time) : 1e3, 
            this.zs_banner_vertical_enable = 1 == s.zs_banner_vertical_enable, this.zs_banner_horizontal_enable = 1 == s.zs_banner_horizontal_enable, 
            this.zs_share_title = s.zs_share_title, this.zs_share_image = s.zs_share_img, this.zs_shield_gdt_export = 1 == s.zs_shield_gdt_export, 
            this.zs_jump_switch = 1 == s.zs_jump_switch && (0 == zs.laya.sdk.ZSReportSdk.Instance.isFromLink() || this.zs_shield_gdt_export), 
            this.zs_revive_type = s.zs_revive_type, this.zs_revive_click_num = s.zs_revive_click_num, 
            this.zs_revive_video_num = s.zs_revive_video_num, this.zs_revive_share_num = s.zs_revive_share_num, 
            this.zs_full_screen_jump = 1 == s.zs_full_screen_jump, this.zs_history_list_jump = 1 == s.zs_history_list_jump, 
            this.zs_finish_jump = 1 == s.zs_finish_jump, this.repair_click_num = this.zs_click_award_percent = s.zs_click_award_percent || [ .3, .7 ], 
            this.zs_click_award_back = s.zs_click_award_back ? Number(s.zs_click_award_back) : .00423, 
            this.zs_click_award_num = i.IsNumber(s.zs_click_award_num) ? s.zs_click_award_num : s.zs_click_award_num || 0, 
            this.zs_click_award_add = s.zs_click_award_add || .1, this.zs_revive_countdown = s.zs_revive_countdown ? Number(s.zs_revive_countdown) : 10, 
            this.zs_jump_style = s.zs_jump_style ? Number(s.zs_jump_style) : 0, this.zs_banner_rotate_id1 = s.zs_banner_rotate_id1, 
            this.zs_banner_rotate_id2 = s.zs_banner_rotate_id2, this.zs_banner_rotate_id3 = s.zs_banner_rotate_id3, 
            this.zs_click_award_system = s.zs_click_award_system, this.zs_banner_show_number = this.getNumberVal(s.zs_banner_show_number, 2), 
            this.zs_full_screen_rotate = 1 == this.getNumberVal(s.zs_full_screen_rotate, 0), 
            this.zs_unmiss_text_time = this.getNumberVal(s.zs_unmiss_text_time, 0), this.zs_button_delay_time = this.getNumberVal(s.zs_button_delay_time, 2e3), 
            this.zs_button_delay_switch = 1 == this.getNumberVal(s.zs_button_delay_switch, 0), 
            this.zs_game_banner_show_switch = 1 == this.getNumberVal(s.zs_game_banner_show_switch, 0), 
            this.zs_before_finsh_jump_switch = 1 == this.getNumberVal(s.zs_before_finsh_jump_switch, 0), 
            this.zs_slide_jump_switch = 1 == this.getNumberVal(s.zs_slide_jump_switch, 0), this.zs_auto_pop_ups_switch = 1 == this.getNumberVal(s.zs_slide_jump_switch, 0), 
            "undefined" != typeof wx && wx.onShareAppMessage(function() {
                return {
                    title: a.zs_share_title,
                    imageUrl: a.zs_share_image
                };
            }), this.initOpenAwardNum();
        }
        static getNumberVal(e, t) {
            return t = i.IsNumber(t) ? Number(t) : 0, i.IsNumber(e) ? Number(e) : t;
        }
        static initOpenAwardNum() {
            this.open_award_num = t.LocalStorage.getItem("open_award_num") || 0;
            var e = t.LocalStorage.getItem("open_award_num_time_stamp");
            null != e && "" != e && 0 != i.isToday(Number(e)) || (t.LocalStorage.setItem("open_award_num_time_stamp", Date.now().toString()), 
            t.LocalStorage.setItem("open_award_num", this.open_award_num = 0));
        }
        static isPublicVersion() {
            return a.current_version != a.zs_version;
        }
        static isOpenEgg(e) {
            if (!a.egg_switch) return !1;
            if (a.zs_click_award_system) {
                var s = a.zs_click_award_system.trim().toLowerCase();
                if ("android" == s && t.Browser.onAndroid) return !1;
                if ("ios" == s && t.Browser.onIOS) return !1;
            }
            if (i.IsNumber(a.zs_click_award_num)) {
                if (-1 == a.zs_click_award_num) return !0;
                var n = t.LocalStorage.getItem("open_award_num") || 0;
                if (Number(a.zs_click_award_num) > Number(n)) return !0;
            }
            if (a.zs_click_award_num && a.zs_click_award_num.length > 0) {
                if (1 == a.zs_click_award_num.length && -1 == a.zs_click_award_num[0]) return !0;
                if (-1 != a.zs_click_award_num.indexOf(e)) return !0;
            }
            return !1;
        }
        static enableClickRevive() {
            return this.isReviveTypeEnable("zs_revive_click_num");
        }
        static updateClickRevive() {
            this.updateReviveTypeInfo("zs_revive_click_num");
        }
        static enableVideoRevive() {
            return this.isReviveTypeEnable("zs_revive_video_num");
        }
        static updateVideoRevive() {
            this.updateReviveTypeInfo("zs_revive_video_num");
        }
        static enableShareRevive() {
            return this.isReviveTypeEnable("zs_revive_share_num");
        }
        static updateShareRevive() {
            this.updateReviveTypeInfo("zs_revive_share_num");
        }
        static isReviveTypeEnable(e) {
            if (0 == this[e]) return !1;
            if (-1 == this[e]) return !0;
            var s = t.LocalStorage.getItem(e + "_time_stamp");
            if (null == s || "" == s || 0 == i.isToday(Number(s))) return !0;
            var a = t.LocalStorage.getItem(e);
            return (null == a || "" == a ? 0 : Number(a)) < this[e];
        }
        static updateReviveTypeInfo(e) {
            t.LocalStorage.setItem(e + "_time_stamp", Date.now().toString());
            var s = t.LocalStorage.getItem(e), i = null == s || "" == s ? 0 : Number(s);
            i++, t.LocalStorage.setItem(e, i.toString());
        }
        static isBeforeGameAccount() {
            return a.isPublicVersion() && a.zs_jump_switch && a.zs_before_finsh_jump_switch;
        }
        static isAfterGameAccount() {
            return a.isPublicVersion() && a.zs_jump_switch && a.zs_full_screen_jump;
        }
    }
    a.response = null, a.zs_share_title = "", a.zs_share_image = "", a.zs_switch = !1, 
    a.zs_version = "1.0.0", a.zs_video_adunit = "", a.zs_banner_adunit = "", a.zs_banner_rotate_id1 = "", 
    a.zs_banner_rotate_id2 = "", a.zs_banner_rotate_id3 = "", a.zs_full_screen_adunit = "", 
    a.zs_full_screen_ad_enable = !1, a.zs_banner_text_time = 0, a.zs_banner_banner_time = 0, 
    a.zs_banner_refresh_time = 0, a.zs_banner_move_time = 500, a.zs_banner_vertical_enable = !1, 
    a.zs_banner_horizontal_enable = !1, a.zs_jump_switch = !1, a.zs_revive_type = 0, 
    a.zs_revive_click_num = 0, a.zs_revive_video_num = 0, a.zs_revive_share_num = 0, 
    a.zs_continue_auto_share = !1, a.zs_full_screen_jump = !1, a.zs_history_list_jump = !1, 
    a.zs_finish_jump = !1, a.zs_revive_countdown = 10, a.zs_jump_style = 1, a.zs_shield_gdt_export = !0, 
    a.zs_full_screen_rotate = !1, a.zs_button_delay_switch = !1, a.zs_button_delay_time = 2e3, 
    a.zs_game_banner_show_switch = !0, a.zs_before_finsh_jump_switch = !1, a.zs_slide_jump_swich = !1, 
    a.zs_auto_pop_ups_switch = !0, t.ILaya.regClass(a), t.ClassUtils.regClass("zs.laya.platform.ADConfig", a), 
    t.ClassUtils.regClass("Zhise.ADConfig", a);
    class n extends t.Script {
        constructor() {
            super(), this.adType = null, this.autoScroll = !1, this.scrollDir = n.SCROLL_NONE, 
            this.dragSleep = 5e3, this.scrollSpeed = 1, this.waitTime = 1e3, this.passedTime = 0, 
            this.inAutoScroll = !1, this.adData = [], this.iosFilterAppIds = [], this.list = null, 
            this.hotIds = [], this.maxNum = null, this.isDataUpdate = !1, this.touchIndex = -1, 
            this.isRandomSelect = !1, this.changeValue = 0, this.unitValue = 0, this.isEnd = !1, 
            this.isClockPendulum = !1;
        }
        requestAdData(e, t, s, i, a, r, o) {
            this.adType = e, this.autoScroll = t, this.scrollDir = s, this.iosFilterAppIds = i || [], 
            this.maxNum = a, this.isRandomSelect = r, this.isClockPendulum = o, this.scrollDir == n.SCROLL_VERTICAL ? this.list.vScrollBarSkin = "" : this.scrollDir == n.SCROLL_HORIZONTAL && (this.list.hScrollBarSkin = "");
            var l = this;
            zs.laya.sdk.ZSReportSdk.loadAd(function(e) {
                l.list && (l.adData = e[l.adType.toString()], l.initHotIds(), l.freshAdList());
            });
        }
        freshAdList() {
            var e = this;
            if (this.adData = this.adData.filter(function(s) {
                return t.Browser.onAndroid || -1 == e.iosFilterAppIds.indexOf(s.appid);
            }), null != this.maxNum) if (this.adData.length < this.maxNum) for (;this.adData.length < this.maxNum; ) this.adData.push(this.adData[Math.floor(Math.random() * this.adData.length)]); else if (this.adData.length > this.maxNum) for (;this.adData.length > this.maxNum; ) this.adData.splice(Math.floor(Math.random() * this.adData.length), 1);
            this.list.array = this.adData;
            var s = 0, i = this.list.getCell(0);
            i && (this.scrollDir == n.SCROLL_VERTICAL ? (s = Math.ceil(this.list.array.length / this.list.repeatX), 
            this.unitValue = (i.height + this.list.spaceY) / (s * i.height + this.list.spaceY * (s - 1) - this.list.height) * this.list.scrollBar.max) : this.scrollDir == n.SCROLL_HORIZONTAL && (s = Math.ceil(this.list.array.length / this.list.repeatY), 
            this.unitValue = (i.width + this.list.spaceX) / (s * i.width + this.list.spaceX * (s - 1) - this.list.width) * this.list.scrollBar.max), 
            console.log("单元value" + this.unitValue), this.autoScroll && t.stage.frameOnce(1, this, this.startAutoScrollAd));
        }
        initHotIds() {
            for (var e = Math.random() < .5 ? 3 : 4, t = Math.floor(this.adData.length / e), s = 0; s < e; s++) this.hotIds.push(Math.floor(t * Math.random()) + s * t);
        }
        startAutoScrollAd() {
            this.list && (this.inAutoScroll = !0);
        }
        onItemRender(e, t) {
            var s = this.list.array[t];
            if (s) {
                if (i = e.getChildByName("icon")) i.loadImage(s.app_icon, null); else {
                    var i, a = e.getChildByName("iconBox");
                    if (a) (i = a.getChildByName("icon")) && (i.skin = s.app_icon);
                }
                var n = e.getChildByName("name");
                n && (n.text = s.app_title);
                var r = e.getChildByName("desc");
                if (r && (r.text = s.app_desc), 1 != this.isDataUpdate) {
                    var o = e.getChildByName("titleBg");
                    o && (o.index = Math.floor(o.clipY * Math.random()));
                    var l = e.getChildByName("tag");
                    if (l) this.hotIds.indexOf(t) > 0 ? (l.visible = !0, l.index = Math.floor(l.clipY * Math.random())) : l.visible = !1; else {
                        var h = e.getChildByName("hot"), d = e.getChildByName("new");
                        h && (h.visible = !1), d && (d.visible = !1), this.hotIds.indexOf(t) > 0 && (h && d ? Math.random() < .5 ? h.visible = !0 : d.visible = !0 : h && !d ? h.visible = !0 : d && !h && (d.visible = !0));
                    }
                }
            } else e.visible = !1;
        }
        onTouchEnd(e) {
            this.list && this.list.array && (a.zs_slide_jump_switch && this.isRandomSelect && -1 == this.touchIndex && (this.touchIndex = Math.floor(Math.random() * this.list.array.length), 
            console.log("RandomSelect:" + this.touchIndex + " data list length:" + this.list.array.length)), 
            this.onSelectAd(this.touchIndex), this.touchIndex = -1);
        }
        onMouseAd(e, s) {
            e.type == t.Event.MOUSE_DOWN && (this.touchIndex = s);
        }
        onSelectAd(e) {
            if (null != e && -1 != e && this.list && this.list.array) {
                var i = this.list.array[e], a = this;
                a.isDataUpdate = !0, zs.laya.sdk.ZSReportSdk.navigate2Mini(i, s.user_id, function() {
                    t.stage.event(n.EVENT_NAVIGATE_SUCCESS);
                }, function() {
                    t.stage.event(n.EVENT_NAVIGATE_FAILED), s.onExportJumpCancel();
                }, function() {
                    a.list.selectedIndex = -1, t.stage.event(n.EVENT_NAVIGATE_COMPLETED);
                });
            }
        }
        params2String(e) {
            for (var t = e[0] + "=" + e[1], s = 2; s < e.length; s += 2) t += "&" + e[s] + "=" + e[s + 1];
            return t;
        }
        onDragStateChanged(e) {
            this.inAutoScroll = !1, this.autoScroll && 0 == e && (this.passedTime = 0);
        }
        onAwake() {
            this.list = this.owner, this.list.selectEnable = !0, this.list.renderHandler = t.Handler.create(this, this.onItemRender, null, !1), 
            this.list.mouseHandler = t.Handler.create(this, this.onMouseAd, null, !1);
        }
        onEnable() {
            this.owner.on(t.Event.MOUSE_UP, this, this.onTouchEnd), this.list.on(t.Event.MOUSE_UP, this, this.onDragStateChanged, [ 0 ]), 
            this.list.on(t.Event.MOUSE_OUT, this, this.onDragStateChanged, [ 0 ]), this.list.on(t.Event.MOUSE_DOWN, this, this.onDragStateChanged, [ 1 ]);
        }
        onDisable() {
            this.owner.off(t.Event.MOUSE_UP, this, this.onTouchEnd), this.list.off(t.Event.MOUSE_UP, this, this.onDragStateChanged), 
            this.list.off(t.Event.MOUSE_OUT, this, this.onDragStateChanged), this.list.off(t.Event.MOUSE_DOWN, this, this.onDragStateChanged);
        }
        onUpdate() {
            if (this.autoScroll && 1 == this.inAutoScroll && this.list && this.list.scrollBar && this.list.scrollBar.max) {
                if (this.list.scrollBar.value >= this.list.scrollBar.max ? (this.list.scrollBar.value = this.list.scrollBar.max, 
                this.scrollSpeed = 0 - this.scrollSpeed, this.isEnd = !0) : this.list.scrollBar.value <= 0 && (this.list.scrollBar.value = 0, 
                this.scrollSpeed = 0 - this.scrollSpeed, this.isEnd = !0), this.list.scrollBar.value += this.scrollSpeed, 
                !this.unitValue || !this.isClockPendulum) return;
                this.isEnd = this.isEnd && 0 != this.changeValue, this.changeValue += Math.abs(this.scrollSpeed), 
                (this.changeValue >= this.unitValue || this.isEnd) && (this.autoScroll = !1, this.isEnd = !1, 
                this.changeValue = 0, t.timer.once(this.waitTime, this, function() {
                    this.autoScroll = !0;
                }));
            }
            this.autoScroll && 0 == this.inAutoScroll && (this.passedTime += t.timer.delta, 
            this.passedTime > this.dragSleep && this.startAutoScrollAd());
        }
    }
    n.EVENT_NAVIGATE_SUCCESS = "NAVIGATE_SUCCESS", n.EVENT_NAVIGATE_FAILED = "NAVIGATE_FAILED", 
    n.EVENT_NAVIGATE_COMPLETED = "NAVIGATE_COMPLETED", n.SCROLL_NONE = 0, n.SCROLL_VERTICAL = 1, 
    n.SCROLL_HORIZONTAL = 2, t.ILaya.regClass(n), t.ClassUtils.regClass("zs.laya.platform.AdList", n), 
    t.ClassUtils.regClass("Zhise.AdList", n);
    class r extends n {
        constructor() {
            super();
        }
        onItemRender(e, t) {
            var s = this.list.array[t];
            if (s) {
                if (1 != this.isDataUpdate) {
                    var i = e.getChildByName("icon");
                    i && (6 != t ? (i.visible = !0, i.loadImage(s.app_icon, null)) : i.visible = !1);
                    var a = e.getChildByName("name");
                    a && (a.text = 6 != t ? s.app_title : "");
                    var n = e.getChildByName("desc");
                    n && (n.text = 6 != t ? s.app_desc : "");
                    var r = e.getChildByName("arrow");
                    r && (r.visible = 6 == t, 6 == t ? (r.visible = !0, r.index = s.arrowIdx ? s.arrowIdx : 0) : r.visible = !1);
                }
            } else e.visible = !1;
        }
        onSelectAd(e) {
            if (-1 != e) {
                var i = this.list.array[e];
                if (6 == e) return null == i.arrowIdx || 0 == i.arrowIdx ? (i.arrowIdx = 1, this.owner.event(r.EVENT_AD_SWITCH_SHOW)) : (i.arrowIdx = 0, 
                this.owner.event(r.EVENT_AD_SWITCH_HIDE)), void (this.list.selectedIndex = -1);
                var a = this;
                a.isDataUpdate = !0, zs.laya.sdk.ZSReportSdk.navigate2Mini(i, s.user_id, function() {
                    t.stage.event(n.EVENT_NAVIGATE_SUCCESS);
                }, function() {
                    t.stage.event(n.EVENT_NAVIGATE_FAILED), s.onExportJumpCancel();
                }, function() {
                    a.list.selectedIndex = -1, t.stage.event(n.EVENT_NAVIGATE_COMPLETED);
                });
            }
        }
    }
    r.EVENT_AD_SWITCH_SHOW = "EVENT_AD_SWITCH_SHOW", r.EVENT_AD_SWITCH_HIDE = "EVENT_AD_SWITCH_HIDE", 
    t.ILaya.regClass(r), t.ClassUtils.regClass("zs.laya.platform.AdList2", r), t.ClassUtils.regClass("Zhise.AdList2", r);
    class o extends t.Script {
        constructor() {
            super(), this.args = null, this.adView = null, this.monitorOtherPageOpen = !1, this.visibleArr = null;
        }
        onEnable() {
            null == this.adView && t.stage.on(s.AD_CONFIIG_LOADED, this, this.onStart);
        }
        onDisable() {
            null == this.adView && t.stage.off(s.AD_CONFIIG_LOADED, this, this.onStart), this.monitorOtherPageOpen && (t.stage.off(s.UI_VIEW_OPENED, this, this.onViewOpened), 
            t.stage.off(s.UI_VIEW_CLOSED, this, this.onViewClosed));
        }
        onDestroy() {
            if (null != this.adView) {
                for (var e = 0; e < this.adView.length; e++) null != this.adView[e] && this.adView[e].destroy();
                this.adView = null;
            }
        }
        onStart() {
            if (!this.adView && 0 != a.zs_jump_switch && 0 != a.isPublicVersion()) 
            {
                // var e = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf("."));
                // if (this.args = s.platformCfg.exportGameCfg[e], this.args) {
                //     this.monitorOtherPageOpen = !1;
                //     for (var i = 0; i < this.args.length; i++) {
                //         (null == (n = this.args[i]).checkKey || a[n.checkKey]) && (this.monitorOtherPageOpen = this.monitorOtherPageOpen || n.isHide);
                //     }
                //     this.monitorOtherPageOpen && (t.stage.on(s.UI_VIEW_OPENED, this, this.onViewOpened), 
                //     t.stage.on(s.UI_VIEW_CLOSED, this, this.onViewClosed)), this.adView = [];
                //     for (i = 0; i < this.args.length; i++) {
                //         var n;
                //         if ((n = this.args[i]).readonly) this.adView.push(null); else {
                //             if (null == n.checkKey || a[n.checkKey]) {
                //                 t.loader.create(n.viewUrl, t.Handler.create(this, this.onPrefabReady), null, t.Loader.PREFAB);
                //                 break;
                //             }
                //             this.adView.push(null);
                //         }
                //     }
                // }
            }
        }
        onPrefabReady(e) {
            if (!this.destroyed) {
                var s = this.args[this.adView.length], i = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf("."));
                if (this.owner.getChildByName(s.parentRoot)) {
                    var n = this.getViewScript(s.scriptType);
                    if (null != n) {
                        var r = e.create();
                        this.owner.getChildByName(s.parentRoot).addChild(r), r.pos(s.x, s.y);
                        var o = r.getComponent(n);
                        if (null == o && (o = r.addComponent(n)), s.adType && o.initView(s), this.adView.push(r), 
                        this.adView.length < this.args.length) {
                            var l = this.args[this.adView.length];
                            l.readonly ? this.adView.push(null) : null == l.checkKey || a[l.checkKey] ? t.loader.create(l.viewUrl, t.Handler.create(this, this.onPrefabReady), null, t.Loader.PREFAB) : this.adView.push(null);
                        }
                    } else console.log(i + " page" + s.viewUrl + " scriptType is null");
                } else console.log(i + " page parentRoot " + s.parentRoot + " is null");
            }
        }
        getViewScript(e) {
            switch (e) {
              case "ExportScrollH":
                return l;

              case "ExportScrollV":
                return h;

              case "ExportScrollNone":
                return d;

              case "ShakeExportBox":
                return _;

              case "InviteBtn":
                return g;

              case "FakeExitBtn":
                return u;

              case "FloatExportBtn":
                return p;

              case "ScreenExportBtn":
                return m;

              case "ExportLeftPop":
                return w;

              case "ExportRightPop":
                return f;

              case "ExportLeftFlyBox":
                return C;
            }
        }
        onViewOpened(e) {
            if (e && this.adView) {
                this.visibleArr = [];
                for (var t = 0; t < this.adView.length; t++) null != this.adView[t] && this.args[t].isHide && (this.visibleArr[t] = this.adView[t].visible, 
                this.adView[t].visible = !1);
            }
        }
        onViewClosed(e) {
            if (e && this.adView) {
                if (!this.visibleArr) return;
                for (var t = 0; t < this.adView.length; t++) null != this.adView[t] && this.args[t].isHide && this.visibleArr[t] && (this.adView[t].visible = this.visibleArr[t]);
            }
        }
    }
    t.ILaya.regClass(o), t.ClassUtils.regClass("zs.laya.platform.ExportGameCtrl", o), 
    t.ClassUtils.regClass("Zhise.ExportGameCtrl", o);
    class l extends t.Script {
        constructor() {
            super(), this.adList = null;
        }
        initView(e) {
            this.adList = this.owner.getChildByName("adList").addComponent(n);
            var t = s.platformCfg;
            this.adList.requestAdData(e.adType, !0, n.SCROLL_HORIZONTAL, t.iosFilterAppIds, null, !1, e.isClockPendulum);
        }
    }
    t.ILaya.regClass(l), t.ClassUtils.regClass("zs.laya.platform.ExportScrollH", l), 
    t.ClassUtils.regClass("Zhise.ExportScrollH", l);
    class h extends t.Script {
        constructor() {
            super(), this.adList = null;
        }
        initView(e) {
            this.adList = this.owner.getChildByName("adList").addComponent(n);
            var t = s.platformCfg;
            this.adList.requestAdData(e.adType, !0, n.SCROLL_VERTICAL, t.iosFilterAppIds, null, !1, e.isClockPendulum);
        }
    }
    t.ILaya.regClass(h), t.ClassUtils.regClass("zs.laya.platform.ExportScrollV", h), 
    t.ClassUtils.regClass("Zhise.ExportScrollV", h);
    class d extends t.Script {
        constructor() {
            super(), this.adList = null;
        }
        initView(e) {
            this.adList = this.owner.getChildByName("adList").addComponent(n);
            var t = s.platformCfg;
            this.adList.requestAdData(e.adType, !1, n.SCROLL_NONE, t.iosFilterAppIds, null, !1, e.isClockPendulum);
        }
    }
    t.ILaya.regClass(d), t.ClassUtils.regClass("zs.laya.platform.ExportScrollNone", d), 
    t.ClassUtils.regClass("Zhise.ExportScrollNone", d);
    class c extends t.Script {
        constructor() {
            super(), this.list = null, this.delayAnimTime = 1e3, this.animIntervalTime = 4e3, 
            this.animDuaration = 500, this.adIdx = 0, this.rotOffset = 10, this.loopTime = 2, 
            this.currentAdData = null, this.adDataArr = null, this.subAnimDuaration = 0, this.maxNum = 4;
        }
        initAd(e) {
            this.adDataArr = e, this.adIdx %= e.length, this.onItemRender(e[this.adIdx]), this.owner.timerLoop(this.delayAnimTime + this.animIntervalTime, this, this.freshAdItems);
        }
        freshAdItems() {
            this.adIdx += this.maxNum, this.adIdx %= this.adDataArr.length, this.onItemRender(this.adDataArr[this.adIdx]), 
            this.playShakeAnim(0);
        }
        playShakeAnim(e) {
            if (!(e / this.maxNum >= this.loopTime)) {
                var s = this.owner;
                switch (e % this.maxNum) {
                  case 0:
                    t.Tween.to(s, {
                        rotation: this.rotOffset
                    }, this.subAnimDuaration, t.Ease.linearNone, t.Handler.create(this, this.playShakeAnim, [ e + 1 ]));
                    break;

                  case 1:
                    t.Tween.to(s, {
                        rotation: 0
                    }, this.subAnimDuaration, t.Ease.linearNone, t.Handler.create(this, this.playShakeAnim, [ e + 1 ]));
                    break;

                  case 2:
                    t.Tween.to(s, {
                        rotation: this.rotOffset
                    }, this.subAnimDuaration, t.Ease.linearNone, t.Handler.create(this, this.playShakeAnim, [ e + 1 ]));
                    break;

                  case 3:
                    t.Tween.to(s, {
                        rotation: 0
                    }, this.subAnimDuaration, t.Ease.linearNone, t.Handler.create(this, this.playShakeAnim, [ e + 1 ]));
                }
            }
        }
        onItemRender(e) {
            if (null != e) {
                this.currentAdData = e, this.owner.visible = !0;
                var t = this.owner, s = t.getChildByName("icon");
                s && s.loadImage(e.app_icon, null);
                var i = t.getChildByName("name");
                i && (i.text = e.app_title);
                var a = t.getChildByName("desc");
                a && (a.text = e.app_desc);
            } else null == this.currentAdData && (this.owner.visible = !1);
        }
        onClick() {
            null != this.currentAdData && zs.laya.sdk.ZSReportSdk.navigate2Mini(this.currentAdData, s.user_id, function() {
                t.stage.event(n.EVENT_NAVIGATE_SUCCESS);
            }, function() {
                t.stage.event(n.EVENT_NAVIGATE_FAILED), s.onExportJumpCancel();
            }, function() {});
        }
        onStart() {
            this.subAnimDuaration = this.animDuaration / (this.maxNum * this.loopTime);
        }
    }
    t.ILaya.regClass(c), t.ClassUtils.regClass("zs.laya.platform.ShakeExportIcon", c), 
    t.ClassUtils.regClass("Zhise.ShakeExportIcon", c);
    class _ extends t.Script {
        constructor() {
            super(), this.adType = 0, this.iconScriptArr = [];
        }
        initView(e) {
            this.adType = e.adType;
            for (var t = this.owner.numChildren, s = 0; s < t; s++) {
                var i = this.owner.getChildAt(s).addComponent(c);
                i.adIdx = s, i.maxNum = t, this.iconScriptArr.push(i);
            }
            this.requestAdData();
        }
        requestAdData() {
            var e = this;
            zs.laya.sdk.ZSReportSdk.loadAd(function(s) {
                var i = s[e.adType.toString()];
                i = i.filter(function(e) {
                    return t.Browser.onAndroid || "wx48820730357d81a6" != e.appid && "wxc136d75bfc63107c" != e.appid;
                });
                for (var a = 0; a < e.iconScriptArr.length; a++) {
                    e.iconScriptArr[a].initAd(i);
                }
            });
        }
    }
    t.ILaya.regClass(_), t.ClassUtils.regClass("zs.laya.platform.ShakeExportBox", _), 
    t.ClassUtils.regClass("Zhise.ShakeExportBox", _);
    class u extends t.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.owner.mouseEnabled = !0, this.owner.visible = a.zs_jump_switch && a.isPublicVersion() && a.zs_history_list_jump;
        }
        onClick() {
            Laya.SoundManager.playSound(s.soundClick), this.owner.mouseEnabled = !1, s.showListAd(), 
            this.owner.mouseEnabled = !0;
        }
    }
    t.ILaya.regClass(u), t.ClassUtils.regClass("zs.laya.platform.FakeExitBtn", u), t.ClassUtils.regClass("Zhise.FakeExitBtn", u);
    class p extends t.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.owner.mouseEnabled = !0, this.owner.visible = a.zs_jump_switch && a.isPublicVersion() && a.zs_history_list_jump;
        }
        onClick() {
            Laya.SoundManager.playSound(s.soundClick), this.owner.mouseEnabled = !1, s.showHomeFloatAd(), 
            this.owner.mouseEnabled = !0;
        }
    }
    t.ILaya.regClass(p), t.ClassUtils.regClass("zs.laya.platform.FloatExportBtn", p), 
    t.ClassUtils.regClass("Zhise.FloatExportBtn", p);
    class m extends t.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.owner.mouseEnabled = !0, this.owner.visible = a.zs_jump_switch && a.isPublicVersion() && a.zs_history_list_jump;
        }
        onClick() {
            Laya.SoundManager.playSound(s.soundClick), this.owner.mouseEnabled = !1, s.showScreenAd(), 
            this.owner.mouseEnabled = !0;
        }
    }
    t.ILaya.regClass(m), t.ClassUtils.regClass("zs.laya.platform.ScreenExportBtn", m), 
    t.ClassUtils.regClass("Zhise.ScreenExportBtn", m);
    class g extends t.Script {
        constructor() {
            super();
        }
        onClick() {
            console.log("openInvite"), Laya.SoundManager.playSound(s.soundClick), zs.laya.sdk.SdkService.openShare(zs.laya.platform.ADConfig.zs_share_title, zs.laya.platform.ADConfig.zs_share_image);
        }
    }
    t.ILaya.regClass(g), t.ClassUtils.regClass("zs.laya.platform.InviteBtn", g), t.ClassUtils.regClass("Zhise.InviteBtn", g);
    class w extends t.Script {
        constructor() {
            super(), this.srcX = 0, this.adList = null, this.adCheckBox = null;
        }
        initView(e) {
            this.srcX = this.owner.x, this.adList = this.owner.getChildByName("adList").addComponent(n), 
            this.adCheckBox = this.owner.getChildByName("adCheckBox"), this.adCheckBox.on(t.Event.CLICK, this, this.updateFloatPos);
            var i = s.platformCfg;
            this.adList.requestAdData(e.adType, !0, n.SCROLL_NONE, i.iosFilterAppIds);
        }
        onDestroy() {
            this.adCheckBox.off(t.Event.CLICK, this, this.updateFloatPos);
        }
        updateFloatPos() {
            zs.laya.sdk.SdkService.hideUserInfoButton(), this.adCheckBox.mouseEnabled = !1, 
            this.adCheckBox.selected ? t.Tween.to(this.owner, {
                x: 0
            }, 500, null, t.Handler.create(this, this.onTweenCompleted)) : t.Tween.to(this.owner, {
                x: this.srcX
            }, 500, null, t.Handler.create(this, this.onTweenCompleted));
        }
        onTweenCompleted() {
            this.adCheckBox.mouseEnabled = !0, 0 == this.adCheckBox.selected && zs.laya.sdk.SdkService.showUserInfoButton();
        }
    }
    t.ILaya.regClass(w), t.ClassUtils.regClass("zs.laya.platform.ExportLeftPop", w), 
    t.ClassUtils.regClass("Zhise.ExportLeftPop", w);
    class f extends t.Script {
        constructor() {
            super(), this.adFrame = null, this.adList = null;
        }
        initView(e) {
            this.adFrame = this.owner.getChildByName("adFrame"), this.adList = this.owner.getChildByName("adList").addComponent(r);
            var t = s.platformCfg;
            this.adList.requestAdData(e.adType, !1, n.SCROLL_NONE, t.iosFilterAppIds, 9), this.adList.owner.on(r.EVENT_AD_SWITCH_HIDE, this, this.onAdHide), 
            this.adList.owner.on(r.EVENT_AD_SWITCH_SHOW, this, this.onAdShow);
        }
        onAdHide() {
            this.adList.owner.mouseEnabled = !1, t.Tween.to(this.owner, {
                x: -150
            }, 500, null, t.Handler.create(this, this.onTweenCompleted));
        }
        onAdShow() {
            this.adList.owner.mouseEnabled = !1, t.Tween.to(this.owner, {
                x: -450
            }, 500, null, t.Handler.create(this, this.onTweenCompleted));
        }
        onTweenCompleted() {
            this.adList.owner.mouseEnabled = !0;
        }
    }
    t.ILaya.regClass(f), t.ClassUtils.regClass("zs.laya.platform.ExportRightPop", f), 
    t.ClassUtils.regClass("Zhise.ExportRightPop", f);
    class C extends t.Script {
        constructor() {
            super(), this.isClick = !1, this.adData = [], this.unData = [], this.showNum = 0;
        }
        initView(e) {
            if (a.zs_jump_switch && a.isPublicVersion()) {
                this.showNum = this.owner.numChildren;
                for (var s = this, i = 0; i < this.showNum; i++) {
                    var n = this.owner.getChildByName("ad_" + i);
                    n && t.Tween.from(n, {
                        rotation: 360,
                        x: n.x - 500
                    }, 700, null, t.Handler.create(this, function() {
                        s.isClick = !0;
                    }));
                }
                var r = e.adType.toString();
                zs.laya.sdk.ZSReportSdk.loadAd(function(e) {
                    s.adData = e[r], s.freshAdBox();
                });
            } else this.owner.visible = !1;
        }
        freshAdBox() {
            var e = s.platformCfg;
            if (this.adData = this.adData.filter(function(s) {
                return t.Browser.onAndroid || -1 == e.iosFilterAppIds.indexOf(s.appid);
            }), this.adData.length < this.showNum) for (;this.adData.length < this.showNum; ) this.adData.push(this.adData[Math.floor(Math.random() * this.adData.length)]); else if (this.adData.length > this.showNum) for (;this.adData.length > this.showNum; ) {
                var i = this.adData.splice(Math.floor(Math.random() * this.adData.length), 1);
                this.unData.push(i[0]);
            }
            for (var a = 0; a < this.showNum; a++) {
                var n = this.adData[a];
                if (n) {
                    var r = this.owner.getChildByName("ad_" + a);
                    if (r) {
                        var o = r.getChildByName("icon");
                        o && o.loadImage(n.app_icon, null);
                        var l = r.getChildByName("name");
                        l && (l.text = n.app_title);
                        var h = r.getChildByName("titleBg");
                        h && (h.index = Math.floor(h.clipY * Math.random()));
                        var d = r.getChildByName("tag");
                        d && (a < 2 ? (d.visible = !0, d.index = Math.floor(d.clipY * Math.random())) : d.visible = !1), 
                        r.on(t.Event.CLICK, this, this.onBoxClick, [ a ]);
                    }
                }
            }
        }
        onBoxClick(e) {
            if (this.isClick && (zs.laya.sdk.ZSReportSdk.navigate2Mini(this.adData[e], s.user_id, function() {
                t.stage.event(n.EVENT_NAVIGATE_SUCCESS);
            }, function() {
                t.stage.event(n.EVENT_NAVIGATE_FAILED), s.onExportJumpCancel();
            }, function() {}), this.unData.length > 0)) {
                var i = this.unData.splice(Math.floor(Math.random() * this.unData.length), 1);
                this.unData.push(this.adData.splice(e, 1, i[0])[0]);
                var a = this.owner.getChildByName("ad_" + e), r = this.adData[e];
                if (!r) return;
                if (a) {
                    var o = a.getChildByName("icon");
                    o && o.loadImage(r.app_icon, null);
                    var l = a.getChildByName("name");
                    l && (l.text = r.app_title);
                    var h = a.getChildByName("titleBg");
                    h && (h.index = Math.floor(h.clipY * Math.random()));
                    var d = a.getChildByName("tag");
                    d && (e < 2 ? (d.visible = !0, d.index = Math.floor(d.clipY * Math.random())) : d.visible = !1);
                }
            }
        }
    }
    t.ILaya.regClass(C), t.ClassUtils.regClass("zs.laya.platform.ExportLeftFlyBox", C), 
    t.ClassUtils.regClass("Zhise.ExportLeftFlyBox", C);
    class v extends zs.laya.base.ZhiSeView {
        constructor() {
            super(), this.adList = null, this.closeBtn = null;
        }
        onAwake() {
            super.onAwake();
            var e, s = this.owner.getChildByName("topUI");
            s && (e = s.getChildByName("adList"), this.closeBtn = s.getChildByName("closeBtn"));
            var i = this.owner.getChildByName("middleUI");
            i && (e = e || i.getChildByName("adList"), this.closeBtn = this.closeBtn || i.getChildByName("closeBtn"));
            var a = this.owner.getChildByName("bottomUI");
            a && (this.closeBtn = this.closeBtn || a.getChildByName("closeBtn")), this.adList = e.addComponent(n), 
            this.closeBtn.on(t.Event.CLICK, this, this.closeView);
        }
        onDestroy() {
            this.closeBtn.off(t.Event.CLICK, this, this.closeView);
        }
        onStart() {
            var e = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf(".")), t = s.platformCfg.exportGameCfg[e], i = s.platformCfg;
            this.adList.requestAdData(t ? t[0].adType : "promotion", !1, n.SCROLL_NONE, i.iosFilterAppIds, 9);
        }
        closeView() {
            Laya.SoundManager.playSound(s.soundClick), s.currentView = "", this.owner.close();
        }
    }
    t.ILaya.regClass(v), t.ClassUtils.regClass("zs.laya.platform.HomeFloatAdView", v), 
    t.ClassUtils.regClass("Zhise.HomeFloatAdView", v);
    class E extends zs.laya.base.ZhiSeView {
        constructor() {
            super(), this.headAdList = null, this.mainAdList = null, this.closeBtn = null, this.fakeExitBtn = null, 
            this.firstClick = !1, this.isOpenBanner = !1;
        }
        onAwake() {
            super.onAwake();
        }
        onDestroy() {
            // this.closeBtn && this.closeBtn.off(t.Event.CLICK, this, this.closeView), 
            // this.fakeExitBtn && this.fakeExitBtn.off(t.Event.CLICK, this, this.onOpenListAd), 
            // this.continueBtn && this.continueBtn.off(t.Event.CLICK, this, this.onContinue), 
            t.stage.off(s.APP_HIDE, this, this.onAppHide), t.stage.off(s.APP_SHOW, this, this.onAppShow);
        }
        onEnable() {
            super.onEnable();
            this.owner.close();
        }
        onStart() {
            super.onStart();
        }
        onAppShow() {
        }
        onAppHide() {
        }
        onContinue() {
            // if (!a.zs_switch || this.firstClick) this.closeView(); else if (this.firstClick = !0, 
            // this.bannerGroup) {
            //     var e = this;
            //     setTimeout(function() {
            //         e.bannerGroup.updateBottonTouch(), e.bannerGroup.show();
            //     }, 500), setTimeout(function() {
            //         e.bannerGroup.hide();
            //     }, 1e3);
            // }
        }
        closeView() {
            // Laya.SoundManager.playSound(s.soundClick), s.currentView = "", this.owner.close();
        }
        onOpenListAd() {
            // Laya.SoundManager.playSound(s.soundClick), s.showListAd();
        }
    }
    t.ILaya.regClass(E), t.ClassUtils.regClass("zs.laya.platform.FullScreeAdView", E), 
    t.ClassUtils.regClass("Zhise.FullScreeAdView", E);
    class A extends zs.laya.base.ZhiSeView {
        constructor() {
            super(), this.adList = null, this.closeBtn = null;
        }
        onAwake() {
            super.onAwake();
            var e = this.owner.getChildByName("topUI");
            this.adList = e.getChildByName("adList").addComponent(n), this.closeBtn = e.getChildByName("topFrame").getChildByName("closeBtn"), 
            this.closeBtn.on(t.Event.CLICK, this, this.closeView);
            var s = this.owner.getChildByName("bottomUI").getChildByName("bottomImg");
            if (s) {
                var i = s.getChildByName("backHomeBtn");
                i && i.on(t.Event.CLICK, this, this.closeView);
                var a = s.getChildByName("continueBtn");
                a && a.on(t.Event.CLICK, this, this.closeView);
            }
        }
        onDestroy() {
            this.closeBtn.off(t.Event.CLICK, this, this.closeView);
        }
        onStart() {
            var e = s.platformCfg.exportGameCfg[this.viewName], t = s.platformCfg;
            this.adList.requestAdData(e ? e[0].adType : "promotion", !1, n.SCROLL_VERTICAL, t.iosFilterAppIds, null, !0);
        }
        closeView() {
            Laya.SoundManager.playSound(s.soundClick), s.currentView = "", this.owner.close();
        }
    }
    t.ILaya.regClass(A), t.ClassUtils.regClass("zs.laya.platform.ListAdView", A), t.ClassUtils.regClass("Zhise.ListAdView", A);
    class S extends zs.laya.base.ZhiSeView {
        constructor() {
            super();
        }
        onAwake() {
            super.onAwake(), this.initData();
            var e = this.owner.getChildByName("bottomUI");
            e && (this.btn_repair = e.getChildByName("eggBtn"));
            var i = this.owner.getChildByName("middleUI");
            this.eggUI = i.getChildByName("eggUI"), this.eggUI && (this.btn_repair || (this.btn_repair = this.eggUI.getChildByName("eggBtn")), 
            this.progressBar = this.eggUI.getChildByName("loading_1"), this.progressWidth = this.progressBar.bitmap.width, 
            this.progressHeight = this.progressBar.bitmap.height), this.bannerMoveType = 0, 
            this.initCfg(), t.stage.on(s.APP_HIDE, this, this.onAppHide), t.stage.on(s.APP_SHOW, this, this.onAppShow), 
            this.btn_repair && (this.btn_repair.on(t.Event.MOUSE_DOWN, this, this.onTouchStart), 
            this.btn_repair.on(t.Event.MOUSE_UP, this, this.clickHammer)), this.hammerAni = this.owner.knockAni;
        }
        initCfg() {
            this.knockEggCfg = t.loader.getRes("config/KnockEggCfg.json"), this.awardDelay = 1e3, 
            this.closeDelay = 1e3, this.knockEggCfg && (i.IsNumber(this.knockEggCfg.awardDelay) && (this.awardDelay = Number(this.knockEggCfg.awardDelay)), 
            i.IsNumber(this.knockEggCfg.closeDelay) && (this.closeDelay = Number(this.knockEggCfg.closeDelay)));
        }
        isShowAward() {
            return this.knockEggCfg && this.knockEggCfg.isShowAward;
        }
        onTouchStart(e) {
            this.lastMouseX = t.stage.mouseX, this.lastMouseY = t.stage.mouseY;
        }
        initData() {
            this.btn_repair = null, this.progressBar = null, this.hammerAni = null, this.egg = null, 
            this.touchNode = null, this.repairProgress = 0, this.click_add_percent = .14, this.isOpenAd = !1, 
            this.repair_click_num = [ .3, .7 ], this.showBannerRange = 1, this.isGetAward = !1, 
            this.callback = null;
        }
        onEnable() {
            super.onEnable(), this.initBannerGroup(), this.initRepair();
        }
        onDisable() {
            super.onDisable();
        }
        onDestroy() {
            this.removeEvent(), super.onDestroy();
        }
        removeEvent() {
            t.timer.clear(this, this.cutBack), t.stage.off(s.APP_HIDE, this, this.onAppHide), 
            t.stage.off(s.APP_SHOW, this, this.onAppShow), this.btn_repair && (this.btn_repair.off(t.Event.MOUSE_DOWN, this, this.onTouchStart), 
            this.btn_repair.off(t.Event.MOUSE_UP, this, this.clickHammer));
        }
        onAppHide() {
            this.isOpenAd && (this.btn_repair && (this.btn_repair.off(t.Event.MOUSE_DOWN, this, this.onTouchStart), 
            this.btn_repair.off(t.Event.MOUSE_UP, this, this.clickHammer)), this.isOpenAd = !0, 
            t.timer.clear(this, this.resetIsOpenAd), t.timer.clear(this, this.cutBack), this.isShowAward() || this.onFinish());
        }
        initBannerGroup() {
            var e = s.platformCfg.bannerCfg;
            if (e) {
                var t = e[this.viewName];
                if (t) {
                    var i = t.showData;
                    if (i) {
                        (i.sign || 0 == i.sign || 0 == i.sign) && (this.bannerGroup = zs.laya.banner.WxBannerMgr.Instance.getBannerGroup(i.sign), 
                        this.bannerGroup && this.bannerGroup.hide());
                        var a = i.moveType;
                        1 == a && (this.bannerMoveType = a);
                    } else console.error("==============initBannerGroup===============", t.showData);
                }
            }
        }
        onAppShow() {
            this.isOpenAd && (this.bannerGroup && this.bannerGroup.hide(), this.isShowAward() && this.onFinish());
        }
        initRepair() {
            this.isGetAward = !1, t.timer.loop(20, this, this.cutBack), a.zs_click_award_percent.indexOf("[") >= 0 ? this.repair_click_num = JSON.parse(a.zs_click_award_percent) : this.repair_click_num = a.zs_click_award_percent.split(","), 
            this.click_add_percent = a.zs_click_award_add, this.zs_click_award_back = a.zs_click_award_back, 
            this.click_add_percent = .01 * i.random(.9 * this.click_add_percent * 100, 1.1 * this.click_add_percent * 100), 
            console.log("===============repair_click_num=====================", this.repair_click_num), 
            this.showBannerRange = .01 * i.random(100 * Number(this.repair_click_num[0]), 100 * Number(this.repair_click_num[1]));
        }
        setCloseCallback(e) {
            this.callback = e;
        }
        clickHammer() {
            if (this.repairProgress + this.click_add_percent <= 1) {
                if (this.updateRepairPorgress(this.repairProgress + this.click_add_percent), this.hammerAni && this.hammerAni.play(0, !1), 
                this.repairProgress >= this.showBannerRange && !this.isOpenAd) {
                    switch (this.isOpenAd = !0, this.bannerMoveType) {
                      case 1:
                        this.bannerGroup && this.bannerGroup.updateY(this.lastMouseY);
                        break;

                      default:
                        this.bannerGroup && this.bannerGroup.updateBottonTouch();
                    }
                    this.bannerGroup && this.bannerGroup.show(), t.timer.once(800, this, this.resetIsOpenAd), 
                    t.timer.once(800, this, function() {
                        this.initBannerGroup(), this.bannerGroup && this.bannerGroup.hide();
                    });
                }
            } else this.updateRepairPorgress(this.repairProgress + this.click_add_percent), 
            this.bannerGroup && this.bannerGroup.hide(), t.timer.clear(this, this.cutBack), 
            t.timer.clear(this, this.resetIsOpenAd), this.onFinish();
        }
        resetIsOpenAd() {
            this.isOpenAd = !1;
        }
        onFinish() {
            if (!this.isGetAward) {
                var e = t.LocalStorage.getItem("open_award_num") || 0;
                t.LocalStorage.setItem("open_award_num", Number(e) + 1), this.isGetAward = !0, t.timer.once(this.awardDelay, this, function() {
                    t.stage.event(s.EGG_GET_AWARD);
                }), t.timer.once(Math.max(this.closeDelay, this.awardDelay + 40), this, this.onClose);
            }
        }
        onClose() {
            console.log("====================关闭金蛋=================="), this.callback && this.callback(), 
            this.bannerGroup && this.bannerGroup.hide(), s.currentView = "", this.owner.close();
        }
        updateRepairPorgress(e) {
            this.repairProgress = Math.min(1, Math.max(0, e)), this.progressWidth < this.progressHeight ? this.progressBar && (this.progressBar.height = this.progressBar.clipHeight = Math.max(1, this.progressHeight * this.repairProgress)) : this.progressBar && (this.progressBar.width = Math.max(1, this.progressWidth * this.repairProgress));
        }
        cutBack() {
            this.repairProgress -= this.zs_click_award_back, this.updateRepairPorgress(this.repairProgress);
        }
    }
    t.ILaya.regClass(S), t.ClassUtils.regClass("zs.laya.platform.KnockEggView", S), 
    t.ClassUtils.regClass("Zhise.KnockEggView", S);
    class y extends t.Script {
        constructor() {
            super(), this.args = null, this.adView = null;
        }
        onDestroy() {
            if (this.adView) {
                var e = this.getViewScript(this.args.scriptType);
                null == e && (e = I);
                var t = this.adView.getComponent(e);
                t && t.releaseView(), this.adView.removeSelf(), this.adView = null;
            }
        }
        onStart() {
            if (this.adView) this.adView.visible = !0; else if (!(zs.laya.sdk.ZSReportSdk.Instance && zs.laya.sdk.ZSReportSdk.Instance.isFromLink() && 0 == zs.laya.sdk.ZSReportSdk.Instance.isExportValid() || 0 == a.zs_jump_switch || 0 == a.isPublicVersion())) {
                var e = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf("."));
                this.args = s.platformCfg.nativeAdCfg[e], this.args && t.loader.create(this.args.viewUrl, t.Handler.create(this, this.onPrefabReady), null, t.Loader.PREFAB);
            }
        }
        onPrefabReady(e) {
            if (!this.destroyed) if (this.owner.getChildByName(this.args.parentRoot)) {
                this.adView = e.create(), this.owner.getChildByName(this.args.parentRoot).addChild(this.adView), 
                this.adView.x = this.args.x, this.adView.y = this.args.y;
                var t = this.getViewScript(this.args.scriptType);
                null == t && (t = I);
                var s = this.adView.getComponent(t);
                null == s && (s = this.adView.addComponent(t)), s.initView(this.args);
            } else console.log(viewName + " page parentRoot " + this.args.parentRoot + " is null");
        }
        getViewScript(e) {
            switch (e) {
              case "NativeIconAdView":
                return I;
            }
        }
    }
    t.ILaya.regClass(y), t.ClassUtils.regClass("zs.laya.platform.NativeAdsCtrl", y), 
    t.ClassUtils.regClass("Zhise.NativeAdsCtrl", y);
    class I extends t.Script {
        constructor() {
            super(), this.gameIcon = null, this.config = null, this.maskViewNum = 0, this.iconReady = !1;
        }
        initView(e) {
            this.config = e, this.maskViewNum = 0, this.iconReady = !1;
            for (var i = t.stage.getChildByName("root"), a = i.numChildren - 1; a >= 0; a--) {
                var n = i.getChildAt(a);
                n.zOrder && n.zOrder > this.owner.zOrder && this.maskViewNum++, console.log("stage:" + n.name);
            }
            t.stage.on(s.UI_VIEW_OPENED, this, this.onViewOpened), t.stage.on(s.UI_VIEW_CLOSED, this, this.onViewClosed);
        }
        onStart() {
            var e = [], t = "undefined" != typeof wx;
            if (0 != t) {
                var s = wx.getSystemInfoSync();
                if (t = i.compareVersion(s.SDKVersion, "2.8.2") >= 0, this.owner.visible = t, 0 != t && (this.updateIconStyle(e, s), 
                0 != e.length && (console.log(e), this.gameIcon = wx.createGameIcon({
                    adUnitId: a.response[this.config.idKey],
                    count: e.length,
                    style: e
                }), this.gameIcon))) {
                    console.log("load gameIcon");
                    var n = this;
                    this.gameIcon.onError(function(e) {
                        console.error(e), n.gameIcon = null;
                    }), this.gameIcon.load(), this.gameIcon.onLoad(function() {
                        console.log("gameIcon loaded"), n.iconReady = !0, 0 == n.maskViewNum && n.owner.visible && n.gameIcon.show();
                    });
                }
            }
        }
        onEnable() {
            this.gameIcon && this.gameIcon.show();
        }
        onDisable() {
            this.gameIcon && this.gameIcon.hide();
        }
        updateIconStyle(e, s) {
            var i = this.owner.getChildByName("container");
            if (null != i) for (var a = 0; a < i.numChildren; a++) {
                const r = i.getChildAt(a);
                r.visible = !1;
                var n = this.owner.localToGlobal(new t.Point(r.x, r.y), !0);
                e.push({
                    appNameHidden: !0,
                    color: "white",
                    borderWidth: 1,
                    borderColor: "white",
                    top: n.y / t.stage.height * s.windowHeight,
                    left: n.x / t.stage.width * s.windowWidth,
                    size: r.width / t.stage.width * s.windowWidth
                });
            }
        }
        releaseView() {
            this.maskViewNum = -1, t.stage.off(s.UI_VIEW_OPENED, this, this.onViewOpened), t.stage.off(s.UI_VIEW_CLOSED, this, this.onViewClosed), 
            this.gameIcon && (this.gameIcon.destroy(), this.gameIcon = null);
        }
        onViewOpened(e, t) {
            t.zOrder > this.owner.zOrder && this.maskViewNum++, 0 != this.maskViewNum && this.gameIcon && this.iconReady && this.gameIcon.hide();
        }
        onViewClosed(e, t) {
            t.zOrder > this.owner.zOrder && this.maskViewNum--, 0 == this.maskViewNum && this.gameIcon && this.iconReady && this.gameIcon.show();
        }
    }
    t.ILaya.regClass(I), t.ClassUtils.regClass("zs.laya.platform.NativeIconAdView", I), 
    t.ClassUtils.regClass("Zhise.NativeIconAdView", I);
    class b extends t.Script {
        constructor() {
            super();
        }
        onAwake() {
            if (1 == a.isPublicVersion()) {
                var e = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf(".")), t = s.platformCfg.mistakenlyTouchCfg[e];
                if (t) for (var i = 0; i < t.length; i++) {
                    const e = t[i], s = this.findChildByPath(e.path);
                    var n = s.x, r = s.y;
                    if (a.zs_switch) {
                        var o = e.showType || "move";
                        "move" == o && a.zs_banner_vertical_enable ? (s.mouseEnabled = !1, s.x += e.offsetX, 
                        s.y += e.offsetY, this.owner.timerOnce(a.zs_banner_text_time, this, this.moveBack, [ n, r, a.zs_banner_move_time, s ], !1)) : "delay" == o && a.zs_button_delay_switch ? (s.mouseEnabled = !1, 
                        s.visible = !1, this.owner.timerOnce(a.zs_button_delay_time, this, this.showObj, [ s ], !1)) : a.zs_unmiss_text_time > 0 && (s.mouseEnabled = !1, 
                        s.visible = !1, this.owner.timerOnce(a.zs_unmiss_text_time, this, this.showObj, [ s ], !1));
                    }
                }
            }
        }
        moveBack(e, s, i, a) {
            t.Tween.to(a, {
                x: e,
                y: s
            }, i, null, t.Handler.create(this, this.activeObj, [ a ]));
        }
        activeObj(e) {
            e.mouseEnabled = !0;
        }
        showObj(e) {
            e.visible = !0, e.mouseEnabled = !0;
        }
        findChildByPath(e) {
            for (var t = e.split("/"), s = this.owner, i = 0; i < t.length; i++) s = s.getChildByName(t[i]);
            return s;
        }
    }
    t.ILaya.regClass(b), t.ClassUtils.regClass("zs.laya.platform.MistakenlyTouchCtrl", b), 
    t.ClassUtils.regClass("Zhise.MistakenlyTouchCtrl", b);
    class V extends t.Script {
        onEnable() {
        }
        showBanner(e) {
        }
        onDisable() {
        }
    }
    t.ILaya.regClass(V), t.ClassUtils.regClass("zs.laya.platform.BannerCtrl", V), t.ClassUtils.regClass("Zhise.BannerCtrl", V), 
    e.PlatformMgr = s, e.MathUtils = i, e.ADConfig = a, e.ExportGameCtrl = o, e.NativeAdsCtrl = y, 
    e.MistakenlyTouchCtrl = b, e.BannerCtrl = V;
}(window.zs.laya.platform = window.zs.laya.platform || {}, Laya);