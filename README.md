# 🤖 MayaX-AI Generated Image Detection

![AI Detect Banner](https://img.shields.io/badge/Project-AI%20Image%20Detection-blue?style=for-the-badge)
![PyTorch](https://img.shields.io/badge/PyTorch-CNN%20Model-orange?style=for-the-badge&logo=pytorch)
![Flask](https://img.shields.io/badge/Backend-Flask-black?style=for-the-badge&logo=flask)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)

---

## 📌 About The Project

**AI Detect** is a 4th Year Major Project that detects whether an image is **AI Generated** or **Real** using Deep Learning (CNN). With the rise of AI-generated content from tools like MidJourney, DALL-E, and Stable Diffusion, it has become nearly impossible for humans to identify fake images. This application solves that problem by analyzing images and providing a confidence score of how likely they are to be AI generated.

---

## 🎯 Features

- 🖼️ Upload any image (JPG, PNG, WEBP)
- 🤖 Detects if the image is AI Generated or Real
- 📊 Shows confidence score as a percentage
- ⚡ Fast detection powered by CNN (PyTorch)
- 🌐 Modern React frontend with dark theme UI
- 🔗 REST API backend using Flask

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Deep Learning Model | PyTorch (CNN) |
| Backend API | Flask (Python) |
| Frontend | React.js |
| Dataset | CIFAKE (Kaggle) |
| Deployment | Render (Backend) + Vercel (Frontend) |

---

## 📁 Project Structure

```
ai-detect/
│
├── backend/                  
│   ├── model/
│   │   ├── train.py          # CNN model training script
│   │   ├── model.py          # CNN architecture definition
│   │   └── detector.pt       # Saved trained model weights
│   ├── app.py                # Flask API server
│   ├── utils.py              # Image preprocessing utilities
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadBox.jsx     # Image upload component
│   │   │   ├── ResultCard.jsx    # Detection result display
│   │   │   └── Navbar.jsx        # Navigation bar
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   └── Result.jsx        # Result page
│   │   └── App.jsx               # Main React app
│   └── package.json
│
└── dataset/                  
    ├── real/                 # Real images for training
    └── ai_generated/         # AI generated images for training
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- Python 3.9+
- Node.js 18+
- pip
- npm or yarn

---

### 🔧 Backend Setup

```bash
# Navigate to backend folder
cd ai-detect/backend

# Create a virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Flask server
python app.py
```

Flask will start at `http://localhost:5000`

---

### ⚛️ Frontend Setup

```bash
# Navigate to frontend folder
cd ai-detect/frontend

# Install dependencies
npm install

# Start React development server
npm start
```

React will start at `http://localhost:3000`

---

### 🧠 Training the Model

```bash
# Navigate to model folder
cd ai-detect/backend/model

# Run training script
python train.py
```

Make sure the CIFAKE dataset is placed inside the `dataset/` folder before training.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |
| POST | `/predict` | Upload image and get detection result |

### Example Response from `/predict`

```json
{
  "prediction": "AI Generated",
  "ai_confidence": 87.4,
  "real_confidence": 12.6
}
```

---

## 📊 Dataset

This project uses the **CIFAKE** dataset available on Kaggle.

- 60,000 Real images
- 60,000 AI Generated images
- Binary classification: REAL vs FAKE

👉 Download here: [CIFAKE on Kaggle](https://www.kaggle.com/datasets/birdy654/cifake-real-and-ai-generated-synthetic-images)

---

## 🧪 How It Works

1. User uploads an image on the frontend
2. React sends the image to Flask backend via POST request
3. Flask preprocesses the image (resize, normalize)
4. Preprocessed image is passed through the trained CNN model
5. Model outputs confidence scores for AI Generated vs Real
6. Flask sends the result back as JSON
7. React displays the result with animated confidence bars

---

## 📸 Screenshots

> *(Add screenshots of your app here once built)*

---

## 🔮 Future Enhancements

- 🎥 Video deepfake detection
- 📱 Mobile responsive design
- 🗂️ Detection history for logged-in users
- 🔍 Heatmap showing which parts of the image triggered detection

---

## 👨‍💻 Developer

**Harshu**
4th Year Major Project — AI & Deep Learning

---

## 📄 License

This project is for educational purposes as part of a 4th Year Major Project.
