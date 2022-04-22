module.exports.config = {
  // 依次是每个进度条的名字
  bars: ['怒气', 'GCD', '裂伤', '割伤', '精灵火', '重殴'],
  // 技能名称和案件的对应关系
  keyMap: {
    '裂伤': '1',
    '横扫': '2',
    '割伤': '3',
    '重殴': '4',
    '精灵火': 'R'
  }
};

module.exports.loop = async function({ $, cast, sleep, now, mode }) {
  let 预估剩余怒气 = $.怒气;
  const gcdReady = $.GCD < 7;
  if (gcdReady) {
    if ($.怒气 > 0 && $.精灵火 <= 15 && mode !== 'AOE') {
      cast('精灵火');
    } else if ($.怒气 > 15) {
      if ($.裂伤 <= 0) {
        cast('裂伤');
        预估剩余怒气 -= 15;
      } else if ($.割伤 <= 40 && mode !== 'AOE') {
        cast('割伤');
        预估剩余怒气 -= 15;
      } else {
        cast('横扫');
        预估剩余怒气 -= 15;
      }
    }
  }
  if (预估剩余怒气 > 35 && $.重殴 < 1) {
    cast('重殴');
  }
}