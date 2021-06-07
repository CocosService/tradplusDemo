import { _decorator, Component } from 'cc';
import { isAndroid } from '../libs/os';
import { Console } from '../prefabs/console';
const { ccclass, property } = _decorator;

@ccclass('RewardedVideo')
export class RewardedVideo extends Component {
  @property({ type: Console })
  console: Console = null!;

  private rewardedVideo: tradplus.RewardedVideo | null = null;

  start() {
    this.console.log('Setup Rewarded Video...');

    const adUnitId = isAndroid()
      ? '39DAC7EAC046676C5404004A311D1DB1'
      : '160AFCDF01DDA48CCE0DBDBE69C8C669';

    this.rewardedVideo = tradplus.tradPlusService.getRewardedVideo(
      adUnitId,
      true
    );

    // this.rewardedVideo.entryAdScenario('177010A4403105');

    const customMap = {
      user_gender: 'male',
      user_level: '10',
    };

    // App Scope, for all placement.
    // tradplus.tradPlusService.initCustomMap(customMap);
    // Only for the specify placement, override the App scope's one.
    // NOTE: Currently, this API only work on Android.
    tradplus.tradPlusService.initPlacementCustomMap(adUnitId, customMap);

    this.rewardedVideo.setAdListener({
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

      onAdReward: (currencyName: string, amount: number) => {
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
    if (!this.rewardedVideo) return; // Show not return.

    if (this.rewardedVideo.ready) {
      this.console.log('Show Ad');
      this.rewardedVideo.showAd('');
    } else {
      this.console.log('No Ad is ready right now, please wait...');
    }
  }

  onDestroy() {
    this.rewardedVideo?.destroyAd();
  }
}
