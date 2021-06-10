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

    // App level, for all placements.
    // tradplus.tradPlusService.initCustomMap(customMap);
    // Only for the specify placement, override the App level one.
    tradplus.tradPlusService.initPlacementCustomMap(adUnitId, customMap);

    this.interstitial.setAdListener({
      onAdAllLoaded: (anyAdsLoadSucceeded: boolean) => {
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

      onAdImpression: (adSourceName: string) => {
        this.console.log('onAdImpression, adSourceName:', adSourceName);
      },

      onAdFailed: (adError: tradplus.AdError) => {
        this.console.log('onAdFailed, adError:', adError);
      },

      // iOS only
      onAdPlayFailed: (adError: tradplus.AdError) => {
        this.console.log('onAdPlayFailed, adError:', adError);
      },

      onAdClosed: () => {
        this.console.log('onAdClosed');
      },

      // Android only
      onOneLayerLoaded: (adSourceName: string) => {
        this.console.log('onOneLayerLoaded, adSourceName:', adSourceName);
      },

      // Android only
      onOneLayerLoadFailed: (
        adSourceName: string,
        adError: tradplus.AdError
      ) => {
        this.console.log(
          'onOneLayerLoadFailed, adSourceName:',
          adSourceName,
          'adError:',
          adError
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
