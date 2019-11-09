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
var keyboard_pressed=false;
var power_backup;
var power_backup_copied=false;
var stage_up=false;
var stage=1;
var stage_backup;
var stage_backup_copied=false;
var bonus_done=false;
var interval;
var power=100;
var road=0;
var road_backup;
var road_backup_copied=false;
var rivals=new Array();
for (var i=1;i<10;i++)
    {   
    rivals[i]=new Image();
    }
var car=new Image();
var signal_l=new Image();
var signal_r=new Image();
function preloader() 
    {
    if (document.images) 
        {
        for (var i=1;i<10;i++)
            {
            rivals[i].setAttribute("src", "car" + i + ".png");
            }
        car.setAttribute("src", "car.png");
        signal_l.setAttribute("src", "signal_l.png");
        signal_r.setAttribute("src", "signal_r.png");
	    }
    }
function addLoadEvent(func) 
    {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') 
        {
		window.onload = func;
	    } 
    else 
        {
    	window.onload = function() 
            {
			if (oldonload) 
                {
				oldonload();
			    }
			func();
		    }
    	}
    }
var object=0;
var position_y_object=180;
var position_x_object=185;
var width_object=2;
var color_car=9;
var width_car;
var position_x;
var position_y;
var counter_rivals=0;
var counter_rivals_backup;
var counter_rivals_backup_copied=false;
var rivals_hidden=true;
var intvalue=0;  
var velocity=120;
var velocity_lr=0;
var position_car=140;
var position_car_a=140;
var position_car_b=140;
// CANVAS
var pix=180;
var canvas = document.getElementById('canvas');
if (canvas.getContext) 
    {
    var ctx = canvas.getContext('2d');
    }
function draw() 
    {
    //bonus
    if (counter_rivals % 20!=0){bonus_done=false;}
    if (bonus_done==false && counter_rivals>0 && counter_rivals%20==0){power=power+5;bonus_done=true;}
    //victory
    if (road==4600)
        {
        if (road_backup_copied==false)
            {
            road_backup=road;
            road_backup_copied=true;
            }
        if (power_backup_copied==false)
            {
            power_backup=power;
            power_backup_copied=true;
            }
        if (counter_rivals_backup_copied==false)
            {
            counter_rivals_backup=counter_rivals;
            counter_rivals_backup_copied=true;
            }
        if (stage_backup_copied==false)
            {
            stage_backup=stage;
            stage_backup_copied=true;
            }
        //clean canvas screen
        canvas.width=canvas.width; 
        //text    
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.font = "20px arial";
        ctx.fillText("Distance: " + road_backup + " units" , 10, 25);
        ctx.fillText("Photon armor: " + power_backup + "%", 10, 50);
        ctx.fillText("Rivals: " + counter_rivals_backup , 10, 75);
        ctx.fillText("Stage: " + stage_backup , 10, 100);
        ctx.font = "45px arial";
        ctx.fillText("Congratulations!", 10, 200);
        ctx.font = "28px arial";
        ctx.fillText("You are a Photons master.", 10, 250);
        //stop workers
        if (roadworker!==undefined)
        roadworker.terminate();
        if (colisionsworker!==undefined)
        colisionsworker.terminate();
        if (rivalsworker!==undefined)
        rivalsworker.terminate();
        roadworker=undefined;
        colisionsworker=undefined;
        rivalsworker=undefined;
        return;
        } 
    //game over
    if(power<=0)
        {
        if (road_backup_copied==false)
            {
            road_backup=road;
            road_backup_copied=true;
            }
        if (counter_rivals_backup_copied==false)
            {
            counter_rivals_backup=counter_rivals;
            counter_rivals_backup_copied=true;
            }
        if (stage_backup_copied==false)
            {
            stage_backup=stage;
            stage_backup_copied=true;
            }
        //clean canvas screen
        canvas.width=canvas.width; 
        //text    
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.font = "20px arial";
        ctx.fillText("Distance: " + road_backup + " units" , 10, 25);       
        ctx.fillText("Rivals: " + counter_rivals_backup , 10, 75);
        ctx.fillText("Stage: " + stage_backup , 10, 100);
        ctx.font = "64px arial";
        ctx.fillText("Game Over", 10, 200);
        //stop workers
        if (roadworker!==undefined)
        roadworker.terminate();
        if (colisionsworker!==undefined)
        colisionsworker.terminate();
        if (rivalsworker!==undefined)
        rivalsworker.terminate();
        roadworker=undefined;
        colisionsworker=undefined;
        rivalsworker=undefined;
        return;
        }
    //clean canvas screen
    canvas.width=canvas.width;
    //sky
    ctx.beginPath();
    if(stage==1)
    ctx.fillStyle = 'aqua';
    if(stage==2)
    ctx.fillStyle = 'lightblue'; 
    if(stage==3)
    ctx.fillStyle = 'orange';
    if(stage==4)
    ctx.fillStyle = 'violet';
    if(stage==5)
    ctx.fillStyle = 'aquamarine';
    ctx.fillRect(0,0,360,180);
    //text
    ctx.fillStyle = 'black';
    ctx.font = "20px arial";
    ctx.fillText("Distance: " + road + " units" , 10, 25);
    ctx.fillText("Photon armor: " + power + "%" , 10, 50);
    ctx.fillText("Rivals: " + counter_rivals , 10, 75);
    ctx.fillText("Stage: " + stage , 10, 100);
    ctx.font = "100px arial";
    if (road>=0 && road<9){ctx.fillText("5" , 150, 170);}
    if (road>=9 && road<18){ctx.fillText("4" , 150, 170);}
    if (road>=18 && road<27){ctx.fillText("3" , 150, 170);}
    if (road>=27 && road<36){ctx.fillText("2" , 150, 170);}
    if (road>=36 && road<45){ctx.fillText("1" , 150, 170);}
    if (road>=45 && road<50){ctx.fillText("Go!" , 105, 170);}
    //bonus
    if((counter_rivals%20==0) && counter_rivals>1)
        {
        ctx.font = "30px arial";
        ctx.fillText("Bonus!" , 135, 135);
        ctx.fillText("Power +5%" , 105, 170);
        }
    //road
    ctx.beginPath();
    ctx.lineWidth = 0.1;
    if(stage==1)
    ctx.fillStyle = 'chocolate';
    if(stage==2)
    ctx.fillStyle = 'lightgreen';
    if(stage==3)
    ctx.fillStyle = 'darkgreen';
    if(stage==4)
    ctx.fillStyle = 'white';
    if(stage==5)
    ctx.fillStyle = 'crimson';
    ctx.moveTo(20, 361);
    ctx.quadraticCurveTo(100, 270, (pix), 180);
    ctx.lineTo(-1, 180);
    ctx.lineTo(-1, 361);
    ctx.lineTo(20, 361);    
    ctx.moveTo(340, 361);
    ctx.quadraticCurveTo(261, 270, (pix+1), 180);
    ctx.lineTo(361, 180);
    ctx.lineTo(361, 361);
    ctx.lineTo(340, 361);
    ctx.fill();
    //line
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.lineWidth = 0.1;    
    ctx.moveTo(177, 361);
    ctx.quadraticCurveTo(177, 270, (pix), 180);
    ctx.lineTo(pix+1, 180);
    ctx.quadraticCurveTo(183, 270, 183, 361);
    ctx.lineTo(177, 361);
    ctx.fill();

    ctx.stroke();

if (intvalue<5)
    {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0.1)';
    ctx.fillRect(1,180,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0)';
    ctx.fillRect(1,200,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0.1)';
    ctx.fillRect(1,220,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0)';
    ctx.fillRect(1,240,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0.1)';
    ctx.fillRect(1,260,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0)';
    ctx.fillRect(1,280,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0.1)';
    ctx.fillRect(1,300,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0)';
    ctx.fillRect(1,320,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0.1)';
    ctx.fillRect(1,340,360,20);
    }
