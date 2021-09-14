<template>
  <div class="section">
    <h2 class="title">Tableros</h2>
    <create-board />
    <ul class="board-list is-flex-wrap-wrap">
      <li
        class="column is-3 is-tablet-4 is-mobile-12"
        v-for="board in boards"
        :key="board.name"
        @click="openBoard(board.id)"
      >
        <div
          class="board-card box"
          :style="{ backgroundColor: board.backgroundColor }"
        >
          <div class="board-card-title">
            {{ board.name }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import CreateBoard from '@/components/CreateBoard.vue';
export default {
  components: { CreateBoard },
  setup() {
    const store = useStore();
    const router = useRouter();
    
    store.commit('boardModule/setBoard', null);
    const boards = computed(() => store.state.boardModule.boards);

    return {
      boards,
      openBoard: (id) => router.push({ name: 'board', params: { id } }),
    };
  },
};
</script>

<style lang="scss">
.board-list {
  display: flex;
  margin: 0;
  margin-top: 1rem;
  .board-card {
    min-height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
