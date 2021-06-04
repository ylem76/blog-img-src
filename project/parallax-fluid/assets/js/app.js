spInit();

function spInit() {
    window.addEventListener('load', function(e) {

        // wrapper 변수 선언
        var spWrap = document.querySelector('#wrap');
        var spContainer = document.querySelector('.ms_slider');
        var imgArray = Array.prototype.slice.call(document.querySelectorAll('#wrap .btn_thumb'));

        // 메인 텍스트 애니메이션
        var textTl = gsap.timeline();
        textTl
            .to(".sp-rect", {
                attr: {
                    y: 0
                },
                duration: 1,
            })
            .to(".sub_txt", {
                duration: 0.5,
                opacity: 1,
            }, 0.8);
        textTl.play();

        // 슬라이더 관련 변수선언
        var slideW;
        var spSlideFast;
        var spSlideSlow;

        // 슬라이드 애니메이션 지정
        function slideInit() {
            if (window.innerWidth < 767) {
                slideW = window.innerWidth * 2
            } else {
                slideW = window.innerWidth + 1200;
            }
            spSlideFast = gsap.fromTo('#wrap .img_wrap.fast', {
                x: slideW
            }, {
                duration: 13,
                ease: 'none',
                x: 0,
                stagger: 4,
                repeat: -1,
                paused: true
            });

            spSlideSlow = gsap.fromTo('#wrap .img_wrap.slow', {
                x: slideW
            }, {
                duration: 15,
                ease: 'none',
                x: 0,
                stagger: 4,
                repeat: -1,
                paused: true
            });
        }

        slideInit();
        slidePlay(7);

        // 슬라이드 애니메이션 제어 함수 선언
        function slidePlay(position) {
            spSlideFast.play(position);
            spSlideSlow.play(position - 4);
        }

        function slideResume() {
            spSlideFast.resume();
            spSlideSlow.resume();
        }

        function slidePause() {
            spSlideFast.pause();
            spSlideSlow.pause();
        }

        function slideSpeed(speed) {
            spSlideFast.timeScale(speed);
            spSlideSlow.timeScale(speed);
        }


        // resize event
        window.addEventListener('resize', function() {
            slidePause();
            slideInit();
            slidePlay(6);
        });



        function onLeave(e) {
            // img position reset
            imgArray.forEach(function(item) {
                gsap.to(item, {
                    x: 0,
                    y: 0,
                    duration: 0.3
                });
            });
            // cursor
            spCursor.classList.remove('img');
            // $('#cursor').hide();

            slideSpeed(1);
        }

        // 커서 관련
        var spCursor = document.querySelector('#ms_sp_cursor');
        // cursor event
        function spCursorBg(targetElem) {

            if (targetElem.getAttribute('content-type') == 'image') {
                spCursor.classList.add('img');
            } else if (targetElem.getAttribute('content-type') == 'movie') {
                spCursor.classList.add('mov');
            } else {
                spCursor.classList.remove('mov');
                spCursor.classList.remove('img');
            }
        }

        function onMove(e) {
            // img move event
            // 커서 좌표에 따라 이미지 위치 변동 그런데 클릭하기 귀찮은데 이걸 꼭 해야하는걸까
            function imgMove(e) {
                imgArray.forEach(function(item) {
                    var itemObj = item.getBoundingClientRect();
                    var xOffset = (e.pageX - (itemObj.left + itemObj.width / 2)) / (itemObj.width) * -1;
                    var yOffset = (e.pageY - (itemObj.top + itemObj.height / 2)) / (itemObj.height) * -1;
                    gsap.to(item, {
                        x: xOffset,
                        y: yOffset,
                        duration: 0.3
                    });
                });
            }
            imgMove(e);

            gsap.to('#cursor', 0.1, {
                x: e.clientX,
                y: e.clientY
            })

            gsap.to(spCursor, 0.3, {
                x: e.clientX,
                y: e.clientY
            });

            if (e.target.getAttribute('content-type') != null) {
                slideSpeed(0.5);
            } else {
                slideSpeed(1);
            }

            if (e.target.getAttribute('content-type') == 'image') {
                spCursor.classList.add('img');
            } else if (e.target.getAttribute('content-type') == 'movie') {
                spCursor.classList.add('mov');
            } else {
                spCursor.classList.remove('mov');
                spCursor.classList.remove('img');
            }
        }




        var isScrolling;

        function onWheel(e) {
            if (e.deltaY < 0) {
                slideSpeed(e.deltaY * -0.3);
            } else {
                slideSpeed(e.deltaY * -0.3);
            }
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(function() {
                slideSpeed(1);
            }, 100);
        }

        spWrap.addEventListener('mouseenter', function() {
            $('#cursor').show();
        });
        spWrap.addEventListener('mouseleave', onLeave);
        spWrap.addEventListener('mousemove', onMove);

        // mouse wheel event
        spContainer.addEventListener('wheel', onWheel, false);



        // touch event
        var xOld = 0;
        spContainer.addEventListener('touchmove', function(e) {
            var xNow = e.touches[0].clientX;
            var touchSpeed = xOld - xNow;
            if (touchSpeed > 1 && touchSpeed < 100) {
                slideSpeed(touchSpeed * 10);
            } else {
                slideSpeed(1);
            }
            xOld = xNow;
        });

        spContainer.addEventListener('touchend', function(e) {
            xOld = 0;
            xNow = 0;
            slideSpeed(1);
        });

        // popup event
        var dimLayer = "<div id='dimLayer'></div>";
        var opened = false;
        var popList = [{
                id: 'num01',
                type: 'img',
                src: './assets/img/popup_img_01.jpg'
            },
            {
                id: 'num02',
                type: 'img',
                src: './assets/img/popup_img_02.jpg'
            },
            {
                id: 'num04',
                type: 'mov',
                src: './assets/img/sportage_teaser_1920.mp4',
                thumb: './assets/img/popup_img_mov.jpg'
            },
            {
                id: 'num03',
                type: 'img',
                src: './assets/img/popup_img_02.jpg'
            },
        ];

        function spOpenPopup(popupId) {
            var spPopupContent = '';
            switch (popupId) {
                case 'num01':
                    spPopupContent = '<div class="content image"> <image src="' + popList[0].src + '"/></div>';
                    break;
                case 'num02':
                    spPopupContent = '<div class="content image"> <image src="' + popList[1].src + '"/></div>';
                    break;

                case 'num03':
                    spPopupContent = '<div class="content image"><image src="' + popList[3].src + '"/></div>';
                    break;

                case 'num04':
                    spPopupContent = '<div class="content mov"><video type="video/mp4" class="sp_video_container" controls poster="' + popList[2].thumb + '" preload="preload" src="' + popList[2].src +
                        '"></video><button class="sp_video_cover"></button></div>';
                    break;
                default:
                    return;

            }

            slidePause();
            spCursor.classList.remove('mov');
            spCursor.classList.remove('img');


            $('body').addClass('popup-open');
            $('#wrap').append(dimLayer);
            $('#sp_popup').append(spPopupContent);
            $('#sp_popup').fadeIn("fast").addClass("on");
            opened = true;

            $('.sp_video_cover').on('click', function() {
                e.preventDefault();

                $('.sp_video_cover').hide();
                var media = document.querySelector('.content video');
                media.play();
            });
        }

        function spClosePopup() {
            slidePause();

            $('#sp_popup').fadeOut("fast").removeClass("on");
            $('body').removeClass('popup-open');
            $("#dimLayer").fadeOut("fast", function() {
                $("#dimLayer").remove();
            });
            $(".content").remove();
            opened = false;

            slidePlay();
        }

        // 파라미터로 팝업 열기
        var getUrlParams = function() {
            var params = {};
            window.location.search.replace(
                /[?&]+([^=&]+)=([^&]*)/gi,
                function(str, key, value) {
                    params[key] = value;
                }
            );
            return params;
        };

        // 키값 확인
        var keyName = "popup";
        if (getUrlParams()[keyName] == 'num01' || getUrlParams()[keyName] == 'num02' || getUrlParams()[keyName] == 'num03' || getUrlParams()[keyName] == 'num04') {
            slidePause();
            spOpenPopup(getUrlParams()[keyName]);
        }

        spWrap.addEventListener('click', function(e) {
            e.preventDefault();
            var popupId = e.target.getAttribute('popup-content');
            if (popupId != null && opened == false) {
                spOpenPopup(popupId);
            } else if (e.target.id == 'dimLayer' || e.target.id == 'sp_popup_close') {
                spClosePopup();
                slideResume();
            }
        });
    });
}