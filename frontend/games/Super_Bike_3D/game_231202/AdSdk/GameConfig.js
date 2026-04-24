"use strict";

window.GameConfig = { config: {}, GetConfig: function GetConfig(v) {
    return GameConfig.config[v] ? GameConfig.config[v] : 0;
  }, GetServerConfig: function GetServerConfig(ConfigId) {
    var params = { gameId: ConfigId },
        jsonword = JSON.stringify(params),
        Event = Laya.Event,
        xhr = new Laya.HttpRequest();xhr.http.timeout = 1e4, xhr.once(Event.COMPLETE, this, function (data) {
      if ("null" != data && data) {
        var j = JSON.parse(data);null != j && (GameConfig.config = j);
      }
    }), xhr.once(Event.ERROR, this, function (data) {}), xhr.on(Event.PROGRESS, this, function (data) {}), xhr.send("https://kg.bingo321.com/getGameConfig", "data=" + jsonword, "post", "text");
  } };