if (intvalue>=5)
    {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0)';
    ctx.fillRect(1,180,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0.1)';
    ctx.fillRect(1,200,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0)';
    ctx.fillRect(1,220,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0.1)';
    ctx.fillRect(1,240,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0)';
    ctx.fillRect(1,260,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0.1)';
    ctx.fillRect(1,280,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0)';
    ctx.fillRect(1,300,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0.1)';
    ctx.fillRect(1,320,360,20);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(25,25,25,0)';
    ctx.fillRect(1,340,360,20);
    }
    //objects
    if (object==1 && road>45)
        {
        ctx.drawImage(signal_l, position_x_object-5, position_y_object, width_object*2, width_object*2);
        }
    if (object==2 && road>45)
        {
        ctx.drawImage(signal_r, position_x_object, position_y_object, width_object*2, width_object*2);
        }
    if (object!=0)
        {
        position_x_object=position_x_object+3;
        position_y_object=position_y_object+2;
        width_object=width_object+((80-2)/(320-180)*1);
        }
    //rivals
    if (rivals_hidden==false && road>45)
    ctx.drawImage(rivals[color_car], position_x, position_y, width_car, width_car / 2);
    //car 
    position_car=(position_car_a + position_car_b) / 2;
    position_car_a=position_car;
    position_car_b=position_car;
    if (road>45)
    ctx.drawImage(car, position_car , 320);
    //alternate velocity sensation rectangles
    if (intvalue<10) {intvalue++;}
    else {intvalue=0;}
    //object
    if (position_y_object>360) {object=0;position_x_object=200;position_y_object=180;width_object=2;}
    //send potitions to conisionsworker
    colisionsworker.postMessage({position_car: position_car, position_x: position_x, position_y: position_y});
    //stages++
    if (road%920==0 && road>0 && stage_up==false){stage=stage+1;stage_up=true;}
    if (road%921==0 && road>0){stage_up=false;}
    }
