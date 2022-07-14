// pages/login/login.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        password: ''
    },

    login() {
        var {
            phone,
            password
        } = this.data;

        if (!phone) {
            wx.showToast({
                title: '手机号码不能为空',
                icon: 'none'
            })
            return;
        }

        var phoneReg = /^1[3-9]\d{9}$/
        if (!phoneReg.test(phone)) {
            wx.showToast({
                title: '请输入正确的手机格式',
                icon: 'none'
            })
            return;
        }

        if (!password) {
            wx.showToast({
                title: '密码不能为空',
                icon: 'none'
            })
            return;
        }

        request('login/cellphone', 'GET', {
            phone,
            password,
            isLogin: true
        }).then(data => {
            if (data.code === 200) {
                console.log(data);
                wx.setStorageSync('userInfo', JSON.stringify(data.profile))
                wx.reLaunch({
                    url: '/pages/personal/personal',
                })
            } else if (data.code === 501) {
                wx.showToast({
                    title: '账号或密码错误',
                    icon: 'none'
                })
            } else {
                wx.showToast({
                    title: '登录失败，请重新登录',
                    icon: 'none'
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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