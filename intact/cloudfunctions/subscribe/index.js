const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async event => {
  try {
    const {OPENID} = cloud.getWXContext();

    // 防止重复存储
    let message = await db
      .collection('messages')
      .where({
        id: event.id,
        touser: OPENID,
        templateId: event.templateId,
      })
      .get();

    if (message.data.length) {
      return message;
    }

    // 在云开发数据库中存储用户订阅的信息
    const result = await db.collection('messages').add({
      data: {
        ...event,
        touser: OPENID,
        page: 'index',
        done: false, // 消息发送状态设置为 false
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};
