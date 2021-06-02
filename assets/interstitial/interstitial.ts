import { _decorator, Component } from 'cc';
import { isAndroid } from '../libs/os';
import { Console } from '../prefabs/console';
const { ccclass, property } = _decorator;

@ccclass('Interstitial')
export class Interstitial extends Component {
  @property({ type: Console })
  console: Console = null!;

  private interstitial: tradplus.Interstitial | null = null;

  start() {
    this.console.log('Setup Interstitial Ad...');

    const adUnitId = isAndroid()
      ? 'E609A0A67AF53299F2176C3A7783C46D'
      : '063265866B93A4C6F93D1DDF7BF7329B';

    this.interstitial = tradplus.tradPlusService.getInterstitial(
      adUnitId,
      true
    );

    // this.interstitial.entryAdScenario('01EAD2CCED1870');

    const customMap = {
      user_gender: 'male',
      user_level: '10',
    };

    // App Scope, for all placement.
    // tradplus.tradPlusService.initCustomMap(customMap);
    // Only for the specify placement, override the App scope's one.
    // NOTE: Currently, this API only work on Android.
    tradplus.tradPlusService.initPlacementCustomMap(adUnitId, customMap);

    this.interstitial.setAdListener({
      onAdAllLoaded: (anyAdsLoadSucceeded: boolean) => {
        this.console.log(
          'onAdAllLoaded, anyAdsLoadSucceeded:',
          anyAdsLoadSucceeded
        );
      },

      onAdLoaded: (adInfo: tradplus.AdInfo) => {
        this.console.log('onAdLoaded, adInfo:', adInfo);
      },

      onAdClicked: (adInfo: tradplus.AdInfo) => {
        this.console.log('onAdClicked, adInfo:', adInfo);
      },

      onAdImpression: (adInfo: tradplus.AdInfo) => {
        this.console.log('onAdImpression, adInfo:', adInfo);
      },

      onAdFailed: (adError: tradplus.AdError) => {
        this.console.log('onAdFailed, adError:', adError);
      },

      // iOS only
      onAdPlayFailed: (adError: tradplus.AdError) => {
        this.console.log('onAdPlayFailed, adError:', adError);
      },

      onAdClosed: (adInfo: tradplus.AdInfo) => {
        this.console.log('onAdClosed, adInfo:', adInfo);
      },

      // Android only
      oneLayerLoaded: (adInfo: tradplus.AdInfo) => {
        this.console.log('oneLayerLoaded, adInfo:', adInfo);
      },

      // Android only
      oneLayerLoadFailed: (
        adError: tradplus.AdError,
        adInfo: tradplus.AdInfo
      ) => {
        this.console.log(
          'oneLayerLoadFailed, adError:',
          adError,
          'adInfo:',
          adInfo
        );
      },
    });
  }

  showAd() {
    if (!this.interstitial) return; // Show not return.

    if (this.interstitial.ready) {
      this.console.log('Show Ad');
      this.interstitial.showAd('');
    } else {
      this.console.log('No Ad is ready right now, please wait...');
    }
  }

  onDestroy() {
    this.interstitial?.destroyAd();
  }
}
