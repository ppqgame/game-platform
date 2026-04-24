
window["INFO_CONIFG"] = {
   
}

window["JS_CONIFG"] = {
    
   
    "ADManage": "../sdk/ADManage.js",

    "platform": "../sdk/platform.js",

    "layaParse": "../sdk/layaParse.js",
	"layaParse2": "../sdk/layaParse2.js",
    "layaParse_url":"../sdk/layaParse_url.min.js",
    "cocosParse": "../sdk/cocosParse.js",
    "cocosParse2.x":"../sdk/cocosParse2.x.js",

    "new_layaParse": "../sdk/new_layaParse.js",
	"new_layaParse2": "../sdk/new_layaParse2.js",
    "new_cocosParse": "../sdk/new_cocosParse.js",
    "new_cocosParse2.x":"../sdk/new_cocosParse2.x.js",
    "listGame":[
       
    ]
}



window["AD_CONIFG"] = {

    "gdDataAdChannel": "5812719715",
    "gdAdclient": 'ca-pub-2270136017335510',
    "gdBannerclient": 'ca-pub-2270136017335510',
    "gdBannerSlot": '4285113105',
    "gdBannerSlot100": '4285113105',
    "gaConfig":"UA-120043346-113"
    
};

window["AD_2"] = {
   
    "time": "45s",
    "preloadAdBreaks": "on",
    "delayedTime":4000
};

var initRandomBanner = function(){
    //9466359076  8612442405   3519897828  8153277405  3360115725  5762917788
    var arrBanner = ["9466359076", "8612442405" ,"3519897828", "8153277405", "3360115725", "5762917788"];
    var strIndex = localStorage.getItem("lxt_banner_Index");
    var oldBannerIndex = 0;
    if(strIndex == null || strIndex == "" )
    {
        oldBannerIndex = Math.floor(Math.random() * arrBanner.length)
    }else{
        oldBannerIndex = parseInt(strIndex);
        oldBannerIndex ++;
        if(oldBannerIndex > arrBanner.length - 1){
            oldBannerIndex = 0;
        }
    }
    localStorage.setItem("lxt_banner_Index",oldBannerIndex+"");
    window["AD_CONIFG"].gdBannerSlot = arrBanner[oldBannerIndex];
    window["AD_CONIFG"].gdBannerSlot100 = arrBanner[oldBannerIndex];

}

initRandomBanner();


function initADConfig(){}


