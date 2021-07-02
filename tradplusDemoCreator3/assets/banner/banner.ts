import { _decorator, Component } from 'cc';
import { isAndroid } from '../libs/os';
import { Console } from '../prefabs/console';
const { ccclass, property } = _decorator;

@ccclass('Banner')
export class Banner extends Component {
  @property({ type: Console })
  console: Console = null!;

  private banner: tradplus.Banner | null = null;
  private lastAdPosition: 'top' | 'bottom' = 'top';

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
      ? 'A24091715B4FCD50C0F2039A5AF7C4BB'
      : '6008C47DF1201CC875F2044E88FCD287';

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
