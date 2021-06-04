window.addEventListener('load', function(e) {
    butterfly(e);
});

function butterfly(e) {
    var pictureWrap = document.querySelector('.img-wrap');
    var pageWrap = document.querySelector('#wrap');
    var eyeCenter;

    function getCenter() {
        var eyeBox = document.querySelector('.eye').getBoundingClientRect();
        // 박스 그리는 것부터 다시 가져와야함

        // 중심점 구하기
        eyeCenter = {
            left: window.pageXOffset + eyeBox.left + eyeBox.width / 2,
            top: window.pageYOffset + eyeBox.top + eyeBox.height / 2,
        };
        // getBoundingClientRect는 뷰포트 상의 위치를 가져옴 따라서 window.pageYOffset을 더해 절대 좌표로 가져옴
        // 상대 좌표로 가져오려 했으나, 그랬을 때는 스크롤이 이동했을 때 매번 센터값을 가져와야 함.
    }

    var mainTxt = gsap.timeline();
    // text 애니메이션 타임라인

    mainTxt
        .to('#svg-txt', 1, {
            strokeDashoffset: 0,
            ease: 'power1'

        })
        .to('#svg-txt', 0.5, {
            fill: '#3e6633'
        }, 0.8);


        pageWrap.addEventListener('mouseenter', function() {
        // 나비 보이게
        gsap.to('#cursor', 0.3, {
            opacity: 1
        });
    });

    pageWrap.addEventListener('mouseleave', function() {
        // 나비 안보이게
        gsap.to('#cursor', 0.3, {
            opacity: 0
        });
    });


    pageWrap.addEventListener('mousemove', function(e) {
        getCenter();

        // 나비 좌우반전 : scaleX(-1);
        gsap.to('#cursor', 0.5, {
            x: e.clientX,
            y: e.clientY,
            scaleX: function() {
                if (e.clientX < eyeCenter.left) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });

        var clampSizeX = pictureWrap.offsetWidth * 0.2398 / 100;
        var clampSizeY = pictureWrap.offsetHeight * 0.5995 / 100;
        // 반응형 대응할 수 있도록 .img-wrap을 기준으로 clamp 최소, 최댓값 지정

        var xOffset = gsap.utils.clamp(-clampSizeX, clampSizeX, (((eyeCenter.left) - e.pageX) / -1));
        var yOffset = gsap.utils.clamp(-clampSizeY, clampSizeY, (((eyeCenter.top) - e.pageY) / -1));

        // 절대 좌표로 센터값을 가져오니까 pageX 값을 가져옴
        // gsap.utils.clamp : 최소, 최댓값을 설정

        gsap.to('.eye', {
            x: xOffset,
            y: yOffset,
        });
    });
}