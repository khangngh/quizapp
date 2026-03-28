const BASE_URL = "http://localhost:8000";

export const getQuestions = async () => {
    const res = await fetch(`${BASE_URL}/questions`);
    return res.json();
};

export const submitQuiz = async (answers) => {
    const res = await fetch(`${BASE_URL}/submit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
    });
    return res.json();
};