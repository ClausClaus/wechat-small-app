/*
 * @Author: pc
 * @Date:   2017-11-10 17:27:05
 * @Last Modified by:   pc
 * @Last Modified time: 2017-11-11 09:24:03
 */


const COLLECT_KEY = '__collect__';

export function saveCollect(postId) {
    let collects = wx.getStorageSync(COLLECT_KEY) || {};
    let currentId = collects[postId];
    currentId = !currentId;
    collects[postId] = currentId;
    wx.setStorageSync(COLLECT_KEY, collects);
    return currentId;
}
export function loadCollect(postId) {
    let collects = wx.getStorageSync(COLLECT_KEY) || {};
    if (collects[postId]) {
        return true;
    }
    return false;
}
