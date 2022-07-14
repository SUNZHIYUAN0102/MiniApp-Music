import config from './config'
export default (
    url,
    method = "GET",
    data = {},
) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.host + url,
            method,
            data,
            header: {
                cookie: wx.getStorageSync('cookie') ? wx.getStorageSync('cookie').find(item => item.indexOf("MUSIC_U") !== -1) : ''
            },
            success: (res) => {
                if (data.isLogin) wx.setStorageSync('cookie', res.cookies)
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}