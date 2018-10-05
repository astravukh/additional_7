
module.exports = function solveSudoku(matrix) {
    let array = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            array.push(new Cell(matrix[i][j], i , j));            
        }        
    }

    array = findRecursive(array);    
    
    const result = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];

    for(let cell of array){
        result[cell.horizontal][cell.vertical] = cell.value;
    }

    return result;
}

class Cell{
    constructor(value, horizontal, vertical){
        this.value = value;
        this.horizontal = horizontal;
        this.vertical = vertical;
        this.square = this.setSquare(horizontal, vertical);
    }
    setSquare(horizontal, vertical){
        if (horizontal<3) {
            if(vertical < 3) return 1;
            if(vertical < 6 && vertical > 2) return 2;
            if(vertical < 9 && vertical > 5) return 3;            
        }
        if (horizontal<6 && horizontal > 2) {
            if(vertical < 3) return 4;
            if(vertical < 6 && vertical > 2) return 5;
            if(vertical < 9 && vertical > 5) return 6;            
        }
        if (horizontal<9 && horizontal > 2) {
            if(vertical < 3) return 7;
            if(vertical < 6 && vertical > 2) return 8;
            if(vertical < 9 && vertical > 5) return 9;            
        }
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
    };
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
    };
    return arr;
}

