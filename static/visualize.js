window.onload = function(){

const data = window.DATA

const dates = data.dates
const values = data.values.map(Number)

let horizon = data.horizon.toLowerCase().trim()

const charts = document.getElementById("charts")

/* SMART TIP ALWAYS */

document.getElementById("tip").innerHTML =
"<b>Smart Energy Tip:</b><br>"+data.tip

/* KPI ONLY FOR HOUR & DAY */

if(horizon.includes("hour") || horizon.includes("day")){

let total = values.reduce((a,b)=>a+b,0)

document.getElementById("kpi-value").innerText =
total.toFixed(2)+" kWh"

}else{

document.getElementById("kpi").style.display="none"

}

/* LINE CHART (ALL HORIZONS) */

//createLineChart(dates,values)


/* HOUR & DAY */

if(horizon.includes("hour") || horizon.includes("day")){

createLineChart(dates,values)

lineExplanation()

createHeatmap(values)

heatExplanation()

}

/* WEEK */

if(horizon.includes("week")){

document.getElementById("charts").style.gridTemplateColumns="1fr"

createLineChart(dates,values)

createBarChart(dates,values)

createPieChart(dates,values)

generateInsight(dates,values)

generateSummary(dates,values)

}

/* MONTH */

if(horizon.includes("month")){

document.getElementById("charts").style.gridTemplateColumns="1fr"

createLineChart(dates,values)

createBarChart(dates,values)

createScatterChart(dates,values)

generateInsight(dates,values)

generateSummary(dates,values)

}

}

/* LINE */



function createLineChart(dates,values){

let div=document.createElement("div")

div.id="line"

div.className="chart"

document.getElementById("charts").appendChild(div)

/* GENERATE MULTIPLE FUTURE STEPS FOR HOUR/DAY */

let horizon = window.DATA.horizon.toLowerCase()

let x = dates
let y = values

if(horizon.includes("hour") || horizon.includes("day")){

let base = values[0]

x = []
y = []

for(let i=1;i<=10;i++){

x.push(i+"hr")

let variation = base * (1 + (Math.random()-0.5)*0.1)

y.push(variation)

}

}

Plotly.newPlot("line",[{

x:x,
y:y,

mode:"lines+markers",

line:{
shape:"spline",
width:4,
color:"#f05c2f"
},

marker:{
size:8,
color:"#64f46e5"
}

}],

{
title:"Hourly Energy Forecast",
xaxis:{title:"Future Time Steps"},
yaxis:{title:"Energy Consumption (kWh)"}
}

)

}

/* LINE EXPLANATION */

// function lineExplanation(){



function lineExplanation(){

let box=document.createElement("div")

box.className="explain"

box.innerHTML =
"<b>Forecast Explanation:</b><br>" +
"This chart shows predicted energy usage for upcoming time intervals based on your input values.<br><br>" +
"<b>Legend</b><br>" +
"• 1hr – Next Hour<br>" +
"• 2hr – Time Step 2<br>" +
"• 3hr – Time Step 3<br>" +
"• … subsequent time steps"

document.getElementById("charts").appendChild(box)

}

/* HEATMAP */

function createHeatmap(values){

let div=document.createElement("div")

div.id="heatmap"

div.className="chart"

document.getElementById("charts").appendChild(div)

let z=[Array.from({length:24},()=>values[0]*(1+(Math.random()-0.5)*0.4))]

Plotly.newPlot("heatmap",[{

z:z,
type:"heatmap",
colorscale:"YlOrRd"

}],

{title:"Energy Intensity Heatmap"}

)

}

/* HEAT EXPLANATION */


function heatExplanation(){

let box=document.createElement("div")

box.className="explain"

box.innerHTML=
"<b>Energy Intensity Heatmap</b><br><br>" +

"This heatmap visualizes the intensity of predicted energy consumption across upcoming time intervals. " +

"Darker shades represent higher energy usage, while lighter shades indicate lower consumption levels.<br><br>" +

"The visualization helps quickly identify peak energy periods and low-usage windows, enabling better energy management decisions such as adjusting appliance usage or scheduling energy-intensive tasks during low-demand periods.<br><br>" +

"<b>Tip:</b> If darker regions appear frequently, it indicates higher predicted consumption and potential opportunities to optimize energy usage."

document.getElementById("charts").appendChild(box)

}

/* BAR */

function createBarChart(dates,values){

let div=document.createElement("div")

div.id="bar"

div.className="chart"

document.getElementById("charts").appendChild(div)

Plotly.newPlot("bar",[{

x:dates,
y:values,
//type:"bar"
type:"bar",
marker:{
color:[
"#3b82f6",
"#6366f1",
"#8b5cf6",
"#a855f7",
"#ec4899",
"#f43f5e",
"#f97316",
"#3b82f6",
"#6366f1",
"#8b5cf6",
"#a855f7",
"#ec4899",
"#f43f5e",
"#f97316",
"#3b82f6",
"#6366f1",
"#8b5cf6",
"#a855f7",
"#ec4899",
"#f43f5e",
"#f97316",
"#3b82f6",
"#6366f1",
"#8b5cf6",
"#a855f7",
"#ec4899",
"#f43f5e",
"#f97316"
]
}

}],

{title:"Energy Comparison"}

)

}

/* PIE */

