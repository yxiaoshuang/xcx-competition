//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const userData = require('../../utils/userData.js')
const steps = require('../../utils/steps.js')
Page({
  data: {
    motto: 'Hello World',
    userData: app.getUserData(),
    ballTop: 0,
    ballLeft: 0,
    screenHeight: 0,
    screenWidth: 0,
    canShow:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goStep:function(e){
    var step = steps[e.currentTarget.dataset.step];
    wx.showModal({
      content: '本关卡花费体力' + step.costStrength + '，奖励金币' + step.awardCoin + '，经验' + step.awardExp + '，' + step.limitScore +'分通关\r\n\r\n您确定继续么',
      // content: '您确定继续么',
      cancelText:'返回',
      confirmText:'继续',
      success:function(res){
        if (res.confirm){
          var userData = app.getUserData();
          if (userData.strength.cur < step.costStrength) {
            return false;
          }
          if (parseInt(userData.step) + 1 < parseInt(e.currentTarget.dataset.step) && e.currentTarget.dataset.step != "1") {
            return false;
          }
          app.downStrength(step.costStrength);
          wx.reLaunch({
            url: '../main/main?step=' + e.currentTarget.dataset.step,
          })
        }
      }
    })
    
  },
  onLoad: function (options) {
    var _this = this;
    var _userData = app.getUserData();
    if (_userData == ""){
      app.setUserData(userData);
      _userData = userData;
    }
    _userData.step = parseInt(_userData.step);
    _this.setData({
      userData: _userData,
    });
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
      }
    });
  },
  onPullDownRefresh:function(){
    console.log('222222222222');
  },
  onShow:function(){
    // console.log("onshow");
    // console.log(this.data.canShow);
    var pages = getCurrentPages();
    var len = pages.length;
    // console.log(pages[len-1]);
    // if(!this.data.canShow){
    //   wx.navigateTo({
    //     url: '../main/main?step=2',
    //   })
    // }
  }
})
