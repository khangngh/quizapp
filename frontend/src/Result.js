export default function Result({ data, onRestart }) {
    if (!data) return <p>Loading...</p>;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Kết quả</h2>

                <p style={styles.score}>
                    {data.correct_answers} / {data.total_questions} đúng
                </p>

                {data.results?.map((q, index) => (
                    <div key={index} style={styles.questionBox}>
                        <p style={styles.question}>
                            {index + 1}. {q.question}
                        </p>

                        {q.options.map((opt, i) => {
                            const isCorrect = opt === q.correct_answer;
                            const isSelected = opt === q.selected_answer;

                            let optionStyle = styles.option;

                            if (isCorrect) optionStyle = { ...optionStyle, ...styles.correct };
                            if (isSelected && !isCorrect)
                                optionStyle = { ...optionStyle, ...styles.wrong };

                            return (
                                <div key={i} style={optionStyle}>
                                    <input
                                        type="radio"
                                        checked={isSelected}
                                        disabled
                                        style={{ marginRight: "10px" }}
                                    />

                                    {opt}

                                    <span style={{ marginLeft: "auto" }}>
                                        {isCorrect && "✅"}
                                        {isSelected && !isCorrect && "❌"}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ))}

                <button style={styles.button} onClick={onRestart}>
                    Làm lại
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
        marginBottom: "10px",
    },

    score: {
        fontSize: "18px",
        marginBottom: "20px",
        fontWeight: "bold",
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
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        marginBottom: "8px",
    },

    correct: {
        background: "#e6f9f0",
        border: "1px solid #2ecc71",
        color: "#2ecc71",
    },

    wrong: {
        background: "#ffe6e6",
        border: "1px solid #e74c3c",
        color: "#e74c3c",
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