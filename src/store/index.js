import { createStore } from 'vuex';

export default createStore({
  state: {
    step: 0,
    data: {
      personalInfo: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: '123 Elm Street, Springfield',
      },
      jobDetails: {
        company: '',
        position: '',
        experience: 0,
        skills: '',
      },
      preferences: {
        newsletter: false,
        notifications: true,
        theme: 'light',
      },
      security: {
        password: '',
        confirmPassword: '',
        twoFactorAuth: false,
      },
    },
  },
  mutations: {
    UPDATE_SECTION(state, { section, values }) {
      state.data[section] = { ...state.data[section], ...values }; // Merge changes
    },
    SET_STEP(state, step) {
      state.step = step;
    },
  },  
  actions: {
    updateSection({ commit }, payload) {
      commit('UPDATE_SECTION', payload);
    },
    setStep({ commit }, step) {
      commit('SET_STEP', step);
    },
  },
  getters: {
    currentSection(state) {
      return Object.keys(state.data)[state.step];
    },
    currentFields(state, getters) {
      return state.data[getters.currentSection];
    },
  },
});
