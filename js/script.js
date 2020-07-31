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
    console.log(this.totalCards)
  }
}

new Memorama();
