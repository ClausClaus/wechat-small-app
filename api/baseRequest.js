/*
 * @Author: ClausClaus
 * @Date:   2017-11-14 14:23:43
 * @Last Modified by:   ClausClaus
 * @Last Modified time: 2017-11-23 11:58:37
 */
let { baseUrl, header, commonParams } = require("./config.js");
export function HTTP(url, OBJ) {
    const requireUrl = baseUrl + url;
    const data = Object.assign({}, commonParams, { ...OBJ });
    return new Promise((resolve, reject) => {
        wx.request({
            url: requireUrl,
            data: data,
            header: header,
            method: 'GET',
            success: function(res) {
                return resolve(res);
            },
            fail: function(res) {
                console.error('请求错误', err);
                return reject(err);
            },
            complete: function(res) {
                console.log('HTTP请求完毕');
            }
        })
    });
}


export function moviceDetail(moviceid) {
    const requireUrl = `${baseUrl}/v2/movie/subject/${moviceid}`;
    return new Promise((resolve, reject) => {
        wx.request({
            url: requireUrl,
            header: header,
            method: 'GET',
            success: function(res) {
                return resolve(res);
            },
            fail: function(res) {
                console.error('请求错误', err);
                return reject(res);
            },
            complete: function(res) {
                console.log('moviceDetail请求完毕');
            }
        })
    });
}
