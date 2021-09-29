$(document).ready(function() {
    calendarInit();
});
function calendarInit() {
    var today = new Date(); // 현재 시간 가져오기
    var firstDate = new Date(today.getFullYear(),today.getMonth(),1); // 현재 월의 1일 date 객체 생성
    var lastDate = new Date(today.getFullYear(),today.getMonth()+1,0); // 현재 월의 마지막일 date 객체 생성, 28, 30, 31 등 무시하고 다음달의 첫 날의 -1일

    var monthData = {
        today : {
            year : today.getFullYear(),
            month: today.getMonth(), // month 0부터 시작
            date : today.getDate(),
            day : today.getDay() // 일요일부터 0부터 시작
        },
        firstDate : {
            year : firstDate.getFullYear(),
            month: firstDate.getMonth(),
            date : firstDate.getDate(),
            day : firstDate.getDay()
        },
        lastDate : {
            year : lastDate.getFullYear(),
            month: lastDate.getMonth(),
            date : lastDate.getDate(),
            day : lastDate.getDay()
        }
    }

    var thisDates = [];

    console.log(today)
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    for (var i = 1; i <= monthData.lastDate.date; i++) {
        thisDates.push(i);
    }

    console.log(thisDates)

    calendar = document.querySelector('.dates')

    for(var i =0; i<monthData.firstDate.day; i++) {
        calendar.innerHTML = calendar.innerHTML + '<div class="day"></div>'
    }
    for(var i=1; i<=monthData.lastDate.date; i++) {
        calendar.innerHTML = calendar.innerHTML + '<div class="day">' + i + '</div>'
    }

    

    // calendarBack();
}


