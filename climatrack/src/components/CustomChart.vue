<script setup>
import { ref, onMounted, watch } from "vue"
import Chart from "chart.js/auto"
import zoomPlugin from "chartjs-plugin-zoom"
Chart.register(zoomPlugin)

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

let chart = ref(null)
let isZoomActive = ref(false)
let resetBtn = null

// The `chartLabel` constant is determining the label to be displayed on the chart based on the
// `props.item.name` value.
const chartLabel =
  props.item.name === "Arctic Ice"
    ? "Arctic Ice Anomalies"
    : `${props.item.name} Trend`

// The `selectLabels` function is determining the labels to be displayed on the chart based on the
// `props.item.name` value. It uses a switch statement to handle different cases for different types of data.
const selectLabels = function () {
  let labels
  switch (props.item.name) {
    case "Temperature":
      labels = props.item.data.map((entry) => entry.time)
      break
    case "CO2":
      labels = props.item.data.map((entry) => entry.year)
      break
    case "Methane":
    case "NO2":
      labels = props.item.data.map((entry) => entry.date)
      break
    case "Arctic Ice":
      labels = Object.values(props.item.data)
        .map((item) => item.anom)
        .filter((item) => item !== -9999)
      break
  }
  return labels
}

// The `selectData` function is responsible for determining and returning the specific data to be
// displayed on the chart based on the `props.item.name` value. It uses a switch statement to handle
// different cases for different types of data.
const selectData = function () {
  let chartData
  switch (props.item.name) {
    case "Arctic Ice":
      const arcticData = Object.values(props.item.data)
        .map((item) => item.anom)
        .filter((item) => item !== -9999)
      return arcticData
    case "CO2":
      const CO2Data = props.item.data.map((entry) => parseFloat(entry.trend))
      return CO2Data
    case "NO2":
      const NO2Data = props.item.data.map((entry) => parseFloat(entry.trend))
      return NO2Data
    case "Methane":
      const menthaneData = props.item.data.map((entry) =>
        parseFloat(entry.trend)
      )
      return menthaneData
    case "Temperature":
      const temperatureData = props.item.data.map((entry) =>
        parseFloat(entry.station)
      )
      return temperatureData
  }
  return chartData
}

// The `resetChartZoom` function is responsible for resetting the zoom on the chart.
const resetChartZoom = function () {
  chart.value.resetZoom()
  isZoomActive.value = false
  resetBtn.classList.remove("display-zoom")
}

// The `createChart` function is responsible for creating and updating the Chart.js chart displayed on
// the canvas element with the id "chart".
const createChart = function (labels, data) {
  if (chart.value) {
    chart.value.destroy()
  }
  chart.value = new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: chartLabel,
          data: data,
          borderColor: props.item.lineColor,
          pointRadius: 0,
          borderWidth: 2,
          fill: false
        }
      ]
    },
    options: {
      plugins: {
        zoom: {
          zoom: {
            wheel: {
              enabled: true
            },
            pinch: {
              enabled: true
            },
            mode: "x",
            onZoom: () => {
              isZoomActive.value = true
              resetBtn.classList.add("display-zoom")
            }
          }
        }
      },
      aspectRatio: 1.5,
      scales: {
        x: {
          display: true,
          text: "Year"
        },
        y: {
          display: true
        }
      }
    }
  })
}

// The `onMounted` hook in Vue is used to run the provided callback function when the component is
// mounted to the DOM.
onMounted(async () => {
  console.log("Chart element: ", document.getElementById("chart"))
  const labels = selectLabels()
  let data = selectData()
  createChart(labels, data)
  resetBtn = document.querySelector(".reset-btn")
})

// The `watch` function in Vue is used to watch for changes in reactive data and execute a callback
// when those changes occur.
watch(
  () => [props.item.data],
  () => {
    const labels = selectLabels()
    const data = selectData()
    console.log("Updating Chart with labels: ", labels, " and data: ", data)
    createChart(labels, data)
  }
)
</script>

<template>
  <div class="chart-div">
    <canvas class="chart" id="chart"></canvas>
    <button @click="resetChartZoom()" class="reset-btn">Reset Zoom</button>
  </div>
</template>

<style lang="scss">
.chart-div {
  display: flex;
  flex-direction: column;
  align-items: center;

  .chart {
    background-color: rgb(245, 245, 245);
    margin-top: 30px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(#b4b4b4, 0.8);
    max-width: 100%;
  }
  .reset-btn {
    display: none;
    margin-top: 20px;
    border: none;
    background-color: rgb(245, 245, 245);
    padding: 5px 10px;
    border-radius: 20px;
    box-shadow: 0 5px 10px rgba(#b4b4b4, 0.8);
    color: black;

    &:active {
      transform: translateY(2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    &.display-zoom {
      display: block;
    }
  }

  @media screen and (min-width: 768px) {
    .chart {
      min-width: 600px;
    }
  }
  @media screen and (min-width: 1024px) {
    .chart {
      min-width: 700px;
    }
  }
}
</style>
