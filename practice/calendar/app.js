$(document).ready(function() {
    calendarInit();
});
/*
    달력 렌더링 할 때 필요한 정보 목록 

    현재 월(현재 시간으로 고정)
    1일 요일
    마지막일(숫자)
    전월 마지막일(숫자)
*/

function calendarInit() {
    var today = new Date();
    var currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    var monthData = {}

    renderCalender();

    function renderCalender() {
        monthData = {
            firstDay: 0,
            lastDay: 0,
            lastDate: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate(),
            prevDate: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate(),
            
        }
        // 첫날 요일 구하기 : 월요일부터 시작이라 -1 처리
        monthData.firstDay = currentMonth.getDay() - 1 == -1 ? 0 : currentMonth.getDay() - 1
        // 마지막 요일 구하기 : 마지막일 == 일요일일 때
        monthData.lastDay = ((monthData.firstDay + monthData.lastDate) % 7) == 0 ? 0 : 7 - ((monthData.firstDay + monthData.lastDate) % 7)

        $('.year-month').text(currentMonth.getFullYear() +'.'+ (currentMonth.getMonth() + 1))

        calendar = document.querySelector('.dates')
        calendar.innerHTML = '';
        // 지난달
        for (var i = monthData.prevDate; i > monthData.prevDate - monthData.firstDay; i--) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day disable">' + i + '</div>'
        }
        // 이번달
        for (var i = 1; i <= monthData.lastDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day">' + i + '</div>'
        }
        // 다음달
        for (var i = 1; i <= monthData.lastDay; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day disable">' + i + '</div>'
        }
    }

    // 이전, 다음달 넘기기
    $('.go-prev').on('click', function() {
        currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth()-1, 1);
        renderCalender();
    });

    $('.go-next').on('click', function() {
        currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth()+1, 1);
        renderCalender();
    });
}