// pages/personal/personal.js
let startY = 0;
let moveY = 0;
let moveDistance = 0;
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coverTransform: 'translateY(0)',
        coverTransition: '',
        userInfo: {},
        recentPlayList: []
    },

    handleTouchStart(e) {
        this.setData({
            coverTransition: ""
        })
        startY = e.touches[0].clientY;
    },

    handleTouchMove(e) {
        moveY = e.touches[0].clientY;
        moveDistance = moveY - startY;
        if (moveDistance <= 0) return;
        if (moveDistance >= 80) moveDistance = 80;
        this.setData({
            coverTransform: `translateY(${moveDistance}rpx)`
        })
    },

    handleTouchEnd() {
        this.setData({
            coverTransform: "translateY(0rpx)",
            coverTransition: "transform 1s linear"
        })
    },

    goLoginPage() {
        wx.navigateTo({
            url: '/pages/login/login',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var userInfo = JSON.parse(wx.getStorageSync('userInfo'))
        if (userInfo) {
            this.setData({
                userInfo: userInfo
            })
            request("user/record", "GET", {
                uid: userInfo.userId,
                type: 0
            }).then(data => {
                this.setData({
                    recentPlayList: data.allData.slice(0, 10)
                })
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})