module.exports.config = {
  // 依次是每个进度条的名字
  bars: ['怒气', 'GCD', '嗜血', '旋风斩', '目标血量', '主手英勇'],
  // 技能名称和案件的对应关系
  keyMap: {
    '嗜血': '1',
    '旋风斩': '2',
    '英勇': '3',
    '斩杀': 'E',
    '取消英勇': '6'
  },
  // 每次循环间隔 单位 ms
  interval: 150,
  // 进度条的起始位置和每个进度条的宽度高度
  barPosition: {
    x: 7,
    y: 42,
    width: 140,
    height: 14,
  },
  // 单片机串口
  port: 'COM8'
};

let 下次英勇判断 = 0;
module.exports.loop = async function($, cast, sleep, now) {
  let 预估剩余怒气 = $.怒气;
  if ($.目标血量 >= 2) {
    if ($.怒气 >= 3) {
      if ($.GCD <= 1) {
        if ($.嗜血 <= 0) {
          cast('嗜血');
          预估剩余怒气 -= 30;
        } else if ($.旋风斩 <= 0) {
          cast('旋风斩');
          预估剩余怒气 -= 25;
        }
      }
    }
  } else {
    if ($.GCD <= 2 && $.怒气 > 1) {
      cast('斩杀');
    }
  }
  if (now > 下次英勇判断) {
    if ($.主手英勇 === 0 && 预估剩余怒气 > 1) {
      cast('英勇');
    } else if (预估剩余怒气 < 5 && $.主手英勇 >= 7) {
      cast('取消英勇');
      下次英勇判断 = now + 600;
    }
  }
}