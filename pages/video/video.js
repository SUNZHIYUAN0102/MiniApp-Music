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
        videoId: '',
        videoPlayedLists: [],
        isTriggered: false,
        offset: 0,
        isLoading: false
    },

    changeNav(e) {
        this.setData({
            navId: e.target.id >>> 0
        })

        this.getVideoListRefresh();
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
            this.getVideoListRefresh()
        })
    },

    getVideoListRefresh: async function () {
        wx.showToast({
            title: '正在请求数据',
            icon: 'loading'
        })
        var currList = []
        // request("video/group", "GET", {
        //     id: this.data.navId,
        //     offset: this.data.offset
        // }).then(data => {
        //     currList = data.datas
        //     currList.forEach(item => {
        //         request("video/url", "GET", {
        //             id: item.data.vid
        //         }).then(res => {
        //             item.data.videoUrl = res.urls[0].url
        //             this.setData({
        //                 videoList: [...this.data.videoList, ...currList],
        //                 isTriggered: true
        //             })
        //         })
        //     })
        // })

        var data = await request("video/group", "GET", {
            id: this.data.navId,
        })

        currList = data.datas

        currList.forEach(async (item) => {
            var res = await request("video/url", "GET", {
                id: item.data.vid
            })
            item.data.videoUrl = res.urls[0].url
        })

        this.setData({
            videoList: currList,
            isTriggered: true,
        })
    },

    getVideoListScroll: async function () {
        wx.showToast({
            title: '正在请求数据',
            icon: 'loading'
        })
        var currList = []

        this.setData({
            isLoading: true
        })

        var data = await request("video/group", "GET", {
            id: this.data.navId,
            offset: this.data.offset
        })

        currList = data.datas

        currList.forEach(async (item) => {
            var res = await request("video/url", "GET", {
                id: item.data.vid
            })
            item.data.videoUrl = res.urls[0].url
        })

        this.setData({
            videoList: [...this.data.videoList, ...currList],
            isLoading: false
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
        var videoIndex = this.data.videoPlayedLists.findIndex(item => item.vid === e.target.id)
        if (videoIndex >= 0) {
            this.videoContext.seek(this.data.videoPlayedLists[videoIndex].currentTime);
        }
    },

    handleTimeUpdate(e) {
        var videoTimeObj = {
            vid: e.target.id,
            currentTime: e.detail.currentTime
        }

        var {
            videoPlayedLists
        } = this.data;

        var videoIndex = videoPlayedLists.findIndex(item =>
            item.vid == e.target.id
        )

        if (videoIndex >= 0) {
            if (videoPlayedLists[videoIndex].currentTime == e.detail.currentTime) {
                videoPlayedLists.splice(videoIndex, 1)
            } else {
                videoPlayedLists[videoIndex].currentTime = e.detail.currentTime
            }
        } else {
            videoPlayedLists.push(videoTimeObj);
        }

        this.setData({
            videoPlayedLists
        })
    },

    handleRefresher() {
        this.setData({
            isTriggered: false,
        })
        this.getVideoListRefresh()
    },

    handleToLower() {
        if (this.data.isLoading) return

        this.setData({
            offset: ++this.data.offset
        })
        this.getVideoListScroll()
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
    onShareAppMessage(obj) {
        return {
            title: '喵喵音乐——分享',
            path: '/pages/video/video',
            imageUrl: obj.target.dataset.imageurl
        }
    }
})