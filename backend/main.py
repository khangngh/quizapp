from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from crud import get_question
from schemas import *
from models import QuestionDB
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

Base.metadata.create_all(bind=engine)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # cho phép tất cả (dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def seed_data():
    db = SessionLocal()

    if db.query(QuestionDB).count() == 0:
        sample_questions = [
            QuestionDB(
                question="React là thư viện của ngôn ngữ nào?",
                option_a="Python",
                option_b="JavaScript",
                option_c="Java",
                option_d="C#",
                correct_answer="JavaScript"
            ),
            QuestionDB(
                question="FastAPI viết bằng ngôn ngữ nào?",
                option_a="Python",
                option_b="Java",
                option_c="Go",
                option_d="PHP",
                correct_answer="Python"
            )
        ]

        db.add_all(sample_questions)
        db.commit()

    db.close()


        
@app.get("/questions", response_model = List[Question])
def read_questions(db: Session = Depends(get_db)):
    questions = get_question(db)
    result = []
    for q in questions:
        result.append({
            "id": q.id,
            "question": q.question,
            "options": [q.option_a, q.option_b, q.option_c, q.option_d]
        })
    return result

@app.post("/submit", response_model=SubmitResponse)
def submit_quiz(data: SubmitRequest, db: Session = Depends(get_db)):
    questions = db.query(QuestionDB).all()
    question_map = {q.id: q for q in questions}
    
    score = 0
    result = []
    for ans in data.answers:
        q = question_map.get(ans.question_id)
        if not q:
            continue
        is_correct = ans.selected_answer == q.correct_answer
        if is_correct:
            score += 1
        result.append({
            "question_id": ans.question_id,
            "question": q.question,
            "options": [q.option_a, q.option_b, q.option_c, q.option_d],
            "selected_answer": ans.selected_answer,
            "correct": is_correct,
            "correct_answer": q.correct_answer
        })
    return {
        "total_questions": len(data.answers),
        "correct_answers": score,
        "results": result
    }