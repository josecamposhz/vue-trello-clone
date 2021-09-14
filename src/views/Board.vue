<template>
  <div
    v-if="board"
    class="board-section"
    :style="{ backgroundColor: board.backgroundColor }"
  >
    <header>
      <h2 class="title">{{ board.name }}</h2>
      <div>
        <create-board :typeAdd="false" />
        <button class="button is-danger ml-2" @click="deleteBoard">
          Eliminar Tablero
        </button>
      </div>
    </header>
    <div class="board-wrapper">
      <draggable v-model="columns" class="board" item-key="key" group="columns">
        <template #item="{ element }">
          <trello-column :column="element" />
        </template>
      </draggable>
      <create-column />
    </div>
  </div>
  <h2 v-else class="title">Tablero no encontrado</h2>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import draggable from 'vuedraggable';
import CreateColumn from '@/components/CreateColumn.vue';
import CreateBoard from '@/components/CreateBoard.vue';

export default {
  components: { draggable, CreateColumn, CreateBoard },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const board = computed(() => store.state.boardModule.board);
    const columns = computed({
      get: () => store.getters['columnModule/getColumns'],
      set: (value) => store.dispatch('columnModule/updateColumns', value),
    });

    return {
      board,
      columns,
      deleteBoard: () => {
        const status = window.confirm('¿Estás seguro de eliminar el Tablero?');
        if (status) {
          store.dispatch('boardModule/deleteBoard', board.value.id);
          router.push({ name: 'boards' });
        }
      },
    };
  },
};
</script>

<style lang="scss">
.board-section {
  min-height: calc(100vh - 3.5rem);
  overflow-x: scroll;
  padding: 1rem;
  header {
    display: flex;
    justify-content: space-between;
  }
}
.board-wrapper,
.board {
  display: flex;
  flex-direction: row;
}
.board {
  gap: 1rem;
}
</style>
