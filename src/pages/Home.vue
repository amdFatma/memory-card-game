<template>
  <div class="Home">
    <h1 class="Home__title">
      Memory Card Game
    </h1>
    <div class="Home__container">
      <div class="Home__containerDetails">
        <div class="Home__containerInfo">
          Time <span>{{ timer }}</span>
        </div>
        <div class="Home__containerInfo">
          Flips <span>{{ flips }}</span>
        </div>
      </div>
      <card-component
        class="Home__containerCards"
        v-for="(cardItem, index) in memoryCards"
        :key="index"
        :infos="cardItem"
        :class="{'flipped': cardItem.isFlipped, 'matched' : cardItem.isMatched }"
        @click.native="flipCard(cardItem)"
      />
    </div>
  </div>
</template>

<script>
import { cardsList } from "@/js/cardsList";
import { mapGetters } from "vuex";
import Vue from "vue";

const timerGame = 60;

export default {
  name: "Home",
  data() {
    return {
      memoryCards: cardsList,
      flippedCards: [],
      timer: timerGame,
      flips: 0,
      timerRefresh: null
    };
  },
  components: {
    CardComponent: () => import(/* webpackChunkName: "Card" */ "@/components/Card")
  },
  computed: {
    ...mapGetters({
      modal: "modal",
      isPlaying: "isPlaying"
    })
  },
  watch: {
    isPlaying: {
      handler(newValue) {
        if (newValue) {
          this.resetGame();
        }
      },
      immediate: true
    }
  },
  created: function() {
    this.$store.dispatch("setModal", {message: "Click to play"});
  },
  beforeDestroy() {
    clearInterval(this.timerRefresh);
  },
  methods: {
    shuffleCards: function() {
      for (let i = cardsList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsList[i], cardsList[j]] = [cardsList[j], cardsList[i]];
      }
      return cardsList;
    },
    flipCard: function(card) {
      if (this.canFlipCard(card)) {
        Vue.set(card, "isFlipped", true);
        if (this.flippedCards.length < 2) {
          this.flippedCards.push(card);
        }
        if (this.flippedCards.length === 2) {
          this.checkCardMatch();
        }
      }
    },
    canFlipCard(card) {
      return card && !card.isMatched && !this.flippedCards.includes(card);
    },
    checkCardMatch() {
      setTimeout(() => {
        if (this.flippedCards[0].id === this.flippedCards[1].id) {
          this.flippedCards.forEach(card => (card.isMatched = true));
          this.flips++;
          if (this.flips === 8) {
            this.$store.dispatch("setModal", {message: "Victory <br/> click to play"});
            clearInterval(this.timerRefresh);
          }
        } else {
          this.flippedCards.forEach(card => (card.isFlipped = false));
        }
        this.flippedCards = [];
      }, 500);
    },
    startCountDown: function() {
      this.timerRefresh = setInterval(() => {
        this.timer--;
        if(this.timer === 0) {
          this.gameOver();
        }
      }, 1000);
    },
    gameOver: function() {
      clearInterval(this.timerRefresh);
      this.$store.dispatch("setModal", {message: "Game over <br/> click to play"});
    },
    resetGame: function() {
      this.timer = timerGame;
      this.flips = 0;
      this.flippedCards = [];
      this.memoryCards = [...this.shuffleCards()];
      this.memoryCards.forEach((card) => {
        Vue.set(card, 'isFlipped',false);
        Vue.set(card, 'isMatched',false);
      });
      this.startCountDown();
      this.$store.dispatch("togglePlay");
    }
  }
};
</script>

<style scoped lang="scss">
.Home {
  &__title {
    @include font(bold, 40);
    color: $color-green;
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-gap: 20px;
    margin-top: 40px;
    justify-content: center;
    perspective: 300px;

    &Details {
      grid-column: 1 / -1;
      display: flex;
      justify-content: space-between;
    }

    &Cards {
      transform-style: preserve-3d;
      transition: all 0.3s linear;
    }

    &Info {
      @include font(semiBold, 30);
      color: $color-gray;
    }
  }

  @media (max-width: 768px) {
    &__container {
      grid-template-columns: repeat(2, auto);

      &Details {
        flex-direction: column;
      }
    }
  }
}
</style>
