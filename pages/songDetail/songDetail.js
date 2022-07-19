// pages/songDetail/songDetail.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlay: false,
        song: '',
        id: ''
    },

    handleMusicPlay() {
        this.musicControl(!this.data.isPlay)
    },

    musicControl(isPlay) {
        if (isPlay) {
            request("song/url", "GET", {
                id: this.data.id
            }).then(({
                data
            }) => {
                this.backgroundAudioManager.title = this.data.song.name
                this.backgroundAudioManager.src = data[0].url
            })
        } else {
            this.backgroundAudioManager.pause()
        }
    },

    changePlayState(isPlay){
        this.setData({
            isPlay
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            id: options.id
        })

        request("song/detail", "GET", {
            ids: this.data.id
        }).then(data => {
            this.setData({
                song: data.songs[0]
            })
            wx.setNavigationBarTitle({
                title: this.data.song.name,
            })
        })

        this.backgroundAudioManager = wx.getBackgroundAudioManager()
        this.backgroundAudioManager.onPlay(() => {
            this.setData({
                isPlay: true
            })
        })
        this.backgroundAudioManager.onPause(() => {
            this.setData({
                isPlay: false
            })
        })
        this.backgroundAudioManager.onStop(() => {
            this.setData({
                isPlay: false
            })
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