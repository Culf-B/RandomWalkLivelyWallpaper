let canvas = document.getElementById("c")
canvas.width = window.innerWidth //document.width is obsolete
canvas.height = window.innerHeight //document.height is obsolete

let ctx = canvas.getContext("2d");
let position = [window.innerWidth/2,window.innerHeight/2]

let mouse_xpos = 0;
let mouse_ypos = 0;

function update(){
    const directions = [
        [-1,0],
        [1,0],
        [0,1],
        [0,-1]
    ]
    let longestDir = 0
    let longestDist = 0
    for (i=0;i<directions.length;i++){
        currentDist = dist([position[0]+directions[i][0],position[1]+directions[i][1]],[mouse_xpos,mouse_ypos])
        console.log(currentDist)
        if (currentDist > longestDist){
            longestDist = currentDist
            longestDir = i
        }
    }

    let currentDirections = directions
    if (Math.floor(Math.random() * 100) == 0) {
        currentDirections.splice(longestDir, 1)
        directionIndex = Math.floor(Math.random() * 3)
    } else {
        directionIndex = Math.floor(Math.random() * 4)
    }
    position[0] += currentDirections[directionIndex][0]
    position[1] += currentDirections[directionIndex][1]
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillRect(position[0], position[1], 1, 1)

}

function dist(pos1, pos2){
    let a = pos1[0] - pos2[0]
    let b = pos1[1] - pos2[1]
    let distance = Math.sqrt(a*a + b*b);
    return distance;
}

function findObjectCoords(mouseEvent) {
    var obj = document.getElementById("c");
    var obj_left = 0;
    var obj_top = 0;
    while (obj.offsetParent)
    {
        obj_left += obj.offsetLeft;
        obj_top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    if (mouseEvent)
    {
        //FireFox
        mouse_xpos = mouseEvent.pageX;
        mouse_ypos = mouseEvent.pageY;
    }
    else
    {
        //IE
        mouse_xpos = window.event.x + document.body.scrollLeft - 2;
        mouse_ypos = window.event.y + document.body.scrollTop - 2;
    }
    mouse_xpos -= obj_left;
    mouse_ypos -= obj_top;
}
document.getElementById("c").onmousemove = findObjectCoords;
setInterval(update, 50)