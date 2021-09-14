<template>
  <input
    ref="target"
    v-if="isEditting"
    v-model="cardText"
    class="input"
    type="text"
    @keyup.enter="updateCard"
  />
  <div v-else class="trello-card">
    {{ card.name }}
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { onClickOutside } from '@vueuse/core';
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    const cardText = ref<string>(props.card.name);
    const isEditting = ref<boolean>(false);
    const target = ref(null);

    async function updateCard() {
      try {
        isEditting.value = false;
        await store.dispatch('cardModule/updateCard', {
          id: props.card.id,
          key: 'name',
          value: cardText.value,
        });
      } catch (error) {
        console.error(error.message);
      }
    }

    onClickOutside(target, (event) => {
      isEditting.value = false;
      updateCard();
    });

    return {
      target,
      cardText,
      isEditting,
      updateCard,
    };
  },
};
</script>

<style>
.trello-card {
  background-color: white;
  padding: 0.5rem;
  width: 100%;
  border-radius: 4px;
  text-align: left;
}
</style>
