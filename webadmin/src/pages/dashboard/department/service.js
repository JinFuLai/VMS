import request from 'umi-request';
import BASE_URL from '@/utils/base_url';

export async function queryList(params) {
  return request(`${BASE_URL}/api/role/list`, { method: 'POST', data: {...params},}); //暂时使用角色接口 避免页面报错
}
export async function queryDelete(params) {
  return request(`${BASE_URL}/api/account/delete`, { method: 'POST', data: {...params},});
}