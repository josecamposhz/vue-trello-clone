import { createStore } from 'vuex';
import boardModule from './modules/board';
import columnModule from './modules/column';
import cardModule from './modules/card';
import userModule from './modules/user';

export default createStore({
  actions: {
    async initApp({ dispatch }) {
      await dispatch('userModule/getUser');
    },
    async getBoardData({ dispatch }) {
      dispatch('columnModule/getColumns');
      dispatch('cardModule/getCards');
    },
  },
  modules: { boardModule, columnModule, cardModule, userModule },
});
