var canvasrestart = document.getElementById('buttonrestart');
if (canvasrestart.getContext) 
    {
    var ctxrestart = canvasrestart.getContext('2d');
    ctxrestart.beginPath();
    ctxrestart.fillStyle = 'black';
    ctxrestart.font = "22px arial";
    ctxrestart.fillText("Restart" , 134, 26);
    }
var canvasleft = document.getElementById('buttonleft');
if (canvasleft.getContext) 
    {
    var ctxleft = canvasleft.getContext('2d');
    ctxleft.beginPath();
    ctxleft.fillStyle = 'white';
    ctxleft.font = "25px arial";
    ctxleft.fillText("Left" , 58, 94);
    }
var canvasright = document.getElementById('buttonright');
if (canvasright.getContext) 
    {
    var ctxright = canvasright.getContext('2d');
    ctxright.beginPath();
    ctxright.fillStyle = 'white';
    ctxright.font = "25px arial";
    ctxright.fillText("Right" , 48, 94);
    }



