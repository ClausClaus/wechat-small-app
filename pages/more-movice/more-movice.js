// pages/more-movice/more-movice.js
let { MoviceData } = require("../../common/js/baseMoviceData.js");
let { HTTP } = require("../../api/baseRequest.js");
let { ERROK } = require("../../api/config.js");
let { normalLizeMovice } = require("../../utils/util.js");
const START = 0;
const COUNT = 21;
// const QUERY = `?start=${START}&count=${COUNT}`;
const TOP250 = `/v2/movie/top250`;
const THEATERS = `/v2/movie/in_theaters`;
const COMINGSOON = `/v2/movie/coming_soon`;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentNum: START,
        categoryTitle: '',
        requestUrl: '',
        hasMore: true,
        movices: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let category = options.category;
        this.data.categoryTitle = category;
        let requestUrl = '';
        switch (category) {
            case MoviceData.Theaters.header:
                requestUrl = THEATERS;
                break;
            case MoviceData.Top250.header:
                requestUrl = TOP250;
                break;
            case MoviceData.ComingSoon.header:
                requestUrl = COMINGSOON;
                break;
            default:
                throw new Error("switch匹配错误");
                break;
        }
        this.data.requestUrl = requestUrl;
        this.data.hasMore = true;
        HTTP(requestUrl, START, COUNT).then(res => {
            if (res.statusCode === ERROK) {
                this._normalLizeMovice(res.data);
                this.checkMore(res.data);
                console.log(res.data);
            }
        })
    },
    _normalLizeMovice(moviceData) {
        let movices = normalLizeMovice(moviceData);
        if (!this.data.hasMore) {
            this.data.movices = this.data.movices.concat(movices);
        } else {
            this.data.movices = movices;
        }
        this.setData({ movices: this.data.movices })
    },
    checkMore(movices) {
        if (!movices.subjects.length || movices.start >= movices.total) {
            this.data.hasMore = false;
        }
    },
    onScrollLower(e) {
        if (!this.data.hasMore) {
            return;
        }
        console.log('加载了');
        this.data.currentNum += COUNT;
        let nextUrl = this.data.requestUrl;
        HTTP(nextUrl, this.data.currentNum, COUNT).then(res => {
            if (res.statusCode === ERROK) {
                this._normalLizeMovice(res.data);
                this.checkMore(res.data);
            }
        })

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        wx.setNavigationBarTitle({
            title: this.data.categoryTitle
        })
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
