import { db, doSnapshot } from '@/firebase';
export default {
  namespaced: true,
  state: {
    columns: [],
  },
  getters: {
    getColumns: (state) => state.columns.sort((a, b) => a.order - b.order),
    getNextColumnOrder: (state) => {
      return Math.max(...state.columns.map((column) => column.order)) + 1;
    },
  },
  mutations: {
    setColumns(state, columns) {
      state.columns = columns;
    },
  },
  actions: {
    // Column actions
    async getColumns({ rootState, commit }) {
      commit('setColumns', []);
      await db
        .collection('columns')
        .where('board', '==', rootState.boardModule.board.id)
        .onSnapshot(localSnapshot);

      function localSnapshot(querySnapshot) {
        const columns = doSnapshot(querySnapshot);
        commit('setColumns', columns);
      }
    },

    async createColumn({ rootState, state, getters }, name) {
      const ref = db.collection('columns');
      const { id } = ref.doc();
      const column = {
        id,
        name,
        board: rootState.boardModule.board.id,
        order: state.columns.length ? getters['getNextColumnOrder'] : 0,
      };
      await ref.doc(id).set(column);
    },

    updateColumns({ dispatch }, columns) {
      columns.forEach((column, index) => {
        if (column.order !== index) {
          column.order = index;
          dispatch('updateColumnOrder', column);
        }
      });
    },

    async updateColumnOrder(context, column) {
      await db
        .collection('columns')
        .doc(column.id)
        .update({ order: column.order });
    },

    async updateColumnName(context, { id, name }) {
      await db.collection('columns').doc(id).update({ name });
    },

    deleteColumns({ state, dispatch }) {
      state.columns.forEach((col) => dispatch('deleteColumn', col.id));
    },

    async deleteColumn(context, id) {
      await db.collection('columns').doc(id).delete();
      const cards = await db.collection('cards').where('column', '==', id);
      cards.get().then(function (querySnapshot) {
        querySnapshot.forEach((doc) => doc.ref.delete());
      });
    },
  },
};
