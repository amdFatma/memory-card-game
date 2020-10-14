<template>
  <div class="Modal" v-if="modalMessage">
    <div class="Modal__message"
         @click="closeModal"
         v-html="modalMessage">
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Modal",
  computed: {
    ...mapGetters({
      modalMessage: "modal",
      isPlaying: "isPlaying"
    })
  },
  methods: {
    closeModal() {
      this.$store.dispatch("clearModal");
      this.$store.dispatch("togglePlay");
    }
  }
};
</script>

<style scoped lang="scss">
.Modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;

  &__message {
    @include font(bold, 75, 100);
    color: $color-yellow;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    &__message {
      font-size: 50px;
      line-height: 50px;
    }
  }
}
</style>
