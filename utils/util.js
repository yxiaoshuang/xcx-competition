
const dgjc = require('dgjc.js');
const djtd = require('djtd.js');
const jsx = require('jsx.js');
const jxcs = require('jxcs.js');
const ltgy = require('ltgy.js');
const ltyl = require('ltyl.js');
const scgl = require('scgl.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const getQsDict = n =>{
  var qs_dict_list = [];
  qs_dict_list.push(ltyl);
  qs_dict_list.push(jxcs);
  qs_dict_list.push(dgjc);
  qs_dict_list.push(djtd);
  qs_dict_list.push(jsx);
  qs_dict_list.push(scgl);
  qs_dict_list.push(ltgy);
  return qs_dict_list;
}

var qs_dict = {
  "ltyl": ltyl,//炼铁原理
  "jxcs": jxcs,//机械常识
  "dgjc": dgjc,//电工基础
  "djtd": djtd,//电机拖动
  "jsx": jsx,//金属学常识
  "scgl": scgl,//生产导论
  "ltgy": ltgy
}

const getQsList=n=>{
  var list = [];
  var times = parseInt(n / 7);
  var cnt = 0;
  var qs_dict = getQsDict();


  qs_dict.forEach(function (value, i) {
    var len = value.length;
    var left_cnt = n - cnt;
    if (left_cnt > 0) {
      var idx = Math.floor(Math.random() * len);
      list.push(value[idx]);
      cnt += 1;
      if (times == 2) {
        list.push(value[idx]);
        cnt += 1;
      }
    }
  })

  qs_dict.forEach(function (value, i) {
    var left_cnt = n - cnt;
    if (left_cnt > 0) {
      var len = value.length;
      var idx = Math.floor(Math.random() * len);
      list.push(value[idx]);
      cnt += 1;
    }
  })

  return list;
}

module.exports = {
  formatTime: formatTime,
  qs_dict_list:getQsDict,
  getQsList: getQsList
}