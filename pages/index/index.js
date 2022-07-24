// pages/index/index.js
import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [],
        recommendList: [],
        topList: []
    },

    goRecommendSong(){
        wx.navigateTo({
          url: '/songPackage/pages/recommendSong/recommendSong',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        request("banner").then(data => {
            this.setData({
                bannerList: data.banners
            })
        })

        request("personalized", "GET", {
            limit: 10
        }).then(data => {
            this.setData({
                recommendList: data.result
            })
        })


        request("toplist").then(data => {
            var resultArr = []
            for (let i = 0; i < 5; i++) {
                request("playlist/detail", "GET", {
                    id: data.list[i].id
                }).then(res => {
                    resultArr.push({
                        name: data.list[i].name,
                        tracks: res.playlist.tracks.slice(0, 3)
                    })

                    this.setData({
                        topList: resultArr
                    })
                })
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