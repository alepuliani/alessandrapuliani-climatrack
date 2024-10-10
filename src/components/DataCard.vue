<script setup>
import { ref, onMounted, watch } from "vue"
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const itemData = ref(props.item.data)
let selectedData = ref(null)
let thisYearData = ref(null)
let tenYearsAgoData = ref(null)

// The `findYear` function is responsible for searching for a specific year within the `itemData`
// array.
const findYear = function (year) {
  if (!itemData.value) return null
  selectedData.value = itemData.value.find((data) => {
    let yearData =
      Math.round(parseFloat(data.year)) ||
      Math.round(parseFloat(data.time)) ||
      Math.round(parseFloat(data.date))
    return yearData === year
  })
  return selectedData.value
}

// The `const extractValue ` function is a utility function that takes a `data` object as a parameter. It
// checks if the `data` object is truthy (not null or undefined), and if it is, it returns either the
// `station` property of the `data` object if it exists, or the `trend` property if `station` doesn't
// exist. If the `data` object is falsy, it returns `null`.
const extractValue = function (data) {
  return data ? data.station || data.trend : null
}

// The `updateData` function is responsible for updating the `thisYearData` and `tenYearsAgoData` values based on the data retrieved for the years 2024 and 2014 respectively.
const updateData = function () {
  let yearData2024 = findYear(2024)
  let yearData2014 = findYear(2014)
  thisYearData.value = extractValue(yearData2024)
  tenYearsAgoData.value = extractValue(yearData2014)
}

onMounted(function () {
  updateData()
})

watch(
  () => props.item,
  () => {
    itemData.value = props.item.data
    updateData()
  }
)
</script>

<template>
  <div class="data-card">
    <h2>Anomalies</h2>
    <div class="data-div">
      <div class="this-year">
        <h3>
          {{ thisYearData }}
        </h3>
        <p>This year</p>
      </div>
      <div class="before">
        <h3>{{ tenYearsAgoData }}</h3>
        <p>10 years ago</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.data-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(#b4b4b4, 0.8);
  background-color: #f4f4f4;
  width: 100%;

  .data-div {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    p {
      font-size: 12px;
    }

    .this-year {
      text-align: center;
      padding-right: 10px;

      h3 {
        font-size: 40px;
        margin: 0;
      }
    }

    .before {
      margin-top: 20px;
      text-align: center;
      h3 {
        font-size: 20px;
        margin: 0;
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .data-card {
    max-width: fit-content;
  }
}
@media screen and (min-width: 1024px) {
  .data-card {
    h2 {
      font-size: 20px;
    }
  }
}
</style>
