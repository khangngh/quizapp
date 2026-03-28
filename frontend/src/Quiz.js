import React, { useEffect, useState } from "react";
import { getQuestions, submitQuiz } from "./api";

export default function Quiz({ onFinish }) {
    const [questions, setQuestions] = useState([]);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        getQuestions().then(setQuestions);
    }, []);

    const handleSelect = (qid, option) => {
        setSelected({ ...selected, [qid]: option });
    };

    const handleSubmit = async () => {
        const answers = Object.keys(selected).map((qid) => ({
            question_id: Number(qid),
            selected_answer: selected[qid],
        }));

        const result = await submitQuiz(answers);
        onFinish(result);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Quiz App</h2>

                {questions.map((q, index) => (
                    <div key={q.id} style={styles.questionBox}>
                        <p style={styles.question}>
                            {index + 1}. {q.question}
                        </p>

                        {q.options.map((opt, i) => {
                            const isSelected = selected[q.id] === opt;

                            return (
                                <div
                                    key={i}
                                    onClick={() => handleSelect(q.id, opt)}
                                    style={{
                                        ...styles.option,
                                        ...(isSelected ? styles.selected : {}),
                                    }}
                                >
                                    {/* fake radio */}
                                    <div style={styles.circle}>
                                        {isSelected && <div style={styles.innerCircle} />}
                                    </div>

                                    {opt}
                                </div>
                            );
                        })}
                    </div>
                ))}

                <button style={styles.button} onClick={handleSubmit}>
                    Nộp bài
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        background: "#f4f6f8",
        minHeight: "100vh",
        padding: "30px",
        display: "flex",
        justifyContent: "center",
    },

    card: {
        background: "#fff",
        padding: "30px",
        borderRadius: "16px",
        width: "600px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    },

    title: {
        marginBottom: "20px",
    },

    questionBox: {
        marginBottom: "25px",
    },

    question: {
        fontWeight: "600",
        marginBottom: "10px",
    },

    option: {
        display: "flex",
        alignItems: "center",
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        marginBottom: "10px",
        cursor: "pointer",
        transition: "0.2s",
    },

    selected: {
        background: "#e6f0ff",
        border: "1px solid #3498db",
    },

    circle: {
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        border: "2px solid #aaa",
        marginRight: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    innerCircle: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "#3498db",
    },

    button: {
        marginTop: "20px",
        padding: "12px",
        width: "100%",
        borderRadius: "10px",
        border: "none",
        background: "#3498db",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
    },
};