const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');

const signature = document.getElementById('jsSignature');
const ctx2 = signature.getContext('2d');

// context : 캔버스 내부에서 픽셀들을 다룸
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');
const mirror = document.getElementById('jsMirror');

// 기본 색상 및 기본 크기 정의
const INITIAL_COLOR = '#222';
const CANVAS_SIZE = 700;

// css와는 별개로 캔버스 사이즈를 지정해야함
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 캔버스 기본 색상 지정
ctx.fillStyle = 'transparent';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

// 컨텍스트 기본 스타일 지정
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// mode 지정
let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseDown(event) {
    // 내가 추가함 mode가 filling이 아닐 때만 stroke 그릴 수 있게
    if (filling === false) {
        startPainting()
    }
}

function onMouseMove(event) {
    // 캔버스에 대한 x,y 좌표
    // offset은 부모 요소에 의해 달라지는데, 이런 경우 때문에 필요하구나
    const x = event.offsetX;
    const y = event.offsetY;

    // painting 상태가 아닐 때에는 그냥 점을 찍는다
    // (시작좌표 설정하기 위한)
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}

function handleColorClick(event) {
    // 색상을 누르면 선과 칠 색상이 변경됨
    // 타겟에서 css 요소 내용 불러올 수 있음.
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    // 인풋 이벤트의 target 값을 그대로 라인 값에 적용
    // 인풋 이벤트 이렇게 쓰는 거 신기
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    // 근데 filling과 painting 동일한데, 굳이 두 개로 나눌 이유가..?
    // 안나누는 것도 생각해보기.
    if (filling === true) {
        filling = false;
        mode.innerText = 'fill';

    } else {
        filling = true;
        mode.innerText = 'paint';
    }
}

function handleCanvasClick() {
    // mousedown과 click이벤트는 다르다..!
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    // 마우스 오른쪽 클릭 해서 열리는 걸 보통 contextmenu라고 부름
    // event.preventDefault();
}

function hadleSaveClick() {
    // 이거 신기했음.
    // a 태그를 만들고 href에는 캔버스에서 만든 데이터를 가져오고
    // download에는 파일 이름을 적는다
    // 확장자는 toDataURL('image/jpeg') 등으로 변경 가능(기본은 png)
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'paintJS[exported]';

    // .click()은 기본이벤트인듯..? 알아보기
    link.click();
}

function handleMirror() {
    // const img = document.querySelector('.base-img');
    // img.src = canvas.toDataURL();

    // ctx.scale(-1, 1);



    // img.src = canvas.toDataURL();

    // ctx2.drawImage(img, 100, 100);



    const imageObj = document.querySelector('.base-img');
    imageObj.onload = function() {
        
        ctx2.drawImage(imageObj, 69, 50);
        ctx2.scale(0.5,0.5);
        // ctx2.drawImage(imageObj, 69, 50);
    }

    imageObj.src = canvas.toDataURL();
}

if (canvas) {
    // 변수로 선언한 canvas가 있을 때에만 하단이 실행되도록
    // 한번 더 안전하게 묶은 느낌.
    // 이렇게 정리하니까 깔끔한 것 같아.
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);

    // 우클릭 했을 때 나타나는 메뉴
    canvas.addEventListener('contextmenu', handleCM);
}

// 쿼리셀렉터로 가져오면 array가 아니라 nodelist였는데,
// 그걸 array로 변경하는 듯. call과 뭐가 다른 지 확인해보기
Array.from(colors).forEach(function(color) {
    color.addEventListener('click', handleColorClick);
});

if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (mode) {
    mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener('click', hadleSaveClick);
}

if (mirror) {
    mirror.addEventListener('click', handleMirror);
}