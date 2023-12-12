let cards = [
    {src: 'public/assets/img/Warriors/1.png'},
    {src: 'public/assets/img/Warriors/2.png'},
    {src: 'public/assets/img/Warriors/3.png'},
    {src: 'public/assets/img/Warriors/4.png'},
]
cards = cards.concat(cards)

let backCard = {
    src: 'public/assets/img/Warriors/facedown.png'
}

let firstCard;
let secondCard;
let lockBoard = false
let counter = 0
let nav = document.getElementsByClassName('nav').item(0)

function game() {
    let div = document.createElement('div')
    div.classList.add('set-username')
    let input = document.createElement('input')
    let p = document.createElement('p')
    p.innerText = 'Add your username'
    input.setAttribute('placeholder', 'Username')
    div.append(p, input)
    nav.appendChild(div)
    input.addEventListener('keypress', function(e) {
        if (e.key == 'Enter' && input.value != '') {
            div.remove()
            addUsername(input.value)
            setTimer()
            shuffle()
            generateCards()
        }
        
    })
}

function addUsername(inputValue) {
    let div = document.createElement('div')
    div.classList.add('username')
    let p = document.createElement('p')
    p.innerHTML = `<i class="fa-regular fa-user"></i> ` + inputValue
    div.appendChild(p)
    nav.appendChild(div)
}

function setTimer() {
    let divUser = document.getElementsByClassName('username').item(0)
    let p = document.createElement('p')
    p.innerHTML = '<i class="fa-regular fa-clock"></i> '
    let span = document.createElement('span')
    divUser.appendChild(p)
    p.appendChild(span)
    let sec = 1
    let min = 0
    setInterval(() => {
        if (sec > 59) {
            min++
            sec = 0
        }
        span.innerText = `${min}:${sec} sec`
        sec++
    }, 1000);
}

function shuffle() {
    let length = cards.length
    let tmpArray = []
    for (let i = 0; i < length; i++) {
        let random = Math.floor(Math.random() * cards.length)
        tmpArray.push(cards[random])
        cards.splice(random, 1)
    }
    cards = tmpArray
}

function generateCards() {
    let container = document.createElement('div')
    container.classList.add('container')
    
    cards.forEach((element) => {
        // Card container
        let cardDivContainer = document.createElement('div')
        cardDivContainer.classList.add('card-container')
        // Back
        let divBack = document.createElement('div')
        divBack.classList.add('back-card')
        let imgBack = document.createElement('img')
        imgBack.src = backCard.src
        divBack.appendChild(imgBack)
        // Front
        let divFront = document.createElement('div')
        divFront.classList.add('front-card')
        let imgFront = document.createElement('img')
        imgFront.src = element.src
        // Append
        divFront.appendChild(imgFront)
        cardDivContainer.append(divFront, divBack)
        container.appendChild(cardDivContainer)
    })
    document.body.appendChild(container)
    
    let backCardClasses = document.getElementsByClassName('back-card')
    
    Array.from(backCardClasses).forEach((element) => {
    
        element.addEventListener('click', flipCard)
    })
}

function flipCard() {
    if (lockBoard == true) {
        return
    } 

    this.classList.add('flipped')
    this.style.opacity = '0%'
    this.previousElementSibling.classList.add('flipped')

    if (!firstCard) {
        firstCard = this
        return
    }
    

    secondCard = this
    lockBoard = true
    matchCards()
}

function matchCards() {
    let isMatch = firstCard.previousElementSibling.innerHTML == secondCard.previousElementSibling.innerHTML
    console.log({isMatch})
    isMatch == true ? disableCards() : unflipCards()
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.style.opacity = "0%"
    firstCard.previousElementSibling.style.opacity = "50%"
    secondCard.style.opacity = "0%"
    secondCard.previousElementSibling.style.opacity = "50%"
    
    firstCard = null
    secondCard = null
    lockBoard = false
    
    counter++
    if (counter == cards.length / 2) {
        displayResult()
    }
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped')
        firstCard.previousElementSibling.classList.remove('flipped')
        firstCard.style.opacity = '100%'

        secondCard.classList.remove('flipped')
        secondCard.style.opacity = '100%'
        secondCard.previousElementSibling.classList.remove('flipped')

        firstCard = null
        secondCard = null
        lockBoard = false
    }, 1000);
}

function displayResult() {
    let div = document.createElement('div')
    div.classList.add('result')
    let p = document.createElement('p')
    p.innerText = 'You won' 
    div.appendChild(p)
    document.body.insertAdjacentHTML('afterbegin', div.outerHTML)
    setTimeout(() => {
        window.location.reload()
    }, 5000);
}

game()





  
  


