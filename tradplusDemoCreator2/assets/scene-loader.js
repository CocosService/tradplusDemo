cc.Class({
  extends: cc.Component,

  loadScene(_event, sceneName) {
    cc.director.loadScene(sceneName);
  },
});
