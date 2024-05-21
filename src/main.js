/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router' 

const app = createApp(App)

// Usa el router en la aplicación
app.use(router)

registerPlugins(app)

app.mount('#app')
