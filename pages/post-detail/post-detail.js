/*
 * @Author: pc
 * @Date:   2017-11-10 10:58:19
 * @Last Modified by:   pc
 * @Last Modified time: 2017-11-11 11:14:07
 */
let postData = require('../../data/posts-data.js');
let { saveCollect, loadCollect } = require('../../utils/cache.js');
Page({
    data: {

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
        this.setData({ 'collected': collected });
        wx.showToast({
            'title': this.data.collected ? '收藏成功' : '取消成功',
            'duration': 1000,
            'icon': 'success'
        })
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
    onLoad(options) {
        // wx.clearStorageSync();
        let postId = options.postId;
        this.setData({ 'currentPostId': postId });
        let postItem = this.findItem(postId);
        this.setData({ ...postItem });
        this.setData({ 'collected': loadCollect(postId) });
    }
})
