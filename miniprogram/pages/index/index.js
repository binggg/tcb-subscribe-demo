//index.js
const app = getApp();
const lessonTmplId = 'LNzdOCyTK9-9unqtUZPlD-pB2aFTVfBbuxBQ-HyFO7s';

const formatDate = dateTime => {
  const date = new Date(dateTime);
  return `${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
};

const lessons = [
  {
    id: 1,
    startTime: new Date().getTime() + 32 * 60 * 1000,
    title: '云开发接入订阅消息课程',
    teacher: '赵兵',
    description: '教你用云开发快速接入订阅消息',
  },
  {
    id: 2,
    startTime: new Date().getTime() + 60 * 60 * 1000,
    title: '云开发定时触发器学习课程',
    teacher: '赵兵',
    description: '教你使用定时触发器',
  },
  {
    id: 3,
    title: '云调用知识学习',
    startTime: new Date().getTime() + 24 * 60 * 60 * 1000,
    teacher: '赵兵',
    description: '云调用比传统后台调用微信接口有哪些优势？',
  },
].map(lesson => ({
  ...lesson,
  startTimeString: formatDate(lesson.startTime),
}));

Page({
  data: {
    lessons,
  },
  onSubscribe: function(e) {
    // 获取课程信息
    const item = e.currentTarget.dataset.item;

    // 调用微信 API 申请发送订阅消息
    wx.requestSubscribeMessage({
      // 传入订阅消息的模板id，模板 id 可在小程序管理后台申请
      tmplIds: [lessonTmplId],
      success(res) {
        // 申请订阅成功
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          // 这里将订阅的课程信息调用云函数存入db
          wx.cloud
            .callFunction({
              name: 'subscribe',
              data: {
                ...item,
                data: {
                  thing2: {value: item.title},
                  date5: {value: item.startTimeString},
                  phrase4: {value: item.teacher},
                  thing3: {value: item.description},
                },
                templateId: lessonTmplId,
              },
            })
            .then(() => {
              wx.showToast({
                title: '订阅成功',
                icon: 'success',
                duration: 2000,
              });
            })
            .catch(() => {
              wx.showToast({
                title: '订阅失败',
                icon: 'success',
                duration: 2000,
              });
            });
        }
      },
    });
  },
  onUnsubscribe: function(e) {
    // 获取课程信息
    const item = e.currentTarget.dataset.item;

    // 这里将订阅的课程信息调用云函数存入db
    wx.cloud
      .callFunction({
        name: 'unsubscribe',
        data: {
          id: item.id,
          templateId: lessonTmplId,
        },
      })
      .then(() => {
        wx.showToast({
          title: '取消订阅成功',
          icon: 'success',
          duration: 2000,
        });
      })
      .catch(() => {
        wx.showToast({
          title: '取消订阅失败',
          icon: 'success',
          duration: 2000,
        });
      });
  },
});
