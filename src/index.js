
module.exports = function solveSudoku(matrix) {
    var array = [];
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

    for(cell of array){
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
        this.can = [];
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

function setCan(arr) {
    let vertical = [];
    let horizontal = [];
    let square = [];
    for(cell of arr){
        if (cell.value === 0) {
            for(element of arr){                    
                if(element.value !== 0){
                    if (element.vertical === cell.vertical) {
                        vertical.push(element.value);
                    }

                    if (element.horizontal === cell.horizontal){
                        horizontal.push(element.value);
                    }

                    if (element.square === cell.square){
                        square.push(element.value);
                    }                                                
                }
            };
            cell.can = [];
            for(let i = 1; i <= 9; i++){
                if (vertical.indexOf(i) === -1 && horizontal.indexOf(i) === -1 && square.indexOf(i) === -1) {                        
                    cell.can.push(i);
                }
            }
            vertical = [];
            horizontal = [];
            square = [];
        }         
    }
    return arr;        
}

function Solution (arr){
    arr = setCan(arr);
    let flag = true;

    while(flag){
        flag = false;

        for(let cell of arr){
            if(cell.value === 0 && cell.can.length === 1){
                cell.value = cell.can[0];
                cell.can = [];
                arr = setCan(arr);
                flag = true;    
            }        
        }
        let temp = false;
        for(let cell of arr){
            for( let canValue of cell.can){
                temp = true;
                for(let element of arr){
                    if((element.value === 0) && (element.vertical === cell.vertical) && element !== cell){
                        if (element.can.indexOf(canValue) !== -1) {
                            temp = false;
                        }
                    }
                }
                if (temp && cell.value === 0) {
                    cell.value = canValue;
                    cell.can = [];
                    arr = setCan(arr);
                    flag = true;
                }
            }               
        }
        for(let cell of arr){
            for(let canValue of cell.can){
                temp = true;
                for(let element of arr){
                    if((element.value === 0) && (element.horizontal === cell.horizontal) && element !== cell){
                        if (element.can.indexOf(canValue) !== -1) {
                            temp = false;
                        }
                    }
                }
                if (temp && cell.value === 0) {
                    cell.value = canValue;
                    cell.can = [];
                    arr = setCan(arr);
                    flag = true;
                }

            }               
        }
        for(let cell of arr){
            for(let canValue of cell.can){
                temp = true;
                for(let element of arr){
                    if((element.value === 0) && (element.square === cell.square) && element !== cell){
                        if (element.can.indexOf(canValue) !== -1) {
                            temp = false;
                        }
                    }
                }
                if (temp && cell.value === 0) {
                    cell.value = canValue;
                    cell.can = [];
                    arr = setCan(arr);
                    flag = true;
                }

            }               
        }
    }
    return arr;
}

function findRecursive(arr, choise = 0){
    arr = Solution (arr);        
    let complete = true;
    for(let element of arr){
        if (element.value === 0) {
            complete = false;
        }
    }
    if(complete){
        return arr;
    }
    else{
        let arrTemp = cloneArr(arr);
        for (let el of arrTemp){
            if (el.can.length === 2) {
                el.value = el.can[choise];
                el.can = [];
                break;
            }
        }
        arrTemp = Solution (arrTemp);
        let noError = true;
        let noZero = true;
        for (let el of arrTemp){
            if (el.value === 0 && el.can.length === 0) {
                noError = false;
                break;
            }

            if (el.value === 0 && el.can.length !== 0) {
                noZero = false;
                break;
            }

        }

        if(noError && noZero){
            return arrTemp;
        }
        else if(noError){
            if(findRecursive(arrTemp, 0) !== false){
                return findRecursive(arrTemp, 0)
            }
            else{
                if(findRecursive(arrTemp, 1) !== false){
                    return findRecursive(arrTemp, 1);                        
                }
                else{
                    return findRecursive(arr, 1);
                }                    
            }
                           
        }
        else if(!noError){
            if(choise === 0){
                return findRecursive(arr, 1)
            }
            return false;
        }
    }
}
function cloneArr(arr){
    let result = [];
    for(let cell of arr){        
        result.push(new Cell(cell.value, cell.horizontal, cell.vertical));
    }
    return setCan(result);

}

