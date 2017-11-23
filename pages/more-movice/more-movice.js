let { MoviceData } = require("../../common/js/baseMoviceData.js");
let { HTTP } = require("../../api/baseRequest.js");
let { ERROK } = require("../../api/config.js");
let { normalLizeMovice, debounce } = require("../../utils/util.js");
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
        isloaded: false,
        movices: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let category = options.category;
        this.setData({ categoryTitle: category })
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
        HTTP(requestUrl, { start: START, count: COUNT }).then(res => {
            if (res.statusCode === ERROK) {
                this._normalLizeMovice(res.data);
                this.checkMore(res.data);
            }
        })
    },
    onMoviceTap(e) {
        let moviceid = e.target.dataset.moviceid || e.currentTarget.dataset.moviceid;
        wx.navigateTo({
            url: `../movice-detail/movice-detail?moviceid=${moviceid}`
        })
    },
    _normalLizeMovice(moviceData) {
        let movices = normalLizeMovice(moviceData);
        this.data.movices = this.data.movices.concat(movices);
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
        if (this.data.isloaded) {
            return;
        } else {
            console.log('触发了')
            this.setData({ isloaded: true })
            this.data.currentNum += COUNT;
            let nextUrl = this.data.requestUrl;
            HTTP(nextUrl, { start: this.data.currentNum, count: COUNT }).then(res => {
                if (res.statusCode === ERROK) {
                    this._normalLizeMovice(res.data);
                    this.checkMore(res.data);
                    this.setData({ isloaded: false })
                    wx.hideNavigationBarLoading();
                }
            })
            wx.showNavigationBarLoading();
        }
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
