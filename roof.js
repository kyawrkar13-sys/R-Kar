function roofLayout(){

let roofL = parseFloat(document.getElementById("roofLength").value);
let roofW = parseFloat(document.getElementById("roofWidth").value);

let panelL = parseFloat(document.getElementById("panelLength").value) / 1000;
let panelW = parseFloat(document.getElementById("panelWidth").value) / 1000;

let walkway = parseFloat(document.getElementById("walkway").value);
let setback = parseFloat(document.getElementById("setback").value);


// Check input
if(
isNaN(roofL) ||
isNaN(roofW) ||
isNaN(panelL) ||
isNaN(panelW)
){
alert("Please fill roof and panel size");
return;
}


// Usable roof size

let usableL = roofL - (setback * 2);

let usableW = roofW - (setback * 2) - walkway;


// Portrait

let portraitCols = Math.floor(usableL / panelW);
let portraitRows = Math.floor(usableW / panelL);

let portraitQty = portraitCols * portraitRows;


// Landscape

let landscapeCols = Math.floor(usableL / panelL);
let landscapeRows = Math.floor(usableW / panelW);

let landscapeQty = landscapeCols * landscapeRows;


// Recommend

let recommend;

if(landscapeQty > portraitQty){

recommend = "Landscape";

}else if(portraitQty > landscapeQty){

recommend = "Portrait";

}else{

recommend = "Same";

}


// Result

document.getElementById("roofResult").innerHTML =

`
Roof Area : ${(roofL*roofW).toFixed(2)} m²<br>

Usable Area : ${(usableL*usableW).toFixed(2)} m²<br><br>

Portrait : ${portraitQty} Panels<br>

Landscape : ${landscapeQty} Panels<br><br>

⭐ Recommended : ${recommend}
`;



 // Canvas Drawing

let canvas = document.getElementById("roofCanvas");
let ctx = canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);


// Scale
let scale = Math.min(
(canvas.width-80)/roofL,
(canvas.height-80)/roofW
);


// Roof Outer Line

ctx.strokeRect(
20,
20,
roofL*scale,
roofW*scale
);


// Setback Area

ctx.strokeRect(
20 + setback*scale,
20 + setback*scale,
(roofL-setback*2)*scale,
(roofW-setback*2)*scale
);


// Walkway Line

let walkwayY = 20 + (roofW-setback*2-walkway)*scale;

ctx.beginPath();

ctx.moveTo(
20 + setback*scale,
walkwayY
);

ctx.lineTo(
20 + (roofL-setback)*scale,
walkwayY
);

ctx.stroke();


// Draw Landscape Panel inside usable area

for(let r=0;r<landscapeRows;r++){

for(let c=0;c<landscapeCols;c++){


let x =
20 + setback*scale + c*panelL*scale;


let y =
20 + setback*scale + r*panelW*scale;


ctx.strokeRect(

x,
y,

panelL*scale,
panelW*scale

);


}

}


// Labels

ctx.font="14px Arial";

ctx.fillText(
"Walkway",
30,
walkwayY-5
);

ctx.fillText(
"Setback",
25,
35
);
