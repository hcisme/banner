const swiper = document.querySelector('.swiper');
const imgContainer = document.querySelector('.img-container');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const indictorContainer = document.querySelector('.indictor-container');
const imgList = imgContainer.children;
const imgWidth = swiper.offsetWidth;

let index = 0;
let timer;
let isPlaying = false; // 是否有正在进行的切换动画

const init = () => {
  // 设置指示器
  let str = '';
  for (let index = 0; index < imgList.length; index++) {
    str += '<span></span>';
  }
  indictorContainer.innerHTML = str;

  // 克隆第一张图片到最后（无缝滚动）
  const cloneNode = imgList[0].cloneNode(true);
  imgContainer.appendChild(cloneNode);
  imgContainer.style.width = `${imgList.length * imgWidth}px`;

  // 点击指示器的监听事件
  const indictorList = document.querySelectorAll('.indictor-container span');
  indictorList.forEach((item, index) => {
    item.onclick = () => {
      move(index);
    };
  });
};

const move = (newIndex, onEnd) => {
  if (isPlaying || newIndex === index) {
    return;
  }
  isPlaying = true;
  const from = parseFloat(imgContainer.style.marginLeft) || 0;
  const to = -newIndex * imgWidth;

  createAnimation({
    from,
    to,
    totalMs: 800,
    onMove: (distance) => {
      imgContainer.style.marginLeft = `${distance}px`;
    },
    onEnd: () => {
      isPlaying = false;
      onEnd?.();
    }
  });
  index = newIndex;
  setIndictor();
};

const next = () => {
  const newIndex = index + 1;
  move(newIndex, () => {
    if (newIndex === imgList.length - 1) {
      index = 0;
      imgContainer.style.marginLeft = 0;
    }
  });
};

const prev = () => {
  let newIndex = index - 1;
  if (newIndex < 0) {
    imgContainer.style.marginLeft = `-${(imgList.length - 1) * imgWidth}px`;
    newIndex = imgList.length - 2;
  }
  move(newIndex);
};

const setIndictor = () => {
  const indictorList = document.querySelectorAll('.indictor-container span');
  document.querySelector('.indictor-container span.active')?.classList.remove('active');
  indictorList[index === imgList.length - 1 ? 0 : index].classList.add('active');
};

const start = () => {
  setIndictor();
  timer = setInterval(next, 1800);
};

const stop = () => {
  clearInterval(timer);
  timer = null;
};

(() => {
  init();

  start();

  rightBtn.onclick = next;
  leftBtn.onclick = prev;

  leftBtn.onmouseenter = stop;

  rightBtn.onmouseleave = start;
})();
