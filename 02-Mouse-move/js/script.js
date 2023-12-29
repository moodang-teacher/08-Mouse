$(function () {
  // 대상을 변수에 저장
  const $window = $(window);
  const $objWrap = $('.obj-wrap');
  const $obj1 = $objWrap.find('.obj1');
  const $obj2 = $objWrap.find('.obj2');
  const $obj3 = $objWrap.find('.obj3');
  const $obj4 = $objWrap.find('.obj4');

  // 마우스 좌표값
  let x = 0;
  let y = 0;

  // 보정되는 마우스 좌표값
  let mx = 0;
  let my = 0;
  let speed = 0.008;

  // 반복되는 동작(moving)을 변수에 저장 (취소시키려고)
  let movingObj;

  // 함수를 3개 만들기
  // 1. 마우스 좌표값 받아오는 함수
  function getOffset() {
    $window.on('mousemove', function (e) {
      // 마우스 좌표의 시작지점을 화면의 정중앙으로 이동
      x = Math.max(-100, Math.min(100, e.pageX - $window.outerWidth() / 2));
      y = Math.max(-100, Math.min(100, e.pageY - $window.outerHeight() / 2));
    });
  }

  // 2. 오브젝트를 움직이게 하는 함수
  // 마우스의 기본 좌표값을 기준으로 어떤 값을 만들어 내자
  function moving() {
    mx += (x - mx) * speed;
    my += (y - my) * speed;

    // 오브젝트에 좌표값 적용
    $obj1.css({
      transform: `translate(${mx.toFixed(2)}px, ${my.toFixed(2)}px) rotate(${my.toFixed(2)}deg)`,
    });
    $obj2.css({
      transform: `translate3d(${-mx.toFixed(2)}px, ${-my.toFixed(2)}px, ${mx.toFixed(2)}px)`,
    });
    $obj3.css({
      transform: `translate3d(${-mx.toFixed(2) * 0.5}px, ${my.toFixed(2) * 0.7}px, ${
        mx.toFixed(2) * 0.05
      }px) rotateY(${mx.toFixed(2)}deg)`,
    });
    $obj4.css({
      transform: `translate3d(${mx.toFixed(2) / 0.5}px, ${-my.toFixed(2) / 0.7}px, 0px)`,
      filter: `blur(${-mx.toFixed(2) * 0.05}px)`,
    });

    // 부드럽게 반복
    movingObj = requestAnimationFrame(moving);
  }

  // 3. 1번과 2번을 실행시키는 함수
  // function initMoving () {} // 이름있는 함수
  const initMoving = function () {
    getOffset();
    moving();
  };

  initMoving();

  // 스크롤값이 콘텐츠 영역을 넘어가면
  $window.on('scroll', function () {
    let scrollTop = $(this).scrollTop();
    let targetPos = $('.scroll-area').offset().top;
    console.log(scrollTop, targetPos);

    // 만약 스크롤값이 targetPos를 넘어가면
    if (scrollTop >= targetPos) cancelAnimationFrame(movingObj);

    if (scrollTop === 0) initMoving();
  });
});
