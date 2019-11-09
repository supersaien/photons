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
var pix;
self.onmessage = function(event) 
    {
    pix=event.data.pix;
    }
var position_y=180;
var width_car=2;
var counter_cars=0;
var position_x;
var rand_color;
function rivals()
{
position_y+=1;
if (position_y<320)
    {
    position_x=pix;
    postMessage({color_car: rand_color, width_car: width_car, position_y: position_y, position_x: position_x, visible_rival:"visible", counter_cars: counter_cars});
    width_car=width_car+((80-2)/(320-180)*1);
    self.setTimeout(rivals,200);
    }
else
    {
    postMessage({visible_rival:"hidden"});
    position_y=180;
    width_car=2;    
    counter_cars++;
    rand_color=Math.floor(Math.random()*(9-1))+1;
    clearInterval(interval);
    self.setTimeout(rivals,4000-(counter_cars*20))
    }
}
interval=self.setInterval(rivals,1500);

