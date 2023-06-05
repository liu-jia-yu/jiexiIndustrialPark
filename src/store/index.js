import {
  createStore
} from 'vuex'

const contentStore = createStore({
  state() {
    return {
      currentContent: {},
      isBShow: true
    }
  },
  mutations: {
    updateContent(state, content) {
      state.currentContent = content
    },
    setIsBShow(state, value) {
      if (value > 0) {
        state.isBShow = false
      } else {
        state.isBShow = true
      }
    }
  }
})

export default contentStore