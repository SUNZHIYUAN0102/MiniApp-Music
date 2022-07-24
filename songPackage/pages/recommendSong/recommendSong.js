// pages/recommendSong/recommendSong.js
import request from "../../../utils/request"
import PubSub from 'pubsub-js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        day: '',
        month: '',
        recommendSongs: [],
        index: 0
    },

    toSongDetail(e) {
        this.setData({
            index: e.currentTarget.dataset.index
        })
        wx.navigateTo({
            url: `/songPackage/pages/songDetail/songDetail?id=${e.currentTarget.dataset.song}`,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.setData({
            day: new Date().getDate(),
            month: new Date().getMonth() + 1
        })

        var {
            data
        } = await request("recommend/songs")

        this.setData({
            recommendSongs: data.dailySongs
        })

        PubSub.subscribe('switchType', (msg, type) => {
            var {
                recommendSongs,
                index
            } = this.data
            if (type === 'pre') {
                if (index > 0) {
                    this.setData({
                        index: --index
                    })
                } else {
                    this.setData({
                        index: recommendSongs.length - 1
                    })
                }
            } else {
                if (index < recommendSongs.length - 1) {
                    this.setData({
                        index: ++index
                    })
                } else {
                    this.setData({
                        index: 0
                    })
                }
            }

            var musicId = recommendSongs[index].id
            PubSub.publish('musicId', musicId)
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