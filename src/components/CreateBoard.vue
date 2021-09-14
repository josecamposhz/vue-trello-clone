<template>
  <button class="button is-success" @click="open">{{ title }}</button>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input
              v-model="board.name"
              class="input"
              type="text"
              placeholder="Text input"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">BackgroundColor</label>
          <div class="control">
            <input
              v-model="board.backgroundColor"
              class="input"
              type="color"
              placeholder="Select a Background Color"
            />
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save">Guardar</button>
        <button class="button" @click="close">Cancelar</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
export default {
  props: {
    typeAdd: {
      type: Boolean,
      default: true,
    },
  },
  setup({ typeAdd }) {
    const store = useStore();

    const title = computed(() =>
      typeAdd ? 'Crear Tablero' : 'Editar Tablero'
    );
    const isOpen = ref(false);
    const board = ref(
      typeAdd
        ? {
            name: '',
            backgroundColor: '#0067A3',
          }
        : { ...store.state.boardModule.board }
    );
    console.log(board.value);

    return {
      title,
      board,
      isOpen,
      save: () => {
        typeAdd
          ? store.dispatch('boardModule/createBoard', board.value)
          : store.dispatch('boardModule/updateBoard', board.value);
        isOpen.value = false;
      },
      open: () => (isOpen.value = true),
      close: () => (isOpen.value = false),
    };
  },
};
</script>

<style></style>
