/*
 * @Author: ClausClaus
 * @Date:   2017-11-14 14:23:43
 * @Last Modified by:   ClausClaus
 * @Last Modified time: 2017-11-16 17:26:40
 */
let { baseUrl, header, commonParams } = require("./config.js");
let { request } = require("../utils/promise.js");
export function HTTP(url, start, count) {
    const requireUrl = baseUrl + url;
    const data = Object.assign({}, commonParams, { start, count });
    return request({
        url: requireUrl,
        data: data,
        header: header,
        method: 'GET',
    }).then(res => {
        return res;
    }).catch(err => {
        console.log('请求错误', err);
        return err;
    })
}
