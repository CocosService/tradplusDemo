let isInitialized = false;

cc.Class({
  extends: cc.Component,

  properties: {
    console: require('console'),
  },

  start() {
    if (isInitialized) {
      this.console.log('SDK alrady initialized');
      return;
    }

    this.console.log('SDK is not initialized, initialize it');

    cc.debug.setDisplayStats(false); // 不显示左下角的FPS等调试信息

    // 启用调试日志，仅测试时使用，上线前请注释掉
    tradplus.tradPlusService.setEnableLog(true);

    // GDPR监听器需要在初始化SDK之前调用
    tradplus.privacy.setGDPRListener({
      onSuccess: () => {
        // 已知国家
        if (tradplus.privacy.isGDPRApplicable()) {
          this.console.log('GDPR is applicable');
          this.showGDPR();
        } else {
          this.console.log('GDPR is not applicable');
        }
      },
      onFailed: () => {
        // 未知国家，让用户自己选择GDPR等级
        this.console.log('Unknown country, let the user choose the GDPR level');
        this.showGDPR();
      },
    });

    tradplus.tradPlusService.initSdk();

    // 启用测试模式，仅测试时使用，上线前请注释掉
    tradplus.tradPlusService.setNeedTestDevice(true);

    isInitialized = true;
  },

  showGDPR() {
    if (!tradplus.privacy.isFirstShowGDPR()) {
      tradplus.privacy.showUploadDataNotifyDialog();
    } else {
      this.console.log('User already choosen a GDPR level');
    }
  },
});
