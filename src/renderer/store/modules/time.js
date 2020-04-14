import keys from '@/constants/keys'
const Store = require('electron-store')

const timeSchema = {
  time_limit: {
    type: 'number',
  },
  time_past: {
    type: 'number',
  },
}

const storeSettings = {
  schema: timeSchema,
  name: 'time',
  encryptionKey: keys.storage.key,
}

class Time {
  constructor() {
    this.store = new Store(storeSettings)
    this.setDefaults()
  }

  cleanTimeData() {
    this.setToStore('time_limit', 0)
    this.setToStore('time_past', 0)
  }

  getFromStore(slug) {
    return this.store.get(slug)
  }

  setDefaults() {
    this.timeLimit = 0
    if (typeof this.getFromStore('time_limit') !== 'undefined') {
      this.timeLimit = this.getFromStore('time_limit')
    }
    this.timePast = 0
    if (typeof this.getFromStore('time_past') !== 'undefined') {
      this.timePast = this.getFromStore('time_past')
    }
  }

  setToStore(slug, value) {
    this.store.set(slug, value)
  }
}

export default {
  actions: {
    cleanTime({ commit }) {
      commit('cleanTime')
    },
    saveTime({ commit }, data) {
      commit('setToStore', { key: 'time_limit', value: data.timeLimit })
      commit('setToStore', { key: 'time_past', value: data.timePast })
    },
  },
  mutations: {
    cleanTime(state) {
      state.cleanTimeData()
    },
    setToStore(state, data) {
      state.setToStore(data.key, data.value)
      state[data.key] = data.value
    },
  },
  state: new Time(),
  getters: {
    time(state) {
      return state
    },
  },
}
