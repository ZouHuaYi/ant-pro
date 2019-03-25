/**
 * Created by zhy on 2019/3/20.
 */
import request from '@/utils/request';

export async function userLoginPhone(params) {

  return request('/api/rest/business/team/get_userInfo',{
    method: 'POST',
    body: {
      ...params,
    },
  })
}

export async function hospitalProject() {
  return request('/api/rest/business/service/category_list',{
    method: 'POST',
    body:null,
  })
}

export async function thirdCategory(params) {
  return request('/api/rest/business/service/product_list',{
    method: 'POST',
    body:{...params},
  })
}

export async function addProject(params) {
  return request('/api/rest/business/product/add',{
    method: 'POST',
    body:{...params},
  })
}
