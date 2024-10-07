<script setup>
import { onMounted, watch, ref } from "vue"
import { useRoute } from "vue-router"
import CustomChart from "@/components/CustomChart.vue"
import { useClimateStore } from "@/stores/climateStore"
import DataCard from "@/components/DataCard.vue"

const route = useRoute()
const climateStore = useClimateStore()
const climateItems = climateStore.climateItems
const selectedItem = ref(null)

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

// The `selectClimateItem` function is iterating through the `climateItems` array to find a specific
// climate item that matches the `name` passed as a prop (`props.name`). Once it finds that, it sets the `selectedItem.value` to that specific climate item and then breaks out of
// the loop.
const selectClimateItem = async function () {
  for (const climate of climateItems) {
    if (climate.name === props.name) {
      selectedItem.value = climate
      break
    }
  }
}

// The `loadSelectedItem` function is an asynchronous function that is responsible for loading the
// selected climate item based on the route parameter `name`.
const loadSelectedItem = async function () {
  window.scrollTo(0, 0)
  await climateStore.setClimateData(route.params.name)
  await selectClimateItem()
}

onMounted(loadSelectedItem)

// Checking if the view's paramater changes and if so the view will reload with the new paramater
watch(
  () => route.params.name,
  async (newName) => {
    if (newName) {
      await loadSelectedItem()
    }
  }
)
</script>

<template>
  <div class="container" v-if="selectedItem">
    <div
      class="info-div"
      :style="{
        backgroundImage: `url(${selectedItem.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }"
    >
      <h1>{{ selectedItem.name }}</h1>
      <p>
        {{ selectedItem.description }}
      </p>
    </div>

    <div class="element-div" v-if="selectedItem.data != null">
      <div class="causes">
        <h2>Causes</h2>
        <ul>
          <li v-for="(cause, index) in selectedItem.causes" :key="index">
            <p>{{ cause }}</p>
          </li>
        </ul>
      </div>
      <div class="data-div">
        <DataCard :item="selectedItem" />
        <CustomChart :item="selectedItem" />
      </div>
    </div>

    <div v-else class="error">
      <p>
        Data for {{ selectedItem.name }} currently unavailable. <br />
        Try again later.
      </p>
    </div>
  </div>

  <div class="loading" v-else>
    <i class="bi bi-arrow-clockwise"></i>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0;
  padding: 0;
  min-width: 100%;
  min-height: 90vh;

  .info-div {
    padding: 80px 40px;
    padding-top: 110px;
    color: white;

    h1 {
      font-size: 40px;
      margin-bottom: 30px;
      font-weight: 700;
    }

    p {
      line-height: 25px;
    }
  }

  .element-div {
    border-radius: 10px;
    margin: 30px;

    padding-bottom: 30px;

    .causes {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h2 {
        margin-left: 25px;
      }

      p {
        margin: 0;
      }
    }

    .data-div {
      width: 100%;
    }
  }

  .error {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px;
  }
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  color: #747474;
  font-size: 50px;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media screen and (min-width: 768px) {
  .container {
    font-size: 20px;
    .info-div {
      padding: 120px 90px;
    }

    .data-div {
      min-width: 100%;
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}

@media screen and (min-width: 1024px) {
  .container {
    .info-div {
      padding: 100px 150px;
      h1 {
        font-size: 60px;
        margin-bottom: 0;
      }

      p {
        max-width: 800px;
      }
    }

    .element-div {
      .causes {
        padding: 80px 100px;
        padding-bottom: 0;
      }
      .data-div {
        padding: 30px;
        flex-direction: row;
        justify-content: center;
        margin-top: 50px;
      }
    }
  }
}
</style>
