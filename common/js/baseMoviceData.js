/*
 * @Author: ClausClaus
 * @Date:   2017-11-16 11:36:19
 * @Last Modified by:   ClausClaus
 * @Last Modified time: 2017-11-23 10:03:35
 */
let {
    convertToStarsArray,
    convertToCastString,
    convertToCastInfos
} = require("../../utils/util.js");
export const MoviceData = {
    Theaters: {
        title: 'Theaters',
        header: '正在热映'
    },
    Top250: {
        title: 'Top250',
        header: '豆瓣Top250'
    },
    ComingSoon: {
        title: 'ComingSoon',
        header: '即将上映'
    },
    SearchList: {
        title: 'SearchList',
        header: '搜索结果'
    }
}
export function processDoubanData(data) {
    let director = {
        avatar: '',
        name: '',
        id: ''
    }
    if (data.directors[0] !== null) {
        if (data.directors[0].avatars !== null) {
            director.avatar = data.directors[0].avatars.large
        }
        director.name = data.directors[0].name;
        director.id = data.directors[0].id;
    }
    let movie = {
        movieImg: data.images ? data.images.large : "",
        country: data.countries[0],
        title: data.title,
        originalTitle: data.original_title,
        wishCount: data.wish_count,
        commentCount: data.comments_count,
        year: data.year,
        generes: data.genres.join('、'),
        stars: convertToStarsArray(data.rating.stars),
        score: data.rating.average,
        director: director,
        casts: convertToCastString(data.casts),
        castsInfo: convertToCastInfos(data.casts),
        summary: data.summary
    }
    return movie;
}
