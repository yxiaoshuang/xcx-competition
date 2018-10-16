// 关卡
var steps = {
  1:{
    title:'初级',              //标题
    limitTime:30,             //限时
    limitSubjectNumber:10,    //题目数量
    limitSubjectScore:10,     //每题2分
    limitScore:100,           //成功分数
    costStrength: 1,         //花费体力
    awardCoin:10,            //奖励金币
    awardExp:2,             //经验
  },
  2: {
    title: '中级',
    limitTime: 30,
    limitSubjectNumber: 10,
    limitSubjectScore: 10,
    limitScore: 100,
    costStrength: 2,
    awardCoin: 20,
    awardExp: 4,
  },
  3: {
    title: '高级',
    limitTime: 30,
    limitSubjectNumber: 10,
    limitSubjectScore: 10,
    limitScore: 100,
    costStrength: 3,
    awardCoin: 30,
    awardExp: 8,
  },
  4: {
    title: '日常训练',
    limitTime: 30,
    limitSubjectNumber: 10,
    limitSubjectScore: 10,
    limitScore: 100,
    costStrength: 10,
    awardCoin: 1,
    awardExp: 2,
  },
};
module.exports = steps;