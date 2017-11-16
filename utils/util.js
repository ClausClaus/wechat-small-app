   let { convertToStarsArray } = require("./star.js");
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
