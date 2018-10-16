//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  getUserData:function(){
    return wx.getStorageSync('userData');
  },
  setUserData: function (userData) {
    return wx.setStorageSync('userData', userData);
  },
  //金币提升
  upgradeCoin: function (coin) {
    var userData = this.getUserData();
    userData.coin = userData.coin + coin;
    this.setUserData(userData);
  },
  //关卡提升
  upgradeStep: function (step) {
    var userData = this.getUserData();
    //如果要跳转的step比当前step低，不跳转
    if(step>userData.step){
      userData.step = step;
    }
    this.setUserData(userData);
  },
  //等级提升
  upgradeGrade: function (grade) {
    var userData = this.getUserData();
    userData.grade = userData.grade + grade;
    userData.exp.limit = userData.grade*20;
    userData.exp.cur = 0;
    userData.strength.limit = userData.grade * 10;
    userData.strength.cur = userData.strength.limit;
    this.setUserData(userData);
  },
  //经验提升
  upgradeExp: function(exp){
    var userData = this.getUserData();
    userData.exp.cur = userData.exp.cur + exp;
    if (userData.exp.cur >= userData.exp.limit){
      this.upgradeGrade(1);
    }
    else{
      this.setUserData(userData);
    }
  },
  //体力提升
  upgradeStrength: function (sh) {
    var userData = this.getUserData();
    userData.strength.cur = userData.strength.cur + sh;
    if (userData.strength.cur > userData.strength.cur.limit){
      userData.strength.cur = userData.strength.limit;
    }
    this.setUserData(userData);
  },
  //消耗体力
  downStrength: function (sh) {
    var userData = this.getUserData();
    userData.strength.cur = userData.strength.cur - sh;
    if (userData.strength.cur < 0){
      userData.strength.cur = 0;
    }
    this.setUserData(userData);
  }
})