"use strict";

(function () {
    var GameSDK = window.GameSDK = {
        // CallBack
        callBacks: {},
        // Internal -- Call Native
        callNative: function (cmd, param) {
            param = param == null ? "" : JSON.stringify(param);
            var rt = loadRuntime();
            rt.callCustomCommand({
                success(msg) {
                  console.log('success:', msg);
                },
                fail(msg) {
                  console.log('fail:', msg);    
                },
            }, cmd, param);
        },

        nativeCallback: function (cmd, param) {
            var func = this.callBacks[cmd];
            if (func) {
                func(JSON.parse(param));
            }
        },

        registerCallback: function (cmd, func) {
            this.callBacks[cmd] = func;
        },

        // 设置回调函数
        setOnInitCB: function (func) {
            this.registerCallback("onInit", func);
        },

        setOnRoomInfoCB: function (func) {
            this.registerCallback("onRoomInfo", func);
        },

        setOnReadyCB: function (func) {
            this.registerCallback("onReady", func);
        },

        setOnStartCB: function (func) {
            this.registerCallback("onStart", func);
        },

        setOnMessageCB: function (func) {
            this.registerCallback("onMessage", func);
        },

        setOnFinishCB: function (func) {
            this.registerCallback("onFinish", func);
        },

        setOnAudioCB: function (func) {
            this.registerCallback("onAudio", func);
        },

        setOnResumeCB: function (func) {
            this.registerCallback("onResume", func);
        },

        setOnPauseCB: function (func) {
            this.registerCallback("onPause", func);
        },

        setOnPayCB : function( func ){
            this.registerCallback("onPay", func);
        },
        
        // 初始化SDK
        // 参数:
        //   gameId: int 游戏ID
        init: function (gameId) {
            var param = {
                "gameId": gameId
            };
            this.callNative("init", param);
        },

        // 退出游戏
        // 参数:
        //   reason: int 退出原因: 1 - 正常退出，2-异常退出
        quit: function (reason) {
            var param = {
                "reason": reason
            };
            this.callNative("quit", param);
        },


        // 获取游戏房间信息
        getRoomInfo: function () {
            this.callNative("getRoomInfo");
        },

        // 游戏终止
        // 参数:
        //   result: int 游戏结果: 1、胜，2、负，3、平
        finish: function (result) {
            var param = {
                "result": result
            };
            this.callNative("finish", param);
        },

        // 设置屏幕朝向
        // 参数:
        //    orientation: int 屏幕朝向: 0、横屏，1、竖屏
        setOrientation: function (orientation) {
            var param = {
                "orientation": orientation
            };
            this.callNative("setOrientation", param);
        },

        // 设置声音
        // 参数:
        //   enable: int 是否开启: 0、关闭，1、开启
        //   volume: int 音量
        setAudio: function (enable, volume) {
            var param = {
                "enable": enable,
                "volume": volume
            };
            this.callNative("setAudio", param);
        },

        // 设置麦克风
        // 参数:
        //   enable: int 是否开启: 0、关闭，1、开启
        //   volume: int 音量: 0 ~ 100
        setMic: function (enable, volume) {
            var param = {
                "enable": enable,
                "volume": volume
            };
            this.callNative("setMic", param);
        },

        // 设置游戏加载进度（SDK版本 >= 2）
        // 参数:
        //    progress: int 加载进度: 0 ~ 100
        // 说明: 从SDK版本2开始，平台增加了统一的游戏加载进度界面，用于游戏后台加载时显示。
        //      游戏需要在初始化后，通过此函数报告游戏加载进度。加载界面将显示“加载中...”
        //      当进度>=100%时，加载界面并不会关闭，加载界面将提醒用户“等待对手进入中...”
        //      因此，游戏需要在对手都进入房间后，调用hideLoadProgress函数关闭加载界面。
        setLoadProgress: function (progress) {
            var param = {
                "progress": progress
            };
            this.callNative("setLoadProgress", param);
        },

        // 隐藏游戏加载进度（SDK版本 >= 2）
        // 参数:
        //    无
        // 说明: 用于关闭加载进度界面。此后玩家才可以和游戏交互。
        hideLoadProgress: function () {
            var param = {};
            this.callNative("hideLoadProgress", param);
        },

        // 游戏准备
        // 参数
        //   userData: string 用户数据
        ready: function (userData) {
            var param = {
                "userData": userData
            }
            this.callNative("ready", param);
        },

        // 游戏消息广播
        // 参数
        //  message: string 广播的消息
        //  includeMe: int 是否也广播给自己: 0、不包含，1、包含
        broadcast: function (message, includeMe) {
            if (includeMe == null) {
                includeMe = 0;
            }
            var param = {
                "message": message,
                "includeMe": includeMe
            }
            this.callNative("broadcast", param);
        },

        // 游戏结束
        // 参数
        //   result: int 游戏结果: 1、胜，2、负，3、平
        gameOver: function (result) {
            var param = {
                "result": result,
            }
            this.callNative("gameOver", param);
        },

        // 游戏支付
        // 参数
        //   orderId: int 订单号
        //   goodsName: string 商品名称
        //   goodsDesc: string 商品描述
        //   orderAmount: int 订单金额
        //   extension： string 透传参数
        //   notifyURL: string 支付付款通知地址
        pay: function (orderId, goodsName, goodsDesc, orderAmount, extension, notifyURL) {
            var param = {
                "orderId": orderId,
                "goodsName": goodsName,
                "goodsDesc": goodsDesc,
                "orderAmount": orderAmount,
                "extension": extension,
                "notifyURL": notifyURL
            }
            this.callNative("pay", param);
        },
    }
})()
