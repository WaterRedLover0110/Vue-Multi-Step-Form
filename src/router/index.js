import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import MultiStepForm from "../components/MultiStepForm.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
    props: { msg: "Welcome to Vue.js!" }, // Passing the prop to HelloWorld
  },
  {
    path: "/form",
    name: "MultiStepForm",
    component: MultiStepForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
