import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from './actions/auth'
import { USER_REQUEST } from './actions/user'
Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:53181/api'

// TYPES
const MAIN_SET_COUNTER = 'MAIN_SET_COUNTER'

// STATE
const state = {
  counter: 1,
   token: localStorage.getItem('user-token') || '',
  status: '',
}
//getters
const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

// MUTATIONS
const mutations = {
  [MAIN_SET_COUNTER] (state, obj) {
    state.counter = obj.counter
  },
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = 'success'
    state.token = token
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
  },



}

// ACTIONS
const actions = {
  setCounter ({ commit }, obj) {
    commit(MAIN_SET_COUNTER, obj)
  },
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      apiCall({url: 'auth', data: user, method: 'POST'})
      .then(resp => {
        localStorage.setItem('user-token', resp.token)
        // Here set the header of your ajax library to the token value.
        // example with axios
        // axios.defaults.headers.common['Authorization'] = resp.token
        commit(AUTH_SUCCESS, resp)
        dispatch(USER_REQUEST)
        resolve(resp)
      })
      .catch(err => {
        commit(AUTH_ERROR, err)
        localStorage.removeItem('user-token')
        reject(err)
      })
    })
  }

  }


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