function calendarBack() {
    var kgs_date = new Date(); //현재 년월일시간 GTM+0900 (한국 표준시)
    var kgs_cal1_idx = 0; //캘린더 축제&행사 
    var kgs_cal2_idx = 0; //캘린더 혜택
    var kgs_viewYear = kgs_date.getFullYear();
    var kgs_viewMonth = kgs_date.getMonth();

    renderCalender();

    // function _toConsumableArray(arr) {
    //     if (Array.isArray(arr)) {
    //         for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
    //         return arr2;
    //     } else {
    //         return Array.from(arr);
    //     }
    // }

    function renderCalender() {

        document.querySelector('.year-month').textContent = kgs_viewYear + '.' + (kgs_viewMonth + 1);

        var prevLast = new Date(kgs_viewYear, kgs_viewMonth, 0); //이전 월
        var thisLast = new Date(kgs_viewYear, kgs_viewMonth + 1, 0); //현재 월

        //console.log(kgs_viewMonth);

        //일주일 (0-6) 일:0, 월:1, 화:2, 수:3, 목:4, 금:5, 토:6

        var PLDate = prevLast.getDate(); ///전월 일(all)
        var PLDay = prevLast.getDay(); //전월 마지막 요일

        var TLDate = thisLast.getDate(); //현재 월 일(all)
        var TLDay = thisLast.getDay(); //현재달 마지막 요일

        var prevDates = []; //전월 일(비활성영역)
        var thisDates = new Array(); //다음 월 일(활성영역)
        console.log(thisDates);
        var nextDates = []; //다음 월 일(비활성영역)

        for (var i = 1; i <= TLDate; i++) {
            thisDates.push(i);
        }

        console.log(thisDates);

        if (PLDay !== 0) { //전월 일(비활성영역) 계산식
            for (var i = 0; i < PLDay; i++) {
                prevDates.unshift(PLDate - i);
            }
        }

        if (TLDay !== 0) { //다음 월 일(비활성영역) 계산식
            for (var i = 1; i < 8 - TLDay; i++) {
                nextDates.push(i);
            }
        }

        var dates = prevDates.concat(thisDates, nextDates); //현재 월 달력에 출력할 모든 일자
        var firstDateIndex = dates.indexOf(1); //현재 월 일 자리 순서(시작)
        var lastDateIndex = dates.lastIndexOf(TLDate); //현재 월 일 자리 순서(끝)

        var firstDayOfWeek = PLDay === 0 ? 7 : PLDay;
        var weekNo = Math.ceil((firstDayOfWeek - 1 + kgs_date.getDate()) / 7);

        var kgs_benefits_star = []; //혜택-시작
        var kgs_benefits_end = [] //혜택-종료
        var kgs_festival_star = []; //행사-시작
        var kgs_festival_end = []; //행사-종료
        var kgs_benefits_set = [];
        var kgs_festival_set = [];
        var kgs_bs_day, kgs_be_day, kgs_fs_day, kgs_fe_day;

        if (kgs_viewYear == 2021 && kgs_viewMonth + 1 == 8) { //2021년 8월 데이터
            kgs_benefits_set = ['2021-8-2-8-10', '2021-8-13-8-25', '2021-8-20-8-31']; //혜택
            kgs_festival_set = ['2021-8-1-8-20', '2021-8-15-8-30', '2021-8-20-8-25']; //행사
        } else if (kgs_viewYear == 2021 && kgs_viewMonth + 1 == 9) {
            kgs_benefits_set = ['2021-9-1-9-2', '2021-9-5-9-10', '2021-9-20-9-30']; //혜택
            kgs_festival_set = ['2021-9-1-9-30', '2021-9-15-9-20', '2021-9-20-9-25']; //행사
        } else {
            kgs_benefits_set = [];
            kgs_festival_set = [];
        }

        var kgs_bf_len = kgs_benefits_set.length;
        var kgs_fe_len = kgs_festival_set.length;
        //혜택 기간 계산
        for (var i = 0; i < kgs_bf_len; i++) {
            kgs_bs_day = kgs_benefits_set[i].split('-'); //혜택 시작 일자
            kgs_be_day = kgs_benefits_set[i].split('-'); //혜택 종료 일자
            var _array_1 = kgs_bs_day[2];
            var _array_2 = kgs_be_day[4];
            var _array_1_num = Number(_array_1);
            var _array_2_num = Number(_array_2);
            kgs_benefits_star.push(_array_1_num);
            kgs_benefits_end.push(_array_2_num);
        }
        //행사 기간 계산
        for (var i = 0; i < kgs_fe_len; i++) {
            kgs_fs_day = kgs_festival_set[i].split('-'); //행사 시작 일자
            kgs_fe_day = kgs_festival_set[i].split('-'); //행사 종료 일자
            var _array_1 = kgs_fs_day[2];
            var _array_2 = kgs_fe_day[4];
            var _array_1_num = Number(_array_1);
            var _array_2_num = Number(_array_2);
            kgs_festival_star.push(_array_1_num);
            kgs_festival_end.push(_array_2_num);
        }

        // =================================================================

        dates.forEach(function(kgs_date, i) {
            var condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other'; //활성영역(this), 비활성영역(other)
            var _benefits = ''; //혜택(red)
            var _festival = ''; //축제(blue)

            //혜택(red)
            if (i >= kgs_benefits_star[kgs_cal2_idx] + firstDateIndex - 1 && i < kgs_benefits_end[kgs_cal2_idx] + firstDateIndex) _benefits = 'red';
            //축제(blue) 
            if (i >= kgs_festival_star[kgs_cal1_idx] + firstDateIndex - 1 && i < kgs_festival_end[kgs_cal1_idx] + firstDateIndex) _festival = 'blue';
            dates[i] = '<div class="date"><span class="' + condition + ' ' + _benefits + ' ' + _festival + '">' + kgs_date + '</span></div>';
        });

        document.querySelector('.dates').innerHTML = dates.join('');
        //$('.dates').empty();
        //$('.dates').append(inHtml);
        if (weekNo == 1) {
            $('.dates').addClass('firstweek');
        } else if (weekNo == 2) {
            $('.dates').addClass('secondweek');
        } else if (weekNo == 3) {
            $('.dates').addClass('thirdweek');
        } else if (weekNo == 4) {
            $('.dates').addClass('fourthweek');
        } else if (weekNo == 5) {
            $('.dates').addClass('fifthweek');
        } else if (weekNo == 6) {
            $('.dates').addClass('sixthweek');
        }

        var kgs_today = new Date();

        if (kgs_viewMonth === kgs_today.getMonth() && kgs_viewYear === kgs_today.getFullYear()) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                // for (var _iterator = document.querySelectorAll('.this')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                //     var _date = _step.value;

                //     //console.log(_date);

                //     if (+_date.innerText === kgs_today.getDate()) {
                //         _date.classList.add('kgs_today');
                //         break;
                //     }
                // }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }


    };
}