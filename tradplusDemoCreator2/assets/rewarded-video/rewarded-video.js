const { isAndroid } = require('../libs/os');

cc.Class({
  extends: cc.Component,

  properties: {
    console: require('console'),
  },

  start() {
    this.console.log('Setup Rewarded Video...');

    const adUnitId = isAndroid()
      ? '39DAC7EAC046676C5404004A311D1DB1'
      : '160AFCDF01DDA48CCE0DBDBE69C8C669';

    this.rewardedVideo = tradplus.tradPlusService.getRewardedVideo(
      adUnitId,
      true
    );

    this.rewardedVideo.entryAdScenario('177010A4403105');

    const customMap = {
      user_gender: 'male',
      user_level: '10',
    };

    // App level, for all placements.
    // tradplus.tradPlusService.initCustomMap(customMap);
    // Only for the specify placement, override the App level one.
    tradplus.tradPlusService.initPlacementCustomMap(adUnitId, customMap);

    this.rewardedVideo.setAdListener({
      onAdAllLoaded: (anyAdsLoadSucceeded) => {
        this.console.log(
          'onAdAllLoaded, anyAdsLoadSucceeded:',
          anyAdsLoadSucceeded
        );
      },

      onAdLoaded: () => {
        this.console.log('onAdLoaded');
      },

      onAdClicked: () => {
        this.console.log('onAdClicked');
      },

      onAdImpression: (adSourceName) => {
        this.console.log('onAdImpression, adSourceName:', adSourceName);
      },

      onAdFailed: (adError) => {
        this.console.log('onAdFailed, adError:', adError);
      },

      // iOS only
      onAdPlayFailed: (adError) => {
        this.console.log('onAdPlayFailed, adError:', adError);
      },

      onAdClosed: () => {
        this.console.log('onAdClosed');
      },

      onAdReward: (currencyName, amount) => {
        this.console.log(
          'onAdReward, currencyName:',
          currencyName,
          'amount:',
          amount
        );
      },

      // iOS only
      onAdNotReward: () => {
        this.console.log('onAdNotReward');
      },

      // Android only
      onOneLayerLoaded: (adSourceName) => {
        this.console.log('onOneLayerLoaded, adSourceName:', adSourceName);
      },

      // Android only
      onOneLayerLoadFailed: (adSourceName, adError) => {
        this.console.log(
          'onOneLayerLoadFailed, adSourceName:',
          adSourceName,
          'adError:',
          adError
        );
      },
    });
  },

  showAd() {
    if (this.rewardedVideo.ready) {
      this.console.log('Show Ad');
      this.rewardedVideo.showAd('');
    } else {
      this.console.log('No Ad is ready right now, please wait...');
    }
  },

  onDestroy() {
    if (this.rewardedVideo) this.rewardedVideo.destroyAd();
  },
});
