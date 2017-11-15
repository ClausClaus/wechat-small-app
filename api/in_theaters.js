/*
 * @Author: ClausClaus
 * @Date:   2017-11-14 14:23:23
 * @Last Modified by:   ClausClaus
 * @Last Modified time: 2017-11-15 11:22:01
 */
let { baseUrl, commonParams, header } = require("./config.js");
let { request }  = require("../utils/promise.js");

export function getTheaters(start, count) {
    const data = Object.assign({}, commonParams, { start, count });
    return request({
        url: `${baseUrl}/v2/movie/in_theaters`,
        data: data,
        header: header,
    }).then(res => {
        return res;
    }).catch(err => {
        console.log('getTheaters请求错误', err);
        return err;
    })
}
