// pages/songDetail/songDetail.js
import request from '../../../utils/request'
const appInstance = getApp()
import PubSub from 'pubsub-js'
import moment from 'moment'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlay: false,
        song: '',
        id: '',
        currentTime: '00:00',
        durationTime: '00:00',
        currentWidth: 0
    },

    handleMusicPlay() {
        this.musicControl(!this.data.isPlay)
    },

    musicControl(isPlay) {
        if (isPlay) {
            if (this.data.id == appInstance.globalData.musicId) {
                this.backgroundAudioManager.play()
            } else {
                request("song/url", "GET", {
                    id: this.data.id
                }).then(({
                    data
                }) => {
                    this.backgroundAudioManager.title = this.data.song.name
                    this.backgroundAudioManager.src = data[0].url
                })
            }
        } else {
            this.backgroundAudioManager.pause()
        }
    },

    changePlayState(isPlay) {
        this.setData({
            isPlay
        })

        appInstance.globalData.isMusicPlay = isPlay
    },

    handleSwitch(e) {
        let type = e ? 'e.target.id' : "next";
        this.backgroundAudioManager.pause();
        PubSub.subscribe('musicId', (msg, musicId) => {
            request("song/detail", "GET", {
                ids: musicId
            }).then(data => {
                let durationTime = moment(data.songs[0].dt).format('mm:ss')
                this.setData({
                    song: data.songs[0],
                    id: musicId,
                    durationTime: durationTime
                })
                wx.setNavigationBarTitle({
                    title: this.data.song.name,
                })
                this.musicControl(true)
            })
            PubSub.unsubscribe('musicId')
        })
        PubSub.publish('switchType', type)
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
            let durationTime = moment(data.songs[0].dt).format('mm:ss')
            this.setData({
                song: data.songs[0],
                durationTime: durationTime
            })
            wx.setNavigationBarTitle({
                title: this.data.song.name,
            })
        })

        if (appInstance.globalData.musicId === this.data.id && appInstance.globalData.isMusicPlay == true) {
            this.setData({
                isPlay: true
            })
        }

        this.backgroundAudioManager = wx.getBackgroundAudioManager()
        this.backgroundAudioManager.onPlay(() => {
            this.changePlayState(true)
            appInstance.globalData.musicId = this.data.id
        })
        this.backgroundAudioManager.onPause(() => {
            this.changePlayState(false)
        })
        this.backgroundAudioManager.onStop(() => {
            this.changePlayState(false)
        })
        this.backgroundAudioManager.onTimeUpdate(() => {
            if (this.data.id === appInstance.globalData.musicId) {
                if (this.backgroundAudioManager.currentTime === this.backgroundAudioManager.duration) {
                    this.handleSwitch()
                } else {
                    let currentTime = moment(this.backgroundAudioManager.currentTime * 1000).format('mm:ss')
                    this.setData({
                        currentTime,
                        currentWidth: this.backgroundAudioManager.currentTime / this.backgroundAudioManager.duration * 100
                    })
                }
            }
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