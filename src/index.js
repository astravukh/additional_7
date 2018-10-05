
module.exports = function solveSudoku(matrix) {
    let array = [];

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            array.push(new Cell(matrix[i][j], i , j));
        }
    }

    array = findRecursive(array);

    for(let cell of array){
        matrix[cell.horizontal][cell.vertical] = cell.value;
    }

    return matrix;
}

class Cell{
    constructor(value, horizontal, vertical){
        this.value = value;
        this.horizontal = horizontal;
        this.vertical = vertical;
        this.square = Math.floor(horizontal/3) * 3 + Math.floor(vertical/3);
    }
}

function checkValue(arr, cell, cellValue) {
    let isCorrect = true;
    for(let element of arr){
        if (element.value != cellValue) continue;
        if (element.vertical == cell.vertical || element.horizontal == cell.horizontal || element.square == cell.square) {
            isCorrect = false;
            break;
        }
    }
    return isCorrect;
}

function findRecursive(arr){
    for(let cell of arr){
        if(cell.value === 0){
            for (let i = 1; i <= 9; i++) {
                if(checkValue(arr, cell, i)){
                    cell.value = i;
                    if(findRecursive(arr) !== false){
                        return findRecursive(arr);
                    }
                }
            }
            cell.value = 0;
            return false;
        }
    }
    return arr;
}

