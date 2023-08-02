const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const displayText = document.getElementById("display-text");
const typeInput = document.getElementById("type-input");
const correctSound = new Audio("./sound/correct.mp3");
const incorrectSound = new Audio("./sound/incorrect.mp3");
const chergeSound = new Audio("./sound/cherge.mp3");
const timer = document.getElementById("timer");
const chergeMeter = document.getElementById("cherge-box");

let questArray;
let questArraySpan;

displayQuest();

typeInput.addEventListener("input", function(){
  correctCheck();
});

/* 1回正解したらチャージが1溜まる */


/* ランダムな文章を取得する */
function getRandomSentence() {
  return fetch(RANDOM_SENTENCE_URL_API).then((responce) => responce.json()).then((data) => data.content);
}

/* ランダムな文章を表示する*/
async function displayQuest(){
 let quest = await getRandomSentence();
  questArray = quest.split("");
  displayText.innerText = "";
  typeInput.value = "";
  questArray.forEach((character,index) => {
    questArraySpan = document.createElement("span");
    questArraySpan.innerText = character;
    questArraySpan.setAttribute('id', 'index' + index);
    displayText.appendChild(questArraySpan);
  });
  timerSet();
}

/* 入力されたテキストを取得して、ランダムな文章と比較して判定する */
let clear;
function correctCheck(){
  let inputText = typeInput.value;
  let inputTextArray = inputText.split("");
  console.log(inputTextArray);
  questArray.forEach((questCharacter, index) => {
    if (inputTextArray[index] == null ) {
      document.getElementById("index" + index).classList.remove("correct");
      document.getElementById("index" + index).classList.remove("incorrect");
      clear = false;
    } else if (inputTextArray[index] == questCharacter ) {
      document.getElementById("index" + index).classList.add("correct");
      document.getElementById("index" + index).classList.remove("incorrect");
      // correctSound.play();
      clear = true;
    } else {
      document.getElementById("index" + index).classList.add("incorrect");
      document.getElementById("index" + index).classList.remove("correct");
      incorrectSound.play();
      inputTextArray.splice(index, 1);
      // typeInput.value = inputTextArray;
      typeInput.value = "";
      inputTextArray.forEach(inputText => {
        typeInput.value = typeInput.value + inputText;
      });
      clear = false;
    }
  });
  if (clear == true) {
    chergeSound.play();
    displayQuest();
    chergePower();
  }
}

/* 制限時間を過ぎたら次の問題を表示する */
let countDown = null;
function timerSet() {
  let setTime = 40;
  timer.innerText = setTime;
  let nowTime = new Date();
  if (countDown) {
    clearInterval(countDown);
  }
  countDown = setInterval(function(){
    let countTime = Math.floor((new Date() - nowTime) / 1000);
    let time = setTime - countTime;
    timer.innerText = time;
    if (timer.innerText <= 0) {
      clearInterval(countDown);
      displayQuest();
    }
  },1000);
}

/* 正解したらパワーをチャージする */
function chergePower() {
  let chergeOne = document.createElement("span");
  chergeOne.animate(
    [
      { width: '0' },
      { width: 'calc(100% / 5)' }
    ],
    {
      duration: 1000,
    }
  );
  chergeMeter.appendChild(chergeOne);
}


