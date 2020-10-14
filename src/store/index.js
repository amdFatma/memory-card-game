import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modal: null,
    isPlaying: false
  },
  getters: {
    modal: state => state.modal,
    isPlaying: state => state.isPlaying
  },
  actions: {
    setModal({ commit }, payload) {
      commit('SET_MODAL', payload);
    },
    clearModal({ commit }) {
      commit('CLEAR_MODAL');
    },
    togglePlay({ commit }, value) {
      commit('TOGGLE_PLAY', value);
    }
  },
  mutations: {
    SET_MODAL(state, payload) {
      state.modal = payload;
    },
    CLEAR_MODAL(state) {
      state.modal = null;
    },
    TOGGLE_PLAY(state) {
      state.isPlaying = !state.isPlaying;
    }
  }
});
