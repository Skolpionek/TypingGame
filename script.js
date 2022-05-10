const RANDOM_TEXT_API_URl = 'https://api.quotable.io/random'
const txtDisplay = document.getElementById("text")
const txtInput = document.getElementById("TextInput")
const wpmElement = document.getElementById("wpm")
const wpmnumber = document.getElementById("wpmNumber")
const restart = document.getElementById("restart")
let characters = 0
let time = 0
let isTyping = false
let HowManyTyped = 0

txtInput.addEventListener('input', () =>{
   isTyping = true
   if(HowManyTyped == 0)startTimer()
   HowManyTyped++
   const SpanArray = txtDisplay.querySelectorAll('span')
   const ArrayValue = txtInput.value.split('')
   let correct = true
   SpanArray.forEach((characterSpan, index) =>{
      
      const character = ArrayValue[index]
      if(character == null){
         characterSpan.classList.remove('correct')
         characterSpan.classList.remove('incorrect')
         correct = false
      }
      else if(character === characterSpan.innerText){
         
         characterSpan.classList.add('correct')
         characterSpan.classList.remove('incorrect')
      } else{
         if(characterSpan.innerText != " "){
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
         }
         
      }
      
   })
   wpmCount()
   if(correct) endscreen()
})

function getRandomText(){
   return fetch(RANDOM_TEXT_API_URl)
      .then(response => response.json())
      .then(data => data.content)
}
async function renderText(){
   isTyping = false
   HowManyTyped = 0
   time = 0
   const txt = await getRandomText()
   console.log(txt)
   txtDisplay.innerHTML = ""
   txt.split('').forEach(character => {
      const characterSpan = document.createElement('span')
      
      characterSpan.innerText = character
      txtDisplay.appendChild(characterSpan) 
   });
   txtInput.value = null

}

let startTime
function startTimer(){
   time = 0
   startTime = new Date()
   intervalID = setInterval(() =>{
      // if(isTyping)timerElement.innerText = getTimerTime()
      time =  getTimerTime()
      wpmCount()
   }, 1000)
}
function getTimerTime(){
   return Math.floor((new Date() - startTime) / 1000)
}
function wpmCount(){
   characters = txtInput.value.length
   let wpm = parseInt((characters/5) / (time/60))
   if(time > 0)wpmnumber.innerText = wpm + " WPM"
   console.log("characters:",characters,"time",time)
}
function endscreen(){
   clearInterval(intervalID);
   wpmElement.classList.add("finish")
   restart.classList.remove("disabled")
}
restart.addEventListener("click",()=>{
   window.location.reload(true)
})
renderText()