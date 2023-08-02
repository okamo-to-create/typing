const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const displayText = document.getElementById("display-text");
const typeInput = document.getElementById("type-input");
const correctSound = new Audio("./sound/correct.mp3");
const incorrectSound = new Audio("./sound/incorrect.mp3");

const sourceArray = [
  "aaabbb",
  "bbbtyughj",
  "ccccvbnm",
  "qwertyu",
  "asdfghj",
  "zxccvbnm"
];

let questArray;
let questArraySpan;

displayQuest();

typeInput.addEventListener("input", function(){
  correctCheck();
});

function getRandomSentence() {
  let num = getRandomInt();
  return sourceArray[num];
}

function getRandomInt() {
  return Math.floor(Math.random() * sourceArray.length);
}

/* ランダムな文章を表示する*/
function displayQuest(){
  let quest = getRandomSentence();
  questArray = quest.split("");
  questArray.forEach((character,index) => {
    questArraySpan = document.createElement("span");
    questArraySpan.innerText = character;
    questArraySpan.setAttribute('id', 'index' + index);
    console.log(questArraySpan);
    displayText.appendChild(questArraySpan);
    // questArraySpan.classList.add("correct");
  });
}

/* 入力されたテキストを取得して、ランダムな文章と比較して判定する */
function correctCheck(){
  let inputText = typeInput.value;
  let inputTextArray = inputText.split("");
  console.log(inputTextArray);
  questArray.forEach((questCharacter, index) => {
    if (inputTextArray[index] == null ) {
      document.getElementById("index" + index).classList.remove("correct");
      document.getElementById("index" + index).classList.remove("incorrect");
    } else if (inputTextArray[index] == questCharacter ) {
      document.getElementById("index" + index).classList.add("correct");
      document.getElementById("index" + index).classList.remove("incorrect");
      // correctSound.play();
    } else {
      document.getElementById("index" + index).classList.add("incorrect");
      document.getElementById("index" + index).classList.remove("correct");
      incorrectSound.play();
      inputTextArray.splice(index, 1);
      typeInput.value = inputTextArray;
      typeInput.value = typeInput.value.replace(/,/g,"");
    }
  });
}
/*
function correctCheck(){
  let inputText = typeInput.value;
  let inputTextArray = inputText.split("");
  console.log(inputTextArray);
  inputTextArray.forEach((inputCharacter, index) => {
    if (questArray[index] == inputCharacter ) {
      document.getElementById("index" + index).classList.add("correct");
      document.getElementById("index" + index).classList.remove("incorrect");
      // correctSound.play();
    } else {
      document.getElementById("index" + index).classList.add("incorrect");
      document.getElementById("index" + index).classList.remove("correct");
      // incorrectSound.play();
    }
  });
  
}
*/


