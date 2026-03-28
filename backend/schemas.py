from pydantic import BaseModel
from typing import List, Optional

class Question(BaseModel):
    id: int
    question: str
    options: List[str]
    
class AnswerItem(BaseModel):
    question_id: int
    selected_answer: str

class SubmitRequest(BaseModel):
    answers: List[AnswerItem]

class ResultAnswer(BaseModel):
    question_id: int
    question: str
    options: List[str]
    selected_answer: str
    correct: bool
    correct_answer: str

class SubmitResponse(BaseModel):
    total_questions: int
    correct_answers: int
    results: List[ResultAnswer]