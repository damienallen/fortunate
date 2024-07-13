from fastapi import FastAPI
from fastapi.responses import RedirectResponse, JSONResponse
from fortunate.models import create_epigram, fetch_random_epigram
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
def read_root():
    return RedirectResponse("/docs")


@app.get("/epigram/random")
def random_epigram(category: str | None = None):
    return fetch_random_epigram(category)


@app.post("/epigram/add")
def create_custom_epigram(text: str):
    create_epigram(text=text)
    return JSONResponse({"description": "Added custom epigram"}, status_code=201)
