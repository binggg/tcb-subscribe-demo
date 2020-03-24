const cloud = require('wx-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();

  // @todo 实现定时发送订阅消息逻辑
};