function restart()
    {
    //stop workers
    if (roadworker!==undefined)
    roadworker.terminate();
    if (colisionsworker!==undefined)
    colisionsworker.terminate();
    if (rivalsworker!==undefined)
    rivalsworker.terminate();
    roadworker=undefined;
    colisionsworker=undefined;
    rivalsworker=undefined;
    //reset variables
    keyboard_pressed=false;
    power_backup_copied=false;
    stage=1;
    stage_up=false;
    bonus_done=false;
    road_backup_copied=false;
    pix=180;
    power=100;
    road=0;
    object=0;
    position_y_object=180;
    position_x_object=185;
    width_object=2;
    color_car=9;
    rivals_hidden=true;
    counter_rivals=0;
    counter_rivals_backup_copied=false;
    intvalue=0;  
    velocity=80;
    velocity_lr=0;
    position_car=140;
    position_car_a=140;
    position_car_b=140;
    //start workers
    init_roadworker();
    init_rivalsworker();
    init_colisionsworker();
    }
// CANVAS
var pix=180;
var canvas = document.getElementById('canvas');
// MOVE
function move()
    {
    if(keyboard_pressed==true)
        {
        if (velocity_lr==-1 && position_car_a>5)
            {
            position_car_a=position_car_a-5;
            }
        if (velocity_lr==1 && position_car_a<275)
            {    
            position_car_a=position_car_a+5;;
            }
        if ((velocity_lr==-1 || velocity_lr==1) )
            {
            window.setTimeout(move,20);
            }
        }
    if(keyboard_pressed==false)
        {
        if (velocity_lr==-1 && position_car_a>5)
            {
            position_car_a=position_car_a-1;
            }
        if (velocity_lr==1 && position_car_a<275)
            {    
            position_car_a=position_car_a+1;;
            }
        if ((velocity_lr==-1 || velocity_lr==1) )
            {
            window.setTimeout(move,2);
            }
        }
    }
// KEYBOARD
document.onkeydown = checkKeyDown;
function checkKeyDown(e) 
    {
    if (e.keyCode == '37' && pix>10) //left cursor
        {
        keyboard_pressed=true;
        velocity_lr=-1;
        move();     
        }
    if (e.keyCode == '39' && pix<341) //right cursor
        {
        keyboard_pressed=true;
        velocity_lr=1;
        move();
        }
    if (e.keyCode == '13') //enter
        {   
        restart();
        }
    }
document.onkeyup = checkKeyUp;
function checkKeyUp(e) 
    {
    if (e.keyCode == '37' && pix>10) //left cursor
        {
        keyboard_pressed=false;
        velocity_lr=0;
        }
    if (e.keyCode == '39' && pix<341) //right cursor
        {
        keyboard_pressed=false;
        velocity_lr=0;
        }
    }
// WEB WORKERS
var roadworker;
function init_roadworker() 
    {
    if (typeof(Worker) !== "undefined") 
        {
        if (typeof(roadworker) == "undefined") 
            {
            roadworker = new Worker("roadworker.js");
            }
        roadworker.onmessage = function(event_road) 
            {
            road++;
            pix = pix + event_road.data.curve;
            if (position_car_b>5 && position_car_b<(360-80-5))
                {
                if(pix < 180)
                    {
                    position_car_b=position_car_b+((180-pix)*((velocity)/360));
                    }
                if(pix > 180)
                    {
                    position_car_b=position_car_b+((181-pix)*((velocity)/360));
                    }
                }
            if (event_road.data.object!=0) {object=event_road.data.object}
            rivalsworker.postMessage({pix: pix});
            };
        }
    }
var colisionsworker;
function init_colisionsworker() 
    {
    if (typeof(Worker) !== "undefined") 
        {
        if (typeof(colisionsworker) == "undefined") 
            {
            colisionsworker = new Worker("colisionsworker.js");
            }
        colisionsworker.onmessage = function(event_colisions) 
            {
            if (event_colisions.data.gamestate=="dead" && road>50)
                {
                power--;
                }
            };
        }
    }
var rivalsworker;
function init_rivalsworker() 
    {
    if (typeof(Worker) !== "undefined") 
        {
        if (typeof(rivalsworker) == "undefined") 
            {
            rivalsworker = new Worker("rivalsworker.js");
            }
        rivalsworker.onmessage = function(event_rivals) 
            {
            if(event_rivals.data.visible_rival == "hidden")
                {
                rivals_hidden=true;
                }
            else
                {
                rivals_hidden=false;
                color_car=event_rivals.data.color_car;
                width_car=event_rivals.data.width_car;
                position_x=event_rivals.data.position_x;
                position_y=event_rivals.data.position_y;
                counter_rivals=event_rivals.data.counter_cars;
                }
            };
        }
    }
// PROGRESIVE WEB 
if ('serviceWorker' in navigator) 
    {
    navigator.serviceWorker.register('servicew.js')
    .then(function () 
        {
        console.log('service worker registered');
        })
    .catch(function () 
        {
        console.warn('service worker failed');
        });
    }
// PRELOAD IMAGES
addLoadEvent(preloader);
// INIT workers
init_roadworker();
init_rivalsworker();
init_colisionsworker();
// INTERVAL DRAW FRAMES
interval=window.setInterval(draw,17);
