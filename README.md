# ReportHere

Upload a CSV or Excel file, get a data quality score, and download a formatted Excel report.
Next.js (App Router, TypeScript, Tailwind) frontend + Python FastAPI / Pandas / OpenPyXL backend, deployed together on Vercel.
No database, auth, or storage: files are processed in memory during the request.

## Run locally
```bash
# 1. Install frontend dependencies
npm install

# 2. Python backend (separate terminal)
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
npm run dev:api        # FastAPI on http://127.0.0.1:8000

# 3. Frontend
cp .env.example .env.local
npm run dev            # http://localhost:3000 (proxies /api/analyze and /api/generate-report to FastAPI)
```

## Deploy to Vercel
```bash
npm i -g vercel
vercel login
vercel          # preview deployment
vercel --prod   # production deployment
```
Vercel detects Next.js and builds `api/index.py` as a Python function using `requirements.txt`.

## Limits
4 MB per file (Vercel request body limit is ~4.5 MB), 50,000 rows, 100 columns. First Excel sheet only.
