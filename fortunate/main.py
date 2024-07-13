from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from fortunate.models import fetch_random_epigram

app = FastAPI()


@app.get("/", include_in_schema=False)
def read_root():
    return RedirectResponse("/docs")


@app.get("/epigrams/random")
def random_epigram(category: str | None = None):
    return fetch_random_epigram(category)
