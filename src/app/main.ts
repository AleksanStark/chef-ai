import { createApp } from 'vue'
import { registerPlugins } from './providers'
import App from './App.vue'
import '@/shared/styles/index.css'
import './styles/style.css'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
