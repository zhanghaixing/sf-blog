import Vue from 'vue'
import axios from 'axios'


var tools = {
  install (Vue, options) {
    // ajax: axios
    Vue.prototype.$http = axios
  },
}

export {tools}
