// ==========================
// HELPERS
// ==========================
function formatFullDateTime(isoStr) {
    const d = new Date(isoStr);

    const date = d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    const time = d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    return `${date} ${time}`;
}

function formatShortDate(isoStr) {
    const d = new Date(isoStr);
    return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short"
    });
}

function getWeekdayName(isoStr) {
    return new Date(isoStr).toLocaleDateString("en-US", { weekday: "short" });
}

function getMonthName(isoStr) {
    return new Date(isoStr).toLocaleDateString("en-US", { month: "short" });
}

// Setup visualize button when page loads
window.addEventListener('DOMContentLoaded', function() {
    const vizBtn = document.getElementById('visualize-btn');
    if (vizBtn) {
        vizBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = '/visualize';
        });
    }
});

// ==========================
// MAIN PREDICT FUNCTION
// ==========================


function predictEnergy() {

    const energy = document.getElementById("energy").value;
    const device = document.getElementById("device").value;
    const horizon = document.getElementById("horizon").value;

    if (!energy || !device || !horizon) {
        alert("Please fill all fields");
        return;
    }

    // Store device in localStorage for visualize page to use device-specific colors
    localStorage.setItem('forecastDevice', device);
    // Store horizon so visualize page can label time steps (hour/day)
    localStorage.setItem('forecastHorizon', horizon);

    document.getElementById("result-box").classList.remove("hidden");
    document.getElementById("prediction-list").innerHTML =
        "<p>⏳ Generating prediction...</p>";

    fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ energy, device, horizon })
    })
    .then(res => {
        if (!res.ok) throw new Error("Prediction failed");
        return res.json();
    })
    .then(data => renderData(data, horizon))
    .catch(err => {
        console.error(err);
        alert("Prediction failed");
    });
}

// ==========================
// RENDER DATA
// ==========================
function renderData(data, horizon) {

    const dates = data.dates;
    const values = data.predictions;

    // --------------------------
    // TEXT OUTPUT (ONCE ONLY)
    // --------------------------
    let html = "";
    dates.forEach((d, i) => {
        html += `<p>${formatFullDateTime(d)} : <b>${values[i].toFixed(3)} kWh</b></p>`;
    });
    document.getElementById("prediction-list").innerHTML = html;
    
    // Tip box removed from forecast page per requirements
}
