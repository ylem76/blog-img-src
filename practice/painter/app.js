const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
// context : 캔버스 내부에서 픽셀들을 다룸

canvas.width = 700;
canvas.height = 700;
// canvas의 그림이 그려질 사이즈를 지정해야함

ctx.strokeStyle = '#222';
ctx.lineWidth = 2.5;


let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    
    

    // painting 상태가 아닐 때에는 그냥 점을 찍는다
    // (시작좌표 설정하기 위한)
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        console.log(x + ' '+ y);
    } else {
        ctx.lineTo(x, y);
        console.log(x + ' '+ y);
        ctx.stroke();
    }

}

function onMouseDown(event) {
    painting = true;
}



if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
}