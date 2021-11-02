let block = document.getElementById('block');
const blockLocalStorage = localStorage.getItem('block');
let inputs;

let nBlock;

if (blockLocalStorage) {
    block.outerHTML = blockLocalStorage;

    nBlock = document.getElementById('block');

    inputs = [...JSON.parse(localStorage.getItem('inputValues'))];
    // inputs.forEach((el, index) => {
        const myEls = document.getElementsByClassName('input');
        [...myEls].forEach((el, index) => {
            el.value = inputs[index].value;
        });
    // });

    [...document.getElementsByClassName('btn')].forEach(el => el.onclick = function () {
        document.getElementById('block').removeChild(el.parentElement);
    });

    [...document.getElementsByClassName('newBlock')].forEach(el => el.onmousedown = function (e) {
        handleMouseDown(el, e);
    });
}

const setElementToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}

const createNewBlock = (x, y) => {
    const newBlock = document.createElement('div');
    newBlock.className = 'newBlock';
    newBlock.style.left = x + 'px';
    newBlock.style.top = y + 'px';
    newBlock.draggable = true;
    return newBlock;
}
const currentBlock = nBlock ? nBlock : block;

currentBlock.ondblclick = function (e) {
    const newBlock = createNewBlock(e.pageX, e.pageY);

    const close = document.createElement('button');
    close.className = 'btn';
    close.onclick = function () {
        document.getElementById('block').removeChild(newBlock);
    }

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'input';
    input.value = 'Your text';

    currentBlock.appendChild(newBlock);
    newBlock.appendChild(input);
    newBlock.appendChild(close);

    newBlock.onmousedown = function (e) {
        handleMouseDown(newBlock, e);
    };
}

window.onbeforeunload = () => {
    const inputs = [...document.getElementsByClassName('input')];
    const inputValues = inputs.map(({value}) => ({value}));
    setElementToLocalStorage('block', currentBlock.outerHTML);
    setElementToLocalStorage('inputValues', JSON.stringify(inputValues));
}


function setBlockPosition(block, e) {
    block.style.left = e.pageX - block.offsetWidth / 2 + 'px';
    block.style.top = e.pageY - block.offsetHeight / 2 + 'px';
}

function handleMouseDown(block, e) {
    document.onmousemove = function (e) {
        setBlockPosition(block, e);
    }

    block.onmouseup = function () {
        document.onmousemove = null;
        block.onmousedown = null;
    }
}

