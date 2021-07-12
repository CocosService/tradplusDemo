'use strict';

import { sys } from 'cc';

export function isAndroid(): boolean {
  return sys.platform === sys.ANDROID;
}
