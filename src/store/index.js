import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scanned: [

    ],
  },
  mutations: {
    // createScanned(state, payload) {
    //   console.log(state)
    //   console.log(payload)
    // },
    createScanned(state, payload) {
      console.log(state)
      console.log(payload)
      state.scanned.push({ ...payload })
      console.log(state.scanned)
    },
    deleteScanned(state, index) {
      state.scanned.splice(index, 1)
    },
    GET_SCANNED(state, payload) {
      state.scanned = payload;
      console.log(state.scanned)
      // state.scanned.push({ ...payload })
    },
  },
  actions: {
    getUsers({ commit }) {
      axios.get('http://localhost:3001/scans')
        .then(response => {
          commit('GET_SCANNED', response.data)
        })
    }
  },
  modules: {},
});
