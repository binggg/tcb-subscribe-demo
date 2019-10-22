//index.js
const app = getApp();
const lessonTmplId = 'LNzdOCyTK9-9unqtUZPlD-pB2aFTVfBbuxBQ-HyFO7s';

Page({
  data: {
    lessons: [
      {
        id: 1,
        thing2: {value: '云开发接入订阅消息课程'},
        date5: {value: '2019-10-22'},
        phrase4: {value: '赵兵'},
        thing3: {value: '教你用云开发快速接入订阅消息'},
      },
      {
        id: 2,
        thing2: {value: '云开发定时触发器学习课程'},
        date5: {value: '2019-10-22'},
        phrase4: {value: '赵兵'},
        thing3: {value: '教你使用定时触发器'},
      },
    ],
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
                data: item,
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
});
