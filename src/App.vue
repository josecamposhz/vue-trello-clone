<template>
  <main id="main-container" :style="{ backgroundColor: backgroundColor }">
    <core-navbar />
    <router-view />
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState({
      board: (state) => state.boardModule.board,
    }),
    backgroundColor() {
      return this.board ? this.board.backgroundColor : '#FAFBFC';
    },
  },
  methods: {
    ...mapActions(['initApp']),
  },
  mounted() {
    this.initApp();
  },
};
</script>

<style>
@import 'bulma/css/bulma.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#main-container {
  min-height: 100vh;
}
</style>
