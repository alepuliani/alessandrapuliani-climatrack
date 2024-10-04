import { defineStore } from "pinia"
import { fetchApisData } from "../api/ClientAPI.js"

import temperatureBackground from "../assets/app-images/temperature-background.jpg"
import co2Background from "../assets/app-images/co2-background.png"
import methaneBackground from "../assets/app-images/methane-background.png"
import no2Background from "../assets/app-images/no2-background.jpg"
import arcticBackground from "../assets/app-images/arctic-background.jpg"

export const useClimateStore = defineStore("climate", {
  state: () => ({
    /* The `climateItems` array within the `useClimateStore` defines different climate-related items such
  as Temperature, CO2 levels, Methane levels, NO2 levels, and Arctic Ice data. Each item in the
  array contains specific information related to that climate aspect: */
    climateItems: [
      {
        name: "Temperature",
        description:
          "This data reflects the effects of climate change, showing a steady increase in temperatures over the years. In particular, the temperature anomalies indicate how much the temperature in a given period differs from the historical average for that specific station and are expressed in degrees Celsius (°C). By closely observing the chart, significant spikes can be seen, indicating periods of accelerated global warming.",
        api: "https://global-warming.org/api/temperature-api",
        data: null,
        background: temperatureBackground,
        lineColor: "#ff6f00",
        anomalies: null,
        causes: ["Greenhouse gas accumulation"]
      },
      {
        name: "CO2",
        description:
          "The data presented reflects the escalating levels of carbon dioxide (CO2) in the atmosphere over the years. CO2 is a significant greenhouse gas, and its increasing concentrations are closely tied to human activities, such as fossil fuel combustion and deforestation. Understanding these trends is crucial for assessing the impacts of climate change. The values indicate the concentration of CO2 in the atmosphere, typically expressed in parts per million (ppm). These measurements reveal how much the CO2 levels fluctuate from the historical averages recorded over specific periods.",
        api: "https://global-warming.org/api/co2-api",
        data: null,
        background: co2Background,
        lineColor: "#8d693f",
        anomalies: null,
        causes: [
          "Fossil fuel combustion",
          "Deforestation",
          "Industrial processes"
        ]
      },
      {
        name: "Methane",
        description:
          "The data presented reflects the increasing levels of methane (CH₄) in the atmosphere over the years. Methane is a potent greenhouse gas, with a warming potential many times greater than that of carbon dioxide (CO₂). The values indicate the average concentration of methane in the atmosphere, typically expressed in parts per billion (ppb). Understanding these trends is crucial for addressing climate change effectively.",
        api: "https://global-warming.org/api/methane-api",
        data: null,
        background: methaneBackground,
        lineColor: "#F5A623",
        anomalies: null,
        causes: ["Livestock", "Landfills", "Natural gas extraction"]
      },
      {
        name: "NO2",
        description:
          "This data displays the variations in Nitrogen Dioxide (NO₂) levels over the years. NO₂ is a significant pollutant produced from fossil fuel combustion and industrial activities. Monitoring its levels is crucial for assessing air quality and understanding the impact of human activities on the atmosphere. The average concentration of NO₂ measured in parts per billion (ppb). High levels of NO₂ can lead to respiratory issues and are associated with various environmental problems, including acid rain and the formation of ground-level ozone.",
        api: "https://global-warming.org/api/nitrous-oxide-api",
        data: null,
        background: no2Background,
        lineColor: "#ff9896",
        anomalies: null,
        causes: ["Fossil fuel combustion", "Industrial processes"]
      },
      {
        name: "Arctic Ice",
        description:
          "This chart presents the changes in Arctic ice levels over time. In this specific graph, anomalies are identified as points where the values are notably different from the typical range of the dataset. Negative anomalies in a graph represent data points significantly lower than the expected or normal values.  Essentially, they highlight areas where the data is much lower than usual, providing insights into unusual or noteworthy occurrences.",
        api: "https://global-warming.org/api/arctic-api",
        data: null,
        background: arcticBackground,
        lineColor: "#ADD8E6",
        anomalies: null,
        causes: ["Global warming", "Climate change"]
      }
    ]
  }),

  actions: {
    // The `setClimateData` function in the `useClimateStore` store is an asynchronous action that fetches
    // data from different APIs based on the type of climate item specified. After receiving the data, assign the result to the data attribute of the object.
    async setClimateData(type) {
      const climateIndex = this.climateItems.findIndex(
        (item) => item.name === type
      )
      if (climateIndex !== -1) {
        const climateItem = this.climateItems[climateIndex]
        try {
          const data = await fetchApisData(climateItem.api)
          if (!data) {
            console.error(`No data received for API: ${climateItem.api}`)
            return
          }
          console.log("Fetched data:", data)

          switch (type) {
            case "Temperature":
              climateItem.data = data.result
              break
            case "CO2":
              climateItem.data = data.co2
              break
            case "Methane":
              climateItem.data = data.methane
              break
            case "NO2":
              climateItem.data = data.nitrous
              break
            case "Arctic Ice":
              climateItem.data = data.arcticData.data
          }
          console.log("Assigned data:", this.climateItems[climateIndex].data)
        } catch (error) {
          console.error(`Error fetching data:${error}`)
        }
      } else {
        console.error(`Climate type ${type} not found in climateItems.`)
      }
    },
    /**
     * The function `selectItemAnomalies` takes a 'type' parameter, finds the corresponding item in the
     * climateItems array, and assigns anomalies data based on the type selected. The
     * method then populates the `anomalies` property of the selected climate item with the extracted data.
     */

    selectItemAnomalies(type) {
      const climateIndex = this.climateItems.findIndex(
        (item) => item.name === type
      )
      if (climateIndex !== -1) {
        const climateItem = this.climateItems[climateIndex]
        switch (type) {
          case "Arctic Ice":
            climateItem.anomalies = Object.values(climateItem.data)
              .map((item) => item.anom)
              .filter((item) => item !== -9999)
            break
          case "CO2":
            climateItem.anomalies = climateItem.data.map((entry) =>
              parseFloat(entry.trend)
            )
            break
          case "NO2":
            climateItem.anomalies = climateItem.data.map((entry) =>
              parseFloat(entry.trend)
            )
            break
          case "Methane":
            climateItem.anomalies = climateItem.data.map((entry) =>
              parseFloat(entry.trend)
            )
            break
          case "Temperature":
            climateItem.anomalies = climateItem.data.map((entry) =>
              parseFloat(entry.station)
            )
            break
        }
      }
    }
  }
})
