import fetch from 'dva/fetch';
import { notification,Modal } from 'antd';
import router from 'umi/router';
import {setToken,getToken} from './jscookie'


const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const WHITE_API = ['/api/rest/business/user/login'];

// 检查返回状态码
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

// 检查需要登录验证的接口
const checkToken = response => {
  const resp = response.json();
  return resp.then(data=>{
    const status = parseInt(data.messageCode);
    if(status===906 || status===903 || status===904 || status===2015){
      Modal.confirm({
        title:'温馨提示',
        content:data.message?data.message:'登录过期请重新登录',
        onOk(){
          const url = encodeURIComponent(window.location.href);
          router.push(`/user/login?redirect=${url}`);
        }
      });
      return false;
    }else {
      return data;
    }
  })
}

export default function request(url, option) {
  const options = {...option};
  const defaultOptions = {credentials: 'include',method:'POST'};
  const newOptions = { ...defaultOptions, ...options };

  if (newOptions.method === 'POST' ||newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    if (!(newOptions.body instanceof FormData)) {
      const body = {...newOptions.body};
      let body_str;
      if(body){
        body_str = Object.keys(body).map(name=>`${name}=${body[name]}`).join("&");
        const token = getToken();
        if(token && WHITE_API.indexOf(url)===-1){
          body_str = `${body_str}&token=${token}`
        };
      }else {
        if(token && WHITE_API.indexOf(url)===-1){
          body_str = `token=${token}`
        };
      }
      newOptions.headers = {
        "Accept": 'application/json',
        "Content-Type":"application/x-www-form-urlencoded",
        ...newOptions.headers
      };
      newOptions.body = encodeURI(body_str);
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(checkToken)
    .then(response => {
      return response;
    })
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return;
      }
      if (status === 403) {
        router.push('/exception/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        router.push('/exception/500');
        return;
      }
      if (status >= 404 && status < 422) {
        router.push('/exception/404');
      }

    });
}

