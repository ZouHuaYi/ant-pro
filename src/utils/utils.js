/* eslint no-useless-escape:0 import/prefer-default-export:0 */
import { parse, stringify } from 'qs';


const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

export function urlGetParam(name){
  return window.location.href.match(new RegExp('[?&]' + name + '=([^#?&]+)', 'i')) ? decodeURIComponent(RegExp.$1) : '';
}

export function changeLetter(num) {
  if(typeof num==="number" && num>0){
    return String.fromCharCode(num+64);
  }else {
    return '无'
  }
}
