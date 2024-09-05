document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: 2 },
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
        { question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
        { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 1 },
        { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"], answer: 0 },
        { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], answer: 0 }
    ];

    const questionsPerPage = 3;
    let currentPage = 0;
    let score = 0;
    let timer;
    let timeLeft = 60000; // 1 minute in milliseconds (adjust as needed)

    function renderQuestions(page) {
        const questionContainer = document.getElementById("question-container");
        const start = page * questionsPerPage;
        const end = Math.min(start + questionsPerPage, questions.length);

        questionContainer.innerHTML = questions.slice(start, end).map((question, index) => `
            <div class="question-page ${index === 0 ? 'active' : ''}">
                <h3>${question.question}</h3>
                ${question.options.map((option, i) => `
                    <div class="option">
                        <input type="radio" name="option${start + index}" value="${i}" id="option${start + index}-${i}">
                        <label for="option${start + index}-${i}">${option}</label>
                    </div>
                `).join('')}
            </div>
        `).join('');

        document.getElementById("prev-btn").classList.toggle("d-none", page === 0);
        document.getElementById("next-btn").classList.toggle("d-none", end >= questions.length);
        document.getElementById("submit-btn").classList.toggle("d-none", end < questions.length);
    }

    function calculateScore() {
        score = 0;
        questions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="option${index}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) === question.answer) {
                score++;
            }
        });
    }

    function handlePrev() {
        if (currentPage > 0) {
            currentPage--;
            renderQuestions(currentPage);
        }
    }

    function handleNext() {
        if ((currentPage + 1) * questionsPerPage < questions.length) {
            currentPage++;
            renderQuestions(currentPage);
        }
    }

    function handleSubmit() {
        calculateScore();
        document.getElementById("score").innerText = score;
        document.getElementById("total").innerText = questions.length;
        $('#resultModal').modal('show');
    }

    function startTimer() {
        const timerElement = document.getElementById("timer");
        const progressElement = document.getElementById("progress-bar");
        const startTime = Date.now();

        timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            timeLeft = Math.max(0, 60000 - elapsed);
            
            const seconds = Math.floor((timeLeft / 1000) % 60);
            const minutes = Math.floor(timeLeft / 60000);

            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            progressElement.style.width = `${(timeLeft / 60000) * 100}%`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                handleTimeUp();
            }
        }, 1000);
    }

    function handleTimeUp() {
        $('#timeUpModal').modal('show');
        document.getElementById("submit-btn").classList.add("d-none");
    }

    document.getElementById("prev-btn").addEventListener("click", handlePrev);
    document.getElementById("next-btn").addEventListener("click", handleNext);
    document.getElementById("submit-btn").addEventListener("click", handleSubmit);

    renderQuestions(currentPage);
    startTimer();
});
