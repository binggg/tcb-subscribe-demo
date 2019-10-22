const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const {OPENID} = cloud.getWXContext();
    // 在云开发数据库中存储用户订阅的课程
    const result = await db.collection('messages').add({
      data: {
        touser: OPENID,
        page: 'index',
        data: event.data,
        templateId: event.templateId,
        done: false, // 消息发送状态设置为 false
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};
