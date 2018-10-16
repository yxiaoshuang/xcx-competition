const util = require('../../utils/util.js')
const steps = require('../../utils/steps.js')
const userData = require('../../utils/userData.js')
const app = getApp()
Page({
  data: {
    issuccess:false,
    step:'',
    stepObj:{},
    title_step:0,
    score_rmk:''
  },
  onLoad: function (options){
    var step = steps[options.step];
   
    var issuccess = isNaN(options.issuccess) ? 0 : parseInt(options.issuccess);
    var right_cnt = isNaN(options.right_cnt)?0:parseInt(options.right_cnt);
    var exp = right_cnt * step.awardExp;
    var coin = right_cnt * step.awardCoin;
    //提升经验
    app.upgradeExp(exp);
    //奖励金币
    app.upgradeCoin(coin);
    if (issuccess==1){
      app.upgradeStep(options.step);
    }
    this.setData({
      issuccess:issuccess,
      step:options.step,
      stepObj:step,
      score_rmk: '得分' + right_cnt * step.limitSubjectScore + '  得金币' + coin
    })
  },
  goClick:function(){
    var issuccess = this.data.issuccess;
    console.log(issuccess);
    if(issuccess){
      wx.navigateTo({
        url: '../index/index?type=forward&step='+(this.data.step),
      })
    }else{
      wx.navigateTo({
        url: '../index/index?step=' + this.data.step,
      })
    }
  }
})