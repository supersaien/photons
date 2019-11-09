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
var curvearray = new Array(230);
for (var k=0; k<230; k++) 
	{
	curvearray[k]=new Array(20);
	}
var objectsarray = new Array(230);
//stage1
for (var k=0; k<230; k++) 
	{
	objectsarray[k]=new Array(20);
	}
for (var j=0;j<4;j++)
    {
    for (var i=0;i<230;i++)
        {
        objectsarray[i][j]=0;
        }
    objectsarray[72][j]=2;
    objectsarray[162][j]=1;
    }
for (var j=0;j<4;j++)
    {
    for (var i=0;i<80;i++)
        {
        curvearray[i][j]=0;
        }
    for (var i=80;i<110;i++)
        {
        curvearray[i][j]=3;
        }
    for (var i=110;i<140;i++)
        {
        curvearray[i][j]=-3;
        }
    for (var i=140;i<170;i++)
        {
        curvearray[i][j]=0;
        }
    for (var i=170;i<200;i++)
        {
        curvearray[i][j]=-3;
        }
    for (var i=200;i<230;i++)
        {
        curvearray[i][j]=3;
        }
    }
//stage2
for (var j=4;j<8;j++)
    {
    for (var i=0;i<30;i++)
        {
        curvearray[i][j]=0;
        }
    for (var i=30;i<45;i++)
        {
        curvearray[i][j]=-5;
        }
    for (var i=45;i<75;i++)
        {
        curvearray[i][j]=+5;
        }
    for (var i=75;i<90;i++)
        {
        curvearray[i][j]=-5;
        }
    for (var i=90;i<100;i++)
        {
        curvearray[i][j]=0;
        }
    for (var i=100;i<120;i++)
        {
        curvearray[i][j]=-4;
        }
    for (var i=120;i<160;i++)
        {
        curvearray[i][j]=+4;
        }
    for (var i=160;i<180;i++)
        {
        curvearray[i][j]=0;
        }
    for (var i=180;i<200;i++)
        {
        curvearray[i][j]=-4;
        }
    for (var i=200;i<230;i++)
        {
        curvearray[i][j]=0;
        }
    }
//stage3
for (var j=8;j<12;j++)
    {
    for (var i=0;i<30;i++)
        {
        curvearray[i][j]=0;
        }
    for (var i=30;i<120;i++)
        {
        curvearray[i][j]=-1;
        }
    for (var i=120;i<210;i++)
        {
        curvearray[i][j]=+1;
        }
    for (var i=210;i<230;i++)
        {
        curvearray[i][j]=0;
        }
    }
//stage4
for (var j=12;j<16;j++)
    {
    for (var i=0;i<15;i++)
        {
        curvearray[i][j]=-5;
        }
    for (var i=15;i<45;i++)
        {
        curvearray[i][j]=+5;
        }
    for (var i=45;i<60;i++)
        {
        curvearray[i][j]=0;
        }
    for (var i=60;i<75;i++)
        {
        curvearray[i][j]=-5;
        }
    for (var i=75;i<150;i++)
        {
        curvearray[i][j]=+1;
        }
    for (var i=150;i<175;i++)
        {
        curvearray[i][j]=-3;
        }
    for (var i=175;i<190;i++)
        {
        curvearray[i][j]=0;
        }
    for (var i=190;i<210;i++)
        {
        curvearray[i][j]=-4;
        }
    for (var i=210;i<230;i++)
        {
        curvearray[i][j]=+4;
        }
    }
//stage5
for (var j=16;j<20;j++)
    {
    for (var i=0;i<10;i++)
        {
        curvearray[i][j]=-7;
        }
    for (var i=10;i<20;i++)
        {
        curvearray[i][j]=+7;
        }
    for (var i=20;i<35;i++)
        {
        curvearray[i][j]=+5;
        }
    for (var i=35;i<50;i++)
        {
        curvearray[i][j]=-5;
        }
    for (var i=50;i<75;i++)
        {
        curvearray[i][j]=-3;
        }
    for (var i=75;i<100;i++)
        {
        curvearray[i][j]=+3;
        }
    for (var i=100;i<150;i++)
        {
        curvearray[i][j]=+2;
        }
    for (var i=150;i<200;i++)
        {
        curvearray[i][j]=-2;
        }
    for (var i=200;i<210;i++)
        {
        curvearray[i][j]=+7;
        }
    for (var i=210;i<215;i++)
        {
        curvearray[i][j]=0;
        }
    for (var i=215;i<225;i++)
        {
        curvearray[i][j]=-7;
        }
    for (var i=225;i<230;i++)
        {
        curvearray[i][j]=0;;
        }
    }
var counter0=0;
var counter1=0;
function to_repeat()
    {
    postMessage({curve: curvearray[counter0][counter1], object: objectsarray[counter0][counter1]});
    counter0++;
    if (counter0 % 230 != 0)
        {
        self.setTimeout(to_repeat,200);
        }
    else
        {
        counter0=0;
        counter1++;
        self.setTimeout(to_repeat,200);
        }
    }
to_repeat();
