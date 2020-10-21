const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const explanation = document.getElementById('panel')
const indexincrease = 1;
const MAX_QUESTIONS = 10;

let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuestions = [];
let index = -1;
let questions = [];


fetch('questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });


//REVEAL EXPLANATION

function revealExplanation() {
	explanation.style.display="block" 
}


startGame = () => {
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};



// NEW QUESTION    
getNewQuestion = (s) => {
	
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign('/index.html');
    }
 
    
// random question index : Math.floor(Math.random() * availableQuestions.length)

    incrementIndex(indexincrease)
    const questionIndex = index;    
	currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    progressText.innerText = `Question ${index+1}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter++ / MAX_QUESTIONS) * 100}%`;

// availableQuestions[questionIndex].question

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    //REMOVE CHOICE COLORS
    choice.parentElement.classList.remove('incorrect','correct');
    
	
	panel.innerText = currentQuestion.explanation;
    explanation.style.display = "none"

    

});

 // REMOVE THE QUESTION TESTED 
  //  availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    


};//newQuestion()End



// PREVIOUS QUESTION
getPrevQuestion = () => {

    decrementIndex(indexincrease)
    
    progressText.innerText = `Question ${index+1}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter-- / MAX_QUESTIONS) * 100}%`;

    const previousquestionIndex = index;
    prevQuestion = questions[previousquestionIndex];
    question.innerText = prevQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = prevQuestion['choice' + number]; 
    choice.parentElement.classList.remove('incorrect','correct');
    });

    panel.innerText = prevQuestion.explanation;
    explanation.style.display = "none";

    acceptingAnswers = false;
    

}//getprevQuestion()End


choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
		const correctAnswer = currentQuestion.answer;
		
        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';


        selectedChoice.parentElement.classList.add(classToApply);
		
		const rightChoice  = document.getElementById(correctAnswer)
		
		
		// HIGHLIGHT CORRECT ANSWER IF WRONG CHOICE CHOSEN
		if (selectedAnswer != correctAnswer) {
		rightChoice.parentElement.classList.add('correct');
		revealExplanation()	
		}

	
		// REVEAL THE EXPLANATION IF WRONG ANSWER CHOSEN
/*		if (selectedAnswer != correctAnswer){
			explanation.style.display = "block"
		}
*/

	// REVEAL THE EXPLANATION IF CORRECT ANSWER CHOSEN
/*		if (selectedAnswer == correctAnswer){
			explanation.style.display = "block"
		}
*/		


  });
}); //CHOICE END



incrementIndex = (index1) => {
    index += index1;
}

decrementIndex = (index1) => {
    index -= index1;
}

