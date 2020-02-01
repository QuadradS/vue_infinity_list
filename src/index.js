import Vue from 'vue'
import App from './components/app.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

window.onload = () => {
  new Vue({
    el: '#app',
    render: h => h(App),
  })
}
