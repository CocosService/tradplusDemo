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
    tradplus.tradPlusService.initPlacementCustomMap(adUnitId, customMap);

    this.rewardedVideo.setAdListener({
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

      onAdClosed: (adInfo: tradplus.AdInfo) => {
        this.console.log('onAdClosed, adInfo:', adInfo);
      },

      onAdReward: (adInfo: tradplus.AdInfo) => {
        this.console.log('onAdReward, adInfo:', adInfo);
      },
    });

    this.rewardedVideo.setAllAdLoadListener({
      onAdAllLoaded: (anyAdsLoadSucceeded: boolean) => {
        this.console.log(
          'onAdAllLoaded, any Ads load succeeded?:',
          anyAdsLoadSucceeded
        );
      },

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

      oneLayerLoaded: (adInfo: tradplus.AdInfo) => {
        this.console.log('oneLayerLoaded, adInfo:', adInfo);
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
