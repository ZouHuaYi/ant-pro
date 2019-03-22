/**
 * Created by zhy on 2019/3/20.
 */

import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getPageQuery } from '@/utils/utils';
// import { reloadAuthorized } from '@/utils/Authorized';
import { setAuthority } from '@/utils/authority';
import {queryUserLogin } from '@/services/user'
import {setToken} from '@/utils/jscookie';


export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(queryUserLogin, payload);
      // Login successfully
      if(response.messageCode==900){
        yield put({
          type: 'changeLoginStatus',
          payload: {currentAuthority:'user'},
        });
        // set cookie token when login successfully
        setToken(response.data.token);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        window.g_app._store.dispatch({
          type:'user/saveCurrentUser',
          payload:{
            name:response.data.nickname,
            avatar:response.data.avatar,
          },
        })
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    // *getCaptcha({ payload }, { call }) {
    //   yield call(getFakeCaptcha, payload);
    // },

    *logout(_, { put }) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        // reloadAuthorized();
        yield put(
          routerRedux.push({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state
      }
    },
  },
};
