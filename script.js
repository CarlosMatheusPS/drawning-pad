const canvas = document.getElementById('canvas');

const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEL = document.getElementById('color');
const clearEL = document.getElementById('clear');

const ctx = canvas.getContext('2d');
let size = 10
let isPressed = false
let color = 'black'
let x
let y

canvas.addEventListener('mousedown', (e) => {
    isPressed = true
    x = e.offsetX
    y = e.offsetY
    draw(e)
})
canvas.addEventListener('mouseup', (e) => {
    isPressed = false
    x = undefined
    y = undefined

})
canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        draw(e)
    }
})
canvas.addEventListener('mouseover', e => {
    isPressed = false
})

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}
function draw(e) {
    setTimeout(() => {
        const x2 = e.offsetX
        const y2 = e.offsetY
        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)
        x = x2
        y = y2
    }, 1);
}
function updateSizeOnScreen() {
    sizeEL.innerText = size
}
increaseBtn.addEventListener('click', () => {
    size += 5

    setInterval(() => {
        if (size >= 50) {
            size = 50
            increaseBtn.disabled = true
        } else {
            increaseBtn.disabled = false
        }
    }, 1);
    updateSizeOnScreen()
})
decreaseBtn.addEventListener('click', () => {
    size -= 5

    setInterval(() => {
        if (size <= 5) {
            size = 5
            decreaseBtn.disabled = true
        } else {
            decreaseBtn.disabled = false
        }
    }, 1);
    updateSizeOnScreen()


})
colorEL.addEventListener('change', (e) => color = e.target.value)

clearEL.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))