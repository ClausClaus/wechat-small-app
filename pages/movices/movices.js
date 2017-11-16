let { HTTP } = require("../../api/baseRequest.js");
let { normalLizeMovice } = require("../../utils/util.js");
let { ERROK } = require("../../api/config.js");
let { MoviceData } = require("../../common/js/baseMoviceData.js");
const START = 0;
const COUNT = 3;
// const QUERY = `?start=${START}&count=${COUNT}`;
const TOP250 = `/v2/movie/top250`;
const THEATERS = `/v2/movie/in_theaters`;
const COMINGSOON = `/v2/movie/coming_soon`;
Page({
    /**
     * 页面的初始数据
     * 异步数据最好定义一个初始值，否则报渲染层错误
     */
    data: {
        Theaters: {},
        Top250: {},
        ComingSoon: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 正在热映
        HTTP(THEATERS,START,COUNT).then(res => {
            if (res.statusCode === ERROK) {
                this._normalLizeMovice(res.data, MoviceData.Theaters.title, MoviceData.Theaters.header);
            }
        })
        // top250
        HTTP(TOP250,START,COUNT).then(res => {
            if (res.statusCode === ERROK) {
                this._normalLizeMovice(res.data, MoviceData.Top250.title, MoviceData.Top250.header);
            }
        })
        // 即将上映
        HTTP(COMINGSOON,START,COUNT).then(res => {
            if (res.statusCode === ERROK) {
                this._normalLizeMovice(res.data, MoviceData.ComingSoon.title, MoviceData.ComingSoon.header);
            }
        })
    },
    // 对电影数据格式化
    _normalLizeMovice(moviceData, setKey, categoryTitle) {
        let ret = normalLizeMovice(moviceData);
        let readyData = {};
        readyData[setKey] = {
            movices: ret,
            categoryTitle: categoryTitle
        };
        this.setData(readyData, () => {
            readyData = null;
        });
    },
    // 点击跳转到查看更看更多电影
    onMoreTap(e) {
        let category = e.currentTarget.dataset.category;
        wx.navigateTo({
            url: `../more-movice/more-movice?category=${category}`
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
