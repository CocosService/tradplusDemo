import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('Startup')
export class Startup extends Component {
  start() {
    // @ts-ignore
    cc.debug.setDisplayStats(false); // 不显示左下角的FPS等调试信息

    // 启用调试日志，仅测试时使用，上线前请注释掉
    tradplus.tradPlusService.setEnableLog(true);
    // 启用测试模式，仅测试时使用，上线前请注释掉
    tradplus.tradPlusService.setNeedTestDevice(true);

    tradplus.tradPlusService.initSdk();
  }
}
