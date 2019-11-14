const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async event => {
  try {
    const {OPENID} = cloud.getWXContext();
    // @todo 删除订阅的消息
  } catch (err) {
    console.log(err);
    return err;
  }
};
