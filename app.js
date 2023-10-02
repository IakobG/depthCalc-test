const startContainer = document.querySelector('.startContainer');
const container = document.querySelector('.container');
const startBtn = document.querySelector('#fill');
const resetBtn = document.querySelector('#reset');

let A = [];
let B = [];
let x = 100;
let y = 50;

startBtn.addEventListener('click', drw);
resetBtn.addEventListener('click', reset);

document.addEventListener('DOMContentLoaded', start());

// function randomNumbers() {
//     x = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
//     y = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
// }

function randomColor() {
    let color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
    while (color.length < 6) {
        color = "0" + color;
    }
    return "#" + color;
}

function array() {
    for (let i = 0; i < y; i++) {
        A[i] = [];
        for (let j = 0; j < x; j++) {
            A[i][j] = Math.floor(Math.random() * 2);
        }
    }
    for (let i = 0; i < y; i++) {
        B[i] = [];
        for (let j = 0; j < x; j++) {
            B[i][j] = A[i][j];
        }
    }
}

function algo() {
    B[0][0] = A[0][0];
    for (let j = 1; j < x; j++) {
        B[0][j] = A[0][j];
    }
    for (let i = 1; i < y; i++) {
        B[i][0] = A[i][0];
    }
    for (let i = 1; i < y; i++) {
        for (let j = 1; j < x; j++) {
            if (A[i][j] == 1) {
                B[i][j] = Math.min(B[i][j - 1], B[i - 1][j]);
                B[i][j] = Math.min(B[i][j], B[i - 1][j - 1]) + 1;
            }
        }
    }
}

// function drawStartingArray() {
//     for (let i = 0; i < y; i++) {
//         const arrayY = document.createElement('SECTION');
//         startContainer.append(arrayY);
//         for (let j = 0; j < x; j++) {
//             const arrayYContainer = document.querySelector(`.Y${i}`);
//             const arrayX = document.createElement('DIV');
//             arrayX.innerText = A[i][j];
//             if (A[i][j] == 1) {
//                 arrayX.style.backgroundColor = '#5798b2';
//                 arrayY.append(arrayX);
//             } else {
//                 arrayY.append(arrayX);
//             }
//         }
//     }

// }

function drawArray() {

    for (let i = 0; i < y; i++) {
        const arrayY = document.createElement('SECTION');
        arrayY.classList.add(`Y${i}`)
        container.append(arrayY);
        for (let j = 0; j < x; j++) {
            const arrayYContainer = document.querySelector(`.Y${i}`);
            const arrayX = document.createElement('DIV');
            arrayX.classList.add(`Y${i}X${j}`)
            // arrayX.innerText = B[i][j];
            if (A[i][j] == 1) {
                arrayX.style.backgroundColor = '#5798b2';
                arrayY.append(arrayX);
            } else {
                arrayY.append(arrayX);
            }
        }
    }
}

function drw() {

    resetBtn.removeAttribute('disabled');

    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            if (B[i][j] === 1) {
                let xy = document.querySelector(`.Y${i}X${j}`);
                xy.style.backgroundColor = '#006fe6';
            }
            else if (B[i][j] > 1) {
                let color =  '#004ba8';//randomColor(); 
                let num = B[i][j];
                let iY = i;
                let iX = j;
                for (let n = num; n > 0; n--) {
                    let select = document.querySelector(`.Y${iY}X${iX}`);
                    select.style.backgroundColor = color;
                    for (let m = num; m > 1; m--) {
                        iX--;
                        let select = document.querySelector(`.Y${iY}X${iX}`);
                        select.style.backgroundColor = color;
                    }
                    iY--;
                    iX = j;
                }
            }
        }
    }
}

function reset() {
    while (startContainer.hasChildNodes()) {
        startContainer.removeChild(startContainer.firstChild);
    }
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
    resetBtn.setAttribute('disabled','true');
    start();
}

function start() {
    //randomNumbers();
    array(); //1
    algo(); //2
    //drawStartingArray();
    drawArray();
    
    console.log(A);
    console.log(B);
}