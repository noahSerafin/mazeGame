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
    const trueSize = (2*size) +1
    for (let row = 0; row < trueSize; row++) {
        for (let column = 0; column < trueSize; column++) {
            if(row > 0 && column > 0 && row < trueSize -1 && column < trueSize -1){
                if(maze[row][column] === '-' || maze[row][column] === '|'){
                    let r = getRandomInt(8)
                    console.log(r)
                    maze[row][column] = r
                }
            }
        }
    }


 return maze
}
////endmapgen
//onsole.log(drawPath(9))

//global variables
const gameBoard = document.getElementById("game-board");
var stepCount = 0;

const stepCounter = document.getElementById("counter");
const startButton = document.getElementById("start");
const loadLevel2 = document.getElementById("load2");
const loadLevel3 = document.getElementById("load3");
//const loadLevel4 = document.getElementById("load4");
const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");

const refresh = document.getElementById("refresh");
const save = document.getElementById("save");


/*var maze =
var strMaze = [
    ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', '0', '0', '0', '|', '0', '|', '0', '|', '0', '|', '0', '|'],
    ['+', '0', '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', '0', '0', '0', '|', '0', '|', '0', '|', '0', '|', '0', '|'],
    ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', '0', '0', '0', '|', '0', '|', '0', '|', '0', '|', '0', '|'], 
    ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', '0', '0', '0', '|', '0', '|', '0', '|', '0', '|', '0', '|'],  
    ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', '0', '0', '0', '|', '0', '|', '0', '|', '0', '|', '0', '|'], 
    ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', '0', '0', '0', '|', '0', '|', '0', '|', '0', '|', '0', '|'],
    ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+']
]
/*var maze = [
    ['+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', 0, '|', 0, '|', 0, '|', 0, '|'],
    ['+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', 0, '|', 0, '|', 0, '|', 0, '|'],
    ['+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', 0, '|', 0, '|', 0, '|', 0, '|'],
    ['+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', 0, '|', 0, '|', 0, '|', 0, '|'],
    ['+', '-', '+', '-', '+', '-', '+', '-', '+']
]*/
var maze = [
    ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', 0, 0, 0, 0, 0, 0, 0, 0, 0, '|', 0, '|'],
    ['+', 0, '+', 6, '+', 2, '+', '-', '+', 0, '+', '-', '+'],
    ['|', 0, '|', 0, '|', 0, '|', 0, '|', 0, 0, 0, '|'],
    ['+', 1, '+', '-', '+', 0, '+', 0, '+', '-', '+', 0, '+'],
    ['|', 0, 0, 0, '0', 0, '0', 0, '|', 0, 0, 0, '|'],
    ['+', 0, '+', 0, '+', 0, '+', '-', '+', 0, '+', '-', '+'],
    ['|', 0, '|', 0, '|', 0, 6, 0, 0, 0, 0, 0, '|'],
    ['+', 0, '+', 0, '+', 0, '+', 0, '+', '-', '+', 0, '+'],
    ['|', 0, 7, 0, 0, 0, '|', 0, 0, 0, 3, 0, '|'],
    ['+', 5, '+', '-', '+', 0, '+', 0, '+', '-', '+', '-', '+'],
    ['|', 0, '|', 0, '|', 0, 0, 0, 0, 0, 0, 0, '|'],
    ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+']
]
/*maze = [
    ['+', '-', '+', '-', '+'],
    ['|', 0, 0, 0, '|'],
    ['+', 0, '+', 0, '+'],
    ['|', 0, 0, 0, '|'],
    ['+', '-', '+', '-', '+']
]*/
/*const mazeFromStr = () => {
    var newMaze = strMaze;
    for (let row = 0; row< strMaze.length; row++) {
        for (let column = 0; column < strMaze[row].length; column++){
            var tile = strMaze[row][column];
            if(Number(tile) !== NaN){
               newMaze[row][column] = Number(tile)
               console.log(tile)
               console.log(Number(tile))
            }
        }    
    }
   return(newMaze)
}
var maze = mazeFromStr();*/


console.log(drawPath(6));
maze = drawPath(9);


//on load
draw(gameBoard, player);
//console.log(player.x, player.y)
//console.log(maze);

var input;

