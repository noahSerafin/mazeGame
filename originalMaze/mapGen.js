const player = {
    x : 1,
    y : 1
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const createArr = (length) => {
    var arr = []
    for (let i = 0; i < length; i++) {
        arr[i] = 0;
    }
    return arr;
}
const createGrid = (size) => {
    const trueSize = (2*size) +1
    var grid = []
    for (let row = 0; row < trueSize; row++) {
        grid.push(createArr(trueSize))
    }
    for (let row = 0; row < trueSize; row++) {
        for (let column = 0; column < trueSize; column++) {
            if(row % 2 == 0 && column % 2 == 0){
                grid[row][column] = '+';
            } else  if(row % 2 !== 0 && column % 2 !== 0){
                grid[row][column] = 0;
            } else  if(row % 2 !== 0 && column % 2 == 0){
                grid[row][column] = '|';
            } else  if(row % 2 == 0 && column % 2 !== 0){
                grid[row][column] = '-';
            }
        }
    }
    return grid;
}

const drawPath = (size) => {

    let maze = createGrid(size);

    function Move(input){
        if(input == 1 && maze[player.y][player.x-1] <= 3 && maze[player.y][player.x-2] == 0)
        {           
            player.x -= 2
            stepCount += 1;    
        }
        if(input == 2 && maze[player.y][player.x+1] <= 3  && maze[player.y][player.x+2] == 0)
        {
            player.x += 2
            stepCount += 1;
        }
        if(input == 3 && maze[player.y-1][player.x] <= 3  && maze[player.y-2][player.x] == 0)
        {
            player.y -= 2
            stepCount += 1;
        }
        if(input == 4 && maze[player.y+1][player.x] <= 3  && maze[player.y+2][player.x] == 0)
        {
            player.y += 2
            stepCount += 1;
        }
    }

    //let position = inp;
    let goal = {
        x: size-1,
        y: size-1
    }

    let isFinished = false

    for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++) {
            if(row > 0 && column > 0 && row < size && column < size){
                if(maze[row][column] === '-' || maze[row][column] === '|'){
                    maze[row][column] = getRandomInt(4)
                }
            }
        }
    }

    /*while (player.x !== goal.x && player.y !== goal.y) {
        let next = getRandomInt(4)
        if(player.x <= 1 && next !== 1){
            Move(next)
            maze[player.y][player.x] = 9
        } else if(player.x <= size-1 && next !== 2){
            Move(next)
            maze[player.y][player.x] = 9
        }  else if(player.y <= 1 && next !== 3){
            Move(next)
            maze[player.y][player.x] = 9
        }  else if(player.y <= size-1 && next !== 4){
            Move(next)
            maze[player.y][player.x] = 9
        }
        console.log('a')
    }*/
 return maze
}
console.log(drawPath(9))