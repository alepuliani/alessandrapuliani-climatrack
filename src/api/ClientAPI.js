import axios from "axios"

/**
 * The function fetchApisData asynchronously fetches data from a specified API using axios and returns
 * the response data or logs an error if fetching fails.
 * @param api - The `api` parameter is the URL of the API endpoint from
 * which you want to fetch data.
 * @returns The `fetchApisData` function is returning the data fetched from the API if the request is
 * successful. If there is an error during the request, it will log an error message and return `null`.
 */
export async function fetchApisData(api) {
  try {
    const response = await axios.get(api)
    console.log("data:" + response.data)
    return response.data
  } catch (error) {
    console.error(`Error fetching data from ${api}:`, error)
    return null
  }
}