//detect inputs
document.onkeydown = function (e) {
    
    e = e || window.event;
    
    console.log(e.code)
    switch(e.code) {
            
        case "KeyA": //a key, left key 37
            //controller.left = true;                
            input = "left"           
        break;
        case "KeyD": //d key right key 39
            //controller.right = true;                    
            input = "right"   
        break;
        case "KeyW": //space bar
        //controller.up = true;                  
            input = "up"   
        break;
        //leftShift key 16
        case "KeyS":
            input = "down"
           // controller.down = true;             
    }
    Move(input)
       
}
//button inputs
up.addEventListener("click", () => {Move("up")})
down.addEventListener("click", () => {Move("down")})
left.addEventListener("click", () => {Move("left")})
right.addEventListener("click", () => {Move("right")})


//move player if valid
const Move = (input) => {
   
    maze[player.y][player.x] = 0
    if(input == "left" && maze[player.y][player.x-1] <= 3 && maze[player.y][player.x-2] == 0)
    {           
        if(maze[player.y][player.x-1] == 1){
            invertDoors("red"); 
        } else if(maze[player.y][player.x-1] == 2){
            invertDoors("blue");  
        } else if(maze[player.y][player.x-1] == 3){
            invertDoors("green");
        }   
        player.x -= 2
        stepCount += 1;    
    }
    if(input == "right"  && maze[player.y][player.x+1] <= 3  && maze[player.y][player.x+2] == 0)
    {
        if(maze[player.y][player.x+1] == 1){                   
            invertDoors("red");
        } else if(maze[player.y][player.x+1] == 2){
            invertDoors("blue");
        } else if(maze[player.y][player.x+1] == 3){
            invertDoors("green");
        }
        player.x += 2
        stepCount += 1;
    }
    if(input == "up" && maze[player.y-1][player.x] <= 3  && maze[player.y-2][player.x] == 0)
    {
        if(maze[player.y -1][player.x] == 1){
            invertDoors("red");
        } else if(maze[player.y -1][player.x] == 2){
            invertDoors("blue");
        } else if(maze[player.y -1][player.x] == 3){
            invertDoors("green");
        }
        player.y -= 2
        stepCount += 1;
    }
    if(input == "down" && maze[player.y+1][player.x] <= 3  && maze[player.y+2][player.x] == 0)
    {
        if(maze[player.y +1][player.x] == 1){
            invertDoors("red");
        } else if(maze[player.y +1][player.x] == 2){
            invertDoors("blue");
        } else if(maze[player.y +1][player.x] == 3){
            invertDoors("green");
        }
        player.y += 2
        stepCount += 1;
    }
    maze[player.y][player.x] = 'P'
    draw(gameBoard, player)
    //console.log(`${player.x} ${player.y}`)
    if(player.x == maze[0].length && player.y == maze.length-1){
        alert(`Level Complete! You took ${stepCount} steps`)
        console.log("You Win!")
    }
    //console.log(maze)
    //debug()
}

function invertDoors(color){
    console.log("inverting", color, "doors")
  
    if (color == "red"){
        console.log("red switch")
        maze = maze.map(row => {
            return row.map(tile => {            
                return switchRedDoors(tile)
            })
        })   
    } else if (color == "blue") {
        console.log("blue switch")
        maze = maze.map(row => {
            return row.map(tile => {            
                return switchBlueDoors(tile)
            })
        })
    } else if (color == "green") {
        console.log("green switch")
        maze = maze.map(row => {
            return row.map(tile => {            
                return switchGreenDoors(tile)
            })
        })
    }     
}


function switchRedDoors(tile){    
        if(tile === 1){
            return 5            
        } else if (tile === 5){
            return 1
        } else {
            return tile
        }   
}
function switchBlueDoors(tile){    
    if(tile === 2){
        return 6            
    } else if (tile === 6){
        return 2
    } else {
        return tile
    }   
}
function switchGreenDoors(tile){    
    if(tile === 3){
        return 7           
    } else if (tile === 7){
        return 3
    } else {
        return tile
    }   
}

startButton.addEventListener('click', ()=> {reDraw(level1, player)});
loadLevel2.addEventListener('click', () => {reDraw(level2, player)});
loadLevel3.addEventListener('click',()=> {reDraw(level3, player)});
//loadLevel4.addEventListener('click',()=> {setLevel(4)});

