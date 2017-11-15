let { getTop250 } = require("../../api/top250.js");
let { getTheaters } = require("../../api/in_theaters.js");
let { getComingSoon } = require("../../api/coming_soon.js");
let { ERROK } = require("../../api/config.js");
const START = 0,
    COUNT = 3;
Page({
    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        getTheaters(START, COUNT).then(res => {
            if (res.statusCode === ERROK) {
                console.log(res.data);
            }
        })
        getTop250(START, COUNT).then(res => {
            if (res.statusCode === ERROK) {
                console.log(res.data);
            }
        })
        getComingSoon(START, COUNT).then(res => {
            if (res.statusCode === ERROK) {
                console.log(res);
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
