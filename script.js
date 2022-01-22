const quoteElement = document.getElementById('quote')
const messageElement = document.getElementById('message')
const typeValueElement = document.getElementById('typed-value')
const displayHighScore = document.getElementById('score')

window.onload = function(){
    displayHighScore.innerHTML= `High Score: ${localStorage.getItem("High Score")}`;
}

const quotes = ['When you have eliminated all the impossible, whatever remains, however impossible, must be truth.']
let words = [];
let wordIndex = 0;
let startTime = new Date().getTime();

document.getElementById('start').addEventListener('click', () => {
    let quote = quotes[0]
    words = quote.split(" ");
    typeValueElement.style = "display:inline";
    quoteElement.style = "display: block";

    let quoteWords = words.map((word) => `<span>${word} </span>`).join('');

    quoteElement.innerHTML = quoteWords;
    messageElement.innerText = "";
    wordIndex =0;
    quoteElement.childNodes[0].className = 'highlight';
    typeValueElement.focus();
    startTime = new Date().getTime()
});

typeValueElement.addEventListener('input', () => {
   let currentWord = words[wordIndex]
   const typeValue = typeValueElement.value

   if(typeValue.trim() === currentWord && typeValue.endsWith(' ')){
       console.log('you are correct')
       wordIndex += 1
       typeValueElement.value = '';
       quoteElement.childNodes[wordIndex - 1].className = "";
       quoteElement.childNodes[wordIndex].className = "highlight"; 
    }else if (typeValue === currentWord && wordIndex === words.length - 1){
        duration = (new Date().getTime() - startTime)/1000;
        let message = `Congratuation. You finished the project in ${duration} seconds.`
        messageElement.innerText = message;
        typeValueElement.value = "";
        typeValueElement.style = "display:none";

        let highScore = `${duration}`;
        let myHighScore = JSON.stringify(highScore);
        localStorage.setItem("High Score", myHighScore);
        console.log(localStorage);
        let getHighScore = JSON.parse(localStorage.getItem("High Score"));
        
        console.log(getHighScore);
        displayHighScore.innerText = `High Score: ${getHighScore}`;
    }else if (currentWord.startsWith(typeValue)) {
        typeValueElement.className = "";
    }else{
        typeValueElement.className = "error";
    }
});

