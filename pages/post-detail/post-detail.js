/*
 * @Author: pc
 * @Date:   2017-11-10 10:58:19
 * @Last Modified by:   ClausClaus
 * @Last Modified time: 2017-11-22 09:24:41
 */
let postData = require('../../data/posts-data.js');
let { saveCollect, loadCollect } = require('../../utils/cache.js');
let { globalData } = getApp();
Page({
    data: {
        isplayingMusic: false
    },
    onLoad(options) {
        // wx.clearStorageSync();
        let postId = decodeURIComponent(options.postId);
        this.setData({ 'currentPostId': postId });
        let postItem = this.findItem(postId);
        this.setData({ ...postItem });
        this.setData({ collected: loadCollect(postId) });
        if (globalData.g_isplayingMusic && globalData.g_currentMusicPostId === this.data.currentPostId) {
            this.setData({ isplayingMusic: true })
        }

        this.setMusicMonitor();
    },
    setMusicMonitor() {
        // 开启音乐播放监听
        wx.onBackgroundAudioPlay(() => {
            this.setData({ isplayingMusic: true })
            globalData.g_isplayingMusic = true;
            globalData.g_currentMusicPostId = this.data.currentPostId
        })
        // 停止音乐播放监听
        wx.onBackgroundAudioPause(() => {
            this.setData({ isplayingMusic: false })
            globalData.g_isplayingMusic = false;
            globalData.g_currentMusicPostId = null;
        })
        wx.onBackgroundAudioStop(() => {
            this.setData({ isplayingMusic: false });
            globalData.g_isplayingMusic = false;
            globalData.g_currentMusicPostId = null;
        })
    },
    findItem(id) {
        let item = postData.postList.find((item) => {
            if (item.postId === Number(id)) {
                return item;
            }
        })
        return item;
    },
    onCollectionTap(e) {
        this.showToast();
    },
    showToast() {
        let collected = saveCollect(this.data.currentPostId);
        this.setData({ collected: collected });
        wx.showToast({
            'title': this.data.collected ? '收藏成功' : '取消成功',
            'duration': 1000,
            'icon': 'success'
        })
    },
    onMusicTap(e) {
        let isplayingMusic = this.data.isplayingMusic;
        let musicData = this.data.music;
        if (isplayingMusic) {
            wx.pauseBackgroundAudio()
            this.setData({ isplayingMusic: false })
        } else {
            wx.playBackgroundAudio({
                dataUrl: musicData.url,
                title: musicData.title,
                coverImgUrl: musicData.coverImg
            })
            this.setData({ isplayingMusic: true })
        }
    },
    onShareTap(e) {
        let itemList = [
            '分享到朋友圈',
            '分享到微信好友',
            '分享到QQ',
            '分享到微博'
        ];
        wx.showActionSheet({
            'itemList': itemList,
            'itemColor': '#405f80',
            'success': (res) => {
                console.log('success的回调', res);
                wx.showModal({
                    title: '用户' + itemList[res.tapIndex],
                    'content': res.errMsg + '现在无法支持分享功能'
                })
            },
            fail: (res) => {
                console.log('fail的回调', res);
                wx.showModal({
                    title: '用户' + itemList[res.tapIndex],
                    'content': res.errMsg + '现在无法支持分享功能'
                })
            }
        })
    },

})
