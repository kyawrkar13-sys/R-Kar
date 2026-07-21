// =======================
// SOLAR CALCULATION
// =======================

function calcSolar(){

let area = parseFloat(document.getElementById("area").value);
let watt = parseFloat(document.getElementById("panel").value);


if(isNaN(area)){
    alert("Please enter Area");
    return;
}


let panelArea = 2.6;

let qty = Math.floor(area / panelArea);


document.getElementById("qty").value = qty;


let kw = (qty * watt) / 1000;


document.getElementById("solarResult").innerHTML =

"Panel : " + qty + " pcs<br>" +

"Power : " + kw.toFixed(2) + " kW";


}



// =======================
// BATTERY CALCULATION
// =======================

function calcBattery(){

let v = parseFloat(document.getElementById("batV").value);

let k = parseFloat(document.getElementById("batKwh").value);


if(isNaN(v) || isNaN(k)){

alert("Please enter Battery Voltage and kWh");

return;

}


let ah = (k * 1000) / v;


document.getElementById("batResult").innerHTML =

"Battery Voltage : " + v + " V<br>" +

"Capacity : " + ah.toFixed(1) + " Ah";


}



// =======================
// INVERTER SELECTION
// =======================

function calcInverter(){


let load = parseFloat(document.getElementById("load").value);


if(isNaN(load)){

alert("Please enter Load kW");

return;

}


let inverter = Math.ceil(load * 1.25);


document.getElementById("invResult").innerHTML =

"Recommended Inverter : " +

inverter +

" kW";


}



// =======================
// STRING MPPT CHECK
// =======================

function stringCheck(){


let voc =
parseFloat(document.getElementById("voc").value);


let series =
parseFloat(document.getElementById("series").value);


let mppt =
parseFloat(document.getElementById("mppt").value);



if(isNaN(voc)||isNaN(series)||isNaN(mppt)){

alert("Please fill String Data");

return;

}


let voltage = voc * series;


let status = "OK ✅";


if(voltage > mppt){

status = "OVER VOLTAGE ❌";

}



document.getElementById("stringResult").innerHTML =

"String Voltage : " + voltage.toFixed(1) + " V<br>" +

"MPPT Limit : " + mppt + " V<br>" +

"Status : " + status;


}
// =======================
// SLD DRAWING
// =======================

function drawSLD(){

let c = document.getElementById("sld");

let x = c.getContext("2d");


x.clearRect(0,0,600,350);


x.font = "18px Arial";


// TEXT

x.fillText("PV ARRAY",50,60);

x.fillText("DC COMBINER",220,60);

x.fillText("INVERTER",410,60);

x.fillText("BATTERY",410,180);

x.fillText("LOAD",240,280);


// LINES


x.beginPath();

x.moveTo(130,60);

x.lineTo(210,60);

x.stroke();



x.beginPath();

x.moveTo(330,60);

x.lineTo(400,60);

x.stroke();



x.beginPath();

x.moveTo(450,90);

x.lineTo(450,150);

x.stroke();



x.beginPath();

x.moveTo(420,200);

x.lineTo(300,270);

x.stroke();



x.beginPath();

x.moveTo(300,270);

x.lineTo(270,270);

x.stroke();

}



// =======================
// PRINT REPORT
// =======================

function printReport(){


let customer =
document.getElementById("customer").value;


let project =
document.getElementById("project").value;


let solar =
document.getElementById("solarResult").innerText;


let battery =
document.getElementById("batResult").innerText;


let inverter =
document.getElementById("invResult").innerText;



let report =

`
AMBER LIGHT SOLAR TOOL REPORT

Customer : ${customer}

Project : ${project}


----------------------

SOLAR RESULT

${solar}


----------------------

BATTERY

${battery}


----------------------

INVERTER

${inverter}

`;



let win = window.open("");

win.document.write(

"<pre style='font-size:18px'>" +

report +

"</pre>"

);


win.print();


}



// =======================
// SYSTEM SUMMARY
// =======================

function summary(){


let customer =
document.getElementById("customer").value;


let project =
document.getElementById("project").value;


let panel =
document.getElementById("panel").value;


let qty =
document.getElementById("qty").value;


let date =
document.getElementById("date").value;



document.getElementById("summaryResult").innerHTML =


`
<b>Customer:</b> ${customer}<br>

<b>Project:</b> ${project}<br>

<b>Panel:</b> ${panel}W<br>

<b>Quantity:</b> ${qty} pcs<br>

<b>Date:</b> ${date}
`;

}



// =======================
// AUTO DATE
// =======================

window.onload=function(){


let today = new Date();


let date =
today.toISOString().split("T")[0];


document.getElementById("date").value = date;


}
function roofLayout(){

let roofL=parseFloat(document.getElementById("roofLength").value);
let roofW=parseFloat(document.getElementById("roofWidth").value);

let panelL=parseFloat(document.getElementById("panelLength").value)/1000;
let panelW=parseFloat(document.getElementById("panelWidth").value)/1000;

let eff=parseFloat(document.getElementById("roofEff").value)/100;

let roofArea=roofL*roofW;
let usableArea=roofArea*eff;

let cols=Math.floor(roofL/panelL);
let rows=Math.floor((roofW*eff)/panelW);

let qty=cols*rows;

let kw=(qty*650)/1000;

document.getElementById("roofResult").innerHTML=

"Roof Area : "+roofArea.toFixed(2)+" m²<br>"+
"Usable Area : "+usableArea.toFixed(2)+" m²<br>"+
"Panel Qty : "+qty+" pcs<br>"+
"PV Size : "+kw.toFixed(2)+" kWp";

let c=document.getElementById("roofCanvas");
let x=c.getContext("2d");

x.clearRect(0,0,c.width,c.height);

let scale=12;

x.strokeRect(20,20,roofL*scale,roofW*scale);

for(let r=0;r<rows;r++){

for(let col=0;col<cols;col++){

x.strokeRect(
20+col*panelL*scale,
20+r*panelW*scale,
panelL*scale,
panelW*scale
);

}

}

}
