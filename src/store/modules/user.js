import { firebase, auth } from '@/firebase';
export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    getUserAvatar: (state) => state.user && state.user.photoURL,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    getUser({ commit, dispatch }) {
      return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
          commit('setUser', user);
          if (user) {
            dispatch('boardModule/getBoards', null, { root: true });
          }
          resolve(user);
        });
      });
    },
    async userLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
    },
    async userLogout({ commit }) {
      await auth.signOut();
      commit('setUser', null);
    },
  },
};
