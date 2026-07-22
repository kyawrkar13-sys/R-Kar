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


// ===== ROOF BORDER =====

ctx.beginPath();

ctx.rect(
20,
20,
roofL * scale,
roofW * scale
);

ctx.stroke();


// ===== SETBACK BORDER =====

ctx.beginPath();

ctx.rect(
20 + setback * scale,
20 + setback * scale,
(roofL - setback*2) * scale,
(roofW - setback*2) * scale
);

ctx.stroke();


// ===== TEXT =====

ctx.font="14px Arial";

ctx.fillText(
"Roof Edge",
25,
15
);


ctx.fillText(
"Setback",
30,
45
);
}
