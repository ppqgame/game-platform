
window.require = loadLib;

var container=document.createElement("div");             //创建一个div
container.id = "container";
var loader=document.createElement("div");             //创建一个div
loader.id = "loader";
var canvas=document.createElement("canvas");             //创建一个div
canvas.id = "canvas";
       
document.body.appendChild(container);
document.body.appendChild(loader);
document.body.appendChild(canvas);




require("js/all.js");