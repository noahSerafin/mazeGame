function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getRandomOddInt(max) {
    num = 2; 
    while (num % 2 == 0) {
        num = Math.floor(Math.random() * max);
    }
    return num;
}
const playerY = getRandomOddInt(15);
const player = {
    x : 1,
    y : playerY
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

    //let position = inp;
    let goal = {
        x: size-1,
        y: size-1
    }

    const trueSize = (2*size) +1
    for (let row = 0; row < trueSize; row++) {
        for (let column = 0; column < trueSize; column++) {
            if(row > 0 && column > 0 && row < trueSize -1 && column < trueSize -1){
                if(maze[row][column] === '-' || maze[row][column] === '|'){
                    let r = getRandomInt(8)
                    if(r > 7 && r < 10){
                        r = 4
                    }
                    else if(r > 9){
                        r = 0
                    }
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

//var maze = mazeFromStr();

const thisMaze = drawPath(7);
maze = thisMaze
//on load
draw(gameBoard, player);
//console.log(player.x, player.y)
//console.log(maze);

var input;
////Controller
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

//View
const reRender = (pieces, maze) => {
   /* newmaze = []
    console.log(maze);
    console.log(pieces)
   
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }
    //compare maze to last move, only update new tiles/player
    for (let row = 0; row< maze.length; row++) {

        let i = 0
        for (let column = 0; column < maze[row].length; column++){
            if(maze[row][column] !== '+'){
            if (pieces[i].classList.contains(returnPiece(maze[row][column]))){
                //tile is the same
                console.log(pieces[i].classList);
                console.log(i)
            } else{
                //tile is different, update classlist
                console.log('update tile')
            }
            }
            i++
        }
    }*/
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

    draw(gameBoard, player) //draw on movement
    //reRender(gameBoard.childNodes, maze) //draw on movement

    //console.log(`${player.x} ${player.y}`)
    if(player.x == maze[0].length && player.y == maze.length-1){
        alert(`Level Complete! You took ${stepCount} steps`)
        console.log("You Win!")
    }
    //console.log(maze)
    //debug()
}

function invertDoors(color){
    console.log("inverting ", color, " doors")
  
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

//startButton.addEventListener('click', ()=> {reDraw(level1, player)});
//loadLevel2.addEventListener('click', () => {reDraw(level2, player)});
//loadLevel3.addEventListener('click',()=> {reDraw(level3, player)});
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
    maze[player.y][player.x] = 'P'

    //draw goal
    maze[maze[0].length-2][maze.length-1] = 'E'
    
    stepCounter.innerHTML = stepCount;
    let i = 0;
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
            newTile.id = `${row} ${column}`;
            gameBoard.appendChild(newTile)//doesn't work in editor!!
            i++
        }
    }
    
    //gameBoard.style.height =  `${(40* ((maze[0].length-1)/2)) + (10* (((maze[0].length-1)/2)+1) )}px`
    //gameBoard.style.width = `${(40* ((maze[0].length-1)/2)) + (10* (((maze[0].length-1)/2)+1) )}px`
    //console.log((maze[0].length));
    const wides = (maze[0].length-1)/2;
    const shorts = ((maze[0].length-1)/2+1);
    const segmentWidth = 100 / ((wides * 4) + shorts)
    //console.log(segmentWidth);//.toFixed(2));

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
    player.y = getRandomOddInt(15);
    console.log(player.y);
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
console.log(maze)

const refresh = document.getElementById("refresh");
const save = document.getElementById("save");

refresh.addEventListener("click", () => {
    reDraw(thisMaze, player)
})
save.addEventListener('click', () => {
    console.log(maze);
})

var pieces = gameBoard.childNodes;

const switchPiece = (maze, piece) => {
    let piecePosition = piece.id.split(" ");
    piecePosition[0] = Number(piecePosition[0])
    piecePosition[1] = Number(piecePosition[1])
    console.log(piecePosition)
   
    if(piece.classList.contains('path')){
        piece.classList.add('wall');
        piece.classList.remove('path');
        console.log(piece.classList);
        maze[piecePosition[0]][piecePosition[1]] = 4;
    } else if(piece.classList.contains('wall')){
        piece.classList.remove('wall');
        piece.classList.add('door');
        piece.classList.add('redDoorOpen');
        maze[piecePosition[0]][piecePosition[1]] = 1;
    } else if(piece.classList.contains('redDoorOpen')){
        piece.classList.remove('redDoorOpen');
        piece.classList.add('redDoorClosed');
        maze[piecePosition[0]][piecePosition[1]] = 5;
    } else if(piece.classList.contains('redDoorClosed')){
        piece.classList.remove('redDoorClosed');
        piece.classList.add('blueDoorOpen');
        maze[piecePosition[0]][piecePosition[1]] = 2;
    } else if(piece.classList.contains('blueDoorOpen')){
        piece.classList.remove('blueDoorOpen');
        piece.classList.add('blueDoorClosed');
        maze[piecePosition[0]][piecePosition[1]] = 6;
    } else if(piece.classList.contains('blueDoorClosed')){
        piece.classList.remove('blueDoorClosed');
        piece.classList.add('greenDoorOpen');
        maze[piecePosition[0]][piecePosition[1]] = 3;
    } else if(piece.classList.contains('greenDoorOpen')){
        piece.classList.remove('greenDoorOpen');
        piece.classList.add('greenDoorClosed');
        maze[piecePosition[0]][piecePosition[1]] = 7;
    } else if(piece.classList.contains('greenDoorClosed')){
        piece.classList.remove('greenDoorClosed');
        piece.classList.remove('door');
        piece.classList.add('path');
        maze[piecePosition[0]][piecePosition[1]] = 0;
    }
    //console.log(maze);
    draw(maze, player);
}

pieces.forEach(piece => {
    if(!piece.classList.contains('corner') && !piece.classList.contains('full')){
        piece.addEventListener('click', () => {
            switchPiece(maze, piece)
        })
        //piece.addEventListener('click', () => {reRender(maze, piece)})
    }
});

