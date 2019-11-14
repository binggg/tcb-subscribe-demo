const cloud = require('wx-server-sdk')
var reuse = false
exports.main = async (event, context) => {
  if (reuse) {
    console.log(reuse)
  }
  reuse = true

  
  // event.userInfo 是已废弃的保留字段，在此不做展示
  // 获取 OPENID 等微信上下文请使用 cloud.getWXContext()
  delete event.userInfo

  const data = {
    reuse,
    HOSTNAME: process.env.HOSTNAME,
    source: process.env.TCB_SOURCE,
    env: process.env,
    event 
  }

  console.log({ reuse, source: process.env.TCB_SOURCE, env: process.env, event })

  return data
}
