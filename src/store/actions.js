import axios from 'axios';

const API = {
  // BASE: 'http://DESKTOP-PEI2O18:60707/api/v1/',
  BASE: 'https://vetrant-api.herokuapp.com/api/v1/',
  TRANSLATION: 'translation/',
  USER: {
    LOGIN: 'user/login/',
    AVATAR: 'user/avatar/'
  }
};

export default {
  LOGIN({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${API.BASE}${API.USER.LOGIN}`, payload)
        .then((response) => {
          if (response.data._id) {
            commit('SET_USER', response.data);
            resolve(response.data);
          } else {
            console.log(response.data);
            reject(response.data);
          }
        })
        .catch((error) => {
          // handle error
          console.log(error);
          reject(error);
        })
    })
  },
  LOGOUT({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      commit('SET_USER', null);
      resolve();
    })
  },
  GET_LOCAL_USER({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      const localUser = JSON.parse(localStorage.getItem('vr_user'));
      if (localUser) {
        commit('SET_USER', localUser);
        resolve(localUser);
      } else {
        reject();
      }
    });
  },
  UPDATE_AVATAR({ commit, state }, formData) {
    return new Promise((resolve, reject) => {
      axios.put(`${API.BASE}${API.USER.AVATAR}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(response => {
          commit('SET_USER', response.data);
          resolve(response.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    })
  }
}