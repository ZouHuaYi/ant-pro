import request from '@/utils/request';

export async function queryUserLogin(params) {
  return request('/api/rest/business/user/login',{
    method: 'POST',
    body: {
      ...params,
    },
  })
}
