<p align="center">
  <img src="public/assets/icons/logo.svg" width="120" />
  <h1>signalist_stock-tracker-app</h1>
</p>

![Status](https://img.shields.io/badge/Status-Active-success)
![Build](https://img.shields.io/badge/Build-Passing-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-informational)
![Maintained](https://img.shields.io/badge/Maintained-Yes-brightgreen)

<!-- Tech Stack Badges -->
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Shadcn](https://img.shields.io/badge/shadcn/ui-000000)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![BetterAuth](https://img.shields.io/badge/BetterAuth-backend-blue)
![TradingView](https://img.shields.io/badge/TradingView-2E86C1)



## 🚀 Project Overview  
The App allows users to view live stock data, analyze interactive charts, manage
personalized watchlists, receive alerts, and access AI-generated summaries. It is designed for traders,
investors, and financial enthusiasts who require accurate, real-time insights and intelligent automation
for better decision-making. 

### 🔍 Motivation & Goals  
- Building this app in order to get more hands on experience on next.js and various other technologies and to understand typescript. 
- It's and app in which users can view real time stock data which helps people who trade on a daily basis. 
- We are taking widgets from trading view which further simplifies our web interface and directly links to relevant websites to get more info on particular stock. 

## 📦 Tech Stack & Dependencies  
- Frontend: React + Next.js + shadcn  
- Backend: betterAuth 
- (npm, mongoDb, APIs)  
 
## 🛠️ Installation & Setup  
Step-by-step instructions so someone can get it running:  

```bash
git clone https://github.com/<username>/signalist_stock-tracker-app.git
cd signalist_stock-tracker-app
# if you use virtualenv:
python -m venv venv
source venv/bin/activate     # (or .\\venv\\Scripts\\activate on Windows)
pip install -r requirements.txt
# frontend
cd frontend
npm install
npm run start
# backend
cd ../backend
uvicorn main:app --reload
```  

If there are environment variables (API keys, DB credentials, etc.), show how to configure them.  

## ✅ Usage / Features  
Explain how to use the app. Maybe with code / CLI examples or screenshots:  
- What features are available (e.g. fetch stock data, tracking, alerts, UI overview, etc.)  
- Sample usage (if there are scripts / commands)  
- Screenshots / GIF (if UI-based) to help visualise  

## 🧪 Tests (if available)  
How to run tests (unit / integration / end-to-end).  

```bash
pytest   # or your test runner
```  

## 🛠️ Project Structure (optional but useful)  
Show directory layout, so someone unfamiliar can quickly understand where everything is. Example:

```
/backend — API server with FastAPI  
/frontend — React + Material-UI app  
/docs     — (optional) additional documentation / architecture diagrams  
/README.md  
/LICENSE  
```  

## 🤝 Contributing  
If you want others to contribute:  
- How to report issues  
- How to submit pull requests  
- Code style / linting / commit message guidelines (if any)  
- Branching or merge policy (if applicable)  
Link issue templates or PR templates if you have them.  

## 📄 License  
State the license under which the project is released (e.g. MIT, Apache 2.0, GPL, etc.).  

## 📌 Credits / Acknowledgments (optional)  
- Who built it (you, collaborators)  
- External resources or libraries used  
- References to any tutorials or code you learned from  

## 📝 (Optional) Changelog / Roadmap  
If you plan frequent updates:  
- What changed between versions  
- Future plans or “to-do” features  

