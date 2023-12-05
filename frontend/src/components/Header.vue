<template>
  <header class="z-10 py-4 bg-gray-800 border-b border-gray-700">
    <div class="container flex items-center justify-between h-full px-6 mx-auto text-purple-300">

      <!-- Mobile hamburger -->
      <button class="p-1 mr-5 -ml-1 rounded-md md:hidden"
        v-on:click="toggleSideMenu" aria-label="Menu">
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </button>

      <!-- Search input -->
      <div class="flex justify-center flex-1 lg:mr-32">
        <div class="relative w-full max-w-xl mr-6 text-purple-500">
          <div class="absolute inset-y-0 flex items-center pl-2">
            <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"></path>
            </svg>
          </div>
          <form>
            <input ref="search"
              class="w-full pl-8 py-2 text-sm border-0 rounded-md bg-gray-700 text-gray-200 focus:placeholder-gray-500 focus:border-purple-300 focus:outline-none"
              type="text" placeholder="Search for projects" aria-label="Search" v-model="searchItem" />
          </form>
        </div>
      </div>
      <ul v-if="loggedIn" class="flex items-center flex-shrink-0 space-x-6">

        <!-- Profile menu -->
        <li class="relative">
          <button class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
            v-on:click="toggleProfileMenu" @keydown.escape="toggleProfileMenu" aria-label="Account" aria-haspopup="true">
            <div class="bg-purple-500 w-10 h-10 rounded-full"><a class="text-2xl font-semibold text-white"></a></div>
          </button>
          <template v-if="isProfileMenuOpen">
            <ul class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-400 rounded-md bg-gray-700" aria-label="submenu">
              <li class="flex" v-on:click="logout">
                <a class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold rounded-md hover:bg-gray-800 hover:text-gray-300"
                  href="/">
                  <svg class="w-4 h-4 mr-3" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
                    </path>
                  </svg>
                  <span>Se déconnecter</span>
                </a>
              </li>
            </ul>
          </template>
        </li>
      </ul>
      <ul v-else class="flex items-center flex-shrink-0 space-x-3">
        <RouterLink to="/login"
          class="px-3 py-1 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
          Connexion
        </RouterLink>
        <RouterLink to="/register"
          class="px-3 py-1 text-sm font-medium leading-5 text-white bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700">
          Inscription
        </RouterLink>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useStore } from "vuex";
import { RouterLink, useRouter } from "vue-router";

const emits = defineEmits(['openSideMenu'])

const isProfileMenuOpen = ref(false);
const isNotificationsMenuOpen = ref(false);
const isSideMenuOpen = ref(false);
const dark = ref(false);
const store = useStore()
const router = useRouter()

const loggedIn = computed(() => store.getters.loggedIn);


function toggleTheme() {
  dark.value = !dark.value;

  const lsDark = localStorage.getItem('theme')

  if (lsDark !== 'dark') {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const search = ref(null)
const searchItem = ref('')
const shortcut = ref("")

function toggleSideMenu() {
  return emits('openSideMenu');
}

function toggleProfileMenu() {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
}

function toggleNotificationsMenu() {
  isNotificationsMenuOpen.value = !isNotificationsMenuOpen.value;
}

function searchShortcut(e: KeyboardEvent) {
  if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()

    // @ts-ignore
    search.value.focus()
  }
}

function logout() {
  store.dispatch('logout')
  router.push({ name: 'Login' });
}

onMounted(() => {
  document.addEventListener('keydown', searchShortcut)
})
onUnmounted(() => {
  document.removeEventListener('keydown', searchShortcut)
})
</script>