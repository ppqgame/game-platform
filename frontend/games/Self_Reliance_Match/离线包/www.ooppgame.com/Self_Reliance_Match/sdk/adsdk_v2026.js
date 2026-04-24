
    window.addEventListener('scroll', function() {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        if(scrollTop != 0)
        {
            window.scrollTo(0, 0);
        }
    
        
    });
    
    document.addEventListener('touchmove',function(event) {
        event.preventDefault();
    },
    {
        passive: false
    });
    
    var ININAFG = window.ININAFG = {};
    var gGame = parent.window.gGame;
   
//==================================================================================================================================================
    // 创建并配置div
    const loadDiv = Object.assign(document.createElement("div"), {
    id: "loadDiv"
   
    });

    // 插入到body最前面
    document.body.prepend(loadDiv);

    var aa = `<div id="loadingMc" class="loadingMc">
    <div id="loader_tip" style="width:100%;height:50px;position:absolute;bottom:50px;margin-top:100px;z-index:99">
    <span id="tip_txt" style="color:#fff;font-weight: bolder;font-size: 14px;text-align: center;width:100%;display:inline-block;">Loading... Please wait.</span>
</div>
    <div class="progress-container">
        <div class="progress-circle">
        <div class="progress-circle-overlay"></div>
        </div>
        <div id="gameIconPanret" class="gameIconPanret">
            <img id="gameIcon"  src="">
        </div>
    </div>
    
    
    <div id="progress" class="progress">
        <div id="progress-bar-bg" class="progress-bar" ></div>
        <div id="progress-bar" class="progress-bar" style="opacity:0.9"></div>
    </div>
    <div id="loadNumPanret" class="loadNumPanret">
        <span id="game_name_txt" style="color:#fff;font-weight: bolder;font-size: 18px;text-align: center;width: 140px;left: -70px;position:absolute;opacity:0;transition:opacity 2s ease-in-out,transform 2s ease"></span>
    </div>
</div>`

