import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import store from './store'; // Import Vuex store

// Import Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const vuetify = createVuetify();

const app = createApp(App);

app.use(router); // Use the router
app.use(store); // Use Vuex store
app.use(vuetify); // Use Vuetify

app.mount('#app');
