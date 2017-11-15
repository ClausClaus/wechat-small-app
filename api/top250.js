/*
 * @Author: ClausClaus
 * @Date:   2017-11-14 14:23:43
 * @Last Modified by:   ClausClaus
 * @Last Modified time: 2017-11-15 11:24:43
 */
let { baseUrl, commonParams, header } = require("./config.js");
let { request } = require("../utils/promise.js");
export function getTop250(start, count) {
    const data = Object.assign({}, commonParams, { start, count });
    return request({
        url: `${baseUrl}/v2/movie/top250`,
        data: data,
        header: header,
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
        console.log('getTop250请求错误', err);
    })
}
