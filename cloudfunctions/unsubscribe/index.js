const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async event => {
  try {
    const {OPENID} = cloud.getWXContext();
    // 删除订阅的消息
    const result = await db
      .collection('messages')
      .where({
        touser: OPENID,
        templateId: event.templateId,
        id: event.id,
      })
      .remove();
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};
