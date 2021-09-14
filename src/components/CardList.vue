<template>
  <draggable v-model="cards" group="cards" item-key="id" class="list-cards">
    <template #item="{ element }">
      <trello-card :card="element" />
    </template>
  </draggable>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import draggable from 'vuedraggable';
export default {
  components: { draggable },
  props: {
    column: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const cards = computed({
      get: () => store.getters['cardModule/getCardsByColumn'](props.column.id),
      set: (value) =>
        store.dispatch('cardModule/updateCards', {
          column: props.column,
          cards: value,
        }),
    });
    return {
      cards,
    };
  },
};
</script>

<style></style>
