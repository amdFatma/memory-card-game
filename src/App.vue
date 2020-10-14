<template>
  <div id="app">
    <modal-component />
    <router-view />
  </div>
</template>

<script>
export default {
  components: {
    ModalComponent: () =>
      import(/* webpackChunkName: "Modal" */ "@/components/Modal")
  }
};
</script>

<style lang="scss">
@import "main.scss";

#app {
  text-align: center;
}
</style>
