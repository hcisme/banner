const createAnimation = ({ from, to, totalMs = 1000, duration = 15, onMove, onEnd }) => {
  // 最大变化次数
  const times = Math.floor(totalMs / duration);
  // 每次变化的距离
  const gap = (to - from) / times;
  let curTimes = 0;

  const timerId = setInterval(function () {
    from += gap;
    curTimes += 1;
    if (curTimes >= times) {
      from = to;
      clearInterval(timerId);
      onMove?.(from);
      onEnd?.();
      return;
    }
    onMove?.(from);
  }, duration);
};