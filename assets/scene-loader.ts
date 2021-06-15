import { _decorator, Component, director, Event } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneLoader')
export class SceneLoader extends Component {
  loadScene(_event: Event, sceneName: string) {
    director.loadScene(sceneName);
  }
}
