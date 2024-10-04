# ClimaTrack

ClimaTrack is a web application designed to explore and understand climate change data. It provides users with vital information regarding climate trends, statistics, and the impact of climate change on our planet.

🔗 [go to ClimaTrack](https://alepuliani.github.io/alessandrapuliani-climatrack/)

## Features

- **Dynamic Data Visualization**: Interactive charts and graphs that display climate data and trends.
- **Detailed Information**: In-depth descriptions of various climate-related topics.
- **User-Friendly Interface**: Easy navigation and a visually appealing design.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used:

1. **Vue.js**: For building the user interface.

2. **Vue Router**: Used for managing navigation across different views:

- _HomeView.vue_: serves as the landing page of ClimaTrack. It provides users with an engaging introduction to the application and its purpose. The view displays a selection of climate-related topics (such as temperature, CO2 levels, methane levels, and Arctic ice changes) presented as clickable buttons that links to the DataDetails.vue view, allowing users to dive deeper into the specifics of each climate topic.
- _DataDetails.vue_: is designed to provide detailed information about a selected climate topic. The view displays the name and description of the selected climate topic, offering context and information that helps users understand the significance of the data.

3. **Pinia**: Centralized state management is handled with Pinia, ensuring consistent data management across components and routes.

4. **Axios**: For making API requests .

5. **Chart.js**: For rendering data visualizations.

## Component-Based Architecture:

- **AppHeaderMenu.vue**: serves as the navigation bar for the ClimaTrack application and contains links to various sections of the app, allowing users to navigate easily between the home view and other potential features or pages.
- **AppFooter.vue**: provides essential information at the bottom of the application.
- **ClimateItemButton.vue**: is a reusable component representing each climate item button on the home view
- **DataCard.vue**: displays relevant climate data for a specific climate item in the DataDetails.vue view.
- **CustomChart.vue**: is responsible for visualizing the climate data in an interactive chart format.

## Getting Started

To run the project locally, follow these steps:

**1. Clone the repository:**

```javascript
git clone https://github.com/alepuliani/alessandrapuliani-climatrack.git
```

**2. Install dependencies:**

```javascript
cd alessandrapuliani-climatrack
npm install
```

**3. Run the Development Server:**

```javascript
npm run dev
```
