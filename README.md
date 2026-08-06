# dmx-ai-marketing-tool-frontend

## Local API integration

1. Create a `.env.local` file in the project root with the backend base URL. Example:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
```

2. Start the backend (example for FastAPI):

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

3. Start the frontend:

```bash
npm install
npm run dev
```

4. Verify the health endpoint from your machine:

```bash
curl -i http://127.0.0.1:8000/api/v1/health
```

5. If you get network or CORS errors in the browser, ensure the backend allows the frontend origin (example FastAPI CORS middleware):

```py
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:3000","http://127.0.0.1:3000"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)
```
