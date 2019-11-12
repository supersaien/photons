        /*    
        @licstart  The following is the entire license notice for the 
        JavaScript code in this page.

        Copyright (C) 2019  Bonjour

        The JavaScript code in this page is free software: you can
        redistribute it and/or modify it under the terms of the GNU
        General Public License (GNU GPL) as published by the Free Software
        Foundation, either version 3 of the License, or (at your option)
        any later version.  The code is distributed WITHOUT ANY WARRANTY;
        without even the implied warranty of MERCHANTABILITY or FITNESS
        FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

        As additional permission under GNU GPL version 3 section 7, you
        may distribute non-source (e.g., minimized or compacted) forms of
        that code without the copy of the GNU GPL normally required by
        section 4, provided you include this license notice and a URL
        through which recipients can access the Corresponding Source.   


        @licend  The above is the entire license notice
        for the JavaScript code in this page.
        */
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



