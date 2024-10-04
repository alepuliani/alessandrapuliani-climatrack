<script setup>
import { useClimateStore } from "@/stores/climateStore"
import ClimateItemButton from "@/components/ClimateItemButton.vue"

const climateStore = useClimateStore()
const climateItems = climateStore.climateItems
</script>

<template>
  <main>
    <div class="presentation-div">
      <h1>
        Explore the vital data driving our understanding of climate change
      </h1>
    </div>
    <div class="selection-div">
      <h2>Discover the latest climate trends and statistics</h2>
      <div class="btn-container">
        <router-link
          v-for="climateItem of climateItems"
          :key="climateItem.name"
          :to="{
            name: 'details',
            params: {
              name: climateItem.name
            }
          }"
          :style="{
            backgroundImage: `url(${climateItem.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom'
          }"
        >
          <ClimateItemButton :climateItem="climateItem" />
        </router-link>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  min-height: 94vh;
  .presentation-div {
    width: 100%;
    padding: 180px 30px 100px 30px;
    background-image: url(../assets/app-images/climate-change-img.png);
    background-size: cover;
    background-position: center;
    text-align: center;
    margin-bottom: 10px;

    h1 {
      font-size: 35px;
      font-weight: 800;
      color: white;
      margin-bottom: 20px;
    }
  }

  .selection-div {
    h2 {
      text-align: center;
      font-weight: 700;
      font-size: 25px;
      color: rgb(68, 68, 68);
      padding: 20px;
    }

    .btn-container {
      overflow: auto;
      white-space: nowrap;
      padding: 10px;
      height: 200px;
      margin-bottom: 40px;

      a {
        text-decoration: none;
        margin: 10px;
        height: 200px;
        width: 200px;
      }

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  main {
    .presentation-div {
      padding: 250px 50px 200px 50px;
    }

    .selection-div {
      padding-top: 5%;

      h2 {
        font-size: 28px;
        padding: 0 50px;
      }

      .btn-container {
        margin: 40px auto;
        min-height: 300px;

        a {
          width: 35%;
          padding: 0;
        }
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  main {
    .presentation-div {
      padding: 230px 230px 150px 230px;
    }
    .selection-div {
      padding-top: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h2 {
        padding-bottom: 20px;
      }

      .btn-container {
        margin-top: 0;
        max-width: 100vw;
        min-height: 200px;
      }
    }
  }
}
</style>
