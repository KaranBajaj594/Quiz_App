
const quizContainer = document.querySelector('.app_container');
const quizQuestion = document.querySelector('.quiz_questions');
const quizOptions = document.querySelector('.quiz_options');
const quizBtn = document.querySelector('.quiz_btn');
const quizScore = document.querySelector('.scoreCard');
const quizTitle = document.querySelector('.title');
const submitBtn = document.querySelector('.check_submit_btn');
const quizTimer = document.querySelector('.quiz_timer');
const quizFeedback = document.querySelector('.quiz_feedback');

const quizContent = [
    {
        question:"Q1. What does HTML stand for?",
        options: ["High-Level Text Model Language","Home Tool Markup Language","Hyperlink and Text Management Language","Hyper Text Markup Language"],
        answer:"Hyper Text Markup Language"
    },
    {
        question:"Q2. In the context of full-stack development, what does 'MERN' stand for?",
        options: ["My Engineering Resource Network","MongoDB, Express, React, Node.js","Modern Enterprise Resource Network","Microservices, ElasticSearch, RabbitMQ, Nginx"],
        answer:"MongoDB, Express, React, Node.js"
    },
    {
        question:"Q3. Which HTML tag is used to link an external CSS file to an HTML document?",
        options: ["<link>","<script>","<style>","<css>"],
        answer:"<link>"
    },
    {
        question:"Q4. In the context of full-stack development, what does 'CRUD' stand for?",
        options: ["Create, Read, Update, Delete","Centralized Routing and User Design","Coding Rules for Ultimate Deployment","Comprehensive Resource Utilization Design"],
        answer:"Create, Read, Update, Delete"
    },
    {
        question:"Q5. Which CSS property is used to change the color of text in a web page?",
        options: ["text-color","font-color","color","text-style"],
        answer:"color"
    },
    {
        question:"Q6. Which of the following HTML tags is used to create an unordered list in front-end web development?",
        options: ["<ol>","<tr>","<ul>","<dl>"],
        answer:"<ul>"
    },
];

let currentIndex = 0;
let score = 0;
let ifSelected=false;
let timeLeft = 15;
let timeStopper=null;

const startTimer = ()=>{
    timeLeft=15;
    quizTimer.textContent = timeLeft;
    quizTimer.classList.remove("less_time");
    stopTimer();
    timeStopper =  setInterval(()=>{
        timeLeft--;
        quizTimer.textContent = timeLeft;
        if(timeLeft <= 4){
            quizTimer.classList.add("less_time");
        }
        if(timeLeft == -1){
            goNext();
        }
    },1000);
}

const stopTimer = () => {
    clearInterval(timeStopper);
}
const showNextQuestion = ()=>{
    startTimer();
    const eachQuestion = quizContent[currentIndex];
    
    quizQuestion.textContent = eachQuestion.question;

    const eachOption = eachQuestion.options;
    console.log(eachOption);
    eachOption.map((OptionData)=>{
        const optionDiv = document.createElement('div');
        optionDiv.textContent = OptionData;
        optionDiv.classList.add('option_choice');
        quizOptions.appendChild(optionDiv);
        if(OptionData == quizContent[currentIndex].answer){
            optionDiv.classList.add('correct_option');
        }

        optionDiv.addEventListener("click",()=>{
            if(ifSelected == false){
                optionDiv.classList.toggle("isSelected");
                ifSelected=true;
            }
        })
    })
}

const checkAnswer = () =>{
    const optionSelected = document.querySelector(".option_choice.isSelected");
    // console.log(optionSelected);
    if(optionSelected.textContent === quizContent[currentIndex].answer){
        optionSelected.classList.add('correct');
        console.log(optionSelected);
        score++;
    }else{
        const correctOption = document.querySelector(".option_choice.correct_option");
        correctOption.classList.add('correct');
        optionSelected.classList.add('incorrect');
        console.log("Not Correct");
    } 
}

const goNext = () =>{
    quizOptions.textContent="";
    currentIndex++;
    ifSelected=false;
    if(currentIndex < quizContent.length){
       showNextQuestion();
    }else{
     showScore();
     stopTimer();
    }
}

const showScore = () =>{
    quizQuestion.textContent="";
    quizScore.textContent = `You Scored ${score} out of ${quizContent.length}`;
    quizBtn.textContent = "Restart";
    quizTitle.textContent = "Quiz Completed!!"
    submitBtn.textContent="";
    quizTimer.style.display = "none";
    feedBack();
}

const startQuiz = ()=>{
    showNextQuestion();
    startTimer();
}
quizBtn.addEventListener("click",()=>{
    const selectedOption = document.querySelector('.option_choice.isSelected');
    if(quizBtn.textContent != "Restart"){
        if(!selectedOption){
            alert("No Answer Selected");
        }else{
            goNext();
        }
    }else{
        currentIndex=0;
        showNextQuestion();
        quizBtn.textContent = "Next";
        quizScore.textContent="";
        quizTitle.textContent = "Take a Quiz!!";
        score=0;
        const button = document.createElement('button');
        button.classList.add('btn')
        button.textContent="Submit";
        submitBtn.appendChild(button);
        quizTimer.style.display = "flex";
        quizFeedback.textContent = "";
    }
})

submitBtn.addEventListener("click", ()=>{
    checkAnswer();
    stopTimer();
});

const feedBack = ()=>{
    let message="";
    let score_percentage = Math.floor((score/quizContent.length)*100);
    if(score_percentage >= 90){
        message = "Excellent!!"
        quizFeedback.style.color = "green";
    }else if(score_percentage>=70){
        message = "Well Done!!"
        quizFeedback.style.color = "#9aeabc"
    }else if(score_percentage>=50){
        message = "Keep Going!!"
        quizFeedback.style.color = " #ff9393"
    }else{
        message = "Work Hard!!"
        quizFeedback.style.color = "red";
    }
    quizFeedback.textContent = message;
}





