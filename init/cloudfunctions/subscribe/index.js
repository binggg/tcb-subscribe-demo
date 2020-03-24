const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async event => {
  try {
    const {OPENID} = cloud.getWXContext();
    // @todo 将消息内容存储在 messages 集合，并做去重
  } catch (err) {
    console.log(err);
    return err;
  }
};
