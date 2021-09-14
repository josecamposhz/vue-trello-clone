<template>
  <div class="px-4">
    <div v-if="isAdding" class="is-flex is-flex-direction-column">
      <input
        v-model="newColumn"
        class="input"
        placeholder="Introduzca un título para esta lista"
        style="width: 300px"
        v-focus
        @keypress.enter="addColumn"
      />
      <div class="mt-2 is-flex is-justify-content-center is-align-items-center">
        <button class="button is-primary mr-2" @click="addColumn">
          Añadir lista
        </button>
        <button class="delete is-large" @click="toogleAdding"></button>
      </div>
    </div>
    <button
      v-else
      class="button is-primary"
      style="width: 300px; min-width: 300px"
      @click="toogleAdding"
    >
      Añada otra lista
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();

    async function createColumn(name) {
      try {
        await store.dispatch('columnModule/createColumn', name);
      } catch (error) {
        console.error(error.message);
      }
    }

    const isAdding = ref(false);
    const newColumn = ref('');

    return {
      isAdding,
      newColumn,
      toogleAdding: () => (isAdding.value = !isAdding.value),
      addColumn: () => {
        createColumn(newColumn.value);
        newColumn.value = '';
        isAdding.value = false;
      },
    };
  },
};
</script>

<style lang="scss"></style>
