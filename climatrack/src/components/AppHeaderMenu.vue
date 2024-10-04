<script setup>
import { useRoute } from "vue-router"
import { useClimateStore } from "@/stores/climateStore"
import { onMounted, onUnmounted, ref } from "vue"

const climateStore = useClimateStore()
const climateItems = climateStore.climateItems
const route = useRoute()
let isMenuOpen = ref(false)

// The `handleOutsideClick` function is responsible for detecting clicks outside of the side menu and
// open button element. When a click event occurs, the function checks if the side menu is open
// (`isMenuOpen.value` is true) and if the click target is not within the side menu or the open button sets the `isMenuOpen` reactive variable to false, effectively
// closing the side menu. This functionality ensures that clicking outside the side menu or the open
// button will close the menu, providing a better user experience.
const handleOutsideClick = function (event) {
  const sideMenu = document.querySelector(".side-menu")
  const openBtn = document.querySelector(".open-btn")
  if (
    isMenuOpen.value &&
    !sideMenu.contains(event.target) &&
    !openBtn.contains(event.target)
  ) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener("click", handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick)
})
</script>

<template>
  <div>
    <header>
      <router-link to="/">
        <button><img src="../assets/logo.png" alt="" /></button
      ></router-link>
      <button @click="isMenuOpen = true">
        <i class="bi bi-list open-btn"></i>
      </button>
    </header>

    <nav class="side-menu" :class="{ open: isMenuOpen }">
      <img class="logo" src="../assets/logo.png" alt="" />
      <button class="close-btn" @click="isMenuOpen = false">
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="menu-div">
        <h2 class="menu-title">MENU</h2>

        <ul>
          <router-link :to="{ name: 'home' }" @click="isMenuOpen = false"
            ><li :class="{ active: route.name === 'home' }">Home</li>
            <hr
          /></router-link>
          <router-link
            v-for="climateItem of climateItems"
            :key="climateItem.name"
            :to="{
              name: 'details',
              params: {
                name: climateItem.name
              }
            }"
            @click="isMenuOpen = false"
            ><li :class="{ active: route.params.name === climateItem.name }">
              {{ climateItem.name }}
            </li>
            <hr />
          </router-link>
        </ul>
      </div>
    </nav>
  </div>
</template>
<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  backdrop-filter: blur(2px);
  box-shadow: 0 0 10px rgba(#000000, 0.2);

  img {
    height: 50px;
  }

  button {
    background-color: transparent;
    height: 50px;
    width: 50px;
    border: none;
    color: black;

    &:hover {
      border-radius: 5px;
      cursor: pointer;
    }

    i {
      font-size: 30px;
      color: white;
    }
  }
}

.side-menu {
  margin: 10px;
  border-radius: 10px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;

  transform: translateX(100vw);
  transition: transform 0.5s ease;

  z-index: 10;
  padding: 60px;
  padding-top: 150px;

  width: 95%;
  background-color: rgb(31, 31, 31);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 25px;
  color: white;

  .logo {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 150px;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: transparent;
    height: 50px;
    width: 50px;
    border: none;
    color: white;

    &:hover {
      cursor: pointer;
    }

    i {
      font-size: 30px;
    }
  }

  .menu-title {
    margin-bottom: 30px;
    font-weight: 900;
    padding-left: 10px;
  }

  ul {
    list-style: none;
    padding: 0;

    a {
      text-decoration: none;
      color: white;
    }

    li {
      width: fit-content;
      border-radius: 10px;
      color: white;
      padding: 0 5px;
      &:hover {
        background-color: rgb(53, 53, 53);
      }

      &.active {
        color: #3e7f5d;
      }
    }
  }
}

.open {
  transform: translateX(0%);
}

@media screen and (min-width: 768px) {
  .side-menu {
    width: 400px;
    right: -400px;

    .close-btn {
      z-index: 50;
      color: white;
    }
  }

  .open {
    transform: translateX(-400px);
  }
}

@media screen and (min-width: 1024px) {
  .side-menu {
    padding-top: 120px;
    width: 300px;
    .menu {
      font-size: 25px;
    }

    li {
      font-size: 16px;
    }

    button {
      right: -60px;
      background-color: transparent;
      height: 50px;
      width: 50px;
      border: none;

      &:hover {
        cursor: pointer;
      }

      i {
        font-size: 30px;
      }
    }
  }
}
</style>
