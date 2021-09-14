<template>
  <nav
    class="navbar is-transparent"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{ name: 'boards' }">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        @click="isActive = !isActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': isActive }"
    >
      <div class="navbar-start">
        <router-link v-if="user" :to="{ name: 'boards' }" class="navbar-item">
          Tableros
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          {{ user && user.displayName }}
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <button v-if="user" class="button is-primary" @click="userLogout">
              <strong>Log out</strong>
            </button>
            <button v-else class="button is-primary" @click="userLogin">
              <strong>Log in</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const isActive = ref(false);
    const user = computed(() => store.state.userModule.user);

    return {
      isActive,
      user,

      userLogin: async () => {
        try {
          await store.dispatch('userModule/userLogin');
          router.push('/boards');
        } catch (error) {
          console.error(error);
        }
      },
      userLogout: async () => {
        try {
          await store.dispatch('userModule/userLogout');
          router.push('/');
        } catch (error) {
          console.error(error);
        }
      },
    };
  },
};
</script>

<style>
.is-transparent {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
