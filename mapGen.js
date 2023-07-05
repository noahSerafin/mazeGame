const player = {
    x : 1,
    y : 1
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const drawPath = (inp, out, size) => {

    let row = []
    let arr = []
    for (let i = 0; i < size; i++) {
        row[i] = 0
        arr[i] = row;
    }
    console.log(arr);

    let position = inp;
    let goal = out;

    let isFinished = false
    while (player.x !== size-1 && player.y !== size-1) {
        let next =getRandomInt(4)
        if(player.x <= 1 && next !== 1){
            Move(next)
            arr[player.y[player.x]] = 'p'
        } else if(player.x <= size-1 && next !== 2){
            Move(next)
            arr[player.y[player.x]] = 'p'
        }  else if(player.y <= 1 && next !== 3){
            Move(next)
            arr[player.y[player.x]] = 'p'
        }  else if(player.y <= size-1 && next !== 4){
            Move(next)
            arr[player.y[player.x]] = 'p'
        }

    }
}

function Move(input){
    if(input == "left" && player.x > 1 && maze[player.y -1][player.x-2] <= 3)//left
    {           
        player.x -= 1
        stepCount += 1;    
    }
    if(input == "right"  && player.x < maze[0].length  && maze[player.y -1][player.x] <= 3)//right
    {
        player.x += 1
        stepCount += 1;
    }
    if(input == "up" && player.y > 1  && maze[player.y -2][player.x-1] <= 3)//up
    {
        player.y -= 1
        stepCount += 1;
    }
    if(input == "down" && player.y < maze.length && maze[player.y][player.x-1] <= 3)//down
    {
        player.y += 1
        stepCount += 1;
    }
}

//drawPath(1,1,8);

