<template>
  <div class="Card" v-if="infos">
    <div class="Card__item Card__item--face">
      <img class="Card__itemImg"
           src="../../static/img/interrogation.png" />
    </div>
    <div class="Card__item Card__item--back">
      <img class="Card__itemImg"
           :src="imagePath(infos.image)" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    infos: {
      type: Object,
      required: true
    }
  },
  methods: {
    imagePath: function(image) {
      return require("../../static/img/monuments/" + image + ".png");
    }
  }
};
</script>

<style scoped lang="scss">
.Card {
  height: 165px;
  width: 120px;
  background: $color-green;

  &.flipped {
    transform: rotateY(180deg);
    box-shadow: -5px 5px 5px $color-graylight;
  }

  &__item {
    height: 140px;
    width: 100px;
    margin: 13px 10px;
    border: 3px solid $color-yellow;
    justify-content: center;
    align-items: center;
    display: flex;
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transition: transform 0.3s ease-in-out;
    transition: transform 0.5s ease-in-out;
    backface-visibility: hidden;

    &--face {
      position: absolute;
      backface-visibility: hidden;

      &:hover {
        .Card__itemImg {
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }
      }
    }

    &--back {
      transform: rotateY(180deg);
      box-sizing: border-box;
      padding: 10px;
      border: none;

      .Card__itemImg {
        width: 80px;
      }
    }

    &Img {
      width: 55px;
    }
  }

  &.matched {
    .Card__item {
      &--back {
        opacity: 0.5;

        .Card__itemImg {
          animation: dance linear 1000ms;
        }
      }
    }
  }

  @media (max-width: 768px) {
    height: 120px;
    width: 80px;

    &__item {
      height: 120px;
      width: 80px;
      margin: auto;

      &Img {
        width: 40px;
      }

      &--back {
        .Card__itemImg {
          width: 60px;
        }
      }
    }
  }

  @keyframes dance {
    0%,
    100% {
      transform: rotate(0);
    }

    25% {
      transform: rotate(-30deg);
    }

    75% {
      transform: rotate(30deg);
    }
  }
}
</style>
