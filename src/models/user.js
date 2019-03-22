import { query as queryUsers, queryCurrent } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    currentUser: localStorage.getItem('Current-User')?JSON.parse(localStorage.getItem('Current-User')): {},
  },

  effects: {},

  reducers: {
    saveCurrentUser(state,action){
      localStorage.setItem('Current-User', JSON.stringify(action.payload));
      return {
        ...state,
        currentUser: action.payload || {},
      }
    },
    test(state){
      console.log('全局测试')
      return state;
    }
  },
};
