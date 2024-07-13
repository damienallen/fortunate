from sqlmodel import Field, SQLModel, Session, create_engine


engine = create_engine("sqlite:///sqlite.db", echo=True)
SQLModel.metadata.create_all(engine)


class Epigram(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    category: str
    text: str


def init_db():
    SQLModel.metadata.create_all(engine)


def create_epigram(text: str, category: str = "custom"):
    with Session(engine) as session:
        session.add(Epigram(category=category, text=text))
        session.commit()
