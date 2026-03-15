import { createApp } from 'vue'
import { registerPlugins } from './providers'
import App from './App.vue'
import './styles/styles.css'
import '@/shared/styles/index.css'
const app = createApp(App)
registerPlugins(app)
app.mount('#app')
