// pages/video/video.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList: [],
        navId: '',
        videoList: [],
        videoId:''
    },

    changeNav(e) {
        this.setData({
            navId: e.target.id >>> 0
        })

        this.getVideoList();
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        request("video/group/list").then(data => {
            this.setData({
                videoGroupList: data.data.slice(0, 14),
                navId: data.data[0].id
            })
        }).then(() => {
            this.getVideoList()
        })
    },

    getVideoList() {
        wx.showToast({
            title: '正在请求数据',
            icon: 'loading'
        })
        var currList = []
        request("video/group", "GET", {
            id: this.data.navId
        }).then(data => {
            currList = data.datas
            currList.forEach(item => {
                request("video/url", "GET", {
                    id: item.data.vid
                }).then(res => {
                    item.data.videoUrl = res.urls[0].url
                    this.setData({
                        videoList: currList
                    })
                })
            })
        })
    },

    handlePlay(e) {
        // this.videoContext;
        // this.vid;
        // if (this.videoContext && this.vid !== e.target.id) this.videoContext.stop();
        // this.vid = e.target.id;
        this.videoContext = wx.createVideoContext(e.target.id)
        this.setData({
            videoId: e.target.id
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

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