//global variables
var doorsInverted = false;

const gameBoard = document.getElementById("game-board");

let lastRenderTime = 0;

const startButton = document.getElementById("start");



/*function gameLoop(currentTime){
    window.requestAnimationFrame(gameLoop)
    lastRenderTime = currentTime

    update()
    draw()
}*/

var maze = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 2],    
    [2, 2, 2, 2, 0, 2, 3, 2, 0, 0, 2, 2, 2, 2, 2],    
    [2, 0, 0, 2, 0, 2, 0, 2, 2, 2, 0, 0, 0, 0, 2], 
    [2, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 2, 2],
    [2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 1, 0, 2],
    [2, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 2, 0, 2],
    [2, 2, 3, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2], 
    [2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2],
    [2, 0, 2, 0, 0, 2, 2, 2, 2, 0, 0, 3, 0, 0, 2], 
    [2, 0, 2, 2, 0, 0, 3, 0, 0, 0, 2, 2, 2, 2, 2], 
    [2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2],  
    [2, 2, 3, 2, 0, 2, 2, 0, 0, 0, 3, 2, 2, 2, 2],
    [2, 0, 0, 2, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0],    
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
]

//player variables

var player = {      
    x: 1,
    y: 2
    //score: 0
};

var finish = {
    x: 15,
    y: 14
};

/*var controller = {
    left: false,
    right: false,
    up: false,
    down: false
};*/

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

//move player if valid
function Move(input){
    if(input == "left" && player.x > 1 && maze[player.y -1][player.x-2] <= 1)
    {           
        player.x -= 1
        //console.log(player.x)
        if(maze[player.y -1][player.x-1] == 1){
            invertDoors();
            Move("left")
        }        
    }
    if(input == "right"  && player.x < 15  && maze[player.y -1][player.x] <= 1)
    {
        player.x += 1
        //console.log(player.x)        
        if(maze[player.y -1][player.x-1] == 1){            
            Move("right")            
            invertDoors();
        }
    }
    if(input == "up" && player.y > 1  && maze[player.y -2][player.x-1] <= 1)
    {
        player.y -= 1
        //console.log(player.y)
        if(maze[player.y -1][player.x-1] == 1){
            invertDoors();
            Move("up")
        }
    }
    if(input == "down" && player.y < 15 && maze[player.y][player.x-1] <= 1)
    {
        player.y += 1
        //console.log(player.y)
        if(maze[player.y -1][player.x-1] == 1){
            invertDoors();
            Move("down")
        }
    }

    draw(gameBoard, player)
    //console.log(`${player.x} ${player.y}`)
    if(player.x == finish.x && player.y == finish.y){
        alert("Level Complete")
        console.log("You Win!")
    }

}

function invertDoors(){
    console.log("inverting doors")
  
    maze = maze.map(row => {
        return row.map(tile => {            
            return switchDoors(tile)
        })
    })   
      
}


function switchDoors(tile){    
        if(tile === 1){
            return 3            
        } else if (tile === 3){
            return 1
        } else {
            return tile
        }   
}

startButton.addEventListener('click', draw(gameBoard, player));

//draw the maze
function draw(gameBoard, player){
    
    gameBoard.innerHTML = ''

    //if(doorsInverted == false){
        for (let row = 0; row< maze.length; row++) {
            for (let column = 0; column < maze[row].length; column++){
                const tile = maze[row][column];                       
                //console.log(tile)
                switch(tile){                
                    case 1:
                        const doorOpen = document.createElement('div')
                        doorOpen.style.gridRowStart = row +1
                        doorOpen.style.gridColumnStart = column +1
                        doorOpen.classList.add('doorOpen')
                        gameBoard.appendChild(doorOpen)
                        break;
                    case 2:
                        const wall = document.createElement('div')
                        wall.style.gridRowStart = row +1
                        wall.style.gridColumnStart = column +1
                        wall.classList.add('wall')
                        gameBoard.appendChild(wall)
                        break;
                    case 3:
                        const doorClosed = document.createElement('div')
                        doorClosed.style.gridRowStart = row +1
                        doorClosed.style.gridColumnStart = column +1
                        doorClosed.classList.add('doorClosed')
                        gameBoard.appendChild(doorClosed)
                        break;
                    case 0:
                        //image = path.jpeg;
                }        
            }
        }
    /*} else if (doorsInverted == true){
        for (let row = 0; row< invertedMaze.length; row++) {
            for (let column = 0; column < invertedMaze[row].length; column++){
                const tile = invertedMaze[row][column];                       
                //console.log(tile)
                switch(tile){                
                    case 1:
                        const doorOpen = document.createElement('div')
                        doorOpen.style.gridRowStart = row +1
                        doorOpen.style.gridColumnStart = column +1
                        doorOpen.classList.add('doorOpen')
                        gameBoard.appendChild(doorOpen)
                        break;
                    case 2:
                        const wall = document.createElement('div')
                        wall.style.gridRowStart = row +1
                        wall.style.gridColumnStart = column +1
                        wall.classList.add('wall')
                        gameBoard.appendChild(wall)
                        break;
                    case 3:
                        const doorClosed = document.createElement('div')
                        doorClosed.style.gridRowStart = row +1
                        doorClosed.style.gridColumnStart = column +1
                        doorClosed.classList.add('doorClosed')
                        gameBoard.appendChild(doorClosed)
                        break;
                    case 0:
                        //image = path.jpeg;
                }
            }
        }
    } */

    //draw goal
    const end = document.createElement('div')
    end.style.gridRowStart = finish.y    
    end.style.gridColumnStart = finish.x
    end.classList.add('finish')
    gameBoard.appendChild(end)

    
    //draw the player
    const playerSquare = document.createElement('div')
    playerSquare.style.gridRowStart = player.y    
    playerSquare.style.gridColumnStart = player.x
    playerSquare.classList.add('player')
    gameBoard.appendChild(playerSquare)
}

function reDraw(gameBoard, player, playerSquare){
    playerSquare.style.gridRowStart = player.y    
    playerSquare.style.gridColumnStart = player.x
}

//console.log(`${finish.x} ${finish.y}`)

