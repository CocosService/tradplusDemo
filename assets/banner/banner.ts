import { _decorator, Component } from 'cc';
import { Console } from '../prefabs/console';
const { ccclass, property } = _decorator;

@ccclass('Banner')
export class Banner extends Component {
  @property({ type: Console })
  console: Console = null!;

  private banner: tradplus.Banner | null = null;

  loadAd() {
    if (this.banner) {
      this.console.log('Banner Ad already exists, reload Ad');
      this.banner.loadAd();
      return;
    }

    this.console.log('Load Ad');

    this.banner = new tradplus.Banner('A24091715B4FCD50C0F2039A5AF7C4BB');

    this.banner.setAdListener({
      onAdLoaded: (adInfo: tradplus.AdInfo) => {
        this.console.log('onAdLoaded, adInfo:', adInfo);
      },

      onAdClicked: (adInfo: tradplus.AdInfo) => {
        this.console.log('onAdClicked, adInfo:', adInfo);
      },

      onAdImpression: (adInfo: tradplus.AdInfo) => {
        this.console.log('onAdImpression, adInfo:', adInfo);
      },

      onAdShowFailed: (adError: tradplus.AdError, adInfo: tradplus.AdInfo) => {
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

    this.banner.loadAd();
  }

  hideBanner() {
    if (!this.ensureBanner()) return;
    if (!this.banner) return; // Make compiler happy

    this.console.log('Hide Banner');
    this.banner.setVisibility(false);
  }

  showBanner() {
    if (!this.ensureBanner()) return;
    if (!this.banner) return; // Make compiler happy

    this.console.log('Show Banner');
    this.banner.setVisibility(true);
  }

  switchPosition() {
    if (!this.ensureBanner()) return;
    if (!this.banner) return; // Make compiler happy

    this.console.log('Switch Position');
    if (this.banner.position === 'top') this.banner.position = 'bottom';
    else this.banner.position = 'top';
  }

  destroyAd() {
    if (!this.ensureBanner()) return;
    if (!this.banner) return; // Make compiler happy

    this.console.log('Destroy Ad');
    this.banner.destroyAd();
    this.banner = null;
  }

  ensureBanner(): boolean {
    if (!this.banner) {
      this.console.log('Please press the "Load Ad" button first');
      return false;
    }
    return true;
  }

  onDestroy() {
    this.banner?.destroyAd();
  }
}
