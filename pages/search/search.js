// pages/search/search.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        placeholderContent: '',
        hotsList: [],
        keywords: '',
        searchList: [],
        isSend: false,
        historyList: []
    },


    unique(arr) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    arr.splice(j, 1);
                    j--;
                }
            }
        }
        return arr;
    },

    handleInputChange() {
        if (this.data.keywords) {
            if (this.data.isSend) return
            setTimeout(() => {
                this.setData({
                    isSend: true
                })
                request('search', 'GET', {
                    keywords: this.data.keywords.trim(),
                    limit: 10
                }).then(({
                    result
                }) => {
                    let {
                        historyList
                    } = this.data
                    historyList.unshift(this.data.keywords.trim())
                    wx.setStorageSync('searchHistory', this.unique(historyList))
                    this.setData({
                        searchList: result.songs,
                        isSend: false,
                        historyList: this.unique(historyList)
                    })
                })
            }, 300);
        } else {
            this.setData({
                searchList: []
            })
        }
    },

    clearKeywords() {
        this.setData({
            keywords: ''
        })
    },

    clearSearchHistory() {
        wx.showModal({
            title: '确认框',
            content: '你是否确认删除当前搜索历史记录',
            cancelColor: 'cancelColor',
            success: (res) => {
                if (res.confirm) {
                    this.setData({
                        historyList: []
                    })
                    wx.removeStorageSync('searchHistory')
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let historyList = wx.getStorageSync('searchHistory')
        if (historyList) {
            this.setData({
                historyList
            })
        }
        request('search/default').then(({
            data
        }) => {
            this.setData({
                placeholderContent: data.showKeyword
            })
        })


        request('search/hot/detail').then(({
            data
        }) => {
            data.forEach((item, index) => {
                item.order = ++index
            })

            this.setData({
                hotsList: data
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