import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import DataDetails from "@/views/DataDetails.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/:name",
      name: "details",
      component: DataDetails,
      props: true
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
