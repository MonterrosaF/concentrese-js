class Memorama {
  constructor() {
    this.totalCards = [];
    this.Cardsnumber = 0;
    this.cardVerifier = [];
    this.errors = 0;
    this.difficultyLevel = "";
    this.correctsImages = [];
    this.pusherCards = [];

    this.$generalContainer = document.querySelector(".general-container");
    this.$cardsContainer = document.querySelector(".cards-container");
    this.$lockedScreen = document.querySelector(".locked-screen");
    this.$message = document.querySelector(".message");
    this.$errorContainer = document.createElement("div");

    this.eventsListener();
  }

  eventsListener() {
    window.addEventListener("DOMContentLoaded", () => {
      this.screenLoader();
    });
  }

  async screenLoader() {
    let html = "";
    const response = await fetch("../memo.json");
    const data = await response.json();
    this.totalCards = data;

    if (this.totalCards.length > 0) {
      this.totalCards.sort(order);
      function order(a, b) {
        return Math.random() - 0.5;
      }
    }
    this.Cardsnumber = this.totalCards.length;

    this.totalCards.forEach((card) => {
      html += `<div class="card">
        <img class="card-img" src=${card.src}>
        </div>`;
    });

    this.$cardsContainer.innerHTML = html;
    this.startGame();
    this.containerError();
  }

  startGame() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", (event) => {
        this.clickCard(event);
      });
    });
  }

  clickCard(event) {
    this.flipCardEfect(event);
    let card = event.target;
    let sourceImage = event.target.childNodes[1].attributes[1].value;
    this.cardVerifier.push(sourceImage);
    this.pusherCards.unshift(card);
    this.compareCards();
  }

  flipCardEfect(event) {
    event.target.style.backgroundImage = "none";
    event.target.style.backgroundColor = "white";
    event.target.childNodes[1].style.display = "block";
  }

  setSuccessfulPair(successfulPairs) {
    successfulPairs.forEach((card) => {
      card.classList.add("success");
      this.correctsImages.push(card);
      this.winning();
    });
  }

  reverseCard(cards) {
    cards.forEach((card) => {
      setTimeout(() => {
        card.style.backgroundImage = "url(../img/cover.jpg)";
        card.childNodes[1].style.display = "none";
      }, 1000);
    });
  }

  compareCards() {
    if (this.cardVerifier.length == 2) {
      if (this.cardVerifier[0] === this.cardVerifier[1]) {
        this.setSuccessfulPair(this.pusherCards);
      } else {
        this.reverseCard(this.pusherCards);
        this.errors++;
        this.errorIncrement();
        this.losing();
      }
      this.cardVerifier.splice(0);
      this.pusherCards.splice(0);
    }
  }

  winning() {
    if (this.correctsImages.length === this.Cardsnumber) {
      setTimeout(() => {
        this.$lockedScreen.style.display = "block";
        this.$message.innerText = "¡Felicidades, Ganaste!";
      }, 1000);
      setTimeout(() => {
        location.reload();
      }, 4000);
    }
  }

  losing() {
    if (this.errors === 5) {
      setTimeout(() => {
        this.$lockedScreen.style.display = "block";
        // this.$message.innerText = "¡Felicidades, Ganaste!";
      }, 1000);
      setTimeout(() => {
        location.reload();
      }, 4000);
    }
  }

  errorIncrement() {
    this.$errorContainer.innerText = `Errores: ${this.errors}`;
  }

  containerError() {
    this.$errorContainer.classList.add("error");
    this.errorIncrement();
    this.$generalContainer.appendChild(this.$errorContainer);
  }
}

new Memorama();
