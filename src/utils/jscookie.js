/**
 * Created by zhy on 2019/3/20.
 */
import Cookies from  'js-cookie'


const MSM_TOKEN = 'Admin-Token';


export function setToken(value) {
  return Cookies.set(MSM_TOKEN,value);
}

export function getToken() {
  return Cookies.get(MSM_TOKEN);
}
