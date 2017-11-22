/*
 * @Author: ClausClaus
 * @Date:   2017-11-14 14:23:43
 * @Last Modified by:   ClausClaus
 * @Last Modified time: 2017-11-22 10:07:05
 */
let { baseUrl, header, commonParams } = require("./config.js");
let { request } = require("../utils/promise.js");
export function HTTP(url, OBJ) {
    const requireUrl = baseUrl + url;
    const data = Object.assign({}, commonParams, { ...OBJ });
    return request({
        url: requireUrl,
        data: data,
        header: header,
        method: 'GET',
    }).then(res => {
        return res;
    }).catch(err => {
        console.error('请求错误', err);
        return err;
    })
}

export function moviceDetail(moviceid) {
    const requireUrl = `${baseUrl}/v2/movie/subject/${moviceid}`;
    return request({
        url: requireUrl,
        header: header,
        method: 'GET',
    }).then(res => {
        return res;
    }).catch(err => {
        console.error('请求错误', err);
        return err;
    })
}