function returnPiece(tile){
    switch(tile){    
        case 0:
            return 'path'            
        case 1:                        
            return 'redDoorOpen'
        case 2:
            return 'blueDoorOpen'
        case 3:
           return 'greenDoorOpen'
        case 4:
            return 'wall'
        case '-':
            return 'wall'
        case '|':
            return 'wall'
        case '+':
            return 'corner' 
        case 5:
           return 'redDoorClosed'
        case 6:
            return 'blueDoorClosed'
        case 7:
            return 'greenDoorClosed'
        case '0':
            return 'path'
        case 'P':
            return 'player'
        case 'E':
            return 'finish'
        case tile > 7:
            return 'wall'
    }  
}
//draw the maze
function draw(gameBoard, player){
    
    gameBoard.innerHTML = '';
   //gameBoard.style.gridTemplateRows = "repeat(maze[0].length, 1fr);"
    //gameBoard.style.gridTemplateColumns = "repeat(maze.length, 1fr);"

    //update the player
    //const playerSquare = document.createElement('div')
    maze[player.y][player.x] = 'P'

    //draw goal
    maze[maze[0].length-2][maze.length-1] = 'E'
    //playerSquare.classList.add('player')
   
   

    stepCounter.innerHTML = stepCount;
    
    for (let row = 0; row< maze.length; row++) {
        for (let column = 0; column < maze[row].length; column++){
            var tile = maze[row][column];  
            const newTile = document.createElement('div');
            if(!isNaN(tile) && tile !== 4 && tile !== 0){
                newTile.classList.add('door')
            }
            if(tile === '-' ||  tile == '|'){
                tile = 4;
            }          
            newTile.style.gridRowStart = row +1
            newTile.style.gridColumnStart = column +1
            newTile.classList.add(returnPiece(tile));
            newTile.classList.add('tile');
            if(row == 0 || row  % 2 == 0){
                newTile.classList.add('horizontal')
            } else if(column == 0 || column  % 2 == 0 ){
                newTile.classList.add('vertical')
            } else{
                newTile.classList.add('full')
            }
            //console.log(tile, newTile.classList)
            gameBoard.appendChild(newTile)
        }
    }
    //gameBoard.style.width = `${(20*(maze[0].length/4))+(80*(maze[0].length/4))-15}px`
    
    //gameBoard.style.height =  `${(40* ((maze[0].length-1)/2)) + (10* (((maze[0].length-1)/2)+1) )}px`
    //gameBoard.style.width = `${(40* ((maze[0].length-1)/2)) + (10* (((maze[0].length-1)/2)+1) )}px`
    console.log((maze[0].length));
    const wides = (maze[0].length-1)/2;
    const shorts = ((maze[0].length-1)/2+1);
    const segmentWidth = 100 / ((wides * 4) + shorts)
    console.log(segmentWidth);//.toFixed(2));

    const fullTiles = document.querySelectorAll('.full');
    const corners = document.querySelectorAll('.corner');
    const verts = document.querySelectorAll('.vertical');
    const horizs = document.querySelectorAll('.horizontal');
    fullTiles.forEach(tile => {
        tile.style.width = `${(segmentWidth*4)}%`
    });
    verts.forEach(tile => {
        tile.style.width = `${(segmentWidth)}%`
        tile.style.height = `${(segmentWidth*4)}%`
    });
    horizs.forEach(tile => {
        tile.style.width = `${(segmentWidth*4)}%`
        tile.style.height = `${(segmentWidth)}%`
    });
    corners.forEach(tile => {
        tile.style.width = `${(segmentWidth)}%`
        tile.style.height = `${(segmentWidth)}%`
    });
    //draw goal
   /*const end = document.createElement('div')
    end.style.gridRowStart = 
    end.style.gridColumnStart = maze[0].length
    end.classList.add('finish')
    end.classList.add('vertical')
    gameBoard.appendChild(end)*/
}

//change this so it can load new levels
function reDraw(level, player){
    console.log("loading level ", level)
    stepCount = 0;
    player.x = 1;   
    player.y = 1;
    maze = level;
    draw(gameBoard, player)    
}

//console.log(`${finish.x} ${finish.y}`)

const debug = () => { //affecting the real maze?!!
    var consoleMaze = maze;
    for (let row = 0; row< maze.length; row++) {
        for (let column = 0; column < maze[row].length; column++){
            var tile = maze[row][column];
            consoleMaze[row][column] = tile.toString();
        }    
    }
    console.log('numMaze:', consoleMaze)
    console.log('debug:', consoleMaze)
}


var vAndHs = 