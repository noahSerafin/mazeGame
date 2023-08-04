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
    ['|', 0, 0, 0, '|', 0, '|', 0, '|', 0, '|', 0, '|'],
    ['+', 0, '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', 0, '|', 0, '|', 0, '|', 0, '|', 0, '|', 0, '|'],
    ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', 0, '|', 0, '|', 0, '|', 0, '|', 0, '|', 0, '|'],
    ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', 0, '|', 0, '|', 0, '|', 0, '|', 0, '|', 0, '|'],
    ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', 0, '|', 0, '|', 0, '|', 0, '|', 0, '|', 0, '|'],
    ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+'],
    ['|', 0, '|', 0, '|', 0, '|', 0, '|', 0, '|', 0, '|'],
    ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+']
]

//player variables
var player = {      
    x: 1,
    y: 1
    //score: 0
};


//on load
draw(gameBoard, player);
console.log(player.x, player.y)
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
    debug()
    maze[player.y][player.x] = 0
    if(input == "left" && maze[player.y][player.x-1] <= 3 && maze[player.y][player.x-2] == 0)
    {           
        player.x -= 2
        stepCount += 1;
        if(maze[player.y -1][player.x-1] == 1){
            invertDoors("red");
            Move("left")
        } else if(maze[player.y -1][player.x-1] == 2){
            invertDoors("blue");
            Move("left")
        } else if(maze[player.y -1][player.x-1] == 3){
            invertDoors("green");
            Move("left")
        }       
    }
    if(input == "right"  && maze[player.y][player.x+1] <= 3  && maze[player.y][player.x+2] == 0)
    {
        player.x += 2
        stepCount += 1;
        if(maze[player.y -1][player.x-1] == 1){            
            Move("right")            
            invertDoors("red");
        } else if(maze[player.y -1][player.x-1] == 2){
            invertDoors("blue");
            Move("right")
        } else if(maze[player.y -1][player.x-1] == 3){
            invertDoors("green");
            Move("right")
        }
    }
    if(input == "up" && maze[player.y-1][player.x] <= 3  && maze[player.y-2][player.x] == 0)
    {
        player.y -= 2
        stepCount += 1;
        if(maze[player.y -1][player.x-1] == 1){
            invertDoors("red");
            Move("up")
        } else if(maze[player.y -1][player.x-1] == 2){
            invertDoors("blue");
            Move("up")
        } else if(maze[player.y -1][player.x-1] == 3){
            invertDoors("green");
            Move("up")
        }
    }
    if(input == "down" && maze[player.y+1][player.x] <= 3  && maze[player.y+2][player.x] == 0)
    {
        player.y += 2
        stepCount += 1;
        if(maze[player.y -1][player.x-1] == 1){
            invertDoors("red");
            Move("down")
        } else if(maze[player.y -1][player.x-1] == 2){
            invertDoors("blue");
            Move("down")
        } else if(maze[player.y -1][player.x-1] == 3){
            invertDoors("green");
            Move("down")
        }
    }
    maze[player.y][player.x] = 'P'
    draw(gameBoard, player)
    //console.log(`${player.x} ${player.y}`)
    if(player.x == maze[0].length && player.y == maze.length-1){
        alert(`Level Complete! You took ${stepCount} steps`)
        console.log("You Win!")
    }

}

function invertDoors(color){
    console.log("inverting doors")
  
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
            if(tile === '-' ||  tile == '|'){
                tile = 4;
            }          
            const newTile = document.createElement('div');
            newTile.style.gridRowStart = row +1
            newTile.style.gridColumnStart = column +1
            newTile.classList.add(returnPiece(tile));
            newTile.classList.add('tile');
            if(row == 0 || row  % 2 == 0){
                newTile.classList.add('horizontal')
            } else if(column == 0 || column  % 2 == 0 ){
                newTile.classList.add('vertical')
            }
            //console.log(tile, newTile.classList)
            gameBoard.appendChild(newTile)
        }
    }
    gameBoard.style.height = `${(20*(maze.length/4))+(80*(maze.length/4))-15}px`
    gameBoard.style.width = `${(20*(maze[0].length/4))+(80*(maze[0].length/4))-15}px`
    /*gameBoard.style.gridTemplateAreas = 
    "c ww c ww c ww c ww c ww"*/

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

const debug = () => {
    var consoleMaze = maze;
    for (let row = 0; row< maze.length; row++) {
        for (let column = 0; column < maze[row].length; column++){
            var tile = maze[row][column];
            consoleMaze[row][column] = tile.toString();
        }    
    }
    console.log(consoleMaze)
}