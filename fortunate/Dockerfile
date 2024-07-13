FROM python:3.12-bookworm

ENV POETRY_VERSION=1.8.2
ENV POETRY_VIRTUALENVS_CREATE=false
ENV PATH /root/.local/bin:$PATH

RUN pip install pipx;  pipx install poetry
WORKDIR /pysetup
COPY ./README.md ./pyproject.toml ./poetry.lock* /pysetup/
RUN poetry install

WORKDIR /service
COPY ./fortunate /service/fortunate/

CMD ["uvicorn", "fortunate.main:app", "--host", "0.0.0.0", "--port", "8000"]
