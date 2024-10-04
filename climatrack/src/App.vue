<script setup>
import AppHeaderMenu from "./components/AppHeaderMenu.vue"
import AppFooter from "./components/AppFooter.vue"
</script>

<template>
  <div class="app">
    <AppHeaderMenu />
    <div class="main">
      <RouterView />
    </div>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .main {
    flex: 1;
  }
}
</style>
