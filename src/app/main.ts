import { createApp } from 'vue'
import { registerPlugins } from './providers'
import App from './App.vue'
import router from './router/index'
import './styles/styles.css'
import '@/shared/styles/index.css'
const app = createApp(App)
app.use(router)
registerPlugins(app)
app.mount('#app')