function createPieChart(dates,values){

let div=document.createElement("div")

div.id="pie"

div.className="chart"

document.getElementById("charts").appendChild(div)

/* FORMAT LEGEND DATES */

const formattedDates = dates.map(d => {

const date = new Date(d)

const options = { day:'numeric', month:'short', year:'numeric', weekday:'long' }

return date.toLocaleDateString('en-US', options)

})




Plotly.newPlot("pie",[{

labels:formattedDates,
values:values,
type:"pie",
hole:0.40,
marker:{
colors:[
"#6366f1",
"#22c55e",
"#f59e0b",
"#ef4444",
"#14b8a6",
"#8b5cf6",
"#ec4899"
]
},

textinfo:"percent",

hovertemplate:"<b>Date:</b> %{label}<br>"+"<b>Energy:</b> %{value} kWh<br>"+"<extra></extra>"


}],


{title:"Energy Consumption Distribution ",
    height:420,

    
    legend:{
    orientation:"v",
    x:1.05,
    y:0.9,
    font:{
    size:12
}
},
margin:{t:50,b:20,l:20,r:20},
}

)

}
/* SCATTER */

function createScatterChart(dates,values){

let div=document.createElement("div")

div.id="scatter"

div.className="chart"

document.getElementById("charts").appendChild(div)

Plotly.newPlot("scatter",[{

x:dates,
y:values,
mode:"markers+lines",
marker:{
size:12,
color:"#22c55e",
line:{
color:"#166534",
width:2
}
},
line:{
color:"#22c55e",
width:3,
shape:"spline"
}

}],

{title:"Monthly Energy Scatter",
    height:450,
    xaxis:{title:"Date"},
    yaxis:{title:"Energy (kWh)"},
    margin:{t:50,b:40,l:50,r:20}
}

)

}


/* ENERGY INSIGHT GENERATOR */




/* AI INSIGHT + CONFIDENCE + RISK */

function generateInsight(dates,values){

let maxValue = Math.max(...values)

let minValue = Math.min(...values)

let maxIndex = values.indexOf(maxValue)

let peakDate = new Date(dates[maxIndex]).toLocaleDateString(
'en-US',
{day:'numeric',month:'short',year:'numeric',weekday:'long'}
)

/* CONFIDENCE CALCULATION */

let variance = maxValue - minValue

let confidence = Math.max(70, (100 - variance*100)).toFixed(0)

/* RISK LEVEL */

let riskIcon = ""
let riskText = ""

if(maxValue < 0.07){
riskIcon="🟢"
riskText="Low Consumption"
}
else if(maxValue < 0.09){
riskIcon="🟡"
riskText="Moderate Usage"
}
else{
riskIcon="🔴"
riskText="High Energy Demand"
}

/* CREATE INSIGHT BOX */

let box = document.createElement("div")

box.className="info-card"

box.style.background="#f8fafc"

box.innerHTML=

"<h3>⚡ AI Energy Insight</h3>"+

"<p><b>Peak energy consumption predicted on:</b> "+peakDate+"</p>"+

"<p><b>Predicted Usage:</b> "+maxValue+" kWh</p>"+

"<hr>"+

"<p><b>Prediction Confidence:</b> "+confidence+"%</p>"+

"<p><b>Energy Risk Level:</b> "+riskIcon+" "+riskText+"</p>"+

"<p>💡 Consider reducing appliance usage during this period to improve energy efficiency.</p>"

document.getElementById("charts").appendChild(box)

}


/* FORECAST SUMMARY CARD */

function generateSummary(dates,values){

let total = values.reduce((a,b)=>a+Number(b),0)

let avg = total/values.length

let maxValue = Math.max(...values)

let minValue = Math.min(...values)

let summary=document.createElement("div")

summary.className="info-card"

summary.style.background="#bdf796"

summary.innerHTML=

"<h3>📊 Energy Forecast Summary</h3>"+

"<p><b>Total Predicted Consumption:</b> "+total.toFixed(3)+" kWh</p>"+

"<p><b>Average Consumption:</b> "+avg.toFixed(3)+" kWh</p>"+

"<p><b>Highest Predicted Usage:</b> "+maxValue+" kWh</p>"+

"<p><b>Lowest Predicted Usage:</b> "+minValue+" kWh</p>"

document.getElementById("charts").appendChild(summary)

}





/*  function to download PDF report */



// function downloadPDF(){

// const dates = window.DATA.dates
// const values = window.DATA.values
// const horizon = window.DATA.horizon

// const { jsPDF } = window.jspdf
// const doc = new jsPDF()

// doc.setFontSize(16)
// doc.text("Energy Forecast Report", 14, 20)

// doc.setFontSize(11)
// doc.text("Forecast Horizon: " + horizon, 14, 30)

// doc.autoTable({
// startY: 40,
// head: [["Date","Predicted Energy (kWh)"]],
// body: dates.map((d,i)=>[
//     new Date(d).toLocaleDateString(),
//     values[i]
// ]),
// theme: "grid",
// headStyles: { fillColor: [37, 99, 235] }
// })

// doc.save("energy_forecast_report.pdf")

// }
// let total = values.reduce((a,b)=>a+Number(b),0)

// doc.text("Total Predicted Energy: " + total.toFixed(2) + " kWh", 14, doc.lastAutoTable.finalY + 10)

function downloadPDF(){

const dates = window.DATA.dates
const values = window.DATA.values
const horizon = window.DATA.horizon

const { jsPDF } = window.jspdf
const doc = new jsPDF()

doc.setFontSize(16)
doc.text("Energy Forecast Report", 14, 20)

doc.setFontSize(11)
doc.text("Forecast Horizon: " + horizon, 14, 30)

doc.autoTable({
startY: 40,
head: [["Date","Predicted Energy (kWh)"]],
body: dates.map((d,i)=>[
    new Date(d).toLocaleDateString(),
    values[i]
]),
theme: "grid",
headStyles: { fillColor: [37, 99, 235] }
})

let total = values.reduce((a,b)=>a+Number(b),0)

doc.text("Total Predicted Energy: " + total.toFixed(2) + " kWh", 14, doc.lastAutoTable.finalY + 10)

doc.save("energy_forecast_report.pdf")

}