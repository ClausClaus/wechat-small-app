/*
 * @Author: ClausClaus
 * @Date:   201f7-11-15 16:02:15
 * @Last Modified by:   ClausClaus
 * @Last Modified time: 2017-11-16 09:52:42
 */
const LENGTH = 5;
const CLASS_ON = 'on';
const CLASS_HALF = 'half';
const CLASS_OFF = 'off';

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
