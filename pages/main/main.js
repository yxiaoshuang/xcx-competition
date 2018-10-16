const util = require('../../utils/util.js')
const steps = require('../../utils/steps.js')
import Watch  from '../../utils/watch'

let watch;
var interval;
var ans_interval;
var is_valid_click = true;
var timerstamp = 30;


Page({
  data: {
    countDownSecond: timerstamp,
    subjectList:[],
    curSubject: {},
    isright:false,
    ischecked:-1,
    idx:1,
    multiAns:[],
    rightAnsList: [{ isright: 0, ischecked: -1 }, { isright: 0, ischecked: -1 }, { isright: 0, ischecked: -1 }, { isright: 0, ischecked: -1 }],
    multi_disabled:false,
    qs_cnt:0,
    right_cnt:0,
    isUnderGoing:false,
    rd_disabled:false,
    step:0
  },
  onLoad: function (options){
    var step = steps[options.step];
    console.log(step);
    is_valid_click = true;
    var qs_cnt = step.limitSubjectNumber; //题目数量
    timerstamp = step.limitTime;          //限制时间
    var subjectList = util.getQsList(qs_cnt);
    var lsit = [];
    for(var i = 0 ; i < subjectList.length; i++){
      if(subjectList[i]['ans'].length>1){
        for (var j = 0; j < subjectList[i].opts.length;j++){
          var values = subjectList[i].opts[j];
          if(values.value==0){
            values.options="A"
          } else if (values.value ==1) {
            values.options = "B"
          } else if (values.value == 2) {
            values.options = "C"
          } else if (values.value == 3) {
            values.options = "D"
          }
        }
      } else if (subjectList[i]['ans'].length == 1){
        var ans = subjectList[i].ans;
        var idxAns = (ans=='A')?0:(ans=='B'?1:(ans=='C'?2:3));
        subjectList[i].idxAns = idxAns;
      }
      lsit.push(subjectList[i]);
    }
    subjectList = lsit;
    console.log(subjectList);
    
    this.setData({ subjectList: subjectList, qs_cnt: qs_cnt, curSubject: subjectList[0],step:options.step});
    // console.log(this.data.isUnderGoing);
    // watch.setData({
    //   isUnderGoing:true
    // })
  },
  // watch: {
  //   isUnderGoing: function (newVal, oldVal) {
  //     console.log('new: %s, old: %s', newVal, oldVal);
  //     var pages = getCurrentPages() // 获取页面栈
  //     var prevPage = pages[pages.length - 2] // 上一个页面
      
  //     if (newVal==true&&oldVal==false){//说明开始了答题
  //       prevPage.setData({
  //         canShow: false
  //       })
  //     }else if(newVal==false&&oldVal==true){//说明结束了答题
  //       prevPage.setData({
  //         canShow: true
  //       })
  //     }
  //   }
  // },
  chooseAnswer: function (opts) {
    // if (is_valid_click == false) {
    //   return;
    // }
    // is_valid_click = false;
    // var ischecked = opts.target.dataset.idx;
    // var right_ans = this.convertAns(this.data.curSubject.ans);
    // var isright = ischecked == right_ans ? true : false;
    // var right_cnt = isright ? this.data.right_cnt + 1 : this.data.right_cnt;
    // console.log(isright);
    // this.setData({ ischecked: ischecked, isright: isright, right_cnt: right_cnt });

    // ans_interval = setInterval(function () {
    //   this.restart();
    //   clearInterval(ans_interval);
    // }.bind(this), 500)
  },
  radioChange:function(evt){
    if (is_valid_click == false) {
      return;
    }
    is_valid_click = false;
    var ischecked = this.convertAns(evt.detail.value);
    console.log(ischecked);
    var val = evt.detail.value;
    var curSub = this.data.curSubject;
    var isright = val == curSub.ans ? true : false;
    
    var right_cnt = isright ? this.data.right_cnt + 1 : this.data.right_cnt;
    this.setData({ ischecked: ischecked, isright: isright, right_cnt: right_cnt, rd_disabled:true });

    ans_interval = setInterval(function () {
      this.restart();
      clearInterval(ans_interval);
    }.bind(this), 500)

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    console.log("test1 onHide");
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    // console.log("test1 onUnload");
    // var pages = getCurrentPages() // 获取页面栈
    // console.log(pages)
    // var prevPage = pages[pages.length - 2] // 上一个页面
    // console.log(prevPage.data.canShow);
    // var canShow = prevPage.data.canShow;
    // if(!canShow){
    //   wx.showModal({
    //     title: '您确定退出当前游戏吗?',
    //     success: function (res) {
    //       console.log(res);
    //       if (res.confirm) {
    //         return;
    //       }
    //     }
    //   })
    //   // this.showRes();
    // }
  },
  convertAns:function(res){
    var ret = '';
    if (res.indexOf('A')!=-1){
      ret += '0';
    }
    if(res.indexOf('B')!=-1){
      ret+='1';
    }
    if (res.indexOf('C') != -1) {
      ret += '2';
    }
    if (res.indexOf('D') != -1) {
      ret += '3';
    }
    return ret;
  }, 
  qsTimer:function(){
    var totalSecond =timerstamp;

    interval = setInterval(function () {
      this.setData({
        countDownSecond: totalSecond,
      });
      totalSecond--;
      if (totalSecond < 0) {
        this.showRes();
      }
    }.bind(this), 1000);
  },
  // 页面渲染完成后 调用
  onReady: function () {
    this.qsTimer();
  },
  restart:function(){
    var curidx = this.data.idx;
    if (curidx < this.data.subjectList.length) {
      curidx += 1;

      is_valid_click = true;
      this.setData({
        rd_disabled:false,
        idx: curidx,
        ischecked: -1,
        isright: false,
        rightAns: [],
        curSubject: this.data.subjectList[curidx - 1],
        rightAnsList: [{ isright: 0, ischecked: -1 }, { isright: 0, ischecked: -1 }, { isright: 0, ischecked: -1 }, { isright: 0, ischecked: -1 }]
      });
    } else {
      this.showRes();
    }
    
  },
  mulClick:function(){
    this.setData({
      multi_disabled: true
    })

    var myAns = this.data.multiAns;//[2,3]
    var stdAns = this.convertAns(this.data.curSubject.ans)+"";//013
    if(stdAns){
      stdAns = stdAns.split('');//炸开数组
      stdAns.sort(function (a, b) { return (a + '').localeCompare(b + '') });
    }
    // console.log(stdAns);
    // console.log(myAns);
    var is_right = stdAns&&(myAns.toString() === stdAns.toString()) ? 1 :0;
    // console.log(is_right);
    var right_cnt = is_right ? this.data.right_cnt + 1 : this.data.right_cnt;
    
    var rightAns = [];
    for (var i = 0; i < 4; i++) {
      var sub_right = (stdAns.indexOf(i.toString()) != -1) ? 1 : 0;
      var row = { ischecked: (myAns.indexOf(i.toString()) != -1) ? 1 : -1, isright: sub_right};
      rightAns[i]=row;
    }
    
    console.log(is_right);
    this.setData({
      rightAnsList: rightAns,
      multi_disabled:false,
      right_cnt:right_cnt
    })

    ans_interval = setInterval(function () {
      this.restart();
      clearInterval(ans_interval);
    }.bind(this), 500)
  },
  showRes:function(){
    // var _this = this;
    var pages = getCurrentPages();
    var len = pages.length;
    var qs_cnt = this.data.qs_cnt;
    var right_cnt = this.data.right_cnt;
    var step = this.data.step;
    if (pages && pages[len-1].route.indexOf("main/main")!=-1){
      // wx.showModal({
      //   title: '提示',
      //   content: '总共' + qs_cnt + "题,您总共答对了" + right_cnt + "题",
      //   showCancel: false,
      //   success: function (res) {
          //失败-重新挑战；成功-继续挑战
          var issuccess = right_cnt==qs_cnt?1:0;
          wx.reLaunch({
            url: '../res/res?issuccess=' + issuccess + '&step=' + step +'&right_cnt='+right_cnt,
          })
      //   }
      // })
      this.setData({
        isUnderGoing:false
      })
    }
    clearInterval(interval);
  },
  checkboxChange: function (e) {
    this.setData({ multiAns: e.detail.value});
  }
})