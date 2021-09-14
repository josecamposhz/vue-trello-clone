import { db, doSnapshot } from '@/firebase';

export default {
  namespaced: true,
  state: {
    boards: [],
    board: null,
    error: '',
  },
  mutations: {
    setBoards(state, boards) {
      state.boards = boards;
    },
    setBoard(state, board) {
      state.board = board;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    // Board actions
    async createBoard({ rootState }, { name, backgroundColor }) {
      const ref = db.collection('boards');
      const { id } = ref.doc();
      await ref.doc(id).set({
        id,
        name,
        backgroundColor,
        user: rootState.userModule.user.uid,
      });
    },

    async getBoards({ rootState, commit }) {
      await db
        .collection('boards')
        .where('user', '==', rootState.userModule.user.uid)
        .onSnapshot(localSnapshot);

      function localSnapshot(querySnapshot) {
        const boards = doSnapshot(querySnapshot);
        commit('setBoards', boards);
      }
    },

    async getBoard({ commit, dispatch }, id) {
      const board = await db.collection('boards').doc(id).get();

      if (!board.exists) {
        commit('setBoard', null);
        commit('setError', 'No existe');
      } else {
        commit('setBoard', { id: board.id, ...board.data() });
        dispatch('getBoardData', null, { root: true });
      }
    },

    async updateBoard({ commit }, board) {
      commit('setBoard', board);
      await db.collection('boards').doc(board.id).update(board);
    },

    async deleteBoard({ dispatch }, id) {
      await db.collection('boards').doc(id).delete();
      dispatch('columnModule/deleteColumns', null, { root: true });
    },
  },
};
