import { db, doSnapshot } from '@/firebase';

export default {
  namespaced: true,
  state: {
    cards: [],
  },
  getters: {
    getCardsByColumn: (state) => (column) => {
      return state.cards
        .filter((card) => card.column === column)
        .sort((a, b) => a.order - b.order);
    },
    getNextCardOrder: ({ cards }) => {
      return Math.max(...cards.map((card) => card.order)) + 1;
    },
  },
  mutations: {
    setCards(state, cards) {
      state.cards = cards;
    },
  },
  actions: {
    async getCards({ commit, rootState }) {
      commit('setCards', []);
      await db
        .collection('cards')
        .where('board', '==', rootState.boardModule.board.id)
        .onSnapshot(localSnapshot);

      function localSnapshot(querySnapshot) {
        const cards = doSnapshot(querySnapshot);
        commit('setCards', cards);
      }
    },

    async createCard({ rootState, state, getters }, { column, name }) {
      const ref = db.collection('cards');
      const { id } = ref.doc();
      const card = {
        id,
        name,
        description: 'This is a Card description',
        board: rootState.boardModule.board.id,
        column,
        date: new Date().getTime() + 5 * 24 * 60 * 60 * 1000,
        done: false,
        order: state.cards.length ? getters['getNextCardOrder'] : 0,
      };
      await ref.doc(id).set(card);
    },

    async updateCardMeta(context, card) {
      await db
        .collection('cards')
        .doc(card.id)
        .update({ order: card.order, column: card.column });
    },

    updateCards({ dispatch }, { column, cards }) {
      cards.forEach((card, index) => {
        if (card.order !== index || card.column !== column.id) {
          card.order = index;
          card.column = column.id;
          dispatch('updateCardMeta', card);
        }
      });
    },

    async updateCard(context, card) {
      const [id, key, value] = Object.values(card);
      await db
        .collection('cards')
        .doc(id)
        .update({ [key]: value });
    },

    async deleteCard(context, id) {
      await db.collection('cards').doc(id).delete();
    },
  },
};
