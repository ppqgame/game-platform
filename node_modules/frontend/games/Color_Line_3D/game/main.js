require("runtime-adapter.js");
//require("js/AdSDK.js");
//require("js/GameSDK.js");
require("js/egret.js");
require("js/egret.web.js");
require("js/game.min_8f561331.js");
require("js/tween.min_6c5a88f9.js");
require("js/assetsmanager.min_77c2fdfe.js");
require("js/promise.min_83a6a5d.js");
require("js/particle.min_27fe451d.js");
require("js/Box2dweb.min_359951aa.js");
require("js/vconsole.min_314a0209.js");
require("js/huhu.js");
require("js/main.min_5516f2e9.js");
setTimeout(() => { egret.runEgret({
renderMode: "webgl", audioType: 0, calculateCanvasScaleFactor: function (context) {
var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio ||context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
return (window.devicePixelRatio || 1) / backingStore; }
}); }, 0);