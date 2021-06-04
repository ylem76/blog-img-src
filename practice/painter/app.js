const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
// context : 캔버스 내부에서 픽셀들을 다룸
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');


const INITIAL_COLOR = '#222';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// canvas의 그림이 그려질 사이즈를 지정해야함

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseDown(event) {
    if (filling === false) {
        startPainting()
    }
}

function onMouseMove(event) {
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
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = 'fill';

    } else {
        filling = true;
        mode.innerText = 'paint';
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function hadleSaveClick() {
    const link = document.createElement('a');
    link.href= canvas.toDataURL();
    link.download = 'paintJS[exported]';
    link.click();

}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);

    // 우클릭 했을 때 나타나는 메뉴
    canvas.addEventListener('contextmenu', handleCM);
}

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