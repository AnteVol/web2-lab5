A

<template>
  <div class="app">
    <nav>
      <h1>Notes</h1>
      <div class="nav-links">
        <router-link to="/" class="nav-link">
          Home
        </router-link>
        <router-link to="/new-note" class="nav-link">
          New note
        </router-link>
      </div>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    return {
      currentYear
    }
  }
})
</script>
<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
nav {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1 {
  margin: 0;
  color: #42b983;
  font-size: 1.8rem;
}
.nav-links {
  display: flex;
  gap: 20px;
}
.nav-link {
  text-decoration: none;
  color: #2c3e50;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.2s;
}
.nav-link:hover {
  background-color: #f5f5f5;
}
.nav-link.router-link-active {
  color: #42b983;
  font-weight: 500;
}
main {
  flex: 1;
}
footer {
  margin-top: 40px;
  padding: 20px 0;
  border-top: 1px solid #eee;
  text-align: center;
  color: #666;
}
@media (max-width: 600px) {
  nav {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  .nav-links {
    justify-content: center;
  }
}
</style>