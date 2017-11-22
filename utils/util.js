const LENGTH = 5;
const CLASS_ON = 'on';
const CLASS_HALF = 'half';
const CLASS_OFF = 'off';

export function normalLizeMovice(moviceData) {
    let ret = [];
    for (var index in moviceData.subjects) {
        let subject = moviceData.subjects[index];
        let title = subject.title;
        if (title.length >= 6) {
            title = title.substring(0, 6) + '...';
        }
        let temp = {
            stars: convertToStarsArray(subject.rating.stars),
            title: title,
            average: subject.rating.average,
            coverageUrl: subject.images.large,
            moviceId: subject.id
        }
        ret.push(temp);
    }
    return ret;
}

export function convertToStarsArray(stars) {
    var num = stars.toString().substring(0, 1);
    var hasDecimal = stars.slice(1) > 0;
    // console.log(hasDecimal);
    var array = [];
    for (var i = 0; i < num; i++) {
        array.push(CLASS_ON);
    }
    if (hasDecimal) {
        array.push(CLASS_HALF);
    }
    while (array.length < LENGTH) {
        array.push(CLASS_OFF);
    }
    return array;
}

export function convertToCastString(casts) {
    let castsjoin = '';
    casts.forEach((item) => {
        castsjoin += item.name + '/';
    })
    return castsjoin.substring(0, castsjoin.length - 2);
}

export function convertToCastInfos(casts) {
    let castsArray = [];
    casts.forEach((item) => {
        let cast = {
            img: item.avatars ? item.avatars.large : "",
            name: item.name
        }
        castsArray.push(cast);
    })
    return castsArray;
}
