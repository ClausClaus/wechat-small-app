/*
 * @Author: ClausClaus
 * @Date:   2017-11-14 14:20:55
 * @Last Modified by:   ClausClaus
 * @Last Modified time: 2017-11-15 11:07:39
 */
import { baseUrl, commonParams, header } from "./config.js";
import { request } from '../utils/promise.js';

export function getComingSoon(start, count) {
    const data = Object.assign({}, commonParams, { start, count });
    return request({
        url: `${baseUrl}/v2/movie/coming_soon`,
        data: data,
        header: header
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
        console.log('getComingSoon请求错误', err);
    })
}
