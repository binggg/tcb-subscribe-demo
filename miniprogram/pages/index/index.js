//index.js
const app = getApp();
const lessonTmplId = 'LNzdOCyTK9-9unqtUZPlD-pB2aFTVfBbuxBQ-HyFO7s';

const formatDate = dateTime => {
  const date = new Date(dateTime);
  return `${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
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
    // @todo 实现订阅逻辑
  },
  onUnsubscribe: function(e) {
    // @todo 实现取消订阅逻辑
  },
});
