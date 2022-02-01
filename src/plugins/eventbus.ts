import { PluginFunction } from 'vue'
import { eventbus } from '@tavac/corteza-js'

export default function (): PluginFunction<Partial<eventbus.Options>> {
  return function (Vue, opts): void {
    Vue.prototype.$EventBus = new eventbus.EventBus(opts)
  }
}
