import axios from 'axios';

const API = {
  // BASE: 'http://DESKTOP-PTPKRF2:53902/api/v1/',
  BASE: 'https://vetrant-api.herokuapp.com/api/v1/',
  USER: {
    USER: 'user/',
    LOGIN: 'user/login/',
    AVATAR: 'user/avatar/'
  },
  POST: 'post/',
  LIKE: 'like/',
  DISLIKE: 'dislike/',
  COMMENT: 'comment/',
  CHANNEL: 'channel/',
  GIPHY: 'giphy/'
};

export default {
  GET_LOCAL_THEME({ commit, state }) {
    return new Promise((resolve, reject) => {
      const localTheme = JSON.parse(localStorage.getItem('vr_theme'));
      if (localTheme) {
        commit('SET_THEME', localTheme);
        resolve(localTheme);
      } else {
        reject();
      }
    });
  },
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
        });
    });
  },
  LOGOUT({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      commit('SET_USER', null);
      resolve();
    });
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
    });
  },
  CREATE_POST({ commit, state }, formData) {
    return new Promise((resolve, reject) => {
      axios.post(`${API.BASE}${API.POST}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
  CREATE_COMMENT({ commit, state }, formData) {
    return new Promise((resolve, reject) => {
      axios.post(`${API.BASE}${API.COMMENT}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(response => {
          resolve(response.data);
          commit('APPEND_POST_COMMENT', response.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
  CREATE_LIKE({ commit, state }, like) {
    return new Promise((resolve, reject) => {
      axios.post(`${API.BASE}${API.LIKE}`, like)
        .then(response => {
          resolve(response.data);
          if (like.post) {
            commit('APPEND_POST_LIKE', response.data);
          }
          if (like.comment) {
            commit('APPEND_COMMENT_LIKE', response.data);
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
  CREATE_DISLIKE({ commit, state }, dislike) {
    return new Promise((resolve, reject) => {
      axios.post(`${API.BASE}${API.DISLIKE}`, dislike)
        .then(response => {
          resolve(response.data);
          if (dislike.post) {
            commit('APPEND_POST_DISLIKE', response.data);
          }
          if (dislike.comment) {
            commit('APPEND_COMMENT_DISLIKE', response.data);
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
  GET_CHANNELS({ commit, dispatch, state }) {
    return new Promise((resolve, reject) => {
      axios.get(`${API.BASE}${API.CHANNEL}`)
        .then(response => {
          commit('SET_CHANNELS', response.data);
          if (response.data && response.data.length) {
            dispatch('SET_SELECTED_CHANNEL', response.data[0]);
          }
          resolve(response.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
  SET_SELECTED_CHANNEL({ commit, dispatch, state }, channel) {
    return new Promise((resolve, reject) => {
      commit('SET_SELECTED_CHANNEL', channel);
      dispatch('GET_POSTS', channel);
      resolve(channel);
    })
  },
  GET_POSTS({ commit, state }, channel) {
    commit('SET_LOADING', true);
    if (!channel) {
      channel = state.selectedChannel;
    }
    return new Promise((resolve, reject) => {
      axios.get(`${API.BASE}${API.POST}${API.CHANNEL}${channel._id}`)
        .then(response => {
          commit('SET_POSTS', response.data);
          commit('SET_LOADING', false);
          resolve(response.data);
        })
        .catch(error => {
          console.log(error);
          commit('SET_LOADING', false);
          reject(error);
        });
    });
  },
  SEARCH_GIPHY({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      axios.get(`${API.BASE}${API.GIPHY}${encodeURIComponent(query)}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
  GET_RECENT_ACTIVITY({ commit, state }, userId) {
    commit('SET_LOADING', true);
    return new Promise((resolve, reject) => {
      const activityPromises = [];

      activityPromises.push(axios.get(`${API.BASE}${API.POST}${API.USER.USER}${userId}`));
      activityPromises.push(axios.get(`${API.BASE}${API.COMMENT}${API.USER.USER}${userId}`));
        
      Promise.all(activityPromises)
        .then(responses => {
          console.log(responses);
          const activity = [];
          activity.push(...responses[0].data);
          activity.push(...responses[1].data);
          commit('SET_RECENT_ACTIVITY', activity);
          commit('SET_LOADING', false);
          resolve(activity);
        })
        .catch(error => {
          console.log(error);
          commit('SET_LOADING', false);
          reject(error);
        });
    });
  }
}