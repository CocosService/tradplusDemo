import { _decorator, Component, Node } from 'cc';
import { Console } from '../prefabs/console';
const { ccclass, property } = _decorator;

@ccclass('Banner')
export class Banner extends Component {
  @property({ type: Console })
  console: Console = null!;

  private bannerAd: tradplus.BannerAd | null = null;

  loadAd() {
    if (this.bannerAd) {
      this.console.log('Banner Ad already exists, reload Ad');
    } else {
      this.console.log('Load Ad');

      this.bannerAd = new tradplus.BannerAd('A24091715B4FCD50C0F2039A5AF7C4BB');

      this.bannerAd.setAdListener({
        onAdLoaded: (adInfo: tradplus.AdInfo) => {
          this.console.log('onAdLoaded, adInfo:', adInfo);
        },

        onAdClicked: (adInfo: tradplus.AdInfo) => {
          this.console.log('onAdClicked, adInfo:', adInfo);
        },

        onAdImpression: (adInfo: tradplus.AdInfo) => {
          this.console.log('onAdImpression, adInfo:', adInfo);
        },

        onAdShowFailed: (
          adError: tradplus.AdError,
          adInfo: tradplus.AdInfo
        ) => {
          this.console.log(
            'onAdShowFailed, adError:',
            adError,
            'adInfo:',
            adInfo
          );
        },

        onAdLoadFailed: (adError: tradplus.AdError) => {
          this.console.log('onAdLoadFailed, adError:', adError);
        },

        onAdClosed: (adInfo: tradplus.AdInfo) => {
          this.console.log('onAdClosed, adInfo:', adInfo);
        },

        onBannerRefreshed: () => {
          this.console.log('onBannerRefreshed');
        },
      });
    }

    this.bannerAd.loadAd();
  }

  toggleVisibility() {
    if (!this.ensureBannerAd()) return;
    if (!this.bannerAd) return; // Make compiler happy

    this.console.log('Toggle Visibility');
    this.bannerAd.visible = !this.bannerAd.visible;
    this.console.log('visible:', this.bannerAd.visible);
  }

  switchPosition() {
    if (!this.ensureBannerAd()) return;
    if (!this.bannerAd) return; // Make compiler happy

    this.console.log('Switch Position');
    if (this.bannerAd.position === 'top') this.bannerAd.position = 'bottom';
    else this.bannerAd.position = 'top';
  }

  destroyAd() {
    if (!this.ensureBannerAd()) return;
    if (!this.bannerAd) return; // Make compiler happy

    this.console.log('Destroy Ad');
    this.bannerAd.destroyAd();
    this.bannerAd = null;
  }

  ensureBannerAd(): boolean {
    if (!this.bannerAd) {
      this.console.log('Please press the "Load Ad" button first');
      return false;
    }
    return true;
  }

  onDestroy() {
    this.bannerAd?.destroyAd();
  }
}
