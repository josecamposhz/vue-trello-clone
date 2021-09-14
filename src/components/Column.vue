<template>
  <div class="list-wrapper">
    <div class="list">
      <div class="list-header">
        <input
          ref="target"
          v-if="isEditting"
          v-model="listName"
          class="list-header-input input"
          type="text"
          @keypress.enter="updateColumnName"
        />
        <h2 v-else class="list-header-name" @click="isEditting = true">
          {{ column.name }}
        </h2>
        <div
          class="dropdown"
          :class="{ 'is-active': dropdown }"
          @mouseenter="dropdown = true"
          @mouseleave="dropdown = false"
        >
          <div class="dropdown-trigger">
            <span class="list-header-options material-icons"> more_horiz </span>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a href="#" class="dropdown-item" @click="deleteColumn">
                Eliminar Lista
              </a>
            </div>
          </div>
        </div>
      </div>
      <card-list :column="column" />
      <div class="list-events">
        <div
          v-if="isAdding"
          class="is-flex is-flex-wrap-wrap is-align-items-center"
        >
          <input
            v-model="newCard"
            class="input mb-2"
            placeholder="Introduzca un título para esta tarjeta..."
            style="resize: none"
            v-focus
            @keypress.enter="addCard"
          />
          <button class="button is-primary mr-2" @click="addCard">
            Añadir tarjeta
          </button>
          <button class="delete is-large" @click="toogleAdding"></button>
        </div>
        <button v-else class="button is-white" @click="toogleAdding">
          Añada una tarjeta
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { onClickOutside } from '@vueuse/core';
import CardList from './CardList.vue';
export default {
  props: {
    column: {
      type: Object,
      required: true,
    },
  },
  components: {
    CardList,
  },
  setup(props) {
    const store = useStore();

    const target = ref(null);
    const listName = ref(props.column.name);
    const isEditting = ref(false);
    const dropdown = ref(false);

    const isAdding = ref(false);
    const newCard = ref('');

    async function updateColumnName() {
      try {
        isEditting.value = false;
        await store.dispatch('columnModule/updateColumnName', {
          id: props.column.id,
          name: listName.value,
        });
      } catch (error) {
        console.error(error.message);
      }
    }

    onClickOutside(target, (event) => updateColumnName());

    return {
      dropdown,
      newCard,
      target,
      listName,
      isEditting,
      isAdding,
      updateColumnName,
      toogleAdding: () => {
        isAdding.value = !isAdding.value;
        if (isAdding.value) {
          // document.getElementByName().focus();
        }
      },
      addCard: () => {
        store.dispatch('cardModule/createCard', {
          column: props.column.id,
          name: newCard.value,
        });
        newCard.value = '';
        isAdding.value = false;
      },
      deleteColumn: (id) => {
        const status = window.confirm('¿Estás seguro de eliminar la Lista?');
        if (status) {
          store.dispatch('columnModule/deleteColumn', props.column.id);
        }
      },
    };
  },
};
</script>

<style lang="scss">
.list-wrapper {
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  margin: 0 4px;
  vertical-align: top;
  white-space: nowrap;
  width: 280px;
  min-width: 280px;
  .list {
    padding: 0.6rem;
    padding-top: 0.4rem;
    background-color: #ebecf0;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    white-space: normal;
    .list-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-align: left;
      .list-header-name {
        --py: calc(0.5em - 1px);
        --px: calc(0.75em - 1px);
        font-weight: 600;
        width: 100%;
        padding: var(--py) var(--px);
      }
      .list-header-options {
        cursor: pointer;
        border-radius: 4px;
        padding: 0.4rem;
        font-size: 1.3rem;
        &:hover {
          background-color: rgba(0, 0, 0, 0.15);
        }
      }
    }
    .list-cards {
      display: flex;
      flex-direction: column;
      padding-bottom: 0.5rem;
      gap: 0.5rem;
    }
    .list-events {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
</style>
