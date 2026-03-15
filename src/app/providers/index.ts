import type { App } from 'vue'
import router from '../router'

export function registerPlugins(app: App) {
  app.use(router)
}
