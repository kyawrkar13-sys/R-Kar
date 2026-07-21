function roofLayout(){

let roofL = parseFloat(document.getElementById("roofLength").value);
let roofW = parseFloat(document.getElementById("roofWidth").value);

let panelL = parseFloat(document.getElementById("panelLength").value) / 1000;
let panelW = parseFloat(document.getElementById("panelWidth").value) / 1000;

let walkway = parseFloat(document.getElementById("walkway").value);
let setback = parseFloat(document.getElementById("setback").value);


// usable roof area
let usableL = roofL - (setback * 2);
let usableW = roofW - (setback * 2) - walkway;


// Portrait calculation
let pCols = Math.floor(usableL / panelW);
let pRows = Math.floor(usableW / panelL);

let portrait = pCols * pRows;


// Landscape calculation
let lCols = Math.floor(usableL / panelL);
let lRows = Math.floor(usableW / panelW);

let landscape = lCols * lRows;


// kWp (650W example)
let portraitKW = portrait * 650 / 1000;
let landscapeKW = landscape * 650 / 1000;


let recommend;

if(landscape > portrait){
recommend="Landscape";
}
else if(portrait > landscape){
recommend="Portrait";
}
else{
recommend="Same";
}


document.getElementById("roofResult").innerHTML=

`
Roof Area : ${(roofL*roofW).toFixed(2)} m²<br>
Usable Length : ${usableL.toFixed(2)} m<br>
Usable Width : ${usableW.toFixed(2)} m<br><br>

Portrait : ${portrait} Panels (${portraitKW.toFixed(2)} kWp)<br>

Landscape : ${landscape} Panels (${landscapeKW.toFixed(2)} kWp)<br><br>

⭐ Recommended : ${recommend}
`;

}
