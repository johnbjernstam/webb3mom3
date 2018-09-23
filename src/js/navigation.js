"use strict";
function myFunction()
{
var x = document.getElementById("myMainmenu");
if (x.className === "mainmenu")
    {
    x.className += " responsive";
    } 
else
    {
        x.className = "mainmenu";
    }
}