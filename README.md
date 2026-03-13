# Smart Home Energy Consumption Analysis & Forecasting

An end-to-end **Machine Learning and Deep Learning system** that analyzes smart home energy usage patterns and predicts future electricity consumption using **time-series forecasting (LSTM)**.  

This project was developed as part of the **Infosys Springboard Internship 6.0** and demonstrates the complete lifecycle of a data science project — from **data preprocessing and feature engineering to predictive modeling, visualization dashboards, and deployment using Flask API**.

---

# Project Objectives

The main goal of this project is to build a **smart energy monitoring and forecasting system** that helps understand energy consumption patterns and optimize electricity usage in smart homes.

The system:

- Analyzes device-level power consumption patterns
- Forecasts future energy usage using deep learning
- Provides visual insights through graphs and dashboards
- Generates smart suggestions to reduce energy wastage
- Deploys a web application for real-time monitoring

---

# Project Outcomes

The final system provides the following capabilities:

- Analyze **device-level energy consumption trends**
- Provide insights at **hourly, daily, weekly, and monthly levels**
- Predict future energy usage using **LSTM time series forecasting**
- Compare predictions with a **baseline Linear Regression model**
- Generate **visual dashboards using Pandas and Matplotlib**
- Provide **smart energy saving suggestions**
- Deploy a **Flask based web application for real-time predictions**
- Enable **future IoT sensor integration**
- Achieve approximately **95% prediction accuracy**
- Build an **automated preprocessing pipeline**
- Create a **scalable architecture** extendable to anomaly detection and smart home automation

---

# Technology Stack

### Programming Language
- Python

### Libraries Used
- Pandas
- NumPy
- Matplotlib
- Scikit-learn
- TensorFlow / Keras
- Flask

### Tools
- **Google Colab** – Data preprocessing and experimentation
- **VS Code** – Application development and API integration
- **GitHub** – Version control and project hosting

---

# Project Workflow

The project is organized into **4 milestones and 8 modules**.


# Dataset

This project uses the **Smart Home Energy Consumption Dataset** available on Kaggle.

Dataset Link:  
https://www.kaggle.com/datasets/smayanj/smart-home-energy-usage-dataset

After downloading the dataset, place it inside the following folder:

data/
   Smart Home Energy Consumption Optimization.cs

---



# Milestone 1 (Week 1-2)

## Module 1 – Data Collection and Understanding

Tasks performed:

- Defined project scope and objectives
- Collected the **Smart Home Energy Monitoring Dataset**
- Verified data integrity
- Handled missing timestamps
- Performed exploratory data analysis
- Organized energy readings by:
  - Device
  - Room
  - Timestamp

---

## Module 2 – Data Cleaning and Preprocessing

Tasks performed:

- Handled missing values and outliers
- Converted timestamps into **datetime format**
- Resampled data into:
  - Hourly usage
  - Daily usage
- Normalized energy values
- Split dataset into:
  - Training set
  - Validation set
  - Testing set

---

# Milestone 2 (Week 3-4)

## Module 3 – Feature Engineering

Important features created:

- Time-based features:
  - Hour
  - Day
  - Week
  - Month
- Device level energy statistics
- Lag features for time series modeling
- Moving averages for trend learning
- Final dataset prepared for machine learning models

---

## Module 4 – Baseline Model Development

A **Linear Regression model** was implemented as the baseline model.

Steps performed:

- Trained Linear Regression on processed dataset
- Predicted future energy consumption
- Evaluated using metrics:

  - MAE (Mean Absolute Error)
  - RMSE (Root Mean Squared Error)
  - R² Score

- Plotted **Actual vs Predicted energy usage**
- Used results as comparison benchmark for deep learning model

---

# Milestone 3 (Week 5-6)

## Module 5 – LSTM Model Development

A **Long Short-Term Memory (LSTM)** neural network was developed for time series forecasting.

Steps performed:

- Designed LSTM architecture using TensorFlow/Keras
- Trained model using sequential energy data
- Performed hyperparameter tuning:

  - Batch size
  - Epochs
  - Learning rate

- Compared results with baseline model

---

## Module 6 – Model Evaluation and Integration

Tasks performed:

- Evaluated models using:

  - MAE
  - RMSE
  - R² score

- Selected best performing model
- Saved trained model weights
- Converted model into **Flask compatible prediction function**
- Tested predictions using sample inputs

---

# Milestone 4 (Week 7-8)

## Module 7 – Dashboard and Visualization

Created multiple visualization components:

- Hourly energy consumption trends
- Daily usage patterns
- Weekly energy analysis
- Monthly consumption trends
- Device-wise energy usage charts

Libraries used:

- Matplotlib
- Pandas

These visualizations help users **understand energy behavior easily**.

---

## Module 8 – Web Application Deployment

Steps performed:

- Developed **Flask API**
- Connected frontend with ML model
- Built interactive UI using:

  - HTML
  - CSS
  - JavaScript

- Enabled real-time energy prediction
- Tested application locally

---

# Model Performance

Two models were compared:

| Model | Description |
|------|-------------|
| Linear Regression | Baseline forecasting model |
| LSTM | Deep learning time-series forecasting |

The **LSTM model achieved significantly better prediction accuracy (~95%)** compared to the baseline model.

---

# Visualizations Generated

The system produces multiple graphs including:

- Energy Consumption Trend
- Monthly Energy Usage
- Actual vs Predicted Energy Graph
- Device Level Energy Analysis

These visualizations improve **interpretability of energy consumption patterns**.

---

# Running the Project Locally

Follow the steps below to run the project on your system.

## Step 1 – Clone the Repository

git clone https://github.com/sameera-shaik123/smart_home_energy_consumption_analysis.git

---

## Step 2 – Navigate to Project Folder

cd smart_home_energy_consumption_analysis

---

## Step 3 – Install Required Libraries

pip install -r requirements.txt

---

## Step 4 – Run the Flask Application

python app.py

---

## Step 5 – Open the Application

Open your browser and visit:

http://127.0.0.1:5000/

This will launch the **Smart Energy Monitoring Web Application**.

---

# Project Architecture

Dataset ↓ Data Preprocessing ↓ Feature Engineering ↓ Baseline Model (Linear Regression) ↓ Deep Learning Model (LSTM) ↓ Model Evaluation ↓ Visualization Dashboard ↓ Flask Web Application

---

# Future Enhancements

The system can be extended further with:

- Real-time **IoT sensor data streaming**
- **Energy anomaly detection**
- **Smart home automation**
- **Cloud deployment**
- Mobile application interface
- AI-based energy optimization recommendations

---


## Application Screenshots

### Home Page

The home page allows users to explore the smart energy monitoring system and navigate to different modules.

![Home Page](images/homepage.png)

---

### Energy Forecast Page

This page predicts future energy consumption using the trained machine learning model.

![Forecast Page](images/forecast_page.png)

---

### Energy Visualization Dashboard

The visualization dashboard provides insights into energy usage patterns such as hourly, daily, weekly, and monthly trends.

![Visualization Page](images/visualization_page.png)





# Author

**Shaik Sameera**

B.Tech – Computer Science Engineering (Data Science)  
Annamacharya Institute of Technology and Sciences

---

# Internship

Developed as part of:

**Infosys Springboard Internship 6.0**

---

# License

This project is developed for **educational and research purposes**.

