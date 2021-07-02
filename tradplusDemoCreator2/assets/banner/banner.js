const { isAndroid } = require('../libs/os');

cc.Class({
  extends: cc.Component,

  properties: {
    console: require('console'),
  },

  loadAd() {
    if (this.banner) {
      this.console.log('Banner Ad already exists, reload Ad in new position');
      if (this.lastAdPosition === 'top') this.lastAdPosition = 'bottom';
      else this.lastAdPosition = 'top';
      this.banner.loadAd(this.lastAdPosition);
      return;
    }

    this.console.log('Load Ad');

    const adUnitId = isAndroid()
      ? '18AFB0C3F2FA14F890ABFF8E7835BA03'
      : '83B7E8A06DCEBD0841800CF44E19D32F';

    this.banner = tradplus.tradPlusService.getBanner(adUnitId);

    this.banner.setAdListener({
      onAdLoaded: (adSourceName) => {
        this.console.log('onAdLoaded, adSourceName:', adSourceName);
      },

      onAdClicked: () => {
        this.console.log('onAdClicked');
      },

      onAdLoadFailed: (adError) => {
        this.console.log('onAdLoadFailed, adError:', adError);
      },

      onAdImpression: () => {
        this.console.log('onAdImpression');
      },

      // Android only
      onAdShowFailed: (adError) => {
        this.console.log('onAdShowFailed, adError:', adError);
      },

      // Android only
      onAdClosed: () => {
        this.console.log('onAdClosed');
      },

      // Android only
      onBannerRefreshed: () => {
        this.console.log('onBannerRefreshed');
      },
    });

    this.banner.loadAd(this.lastAdPosition);
  },

  hideBanner() {
    if (!this.ensureBanner()) return;
    if (!this.banner) return; // Make compiler happy

    this.console.log('Hide Banner');
    this.banner.setVisibility(false);
  },

  showBanner() {
    if (!this.ensureBanner()) return;
    if (!this.banner) return; // Make compiler happy

    this.console.log('Show Banner');
    this.banner.setVisibility(true);
  },

  destroyAd() {
    if (!this.ensureBanner()) return;
    if (!this.banner) return; // Make compiler happy

    this.console.log('Destroy Ad');
    this.banner.destroyAd();
    this.banner = null;
  },

  ensureBanner() {
    if (!this.banner) {
      this.console.log('Please press the "Load Ad" button first');
      return false;
    }
    return true;
  },

  onDestroy() {
    if (this.banner) this.banner.destroyAd();
  },
});
