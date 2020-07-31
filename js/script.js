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

    this.eventsListener();
  }

  eventsListener() {
    window.addEventListener("DOMContentLoaded", () => {
      this.screenLoader();
    });
  }

  async screenLoader() {
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

    let html = "";
    this.totalCards.forEach((card) => {
      html += `<div class="card">
        <img class="card-img" src=${card.src}>
        </div>`;
    });

    this.$cardsContainer.innerHTML = html
  }
}

new Memorama();
 