loadDiv.innerHTML = aa;


    var allNum = 0;
    var jdt_time = setInterval(jdt_progress, 20); 
		var jdt_num = 0
		var jdt_bar = document.getElementById("progress-bar");
        var jdt_bar_value = document.getElementById("progress-bar-bg");
        jdt_bar.style.opacity=0;
        jdt_bar_value.style.opacity = 0;
        setTimeout(()=>{
            jdt_bar.style.opacity=1;
            jdt_bar_value.style.opacity = 1;
        },500)
		var jdt_color = ["#7829b9","#5b29b9","#29b9a6","#7310cf","#8eb929","#b95229"]
		var jdt_color_index = 0;
		var jdt_bg = document.getElementById("progress");
        var jdt_tip = document.getElementById("loader_tip");
        var tip_txt = document.getElementById("tip_txt");
		function jdt_progress() 
		{ 
			if (jdt_num < allNum) 
			{ 
				jdt_num++; 
				jdt_bar.style.width = jdt_num + "%";
				
			} 
			else { 
				jdt_color_index++;
				if(jdt_color_index >= jdt_color.length)
				{
					jdt_color_index = 0;
				}
				jdt_num = 0;
				jdt_bar.style.backgroundColor =  jdt_color[jdt_color_index];
				
			} 
		}

		if(gGame.show_banner == 0)
        {
            jdt_bg.style.bottom = 30+"px";
            jdt_tip.style.bottom = 50+"px";
		}else
		{
			if (window.orientation == 0 || window.orientation == 180) 
            {
                let adH = window.innerWidth/20*3;
                jdt_bg.style.bottom = adH+30+"px";
                jdt_tip.style.bottom = adH+50+"px";
            }else
            {
                jdt_bg.style.bottom = 30+"px";
                jdt_tip.style.bottom = 50+"px";
            }
		}

        var egretMain = window.egretMain == null ? window.egretMain = {} : window.egretMain;
     
    var loadTimeId = 0;
    var curjiadeNum = 0;
    var nAddJiaJD = 0;
    var curzhengshiNum = 0;

    var span = document.getElementById('span');
    const progressCircle = document.querySelector('.progress-circle');
    
    
    
     function setProgress(num,isAddStep = true,isClose=false)
    {
        //console.log("setProgress:",num,curzhengshiNum);
        if(isClose)
        {
            loadingMc = document.getElementById('loadingMc');
            loadingMc.style.display="none";
      
                clearInterval(loadTimeId);
                clearInterval(jdt_time);
        }else{

            
    
            
                if(num != -1)
                {
                    curzhengshiNum = num * 0.5;



                    if(num >= 100)
                    {
                        clearInterval(loadTimeId);
                        curjiadeNum = 50;
                        nAddJiaJD = 0;
                        //curjiadeNum = curzhengshiNum;
                    }

                }
                
                
                allNum = curzhengshiNum + curjiadeNum + nAddJiaJD;

                console.log(curzhengshiNum , curjiadeNum , nAddJiaJD);
                
                if(allNum > 100)
                {
                    allNum = 100;
                }

                if(Number.isNaN(allNum))
                {
                    return;
                }
                
                num = allNum.toFixed(2);

                
               // progressCircle.style.background = `conic-gradient(#08da4e ${num}%, #22618b ${num}%)`;
                jdt_bar_value.style.width = allNum + "%";
                tip_txt.innerHTML = num + " %";

            
        }
    }
    
   

        var targetNum = 50;
        var startNum = 0;
        var step = 1;

        loadTimeId = setInterval(function() {
            var diff = targetNum - startNum;
            var delta = diff / 30.0;
            step = delta * delta;
            step *= diff > 0 ? 1 : -1;
            startNum += step;
            if (diff > 0 && startNum >= targetNum || diff < 0 && startNum <= targetNum) {
                clearInterval(timer);
                startNum = targetNum;
            }
            curjiadeNum = startNum ;
            setProgress(-1)
           // console.log("------",curjiadeNum);
            if(curjiadeNum > 35 && curzhengshiNum == 0 && nAddJiaJD == 0)
            {
                nAddJiaJD = 1;
            }

            if(nAddJiaJD>0 && curzhengshiNum == 0)
            {
                nAddJiaJD += Math.random()*0.5;
                setProgress(-1)
               
            }


            console.log(Math.floor(curjiadeNum)) ;

        }, 1000/5);


    

    const game_name_txt = document.getElementById('game_name_txt');
    const progress_container = document.querySelector('.progress-container');
       // progress_container.style.top = (parseInt(progress_container.style.top, 10) - 200) + 'px';
       setTimeout(()=>{
        progress_container.style.opacity = 1;
            progress_container.style.transform = 'translateY(-100px)';
       },1000)
       
    setTimeout(()=>{
        //opacity
        game_name_txt.style.opacity = 1;
        game_name_txt.style.transform = 'translateY(-100px)';
    },2000)
        
    game_name_txt&&(game_name_txt.innerText = (gGame.name).replace(new RegExp("_","gi")," "));
    gameIcon = document.getElementById('gameIcon');
    var reqNum = 0;
    gameIcon.onerror = function() {
        reqNum ++;
        if(reqNum > 2)
        {
            return;
        }
        this.src = 'https://www.iningame.com/cy/sdk/icon/ininIcon.png';
       // document.getElementById('bg_icon').src = 'https://ali.iningame.com/cy/sdk/icon/ininIcon.png';
    };

    gameIcon.src = 'https://www.iningame.com/cy/sdk/icon/'+gGame.name+'.png';
    gameIcon.style.cssText = "width:100%;height:100%;object-fit: cover;"
    egretMain.setProgress = setProgress;


    //==================================================================================================================================================

    var purl = window.location.href;
    

    if(!gGame.show_banner)
    {
        window["isLandscape"] = true;
        
        gGame.banner_height = 0;
        gGame.show_banner = 0;
    
    }else
    {
        gGame.banner_height = 50;
    }
    
    
    

       // ININAFG.isTest = window["new_afg_isTest"];


        //判断是手机端还是pc端
        function checkMobile(){
           try{
                if( navigator.platform.match(/(Win|Mac)/i)) {
                    return false; //PC端
                }else{
                    return true; //  移动端
                }
           }catch(e){
                return false;
           }
            
        }
    
        var isMobile = checkMobile();
        var isFristXSI = true;
    
    

    gGame['isShowLoadNum'] = true;
    

    
        window["isLoadComplete"] = false;
        window["isUploadCY"] = false;
        window.uploadCYLoadComplete = function(){
            if(window["isLoadComplete"] && !window["isUploadCY"])
            {
                try{
                    window.parent.postMessage("gameLoadingCompleted", "*");
                   // window.h5sdk.gameLoadingCompleted();
                    window["isUploadCY"] = true;
                }catch(e){}
            }
        }
    
    
        
    
    
    
    
    var IninSdk = {
        
        ad_cmd: 0,
        show_center_times: 0,   
        lastRewarTime:0,
        lastInterTime:0,
        lastInterReqTime:0,
        isShowInterADSucc:false,
    
        msgPrompt: null,
        interTime:49000,
        interCPTime:50000,
        isVideoInter:false,
        isEn:false,
        isOpenAHA:true,
        loadAdJS:0,
        landscapeAdTime:0,

    
    init:function()
    {
    
        window.onresize=function(){
            IninSdk.resetGameFrameSize()
        };
        
        
        try{
            document.documentElement.style.overflowY = 'hidden';
            document.documentElement.style.overflowX = 'hidden';
        }catch(e){}
    
        IninSdk.resetGameFrameSize();
    
        var landscapeTip = document.getElementById('landscapeTip');
        if(landscapeTip!=null)
        {
            landscapeTip.onclick = function()
            {
                IninSdk.onFullScreenFunc();
                landscapeTip.style.display = "none";
            }

            landscapeTip.style.display = "none"
        }
    
        IninSdk.lastInterReqTime = new Date().getTime();
    
        window.addEventListener("orientationchange",IninSdk.orient, false);
       
    
    },
    checkLanguageKey:function () {
        var lang = (navigator.language || navigator.userLanguage).toLowerCase();
        if (lang.indexOf('zh') == -1) {
          //lang = 'en';
            IninSdk.isEn = true;
            //console.log("英文 ");
        }else
        {
            //console.log("中文 ");
            IninSdk.isEn = false;
        }
      },
    
    orient:function() {

        var jdt_bg = document.getElementById("progress");
        var jdt_tip = document.getElementById("loader_tip");
        if(window["isLandscape"])
        {
            jdt_bg.style.bottom = 30+"px";
            jdt_tip.style.bottom = 50+"px";
            
            var landscapeTip = document.getElementById('landscapeTip');
            if(landscapeTip!=null)
            {
                landscapeTip.style.display = "none";
              
            }
    
        }else{

           

            if (window.orientation == 0 || window.orientation == 180) 
            {
                
                jdt_bg.style.bottom = gGame.banner_height+30+"px";
                jdt_tip.style.bottom = gGame.banner_height+50+"px";
            }else
            {
                jdt_bg.style.bottom = 30+"px";
                jdt_tip.style.bottom = 50+"px";
            }
    
        }
    },
    

    
    resetGameFrameSize:function() {
    
        IninSdk.orient();    
    },
    
    showNewAfgInterstitial:function(func,type="next") {
        
           
        window.parent.postMessage("next", "*");
        // 定义iframe通信对象MIAD_NEXT
        window.parent.MIAD_NEXT = {};
        // 插屏广告播放成功
        window.parent.MIAD_NEXT._callback = function () {
          console.log('插屏广告观看完成');
          IninSdk.lastInterTime = new Date().getTime();
          func&&func(true);
        };
        // 插屏广告播放失败（注意原因可能是频次太快，建议在failback也能继续游戏流程）
        window.parent.MIAD_NEXT._failback = function () {
          console.log('插屏广告观看失败')
          func&&func(false);
        };
        
        
    },
    
    showInterstitial:function(func,type="next") 
    {
    
        //console.log("showInterstitial:插屏");
    
        //IninSdk.interstitialOptions = toptions;
        var timeNum = new Date().getTime();
        if(timeNum - IninSdk.lastInterReqTime < 10000)
        {
            func&&func(false);
            return;
        }
    
        if(isFristXSI)
        {
            
            if(timeNum - IninSdk.lastInterReqTime < 15000){
                func&&func(false);
                 return;
            }
        }
    
        if (timeNum - IninSdk.lastInterTime >= IninSdk.interTime) {
            
            IninSdk.showNewAfgInterstitial(func,type)
        } else {
            func&&func(false);
           
        }
    },
    showVideoToInterstitial:function(func){
    
        if (!IninSdk.canShowReward()) {
               
            IninSdk.showMsgBox('The ad failed to load, please try again later.');
            func(false);
         }else{
    
             if (new Date().getTime() - IninSdk.lastInterTime >= IninSdk.interTime && !IninSdk.isVideoInter)
             {

                IninSdk.isVideoInter = true;
    
                 setTimeout(()=>{
    
                     IninSdk.showNewAfgInterstitial((istrue)=>{
                         if(istrue)
                         {
                            IninSdk.lastInterTime = new Date().getTime();
                            func(true);

                         }else{

                            func(false);
                            IninSdk.showMsgBox('The ad failed to load, please try again later.');
                         }
                     },"browse");
                     
                 },1000)
    
                 
    
             }else{
    
                 IninSdk.showNewAfgReward(func);
    
             }
    
             
         }
    },
    playHutRewardedAd:function(func) {
    
       // console.log("playHutRewardedAd:0");
        if(gGame.name == "Poultry_Farm" || gGame.name == "Crazy_Ants")
        {
             return IninSdk.showVideoToInterstitial(func);
        }
    
        //console.log("playHutRewardedAd:1");
    
        if (!IninSdk.canShowReward()) {
               
            IninSdk.showMsgBox('The ad failed to load, please try again later.');
            func(false)
           
        }else{
            //console.log("playHutRewardedAd:3");
            IninSdk.showNewAfgReward(func);
        }
    
    },
    
    canShowReward:function() {
        if (IninSdk.lastRewarTime == 0 || new Date().getTime() - IninSdk.lastRewarTime >= 3000) {
            return true;
        } else {
            return false;
        }
    },
    
    showNewAfgReward:function(_callback) {
    
        window.parent.postMessage("reward", "*");
        // 定义iframe通信对象MIAD
        window.parent.MIAD = {};
        // 定义激励视频播放完成 发放奖励
        window.parent.MIAD._callback = function () {
          console.log('激励视频观看完成')
          _callback(true);
        };
        // 定义激励视频播放失败 不发放奖励
        window.parent.MIAD._failback = function () {
          console.log('激励视频观看失败')
          _callback(false);
          IninSdk.showMsgBox('Pls watch the ad completely, so that you can claim your reward.')
        };

        window.parent.MIAD._failLoadback = function () {
            console.log('激励视频加载失败')
            _callback(false);
            IninSdk.showMsgBox('Ad loading failed, please try again later.')
          };
    
    },
    
    showMsgBox:function(msg, duration) {
        if (!IninSdk.msgPrompt) {
            IninSdk.msgPrompt = document.createElement('div');
            IninSdk.msgPrompt.style.cssText = "font-family:siyuan;max-width:80%;min-width:320px;padding:10px 10px 10px 10px;min-height:40px;color: rgb(255, 255, 255);line-height: 20px;text-align:center;border-radius: 4px;position: fixed;top: 40%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
            document.body.appendChild(IninSdk.msgPrompt)
        }
        IninSdk.msgPrompt.innerHTML = msg;
        duration = isNaN(duration) ? 2000 : duration;
        IninSdk.msgPrompt.style.display = "inline";
        IninSdk.msgPrompt.style.opacity = '1';
        setTimeout(function() {
            var d = 0.5;
            IninSdk.msgPrompt.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            IninSdk.msgPrompt.style.opacity = '0';
            IninSdk.msgPrompt.style.display = "none"
        }.bind(this), duration)
    
    }
    
    }
    
    
    
    
    
    
    
    
    //console.log = console.info = console.warn = console.error = function () { };
        window.alert = function(str){
            return ;
        }
    
    
    function createLink(cssURL){
    
        var head = document.getElementsByTagName('head')[0],
        
        linkTag = null;
      
        linkTag = document.createElement('link');
        
        linkTag.setAttribute('rel','stylesheet');
        
        linkTag.setAttribute('type','text/css');
        
        linkTag.href = cssURL;
        
        head.appendChild(linkTag);
        
        }
    

    
    
    ININAFG.playRewardedAfg = IninSdk.playHutRewardedAd;
    ININAFG.showInterstitial = IninSdk.showInterstitial;
    
    ININAFG.showMsgBox = IninSdk.showMsgBox;

    
    
    
    
    ININAFG.gGame = gGame;
    //ININAFG.isEn = IninSdk.isEn;
    
    
    IninSdk.init();
    
    
    
    
    ININAFG.showAD = function(top=null,left=null,bottom=null,right=null)
    {
    }
    
    ININAFG.hideAD = function()
    {
    }
    
    ININAFG.sendEvent = function(eventname,param1=null,param2=null)
    {
    }
    
    ////////////////////////增加多重广告  左侧////////////////////////////////////////////////////////////////////////////////////////
    ININAFG.landscapeAd = null;
    
    
    ININAFG.listenBannerAfcShowStatus=function() {
       
    }
    
    ININAFG.initLandscape = function(){
        
    }
    
    
    
    ININAFG.timer = null;


     //==============================================================
     ININAFG.setProgressEnd = function()
     {
        console.log("LOADING结束时间--11");
        // var loadingMc = document.getElementById('loadingMc');
        // loadingMc.style.display="none";
     
        // setProgress(100, true, true);
 
     }
 
     ININAFG.gameLoadingCompleted = function()
     {
        console.log("LOADING结束时间--00");
        window["isLoadComplete"] = true;

        window.uploadCYLoadComplete();

        setProgress(100,true,true);
     }
 
     
    
    
    if(gGame.name == "Stick_Defense")
    {
        setProgress(100, true, true);
    }

    function sdkLoadoffline(url,callback,asy=true) {
        console.log(url);
        var script = document.createElement("script");
        script.async = asy;
        script.src = url;
        script.addEventListener('load', function () {
            script.parentNode.removeChild(script);
            script.removeEventListener('load', arguments.callee, false);
            callback&&callback();
        }, false);
        document.body.appendChild(script);
    }

    // if(new Date().getTime() > 1766283692000)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    // {
    //     sdkLoadoffline("https://www.iningame.com/cy/config.js")
    // }

  
    function getAndroidVersion() {
        const ua = navigator.userAgent;
        const match = ua.match(/Android\s([0-9\.]+)/);
        return match ? match[1] : null;
    }
    
    const version = getAndroidVersion();
    console.log('Android版本:', version);

    // 进入页面时，添加一条历史记录
history.pushState(null, null, document.URL);

// 监听后退事件，并重新 pushState 阻止后退
window.addEventListener('popstate', function() {
    history.pushState(null, null, document.URL);
    // 可以在这里提示用户不能后退
    //alert("当前页面不允许后退！");
});
    
    
    