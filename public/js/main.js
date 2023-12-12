// Dark mode
let lightToggle = document.getElementsByClassName('toggle-light').item(0)
let darkToggle = document.getElementsByClassName('toggle-dark').item(0)

function darkTheme() {
    document.body.className = 'dark-theme';
    darkToggle.classList.remove('display-none')
    lightToggle.classList.add('display-none')
    localStorage.setItem('theme', 'dark')
}

function lightTheme() {
    document.body.className = 'light-theme';
    darkToggle.classList.add('display-none')
    lightToggle.classList.remove('display-none')
    localStorage.setItem('theme', 'light')
}

document.addEventListener('click', function(e) {
    switch (e.target) {
        case lightToggle:
        case lightToggle.firstElementChild:
            darkTheme()
            break;
        case darkToggle:
        case darkToggle.firstElementChild:
            lightTheme()
            break;
    }
})

document.addEventListener('DOMContentLoaded', function() {
    localStorage.getItem('theme') == "light" ? lightTheme() : darkTheme()
})

//
let mainSection = document.getElementsByTagName('main').item(0)
let loginButton = document.getElementById('login')
let usernameInput = document.getElementById('username-input')
let user = {
    name: ''
}
let cards = [
    {
     img: 'public/assets/img/Warriors/1.png',
     name: 'knight'
    },
    {
     img: 'public/assets/img/Warriors/2.png',
     name: 'viking'
    },
    {
     img: 'public/assets/img/Warriors/3.png',
     name: 'knight-sword'
    },
    {
     img: 'public/assets/img/Warriors/4.png',
     name: 'knight-fire'
    },
    {
     img: 'public/assets/img/Warriors/1.png',
     name: 'knight'
    },
    {
     img: 'public/assets/img/Warriors/2.png',
     name: 'viking'
    },
    {
     img: 'public/assets/img/Warriors/3.png',
     name: 'knight-sword'
    },
    {
     img: 'public/assets/img/Warriors/4.png',
     name: 'knight-fire'
    }
 ]
let firstCard;
let secondCard;
let lockBoard = false;


loginButton.addEventListener('click', function() {
    if (usernameInput.value != '') {
        user.name = usernameInput.value
        
        mainSection.innerHTML = ''
        
        setUser(user)
        generateCards()
    }
})

function setUser() {
    let scoreboard = document.getElementById('scoreboard')
    scoreboard.innerHTML = `
    <div>
    ${user.name} 
    </div>
    <div id="timer">
    
    </div>
    `
}


function generateCards() {
    cards.forEach((element) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card-container");
        cardElement.setAttribute("data-name", element.name);
        cardElement.innerHTML = `
            <img class="card back" src='public/assets/img/Warriors/facedown.png' />
            <img class="card front display-none" src=${element.img} />
        `;
        mainSection.appendChild(cardElement)
        cardElement.addEventListener('click', flipCard)
    })
}

function flipCard() {
    if (lockBoard == true) {
        return
    }

    if (!firstCard) {
        firstCard = this;
        firstCard.firstElementChild.classList.add('display-none')
        firstCard.children[1].classList.remove('display-none')
        return
    }
    secondCard = this
    secondCard.firstElementChild.classList.add('display-none')
    secondCard.children[1].classList.remove('display-none')
    lockBoard = true
    matchCards()
}

function matchCards() {
    isMatch = firstCard.getAttribute('data-name') == secondCard.getAttribute('data-name')
    
    if (isMatch) {
        disableCards()
    } else {
        unflipCards();
    } 
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    firstCard.style.opacity = '50%'
    secondCard.removeEventListener("click", flipCard);
    secondCard.style.opacity = '50%'
  
    resetBoard();
  }
  
  function unflipCards() {
    setTimeout(() => {
      firstCard.firstElementChild.classList.remove('display-none')
      firstCard.children[1].classList.add('display-none')
      secondCard.firstElementChild.classList.remove('display-none')
      secondCard.children[1].classList.add('display-none')
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }
  
  


