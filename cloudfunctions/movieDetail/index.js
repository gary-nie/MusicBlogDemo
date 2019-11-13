// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // console.log(event)
  return rp(`https://api.douban.com/v2/movie/subject/${event.movieid}?apikey=0df993c66c0c636e29ecbb5344252a4a`)
    .then(function (ren) {
      // console.log(JSON.parse(ren))
      return ren;
    })
    .catch(function (err) {
      console.log(err);
    });
}