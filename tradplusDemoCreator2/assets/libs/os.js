'use strict';

function isAndroid() {
  return cc.sys.platform === cc.sys.ANDROID;
}

module.exports = {
  isAndroid,
};
