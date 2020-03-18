import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

// Сбросил стили
import 'normalize.css'

// Вынес стили в отдельный файл для удобства
import './css/style.less'

// Устанавливаем axios для работы с запросами
import axios from 'axios'
import VueAxios from 'vue-axios'

// Импортируем animate.css для создания анимаций
import animate from 'animate.css'

// Активируем axios для работы с запросами
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
