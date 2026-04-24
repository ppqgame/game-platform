//注意： require的路径务必根据 runtime-adapter.js 和 index.js 存放路径和实际文件名填写
//添加适配文件
window.loadLib=window.require;

window.exports = window;
window._isReWriteExport = true;

//require("js/AdSDK.js");
//require("js/GameSDK.js");
//导入游戏运行代码 index.js
require("index.js");