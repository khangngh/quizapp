from sqlalchemy.orm import Session
from models import QuestionDB

def get_question(db: Session):
    return db.query(QuestionDB).all()
