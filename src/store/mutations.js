export default {
  SET_USER(state, payload) {
    localStorage.setItem('vr_user', JSON.stringify(payload));
    state.user = payload;
  }
}