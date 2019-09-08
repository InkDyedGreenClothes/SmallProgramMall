import wepy from 'wepy'

const baseURL = 'https://www.zhengzhicheng.cn/api/public/v1'
/**
 * 封装了 提示 wx.showToast
 */
wepy.baseToast = function (str = '获取数据失败') {
  wepy.showToast({
    title: str,
    // 弹框不写带图标
    icon: 'none',
    duration: 1500
  })
}

/**
 * 发起 Get/POSt 请求的API
 * @Url 请求的地址 为相对路线 必须以/ 开发
 * @data 请求的参数对象
 */
wepy.get = function (url, data = {}) {
  return wepy.request({
    url: baseURL + url,
    method: "get",
    data: data
  })
}

wepy.post = function (url, data = {}) {
    return wepy.request({
      url: baseURL + url,
      method: "post",
      data: data
    })
  }