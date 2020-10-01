const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls__color");
const colorRange = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
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

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        // ctx.closePath();
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();   
    }
}

function handleCanvasClick(event) {
    if (filling === true) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleColorClick(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
}

function handleColorRangeInput(event) {
    ctx.lineWidth = event.target.value;
}

function handleModeClick(event) {
    const buttonText = event.target.innerText;
    if (filling === true) {
        filling = false;
        event.target.innerText = "FILL";
    } else {
        filling = true;
        event.target.innerText = "PAINT";
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick(event) {
    const image = canvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");;
    const link = document.createElement("a")
    link.download = "myImage";
    link.href = image;
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
    if(saveBtn) {
        saveBtn.addEventListener("click", handleSaveClick);
    }
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(colorRange) {
    colorRange.addEventListener("input", handleColorRangeInput);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

