from flask import Flask, render_template, request, jsonify, session, send_file, redirect, url_for
from utils.predictor import predict_energy
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import json

app = Flask(__name__)
app.secret_key = "change-this-secret"

# ---------------- HOME PAGE ----------------
@app.route("/")
def home():
    return render_template("home.html")


# ---------------- FORECAST PAGE (FIXES 404) ----------------
@app.route("/forecast")
def forecast():
    return render_template("forecast.html")


# ---------------- PREDICTION API ----------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        energy = float(data["energy"])
        device = data["device"]
        horizon = data["horizon"]

        dates, preds, tip = predict_energy(energy, device, horizon)

        # Store last prediction in session for visualize/report pages
        try:
            session['last_prediction'] = json.dumps({
                'dates': dates,
                'predictions': preds,
                'tip': tip,
                'horizon': horizon
            })
        except Exception:
            # session may fail in some environments; ignore but continue
            pass

        return jsonify({
            "dates": dates,
            "predictions": preds,
            "tip": tip
        })

    except Exception as e:
        print("Prediction error:", e)
        return jsonify({"error": str(e)}), 500



# ---------------- RUN SERVER ----------------


@app.route("/visualize")
def visualize():
    # Read stored prediction from session
    data = session.get('last_prediction')
    if not data:
        # No stored prediction, redirect back to forecast
        return redirect(url_for('forecast'))

    try:
        obj = json.loads(data)
        dates = obj.get('dates', [])
        predictions = obj.get('predictions', [])
        tip = obj.get('tip', '')
        horizon = obj.get('horizon', 'hour')
    except Exception:
        return redirect(url_for('forecast'))

    return render_template('visualize.html', dates=json.dumps(dates), predictions=json.dumps(predictions), tip=tip, horizon=json.dumps(horizon))


@app.route("/download-report")
def download_report():
    data = session.get('last_prediction')
    if not data:
        return redirect(url_for('forecast'))

    try:
        obj = json.loads(data)
    except Exception:
        return redirect(url_for('forecast'))

    dates = obj.get('dates', [])
    predictions = obj.get('predictions', [])

    # Create PDF in memory
    buf = BytesIO()
    c = canvas.Canvas(buf, pagesize=letter)
    width, height = letter

    c.setFont("Helvetica-Bold", 18)
    c.drawString(40, height - 40, "Forecast Report")

    c.setFont("Helvetica-Bold", 13)
    c.drawString(40, height - 80, "Date/Time")
    c.drawString(220, height - 80, "Predicted Energy (kWh)")
    c.line(40, height - 85, width - 40, height - 85)

    c.setFont("Helvetica", 12)
    y = height - 110
    row_height = 20
    for d, p in zip(dates, predictions):
        if y < 60:
            c.showPage()
            y = height - 40
            c.setFont("Helvetica-Bold", 13)
            c.drawString(40, y, "Date/Time")
            c.drawString(220, y, "Predicted Energy (kWh)")
            c.line(40, y - 5, width - 40, y - 5)
            c.setFont("Helvetica", 12)
            y -= 30
        c.drawString(40, y, str(d))
        c.drawString(220, y, f"{p:.3f}")
        y -= row_height

    c.showPage()
    c.save()
    buf.seek(0)

    return send_file(buf, as_attachment=True, download_name='forecast_report.pdf', mimetype='application/pdf')


if __name__ == "__main__":
    app.run(debug=True)
